import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="jumbotron bg-primary text-white rounded p-5 mb-4">
        <h1 className="display-4">Welcome to React Training</h1>
        <p className="lead">
          This is a comprehensive React training project that demonstrates various concepts 
          including state management, props, conditional rendering, and navigation.
        </p>
        <hr className="my-4" />
        <p>
          Explore the different tasks and features by navigating through the menu above.
        </p>
        <Link className="btn btn-light btn-lg" to="/products" role="button">
          Explore Products
        </Link>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-toggle-on text-primary me-2"></i>
                Task 1: Toggle Component
              </h5>
              <p className="card-text">
                Learn about state management and conditional rendering by toggling content visibility.
              </p>
              <Link to="/task1" className="btn btn-primary">
                Try Task 1
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-palette text-success me-2"></i>
                Task 2: Background Changer
              </h5>
              <p className="card-text">
                Experiment with dynamic styling and event handling using dropdown controls.
              </p>
              <Link to="/task2" className="btn btn-success">
                Try Task 2
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-shop text-info me-2"></i>
                Task 3: Product Catalog
              </h5>
              <p className="card-text">
                Explore a full-featured product catalog with cart and wishlist functionality.
              </p>
              <Link to="/products" className="btn btn-info">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Features Implemented</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>React Concepts:</h6>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle text-success me-2"></i>State Management (useState)</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Props and Component Communication</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Conditional Rendering</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Event Handling</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>React Router Navigation</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>UI Features:</h6>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle text-success me-2"></i>Responsive Bootstrap Design</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>SCSS Custom Styling</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Shopping Cart & Wishlist</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Product Filtering & Sorting</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Interactive Navigation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
