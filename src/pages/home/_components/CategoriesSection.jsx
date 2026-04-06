import { Container, Row, Col } from "react-bootstrap";
import EditableSection from "@/components/cms/EditableSection";
import EditableText from "@/components/cms/EditableText";
import TitleSection from "@/components/titleSection";
import PropertyCategories from "@/components/PropertyCategories";

const CategoriesSection = () => {
  return (
    <EditableSection sectionKey="home.section.categories" sectionLabel="Property Categories">
      <div className="ltn__banner-area pt-120">
        <Container>
          <Row>
            <Col xs={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Property Types",
                  title: "Explore by Category",
                }}
              />
            </Col>
          </Row>
          <PropertyCategories />
        </Container>
      </div>
    </EditableSection>
  );
};

export default CategoriesSection;
