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
            <div className="row g-0">
              {/* Left Column - Image */}
              <div className="col-lg-6 col-12">
                <div className="modal-product-img" style={{ 
                  height: '520px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  backgroundColor: '#f8f9fa', 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={!productData.productImg
                      ? "/img/product-3/1.jpg"
                      : productData.productImg.startsWith("http") ||
                          productData.productImg.startsWith("/")
                        ? productData.productImg
                        : `/img/product-3/${productData.productImg}`
                    } 
                    alt={productData.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/img/product-3/1.jpg";
                    }}
                  />
                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: productData.rent ? '#28a745' : '#FF6B35',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {productData.propertyDetails?.propertyStatus || 'For Sale'}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Info */}
              <div className="col-lg-6 col-12">
                <div className="modal-product-info" style={{ 
                  padding: '30px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '500px',
                  backgroundColor: '#ffffff'
                }}>
                  {/* Header */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '1.75rem', 
                      color: '#2C3E50',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      marginBottom: '10px'
                    }}>
                      <Link onClick={modalClose} href={`/shop/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {productData.title}
                      </Link>
                    </h3>
                    <div className="product-location" style={{ display: 'flex', alignItems: 'center', color: '#6C757D', fontSize: '0.95rem' }}>
                      <i className="flaticon-pin" style={{ marginRight: '5px' }}></i>
                      {productData.locantion || 'N/A'}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="product-price" style={{ 
                    marginBottom: '25px',
                    padding: '15px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '1.75rem', 
                      fontWeight: 'bold', 
                      color: '#FF6B35'
                    }}>
                      {productData.currency || '$'} {productData.price.toLocaleString()}
                    </span>
                    {(productData.propertyDetails?.propertyStatus === 'for_rent' || productData.propertyDetails?.propertyStatus === 'rented') && 
                      <label style={{ marginLeft: '8px', fontSize: '1rem', color: '#6C757D' }}>/Month</label>
                    }
                  </div>

                  {/* Property Details Grid */}
                  <div className="property-details-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '15px', 
                    marginBottom: '25px'
                  }}>
                    <div className="detail-item" style={{ 
                      textAlign: 'center', 
                      padding: '15px',
                      backgroundColor: '#F8F9FA',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B35', marginBottom: '5px' }}>
                        {productData.propertyDetails?.bedrooms || 0}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6C757D', textTransform: 'uppercase' }}>Bedrooms</div>
                    </div>
                    <div className="detail-item" style={{ 
                      textAlign: 'center', 
                      padding: '15px',
                      backgroundColor: '#F8F9FA',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B35', marginBottom: '5px' }}>
                        {productData.propertyDetails?.baths || 0}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6C757D', textTransform: 'uppercase' }}>Bathrooms</div>
                    </div>
                    <div className="detail-item" style={{ 
                      textAlign: 'center', 
                      padding: '15px',
                      backgroundColor: '#F8F9FA',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B35', marginBottom: '5px' }}>
                        {productData.propertyDetails?.area || 0}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6C757D', textTransform: 'uppercase' }}>Sq Ft</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div style={{ marginBottom: '25px', flex: 1 }}>
                    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6C757D', fontSize: '0.9rem' }}>Type:</span>
                      <span style={{ fontWeight: '500', color: '#2C3E50' }}>
                        {Array.isArray(productData.category) ? productData.category.join(', ') : productData.category || 'N/A'}
                      </span>
                    </div>
                    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6C757D', fontSize: '0.9rem' }}>Year Built:</span>
                      <span style={{ fontWeight: '500', color: '#2C3E50' }}>
                        {productData.propertyDetails?.createdYear || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <div style={{ color: '#6C757D', fontSize: '0.9rem', marginBottom: '5px' }}>Description:</div>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.9rem', 
                        color: '#6C757D', 
                        lineHeight: '1.5',
                        maxHeight: '60px',
                        overflow: 'hidden'
                      }}>
                        {productData.description?.shortDescription || productData.description?.fullDescription || productData.full_description || productData.description || 'No description available'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                    <div className="action-buttons">
                      <ul style={{ display: 'flex', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
                        <li>
                          <button
                            className="btn"
                            onClick={
                              wishlistitem !== undefined
                                ? () => dispatch(deleteFromWishlist(productData.id))
                                : () => dispatch(addToWishlist(productData))
                            }
                            style={{ 
                              borderRadius: '50%', 
                              width: '45px', 
                              height: '45px', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              padding: 0,
                              backgroundColor: wishlistitem !== undefined ? '#FF6B35' : '#F8F9FA',
                              border: wishlistitem !== undefined ? 'none' : '1px solid #E9ECEF'
                            }}
                          >
                            <FaRegHeart style={{ color: wishlistitem !== undefined ? 'white' : '#6C757D' }} />
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn"
                            onClick={
                              compareitem !== undefined
                                ? () => dispatch(deleteFromCompare(productData.id))
                                : () => dispatch(addToCompare(productData))
                            }
                            style={{ 
                              borderRadius: '50%', 
                              width: '45px', 
                              height: '45px', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              padding: 0,
                              backgroundColor: compareitem !== undefined ? '#FF6B35' : '#F8F9FA',
                              border: compareitem !== undefined ? 'none' : '1px solid #E9ECEF'
                            }}
                          >
                            <FaExchangeAlt style={{ color: compareitem !== undefined ? 'white' : '#6C757D' }} />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <Link
                      onClick={modalClose}
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                      href={`/shop/${slug}`}
                      style={{ 
                        textDecoration: 'none',
                        padding: '12px 25px',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}
                    >
                      View Details
                    </Link>
                  </div>
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
