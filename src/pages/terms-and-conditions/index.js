import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaArrowRight,
  FaArrowLeft,
  FaRegEnvelopeOpen,
  FaSearch,
} from "react-icons/fa";
import Slider from "react-slick";
import { productSlug } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import BlogItem from "@/components/blog";
import blogData from "@/data/blog";
import CallToAction from "@/components/callToAction";
import CounterUp from "@/components/counterUp";
import Link from "next/link";

function TermsAndConditions() {
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
          title="Terms & Conditions"
          sectionPace=""
          currentSlug="Terms & Conditions"
        />

        <div className="ltn__faq-area mb-100">
          <div className="container">
            <Row>
              <Col xs={12} lg={8}>
                <div className="ltn__faq-inner ltn__faq-inner-2">
                  <div className="section-title-area mb-30">
                    <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                      Terms
                    </h6>
                    <h1 className="section-title">Terms & Conditions</h1>
                    <p>
                      By using Maraseq's website, you agree to comply with
                      these Terms & Conditions. If you do not agree, please
                      refrain from using the site.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>1. Introduction</h4>
                    <p>
                      By using Maraseq's website, you agree to comply with
                      these Terms & Conditions. If you do not agree, please
                      refrain from using the site.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>2. Use of the Website</h4>
                    <p>
                      The website is intended for informational purposes related
                      to real estate services only.
                    </p>
                    <p>
                      Any unlawful or abusive use is strictly prohibited.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>3. Information & Content</h4>
                    <p>
                      Maraseq strives to provide accurate information; however,
                      we do not guarantee completeness or continuous updates.
                    </p>
                    <p>
                      All content is for informational purposes only.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>4. Intellectual Property</h4>
                    <p>
                      All content (text, images, designs, logos) is the
                      property of Maraseq and may not be used without prior
                      permission.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>5. Listings & Offers</h4>
                    <p>
                      All properties and opportunities are subject to
                      availability and may change without prior notice.
                    </p>
                    <p>
                      They do not constitute a binding legal offer.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>6. Liability</h4>
                    <p>
                      Maraseq is not responsible for any losses or damages
                      resulting from the use of the website or reliance on its
                      content.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>7. External Links</h4>
                    <p>
                      The website may contain links to external sites. We are
                      not responsible for their content or policies.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>8. Modifications</h4>
                    <p>
                      We reserve the right to update these Terms at any time
                      without prior notice.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h4>9. Governing Law</h4>
                    <p>
                      These Terms are governed by the laws of the Arab Republic
                      of Egypt.
                    </p>
                  </div>
                </div>
              </Col>

              <Col xs={12} lg={4}>
                <aside className="sidebar-area ltn__right-sidebar">
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

        <CounterUp />

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
                  <BlogItem key={key} baseUrl="blog" data={data} slug={slug} />
                );
              })}
            </Slider>
          </Container>
        </div>

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

export default TermsAndConditions;
