import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import { scaleThreshold } from 'd3-scale';

const DeckGLPage = () => {
  // Color scale for data visualization
  const COLOR_SCALE = scaleThreshold()
    .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
    .range([
      [65, 182, 196],
      [127, 205, 187],
      [199, 233, 180],
      [237, 248, 177],
      [255, 255, 204], // zero
      [255, 237, 160],
      [254, 217, 118],
      [254, 178, 76],
      [253, 141, 60],
      [252, 78, 42],
      [227, 26, 28],
      [189, 0, 38],
      [128, 0, 38]
    ]);

  // Initial view settings
  const INITIAL_VIEW_STATE = {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45,
    bearing: 0
  };

  // Data source
  const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json';
  const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

  // Lighting setup
  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
  });

  const dirLight = new SunLight({
    timestamp: Date.UTC(2019, 7, 1, 22),
    color: [255, 255, 255],
    intensity: 1.0,
    _shadow: true
  });

  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });

  // Ground plane for shadows
  const landCover = [
    [
      [-123.0, 49.196],
      [-123.0, 49.324],
      [-123.306, 49.324],
      [-123.306, 49.196]
    ]
  ];

  // Tooltip function
  const getTooltip = ({ object }) => {
    return (
      object && {
        html: `
          <div><b>Average Property Value</b></div>
          <div>${object.properties.valuePerParcel} / parcel</div>
          <div>${object.properties.valuePerSqm} / m<sup>2</sup></div>
          <div><b>Growth</b></div>
          <div>${Math.round(object.properties.growth * 100)}%</div>
        `
      }
    );
  };

  // Layer configuration
  const layers = [
    // Ground layer for shadows
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0]
    }),
    // Main GeoJSON layer
    new GeoJsonLayer({
      id: 'geojson',
      data: DATA_URL,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true
    })
  ];

  return (
    <div className="container-fluid py-3">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body py-2">
              <h5 className="mb-2">
                <i className="bi bi-layers text-primary me-2"></i>
                Deck.gl Visualization Dashboard
              </h5>
              <small className="text-muted">
                3D geospatial data visualization using Deck.gl - Vancouver Property Values
              </small>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="col-12">
          <div className="card">
            <div className="card-header py-2">
              <small className="fw-bold">
                Vancouver Property Value Visualization
                <span className="badge bg-info ms-2">3D Extruded</span>
              </small>
            </div>
            <div className="card-body p-0">
              <div style={{ height: '600px', width: '100%', position: 'relative' }}>
                <DeckGL
                  layers={layers}
                  effects={effects}
                  initialViewState={INITIAL_VIEW_STATE}
                  controller={true}
                  getTooltip={getTooltip}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                  <Map 
                    reuseMaps 
                    mapStyle={MAP_STYLE}
                    style={{ width: '100%', height: '100%' }}
                  />
                </DeckGL>
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
                  <h6 className="text-primary">Visualization Features</h6>
                  <ul className="list-unstyled small">
                    <li><i className="bi bi-cube text-success me-1"></i><strong>3D Extrusion:</strong> Height represents property value per m²</li>
                    <li><i className="bi bi-palette text-success me-1"></i><strong>Color Coding:</strong> Growth rate visualization</li>
                    <li><i className="bi bi-brightness-high text-success me-1"></i><strong>Lighting:</strong> Realistic shadows and ambient lighting</li>
                    <li><i className="bi bi-cursor text-success me-1"></i><strong>Interactive:</strong> Hover for detailed property information</li>
                    <li><i className="bi bi-arrows-move text-success me-1"></i><strong>Navigation:</strong> Pan, zoom, rotate, and tilt</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="text-info">Controls</h6>
                  <div className="small">
                    <div className="row">
                      <div className="col-6">
                        <strong>Mouse Controls:</strong>
                        <ul className="list-unstyled mt-1">
                          <li>• Left click + drag: Pan</li>
                          <li>• Right click + drag: Rotate</li>
                          <li>• Scroll: Zoom in/out</li>
                          <li>• Ctrl + drag: Tilt</li>
                        </ul>
                      </div>
                      <div className="col-6">
                        <strong>Data Legend:</strong>
                        <ul className="list-unstyled mt-1">
                          <li>🟦 <small>Low growth</small></li>
                          <li>🟩 <small>Moderate growth</small></li>
                          <li>🟨 <small>Average growth</small></li>
                          <li>🟧 <small>High growth</small></li>
                          <li>🟥 <small>Very high growth</small></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-info py-2 mb-0">
                    <small>
                      <i className="bi bi-info-circle me-1"></i>
                      <strong>Data Source:</strong> Vancouver open data showing property values and market growth rates. 
                      Hover over buildings to see detailed information about property values and growth percentages.
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

export default DeckGLPage;