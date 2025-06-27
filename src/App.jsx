import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Bootstrap CSS and Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import custom SCSS
import './styles/main.scss';

// Import components and pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Component1 from './components/Component1';
import Component2 from './components/Component2';

function App() {
  // State management for cart and wishlist
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add item to cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (!existingItem) {
      setCartItems([...cartItems, product]);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Add item to wishlist
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

  return (
    <Router>
      <div className="App min-vh-100 d-flex flex-column">
        <Navbar 
          cartItems={cartItems} 
          wishlistItems={wishlistItems} 
        />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task1" element={<Component1 />} />
            <Route path="/task2" element={<Component2 />} />
            <Route 
              path="/products" 
              element={
                <Products
                  cartItems={cartItems}
                  wishlistItems={wishlistItems}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <Wishlist
                  wishlistItems={wishlistItems}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              } 
            />
          </Routes>
        </main>
        
        <footer className="bg-dark text-light py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5>React Training Project</h5>
                <p className="mb-0">
                  Built with React, Bootstrap, and SCSS for educational purposes.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="mb-0">
                  <small>© 2025 Astrikos Training. All rights reserved.</small>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
