import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { cmsContentAdapter } from '@/lib/cms/content-store';

const inputBaseStyle = {
  width: '100%',
  borderRadius: 8,
  border: '1px solid #94a3b8',
  padding: '6px 10px',
  font: 'inherit',
  color: 'inherit',
  background: '#ffffff'
};

const modalStyleBase = {
  position: 'fixed',
  zIndex: 13000,
  width: 340,
  maxWidth: 'calc(100vw - 24px)',
  borderRadius: 10,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
  padding: 10
};

const editButtonStyle = {
  border: '1px solid #cbd5e1',
  background: '#ffffff',
  borderRadius: 6,
  width: 24,
  height: 24,
  padding: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  verticalAlign: 'middle'
};

const inlineWrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6
};

const blockWrapStyle = {
  display: 'block',
  position: 'relative'
};

const blockTags = new Set(['div', 'p', 'section', 'article', 'header', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const EditableText = ({
  contentKey,
  value,
  as = 'span',
  multiline = false,
  className,
  placeholder,
  onValueChange,
  ...rest
}) => {
  const { isAdmin, isEditing, showOutlines } = useEditMode();
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [modalPosition, setModalPosition] = useState({ top: 16, left: 16 });
  const wrapperRef = useRef(null);
  const modalRef = useRef(null);

  const isBlock = useMemo(() => blockTags.has(String(as).toLowerCase()), [as]);

  useEffect(() => {
    const storedValue = cmsContentAdapter.getValue(contentKey, value);
    setCurrentValue(storedValue);
  }, [contentKey, value]);

  useEffect(() => {
    if (!isEditorOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!modalRef.current || !wrapperRef.current) {
        return;
      }

      const clickedInsideModal = modalRef.current.contains(event.target);
      const clickedInsideWrapper = wrapperRef.current.contains(event.target);
      if (!clickedInsideModal && !clickedInsideWrapper) {
        setIsEditorOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsEditorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isEditorOpen]);

  useEffect(() => {
    if (!isEditorOpen) {
      return undefined;
    }

    const updatePosition = () => {
      if (!wrapperRef.current) {
        return;
      }

      const rect = wrapperRef.current.getBoundingClientRect();
      setModalPosition({
        left: Math.max(8, rect.left),
        top: Math.max(8, rect.top - 12)
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isEditorOpen]);

  const handleChange = (nextValue) => {
    setCurrentValue(nextValue);
    cmsContentAdapter.setValue(contentKey, nextValue);

    if (typeof onValueChange === 'function') {
      onValueChange(nextValue);
    }
  };

  const openEditor = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setDraftValue(currentValue);
    setIsEditorOpen(true);
  };

  const saveEditorValue = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    handleChange(draftValue);
    setIsEditorOpen(false);
  };

  const ComponentTag = as;
  const displayText = (
    <ComponentTag className={className} {...rest}>
      {currentValue}
    </ComponentTag>
  );

  if (!isAdmin) {
    return displayText;
  }

  const outlineStyle = isEditing && showOutlines
    ? {
      outline: '2px dashed #38bdf8',
      outlineOffset: 2
    }
    : undefined;

  const wrapperStyle = isBlock
    ? { ...blockWrapStyle, ...outlineStyle }
    : { ...inlineWrapStyle, ...outlineStyle };
  const WrapperTag = isBlock ? 'div' : 'span';

  const iconButton = (
    <button type="button" onClick={openEditor} style={editButtonStyle} aria-label="Edit content">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 17.25V20H6.75L17.81 8.94L15.06 6.19L4 17.25Z" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M14.35 6.9L17.1 9.65" stroke="#0f172a" strokeWidth="1.5" />
      </svg>
    </button>
  );

  return (
    <>
      <WrapperTag ref={wrapperRef} style={wrapperStyle}>
        {displayText}
        {isBlock ? <span style={{ position: 'absolute', top: 0, right: 0 }}>{iconButton}</span> : iconButton}
      </WrapperTag>
      {isEditorOpen ? (
        <div
          ref={modalRef}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          style={{
            ...modalStyleBase,
            left: modalPosition.left,
            top: modalPosition.top,
            transform: 'translateY(-100%)'
          }}
        >
          {multiline ? (
            <textarea
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
              rows={4}
              placeholder={placeholder}
              style={inputBaseStyle}
            />
          ) : (
            <input
              type="text"
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
              placeholder={placeholder}
              style={inputBaseStyle}
            />
          )}
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={() => setIsEditorOpen(false)} style={{ ...editButtonStyle, width: 'auto', padding: '4px 10px', height: 30 }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEditorValue}
              style={{ ...editButtonStyle, width: 'auto', padding: '4px 10px', height: 30, background: '#0f172a', color: '#ffffff', borderColor: '#0f172a' }}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditableText;
