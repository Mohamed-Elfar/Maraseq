import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { FaCarAlt, FaUserAlt } from "react-icons/fa";
import Link from "next/link";

const locationOptions = [
  "All Locations",
  "New Cairo",
  "New Capital",
  "Sheikh Zayed",
  "Fifth Settlement",
  "North Coast",
  "Cairo",
  "Giza",
  "Alexandria",
  "Qalyubia",
  "Dakahlia",
  "Sharqia",
  "Gharbia",
  "Monufia",
  "Beheira",
  "Kafr El Sheikh",
  "Damietta",
  "Port Said",
  "Ismailia",
  "Suez",
  "Fayoum",
  "Beni Suef",
  "Minya",
  "Assiut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
  "Red Sea",
  "New Valley",
  "Matrouh",
  "North Sinai",
  "South Sinai",
];

const opportunityTypeOptions = [
  "All Opportunities",
  "Apartment",
  "Villa",
  "Duplex",
  "Penthouse",
  "Office",
  "Retail",
  "Land",
];

const goalOptions = [
  "All",
  "Living",
  "Investment",
  "Passive Income",
  "Resale",
  "Ready",
  "Under Construction",
];

function CarDealerSearchForm({ navMenuClass, customClasses }) {
  return (
    <>
      <div
        className={`ltn__car-dealer-form-area mt--65 mt-120 ${customClasses}`}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <h5 className="text-center mb-20 text-white">
                Start where it fits you ... we'll take you further
              </h5>
              <div className="ltn__car-dealer-form-tab">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div
                    className={`ltn__tab-menu text-uppercase ${navMenuClass}`}
                  >
                    <Nav variant="pills">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <FaCarAlt />
                          Find A Car
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <FaUserAlt />
                          Get a Dealer
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>

                  <Tab.Content className="tab-content bg-white box-shadow-1 ltn__border position-relative pb-10">
                    <Tab.Pane eventKey="first">
                      <div className="car-dealer-form-inner">
                        <form action="#" className="ltn__car-dealer-form-box">
                          <Row>
                            <Col
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Choose your location</option>
                                {locationOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Col>
                            <Col
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Select property type</option>
                                {opportunityTypeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Col>
                            <Col
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Set your objective</option>
                                {goalOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Col>
                            <Col
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                            >
                              <div className="btn-wrapper text-center mt-0">
                                <Link
                                  href="/shop/right-sidebar"
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Start Your Path
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="car-dealer-form-inner">
                        <form
                          action="/shop/right-sidebar"
                          className="ltn__car-dealer-form-box"
                        >
                          <Row>
                            <div
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Choose your location</option>
                                {locationOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                            <div
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Select property type</option>
                                {opportunityTypeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                            <div
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Set your objective</option>
                                {goalOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                            <div
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                            >
                              <div className="btn-wrapper text-center mt-0">
                                <Link
                                  href="/shop/right-sidebar"
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Start Your Path
                                </Link>
                              </div>
                            </div>
                          </Row>
                        </form>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default CarDealerSearchForm;
