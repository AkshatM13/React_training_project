//// Extended product catalog with more variety

import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const Component3 = () => {
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');

  // Get data from context instead of props
  const { cartItems, wishlistItems, handleAddToCart, handleAddToWishlist } = useAppContext();

  // Extended product catalog with more variety
  const products = [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      price: 29.99,
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
      inStock: true,
      category: "Electronics",
      rating: 4.5
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 89.99,
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop",
      inStock: false,
      category: "Electronics",
      rating: 4.8
    },
    {
      id: 3,
      name: "4K Ultra HD Monitor",
      price: 299.99,
      imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop",
      inStock: true,
      category: "Electronics",
      rating: 4.7
    },
    {
      id: 4,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      inStock: true,
      category: "Audio",
      rating: 4.3
    },
    {
      id: 5,
      name: "USB-C Hub",
      price: 45.99,
      imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=200&fit=crop",
      inStock: true,
      category: "Accessories",
      rating: 4.2
    },
    {
      id: 6,
      name: "Laptop Stand",
      price: 35.99,
      imageUrl: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=300&h=200&fit=crop",
      inStock: true,
      category: "Accessories",
      rating: 4.4
    },
    {
      id: 7,
      name: "Webcam HD 1080p",
      price: 59.99,
      imageUrl: "https://images.unsplash.com/photo-1616627561574-63ba47ae64b7?w=300&h=200&fit=crop",
      inStock: false,
      category: "Electronics",
      rating: 4.1
    },
    {
      id: 8,
      name: "Portable Speaker",
      price: 49.99,
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
      inStock: true,
      category: "Audio",
      rating: 4.6
    }
  ];

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  }, [filterCategory, sortBy]);

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="card">
        <div className="card-header">
          <h3 className="card-title">Task 3: Product Catalog</h3>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Sidebar for filters */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="sidebar">
                <h5 className="mb-3">Filters & Sorting</h5>
                
                {/* Category Filter */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className="form-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Sort Options */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Sort By</label>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>
                
                {/* Filter Summary */}
                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    <strong>Showing:</strong> {filteredAndSortedProducts.length} product(s)
                    {filterCategory !== 'all' && (
                      <><br />Category: {filterCategory}</>
                    )}
                    <br />Sorted by: {sortBy.replace('-', ' ')}
                  </small>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="col-lg-9 col-md-8">
              {filteredAndSortedProducts.length > 0 ? (
                <div className="row">
                  {filteredAndSortedProducts.map(product => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                      <ProductCard
                        {...product}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="bi bi-search"></i>
                  <h4>No products found</h4>
                  <p>Try adjusting your filters to see more products.</p>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component3;
