import EditableSection from "@/components/cms/EditableSection";
import AboutUsSectionOne from "@/components/aboutUs/aboutUsSectionOne";

const AboutSection = () => {
  return (
    <EditableSection sectionKey="home.section.about" sectionLabel="About Section">
      <div className="ltn__about-us-area pt-115 pb-100 ">
        <AboutUsSectionOne />
      </div>
    </EditableSection>
  );
};

export default AboutSection;
