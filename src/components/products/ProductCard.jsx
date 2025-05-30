import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../../features/favorites/favoritesSlice';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center mt-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={16} className="text-gray-600" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-600" />
      ))}
      <span className="ml-2 text-sm text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, product.id));

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const rating = product.rating?.rate || 0;

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 border border-gray-800 hover:border-yellow-400/30 h-full flex flex-col">
        <div className="relative flex-1">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-yellow-400/90 text-black hover:bg-yellow-300' 
                : 'bg-black/70 text-white hover:bg-yellow-400 hover:text-black'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              size={20}
              className={isFavorite ? 'fill-current' : ''}
            />
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{product.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-yellow-400 font-bold text-xl">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-2">
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;