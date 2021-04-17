import React from 'react'

const RatingCheckBox = ({
  ratingClass,
  isChecked,
  value,
  handleSortRating
}) => (
  <div className={ratingClass} key={value}>
    <label className='checkbox'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleSortRating}
        value={value}
      />
      {value}
    </label>
  </div>
)

export default RatingCheckBox
