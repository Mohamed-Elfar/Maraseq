import Link from "next/link";
import { FaTags, FaRegCalendarAlt } from "react-icons/fa";
import EditableImage from "@/components/cms/EditableImage";
const BlogItem = ({ baseUrl, data, slug, imageSrc }) => {
  const blogImage = imageSrc || data.featured_image || `/img/blog/${data.thumbImg}` || "/img/blog/1.jpg";

  return (
    <>
      <div className="ltn__blog-item ltn__blog-item-3">
        <div className="ltn__blog-img">
          <Link href={`${baseUrl}/${slug}`}>
            <img
              src={blogImage}
              alt={data.title}
              onError={(e) => {
                e.target.src = '/img/blog/1.jpg';
              }}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </Link>
        </div>
        <div className="ltn__blog-brief">
          <div className="ltn__blog-meta">
            <ul>

              <li className="ltn__blog-tags">
                <Link href="#">
                  <FaTags className="me-2" />
                  {data.type || 'REAL ESTATE'}
                </Link>
              </li>
            </ul>
          </div>
          <h3 className="ltn__blog-title">
            <Link href={`${baseUrl}/${slug}`}>{data.title}</Link>
          </h3>
          {data.excerpt ? (
            <p className="ltn__blog-summary">{data.excerpt}</p>
          ) : data.shortDescription ? (
            <p className="ltn__blog-summary">{data.shortDescription}</p>
          ) : null}
          <div className="ltn__blog-meta-btn">
            <div className="ltn__blog-meta">
              <ul>
                <li className="ltn__blog-date">
                  <FaRegCalendarAlt className="me-2" />
                  {data.published_at ? new Date(data.published_at).toLocaleDateString() : data.date}
                </li>
              </ul>
            </div>
            <div className="ltn__blog-btn">
              <Link href={`${baseUrl}/${slug}`}>Read more</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
