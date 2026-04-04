// Utility functions for portfolio components

export const getImageSrc = (imagePath, defaultPath = '/img/gallery/') => {
  if (!imagePath) return `${defaultPath}1.jpg`;

  // If it's already a full URL (starts with http), use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Otherwise, treat it as a local file
  return `${defaultPath}${imagePath}`;
};

export const getBannerImageSrc = (imagePath) => {
  if (!imagePath) return '/img/banner/banner-1.jpg';
  
  // If it's already a full URL (starts with http), use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For banner, use default banner if no main image
  return imagePath || '/img/banner/banner-1.jpg';
};

export const getAllPortfolioImages = (portfolio, getImageSrc) => {
  const images = [];
  
  // Add main image (img) if it exists and is different from thumbImage
  if (portfolio.img && portfolio.img !== portfolio.thumbImage) {
    images.push({
      src: getImageSrc(portfolio.img),
      alt: `${portfolio.title} - Main Image`
    });
  }
  
  // Add thumbnail image
  if (portfolio.thumbImage) {
    images.push({
      src: getImageSrc(portfolio.thumbImage),
      alt: `${portfolio.title} - Thumbnail`
    });
  }
  
  // Add caption images if they exist
  if (portfolio.captions?.image1) {
    images.push({
      src: getImageSrc(portfolio.captions.image1),
      alt: `${portfolio.title} - Detail Image 1`
    });
  }
  
  if (portfolio.captions?.image2) {
    images.push({
      src: getImageSrc(portfolio.captions.image2),
      alt: `${portfolio.title} - Detail Image 2`
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
