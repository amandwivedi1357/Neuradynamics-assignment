import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ProductCard from '../components/products/ProductCard';
import favoritesReducer from '../features/favorites/favoritesSlice';

// Sample product data
const sampleProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/1.jpg',
  rating: {
    rate: 4.5,
    count: 120
  }
};

// Create a test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState,
  });
};

// Test component with all required providers
const renderWithProviders = (component, preloadedState = {}) => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard component', () => {
  test('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={sampleProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    
    // Check if image is rendered with correct src
    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toBe('https://fakestoreapi.com/img/1.jpg');
  });

  test('favorite button toggles favorite status', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={sampleProduct} />
        </BrowserRouter>
      </Provider>
    );
    
    // Find the favorite button and click it
    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    
    // Check if the product has been added to favorites
    expect(store.getState().favorites.items).toContainEqual(sampleProduct);
    
    // Click again to remove from favorites
    fireEvent.click(favoriteButton);
    
    // Check if the product has been removed from favorites
    expect(store.getState().favorites.items).not.toContainEqual(sampleProduct);
  });

  test('renders favorite status correctly', () => {
    // Setup store with the product already in favorites
    const preloadedState = {
      favorites: {
        items: [sampleProduct],
      },
    };
    
    renderWithProviders(<ProductCard product={sampleProduct} />, preloadedState);
    
    // Check if the favorite button is in "favorited" state
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });
});