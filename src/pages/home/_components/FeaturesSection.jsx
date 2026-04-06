import EditableSection from "@/components/cms/EditableSection";
import Feature from "@/components/features";

const FeaturesSection = ({ featureData }) => {
  return (
    <EditableSection sectionKey="home.section.features" sectionLabel="Features Section">
      <Feature
        servicebtn={true}
        iconTag={true}
        paddingClass="pt-115 pb-90"
        classes="section-bg-1"
        data={featureData}
        titleSectionData={{
          sectionClasses: "text-center",
          subTitle: "Our Services",
          title: "Our Core Paths",
        }}
      />
    </EditableSection>
  );
};

export default FeaturesSection;
