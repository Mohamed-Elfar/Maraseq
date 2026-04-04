import { Row, Col } from "react-bootstrap";
import { FaRegComments } from "react-icons/fa";

const PortfolioContent = ({ 
  portfolio, 
  firstLetter, 
  firstToEnd, 
  getImageSrc 
}) => {
  return (
    <>
      <p className="overflow-hidden">
        <span className="ltn__first-letter">{firstLetter}</span>
        {firstToEnd}
      </p>

      <p>{portfolio.fullDescription}</p>

      <Row>
        {portfolio.reviews.map((review, key) => {
          return (
            <Col key={key} xs={12} lg={6}>
              <div className="ltn__testimonial-item ltn__testimonial-item-3">
                <div className="ltn__testimonial-img">
                  <img
                    src={`/img/blog/${review.author.productImage}`}
                    alt="Image"
                  />
                </div>
                <div className="ltn__testimoni-info">
                  <p>{review.author.description}</p>
                  <div className="ltn__testimoni-info-inner">
                    <div className="ltn__testimoni-img">
                      <img
                        src={`/img/testimonial/${review.author.img}`}
                        alt="Image"
                      />
                    </div>
                    <div className="ltn__testimoni-name-designation">
                      <h4>{review.author.name}</h4>
                      <h6>{review.author.designation}</h6>
                    </div>
                  </div>
                  <div className="ltn__testimoni-bg-icon">
                    <span>
                      <FaRegComments />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      <p>{portfolio.fullDescription}</p>
      <Row>
        <Col xs={12} lg={6}>
          <img
            src={getImageSrc(portfolio.captions.image1)}
            alt="Portfolio detail image 1"
          />
          <label>{portfolio.captions.caption}</label>
        </Col>
        <Col xs={12} lg={6}>
          <img
            src={getImageSrc(portfolio.captions.image2)}
            alt="Portfolio detail image 2"
          />
        </Col>
      </Row>
      <p>{portfolio.captions.captionFullDescription}</p>
      <p>{portfolio.captions.captionShortDescription}</p>
    </>
  );
};

export default PortfolioContent;
