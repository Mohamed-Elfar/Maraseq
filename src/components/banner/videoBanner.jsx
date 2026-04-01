import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import EditableImage from "@/components/cms/EditableImage";

const VideoBanner = ({ backgroundImage = "../img/bg/19.jpg" }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="X7R-q9rsrtU"
        onClose={() => setOpen(false)}
      />
      <EditableImage
        contentKey="home.video.banner.image"
        value={backgroundImage}
        render={(currentImage) => (
          <div
            className="ltn__video-bg-img bg-overlay-black-30 bg-image bg-fixed ltn__animation-pulse1"
            style={{ backgroundImage: `url("${currentImage}")` }}
          >
            <button onClick={() => setOpen(true)} className="ltn__video-icon-2">
              <FaPlay />
            </button>
          </div>
        )}
      />
    </>
  );
};

export default VideoBanner;
