import { useState } from "react";
import ModalVideo from "react-modal-video";
import Link from "next/link";
import Slider from "react-slick";
import {
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaStar,
  FaStarHalfAlt,
  FaSearch,
  FaRegStar,
  FaDribbble,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaUserAlt,
  FaEnvelope,
  FaGlobe,
  FaPencilAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import BreadCrumb from "@/components/breadCrumbs";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyAreaBreakdown from "@/components/PropertyAreaBreakdown";
import { getUnitTypeLabel, getFinishStatusLabel, getFinishStatusInArabic, productSlug } from "@/utils/propertyHelpers";

import { LayoutOne } from "@/layouts";
import { useSelector } from "react-redux";
import { getProducts, getDiscountPrice } from "@/lib/product";
import { getProperties } from "@/lib/supabase";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import RelatedProduct from "@/components/product/related-product";
import FollowUs from "@/components/followUs";
import Tags from "@/components/tags";
import CallToAction from "@/components/callToAction";
import { formatPropertyStatus } from "@/utils/property-status";

function ProductDetails({ product, latestBlogs, categories }) {
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  const relatedProducts = getProducts(
    products,
    product.category[0],
    "popular",
    2
  );

  const topRatedProducts = getProducts(
    products,
    product.category[0],
    "topRated",
    2
  );
  const popularProducts = getProducts(
    products,
    product.category[0],
    "popular",
    4
  );

  const discountedPrice = getDiscountPrice(
    product.price,
    product.discount
  ).toFixed(2);

  const productPrice = product.price.toFixed(2);
  const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);
  const wishlistItem = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === product.id
  );
  const compareItem = compareItems.find(
    (compareItem) => compareItem.id === product.id
  );


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
  const productDetailsCarouselSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "450px",
    slidesToShow: 1,
    dots: false,
    speed: 500,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          dots: true,
        },
      },
    ],
  };

  const popular_product = {
    infinite: true,
    slidesToShow: 1,
    dots: true,
    speed: 500,
    arrows: false,
  };

  const [isOpen, setOpen] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = getYouTubeVideoId(product.videoUrl);

  return (
    <>
      <LayoutOne topbar={true}>
        {videoId && (
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={videoId}
            onClose={() => setOpen(false)}
          />
        )}
        {/* <!-- BREADCRUMB AREA START --> */}

        <BreadCrumb
          title="Product Details"
          sectionPace="mb-0"
          currentSlug={product.title}
        />

        {/* <!-- BREADCRUMB AREA END --> */}

        {/* <!-- IMAGE SLIDER AREA START (img-slider-3) --> */}
        <div className="ltn__img-slider-area mb-90">
          <Container fluid className="px-0">
            <Slider
              {...productDetailsCarouselSettings}
              className="ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner"
            >
              {product.carousel.map((single, key) => {
                return (
                  <div className="ltn__img-slide-item-4" key={key}>
                    <Link href="#">
                      <img
                        src={`/img/img-slide/${single.img}`}
                        alt={`${single.title}`}
                      />
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </Container>
        </div>
        {/* <!-- IMAGE SLIDER AREA END -->

    <!-- SHOP DETAILS AREA START --> */}
        <div className="ltn__shop-details-area pb-10">
          <Container>
            <Row>
              <Col xs={12} lg={8}>
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <div className="ltn__blog-meta">
                    <ul>
                      {product.propertyDetails?.propertyStatus && (
                        <li className="ltn__blog-category">
                          <Link className="bg-orange" href="#">
                            {formatPropertyStatus(product.propertyDetails.propertyStatus)}
                          </Link>
                        </li>
                      )}

                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt"></i>
                        {product.date}
                      </li>
                    </ul>
                  </div>
                  <h1> {product.title}</h1>
                  <label>
                    <span className="ltn__secondary-color">
                      <i className="flaticon-pin"></i>
                    </span>{" "}
                    {product.locantion}
                  </label>
                  <h4 className="title-2"> {product.description.title}</h4>
                  <p>{product.description.fullDescription}</p>
                  <p>{product.description.shortDescription}</p>

                  <h4 className="title-2">Property Detail</h4>
                  <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                    <ul>
                      <li>
                        <label>Home Area:</label>{" "}
                        <span>{product.propertyDetails.area} {getUnitTypeLabel(product.propertyDetails.unitType)}</span>
                      </li>
                      <li>
                        <label>Beds:</label>{" "}
                        <span>{product.propertyDetails.bedrooms}</span>
                      </li>
                      <li>
                        <label>Baths:</label>{" "}
                        <span>{product.propertyDetails.baths}</span>
                      </li>
                      <li>
                        <label>Rooms:</label>{" "}
                        <span>{product.propertyDetails.rooms || 0}</span>
                      </li>
                      <li>
                        <label>Year built:</label>{" "}
                        <span>{product.propertyDetails.createdYear}</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <label>Price:</label> <span>${product.price}</span>
                      </li>
                      <li>
                        <label>Property Status:</label>{" "}
                        <span>
                          {formatPropertyStatus(product.propertyDetails.propertyStatus)}
                        </span>
                      </li>
                      <li>
                        <label>Finish Status:</label>{" "}
                        <span>{getFinishStatusLabel(product.propertyDetails.finishStatus)}</span>
                      </li>
                    </ul>
                  </div>

                  <PropertyGallery galleryImages={product.galleryImages} />

                  <h4 className="title-2">Location</h4>
                  <div className="property-details-google-map mb-60">
                    <iframe
                      src={product.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27367.521335544432!2d30.974130060919684!3d30.972151866016276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7b3b31ed01575%3A0x2ae50b1962e6af90!2z2YLYt9mI2LHYjCDZhdiv2YrZhtipINmC2LfZiNix2Iwg2YXYsdmD2LIg2YLYt9mI2LHYjCDZhdit2KfZgdi42Kkg2KfZhNi62LHYqNmK2Kk!5e0!3m2!1sar!2seg!4v1773696322276!5m2!1sar!2seg"}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowFullScreen=""
                    ></iframe>
                  </div>

                  <h4 className="title-2">Floor Plans</h4>
                  {/* <!-- APARTMENTS PLAN AREA START --> */}

                  <div className="ltn__apartments-plan-area product-details-apartments-plan mb-60">
                    <Tab.Container defaultActiveKey="first">
                      <div className="ltn__tab-menu ltn__tab-menu-3">
                        <Nav className="nav">
                          <Nav.Link eventKey="first">First Floor</Nav.Link>
                          <Nav.Link eventKey="second">Second Floor</Nav.Link>
                          <Nav.Link eventKey="third">Third Floor</Nav.Link>
                          <Nav.Link eventKey="fourth">Top Garden</Nav.Link>
                        </Nav>
                      </div>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="ltn__apartments-tab-content-inner">
                            <div className="row">
                              <div className="col-lg-7">
                                <div className="apartments-plan-img">
                                  <img src="/img/others/10.png" alt="#" />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info">
                                  <h2>First Floor</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="product-details-apartments-info-list  section-bg-1">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Total Area</label>{" "}
                                            <span>{product.propertyDetails.totalArea || product.propertyDetails.area} {getUnitTypeLabel(product.propertyDetails.unitType)}</span>
                                          </li>
                                          <li>
                                            <label>Net Area</label>{" "}
                                            <span>{product.propertyDetails.netArea || '-'} {product.propertyDetails.netArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Land Area</label>{" "}
                                            <span>{product.propertyDetails.landArea || '-'} {product.propertyDetails.landArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                          <li>
                                            <label>Built-up Area</label>
                                            <span>{product.propertyDetails.builtUpArea || '-'} {product.propertyDetails.builtUpArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="ltn__product-tab-content-inner">
                            <div className="row">
                              <div className="col-lg-7">
                                <div className="apartments-plan-img">
                                  <img src="/img/others/10.png" alt="#" />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info">
                                  <h2>Second Floor</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="product-details-apartments-info-list  section-bg-1">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Total Area</label>{" "}
                                            <span>{product.propertyDetails.totalArea || product.propertyDetails.area} {getUnitTypeLabel(product.propertyDetails.unitType)}</span>
                                          </li>
                                          <li>
                                            <label>Net Area</label>{" "}
                                            <span>{product.propertyDetails.netArea || '-'} {product.propertyDetails.netArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Land Area</label>{" "}
                                            <span>{product.propertyDetails.landArea || '-'} {product.propertyDetails.landArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                          <li>
                                            <label>Built-up Area</label>
                                            <span>{product.propertyDetails.builtUpArea || '-'} {product.propertyDetails.builtUpArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <div className="ltn__product-tab-content-inner">
                            <div className="row">
                              <div className="col-lg-7">
                                <div className="apartments-plan-img">
                                  <img src="/img/others/10.png" alt="#" />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info">
                                  <h2>Third Floor</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="product-details-apartments-info-list  section-bg-1">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Total Area</label>{" "}
                                            <span>{product.propertyDetails.totalArea || '-'} {product.propertyDetails.totalArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                          <li>
                                            <label>Net Area</label>{" "}
                                            <span>{product.propertyDetails.netArea || '-'} {product.propertyDetails.netArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Land Area</label>{" "}
                                            <span>{product.propertyDetails.landArea || '-'} {product.propertyDetails.landArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                          <li>
                                            <label>Built-up Area</label>
                                            <span>{product.propertyDetails.builtUpArea || '-'} {product.propertyDetails.builtUpArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                          <div className="ltn__product-tab-content-inner">
                            <div className="row">
                              <div className="col-lg-7">
                                <div className="apartments-plan-img">
                                  <img src="/img/others/10.png" alt="#" />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info">
                                  <h2>Top Garden</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="product-details-apartments-info-list  section-bg-1">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Total Area</label>{" "}
                                            <span>{product.propertyDetails.totalArea || '-'} {product.propertyDetails.totalArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                          <li>
                                            <label>Net Area</label>{" "}
                                            <span>{product.propertyDetails.netArea || '-'} {product.propertyDetails.netArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="apartments-info-list apartments-info-list-color">
                                        <ul>
                                          <li>
                                            <label>Land Area</label>{" "}
                                            <span>{product.propertyDetails.landArea || '-'} {product.propertyDetails.landArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                          <li>
                                            <label>Built-up Area</label>
                                            <span>{product.propertyDetails.builtUpArea || '-'} {product.propertyDetails.builtUpArea ? getUnitTypeLabel(product.propertyDetails.unitType) : ''}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>

                  {/* <!-- APARTMENTS PLAN AREA END --> */}

                  {videoId && (
                    <>
                      <h4 className="title-2">Property Video</h4>
                      <div
                        className="ltn__video-bg-img ltn__video-popup-height-500 bg-overlay-black-50 bg-image mb-60"
                        style={{
                          backgroundImage: `url(${product.videoPoster
                            ? (product.videoPoster.startsWith('http') ? product.videoPoster : `/img/others/${product.videoPoster}`)
                            : (product.productImg?.startsWith('http') ? product.productImg : `/img/product-3/${product.productImg || '1.jpg'}`)
                            })`
                        }}
                      >
                        <button
                          className="ltn__video-icon-2 ltn__video-icon-2-border---"
                          onClick={() => setOpen(true)}
                        >
                          <FaPlay />
                        </button>
                      </div>
                    </>
                  )}

                  <h4 className="title-2">Related Properties</h4>
                  <Row>
                    {relatedProducts.map((data, key) => {
                      const slug = productSlug(data.title);
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
                        <Col xs={12} sm={6} key={key}>
                          <RelatedProduct
                            productData={data}
                            slug={slug}
                            baseUrl="shop"
                            discountedPrice={discountedPrice}
                            productPrice={productPrice}
                            cartItem={cartItem}
                            wishlistItem={wishlistItem}
                            compareItem={compareItem}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>

              <Col xs={12} lg={4}>
                <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                  {/* <!-- Search Widget --> */}
                  <div className="widget ltn__search-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Search Objects
                    </h4>
                    <form action="#">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search your keyword..."
                      />
                      <button type="submit">
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                  {/* <!-- Form Widget --> */}
                  <div className="widget ltn__form-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Drop Messege For Book
                    </h4>
                    <form action="#">
                      <input
                        type="text"
                        name="yourname"
                        placeholder="Your Name*"
                      />
                      <input
                        type="text"
                        name="youremail"
                        placeholder="Your e-Mail*"
                      />
                      <textarea
                        name="yourmessage"
                        placeholder="Write Message..."
                      ></textarea>
                      <button type="submit" className="btn theme-btn-1">
                        Send Messege
                      </button>
                    </form>
                  </div>
                  {/* <!-- Top Rated Product Widget --> */}
                  <div className="widget ltn__top-rated-product-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Top Rated Product
                    </h4>
                    <ul>
                      {topRatedProducts.map((product, keys) => {
                        const slug = productSlug(product.title);
                        let key = keys + 1;
                        return (
                          <li key={product.id}>
                            <div className="top-rated-product-item clearfix">
                              <div className="top-rated-product-img">
                                <a href={`/shop/${slug}`}>
                                  <img
                                    src={`/img/product/${key}.png`}
                                    alt={product.title}
                                  />
                                </a>
                              </div>
                              <div className="top-rated-product-info">
                                <div className="product-ratting">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <h6>
                                  <a href={`/shop/${slug}`}>{product.title}</a>
                                </h6>
                                <div className="product-price">
                                  <span>${product.price}</span>
                                  <del>${discountedPrice}</del>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* <!-- Menu Widget (Category) --> */}
                  <div className="widget ltn__menu-widget ltn__menu-widget-2--- ltn__menu-widget-2-color-2---">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Top Categories
                    </h4>
                    <ul>
                      {categories && categories.length > 0 ? (
                        categories.slice(0, 5).map((category) => (
                          <li key={category.name}>
                            <Link
                              href={{
                                pathname: "/shop/properties",
                                query: { category: category.name },
                              }}
                            >
                              {category.name} <span>({category.property_count})</span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <Link href="/shop/properties">
                            No categories available
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                  {/* <!-- Popular Product Widget --> */}
                  <div className="widget ltn__popular-product-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Popular Properties
                    </h4>

                    <Slider
                      {...popular_product}
                      className="row ltn__popular-product-widget-active slick-arrow-1"
                    >
                      {/* <!-- ltn__product-item --> */}

                      {popularProducts.map((product, key) => {
                        const slug = productSlug(product.title);
                        return (
                          <div
                            key={key}
                            className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---"
                          >
                            <div className="product-img">
                              <Link href={`/shop/${slug}`}>
                                <img
                                  src={`/img/product-3/${product.productImg}`}
                                  alt={slug}
                                />
                              </Link>
                              <div className="real-estate-agent">
                                <div className="agent-img">
                                  <Link href="#">
                                    <img src={`/img/blog/author.jpg`} alt="#" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="product-info">
                              <div className="product-price">
                                <span>
                                  ${product.price}
                                  <label>/Month</label>
                                </span>
                              </div>
                              <h2 className="product-title">
                                <Link href={`/shop/${slug}`}>
                                  {product.title}
                                </Link>
                              </h2>
                              <div className="product-img-location">
                                <ul>
                                  <li>
                                    <Link href="product-details">
                                      <i className="flaticon-pin"></i>
                                      {product.locantion}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                <li>
                                  <span>
                                    {product.propertyDetails.bedrooms}
                                  </span>
                                  <span className="ms-1">Bedrooms</span>
                                </li>
                                <li>
                                  <span>{product.propertyDetails.baths}</span>
                                  <span className="ms-1">Bathrooms</span>
                                </li>
                                <li>
                                  <span>{product.propertyDetails.area}</span>
                                  <span className="ms-1">{getUnitTypeLabel(product.propertyDetails.unitType)}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                  {/* <!-- Popular Post Widget --> */}
                  <div className="widget ltn__popular-post-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Latest Blogs
                    </h4>
                    <ul>
                      {latestBlogs && latestBlogs.map((blog, key) => {
                        const slug = productSlug(blog.title);
                        const blogImage = blog.featured_image || `/img/team/${key + 1}.jpg`;
                        const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        });

                        return (
                          <li key={key}>
                            <div className="popular-post-widget-item clearfix">
                              <div className="popular-post-widget-img">
                                <Link href={`/blog/${slug}`}>
                                  <img
                                    src={blogImage}
                                    alt={blog.title}
                                  />
                                </Link>
                              </div>
                              <div className="popular-post-widget-brief">
                                <h6>
                                  <Link href={`/blog/${slug}`}>
                                    {blog.title}
                                  </Link>
                                </h6>
                                <div className="ltn__blog-meta">
                                  <ul>
                                    <li className="ltn__blog-date">
                                      <Link href={`/blog/${slug}`}>
                                        <span>
                                          <FaCalendarAlt />
                                        </span>
                                        <span>{formattedDate}</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <FollowUs title="Follow Us" />
                </aside>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- SHOP DETAILS AREA END -->

    <!-- CALL TO ACTION START (call-to-action-6) --> */}
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
      </LayoutOne>

    </>
  );
}

export default ProductDetails;


export async function getServerSideProps({ params }) {
  // get product data based on slug from Supabase
  const properties = await getProperties();

  // Fetch latest blogs from Supabase
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: latestBlogs } = await supabase
    .from('news')
    .select('id, title, featured_image, created_at')
    .order('created_at', { ascending: false })
    .limit(4);

  // Fetch categories with property counts
  const { data: categoriesData } = await supabase.rpc('get_category_counts');

  const categories = categoriesData || [];

  // Transform database format to match website format
  const transformedProperties = properties.map(property => ({
    id: property.id,
    carousel: property.carousel || [],
    title: property.title,
    productImg: property.product_img || property.images?.[0] || '',
    price: parseFloat(property.price) || 0,
    priceRange: property.price_range || [],
    discount: property.discount || 0,
    country: property.country || false,
    district: property.district || '',
    properties: property.properties_count || 0,
    featured: property.featured || false,
    new: property.new || false,
    rent: property.rent || false,
    photo: property.photo || [],
    video: property.video || [],
    bedBath: property.bed_bath || [],
    ratingCount: property.rating_count || 0,
    rating: property.rating || 0,
    saleCount: property.sale_count || 0,
    category: property.category || [],
    tag: property.tags || [],
    date: property.date || property.created_at,
    comments: property.comments || 0,
    locantion: property.location || '',
    pathDescription: property.path_description || '',
    idealFor: property.ideal_for || '',
    recommendedLabel: property.recommended_label || '',
    opportunityType: property.opportunity_type || '',
    opportunityStage: property.opportunity_stage || '',
    description: {
      title: 'Description',
      fullDescription: property.full_description || property.description || '',
      shortDescription: property.short_description || property.meta_description || ''
    },
    propertyDetails: {
      ...(property.property_details || {}),
      propertyId: property.id,
      area: property.area,
      unitType: property.unit_type || 'sq_m',
      propertyStatus: property.status,
      finishStatus: property.finish_status || 'without_finish',
      totalArea: property.total_area || property.property_details?.totalArea || null,
      netArea: property.net_area || property.property_details?.netArea || null,
      builtUpArea: property.built_up_area || property.property_details?.builtUpArea || null,
      landArea: property.land_area || property.property_details?.landArea || null,
      rooms: property.rooms || 0,
      bedrooms: property.bedrooms,
      baths: property.bathrooms,
      createdYear: property.year_built || new Date(property.created_at).getFullYear(),
      areaBreakdown: {
        livingArea: property.living_area ?? null,
        kitchenArea: property.kitchen_area ?? null,
        diningArea: property.dining_area ?? null,
        bedroomArea: property.bedroom_area ?? null,
        bathroomArea: property.bathroom_area ?? null,
        storageArea: property.storage_area ?? null,
        outdoorArea: property.outdoor_area ?? null,
        otherArea: property.other_area ?? null,
      }
    },
    factsAndFeatures: property.facts_and_features || {},
    amenities1: property.amenities1 || [],
    amenities2: property.amenities2 || [],
    amenities3: property.amenities3 || [],
    AmenitiesList: property.amenities_list || [],
    agent: property.agent || {},
    gallery: property.gallery || {},
    propertyTypes: property.property_types || [],
    mapEmbedUrl: property.map_embed_url || null,
    videoUrl: property.video_url || null,
    videoPoster: property.video_poster || null,
    galleryImages: property.gallery_images || []
  }));

  const product = transformedProperties.find(
    (single) => productSlug(single.title) === params.slug
  );

  if (!product) {
    return { notFound: true };
  }

  return { props: { product, latestBlogs, categories } };
}


// getStaticPaths removed: not needed for getServerSideProps
