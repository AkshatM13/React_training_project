//Task 1: Toggle Paragraph
import React, { useState } from 'react';

const Component1 = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleParagraph = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="card">
        <div className="card-header">
          <h3 className="card-title">Task 1: Toggle Paragraph</h3>
        </div>
        <div className="card-body">
          <button 
            className="btn btn-primary" 
            onClick={toggleParagraph}
          >
            {isVisible ? 'Hide' : 'Show'} Paragraph
          </button>
          
          {isVisible && (
            <div className="toggle-content">
              <p className="mb-0">
                This is a toggleable paragraph! You can show or hide this content by clicking the button above. 
                This demonstrates the basic concept of conditional rendering in React using state management.
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;
