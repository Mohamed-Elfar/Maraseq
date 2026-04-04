import { FaSearch } from "react-icons/fa";

const PortfolioMainImage = ({ 
  portfolio, 
  getImageSrc, 
  setCurrentImageIndex, 
  setLightboxOpen 
}) => {
  return (
    <div className="ltn__blog-img position-relative">
      <img
        src={getImageSrc(portfolio.thumbImage)}
        alt={portfolio.title || 'Portfolio Image'}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px'
        }}
      />
      <button
        className="ltn__video-play-btn position-absolute top-50 start-50 translate-middle"
        style={{
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => {
          setCurrentImageIndex(0);
          setLightboxOpen(true);
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255,255,255,1)';
          e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.9)';
          e.target.style.transform = 'translate(-50%, -50%) scale(1)';
        }}
      >
        <FaSearch style={{ color: '#007bff', fontSize: '20px' }} />
      </button>
    </div>
  );
};

export default PortfolioMainImage;
