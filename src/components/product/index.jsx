import { useState } from "react";
import Link from "next/link";
import { FaFilm, FaCamera } from "react-icons/fa";
import QuickViewtModal from "@/components/modals/quickViewModal";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { formatPropertyStatus } from "@/utils/property-status";

const ProductItem = ({
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

  const recommendedLabel = productData.recommendedLabel || "Recommended";
  const pathDescription =
    productData.pathDescription || "Designed for your investment path";
  const idealForText = productData.idealFor || "Ideal for long-term investment";

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
      <div className="ltn__product-item ltn__product-item-4">
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
          <div className="product-badge">
            <ul>
              <li
                className={`sale-badge ${
                  badgeText === "For Rent"
                    ? "bg-green"
                    : badgeText === "Investment"
                      ? "bg-gold"
                      : ""
                }`}
              >
                {badgeText}
              </li>
              <li className="recommended-badge">{recommendedLabel}</li>
            </ul>
          </div>
          <div className="product-path-overlay">
            <p>{idealForText}</p>
          </div>
          <div className="product-img-location-gallery">
            <div className="product-img-location">
              <ul>
                <li>
                  <Link href="/locations">
                    <i className="flaticon-pin"></i>
                    {productData.locantion}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="product-img-gallery">
              <ul>
                <li>
                  <Link
                    className="d-flex align-items-center justify-content-center"
                    href={`/${baseUrl}/${slug}`}
                  >
                    <FaCamera className="me-2" />
                    {productData.photo.length}
                  </Link>
                </li>
                <li>
                  <Link
                    className="d-flex align-items-center justify-content-center"
                    href={`/${baseUrl}/${slug}`}
                  >
                    <FaFilm className="me-2" />
                    {productData.video.length}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-info">
          <div className="product-price">
            <span>{`From $${productData.price} / month`}</span>
          </div>
          <h2 className="product-title">
            <Link href={`/${baseUrl}/${slug}`}>{productData.title}</Link>
          </h2>
          <div className="product-description">
            <p>{pathDescription}</p>
          </div>
          <ul className="ltn__list-item-2 ltn__list-item-2-before">
            <li>
              <span>
                {productData.propertyDetails.bedrooms}
                <i className="flaticon-bed"></i>
              </span>
              Beds
            </li>
            <li>
              <span>
                {productData.propertyDetails.baths}
                <i className="flaticon-clean"></i>
              </span>
              Baths
            </li>
            <li>
              <span>
                {productData.propertyDetails.area}
                <i className="flaticon-square-shape-design-interface-tool-symbol"></i>
              </span>
              m²
            </li>
          </ul>
          <div className="product-opportunity-cta">
            <Link className="ltn__service-btn" href={`/${baseUrl}/${slug}`}>
              Explore Opportunity
              <i className="flaticon-right-arrow"></i>
            </Link>
          </div>
        </div>
        <div className="product-info-bottom">
          <div className="real-estate-agent">
            <div className="agent-img">
              <Link href="/team-details">
                <img
                  src={`/img/blog/${productData.agent.img}`}
                  alt={`${productData.agent.fullName}`}
                />
              </Link>
            </div>
            <div className="agent-brief">
              <h6>
                <Link href="/team-details">{productData.agent.firstName}</Link>
              </h6>
              <small>{productData.agent.type}</small>
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

export default ProductItem;
