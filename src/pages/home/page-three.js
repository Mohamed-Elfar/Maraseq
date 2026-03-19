import { useState } from "react";
import Slider from "react-slick";
import path from "path";
import fs from "fs/promises";
import { LayoutTwo } from "@/layouts";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { getProducts, productSlug, getDiscountPrice } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import AboutUsSectionOne from "@/components/aboutUs/aboutUsSectionOne";
import Feature from "@/components/features";
import featuresData from "@/data/service";
import PropertyCategories from "@/components/PropertyCategories";
import HeroSectionStyleThree from "@/components/hero/styleThree";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import blogData from "@/data/blog";
import BlogItem from "@/components/blog";
import newsOneImage from "@/assets/images/home/newsOne.png";
import newsTwoImage from "@/assets/images/home/newsTwo.png";
import CallToAction from "@/components/callToAction";
import VideoBanner from "@/components/banner/videoBanner";
import ProductItem from "@/components/product";
import CarDealerSearchForm from "@/components/carDealerSearchForm";
import BrandCarouselOne from "@/components/brandCarousel";
import portfolioData from "@/data/portfolio";
import PortfolioitemThree from "@/components/portfolio/itemThree";
import imageSlider from "@/assets/images/home/imageSlider.png";
import videoPopupAreaImage from "@/assets/images/home/video-popup-area.png";



function HomeVersionThree(props) {
  const [isOpen, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);
  const featureData = getProducts(featuresData, "buying", "featured", 3);
  const countryProducts = getProducts(products, "buying", "country", 5);
  const featuredProducts = getProducts(products, "buying", "featured", 5);
  const { data, brand, testimonialData } = props;

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const portfolios = getProducts(portfolioData, "buying", "carousel", 5);

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

const portfolioSettings = {
        rtl: false,
        arrows: true,
        dots: false,
        infinite: true,
    speed: 500,
    slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
    centerPadding: '0px',
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
          slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
            arrows: true,
            dots: false,
          slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                arrows: true,
                dots: false,
          slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 580,
                settings: {
                arrows: true,
                dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

  const productsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 580,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const productCarouselsettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const newsImages = [newsOneImage.src, newsTwoImage.src];

  return (
    <LayoutTwo topbar={true}>

      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="LjCzPp-MK48"
        onClose={() => setOpen(false)}
      />
      {/* <!-- SLIDER AREA START (slider-11) --> */}
      <div className="ltn__slider-area ltn__slider-3 section-bg-2">
        <HeroSectionStyleThree data={data} />
      </div>

      {/* <!-- SLIDER AREA END --> */}
      <CarDealerSearchForm navMenuClass="d-none" customClasses="" />
      {/* <!-- CAR DEALER FORM AREA END --> */}

      {/* <!-- ABOUT US AREA START --> */}
      <div className="ltn__about-us-area pt-115 pb-100 ">
        <AboutUsSectionOne />
      </div>
      {/* <!-- ABOUT US AREA END --> */}

  

      {/* <!-- FEATURE AREA START ( Feature - 6) --> */}
      <Feature
        servicebtn={true}
        iconTag={false}
        data={featureData}
        classes=""
        headingClasses="section-subtitle-2"
        titleSectionData={{
          sectionClasses: "text-center",
          subTitle: "Our Services",
          title: "Our Main Focus",
        }}
      />
      {/* <!-- FEATURE AREA END -->*/}

      {/* <!-- BANNER AREA START ( Banner - 4 ) --> */}
            <div className="ltn__banner-area pt-120">
              <Container>

                <Row>
                  <Col xs={12}>
                    <TitleSection
                      sectionClasses="text-center"
                      headingClasses="section-subtitle-2 ltn__secondary-color"
                      titleSectionData={{
                        subTitle: "Property",
                        title: "Property By Categories",
                      }}
                    />
                  </Col>
                </Row>


                <PropertyCategories />
              </Container>
            </div>
      {/* <!-- BANNER AREA END --> */}


      {/* <!-- IMAGE SLIDER AREA START (img-slider-3) --> */}
      <div className="ltn__img-slider-area">
        <Slider {...portfolioSettings} className="ltn__image-slider-4-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">

          {
            portfolios.map((data, key) => {
              const slug = productSlug(data.title);
              return (
                <PortfolioitemThree key={key}
                  baseUrl="/portfolio"
                  data={data}
                  slug={slug} />
              )
            })
          }

        </Slider>
      </div>
      {/* <!-- IMAGE SLIDER AREA END --> */}



      {/* PRODUCT SLIDER AREA START */}
      <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
        <Container>
          <Row>
            <Col lg={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Properties",
                  title: "Featured Listings",
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              {!!featuredProducts?.length ? (
                <Slider
                  {...productCarouselsettings}
                  className="ltn__product-slider-item-four-active-full-width slick-arrow-1"
                >
                  {featuredProducts.map((product, key) => {
                    const slug = productSlug(product.title);

                    const discountedPrice = getDiscountPrice(
                      product.price,
                      product.discount
                    ).toFixed(2);
                    const productPrice = product.price.toFixed(2);
                    const cartItem = cartItems.find(
                      (cartItem) => cartItem.id === product.id
                    );
                    const wishlistItem = wishlistItems.find(
                      (wishlistItem) => wishlistItem.id === product.id
                    );
                    const compareItem = compareItems.find(
                      (compareItem) => compareItem.id === product.id
                    );

                    return (
                      <ProductItem
                        key={product.id}
                        productData={product}
                        slug={slug}
                        baseUrl="shop"
                        discountedPrice={discountedPrice}
                        productPrice={productPrice}
                        cartItem={cartItem}
                        wishlistItem={wishlistItem}
                        compareItem={compareItem}
                      />
                    );
                  })}
                </Slider>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
      {/* PRODUCT SLIDER AREA END */}


      {/* <!-- VIDEO AREA START --> */}
      <div className="ltn__video-popup-area">
        <VideoBanner backgroundImage={videoPopupAreaImage.src} />
      </div>
      {/* <!-- VIDEO AREA END --> */}



      {/* <!-- BRAND LOGO AREA START --> */}
      <div className="ltn__brand-logo-area ltn__brand-logo-1 section-bg-1 pt-110 pb-110 plr--9">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BrandCarouselOne data={brand} />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- BRAND LOGO AREA END --> */}



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
              const imageSrc = newsImages[key % newsImages.length];

              return (
                <BlogItem
                  key={key}
                  baseUrl="blog"
                  data={data}
                  slug={slug}
                  imageSrc={imageSrc}
                />
              );
            })}
          </Slider>
        </Container>
      </div>
      {/* <!-- BLOG AREA END --> */}

      {/* <!-- CALL TO ACTION START (call-to-action-6) --> */}
      <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
        <Container>
          <Row>
            <Col xs={12}>
              <CallToAction />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- CALL TO ACTION END --> */}
    </LayoutTwo>
  );
}

export async function getStaticProps() {

  const filePath = path.join(process.cwd(), "src/data/hero/", "index-three.json");

  const brandfilePath = path.join(process.cwd(), "src/data/brand-logo/", "index.json");

  const testimonialFilePath = path.join(process.cwd(), "src/data/testimonial/", "index-three.json");

  const data = JSON.parse(await fs.readFile(filePath));
  const brand = JSON.parse(await fs.readFile(brandfilePath));
  const testimonialData = JSON.parse(await fs.readFile(testimonialFilePath));

  return {
    props: {
      data,
      brand,
      testimonialData
    },
  };
}
export default HomeVersionThree;
