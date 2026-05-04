import React, { useState } from 'react';

const SimpleFixedIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Simple Fixed Icon */}
      <div
        onClick={openModal}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '60px',
          height: '60px',
          backgroundColor: '#1D714A',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        <img 
          src="/assets/images/logo/logo.svg" 
          alt="Maraseq" 
          style={{ 
            width: '30px', 
            height: '30px',
            filter: 'brightness(0) invert(1)' // Make logo white for dark background
          }}
          onError={(e) => {
            console.error('Logo failed to load, using fallback');
            e.target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.textContent = 'M';
            fallback.style.color = 'white';
            fallback.style.fontSize = '20px';
            fallback.style.fontWeight = 'bold';
            e.target.parentElement.appendChild(fallback);
          }}
        />
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            style={{
              position: 'relative',
              width: '90vw',
              height: '90vh',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              margin: '20px',
              maxWidth: '1200px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10000,
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Content */}
            <div style={{ width: '100%', height: '100%', overflow: 'auto', padding: '2rem' }}>
              <h1 style={{ textAlign: 'center', color: '#1D714A', marginBottom: '2rem' }}>مَراسِق</h1>
              <p style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>Brand Presentation</p>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>نبادر • نرافق • نتطور</p>
              
              <div style={{ 
                maxWidth: '600px', 
                margin: '0 auto', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px', 
                padding: '2rem' 
              }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1D714A', marginBottom: '1rem' }}>جوهر البراند</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  مراسق براند يعمل في الاستثمار والتسويق العقاري بهدف تطوير الفرص وخلق قيمة مستدامة داخل السوق العقاري.
                </p>
                <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>
                  الفكرة المحورية للهوية هي تحويل تعدد الخيارات العقارية إلى مسارات واضحة تساعد العميل على الفهم واتخاذ القرار بثقة.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleFixedIcon;
