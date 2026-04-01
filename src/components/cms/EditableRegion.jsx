import { useEditMode } from '@/context/EditModeContext';

const EditableRegion = ({ children, className, label }) => {
  const { isEditing, showOutlines } = useEditMode();

  if (!isEditing || !showOutlines) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{
        border: '1px dashed #0ea5e9',
        borderRadius: 8,
        padding: 8,
        transition: 'box-shadow 0.2s ease',
        position: 'relative'
      }}
    >
      {label ? (
        <span
          style={{
            position: 'absolute',
            top: -10,
            left: 10,
            background: '#0ea5e9',
            color: '#ffffff',
            fontSize: 11,
            padding: '2px 6px',
            borderRadius: 999
          }}
        >
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
};

export default EditableRegion;
