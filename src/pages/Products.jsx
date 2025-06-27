import React from 'react';
import Component3 from '../components/Component3';

const Products = ({ cartItems, wishlistItems, onAddToCart, onAddToWishlist }) => {
  return (
    <div>
      <Component3
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
      />
    </div>
  );
};

export default Products;
