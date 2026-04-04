import { useState, useEffect } from 'react'
import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import { getProducts, productSlug } from "@/lib/product";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import TitleSection from "@/components/titleSection";
import BlogItem from "@/components/blog";
import blogData from "@/data/blog";
import CallToActionstyleTwo from "@/components/callToAction/callToActionstyleTwo";
import { getPortfolio } from "@/lib/supabase";
import Portfolioitem from "@/components/portfolio";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CallToAction from "@/components/callToAction";
import brandLogoData from "@/data/brand-logo";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";

function Portfolio() {
  const [allPortfolios, setAllPortfolios] = useState([]);
  const [displayedPortfolios, setDisplayedPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(6);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const data = await getPortfolio();
        // Transform data to match expected format and filter out inactive items
        const transformedData = data
          .filter(item => item.active !== false) // Filter out inactive items
          .map(item => ({
            ...item,
            shortDescription: item.short_description || item.description || '',
            fullDescription: item.full_description || item.description || '',
            thumbImage: item.thumb_image || '1.jpg',
            img: item.img || item.thumb_image || '1.jpg',
          }));
        setAllPortfolios(transformedData);
        setDisplayedPortfolios(transformedData.slice(0, itemsToShow));
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        // Fallback to empty array
        setAllPortfolios([]);
        setDisplayedPortfolios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const handleLoadMore = () => {
    const newItemsToShow = itemsToShow + 6;
    setItemsToShow(newItemsToShow);
    setDisplayedPortfolios(allPortfolios.slice(0, newItemsToShow));
  };

  // Handle portfolio item click - show all images for that specific portfolio
  const handlePortfolioClick = (images, startIndex = 0) => {
    setLightboxImages(images);
    setCurrentImageIndex(startIndex);
    setLightboxOpen(true);
  };
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
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
  const LogoSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  const [basicExampleOpen, setBasicExampleOpen] = useState(false);

  // Handle both local files and Supabase URLs for gallery
  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/img/gallery/1.jpg';

    // If it's already a full URL (starts with http), use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Otherwise, treat it as a local file in the gallery folder
    return `/img/gallery/${imagePath}`;
  };

  const gallerySlides = lightboxImages;
  return (


    <>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImageIndex}
        slides={gallerySlides}
        plugins={[Zoom, Counter, Fullscreen, Download]}
      />
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="Our Portfolio"
          sectionPace=""
          currentSlug="Portfolio"
        />

        {/*  <!-- Gallery area start -->  */}
        <div className="ltn__gallery-area mb-120">
          <Container>
            <div className="row ltn__gallery-active ltn__gallery-style-2">
              {displayedPortfolios.map((data, key) => {
                const slug = productSlug(data.title);

                return (
                  <Portfolioitem
                    setBasicExampleOpen={setBasicExampleOpen}
                    key={key}
                    baseUrl="portfolio"
                    data={data}
                    slug={slug}
                    onPortfolioClick={handlePortfolioClick}
                  />
                );
              })}
            </div>

            <div className="btn-wrapper text-center">
              {displayedPortfolios.length < allPortfolios.length && (
                <button
                  className="btn btn-transparent btn-effect-3 btn-border"
                  onClick={handleLoadMore}
                >
                  LOAD MORE +
                </button>
              )}
            </div>
          </Container>
        </div>
        {/*  <!-- Gallery area end --> */}

        <CallToActionstyleTwo />

        {/* <!-- BLOG AREA START (blog-3) -->  */}
        <div className="ltn__blog-area pt-120 pb-70">
          <Container>
            <Row>
              <Col lg={12}>
                <TitleSection
                  sectionClasses="text-center"
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
        {/* <!-- BLOG AREA END --> */}

        {/* <!-- BRAND LOGO AREA START --> */}
        <div className="ltn__brand-logo-area ltn__brand-logo-1 pt-80--- pb-110 plr--9">
          <Container fluid>
            <Row className="ltn__brand-logo-active">
              <Col xs={12}>
                <Slider {...LogoSettings}>
                  {brandLogoData.map((logo, key) => {
                    return (
                      <div key={key} className="ltn__brand-logo-item">
                        <img
                          src="/img/ogo.svg"
                          alt="Brand Logo"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- BRAND LOGO AREA END --> */}

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

export default Portfolio;
