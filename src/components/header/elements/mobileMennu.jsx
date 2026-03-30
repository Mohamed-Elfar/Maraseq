import Link from "next/link";
import {
  FaRegHeart,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

import {
  getSiblings,
  getClosest,
  slideUp,
  slideDown,
  slideToggle,
} from "@/lib/product";
import { useSelector } from "react-redux";

const MobileMenu = function ({ offCanVastoggleBtn, closeSideBar }) {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    parentEl.classList.toggle("active");
    if (
      parentEl?.classList.contains("menu-expand") ||
      target.classList.contains("menu-expand")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        sibling.classList.remove("active");
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };

  return (
    <>
      <div
        id="ltn__utilize-mobile-menu"
        className={`ltn__utilize ltn__utilize-mobile-menu   ${
          offCanVastoggleBtn ? "ltn__utilize-open" : ""
        }`}
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-search-form">
            <form action="#">
              <input type="text" placeholder="Search..." />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/shop/properties">Property</Link>
              </li>
              <li>
                <Link href="/blog">News</Link>
              </li>
              <li>
                <Link href="#">Pages</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                  <li>
                    <Link href="/service">Services</Link>
                  </li>

                  <li>
                    <Link href="/portfolio">Portfolio</Link>
                  </li>

                  <li>
                    <Link href="/team">Team</Link>
                  </li>

                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/history">History</Link>
                  </li>
                  <li>
                    <Link href="/add-listing">Add Listing</Link>
                  </li>
                  <li>
                    <Link href="/locations">Google Map Locations</Link>
                  </li>
                  <li>
                    <Link href="/404">404</Link>
                  </li>
                  <li>
                    <Link href="/coming-soon">Coming Soon</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>
              <li>
                <Link href="/wishlist" title="Wishlist">
                  <span className="utilize-btn-icon">
                    <FaRegHeart />
                    {wishlistItems.length > 0 ? (
                      <sup>{wishlistItems.length}</sup>
                    ) : (
                      <sup>0</sup>
                    )}
                  </span>
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div className="ltn__social-media-2">
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
                  title="LinkedIn"
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
      </div>
    </>
  );
};

export default MobileMenu;


