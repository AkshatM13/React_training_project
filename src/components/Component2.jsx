//Task 2: Background Color Changer
import React, { useState } from 'react';

const Component2 = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const colorOptions = [
    { name: 'White', value: '#ffffff' },
    { name: 'Light Blue', value: '#e3f2fd' },
    { name: 'Light Green', value: '#e8f5e8' },
    { name: 'Light Pink', value: '#fce4ec' },
    { name: 'Light Yellow', value: '#fff8e1' },
    { name: 'Light Purple', value: '#f3e5f5' },
    { name: 'Light Orange', value: '#fff3e0' },
    { name: 'Light Gray', value: '#f5f5f5' }
  ];

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="card">
        <div className="card-header">
          <h3 className="card-title">Task 2: Background Color Changer</h3>
        </div>
        <div className="card-body bg-selector">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Background Color
            </button>
            <ul className="dropdown-menu">
              {colorOptions.map((color, index) => (
                <li key={index}>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => handleColorChange(color.value)}
                  >
                    <div
                      className="color-preview me-2"
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: color.value,
                        border: '1px solid #ccc',
                        borderRadius: '3px'
                      }}
                    ></div>
                    {color.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div 
            className="mt-4 p-4 rounded"
            style={{ 
              backgroundColor: backgroundColor,
              border: '2px solid #dee2e6',
              minHeight: '150px',
              transition: 'background-color 0.3s ease'
            }}
          >
            <h5>Preview Area</h5>
            <p>
              This area's background color changes based on your selection from the dropdown above. 
              The current background color is: <strong>{backgroundColor}</strong>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Component2;
