import React from 'react'

const PriceCheckBox = ({
  priceClass,
  isChecked,
  priceRange,
  name,
  handleSortPrice
}) => (
  <div className={priceClass} key={name}>
    <label className='checkbox'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={(e) => handleSortPrice(e, priceRange)}
        name={name}
      />
      {name}
    </label>
  </div>
)
export default PriceCheckBox
