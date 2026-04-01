import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
import aboutUsLeftImage from "@/assets/images/about/ABOUT-US---574X722-PX.png";
import EditableText from "@/components/cms/EditableText";
import EditableImage from "@/components/cms/EditableImage";

function AboutUsStyleOne({ sectionSpace }) {
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
      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <EditableImage
                  contentKey="about.main.image"
                  value={aboutUsLeftImage.src}
                  alt="About Us Image"
                  render={(src) => <img src={src} alt="About Us Image" />}
                />
                <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                    <EditableImage
                      contentKey="about.main.videoBadgeImage"
                      value="/img/others/8.png"
                      alt="video popup bg image"
                      render={(src) => <img src={src} alt="video popup bg image" />}
                    />
                    <button
                      onClick={() => setOpen(true)}
                      className="ltn__video-icon-2"
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <EditableText
                    contentKey="about.main.subtitle"
                    value="About Us"
                    as="h6"
                    className="section-subtitle section-subtitle-2 ltn__secondary-color"
                  />
                  <h1 className="section-title">
                    <EditableText
                      contentKey="about.main.title"
                      value="We Shape Clearer Paths for Real Estate Opportunities"
                      as="span"
                    />
                    <span>.</span>
                  </h1>
                  <EditableText
                    contentKey="about.main.description"
                    value="Maraseq is a real estate investment and marketing company focused on developing opportunities and creating clear pathways that help our clients make informed decisions and achieve sustainable value in the market."
                    as="p"
                    multiline
                  />
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2"></i>
                    <EditableText
                      contentKey="about.main.bullet1"
                      value="Smart Real Estate Investment"
                      as="span"
                    />
                  </li>
                  <li>
                    <i className="flaticon-mountain"></i>
                    <EditableText
                      contentKey="about.main.bullet2"
                      value="Professional Real Estate Marketing"
                      as="span"
                    />
                  </li>
                  <li>
                    <i className="flaticon-heart"></i>
                    <EditableText
                      contentKey="about.main.bullet3"
                      value="Opportunity Development"
                      as="span"
                    />
                  </li>
                  <li>
                    <i className="flaticon-secure"></i>
                    <EditableText
                      contentKey="about.main.bullet4"
                      value="Strategic Partnerships"
                      as="span"
                    />
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  <EditableText
                    contentKey="about.main.callout"
                    value="Toward clearer paths... and more confident decisions"
                    as="p"
                    multiline
                  />
                </div>
                <div className="btn-wrapper animated">
                  <Link
                    href="/service"
                    className="theme-btn-1 btn btn-effect-1"
                  >
                    <EditableText
                      contentKey="about.main.ctaText"
                      value="Our Services"
                      as="span"
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
