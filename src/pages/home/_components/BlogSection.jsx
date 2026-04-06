import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { productSlug } from "@/lib/product";
import EditableSection from "@/components/cms/EditableSection";
import EditableText from "@/components/cms/EditableText";
import TitleSection from "@/components/titleSection";
import BlogItem from "@/components/blog";
import { blogSettings } from "./SliderSettings";

const BlogSection = ({ blogData }) => {
  return (
    <EditableSection sectionKey="home.section.blog" sectionLabel="Blog Section">
      <div className="ltn__blog-area pt-120 pb-70">
        <Container>
          <Row>
            <Col lg={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Market Insights",
                  title: "Your Real Estate Guide",
                }}
              />
              <EditableText
                as="p"
                className="text-center mb-40"
                editableClassName="text-center mb-40"
                multiline
                contentKey="home:market-insights:description"
                value="Insights to help you understand the market and decide with confidence"
              />
            </Col>
          </Row>
          {blogData && blogData.length > 0 ? (
            <Slider
              {...blogSettings}
              className="ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal"
            >
              {blogData.slice(0, 3).map((data, key) => {
                const slug = data.slug || productSlug(data.title);

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
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No news articles available yet.</p>
            </div>
          )}
        </Container>
      </div>
    </EditableSection>
  );
};

export default BlogSection;
