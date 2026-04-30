import EditableSection from "@/components/cms/EditableSection";
import VideoBanner from "@/components/banner/videoBanner";
import videoPopupAreaImage from "@/assets/images/home/video-popup-area.png";

const VideoSection = ({ videoUrl }) => {
  return (
    <EditableSection sectionKey="home.section.video" sectionLabel="Video Banner">
      <div className="ltn__video-popup-area">
        <VideoBanner backgroundImage={videoPopupAreaImage.src} videoUrl={videoUrl} />
      </div>
    </EditableSection>
  );
};

export default VideoSection;
