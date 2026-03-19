import Link from "next/link";

const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li className="menu-icon">
        <Link href="/home/page-three">
          Home 
        </Link>
      </li>

      <li className="menu-icon">
        <Link href="/about">
          About  
        </Link>

        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>

          <li>
            <Link href="/service">Services</Link>
          </li>

          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>

          <li>
            <Link href="/portfolio/page-two">Portfolio - 02</Link>
          </li>

          <li>
            <Link href="/team">Team</Link>
          </li>

          <li>
            <Link href="/faq">FAQ</Link>
          </li>

          <li>
            <Link href="/locations">Google Map Locations</Link>
          </li>
        </ul>
      </li>

      <li className="menu-icon">
        <Link  href="/shop/left-sidebar">
          Property  
        </Link>

      </li>

      <li className="menu-icon">
        <Link href="/blog/grid">
          News  
        </Link>
      </li>

      {addListing ? (
        <li className="special-link">
          <Link href="/contact">Contact Us</Link>
        </li>
      ) : null}
    </ul>
  );
};

export default MenuList;
