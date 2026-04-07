import FilterByPrice from "../FilterByPrice";
const SideBar = ({
  statusOptions = [],
  selectedStatuses = [],
  onStatusToggle,
  categories = [],
  selectedCategories = [],
  onCategoryToggle,
  bedBaths = [],
  selectedBedBaths = [],
  onBedBathToggle,
  priceRanges = [],
  selectedPriceRanges = [],
  onPriceRangeToggle,
  priceFilterValue = [0, 1000000],
  onPriceFilterChange,
}) => {
  const formatAmount = (amount) => Number(amount).toLocaleString();

  return (
    <>
      <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
        <h3 className="mb-10">Advance Information</h3>
        <label className="mb-30">
          <small>About 9,620 results (0.62 seconds) </small>
        </label>
        {/* <!-- Advance Information widget --> */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Property Type</h4>
          {statusOptions.length > 0 ? (
            <>
              <ul>
                {statusOptions &&
                  statusOptions.map((status) => {
                    return (
                      <li key={status.name}>
                        <div>
                          <label className="checkbox-item">
                            {status.name}
                            <input
                              checked={selectedStatuses.includes(status.name)}
                              onChange={(e) =>
                                onStatusToggle?.(status.name, e.target.checked)
                              }
                              type="checkbox"
                            />
                            <span className="checkmark"></span>
                          </label>
                          <span className="categorey-no">
                            ({status.count})
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </>
          ) : (
            "No categories found"
          )}

          <hr />
          <h4 className="ltn__widget-title">Price Renge</h4>
          {priceRanges.length > 0 ? (
            <>
              <ul>
                {priceRanges &&
                  priceRanges.map((price) => {
                    return (
                      <li key={price.name}>
                        <div>
                          <label className="checkbox-item">
                            {price.name}
                            <input
                              checked={selectedPriceRanges.includes(price.name)}
                              onChange={(e) =>
                                onPriceRangeToggle?.(price.name, e.target.checked)
                              }
                              type="checkbox"
                            />
                            <span className="checkmark"></span>
                          </label>
                          <span className="categorey-no">
                            ({price.count})
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </>
          ) : (
            "No categories found"
          )}

          {/* <hr /> */}
          {/* <!-- Price Filter Widget --> */}
          <div className="ltn__price-filter-widget mt-30">
            <h4 className="ltn__widget-title">Filter by price</h4>
            <div className="price_filter">
              <FilterByPrice
                min={0}
                max={1000000}
                value={priceFilterValue}
                onChange={onPriceFilterChange}
              />
            </div>
            <small>
              Price bounds: {formatAmount(0)} - {formatAmount(1000000)}
            </small>
          </div>
          <hr />
          <h4 className="ltn__widget-title">Bed/bath</h4>
          {bedBaths.length > 0 ? (
            <>
              <ul>
                {bedBaths &&
                  bedBaths.map((bath) => {
                    return (
                      <li key={bath.name}>
                        <div>
                          <label className="checkbox-item">
                            {bath.name}
                            <input
                              checked={selectedBedBaths.includes(bath.name)}
                              onChange={(e) =>
                                onBedBathToggle?.(bath.name, e.target.checked)
                              }
                              type="checkbox"
                            />
                            <span className="checkmark"></span>
                          </label>
                          <span className="categorey-no">
                            {/* {products[key < aminities.length ? key : 1].price} */}
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </>
          ) : (
            "No categories found"
          )}
          <hr />
          <h4 className="ltn__widget-title">Catagory</h4>
          {categories.length > 0 ? (
            <>
              <ul>
                {categories &&
                  categories.map((categorie) => {
                    return (
                      <li key={categorie.name}>
                        <div>
                          <label className="checkbox-item">
                            {categorie.name}
                            <input
                              checked={selectedCategories.includes(categorie.name)}
                              onChange={(e) =>
                                onCategoryToggle?.(
                                  categorie.name,
                                  e.target.checked
                                )
                              }
                              type="checkbox"
                            />
                            <span className="checkmark"></span>
                          </label>
                          <span className="categorey-no">
                            {/* {products[key < aminities.length ? key : 1].price} */}
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </>
          ) : (
            "No categories found"
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
