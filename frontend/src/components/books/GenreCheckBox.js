import React from 'react';

const GenreCheckBox = ({ genreClass, isChecked, handleSort, value }) => (
	<div className={genreClass} key={value}>
		<label className='checkbox'>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={handleSort}
				value={value}
			/>
			{value}
		</label>
	</div>
);

export default GenreCheckBox;
