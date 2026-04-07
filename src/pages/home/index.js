import { useState } from "react";
import path from "path";
import fs from "fs/promises";
import { LayoutTwo } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import { getProducts } from "@/lib/product";
import HeroSectionStyleThree from "@/components/hero/styleThree";
import { useSelector } from "react-redux";
import ModalVideo from "react-modal-video";
import CallToAction from "@/components/callToAction";
import portfolioData from "@/data/portfolio";
import EditableSection from "@/components/cms/EditableSection";
import { getServices, getNews, getCategories } from "@/lib/supabase";

// Import section components
import SearchSection from "./_components/SearchSection";
import AboutSection from "./_components/AboutSection";
import FeaturesSection from "./_components/FeaturesSection";
import CategoriesSection from "./_components/CategoriesSection";
import ShowcaseSection from "./_components/ShowcaseSection";
import ProductsSection from "./_components/ProductsSection";
import VideoSection from "./_components/VideoSection";
import BrandsSection from "./_components/BrandsSection";
import BlogSection from "./_components/BlogSection";

function HomeVersionThree(props) {
  const [isOpen, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { data, brand, newsData, propertyCategories } = props;

  const featureData = getProducts(props.servicesData || [], "buying", "featured", 3);
  const featuredProducts = getProducts(products, "buying", "featured", 5);
  const portfolios = getProducts(portfolioData, "buying", "carousel", 5);
  const blogData = newsData || [];

  const featuredFilterOptions = [
    { key: "all", label: "All" },
    { key: "investment", label: "Investment" },
    { key: "residential", label: "Residential" },
    { key: "ready", label: "Ready" },
    { key: "under_construction", label: "Under Construction" },
  ];

  return (
    <LayoutTwo topbar={true}>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="LjCzPp-MK48"
        onClose={() => setOpen(false)}
      />

      {/* Hero Section */}
      <div className="ltn__slider-area ltn__slider-3 section-bg-2">
        <HeroSectionStyleThree data={data} />
      </div>

      <SearchSection />
      <AboutSection />
      <FeaturesSection featureData={featureData} />
      <CategoriesSection propertyCategories={propertyCategories} />
      <ShowcaseSection portfolios={portfolios} />
      <ProductsSection
        featuredProducts={featuredProducts}
        featuredFilterOptions={featuredFilterOptions}
      />
      <VideoSection />
      <BrandsSection brand={brand} />
      <BlogSection blogData={blogData} />

      {/* Call to Action */}
      <EditableSection sectionKey="home.section.cta" sectionLabel="Call To Action">
        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </EditableSection>
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
  const servicesData = await getServices();
  const newsData = await getNews();
  const propertyCategories = await getCategories("properties");

  return {
    props: {
      data,
      brand,
      testimonialData,
      servicesData,
      newsData,
      propertyCategories,
    },
    revalidate: 60,
  };
}
export default HomeVersionThree;
