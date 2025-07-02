import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
