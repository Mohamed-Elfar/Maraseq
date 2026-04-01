import EditableRegion from '@/components/cms/EditableRegion';
import EditableText from '@/components/cms/EditableText';

const TitleSection = ({ titleSectionData, sectionClasses, headingClasses }) => {
  const sectionKey = (titleSectionData?.title || titleSectionData?.subTitle || 'section')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <>
      <EditableRegion className={`section-title-area ${sectionClasses}`} label="Editable Title Section">
        <EditableText
          as="h6"
          className={`section-subtitle ${headingClasses} ltn__secondary-color`}
          editableClassName={`section-subtitle ${headingClasses} ltn__secondary-color`}
          contentKey={`title-section:${sectionKey}:subtitle`}
          value={titleSectionData.subTitle}
          placeholder="Enter subtitle"
        />
        <EditableText
          as="h1"
          className="section-title"
          editableClassName="section-title"
          contentKey={`title-section:${sectionKey}:title`}
          value={titleSectionData.title}
          placeholder="Enter section title"
        />
      </EditableRegion>
    </>
  );
};

export default TitleSection;
