import { useState, useEffect } from "react";
import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import { getNews } from "@/lib/supabase";
import { productSlug } from "@/lib/product";
import BlogItem from "@/components/blog";
import CallToAction from "@/components/callToAction";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import blogData from "@/data/blog";

function BlogPage() {
  const perPageLimit = 6;
  const [newsData, setNewsData] = useState(blogData);
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        // If no news from Supabase, use hardcoded data
        setNewsData(data && data.length > 0 ? data : blogData);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to hardcoded data on error
        setNewsData(blogData);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + perPageLimit;
    setCurrentItems(newsData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(newsData.length / perPageLimit));
  }, [itemOffset, perPageLimit, newsData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perPageLimit) % newsData.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return (
      <LayoutOne>
        <Container>
          <Row>
            <Col>
              <div className="text-center py-5">
                <h3>Loading news...</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    );
  }

  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="News & Updates"
          sectionPace=""
          currentSlug="News"
        />

        <div className="ltn__blog-area ltn__blog-item-3-normal mb-100">
          <Container>
            <Row>
              {currentItems.map((data, key) => {
                const slug = data.slug || productSlug(data.title);
                return (
                  <Col xs={12} sm={6} lg={4} key={key}>
                    <BlogItem baseUrl="blog" data={data} slug={slug} />
                  </Col>
                );
              })}
            </Row>

            <Row>
              <Col xs={12}>
                <div className="ltn__pagination-area">
                  <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    nextLabel={<FaAngleDoubleRight />}
                    previousLabel={<FaAngleDoubleLeft />}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination ltn__pagination justify-content-center"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </Col>
            </Row>
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

export default BlogPage;