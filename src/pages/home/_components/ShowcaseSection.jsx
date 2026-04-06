import Slider from "react-slick";
import EditableSection from "@/components/cms/EditableSection";
import PortfolioitemThree from "@/components/portfolio/itemThree";
import imageSlider from "@/assets/images/home/imageSlider.png";
import { portfolioSettings } from "./SliderSettings";

const ShowcaseSection = ({ portfolios }) => {
  return (
    <EditableSection sectionKey="home.section.showcase" sectionLabel="Showcase Slider">
      <div className="ltn__img-slider-area">
        <Slider {...portfolioSettings} className="ltn__image-slider-4-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
          {portfolios.map((portfolio, key) => {
            return (
              <PortfolioitemThree
                key={key}
                data={portfolio}
                imageSrc={imageSlider.src}
              />
            );
          })}
        </Slider>
      </div>
    </EditableSection>
  );
};

export default ShowcaseSection;
