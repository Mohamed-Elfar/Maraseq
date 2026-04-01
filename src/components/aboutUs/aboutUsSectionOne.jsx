import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import aboutSectionImage from "@/assets/images/home/aboutSection.png";
import EditableText from "@/components/cms/EditableText";
import EditableImage from "@/components/cms/EditableImage";

function AboutUsSectionOne() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} lg={6} className="align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <EditableImage
                contentKey="home.about.image"
                value={aboutSectionImage.src}
                alt="About Us Image"
              />
            </div>
          </Col>
          <Col xs={12} lg={6} className="align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2--- mb-30">
                <EditableText
                  as="h6"
                  className="section-subtitle section-subtitle-2--- ltn__secondary-color"
                  contentKey="home.about.subtitle"
                  value="About Maraseq Group"
                />

                <EditableText
                  as="p"
                  multiline
                  contentKey="home.about.description"
                  value="Maraseq Group is a company engaged in real estate investment and marketing, aiming to develop new opportunities and contribute to sustainable value in the real estate market through a range of initiatives and projects."
                />
              </div>
              <div className="ltn__feature-item ltn__feature-item-3">
                <div className="ltn__feature-icon">
                  <span>
                    <i className="flaticon-mountain"></i>
                  </span>
                </div>
                <div className="ltn__feature-info">
                  <EditableText
                    as="h4"
                    contentKey="home.about.vision.title"
                    value="Our Vision"
                  />
                  <EditableText
                    as="p"
                    multiline
                    contentKey="home.about.vision.description"
                    value="To grow Maraseq Group into a trusted name that contributes to shaping real estate opportunities and keeps pace with the evolving dynamics of the property market while creating sustainable value."
                  />
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-3">
                <div className="ltn__feature-icon">
                  <span>
                    <i className="flaticon-maps-and-location"></i>
                  </span>
                </div>
                <div className="ltn__feature-info">
                  <EditableText
                    as="h4"
                    contentKey="home.about.mission.title"
                    value="Our Mission"
                  />
                  <EditableText
                    as="p"
                    multiline
                    contentKey="home.about.mission.description"
                    value="To explore and develop real estate opportunities while providing clear pathways that help navigate the market and transform possibilities into meaningful growth."
                  />
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-3">
                <div className="ltn__feature-icon">
                  <span>
                    <i className="flaticon-secure-shield"></i>
                  </span>
                </div>
                <div className="ltn__feature-info">
                  <EditableText
                    as="h4"
                    contentKey="home.about.commitment.title"
                    value="Our Commitment"
                  />
                  <EditableText
                    as="p"
                    multiline
                    contentKey="home.about.commitment.description"
                    value="At Maraseq Group, we are committed to working with initiative, partnership, and continuous development, while fostering relationships built on clarity, trust, and long-term value."
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutUsSectionOne;
