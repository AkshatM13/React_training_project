# React Training Project - Astrikos

A comprehensive React training project built with Vite, Bootstrap, and SCSS to demonstrate fundamental React concepts including state management, props, conditional rendering, and routing.

## 🚀 Features

### Tasks Implemented

1. **Task 1: Toggle Component** - Show/Hide paragraph functionality using state management
2. **Task 2: Background Color Changer** - Dynamic styling with dropdown controls
3. **Task 3: Product Catalog** - Full-featured e-commerce interface with:
   - Product listing with custom JSON data
   - Add to Cart & Wishlist functionality
   - Filtering and sorting capabilities
   - Responsive product cards

### Additional Features

- **Navigation**: React Router implementation with active states
- **Shopping Cart**: Add/remove items with cart management
- **Wishlist**: Save favorite products for later
- **Responsive Design**: Bootstrap-powered mobile-first approach
- **Custom Styling**: SCSS implementation with Bootstrap integration

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Bootstrap 5** - CSS framework for responsive design
- **SCSS** - CSS preprocessor for custom styling
- **Bootstrap Icons** - Icon library

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Component1.jsx   # Toggle functionality demo
│   ├── Component2.jsx   # Background color changer
│   ├── Component3.jsx   # Product catalog with filters
│   ├── Navbar.jsx       # Navigation component
│   └── ProductCard.jsx  # Individual product display
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── Products.jsx     # Products listing page
│   ├── Wishlist.jsx     # Wishlist management
│   └── Cart.jsx         # Shopping cart
└── styles/
    └── main.scss        # Custom SCSS styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Learning Objectives

This project demonstrates the following React concepts:

- **State Management**: Using `useState` hook for local component state
- **Props**: Passing data and functions between components
- **Conditional Rendering**: Showing/hiding content based on state
- **Event Handling**: Managing user interactions
- **React Router**: Client-side navigation and routing
- **Component Composition**: Building reusable UI components
- **List Rendering**: Displaying arrays of data
- **Responsive Design**: Mobile-first approach with Bootstrap

## 🎨 Features Overview

### Task 1: Toggle Component
- Demonstrates basic state management
- Shows/hides content with button interaction
- Conditional rendering implementation

### Task 2: Background Color Changer
- Dynamic styling based on user selection
- Dropdown component interaction
- CSS-in-JS and inline styling

### Task 3: Product Catalog
- **Product Display**: Grid layout with product cards
- **Filtering**: Category-based product filtering
- **Sorting**: Multiple sorting options (name, price, rating)
- **Cart Management**: Add/remove items from shopping cart
- **Wishlist**: Save/remove favorite products
- **Responsive Design**: Mobile-optimized layout

### Navigation & Pages
- **Home Page**: Project overview and navigation
- **Products Page**: Full product catalog
- **Cart Page**: Shopping cart management with totals
- **Wishlist Page**: Saved products management

## 🔧 Technical Implementation

### State Management Strategy
- **App-level State**: Cart and wishlist managed in `App.jsx`
- **Props Drilling**: State passed down through component hierarchy
- **Event Handlers**: Functions passed as props for state updates

### Styling Approach
- **Bootstrap Classes**: Utility-first styling approach
- **Custom SCSS**: Enhanced styling with variables and mixins
- **Responsive Design**: Mobile-first breakpoints
- **Component-specific Styles**: Modular CSS organization

## 🎓 Educational Value

This project serves as a comprehensive introduction to:
- Modern React development practices
- Component-based architecture
- State management patterns
- Routing in single-page applications
- Responsive web design
- CSS preprocessing with SCSS

## 📱 Responsive Features

- Mobile-optimized navigation with hamburger menu
- Responsive product grid (1-4 columns based on screen size)
- Touch-friendly buttons and interactions
- Accessible design patterns

## 🚀 Future Enhancements

Potential improvements for advanced learning:
- State management with Context API or Redux
- API integration for dynamic data
- Form validation and user input handling
- Search functionality
- Pagination for large product lists
- User authentication
- Local storage persistence

---

**Note**: This is a training project designed for educational purposes. The "Buy Now" functionality is intentionally non-functional as this demonstrates frontend concepts only.
