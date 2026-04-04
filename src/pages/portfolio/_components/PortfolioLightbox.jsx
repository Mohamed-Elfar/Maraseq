import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";

const PortfolioLightbox = ({ 
  lightboxOpen, 
  setLightboxOpen, 
  currentImageIndex, 
  setCurrentImageIndex, 
  images 
}) => {
  return (
    <Lightbox
      open={lightboxOpen}
      close={() => setLightboxOpen(false)}
      index={currentImageIndex}
      slides={images}
      plugins={[Zoom, Counter, Fullscreen, Download]}
    />
  );
};

export default PortfolioLightbox;
