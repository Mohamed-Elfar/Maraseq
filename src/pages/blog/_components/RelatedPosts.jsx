import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { getProducts, productSlug } from "@/lib/product";
import blogData from "@/data/blog";

const RelatedBlogs = ({ blog }) => {
  const relatedBlogs = blogData ? getProducts(blogData, blog.category?.[0], "popular", 2) : [];

  return (
    <div className="related-post-area mb-50">
      <h4 className="title-2">Related Post</h4>
      <Row>
        {relatedBlogs.map((blog, key) => {
          const slug = productSlug(blog.title);
          const relatedImage = blog.featured_image || blog.thumbImg || `/img/blog/${(key + 1)}.jpg`;

          return (
            <Col xs={12} md={6} key={key}>
              <div className="ltn__blog-item ltn__blog-item-6">
                <div className="ltn__blog-img">
                  <Link href={`/blog/${slug}`}>
                    <img
                      src={relatedImage.startsWith('/img/') ? relatedImage : `/img/blog/${relatedImage}`}
                      alt="Image"
                      onError={(e) => { e.target.src = '/img/blog/1.jpg'; }}
                    />
                  </Link>
                </div>
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-date ltn__secondary-color">
                        <FaCalendarAlt />
                        {blog.date}
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <Link href={`/blog/${slug}`}>{blog.title}</Link>
                  </h3>
                  <p>{blog.shortDescription}</p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RelatedBlogs;
