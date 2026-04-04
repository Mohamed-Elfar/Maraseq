import { Col } from "react-bootstrap";
import { FaArrowRight, FaRegEnvelopeOpen, FaSearch } from "react-icons/fa";
import { submitMailForm } from "@/lib/mailtoForm";

const PortfolioSidebar = ({ portfolio, getBannerImageSrc }) => {
  return (
    <Col xs={12} lg={4}>
      <aside className="sidebar-area ltn__right-sidebar">
        {/* <!-- Menu Widget --> */}
        <div className="widget-2 ltn__menu-widget ltn__menu-widget-2 text-uppercase">
          <ul>
            <li>
              <a href="#">
                Property Management
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
            <li className="active">
              <a href="#">
                Mortgage Service
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                Consulting Service
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                Home Buying
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                Home selling
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                Escrow Services
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Newsletter Widget --> */}
        <div className="widget ltn__search-widget ltn__newsletter-widget">
          <h6 className="ltn__widget-sub-title">{`// subscribe`}</h6>
          <h4 className="ltn__widget-title">Get Newsletter</h4>
          <form
            action="#"
            onSubmit={(event) =>
              submitMailForm(event, {
                to: "marketing@maraseqgroup.com",
                subject: "Newsletter Subscription",
                context: "Portfolio Details Newsletter Widget",
              })
            }
          >
            <input type="email" name="email" placeholder="Your email" />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          <div className="ltn__newsletter-bg-icon">
            <FaRegEnvelopeOpen />
          </div>
        </div>
        {/* <!-- Banner Widget --> */}
        <div className="widget ltn__banner-widget">
          <img
            src={getBannerImageSrc(portfolio.img)}
            alt={portfolio.title || 'Portfolio Banner'}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
        </div>
      </aside>
    </Col>
  );
};

export default PortfolioSidebar;
