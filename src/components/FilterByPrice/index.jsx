import ReactSlider from "react-slider";

const FilterByPrice = ({ min = 0, max = 1000000, value = [0, 1000000], onChange }) => {
  const formatPrice = (amount) => Number(amount).toLocaleString();

  return (
    <>
      <div className="price_slider_amount">
        <span>Your range:</span>
        <span>{formatPrice(value[0])}</span>
        <span>-</span>
        <span>{formatPrice(value[1])}</span>
      </div>

      <ReactSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="horizontal-slider"
        thumbClassName="filter-by-price-thumb"
        trackClassName="filter-by-price-track"
        pearling
        minDistance={10000}
      />
    </>
  );
};

export default FilterByPrice;
