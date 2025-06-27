import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  inStock, 
  category,
  rating,
  onAddToCart, 
  onAddToWishlist,
  cartItems,
  wishlistItems 
}) => {
  const navigate = useNavigate();
  const isInCart = cartItems && cartItems.some(item => item.id === id);
  const isInWishlist = wishlistItems && wishlistItems.some(item => item.id === id);

  const handleViewDetails = () => {
    // For demo purposes, navigate to a product details page (you can create this later)
    navigate(`/product/${id}`);
  };

  const handleAddToCartWithNavigation = () => {
    if (onAddToCart) {
      onAddToCart({ id, name, price, imageUrl, inStock, category, rating });
      // Optional: Show a toast notification or navigate to cart after adding
      // navigate('/cart');
    }
  };

  return (
    <div className={`card product-card h-100 ${!inStock ? 'out-of-stock' : ''}`}>
      <img 
        src={imageUrl} 
        className="card-img-top" 
        alt={name}
        loading="lazy"
        onClick={handleViewDetails}
        style={{ cursor: 'pointer' }}
        title="Click to view details"
      />
      <div className="card-body d-flex flex-column">
        <h5 
          className="card-title" 
          onClick={handleViewDetails}
          style={{ cursor: 'pointer' }}
          title="Click to view details"
        >
          {name}
        </h5>
        <p className="text-muted small mb-1">Category: {category}</p>
        
        <div className="d-flex align-items-center mb-2">
          <div className="stars text-warning me-2">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : 'bi-star'}`}
              ></i>
            ))}
          </div>
          <small className="text-muted">({rating})</small>
        </div>
        
        <p className="price mb-3">${price.toFixed(2)}</p>
        
        <div className="mt-auto">
          {inStock ? (
            <div className="d-flex gap-2 flex-column">
              <button
                className="btn btn-outline-info btn-sm"
                onClick={handleViewDetails}
              >
                <i className="bi bi-eye me-1"></i>
                View Details
              </button>
              
              <div className="d-flex gap-2">
                <button
                  className={`btn ${isInCart ? 'btn-success' : 'btn-primary'} flex-fill`}
                  onClick={() => onAddToCart && onAddToCart({ id, name, price, imageUrl, inStock, category, rating })}
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
                
                <button
                  className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => onAddToWishlist && onAddToWishlist({ id, name, price, imageUrl, inStock, category, rating })}
                  title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-secondary w-100" disabled>
              <i className="bi bi-x-circle me-1"></i>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
