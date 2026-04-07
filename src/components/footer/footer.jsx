import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as FaIcons from "react-icons/fa";
import {
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import maraseqEnglishLogo from "@/assets/images/logo/english - vrsion Maraseq logo.svg";
import EditableText from "@/components/cms/EditableText";
import { getSocialLinks } from "@/lib/supabase";
import { canShowAtPosition } from "@/lib/socialPosition";
import { submitMailForm } from "@/lib/mailtoForm";

const FALLBACK_SOCIALS = [
  {
    id: "fallback-facebook",
    name: "Facebook",
    icon: "FaFacebookF",
    url: "https://www.facebook.com/maraseqgroup",
    position: "both",
    order_index: 1,
  },
  {
    id: "fallback-twitter",
    name: "Twitter",
    icon: "FaTwitter",
    url: "https://twitter.com/maraseqgroup",
    position: "both",
    order_index: 2,
  },
  {
    id: "fallback-instagram",
    name: "Instagram",
    icon: "FaInstagram",
    url: "https://www.instagram.com/maraseqgroup/",
    position: "both",
    order_index: 3,
  },
  {
    id: "fallback-linkedin",
    name: "LinkedIn",
    icon: "FaLinkedin",
    url: "https://www.linkedin.com/in/maraseqgroup/",
    position: "both",
    order_index: 4,
  },
];

const bySavedOrder = (left, right) => {
  const leftOrder = Number(left?.order_index ?? left?.order ?? 0);
  const rightOrder = Number(right?.order_index ?? right?.order ?? 0);

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return String(left?.name || "").localeCompare(String(right?.name || ""));
};

const getIconComponent = (iconName) => {
  if (!iconName || typeof iconName !== "string") {
    return FaIcons.FaLink;
  }

  return FaIcons[iconName] || FaIcons.FaLink;
};

const Footer = function () {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loadingSocialLinks, setLoadingSocialLinks] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setLoadingSocialLinks(true);
        const links = await getSocialLinks();
        setSocialLinks(Array.isArray(links) ? links : []);
      } catch (error) {
        console.error("Failed to load footer social links:", error);
      } finally {
        setLoadingSocialLinks(false);
      }
    };

    fetchSocialLinks();

    const intervalId = setInterval(fetchSocialLinks, 120000);
    return () => clearInterval(intervalId);
  }, []);

  const visibleSocialLinks = useMemo(() => {
    const sourceLinks = loadingSocialLinks ? FALLBACK_SOCIALS : socialLinks;

    return sourceLinks
      .filter((link) => link?.active !== false)
      .filter((link) => canShowAtPosition(link?.position, "footer"))
      .sort(bySavedOrder);
  }, [loadingSocialLinks, socialLinks]);

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
                      {/* <img src="/img/logo.png" alt="Logo" /> */}
                      <img
                        src={maraseqEnglishLogo.src}
                        alt="Maraseq Group Logo"
                        className="footer-logo-white"
                      />
                    </div>
                  </div>
                  <EditableText
                    as="p"
                    multiline
                    contentKey="footer.about.description"
                    value="We develop real estate opportunities and create clear paths that guide confident decisions, driven by market insight and value-based partnerships."
                  />
                  <div className="footer-address">
                    <ul>
                      <li>
                        <div className="footer-address-icon">
                          <FaMapMarkerAlt />
                        </div>
                        <div className="footer-address-info">
                          <EditableText
                            as="p"
                            multiline
                            contentKey="footer.about.address"
                            value="Qutur, Tanta, Gharbia Governorate, Egypt"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <FaPhoneAlt />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <Link href="tel:+201102223231">
                              <EditableText
                                as="span"
                                contentKey="footer.about.phone"
                                value="+201102223231"
                              />
                            </Link>
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
                              <EditableText
                                as="span"
                                contentKey="footer.about.email"
                                value="info@maraseqgroup.com"
                              />
                            </Link>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="ltn__social-media mt-20">
                    <ul>
                      {visibleSocialLinks.map((link) => {
                        const IconComponent = getIconComponent(link.icon);

                        return (
                          <li key={link.id || `${link.name}-${link.url}`}>
                            <Link
                              href={link.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={link.name || "Social Link"}
                            >
                              <IconComponent />
                            </Link>
                          </li>
                        );
                      })}
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
                        <Link href="/shop/properties">All Products</Link>
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
                        <Link href="/compare">Compare</Link>
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
                    <form
                      action="#"
                      onSubmit={(event) =>
                        submitMailForm(event, {
                          to: "marketing@maraseqgroup.com",
                          subject: "Newsletter Subscription",
                          context: "Footer Newsletter",
                        })
                      }
                    >
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
                    All Rights Reserved by Maraseq Group
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



