import Link from "next/link";
import { FaArrowRight, FaSearch, FaRegEnvelopeOpen } from "react-icons/fa";
import { LayoutOne } from "@/layouts";
import { productSlug } from "@/lib/product";
import { Container, Row, Col } from "react-bootstrap";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { getServices } from "@/lib/supabase";
import { submitMailForm } from "@/lib/mailtoForm";

const resolveImageSrc = (value, folder) => {
  if (!value) {
    return ""
  }

  if (/^(https?:)?\/\//i.test(value) || value.startsWith("/")) {
    return value
  }

  return folder ? `/img/${folder}/${value}` : value
}

function ServiceDetails({ service }) {
  const safeShortDescription = service?.shortDescription || "";
  const firstLetter = safeShortDescription.slice(0, 1);
  const firstToEnd = safeShortDescription.slice(1);
  const captions = service?.captions || {};

  return (
    <>
      <LayoutOne topbar={true}>
        {/* <!-- BREADCRUMB AREA START --> */}

        <ShopBreadCrumb
          title="Service Details"
          sectionPace=""
          currentSlug="Property Management"
        />

        {/* <!-- BREADCRUMB AREA END --> */}

        {/* <!-- PAGE DETAILS AREA START (service-details) --> */}
        <div className="ltn__page-details-area ltn__service-details-area mb-105">
          <Container>
            <Row>
              <Col xs={12} lg={8}>
                <div className="ltn__page-details-inner ltn__service-details-inner">
                  <div className="ltn__blog-img">
                    <img
                      src={resolveImageSrc(service.thumbImage, "service")}
                      alt="Service Image"
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                      onError={(e) => {
                        e.target.src = "/img/service/21.jpg";
                      }}
                    />
                  </div>
                  <p className="overflow-hidden">
                    <span className="ltn__first-letter">{firstLetter}</span>
                    {firstToEnd}
                  </p>
                  <p>{service.fullDescription}</p>
                  <Row>
                    <Col xs={12} lg={6}>
                      <img
                        src={resolveImageSrc(captions.image1, "service")}
                        alt="Detail Image 1"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                        onError={(e) => {
                          e.target.src = "/img/service/31.jpg";
                        }}
                      />
                      <label className="mt-2 d-block">{captions.caption || service.title}</label>
                    </Col>
                    <Col xs={12} lg={6}>
                      <img
                        src={resolveImageSrc(captions.image2, "service")}
                        alt="Detail Image 2"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                        onError={(e) => {
                          e.target.src = "/img/service/32.jpg";
                        }}
                      />
                    </Col>
                  </Row>
                  <p>{captions.captionFullDescription || service.fullDescription}</p>
                  <p>{captions.captionShortDescription || service.shortDescription}</p>
                </div>
              </Col>
              <Col xs={12} lg={4}>
                <aside className="sidebar-area ltn__right-sidebar">
                  {/* <!-- Menu Widget --> */}
                  <div className="widget-2 ltn__menu-widget ltn__menu-widget-2 text-uppercase">
                    <ul>
                      <li>
                        <Link href="#">
                          Property Management
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link href="#">
                          Mortgage Service
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Consulting Service
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Home Buying
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Home selling
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Escrow Services
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
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
                          context: "Service Details Newsletter Widget",
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
                    <Link href="/shop/properties">
                      <img
                        src={resolveImageSrc(service.img, "service")}
                        alt="Banner Image"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                        onError={(e) => {
                          e.target.src = "/img/banner/banner-1.jpg";
                        }}
                      />
                    </Link>
                  </div>
                </aside>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- PAGE DETAILS AREA END --> */}

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

export default ServiceDetails;

export async function getStaticProps({ params }) {
  const services = await getServices();
  const service = services.find((single) => productSlug(single.title) === params.slug);

  if (!service) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: { service },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const services = await getServices();
  const paths = services.map((data) => ({
    params: {
      slug: productSlug(data.title, {
        lower: true, // convert to lower case, defaults to `false`
      }),
    },
  }));

  return { paths, fallback: 'blocking' };
}
