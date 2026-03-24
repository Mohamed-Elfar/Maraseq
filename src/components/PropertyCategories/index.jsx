import Link from "next/link";
import { Col, Row } from "react-bootstrap";

const PropertyCategories = () => {
  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={8}>
          <div
            className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
            style={{
              backgroundImage: `url("/img/gallery/2.jpg")`,
            }}
          >
            <div className="ltn__banner-info">
              <h3>
                <Link href="/shop"> Apartments Path </Link>
              </h3>
              <p>Flexible options for modern living</p>
              <mark> 13 Listings</mark>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div
            className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
            style={{
              backgroundImage: `url("/img/gallery/3.jpg")`,
            }}
          >
            <div className="ltn__banner-info">
              <h3>
                <Link href="/shop"> Compound Path </Link>
              </h3>
              <p>Integrated communities with balanced living</p>
              <mark> 13 Listings</mark>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div
            className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
            style={{
              backgroundImage: `url("/img/gallery/7.jpg")`,
            }}
          >
            <div className="ltn__banner-info">
              <h3>
                <Link href="/shop"> Houses Path </Link>
              </h3>
              <p>More space, more privacy</p>
              <mark> 13 Listings</mark>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div
            className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
            style={{
              backgroundImage: `url("/img/gallery/8.jpg")`,
            }}
          >
            <div className="ltn__banner-info">
              <h3>
                <Link href="/shop"> Retail Path </Link>
              </h3>
              <p>Strategic locations for business growth</p>
              <mark> 13 Listings</mark>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div
            className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
            style={{
              backgroundImage: `url("/img/gallery/9.jpg")`,
            }}
          >
            <div className="ltn__banner-info">
              <h3>
                <Link href="/shop"> Villas Path </Link>
              </h3>
              <p>Luxury living with refined details</p>
              <mark> 13 Listings</mark>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PropertyCategories;
