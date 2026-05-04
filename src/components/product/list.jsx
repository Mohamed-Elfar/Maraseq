import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";
import QuickViewtModal from "@/components/modals/quickViewModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { formatPropertyStatus } from "@/utils/property-status";

const formatPrice = (value) => {
  // Convert to string if not already a string
  const stringValue = String(value || '')
  
  // Remove all non-digit characters and dots
  let cleanValue = stringValue.replace(/[^0-9]/g, '')
  
  // If empty, return empty
  if (!cleanValue) return ''
  
  // Add dots as thousands separators (e.g., 2300100 becomes 2.300.100)
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const ProductList = ({
  productData,
  slug,
  baseUrl,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  const badgeText = formatPropertyStatus(productData.propertyDetails?.propertyStatus) || "For Sale";
  const defaultProductImage = "/img/product-3/1.jpg";
  const resolvedProductImage = !productData.productImg
    ? defaultProductImage
    : productData.productImg.startsWith("http") ||
        productData.productImg.startsWith("/")
      ? productData.productImg
      : `/img/product-3/${productData.productImg}`;

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const wishListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Wishlist
    </Tooltip>
  );
  const quickViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Quick View
    </Tooltip>
  );
  return (
    <>
      <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
        <div className="product-img">
          <Link href={`/${baseUrl}/${slug}`}>
            <img
              src={resolvedProductImage}
              alt={`${productData.title}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultProductImage;
              }}
            />
          </Link>
        </div>

        <div className="product-info">
          <div className="product-badge-price">
            <div className="product-badge">
              <ul>
                <li
                  className={`sale-badge ${productData.rent ? "bg-green" : ""}`}
                >
                  {badgeText}
                </li>
              </ul>
            </div>

            <div className="product-price">
              <span>
                {productData.currency || '$'} {formatPrice(productData.price)}
                {(productData.propertyDetails?.propertyStatus === 'for_rent' || productData.propertyDetails?.propertyStatus === 'rented') && <label>/Month</label>}
              </span>
            </div>
          </div>

          <h2 className="product-title">
            <Link href={`/${baseUrl}/${slug}`}>{productData.title}</Link>
          </h2>

          <div className="product-img-location">
            <ul>
              <li>
                <Link href={`/${baseUrl}/${slug}`}>
                  <i className="flaticon-pin"></i>
                  {productData.locantion}
                </Link>
              </li>
            </ul>
          </div>

          <ul className="ltn__plot-brief">
            <li>
              <span>{productData.propertyDetails.bedrooms}</span>
              <span className="ms-1">Bedrooms</span>
            </li>
            <li>
              <span>{productData.propertyDetails.baths}</span>
              <span className="ms-1">Bathrooms</span>
            </li>
            <li>
              <span>{productData.propertyDetails.area}</span>
              <span className="ms-1">square Ft</span>
            </li>
          </ul>
        </div>
        <div className="product-info-bottom">
          <div className="real-estate-agent">
            <div className="agent-img">
              <Link href={`/${baseUrl}/${slug}`}>
                <img
                  src={`/img/blog/author.jpg`}
                  alt={`${productData.title}`}
                />
              </Link>
            </div>
          </div>

          <div className="product-hover-action">
            <ul>
              <li>
              <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={quickViewTooltip}
                >
                <button onClick={() => setModalShow(true)}>
                  <i className="flaticon-expand"></i>
                </button>


                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => (
                    <Tooltip id="button-tooltip" {...props}>
                      Contact on WhatsApp
                    </Tooltip>
                  )}
                >
                  <a
                    href={`https://wa.me/201102223231?text=${encodeURIComponent(`Hello, I am interested in this property: ${productData.title}\n\nPrice: ${productData.currency || '$'} ${formatPrice(productData.price)}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon-whatsapp"></i>
                  </a>
                </OverlayTrigger>
              </li>
              <li>

              <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={wishListTooltip}
                >
                <button
                  onClick={
                    wishlistItem !== undefined
                      ? () => dispatch(deleteFromWishlist(productData.id))
                      : () => dispatch(addToWishlist(productData))
                  }
                >
                  <i className="flaticon-heart-1"></i>
                </button>

                  
                </OverlayTrigger>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <QuickViewtModal
        productData={productData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        slug={slug}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
      />
    </>
  );
};

export default ProductList;
