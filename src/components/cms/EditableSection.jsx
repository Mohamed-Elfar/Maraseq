import { useEffect, useState } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { FaEye } from 'react-icons/fa';

const HIDDEN_PREFIX = 'cms-section-hidden:';

const getHiddenValue = (sectionKey) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(`${HIDDEN_PREFIX}${sectionKey}`) === 'true';
};

const setHiddenValue = (sectionKey, hidden) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(`${HIDDEN_PREFIX}${sectionKey}`, String(hidden));
};

const EditableSection = ({ sectionKey, sectionLabel, children }) => {
  const { isAdmin, isEditing } = useEditMode();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(getHiddenValue(sectionKey));
  }, [sectionKey]);

  const toggleHidden = () => {
    const nextValue = !isHidden;
    setIsHidden(nextValue);
    setHiddenValue(sectionKey, nextValue);
  };

  if (isHidden && !isAdmin) {
    return null;
  }

  if (isHidden && isAdmin && isEditing) {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ border: '1px dashed #94a3b8', padding: 12, borderRadius: 8, margin: '8px 0' }}>
          <strong style={{ fontSize: 13 }}>{sectionLabel || sectionKey}</strong>
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={toggleHidden}
              aria-label="Show Section"
              title="Show Section"
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                background: '#ffffff',
                width: 30,
                height: 30,
                cursor: 'pointer',
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111111'
              }}
            >
              <FaEye />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={isAdmin && isEditing ? { position: 'relative' } : undefined}>
      {children}
      {isAdmin && isEditing ? (
        <button
          type="button"
          onClick={toggleHidden}
          aria-label="Hide Section"
          title="Hide Section"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            border: '1px solid #cbd5e1',
            borderRadius: 6,
            background: '#ffffff',
            width: 30,
            height: 30,
            cursor: 'pointer',
            fontSize: 12,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626'
          }}
        >
          <FaEye />
        </button>
      ) : null}
    </div>
  );
};

export default EditableSection;