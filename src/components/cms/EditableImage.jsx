import { useEffect, useRef, useState } from 'react';
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
  width: 360,
  maxWidth: 'calc(100vw - 24px)',
  borderRadius: 10,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
  padding: 10
};

const iconButtonStyle = {
  border: '1px solid #cbd5e1',
  background: '#ffffff',
  borderRadius: 6,
  width: 24,
  height: 24,
  padding: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

const actionButtonStyle = {
  ...iconButtonStyle,
  width: 'auto',
  height: 30,
  padding: '4px 10px'
};

const EditableImage = ({
  contentKey,
  value,
  alt = 'Image',
  className,
  style,
  render,
  onValueChange,
  ...rest
}) => {
  const { isAdmin, isEditing } = useEditMode();
  const [currentValue, setCurrentValue] = useState(value);
  const [draftValue, setDraftValue] = useState(value);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 16, left: 16 });
  const wrapperRef = useRef(null);
  const modalRef = useRef(null);

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

  const handleSave = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setCurrentValue(draftValue);
    cmsContentAdapter.setValue(contentKey, draftValue);
    if (typeof onValueChange === 'function') {
      onValueChange(draftValue);
    }
    setIsEditorOpen(false);
  };

  const openEditor = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setDraftValue(currentValue);
    setIsEditorOpen(true);
  };

  const mediaNode = typeof render === 'function'
    ? render(currentValue)
    : <img src={currentValue} alt={alt} className={className} style={style} {...rest} />;

  if (!isAdmin || !isEditing) {
    return mediaNode;
  }

  return (
    <>
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        {mediaNode}
        <button
          type="button"
          onClick={openEditor}
          style={{ ...iconButtonStyle, position: 'absolute', top: 8, right: 8, zIndex: 3 }}
          aria-label="Edit image"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 17.25V20H6.75L17.81 8.94L15.06 6.19L4 17.25Z" stroke="#0f172a" strokeWidth="1.5" />
            <path d="M14.35 6.9L17.1 9.65" stroke="#0f172a" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

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
          <input
            type="text"
            value={draftValue}
            onChange={(event) => setDraftValue(event.target.value)}
            placeholder="Paste image URL"
            style={inputBaseStyle}
          />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={() => setIsEditorOpen(false)} style={actionButtonStyle}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              style={{ ...actionButtonStyle, background: '#0f172a', color: '#ffffff', borderColor: '#0f172a' }}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditableImage;