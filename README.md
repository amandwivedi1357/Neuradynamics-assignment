# Product Dashboard

A modern product dashboard application built with React, Redux Toolkit, and React Router. The application features a responsive design, advanced filtering capabilities, and a favorites system.

## Features

- **Product Listing:** Browse products in a responsive grid layout
- **Search & Filter:** Find products with debounced search, category filtering, and price sorting
- **Product Details:** View comprehensive information about each product
- **Favorites System:** Add/remove products from your favorites list
- **Responsive Design:** Optimized for all devices from mobile to desktop

## Technologies Used

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Vitest for testing
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/product-dashboard.git
cd product-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be located in the `dist` directory, ready to be deployed to Netlify, Vercel, or any other hosting service.

## Testing

Run the tests with:

```bash
npm run test
```

## Project Structure

```
src/
├── app/                  # Redux store setup
├── components/           # Reusable components
│   ├── common/           # Common UI components
│   ├── products/         # Product-related components
│   └── favorites/        # Favorites-related components
├── features/             # Redux slices and logic
├── pages/                # Page components
├── services/             # API service functions
├── utils/                # Utility functions
├── tests/                # Test files
├── App.js                # Main application component
└── main.js               # Application entry point
```

## Data Source

This application uses the [Fake Store API](https://fakestoreapi.com) for product data.

## License

This project is licensed under the MIT License.