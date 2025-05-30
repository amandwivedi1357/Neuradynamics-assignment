import React from 'react';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const ProductGrid = ({ products, isLoading, error }) => {
  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid my-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${product.id * 50}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;