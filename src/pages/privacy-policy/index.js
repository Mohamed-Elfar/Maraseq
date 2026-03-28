import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaArrowRight,
    FaArrowLeft,
    FaRegEnvelopeOpen,
    FaSearch,
    FaEnvelope,
} from "react-icons/fa";
import Slider from "react-slick";
import { productSlug } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import BlogItem from "@/components/blog";
import blogData from "@/data/blog";
import CallToAction from "@/components/callToAction";
import CounterUp from "@/components/counterUp";
import Link from "next/link";

function PrivacyPolicy() {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            type="button"
        >
            <FaArrowLeft />
        </button>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-next slick-arrow" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type="button"
        >
            <FaArrowRight />
        </button>
    );

    const blogSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    };

    return (
        <>
            <LayoutOne topbar={true}>
                <ShopBreadCrumb
                    title="Privacy Policy"
                    sectionPace=""
                    currentSlug="Privacy Policy"
                />

                <div className="ltn__faq-area mb-100">
                    <div className="container">
                        <Row>
                            <Col xs={12} lg={8}>
                                <div className="ltn__faq-inner ltn__faq-inner-2">
                                    <div className="section-title-area mb-30">
                                        <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                                            Policy
                                        </h6>
                                        <h1 className="section-title">Privacy Policy</h1>
                                        <p>
                                            At Maraseq, we are committed to protecting your privacy
                                            and ensuring the confidentiality of your data. This policy
                                            explains how we collect, use, and safeguard your
                                            information.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <h4>1. Introduction</h4>
                                        <p>
                                            At Maraseq, we are committed to protecting your privacy
                                            and ensuring the confidentiality of your data. This policy
                                            explains how we collect, use, and safeguard your
                                            information.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <h4>2. Information We Collect</h4>
                                        <p>We may collect the following:</p>
                                        <ul>
                                            <li>Name</li>
                                            <li>Phone number</li>
                                            <li>Email address</li>
                                            <li>Any data submitted through forms</li>
                                        </ul>
                                    </div>

                                    <div className="mb-30">
                                        <h4>3. How We Use Information</h4>
                                        <p>We use your data to:</p>
                                        <ul>
                                            <li>Communicate with you</li>
                                            <li>Provide services</li>
                                            <li>Improve user experience</li>
                                            <li>Send relevant updates (with your consent)</li>
                                        </ul>
                                    </div>

                                    <div className="mb-30">
                                        <h4>4. Data Protection</h4>
                                        <p>
                                            We take appropriate measures to protect your data from
                                            unauthorized access or misuse.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <h4>5. Information Sharing</h4>
                                        <p>We do not sell or rent your data.</p>
                                        <p>We may share it only when:</p>
                                        <ul>
                                            <li>Required by law</li>
                                            <li>
                                                Working with trusted partners to improve services
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mb-30">
                                        <h4>6. Cookies</h4>
                                        <p>
                                            We may use cookies to enhance browsing experience and
                                            analyze usage.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <h4>7. External Links</h4>
                                        <p>
                                            We are not responsible for the privacy practices of
                                            external websites linked from our site.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <h4>8. User Rights</h4>
                                        <p>You have the right to:</p>
                                        <ul>
                                            <li>Request data updates or deletion</li>
                                            <li>Ask about how your data is used</li>
                                        </ul>
                                    </div>

                                    <div className="mb-30">
                                        <h4>9. Policy Updates</h4>
                                        <p>
                                            We reserve the right to update this policy at any time.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <h4>10. Contact</h4>
                                        <p>For any inquiries:</p>
                                        <p className="mb-0">
                                            <FaEnvelope className="me-2" />
                                            <a href="mailto:info@maraseqgroup.com">
                                                info@maraseqgroup.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </Col>

                            <Col xs={12} lg={4}>
                                <aside className="sidebar-area ltn__right-sidebar">
                                    <div className="widget ltn__search-widget ltn__newsletter-widget">
                                        <h6 className="ltn__widget-sub-title">{`// subscribe`}</h6>
                                        <h4 className="ltn__widget-title">Get Newsletter</h4>
                                        <form action="#">
                                            <input type="text" name="search" placeholder="Search" />
                                            <button type="submit">
                                                <FaSearch />
                                            </button>
                                        </form>
                                        <div className="ltn__newsletter-bg-icon">
                                            <FaRegEnvelopeOpen />
                                        </div>
                                    </div>

                                    <div className="widget ltn__banner-widget">
                                        <Link href="/shop">
                                            <img src="/img/banner/banner-3.jpg" alt="Banner Image" />
                                        </Link>
                                    </div>
                                </aside>
                            </Col>
                        </Row>
                    </div>
                </div>

                <CounterUp />

                <div className="ltn__blog-area pt-120 pb-70">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "News & Blogs",
                                        title: "Leatest News Feeds",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Slider
                            {...blogSettings}
                            className="ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal"
                        >
                            {blogData.map((data, key) => {
                                const slug = productSlug(data.title);
                                return (
                                    <BlogItem
                                        key={key}
                                        baseUrl="blog"
                                        data={data}
                                        slug={slug}
                                    />
                                );
                            })}
                        </Slider>
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

export default PrivacyPolicy;
