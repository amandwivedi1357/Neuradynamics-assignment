import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder, selectSortOrder } from '../../features/products/productsSlice';

const SortOptions = () => {
  const dispatch = useDispatch();
  const currentSortOrder = useSelector(selectSortOrder);

  const handleSortChange = (e) => {
    const value = e.target.value;
    dispatch(setSortOrder(value === '' ? null : value));
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort-order"
        value={currentSortOrder || ''}
        onChange={handleSortChange}
        className="border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
      >
        <option value="">Featured</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;