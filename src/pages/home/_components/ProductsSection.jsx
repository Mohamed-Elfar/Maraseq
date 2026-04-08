import { useState } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import EditableSection from "@/components/cms/EditableSection";
import TitleSection from "@/components/titleSection";
import ProductItem from "@/components/product";
import { productCarouselsettings } from "./SliderSettings";
import { productSlug } from "@/lib/product";

const ProductsSection = ({ featuredProducts, featuredFilterOptions }) => {
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);


  const filteredFeaturedProducts = featuredProducts.filter((product) => {
    if (featuredFilter === "all") return true;

    // Check for objective filters first
    if (product.objective && product.objective === featuredFilter) {
      return true;
    }

    // Legacy filtering for opportunity type and stage (fallback)
    const opportunityType =
      product.opportunityType || (product.rent ? "residential" : "investment");
    const opportunityStage =
      product.opportunityStage || (product.rent ? "under_construction" : "ready");

    if (featuredFilter === "investment") {
      return opportunityType === "investment";
    }

    if (featuredFilter === "residential") {
      return opportunityType === "residential";
    }

    if (featuredFilter === "ready") {
      return opportunityStage === "ready";
    }

    if (featuredFilter === "under_construction") {
      return opportunityStage === "under_construction";
    }

    return false;
  });


  return (
    <EditableSection sectionKey="home.section.products" sectionLabel="Products Section">
      <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
        <Container>
          <Row>
            <Col xs={12}>
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
            <Col xs={12}>
              <Tab.Container defaultActiveKey="all">
                <div className="ltn__tab-menu ltn__tab-menu-3 ltn__tab-menu-top-right-- text-uppercase text-center">
                  <Nav>
                    {featuredFilterOptions.map((option) => (
                      <Nav.Link
                        key={option.key}
                        eventKey={option.key}
                        onClick={() => setFeaturedFilter(option.key)}
                      >
                        {option.label}
                      </Nav.Link>
                    ))}
                  </Nav>
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey={featuredFilter}>
                    <Slider
                      {...productCarouselsettings}
                      className="ltn__product-slider-item-four-active-full-width slick-arrow-1"
                    >
                      {filteredFeaturedProducts.map((product, key) => {
                        const discountedPrice = product.discount
                          ? product.price - (product.price * product.discount) / 100
                          : null;
                        return (
                          <ProductItem
                            key={key}
                            productData={product}
                            slug={productSlug(product.title)}
                            baseUrl="shop"
                            discountedPrice={discountedPrice}
                            cartItem={cartItems.find(item => item.id === product.id)}
                            wishlistItem={wishlistItems.find(item => item.id === product.id)}
                            compareItem={compareItems.find(item => item.id === product.id)}
                          />
                        );
                      })}
                    </Slider>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
    </EditableSection>
  );
};

export default ProductsSection;
