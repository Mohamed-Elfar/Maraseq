import Link from "next/link";

import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
const HeaderSocialLinks = function () {
  return (
    <div className="ltn__social-media">
      <ul>
        <li>
          <Link
            href="https://www.facebook.com/maraseqgroup"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
          >
            {" "}
            <FaFacebookF />{" "}
          </Link>
        </li>
        <li>
          <Link
            href="https://twitter.com/maraseqgroup"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
          >
            {" "}
            <FaTwitter />{" "}
          </Link>
        </li>

        <li>
          <Link
            href="https://www.instagram.com/maraseqgroup/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            {" "}
            <FaInstagram />{" "}
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/maraseqgroup/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            {" "}
            <FaLinkedin />{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderSocialLinks;
