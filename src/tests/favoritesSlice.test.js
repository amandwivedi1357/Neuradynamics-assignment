import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  clearAllFavorites,
  selectIsFavorite,
} from '../features/favorites/favoritesSlice';

// Mock localStorage
beforeEach(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: vi.fn(key => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

describe('favorites slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });
  });

  test('should handle initial state', () => {
    expect(store.getState().favorites).toEqual({
      items: [],
    });
  });

  test('should handle addToFavorites', () => {
    const product = { id: 1, title: 'Test Product' };
    store.dispatch(addToFavorites(product));
    expect(store.getState().favorites.items).toEqual([product]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favorites', 
      JSON.stringify([product])
    );
  });

  test('should not add duplicate products to favorites', () => {
    const product = { id: 1, title: 'Test Product' };
    store.dispatch(addToFavorites(product));
    store.dispatch(addToFavorites(product));
    expect(store.getState().favorites.items).toEqual([product]);
  });

  test('should handle removeFromFavorites', () => {
    const product = { id: 1, title: 'Test Product' };
    store.dispatch(addToFavorites(product));
    store.dispatch(removeFromFavorites(1));
    expect(store.getState().favorites.items).toEqual([]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favorites', 
      JSON.stringify([])
    );
  });

  test('should handle clearAllFavorites', () => {
    const products = [
      { id: 1, title: 'Test Product 1' },
      { id: 2, title: 'Test Product 2' },
    ];
    
    store.dispatch(addToFavorites(products[0]));
    store.dispatch(addToFavorites(products[1]));
    store.dispatch(clearAllFavorites());
    
    expect(store.getState().favorites.items).toEqual([]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favorites', 
      JSON.stringify([])
    );
  });

  test('selectIsFavorite should correctly identify favorites', () => {
    const product = { id: 1, title: 'Test Product' };
    store.dispatch(addToFavorites(product));
    
    // Check the selector directly
    const state = store.getState();
    expect(selectIsFavorite(state, 1)).toBe(true);
    expect(selectIsFavorite(state, 2)).toBe(false);
  });
});