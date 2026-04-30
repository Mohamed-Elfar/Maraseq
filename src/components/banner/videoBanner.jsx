import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import EditableImage from "@/components/cms/EditableImage";

const FALLBACK_VIDEO_ID = "X7R-q9rsrtU";

const extractYoutubeId = (url) => {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([^?&\s]+)/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([^?&\s]+)/);
  if (longMatch) return longMatch[1];
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&\s]+)/);
  if (embedMatch) return embedMatch[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  return null;
};

const isDirectVideoFile = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
};

const VideoBanner = ({ backgroundImage = "../img/bg/19.jpg", videoUrl }) => {
  const [isOpen, setOpen] = useState(false);

  const youtubeId = extractYoutubeId(videoUrl) || FALLBACK_VIDEO_ID;
  const isFile = isDirectVideoFile(videoUrl);

  return (
    <>
      {!isFile && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId={youtubeId}
          onClose={() => setOpen(false)}
        />
      )}
      {isFile && isOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setOpen(false)}
        >
          <video src={videoUrl} controls autoPlay style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 8 }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
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
