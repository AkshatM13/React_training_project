import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  
  // Get data from context instead of props
  const { cartItems, wishlistItems } = useAppContext();
  
  // Calculate total quantities
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-shop me-2"></i>
          Astrikos Store
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/task1') ? 'active' : ''}`} 
                to="/task1"
              >
                Task 1
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/task2') ? 'active' : ''}`} 
                to="/task2"
              >
                Task 2
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/products') ? 'active' : ''}`} 
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/charts') ? 'active' : ''}`} 
                to="/charts"
              >
                Charts
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/maps') ? 'active' : ''}`} 
                to="/maps"
              >
                Maps
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/mobility') ? 'active' : ''}`} 
                to="/mobility"
              >
                Mobility
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/overview') ? 'active' : ''}`} 
                to="/overview"
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/deckgl') ? 'active' : ''}`} 
                to="/deckgl"
              >
                Deck.gl
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link position-relative ${isActive('/wishlist') ? 'active' : ''}`} 
                to="/wishlist"
              >
                <i className="bi bi-heart"></i>
                <span className="ms-1 d-none d-sm-inline">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistItems.length}
                    <span className="visually-hidden">items in wishlist</span>
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link position-relative ${isActive('/cart') ? 'active' : ''}`} 
                to="/cart"
              >
                <i className="bi bi-cart"></i>
                <span className="ms-1 d-none d-sm-inline">Cart</span>
                {totalCartItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {totalCartItems}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
