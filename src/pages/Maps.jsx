import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Maps = () => {
  const [isDayMode, setIsDayMode] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Check if API key is available
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasApiKey = apiKey && apiKey !== 'YOUR_API_KEY_HERE';

  // Simple locations data
  const locations = [
    { id: 1, name: 'New York', lat: 40.7128, lng: -74.0060, population: 8000000 },
    { id: 2, name: 'London', lat: 51.5074, lng: -0.1278, population: 9000000 },
    { id: 3, name: 'Tokyo', lat: 35.6762, lng: 139.6503, population: 14000000 },
    { id: 4, name: 'Paris', lat: 48.8566, lng: 2.3522, population: 2200000 },
    { id: 5, name: 'Sydney', lat: -33.8688, lng: 151.2093, population: 5300000 }
  ];

  // Google Maps settings
  const mapStyles = isDayMode ? [] : [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }
  ];

  const mapOptions = {
    zoom: 2,
    center: { lat: 20, lng: 0 },
    styles: mapStyles
  };

  return (
    <div className="container-fluid py-3">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body py-2">
              <h5 className="mb-2">
                <i className="bi bi-map text-primary me-2"></i>
                Google Maps Dashboard
              </h5>
              <small className="text-muted">
                Interactive map with city markers and day/night mode
              </small>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body py-2">
              <div className="d-flex justify-content-end align-items-center">
                {/* Day/Night Toggle */}
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="dayNightSwitch"
                    checked={isDayMode}
                    onChange={(e) => setIsDayMode(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="dayNightSwitch">
                    <i className={`bi ${isDayMode ? 'bi-sun-fill text-warning' : 'bi-moon-fill text-info'} me-1`}></i>
                    {isDayMode ? 'Day Mode' : 'Night Mode'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="col-12">
          <div className="card">
            <div className="card-header py-2">
              <small className="fw-bold">
                Google Maps View
                <span className="badge bg-secondary ms-2">{locations.length} Cities</span>
              </small>
            </div>
            <div className="card-body p-0">
              <div style={{ height: '500px', width: '100%' }}>
                {hasApiKey ? (
                  <LoadScript 
                    googleMapsApiKey={apiKey}
                    onLoad={() => setMapLoaded(true)}
                    onError={() => setMapError(true)}
                  >
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={mapOptions.center}
                      zoom={mapOptions.zoom}
                      options={{ styles: mapStyles }}
                    >
                      {locations.map(location => (
                        <Marker
                          key={location.id}
                          position={{ lat: location.lat, lng: location.lng }}
                          title={location.name}
                        />
                      ))}
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                    <div className="text-center">
                      <i className="bi bi-exclamation-triangle text-warning mb-2" style={{ fontSize: '48px' }}></i>
                      <h6>Google Maps API Key Required</h6>
                      <p className="text-muted small">
                        Please add your Google Maps API key to the .env file<br />
                        <code>VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="col-12 mt-3">
          <div className="card">
            <div className="card-body py-2">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-primary">Cities Data</h6>
                  <div className="row">
                    {locations.map(city => (
                      <div key={city.id} className="col-sm-6 col-lg-4 mb-2">
                        <small className="d-block">
                          <strong>{city.name}</strong><br />
                          <span className="text-muted">
                            {city.lat.toFixed(2)}, {city.lng.toFixed(2)}<br />
                            Pop: {(city.population / 1000000).toFixed(1)}M
                          </span>
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <h6 className="text-success">Map Features</h6>
                  <ul className="list-unstyled small">
                    <li><i className="bi bi-check-circle text-success me-1"></i>Interactive markers</li>
                    <li><i className="bi bi-check-circle text-success me-1"></i>Day/night mode toggle</li>
                    <li><i className="bi bi-check-circle text-success me-1"></i>Google Maps integration</li>
                    <li><i className="bi bi-check-circle text-success me-1"></i>City information display</li>
                    <li><i className="bi bi-check-circle text-success me-1"></i>Responsive design</li>
                  </ul>
                  
                  <div className="mt-3">
                    <small className="text-muted">
                      <strong>Google Maps:</strong> Click on markers to see city names. 
                      Use controls to zoom and pan around the world.
                    </small>
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

export default Maps;
