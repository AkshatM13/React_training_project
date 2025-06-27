import React from 'react';

const Wishlist = ({ wishlistItems = [], onAddToCart, onRemoveFromWishlist, cartItems = [] }) => {
  if (wishlistItems.length === 0) {
    return (
      <div className="container-fluid py-4">
        <div className="container">
          <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="bi bi-heart me-2"></i>
              Your Wishlist
            </h3>
          </div>
          <div className="card-body">
            <div className="empty-state">
              <i className="bi bi-heart"></i>
              <h4>Your wishlist is empty</h4>
              <p>Start adding products you love to see them here!</p>
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
            <i className="bi bi-heart me-2"></i>
            Your Wishlist
          </h3>
          <span className="badge bg-primary">{wishlistItems.length} item(s)</span>
        </div>
        <div className="card-body">
          <div className="row">
            {wishlistItems.map(item => {
              const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
              
              return (
                <div key={item.id} className="col-12 mb-3">
                  <div className="wishlist-item d-flex align-items-center">
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
                      <p className="price mb-0">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="d-flex flex-column gap-2">
                      {item.inStock ? (
                        <button
                          className={`btn ${isInCart ? 'btn-success' : 'btn-primary'}`}
                          onClick={() => !isInCart && onAddToCart && onAddToCart(item)}
                          disabled={isInCart}
                        >
                          {isInCart ? (
                            <>
                              <i className="bi bi-check-circle me-1"></i>
                              In Cart
                            </>
                          ) : (
                            <>
                              <i className="bi bi-cart-plus me-1"></i>
                              Add to Cart
                            </>
                          )}
                        </button>
                      ) : (
                        <button className="btn btn-secondary" disabled>
                          <i className="bi bi-x-circle me-1"></i>
                          Out of Stock
                        </button>
                      )}
                      
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(item.id)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-light rounded">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h6 className="mb-1">Total Items in Wishlist</h6>
                <p className="text-muted mb-0">{wishlistItems.length} product(s)</p>
              </div>
              <div className="col-md-4 text-md-end">
                <p className="mb-0">
                  <strong>
                    Total Value: $
                    {wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
