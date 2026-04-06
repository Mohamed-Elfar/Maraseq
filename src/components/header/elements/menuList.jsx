import Link from "next/link";

const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li className="menu-icon">
        <Link href="/">
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
            <Link href="/faq">FAQ</Link>
          </li>

          <li>
            <Link href="/locations">Google Map Locations</Link>
          </li>
        </ul>
      </li>

      <li className="menu-icon">
        <Link  href="/shop/properties">
          Property  
        </Link>

      </li>

      <li className="menu-icon">
        <Link href="/blog">
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

