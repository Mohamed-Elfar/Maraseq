import Link from "next/link";
const PropertyItem = ({ product, slug,baseUrl }) => {
  const defaultProductImage = "/img/product-3/1.jpg";
  const resolvedProductImage = !product.productImg
    ? defaultProductImage
    : product.productImg.startsWith("http") || product.productImg.startsWith("/")
      ? product.productImg
      : `/img/product-3/${product.productImg}`;

  return (
    <>
      <div className="ltn__search-by-place-item">
        <div className="search-by-place-img">
          <Link href={`${baseUrl}/${slug}`}>
            <img
              src={resolvedProductImage}
              alt="#"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultProductImage;
              }}
            />
          </Link>
          <div className="search-by-place-badge">
            <ul>
              <li>{product.properties} Properties</li>
            </ul>
          </div>
        </div>
        <div className="search-by-place-info">
          <h6>
            <Link href="/locations">{product.locantion}</Link>
          </h6>
          <h4>
            <Link href={`${baseUrl}/${slug}`}>{product.district}</Link>
          </h4>
          <div className="search-by-place-btn">
            <Link href={`${baseUrl}/${slug}`}>
              View Property <i className="flaticon-right-arrow"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyItem;
