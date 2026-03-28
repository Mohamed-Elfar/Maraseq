import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaArrowRight,
  FaArrowLeft,
  FaSearch,
  FaRegEnvelopeOpen,
  FaPhoneAlt,
} from "react-icons/fa";
import Slider from "react-slick";
import { productSlug } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import BlogItem from "@/components/blog";
import blogData from "@/data/blog";
import CallToAction from "@/components/callToAction";
import Accordion from "react-bootstrap/Accordion";
import Link from "next/link";
import CounterUp from "@/components/counterUp";

function Faq() {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <FaArrowLeft />
    </button>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <FaArrowRight />
    </button>
  );

  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="Frequently asked questions"
          sectionPace=""
          currentSlug="About UsFAQ"
        />

        {/* <!-- FAQ AREA START (faq-2) (ID > accordion_2) --> */}
        <div className="ltn__faq-area mb-100">
          <div className="container">
            <Row>
              <Col xs={12} lg={8}>
                <div className="ltn__faq-inner ltn__faq-inner-2">
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        How do I start my real estate journey with Maraseq?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Start by defining your goal, and we will guide you to
                          the right path based on your needs.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        How do I choose the right property?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          We analyze your needs, budget, and preferred location
                          to offer clear and suitable options.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        Do you offer investment opportunities?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Yes, we provide investment options based on market
                          insights for sustainable returns.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        Can I reserve a property remotely?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Yes, we provide a smooth process to reserve and
                          complete agreements from anywhere.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">
                      <Accordion.Header>Is my information secure?</Accordion.Header>
                      <Accordion.Body>
                        <p>
                          We are committed to protecting your data and using it
                          only to enhance your experience.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="6">
                      <Accordion.Header>
                        Do you provide consultation before purchase?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Yes, we help you understand the market before making
                          any decision.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <div className="need-support text-center mt-100">
                    <h2>Have a question? We guide you to the right path</h2>
                    <div className="btn-wrapper mb-30">
                      <Link href="/contact" className="theme-btn-1 btn">
                        Contact Us
                      </Link>
                    </div>
                    <h3>
                      <FaPhoneAlt />
                      +0123-456-789
                    </h3>
                  </div>
                </div>
              </Col>

              <Col xs={12} lg={4}>
                <aside className="sidebar-area ltn__right-sidebar">
                  {/* <!-- Newsletter Widget --> */}
                  <div className="widget ltn__search-widget ltn__newsletter-widget">
                    <h6 className="ltn__widget-sub-title">{`// subscribe`}</h6>
                    <h4 className="ltn__widget-title">Get Newsletter</h4>
                    <form action="#">
                      <input type="text" name="search" placeholder="Search" />
                      <button type="submit">
                        <FaSearch />
                      </button>
                    </form>
                    <div className="ltn__newsletter-bg-icon">
                      <FaRegEnvelopeOpen />
                    </div>
                  </div>

                  {/* <!-- Banner Widget --> */}
                  <div className="widget ltn__banner-widget">
                    <Link href="/shop">
                      <img src="/img/banner/banner-3.jpg" alt="Banner Image" />
                    </Link>
                  </div>
                </aside>
              </Col>
            </Row>
          </div>
        </div>
        {/* <!-- FAQ AREA END --> */}

        {/* <!-- COUNTER UP AREA START -->  */}
        <CounterUp />
        {/* <!-- COUNTER UP AREA END --> */}

        {/* <!-- BLOG AREA START (blog-3) -->  */}
        <div className="ltn__blog-area pt-120 pb-70">
          <Container>
            <Row>
              <Col lg={12}>
                <TitleSection
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-2"
                  titleSectionData={{
                    subTitle: "News & Blogs",
                    title: "Leatest News Feeds",
                  }}
                />
              </Col>
            </Row>
            <Slider
              {...blogSettings}
              className="ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal"
            >
              {blogData.map((data, key) => {
                const slug = productSlug(data.title);
                return (
                  <BlogItem
                    key={key}
                    baseUrl="blog"
                    data={data}
                    slug={slug}
                  />
                );
              })}
            </Slider>
          </Container>
        </div>
        {/* <!-- BLOG AREA END --> */}

        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}

export default Faq;
