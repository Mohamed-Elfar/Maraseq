import { Container, Row, Col } from "react-bootstrap";
import EditableSection from "@/components/cms/EditableSection";
import BrandCarouselOne from "@/components/brandCarousel";

const BrandsSection = ({ brand }) => {
  return (
    <EditableSection sectionKey="home.section.brands" sectionLabel="Brand Carousel">
      <div className="ltn__brand-logo-area ltn__brand-logo-1 section-bg-1 pt-110 pb-110 plr--9">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BrandCarouselOne data={brand} />
            </Col>
          </Row>
        </Container>
      </div>
    </EditableSection>
  );
};

export default BrandsSection;
