import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context Provider component
export const AppProvider = ({ children }) => {
  // State management (moved from App.jsx)
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add item to cart (allows multiple quantities)
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // If product exists, increase quantity
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // If new product, add with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart (decreases quantity or removes completely)
  const handleRemoveFromCart = (productId) => {
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem && existingItem.quantity > 1) {
      // If quantity > 1, decrease quantity
      setCartItems(cartItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      // If quantity = 1 or item doesn't exist, remove completely
      setCartItems(cartItems.filter(item => item.id !== productId));
    }
  };

  // Remove item completely from cart (regardless of quantity)
  const handleRemoveCompletelyFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Add item to wishlist (toggle behavior)
  const handleAddToWishlist = (product) => {
    const existingItem = wishlistItems.find(item => item.id === product.id);
    if (existingItem) {
      // Remove from wishlist if already exists
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      // Add to wishlist
      setWishlistItems([...wishlistItems, product]);
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  // Context value object - all data and functions available to components
  const value = {
    // State
    cartItems,
    wishlistItems,
    // Functions
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveCompletelyFromCart,
    handleAddToWishlist,
    handleRemoveFromWishlist
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
