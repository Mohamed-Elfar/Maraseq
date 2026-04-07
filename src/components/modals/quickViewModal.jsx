import Link from "next/link";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";
import { addToCompare, deleteFromCompare } from "@/store/slices/compare-slice";

import {
  FaShoppingBag,
  FaRegHeart,
  FaExchangeAlt,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import ProductRating from "../product/ProductRating";

const QuickViewModal = ({
  productData,
  onHide,
  show,
  slug,
  discountedprice,
  productprice,
  wishlistitem,
  compareitem,
}) => {
  const modalClose = () => {
    onHide();
  };

  const dispatch = useDispatch();

  return (
    <Modal
      show={show}
      onHide={modalClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      className="ltn__modal-area ltn__quick-view-modal-area"
    >
      <Modal.Header>
        <Button className="close" variant="secondary" onClick={modalClose}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="ltn__quick-view-modal-inner">
          <div className="modal-product-item">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="modal-product-img">
                  <img src="/img/product/4.png" alt="#" />
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="modal-product-info">
                  <h3>
                    <Link onClick={modalClose} href={`/shop/${slug}`}>
                      {productData.title}
                    </Link>
                  </h3>
                  <div className="product-price">
                    <div>
                      <span>${discountedprice}</span>
                    </div>
                    {productData.rating && productData.rating > 0 ? (
                      <div className="product-quickview__rating-wrap">
                        <div className="product-quickview__rating">
                          <ProductRating ratingValue={productData.rating} />
                          <span>({productData.ratingCount})</span>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr />
                
                  <div className="modal-product-brief">
                    <p>{productData.description.shortDescription}</p>
                  </div>

                  <div className="ltn__product-details-menu-3">
                    <ul>
                      <li>
                        <button
                          className="btn-addtocart"
                          onClick={
                            wishlistitem !== undefined
                              ? () =>
                                  dispatch(deleteFromWishlist(productData.id))
                              : () => dispatch(addToWishlist(productData))
                          }
                        >
                          <FaRegHeart />
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn-addtocart"
                          onClick={
                            compareitem !== undefined
                              ? () =>
                                  dispatch(deleteFromCompare(productData.id))
                              : () => dispatch(addToCompare(productData))
                          }
                        >
                          <FaExchangeAlt />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div className="ltn__social-media">
                    <ul>
                      <li>Share:</li>
                      <li>
                        <Link href="https://www.facebook.com/maraseqgroup" title="Facebook">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://twitter.com/maraseqgroup" title="Twitter">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.linkedin.com/in/maraseqgroup/" title="Linkedin">
                          <FaLinkedin />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.instagram.com/maraseqgroup/" title="Instagram">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <label className="float-end mb-0">
                    <Link
                      onClick={modalClose}
                      className="text-decoration"
                      href={`/shop/${slug}`}
                    >
                      <small>View Details</small>
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuickViewModal;
