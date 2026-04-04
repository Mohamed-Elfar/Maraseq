import Link from "next/link";
import { Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Portfolioitem = ({ data, baseUrl, slug, setBasicExampleOpen, onPortfolioClick }) => {
  // Handle both local files and Supabase URLs
  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/img/gallery/1.jpg';
    
    // If it's already a full URL (starts with http), use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, treat it as a local file in the gallery folder
    return `/img/gallery/${imagePath}`;
  };

  // Collect all images for this portfolio item
  const getAllPortfolioImages = () => {
    const images = [];
    
    // Add main image (img) if it exists and is different from thumbImage
    if (data.img && data.img !== data.thumbImage) {
      images.push({
        src: getImageSrc(data.img),
        alt: `${data.title} - Main Image`
      });
    }
    
    // Add thumbnail image
    if (data.thumbImage) {
      images.push({
        src: getImageSrc(data.thumbImage),
        alt: `${data.title} - Thumbnail`
      });
    }
    
    // Add caption images if they exist
    if (data.captions?.image1) {
      images.push({
        src: getImageSrc(data.captions.image1),
        alt: `${data.title} - Detail Image 1`
      });
    }
    
    if (data.captions?.image2) {
      images.push({
        src: getImageSrc(data.captions.image2),
        alt: `${data.title} - Detail Image 2`
      });
    }
    
    // Remove duplicates and return
    const uniqueImages = images.filter((img, index, self) => 
      index === self.findIndex((t) => t.src === img.src)
    );
    
    return uniqueImages.length > 0 ? uniqueImages : [{
      src: getImageSrc('1.jpg'),
      alt: 'Default Image'
    }];
  };

  const handleImageClick = () => {
    if (onPortfolioClick) {
      // Pass all images for this portfolio to the parent
      onPortfolioClick(getAllPortfolioImages(), 0);
    } else {
      // Fallback to original behavior
      setBasicExampleOpen(true);
    }
  };

  return (
    <Col xs={12} sm={6} lg={4} className="ltn__gallery-item filter_category_3">
      <div className="ltn__gallery-item-inner">
        <div
          className="ltn__gallery-item-img"
          onClick={handleImageClick}
        >
          <img src={getImageSrc(data.thumbImage)} alt={data.title || 'Portfolio Image'} />
          <span className="ltn__gallery-action-icon">
            <span>{<FaSearch />}</span>
          </span>
        </div>
        <div className="ltn__gallery-item-info">
          <h4>
            <Link href={`${baseUrl}/${slug}`}>{data.title}</Link>
          </h4>
          <p>{data.designation}</p>
        </div>
      </div>
    </Col>
  );
};

export default Portfolioitem;
