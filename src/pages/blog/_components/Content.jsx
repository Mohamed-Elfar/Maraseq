import { FaCheck } from "react-icons/fa";

const BlogContent = ({ blog }) => {
  return (
    <>
      <div className="ltn__page-details-inner ltn__blog-details-inner">
        <div className="ltn__blog-meta">
          <ul>
            <li className="ltn__blog-category">
              <a href="#">{blog.type || 'REAL ESTATE'}</a>
            </li>
          </ul>
        </div>
        <h2 className="ltn__blog-title">{blog.title}</h2>
        <div className="ltn__blog-meta">
          <ul>
            <li className="ltn__blog-date">
              <i className="far fa-calendar-alt"></i>
              {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : blog.date}
            </li>
            <li>
              <a href="#">
                <i className="far fa-comments"></i>
                <span>{blog.comments || 0}</span> Comments
              </a>
            </li>
          </ul>
        </div>
        {blog.content ? (
          <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
        ) : (
          <>
            <p>{blog.fullDescription}</p>
            <p>{blog.shortDescription}</p>
          </>
        )}
        {blog.featured_image ? (
          <img
            src={blog.featured_image}
            alt="Image"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => { e.target.src = '/img/blog/1.jpg'; }}
          />
        ) : blog.thumbImg ? (
          <img
            src={`/img/blog/${blog.thumbImg}`}
            alt="Image"
            onError={(e) => { e.target.src = '/img/blog/1.jpg'; }}
          />
        ) : (
          <img src="/img/blog/1.jpg" alt="Default blog image" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
        {blog.extraInformation && blog.extraInformation.map((extra, key) => {
          return (
            <div key={key}>
              <h2>{extra.title}</h2>
              <p>{extra.description}</p>
              {extra.hr ? <hr /> : ""}
            </div>
          );
        })}

        <h2>Setting the mood with incense</h2>

        {blog.extraInformationList && (
          <div className="list-item-with-icon-2">
            <ul>
              {blog.extraInformationList.map((single, key) => {
                return (
                  <li key={key}>
                    {" "}
                    <span className="me-2">
                      <FaCheck />
                    </span>{" "}
                    {single.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {blog.blockquote && (
        <blockquote>
          <h6 className="ltn__secondary-color mt-0">
            BY {blog.blockquote.name}
          </h6>
          {blog.blockquote.quoteTitle}
        </blockquote>
      )}
      {blog.extraContent && blog.extraContent.description1 && <p>{blog.extraContent.description1}</p>}

      {blog.extraContent && (
        <>
          <img
            className="alignleft"
            src={blog.extraContent.detailImage || "/img/blog/blog-details/1.jpg"}
            alt="Image"
          />
          {blog.extraContent.description2 && <p>{blog.extraContent.description2}</p>}
          {blog.extraContent.description3 && <p>{blog.extraContent.description3}</p>}

          {blog.extraContent.title && <h4>{blog.extraContent.title}</h4>}
          {blog.extraContent.description4 && <p>{blog.extraContent.description4}</p>}

          <div className="row">
            <div className="col-lg-6">
              {blog.extraContent.caption && blog.extraContent.caption.img1 && (
                <>
                  <img
                    src={`/img/service/${blog.extraContent.caption.img1}`}
                    alt="Image"
                    onError={(e) => { e.target.src = '/img/service/1.jpg'; }}
                  />
                  <label>{blog.extraContent.caption.imageCaption || 'Service Image'}</label>
                </>
              )}
            </div>
            <div className="col-lg-6">
              {blog.extraContent.caption && blog.extraContent.caption.img2 ? (
                <img
                  src={`/img/service/${blog.extraContent.caption.img2}`}
                  alt="Image"
                  onError={(e) => { e.target.src = '/img/service/2.jpg'; }}
                />
              ) : (
                <img
                  src="/img/service/2.jpg"
                  alt="Default service image"
                />
              )}
            </div>
          </div>
          {blog.extraContent.caption && blog.extraContent.caption.imageCaptionDetails && (
            <p>{blog.extraContent.caption.imageCaptionDetails}</p>
          )}
        </>
      )}
    </>
  );
};

export default BlogContent;
