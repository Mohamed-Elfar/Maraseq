import React, { useState } from 'react';
import Link from 'next/link';

function PropertyGallery({ galleryImages }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <>
      <h4 className="title-2">From Our Gallery</h4>
      <div className="ltn__property-details-gallery mb-30">
        <div className="row">
          {galleryImages.map((imageUrl, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                onClick={() => openLightbox(index)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={imageUrl}
                  alt={`Gallery ${index + 1}`}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '10px',
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10000,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              ×
            </button>

            {/* Previous button */}
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              ‹
            </button>

            {/* Image */}
            <img
              src={galleryImages[currentImageIndex]}
              alt={`Gallery ${currentImageIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
              }}
            />

            {/* Next button */}
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              ›
            </button>

            {/* Image counter */}
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontSize: '16px',
              }}
            >
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyGallery;
