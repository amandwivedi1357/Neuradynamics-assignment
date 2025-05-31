import React from 'react';

import { selectAllFavorites, clearAllFavorites } from '../features/favorites/favoritesSlice';
import ProductGrid from '../components/products/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import InteractiveCard from '../components/common/EmptyFav';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavorites);
  
  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all favorites?')) {
      dispatch(clearAllFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] my-24 flex flex-col items-center justify-center bg-black">
        <InteractiveCard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pb-12 pt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
            <p className="text-gray-400">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="mt-4 sm:mt-0 px-4 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors rounded-md"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="">
          <ProductGrid products={favorites} isLoading={false} error={null} />
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;