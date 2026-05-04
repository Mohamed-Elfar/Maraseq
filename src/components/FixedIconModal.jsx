import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FixedIconModal = ({ htmlContent = null, children = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Handle Hash deep linking
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#brand-presentation') {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      } else if (isOpen && window.location.hash !== '#brand-presentation') {
        // Only close if it was the hash that opened it or if we want to sync
        // For now, let's just allow the hash to open it
      }
    };

    // Check on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    // Update hash without scrolling
    window.history.pushState(null, null, '#brand-presentation');
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    // Remove hash cleanly
    if (window.location.hash === '#brand-presentation') {
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Don't render anything if no content is provided
  if (!htmlContent && !children) {
    return null;
  }

  return (
    <>
      {/* Fixed Icon */}
      <div
        id="presentation-trigger-icon"
        onClick={openModal}
        className="cursor-pointer rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 99999,
          transform: 'translateZ(0)',
          backgroundColor: '#1D714A', // Brand color
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%'
        }}
      >
        <img
          src="/assets/images/logo/logo.svg"
          alt="Maraseq"
          className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12"
          style={{
            filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black"
          onClick={closeModal}
        >
          {/* Only show modal close button if no children (fallback for HTML string) */}
          {!children && (
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[1000000] w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-20"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Modal Content */}
          <div
            className="w-full h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {children ? (
              // Use React Component
              React.cloneElement(children, { onClose: closeModal })
            ) : (
              // Fallback to HTML string
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FixedIconModal;
