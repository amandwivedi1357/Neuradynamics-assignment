import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { 
  addToFavorites, 
  removeFromFavorites, 
  selectIsFavorite 
} from '../features/favorites/favoritesSlice';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatPrice, capitalizeText } from '../utils/formatters';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isFavorite = useSelector(state => 
    product ? selectIsFavorite(state, product.id) : false
  );

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating} out of 5</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Loading message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorMessage message={error} />
        <div className="mt-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28 animate-fade-in">
      {/* Breadcrumb */}
     

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 bg-gray-800 p-8 flex items-center justify-center">
          <div className="relative w-[50%]">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text--800 rounded-full">
                {capitalizeText(product.category)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-3">
              {product.title}
            </h1>

            <div className="flex items-center mb-6">
              {renderRating(product.rating.rate)}
              <span className="ml-2 text-sm text-gray-300">
                ({product.rating.count} reviews)
              </span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-300">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              
              
              <button
                onClick={toggleFavorite}
                className={`flex items-center  justify-center py-3 px-6 rounded-md font-medium transition-colors ${
                  isFavorite
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                <Heart 
                  size={20} 
                  className={`mr-2 ${isFavorite ? 'fill-current text-red-600' : ''}`} 
                />                    
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;