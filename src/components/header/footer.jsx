import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import maraseqLogo from "@/assets/images/logo/english - vrsion Maraseq logo.svg";

const Footer = function () {
  return (
    <>
      {/* <!-- FOOTER AREA START --> */}
      <footer className="ltn__footer-area  ">
        <div className="footer-top-area  section-bg-2 plr--5">
          <Container fluid>
            <Row>
              <Col xs={12} sm={6} xl={3}>
                <div className="footer-widget footer-about-widget">
                  <div className="footer-logo">
                    <div className="site-logo">
                      <img src={maraseqLogo.src} alt="Logo" />
                    </div>
                  </div>
                  <p>
                    We develop real estate opportunities and create clear paths
                    that guide confident decisions, driven by market insight and
                    value-based partnerships.
                  </p>
                  <div className="footer-address">
                    <ul>
                      <li>
                        <div className="footer-address-icon">
                          <FaMapMarkerAlt />
                        </div>
                        <div className="footer-address-info">
                          <p>Qutur, Tanta, Gharbia Governorate, Egypt</p>
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <FaPhoneAlt />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <Link href="tel:+201102223231">+201102223231</Link>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <FaEnvelope />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <Link href="mailto:info@maraseqgroup.com">
                              info@maraseqgroup.com
                            </Link>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="ltn__social-media mt-20">
                    <ul>
                      <li>
                        <Link
                          href="https://www.facebook.com/maraseqgroup"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Facebook"
                        >
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://twitter.com/maraseqgroup"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Twitter"
                        >
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.linkedin.com/in/maraseqgroup/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Linkedin"
                        >
                          <FaLinkedin />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.instagram.com/maraseqgroup/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Instagram"
                        >
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={2}>
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Company</h4>
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link href="/about">About</Link>
                      </li>
                      <li>
                        <Link href="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link href="/shop">All Products</Link>
                      </li>
                      <li>
                        <Link href="/locations">Locations Map</Link>
                      </li>
                      <li>
                        <Link href="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={2}>
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Services</h4>
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link href="/wishlist">Wish List</Link>
                      </li>
                      <li>
                        <Link href="/terms-and-conditions">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link href="/about">Promotional Offers</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={2}>
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Customer Care</h4>
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link href="/wishlist">Wish List</Link>
                      </li>
                      <li>
                        <Link href="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={3}>
                <div className="footer-widget footer-newsletter-widget">
                  <h4 className="footer-title">Newsletter</h4>
                  <p>
                    Subscribe to our weekly Newsletter and receive updates via
                    email.
                  </p>
                  <div className="footer-newsletter">
                    <form action="#">
                      <input type="email" name="email" placeholder="Email*" />
                      <div className="btn-wrapper">
                        <button className="theme-btn-1 btn" type="submit">
                          {" "}
                          <FaPaperPlane />
                        </button>
                      </div>
                    </form>
                  </div>
                  <h5 className="mt-30">We Accept</h5>
                  <img src="/img/icons/payment-4.png" alt="Payment Image" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="ltn__copyright-area ltn__copyright-2 section-bg-7  plr--5">
          <div className="container-fluid ltn__border-top-2">
            <Row>
              <Col xs={12} md={6}>
                <div className="ltn__copyright-design clearfix">
                  <p>
                    All Rights Reserved @ Company{" "}
                    <span className="current-year"></span>
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} className="align-self-center">
                <div className="ltn__copyright-menu text-end">
                  <ul>
                    <li>
                      <Link href="/terms-and-conditions">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">Privacy & Policy</Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER AREA END --> */}
    </>
  );
};

export default Footer;
