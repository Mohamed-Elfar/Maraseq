import Link from "next/link";
import { FaUserAlt, FaEnvelope, FaGlobe, FaPencilAlt, FaComments } from "react-icons/fa";
import Author from './Author';

const Comments = () => {
  return (
    <>
      <div className="ltn__comment-area mb-50">
        <Author />
        <h4 className="title-2">03 Comments</h4>
        <div className="ltn__comment-inner">
          <ul>
            <li>
              <div className="ltn__comment-item clearfix">
                <div className="ltn__commenter-img">
                  <img src="/img/testimonial/1.jpg" alt="Image" />
                </div>
                <div className="ltn__commenter-comment">
                  <h6>
                    <Link href="#">Adam Smit</Link>
                  </h6>
                  <span className="comment-date">
                    20th May 2020
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Doloribus, omnis fugit
                    corporis iste magnam ratione.
                  </p>
                  <Link href="#" className="ltn__comment-reply-btn">
                    <i className="icon-reply-1"></i>Reply
                  </Link>
                </div>
              </div>
              <ul>
                <li>
                  <div className="ltn__comment-item clearfix">
                    <div className="ltn__commenter-img">
                      <img
                        src="/img/testimonial/3.jpg"
                        alt="Image"
                      />
                    </div>
                    <div className="ltn__commenter-comment">
                      <h6>
                        <Link href="#">Adam Smit</Link>
                      </h6>
                      <span className="comment-date">
                        21th May 2020
                      </span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Doloribus, omnis fugit
                        corporis iste magnam ratione.
                      </p>
                      <Link
                        href="#"
                        className="ltn__comment-reply-btn"
                      >
                        <i className="icon-reply-1"></i>Reply
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className="ltn__comment-item clearfix">
                <div className="ltn__commenter-img">
                  <img src="/img/testimonial/4.jpg" alt="Image" />
                </div>
                <div className="ltn__commenter-comment">
                  <h6>
                    <Link href="#">Adam Smit</Link>
                  </h6>
                  <span className="comment-date">
                    25th May 2020
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Doloribus, omnis fugit
                    corporis iste magnam ratione.
                  </p>
                  <Link href="#" className="ltn__comment-reply-btn">
                    <i className="icon-reply-1"></i>Reply
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr />

      {/* <!-- comment-reply --> */}
      <div className="ltn__comment-reply-area ltn__form-box mb-60---">
        <h4 className="title-2">Post Comment</h4>
        <form action="#">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <span className="inline-icon">
              <FaPencilAlt />
            </span>
            <textarea placeholder="Type your comments...."></textarea>
          </div>
          <div className="input-item input-item-name ltn__custom-icon">
            <input type="text" placeholder="Type your name...." />
            <span className="inline-icon">
              <FaUserAlt />
            </span>
          </div>
          <div className="input-item input-item-email ltn__custom-icon">
            <input type="email" placeholder="Type your email...." />
            <span className="inline-icon">
              <FaEnvelope />
            </span>
          </div>
          <div className="input-item input-item-website ltn__custom-icon">
            <input
              type="text"
              name="website"
              placeholder="Type your website...."
            />
            <span className="inline-icon">
              <FaGlobe />
            </span>
          </div>
          <label className="mb-0 input-info-save">
            <input type="checkbox" name="agree" /> Save my name,
            email, and website in this browser for the next time I
            comment.
          </label>
          <div className="btn-wrapper">
            <button
              className="btn theme-btn-1 btn-effect-1 text-uppercase"
              type="submit"
            >
              <span className="me-2">
                <FaComments />
              </span>
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Comments;
