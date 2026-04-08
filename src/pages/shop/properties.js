import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import {
  getSortedProducts,
  productSlug,
  getDiscountPrice,
  getIndividualCategories,
} from "@/lib/product";
import { LayoutOne } from "@/layouts";
import {
  FaThLarge,
  FaThList,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import SideBar from "@/components/shopSideBar";
import RelatedProduct from "@/components/product/related-product";
import ProductList from "@/components/product/list";
import Search from "@/components/search";
import ReactPaginate from "react-paginate";
import CallToAction from "@/components/callToAction";
import { useRouter } from "next/router";
import { formatPropertyStatus } from "@/utils/property-status";

const SEARCH_KEYS = ["title"];
const PRICE_MIN = 0;
const PRICE_MAX = 1000000;
const PRICE_BUCKETS = [
  { name: "0 - 100,000", min: 0, max: 100000 },
  { name: "100,001 - 250,000", min: 100001, max: 250000 },
  { name: "250,001 - 500,000", min: 250001, max: 500000 },
  { name: "500,001 - 1,000,000", min: 500001, max: 1000000 },
];

function ShopLeftSideBar() {
  const router = useRouter();
  const { products } = useSelector((state) => state.product);
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);
  const pageLimit = 6;
  const [currentItems, setCurrentItems] = useState(products);
  const [pageCount, setPageCount] = useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBedBaths, setSelectedBedBaths] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [priceFilterValue, setPriceFilterValue] = useState([PRICE_MIN, PRICE_MAX]);
  const selectedCategory =
    typeof router.query.category === "string" ? router.query.category : "";
  const selectedLocationQuery =
    typeof router.query.location === "string" ? router.query.location : "";

  const categories = useMemo(() => getIndividualCategories(products), [products]);
  const statusOptions = useMemo(() => {
    const statusMap = new Map();

    products.forEach((product) => {
      const statusValue =
        product?.propertyDetails?.propertyStatus ?? product?.status;
      const statusLabel = formatPropertyStatus(statusValue);

      if (!statusLabel) return;
      statusMap.set(statusLabel, (statusMap.get(statusLabel) || 0) + 1);
    });

    return Array.from(statusMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  const bedBathOptions = useMemo(() => {
    const bedBathMap = new Map();

    products.forEach((product) => {
      const bedrooms = product?.propertyDetails?.bedrooms ?? product?.bedrooms;
      const baths =
        product?.propertyDetails?.baths ??
        product?.propertyDetails?.bathrooms ??
        product?.bathrooms;

      if (bedrooms == null || baths == null) return;

      const label = `${bedrooms} Bed / ${baths} Bath`;
      bedBathMap.set(label, (bedBathMap.get(label) || 0) + 1);
    });

    return Array.from(bedBathMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  const getProductPrice = (product) => {
    const numericPrice = Number(product?.price);
    return Number.isFinite(numericPrice) ? numericPrice : 0;
  };

  const priceRanges = useMemo(() => {
    return PRICE_BUCKETS.map((bucket) => ({
      name: bucket.name,
      min: bucket.min,
      max: bucket.max,
      count: products.filter((product) => {
        const price = getProductPrice(product);
        return price >= bucket.min && price <= bucket.max;
      }).length,
    }));
  }, [products]);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const [query, setQuery] = useState("");
  const SearchProduct = useCallback((data) => {
    return data.filter((item) =>
      SEARCH_KEYS.some((key) => item[key].toLowerCase().includes(query))
    );
  }, [query]);

  useEffect(() => {
    if (!selectedCategory) return;
    setSelectedCategories([selectedCategory]);
    setOffset(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedLocationQuery) return;
    setSelectedLocation(selectedLocationQuery);
    setOffset(0);
  }, [selectedLocationQuery]);

  const getProductBedBathLabel = (product) => {
    const bedrooms = product?.propertyDetails?.bedrooms ?? product?.bedrooms;
    const baths =
      product?.propertyDetails?.baths ??
      product?.propertyDetails?.bathrooms ??
      product?.bathrooms;

    if (bedrooms == null || baths == null) return "";
    return `${bedrooms} Bed / ${baths} Bath`;
  };

  const handleCategoryToggle = (categoryName, isChecked) => {
    setOffset(0);
    setSelectedCategories((prev) => {
      if (isChecked) {
        return prev.includes(categoryName) ? prev : [...prev, categoryName];
      }

      return prev.filter((name) => name !== categoryName);
    });
  };

  const handleStatusToggle = (statusName, isChecked) => {
    setOffset(0);
    setSelectedStatuses((prev) => {
      if (isChecked) {
        return prev.includes(statusName) ? prev : [...prev, statusName];
      }

      return prev.filter((name) => name !== statusName);
    });
  };

  const handleBedBathToggle = (bedBathName, isChecked) => {
    setOffset(0);
    setSelectedBedBaths((prev) => {
      if (isChecked) {
        return prev.includes(bedBathName) ? prev : [...prev, bedBathName];
      }

      return prev.filter((name) => name !== bedBathName);
    });
  };

  const handlePriceRangeToggle = (rangeName, isChecked) => {
    setOffset(0);
    setSelectedPriceRanges((prev) => {
      if (isChecked) {
        return prev.includes(rangeName) ? prev : [...prev, rangeName];
      }

      return prev.filter((name) => name !== rangeName);
    });
  };

  const handlePriceFilterChange = (rangeValues) => {
    setOffset(0);
    setPriceFilterValue(rangeValues);
  };

  useEffect(() => {
    let filteredProducts = getSortedProducts(products, sortType, sortValue);

    const filterSortedProducts = getSortedProducts(
      filteredProducts,
      filterSortType,
      filterSortValue
    );

    filteredProducts = filterSortedProducts;

    if (
      selectedStatuses.length > 0 &&
      selectedStatuses.length < statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        const statusLabel = formatPropertyStatus(
          product?.propertyDetails?.propertyStatus ?? product?.status
        );

        return selectedStatuses.includes(statusLabel);
      });
    }

    if (
      selectedCategories.length > 0 &&
      selectedCategories.length < categories.length
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.category) return false;
        if (Array.isArray(product.category)) {
          return product.category.some((category) =>
            selectedCategories.includes(category)
          );
        }

        return selectedCategories.includes(product.category);
      });
    }

    if (selectedBedBaths.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBedBaths.includes(getProductBedBathLabel(product))
      );
    }

    if (selectedLocation) {
      const normalizedLocation = selectedLocation.trim().toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        String(product?.locantion || "").toLowerCase().includes(normalizedLocation)
      );
    }

    if (
      selectedPriceRanges.length > 0 &&
      selectedPriceRanges.length < priceRanges.length
    ) {
      const selectedBuckets = priceRanges.filter((range) =>
        selectedPriceRanges.includes(range.name)
      );

      filteredProducts = filteredProducts.filter((product) => {
        const price = getProductPrice(product);
        return selectedBuckets.some(
          (range) => price >= range.min && price <= range.max
        );
      });
    }

    filteredProducts = filteredProducts.filter((product) => {
      const price = getProductPrice(product);
      return price >= priceFilterValue[0] && price <= priceFilterValue[1];
    });

    const searchedProducts = SearchProduct(filteredProducts);
    const endOffset = offset + pageLimit;

    setSortedProducts(filteredProducts);
    setCurrentItems(searchedProducts.slice(offset, endOffset));
    setPageCount(Math.ceil(searchedProducts.length / pageLimit));
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    SearchProduct,
    query,
    selectedStatuses,
    selectedCategories,
    selectedBedBaths,
    selectedLocation,
    selectedPriceRanges,
    priceFilterValue,
    statusOptions.length,
    categories.length,
    priceRanges,
  ]);

  const handlePageClick = (event) => {
    const filteredLength = SearchProduct(sortedProducts).length;
    const newOffset =
      filteredLength > 0 ? (event.selected * pageLimit) % filteredLength : 0;
    setOffset(newOffset);
  };

  return (
    <LayoutOne topbar={true}>
      {/* <!-- BREADCRUMB AREA START --> */}

      <ShopBreadCrumb
        title="Properties"
        sectionPace=""
        currentSlug="Properties"
      />
      {/* <!-- BREADCRUMB AREA END -->
    
    <!-- PRODUCT DETAILS AREA START --> */}
      <div className="ltn__product-area ltn__product-gutter mb-120">
        <Container>
          <Row>
            <Col xs={12} lg={{ span: 8, order: 1 }}>
              <Tab.Container defaultActiveKey="first">
                <div className="ltn__shop-options">
                  <ul className="justify-content-between">
                    <li>
                      <div className="ltn__grid-list-tab-menu">
                        <Nav className="nav">
                          <Nav.Link eventKey="first">
                            <FaThLarge />
                          </Nav.Link>
                          <Nav.Link eventKey="second">
                            <FaThList />
                          </Nav.Link>
                        </Nav>
                      </div>
                    </li>

                    <li>
                      <div className="short-by text-center">
                        <Form.Select
                          className="form-control nice-select"
                          onChange={(e) =>
                            getFilterSortParams("filterSort", e.target.value)
                          }
                        >
                          <option value="default">Default</option>
                          <option value="priceHighToLow">
                            Price - High to Low
                          </option>
                          <option value="priceLowToHigh">
                            Price - Low to High
                          </option>
                        </Form.Select>
                      </div>
                    </li>
                  </ul>
                </div>

                <Search spaceBottom="mb-30" setQuery={setQuery} />

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <Row>
                        {currentItems.map((product, key) => {
                          const slug = productSlug(product.title);
                          const discountedPrice = getDiscountPrice(
                            product.price,
                            product.discount
                          ).toFixed(2);
                          const productPrice = product.price.toFixed(2);
                          const cartItem = cartItems.find(
                            (cartItem) => cartItem.id === product.id
                          );
                          const wishlistItem = wishlistItems.find(
                            (wishlistItem) => wishlistItem.id === product.id
                          );
                          const compareItem = compareItems.find(
                            (compareItem) => compareItem.id === product.id
                          );
                          return (
                            <Col key={key} xs={12} sm={6}>
                              <RelatedProduct
                                slug={slug}
                                baseUrl="shop"
                                productData={product}
                                discountedPrice={discountedPrice}
                                productPrice={productPrice}
                                cartItem={cartItem}
                                wishlistItem={wishlistItem}
                                compareItem={compareItem}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                      <Row>
                        {currentItems.map((product, key) => {
                          const slug = productSlug(product.title);
                          const discountedPrice = getDiscountPrice(
                            product.price,
                            product.discount
                          ).toFixed(2);
                          const productPrice = product.price.toFixed(2);
                          const cartItem = cartItems.find(
                            (cartItem) => cartItem.id === product.id
                          );
                          const wishlistItem = wishlistItems.find(
                            (wishlistItem) => wishlistItem.id === product.id
                          );
                          const compareItem = compareItems.find(
                            (compareItem) => compareItem.id === product.id
                          );
                          return (
                            <Col key={key} xs={12}>
                              <ProductList
                                slug={slug}
                                baseUrl="shop"
                                productData={product}
                                discountedPrice={discountedPrice}
                                productPrice={productPrice}
                                cartItem={cartItem}
                                wishlistItem={wishlistItem}
                                compareItem={compareItem}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>

              <div className="ltn__pagination-area text-center">
                <ReactPaginate
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  nextLabel={<FaAngleDoubleRight />}
                  previousLabel={<FaAngleDoubleLeft />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination ltn__pagination justify-content-center"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </Col>
            <Col xs={12} lg={{ span: 4, order: 0 }}>
              <SideBar
                products={products}
                getSortParams={getSortParams}
                statusOptions={statusOptions}
                selectedStatuses={selectedStatuses}
                onStatusToggle={handleStatusToggle}
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                bedBaths={bedBathOptions}
                selectedBedBaths={selectedBedBaths}
                onBedBathToggle={handleBedBathToggle}
                priceRanges={priceRanges}
                selectedPriceRanges={selectedPriceRanges}
                onPriceRangeToggle={handlePriceRangeToggle}
                priceFilterValue={priceFilterValue}
                onPriceFilterChange={handlePriceFilterChange}
              />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- PRODUCT DETAILS AREA END -->

    <!-- CALL TO ACTION START (call-to-action-6) --> */}
      <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
        <Container>
          <Row>
            <Col xs={12}>
              <CallToAction />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- CALL TO ACTION END --> */}
    </LayoutOne>
  );
}

export default ShopLeftSideBar;

