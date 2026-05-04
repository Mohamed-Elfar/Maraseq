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
import { supabase } from "@/lib/supabase";

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

const SEARCH_KEYS = ["title"];
const PRICE_MIN = 0;
const PRICE_MAX = 2000000000;
const PRICE_BUCKETS = [
  { name: "0 - 500,000", min: 0, max: 500000 },
  { name: "500,001 - 2,000,000", min: 500001, max: 2000000 },
  { name: "2,000,001 - 5,000,000", min: 2000001, max: 5000000 },
  { name: "5,000,001 - 10,000,000", min: 5000001, max: 10000000 },
  { name: "10,000,001 - 50,000,000", min: 10000001, max: 50000000 },
  { name: "50,000,001 - 100,000,000", min: 50000001, max: 100000000 },
  { name: "100,000,001 - 500,000,000", min: 100000001, max: 500000000 },
  { name: "500,000,001 - 1,000,000,000", min: 500000001, max: 1000000000 },
  { name: "1,000,000,001 - 2,000,000,000", min: 1000000001, max: 2000000000 },
];

function ShopLeftSideBar() {
  const router = useRouter();
  const { products } = useSelector((state) => state.product);
  const [dbCategories, setDbCategories] = useState([]);
  
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
  const SLIDER_MAX = 1000000000;
  const [priceFilterValue, setPriceFilterValue] = useState([0, SLIDER_MAX]);
  const selectedCategory =
    typeof router.query.category === "string" ? router.query.category : "";
  const selectedLocationQuery =
    typeof router.query.location === "string" ? router.query.location : "";

  const categories = useMemo(() => {
    // Count properties in each category
    const categoryCounts = new Map();

    products.forEach((product) => {
      if (product.category) {
        // Handle category as array
        if (Array.isArray(product.category)) {
          product.category.forEach(cat => {
            if (cat) {
              categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
            }
          });
        } else if (typeof product.category === 'string') {
          // Handle category as string
          categoryCounts.set(product.category, (categoryCounts.get(product.category) || 0) + 1);
        }
      }
    });

    // Combine database categories with property counts
    const result = dbCategories.map(dbCat => ({
      name: dbCat.name,
      count: categoryCounts.get(dbCat.name) || 0
    }));

    // Add any categories that exist in products but not in database
    categoryCounts.forEach((count, name) => {
      if (!dbCategories.find(dbCat => dbCat.name === name)) {
        result.push({ name, count });
      }
    });


    return result;
  }, [products, dbCategories]);
  const statusOptions = useMemo(() => {
    // Define all possible property statuses
    const allStatuses = [
      'for_sale',
      'for_rent',
      'rented',
      'sold',
      'under_contract',
      'coming_soon',
      'off_market'
    ];

    // Count properties in each status
    const statusCounts = new Map();

    products.forEach((product) => {
      const statusValue =
        product?.propertyDetails?.propertyStatus ?? product?.status;
      const statusLabel = formatPropertyStatus(statusValue);

      if (!statusLabel) return;
      statusCounts.set(statusLabel, (statusCounts.get(statusLabel) || 0) + 1);
    });

    // Create result with all statuses, even those with 0 count
    const result = allStatuses.map(status => {
      const statusLabel = formatPropertyStatus(status);
      return {
        name: statusLabel,
        count: statusCounts.get(statusLabel) || 0
      };
    });


    return result;
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

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Try to fetch from a categories table first
        const { data: categoriesData, error } = await supabase
          .from('categories')
          .select('*')
          .eq('type', 'properties')
          .eq('visible', true)
          .order('order_index', { ascending: true });

        if (!error && categoriesData) {
          // Filter again to ensure only property categories
          const propertyCategories = categoriesData.filter(cat =>
            cat.type === 'properties' && cat.visible === true
          );
          setDbCategories(propertyCategories);
        } else {
          // If no categories table, try to get unique categories from properties
          const { data: propertiesData } = await supabase
            .from('properties')
            .select('category')
            .not('category', 'is', null);

          if (propertiesData) {
            const allCategories = new Set();
            propertiesData.forEach(prop => {
              if (prop.category) {
                if (Array.isArray(prop.category)) {
                  prop.category.forEach(cat => allCategories.add(cat));
                } else {
                  allCategories.add(prop.category);
                }
              }
            });

            const categoriesArray = Array.from(allCategories).map((cat, index) => ({
              id: index,
              name: cat,
              count: 0 // Will be updated when products are loaded
            }));

            setDbCategories(categoriesArray);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Update currentItems when products change
  useEffect(() => {

    if (products.length > 0) {
      setCurrentItems(products.slice(0, pageLimit));
      setPageCount(Math.ceil(products.length / pageLimit));
    }
  }, [products]);

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


  useEffect(() => {
    // Don't run if products is empty and not loaded yet
    if (products.length === 0) {
      return;
    }

    let filteredProducts = getSortedProducts(products, sortType, sortValue);


    const filterSortedProducts = getSortedProducts(
      filteredProducts,
      filterSortType,
      filterSortValue
    );
    filteredProducts = filterSortedProducts;


    filteredProducts = filteredProducts.filter((product) => {
      if (selectedCategories.length > 0) {
        return selectedCategories.includes(product.category[0]);
      }
      return true;
    });


    filteredProducts = filteredProducts.filter((product) => {
      if (selectedStatuses.length > 0) {
        const statusValue =
          product?.propertyDetails?.propertyStatus ?? product?.status;
        const statusLabel = formatPropertyStatus(statusValue);
        return selectedStatuses.includes(statusLabel);
      }
      return true;
    });


    filteredProducts = filteredProducts.filter((product) => {
      if (selectedBedBaths.length > 0) {
        return selectedBedBaths.includes(getProductBedBathLabel(product));
      }
      return true;
    });


    filteredProducts = filteredProducts.filter((product) => {
      const price = product?.price ?? 0;
      const effectiveMax = priceFilterValue[1] >= SLIDER_MAX ? Infinity : priceFilterValue[1];
      return price >= priceFilterValue[0] && price <= effectiveMax;
    });


    filteredProducts = filteredProducts.filter((product) => {
      if (selectedLocation) {
        return product.locantion
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());
      }
      return true;
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
    priceFilterValue,
    statusOptions.length,
    categories.length,
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
                          const discountedPrice = formatPrice(
                            getDiscountPrice(product.price, product.discount)
                          );
                          const productPrice = formatPrice(product.price);
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
                          const discountedPrice = formatPrice(
                            getDiscountPrice(product.price, product.discount)
                          );
                          const productPrice = formatPrice(product.price);
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
                priceFilterValue={priceFilterValue}
                onPriceFilterChange={(val) => { setPriceFilterValue(val); setOffset(0); }}
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

