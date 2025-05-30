import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { setSearchTerm, selectSearchTerm } from '../../features/products/productsSlice';
import { debounce } from '../../utils/debounce';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {
  const dispatch = useDispatch();
  const currentSearchTerm = useSelector(selectSearchTerm);
  const [inputValue, setInputValue] = useState(currentSearchTerm);

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(setSearchTerm(searchValue));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    setInputValue(currentSearchTerm);
  }, [currentSearchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setInputValue('');
    dispatch(setSearchTerm(''));
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pl-10 text-black pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;