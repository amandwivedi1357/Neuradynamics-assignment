import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductCategories } from '../../services/api';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await fetchAllProducts();
    return products;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const categories = await fetchProductCategories();
    return categories;
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchTerm: '',
  selectedCategory: '',
  sortOrder: null, // null | 'asc' | 'desc'
};

// Helper function to apply all filters
const applyFilters = (state) => {
  let filtered = [...state.items];

  // Apply category filter
  if (state.selectedCategory) {
    filtered = filtered.filter(
      (product) => product.category === state.selectedCategory
    );
  }

  // Apply search filter
  if (state.searchTerm) {
    const searchTermLower = state.searchTerm.toLowerCase();
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTermLower)
    );
  }

  // Apply sort
  if (state.sortOrder) {
    filtered.sort((a, b) => {
      if (state.sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  state.filteredItems = filtered;
};

// Slice                  
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.sortOrder = null;
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending , (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
        applyFilters(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

// Export actions and reducer
export const { setSearchTerm, setSelectedCategory, setSortOrder, clearFilters } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => state.products.filteredItems;
export const selectProductCategories = (state) => state.products.categories;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSortOrder = (state) => state.products.sortOrder;

export default productsSlice.reducer;