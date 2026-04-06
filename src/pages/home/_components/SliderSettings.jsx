import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
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

export const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
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

export const portfolioSettings = {
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

export const productsettings = {
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

export const productCarouselsettings = {
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

export const blogSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
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

// Default export to satisfy Next.js build (not used as a page)
export default function SliderSettings() {
  return null;
}
