import EditableSection from "@/components/cms/EditableSection";
import CarDealerSearchForm from "@/components/carDealerSearchForm";

const SearchSection = () => {
  return (
    <EditableSection sectionKey="home.section.search" sectionLabel="Search Form">
      <CarDealerSearchForm navMenuClass="d-none" customClasses="" />
    </EditableSection>
  );
};

export default SearchSection;
