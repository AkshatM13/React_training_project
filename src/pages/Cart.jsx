import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const navigate = useNavigate();
  
  // Get data from context instead of props
  const { 
    cartItems, 
    handleRemoveFromCart, 
    handleRemoveCompletelyFromCart,
    handleAddToCart 
  } = useAppContext();
  
  // Calculate total with quantities
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-fluid py-4">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="bi bi-cart me-2"></i>
                Shopping Cart
              </h3>
            </div>
            <div className="card-body">
              <div className="empty-state text-center">
                <i className="bi bi-cart display-1 text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p className="text-muted mb-4">Add some products to get started!</p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-shop me-2"></i>
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">
            <i className="bi bi-cart me-2"></i>
            Shopping Cart
          </h3>
          <span className="badge bg-success">{totalItems} item(s)</span>
        </div>
        <div className="card-body">
          <div className="row">
            {cartItems.map(item => (
              <div key={item.id} className="col-12 mb-3">
                <div className="cart-item d-flex align-items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="me-3"
                  />
                  
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-1">Category: {item.category}</p>
                    <div className="d-flex align-items-center mb-2">
                      <div className="stars text-warning me-2">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`bi ${i < Math.floor(item.rating) ? 'bi-star-fill' : 'bi-star'}`}
                          ></i>
                        ))}
                      </div>
                      <small className="text-muted">({item.rating})</small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <strong>Quantity: {item.quantity}</strong>
                    </div>
                    <p className="price mb-0">
                      ${item.price.toFixed(2)} each
                      <br />
                      <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>
                  
                  <div className="d-flex flex-column gap-2">
                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                        title="Decrease quantity"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleAddToCart(item)}
                        title="Increase quantity"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    
                    {/* Remove Completely Button */}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveCompletelyFromCart(item.id)}
                      title="Remove completely from cart"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <div className="mt-4 p-4 bg-light rounded">
            <div className="row">
              <div className="col-md-6">
                <h5>Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({totalItems}):</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${totalAmount.toFixed(2)}</strong>
                </div>
              </div>
              
              <div className="col-md-6 text-md-end">
                <div className="mt-3 mt-md-0">
                  <button 
                    className="btn btn-success btn-lg"
                    disabled
                    title="This is a demo - Buy Now functionality is not implemented"
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Buy Now (Demo)
                  </button>
                  <br />
                  <small className="text-muted mt-2 d-block">
                    Note: This is a training project - payment functionality is not implemented
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="mt-3 p-3 border rounded">
            <h6 className="text-muted">
              <i className="bi bi-info-circle me-2"></i>
              Cart Information
            </h6>
            <ul className="list-unstyled mb-0 small text-muted">
              <li>• Items in your cart are reserved for 30 minutes</li>
              <li>• Free shipping on orders over $50</li>
              <li>• 30-day return policy on all items</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Cart;
