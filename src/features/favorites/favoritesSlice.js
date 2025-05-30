import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const initialState = {
  items: loadFavorites(),
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveFavorites(state.items);
    },
    clearAllFavorites: (state) => {
      state.items = [];
      saveFavorites(state.items);
    }
  },
});

export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoritesSlice.actions;

export const selectAllFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, productId) => 
  state.favorites.items.some(item => item.id === productId);

export default favoritesSlice.reducer;