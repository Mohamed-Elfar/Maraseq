import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const HeaderTopInfo = function () {
  return (
    <>
      <div className="ltn__top-bar-menu">
        <ul>
          <li>
            <Link href="mailto:info@maraseqgroup.com">
              <FaEnvelope />
              <i></i> info@maraseqgroup.com
            </Link>
          </li>
          <li>
            <Link href="/locations">
              <FaMapMarkerAlt />
              Qutur , Egypt
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderTopInfo;
