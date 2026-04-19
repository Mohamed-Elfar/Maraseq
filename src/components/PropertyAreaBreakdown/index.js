import React from 'react';

const getUnitTypeLabel = (unitType) => {
  const labels = {
    sq_m: 'm²',
    sq_ft: 'sq ft',
    m: 'm',
    feddan: 'Feddan',
    kirat: 'Kirat',
    sahm: 'Sahm',
    hectare: 'ha',
    acre: 'Acre',
  };
  return labels[unitType] || unitType || 'm²';
};

function PropertyAreaBreakdown({ propertyDetails }) {
  if (!propertyDetails) return null;

  const { totalArea, netArea, builtUpArea, landArea, unitType } = propertyDetails;

  // Only show if at least one area value exists
  if (!totalArea && !netArea && !builtUpArea && !landArea) return null;

  return (
    <>
      <h4 className="title-2">Area Breakdown</h4>
      <div className="product-details-apartments-info-list section-bg-1 mb-30">
        <div className="row">
          <div className="col-lg-6">
            <div className="apartments-info-list apartments-info-list-color">
              <ul>
                {totalArea && (
                  <li>
                    <label>Total Area</label>{' '}
                    <span>
                      {totalArea} {getUnitTypeLabel(unitType)}
                    </span>
                  </li>
                )}
                {netArea && (
                  <li>
                    <label>Net Area</label>{' '}
                    <span>
                      {netArea} {getUnitTypeLabel(unitType)}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="apartments-info-list apartments-info-list-color">
              <ul>
                {landArea && (
                  <li>
                    <label>Land Area</label>{' '}
                    <span>
                      {landArea} {getUnitTypeLabel(unitType)}
                    </span>
                  </li>
                )}
                {builtUpArea && (
                  <li>
                    <label>Built-up Area</label>
                    <span>
                      {builtUpArea} {getUnitTypeLabel(unitType)}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyAreaBreakdown;
