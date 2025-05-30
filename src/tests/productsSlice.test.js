import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  setSearchTerm,
  setSelectedCategory,
  setSortOrder,
  clearFilters,
} from '../features/products/productsSlice';

describe('products slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  test('should handle initial state', () => {
    expect(store.getState().products).toEqual({
      items: [],
      filteredItems: [],
      categories: [],
      status: 'idle',
      error: null,
      searchTerm: '',
      selectedCategory: '',
      sortOrder: null,
    });
  });

  test('should handle setSearchTerm', () => {
    store.dispatch(setSearchTerm('test'));
    expect(store.getState().products.searchTerm).toEqual('test');
  });

  test('should handle setSelectedCategory', () => {
    store.dispatch(setSelectedCategory('electronics'));
    expect(store.getState().products.selectedCategory).toEqual('electronics');
  });

  test('should handle setSortOrder', () => {
    store.dispatch(setSortOrder('asc'));
    expect(store.getState().products.sortOrder).toEqual('asc');
  });

  test('should handle clearFilters', () => {
    // Set some filters first
    store.dispatch(setSearchTerm('test'));
    store.dispatch(setSelectedCategory('electronics'));
    store.dispatch(setSortOrder('asc'));
    
    // Then clear them
    store.dispatch(clearFilters());
    
    expect(store.getState().products.searchTerm).toEqual('');
    expect(store.getState().products.selectedCategory).toEqual('');
    expect(store.getState().products.sortOrder).toEqual(null);
  });

  test('should filter products based on search term', () => {
    // Initialize with sample data
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
      preloadedState: {
        products: {
          items: [
            { id: 1, title: 'Test Product', category: 'electronics', price: 100 },
            { id: 2, title: 'Another Item', category: 'electronics', price: 200 },
          ],
          filteredItems: [
            { id: 1, title: 'Test Product', category: 'electronics', price: 100 },
            { id: 2, title: 'Another Item', category: 'electronics', price: 200 },
          ],
          categories: ['electronics'],
          status: 'succeeded',
          error: null,
          searchTerm: '',
          selectedCategory: '',
          sortOrder: null,
        },
      },
    });

    store.dispatch(setSearchTerm('test'));
    expect(store.getState().products.filteredItems).toEqual([
      { id: 1, title: 'Test Product', category: 'electronics', price: 100 },
    ]);
  });
});