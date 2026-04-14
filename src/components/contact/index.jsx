import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaCheck,
  FaCalendarAlt,
  FaUserAlt,
  FaEnvelope,
  FaGlobe,
  FaPencilAlt,
  FaComments,
  FaPhoneAlt,
  FaArrowDown,
} from "react-icons/fa";
import { getContactInfo } from "../../lib/supabase";
import { submitMailForm } from "@/lib/mailtoForm";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const data = await getContactInfo();
      setContactInfo(data);
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
    
    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchContactInfo, 30000);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* <!-- CONTACT ADDRESS AREA START --> */}
      <div className="ltn__contact-address-area mb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/10.png" alt="Icon Image" />
                </div>
                <h3>Email Address</h3>
                <p>
                  {loading ? (
                    'Loading...'
                  ) : contactInfo?.emails?.length > 0 ? (
                    contactInfo.emails
                      .filter(email => email.visible)
                      .map(email => (
                        <span key={email.id}>
                          {email.value}
                          <br />
                        </span>
                      ))
                  ) : (
                    <>
                      info@maraseqgroup.com <br />
                      support@maraseqgroup.com
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/11.png" alt="Icon Image" />
                </div>
                <h3>Phone Number</h3>
                <p>
                  {loading ? (
                    'Loading...'
                  ) : contactInfo?.phones?.length > 0 ? (
                    contactInfo.phones
                      .filter(phone => phone.visible)
                      .map((phone, index) => (
                        <div key={phone.id} style={{ marginBottom: index < contactInfo.phones.filter(p => p.visible).length - 1 ? '5px' : '0' }}>
                          {phone.value}
                        </div>
                      ))
                  ) : (
                    <>
                      +201102223231 
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/12.png" alt="Icon Image" />
                </div>
                <h3>Office Address</h3>
                <p>
                  {loading ? (
                    'Loading...'
                  ) : contactInfo?.addresses?.length > 0 ? (
                    contactInfo.addresses
                      .filter(address => address.visible)
                      .map(address => (
                        <span key={address.id}>
                          {address.value}
                          <br />
                        </span>
                      ))
                  ) : (
                    <>
                      Qutur, Tanta <br />
                      Gharbia Governorate, Egypt
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT ADDRESS AREA END --> */}

      {/* <!-- CONTACT MESSAGE AREA START --> */}
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Get A Quote</h4>
                <form
                  id="contact-form"
                  action="#"
                  method="post"
                  onSubmit={(event) =>
                    submitMailForm(event, {
                      to: "info@maraseqgroup.com",
                      subject: "Contact Us Form Submission",
                      context: "Contact Us - Get A Quote",
                    })
                  }
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                        />
                        <span className="inline-icon">
                          <FaUserAlt />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                        />
                        <span className="inline-icon">
                          <FaEnvelope />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item input-item-email ltn__custom-icon">
                        <Form.Select className="nice-select">
                          <option>Select Service Type</option>
                          <option>Property Management </option>
                          <option>Mortgage Service </option>
                          <option>Consulting Service</option>
                          <option>Home Buying</option>
                          <option>Home selling</option>
                          <option>Escrow Services</option>
                        </Form.Select>
                        <span className="inline-icon">
                          <FaArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter phone number"
                        />
                        <span className="inline-icon">
                          <FaPhoneAlt />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea
                      name="message"
                      placeholder="Enter message"
                    ></textarea>
                    <span className="inline-icon">
                      <FaPencilAlt />
                    </span>
                  </div>
                  <p>
                    <label className="input-info-save mb-0">
                      <input type="checkbox" name="agree" /> Save my name,
                      email, and website in this browser for the next time I
                      comment.
                    </label>
                  </p>
                  <div className="btn-wrapper mt-0">
                    <button
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                      type="submit"
                    >
                      get a free service
                    </button>
                  </div>
                  <p className="form-messege mb-0 mt-20"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT MESSAGE AREA END --> */}

      {/* <!-- GOOGLE MAP AREA START --> */}
      <div className="google-map mb-120">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27367.521335544432!2d30.974130060919684!3d30.972151866016276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7b3b31ed01575%3A0x2ae50b1962e6af90!2z2YLYt9mI2LHYjCDZhdiv2YrZhtipINmC2LfZiNix2Iwg2YXYsdmD2LIg2YLYt9mI2LHYjCDZhdit2KfZgdi42Kkg2KfZhNi62LHYqNmK2Kk!5e0!3m2!1sar!2seg!4v1773696322276!5m2!1sar!2seg"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      {/* <!-- GOOGLE MAP AREA END --> */}
    </>
  );
};

export default Contact;
