import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import maraseqArLogo from "@/assets/images/logo/maraseq-ar.svg";
import separatorLogo from "@/assets/images/logo/logo.svg";
import maraseqEnLogo from "@/assets/images/logo/maraseq-en.svg";

function BrandCarouselOne({ data }) {
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

  const brandSettings = {
    rtl: false,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    centerMode: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Define the specific logos to display in order
  const logos = [
    { src: maraseqArLogo.src, alt: "Maraseq Arabic Logo" },
    { src: separatorLogo.src, alt: "Separator Logo" },
    { src: maraseqEnLogo.src, alt: "Maraseq English Logo" },
        { src: separatorLogo.src, alt: "Separator Logo" },

    // Duplicate logos for continuous carousel effect
    { src: maraseqArLogo.src, alt: "Maraseq Arabic Logo" },
    { src: separatorLogo.src, alt: "Separator Logo" },
    { src: maraseqEnLogo.src, alt: "Maraseq English Logo" },
        { src: separatorLogo.src, alt: "Separator Logo" },

  ];

  return (
    <>
      <style jsx global>{`
        .ltn__brand-logo-area .slick-slide {
          width: 200px !important;
          max-width: 200px !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .ltn__brand-logo-area .slick-slide > div {
          width: 200px !important;
          min-width: 200px !important;
          max-width: 200px !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .ltn__brand-logo-area .slick-slide .ltn__brand-logo-item {
          width: 200px !important;
          min-width: 200px !important;
          max-width: 200px !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .ltn__brand-logo-area .slick-list {
          width: auto !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .ltn__brand-logo-area .slick-track {
          display: flex !important;
          width: auto !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .ltn__brand-logo-area.ltn__brand-logo-1 {
          padding: 0 !important;
        }
      `}</style>
      <Slider
        {...brandSettings}
        className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1"
      >
        {logos.map((logo, key) => {
          return (
            <div key={key} className="ltn__brand-logo-item">
              <img 
                src={logo.src} 
                alt={logo.alt}
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "contain",
                  objectPosition: "center"
                }}
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
}

export default BrandCarouselOne;
