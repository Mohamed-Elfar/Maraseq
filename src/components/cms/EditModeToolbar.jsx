import { useEditMode } from '@/context/EditModeContext';

const toolbarStyle = {
  position: 'fixed',
  right: 16,
  bottom: 16,
  zIndex: 12000,
  borderRadius: 12,
  background: '#ffffff',
  border: '1px solid #d8dee4',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  padding: 12,
  minWidth: 210
};

const badgeStyle = {
  display: 'inline-block',
  fontSize: 12,
  borderRadius: 999,
  backgroundColor: '#e6fffa',
  color: '#0f766e',
  border: '1px solid #99f6e4',
  padding: '2px 8px',
  marginBottom: 8
};

const buttonBaseStyle = {
  width: '100%',
  borderRadius: 8,
  padding: '8px 10px',
  border: '1px solid #cbd5e1',
  fontWeight: 600,
  fontSize: 13,
  background: '#f8fafc',
  cursor: 'pointer'
};

const EditModeToolbar = () => {
  const { isAdmin, isEditing, setIsEditing, showOutlines, setShowOutlines } = useEditMode();

  if (!isAdmin) {
    return null;
  }

  return (
    <aside style={toolbarStyle}>
      <div style={badgeStyle}>Admin Active</div>
      <div style={{ marginBottom: 8, fontSize: 13 }}>Edit mode is {isEditing ? 'ON' : 'OFF'}</div>
      <button
        type="button"
        style={buttonBaseStyle}
        onClick={() => {
          const nextValue = !isEditing;
          setIsEditing(nextValue);
          if (!nextValue) {
            setShowOutlines(false);
          }
        }}
      >
        {isEditing ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>
      <button
        type="button"
        style={{
          ...buttonBaseStyle,
          marginTop: 8,
          background: showOutlines ? '#eff6ff' : '#f8fafc',
          borderColor: showOutlines ? '#93c5fd' : '#cbd5e1'
        }}
        onClick={() => setShowOutlines((current) => !current)}
      >
        {showOutlines ? 'Hide Editable Outlines' : 'Show Editable Outlines'}
      </button>
    </aside>
  );
};

export default EditModeToolbar;
