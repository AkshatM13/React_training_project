import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ReactECharts from 'echarts-for-react';

const Mobility = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mobilityData, setMobilityData] = useState({
    incidents: [],
    advisories: [],
    analytics: {},
    markers: []
  });
  const [loading, setLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const mapRef = useRef(null);

  // Check if API key is available  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasApiKey = apiKey && apiKey !== 'YOUR_API_KEY_HERE' && apiKey.length > 10;

  // Map configuration - Standard Google Maps styling
  const mapOptions = {
    zoom: 11,
    center: { lat: 37.7749, lng: -122.4194 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    styles: []
  };

  // Handle map load
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  // Handle map unmount
  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
    setMapLoaded(false);
  }, []);

  // Reset map when component mounts
  useEffect(() => {
    setMapKey(prev => prev + 1);
    setMapLoaded(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
      setMapLoaded(false);
    };
  }, []);

  // Fetch mobility data from JSON file
  useEffect(() => {
    const fetchMobilityData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/data/mobilityData.json');
        const data = await response.json();
        
        setMobilityData({
          incidents: data.incidents,
          advisories: data.advisories,
          analytics: data.analytics,
          markers: data.mapConfig.markers
        });
      } catch (error) {
        console.error('Error fetching mobility data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMobilityData();
  }, []);

  // Get marker icon - red circle for incidents
  const getMarkerIcon = () => {
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: '#dc3545',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: 12
    };
  };

  // Chart configurations matching the screenshot exactly
  const createOverviewChart = () => ({
    title: {
      text: 'Overview',
      textStyle: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mobilityData.analytics.overviewData?.map(item => item.year) || [],
      axisLabel: { 
        color: '#ffffff',
        fontSize: 10,
        rotate: 0
      },
      axisLine: { lineStyle: { color: '#ffffff' } }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 900,
      axisLabel: { color: '#ffffff', fontSize: 10 },
      axisLine: { lineStyle: { color: '#ffffff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [
      {
        type: 'bar',
        data: mobilityData.analytics.overviewData?.map(item => item.value1) || [],
        itemStyle: { color: '#ff7f00' },
        barWidth: '35%'
      },
      {
        type: 'bar', 
        data: mobilityData.analytics.overviewData?.map(item => item.value2) || [],
        itemStyle: { color: '#4a90e2' },
        barWidth: '35%'
      }
    ]
  });

  const createTransitChart = () => ({
    title: {
      text: 'Avg. Weekday Transit Trips in SF',
      textStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mobilityData.analytics.transitTrips?.map(item => item.year) || [],
      axisLabel: { 
        color: '#ffffff',
        fontSize: 9,
        rotate: 0
      },
      axisLine: { lineStyle: { color: '#ffffff' } }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 500,
      axisLabel: { color: '#ffffff', fontSize: 10 },
      axisLine: { lineStyle: { color: '#ffffff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [{
      type: 'bar',
      data: mobilityData.analytics.transitTrips?.map(item => item.value) || [],
      itemStyle: { color: '#2ecc71' },
      barWidth: '60%'
    }]
  });

  const createDailyTrafficChart = () => ({
    title: {
      text: 'Daily Traffic Entering SF',
      textStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mobilityData.analytics.dailyTraffic?.map(item => item.year) || [],
      axisLabel: { 
        color: '#ffffff',
        fontSize: 9,
        rotate: 0
      },
      axisLine: { lineStyle: { color: '#ffffff' } }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 150,
      axisLabel: { color: '#ffffff', fontSize: 10 },
      axisLine: { lineStyle: { color: '#ffffff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [{
      type: 'bar',
      data: mobilityData.analytics.dailyTraffic?.map(item => item.value) || [],
      itemStyle: { color: '#e91e63' },
      barWidth: '60%'
    }]
  });

  const createBikeTripsChart = () => ({
    title: {
      text: 'Avg. Weekday Bike Trips',
      textStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      top: 10,
      left: 10
    },
    subtitle: {
      text: 'Peak Hour Auto Speed (mph)',
      textStyle: { color: '#ffffff', fontSize: 10 },
      top: 25,
      left: 10
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mobilityData.analytics.bikeTrips?.map(item => item.year) || [],
      axisLabel: { 
        color: '#ffffff',
        fontSize: 9
      },
      axisLine: { lineStyle: { color: '#ffffff' } }
    },
    yAxis: {
      type: 'value',
      min: 10,
      max: 20,
      axisLabel: { color: '#ffffff', fontSize: 10 },
      axisLine: { lineStyle: { color: '#ffffff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [{
      type: 'line',
      data: mobilityData.analytics.bikeTrips?.map(item => item.value) || [],
      lineStyle: { color: '#00bcd4', width: 3 },
      itemStyle: { color: '#00bcd4' },
      symbol: 'circle',
      symbolSize: 6
    }]
  });

  return (
    <div className="mobility-page" style={{ 
      height: '100vh', 
      backgroundColor: '#2c5282',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Main Content - Split Layout */}
      <div className="d-flex h-100">
        
        {/* Left Half - Map Section */}
        <div className="map-section" style={{ 
          width: '50%',
          position: 'relative',
          backgroundColor: '#fff'
        }}>
          {/* Top left indicator */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            58%
          </div>

          {hasApiKey ? (
            <LoadScript 
              key={mapKey}
              googleMapsApiKey={apiKey}
              onLoad={() => console.log('LoadScript loaded')}
              onError={(error) => console.error('LoadScript error:', error)}
            >
              <GoogleMap
                key={`map-${mapKey}`}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapOptions.center}
                zoom={mapOptions.zoom}
                options={mapOptions}
                onLoad={onMapLoad}
                onUnmount={onMapUnmount}
              >
                {mapLoaded && mobilityData.markers.map(marker => (
                  <Marker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.title}
                    icon={getMarkerIcon()}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light">
              <div className="text-center">
                <i className="bi bi-exclamation-triangle text-warning mb-2" style={{ fontSize: '3rem' }}></i>
                <h5>Google Maps API Key Required</h5>
                <p className="text-muted">Please add your Google Maps API key to the .env file</p>
              </div>
            </div>
          )}

          {/* Bottom Tabs and Observation Panel */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#2c5282',
            color: 'white'
          }}>
            {/* Tabs */}
            <div className="d-flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <button className="btn text-white flex-fill" style={{ 
                backgroundColor: '#2c5282',
                border: 'none',
                borderBottom: '2px solid #ffc107',
                borderRadius: 0,
                padding: '10px'
              }}>
                Incidents
              </button>
              <button className="btn text-white-50 flex-fill" style={{ 
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 0,
                padding: '10px'
              }}>
                Analytics
              </button>
              <button className="btn text-white-50 flex-fill" style={{ 
                backgroundColor: 'transparent',
                border: 'none', 
                borderRadius: 0,
                padding: '10px'
              }}>
                Advisory
              </button>
            </div>

            {/* Observation Panel Content */}
            <div style={{ padding: '15px', maxHeight: '200px', overflowY: 'auto' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-white mb-0">Observation</h6>
                <h6 className="text-white mb-0">Action</h6>
              </div>
              
              {loading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div>
                  {mobilityData.incidents.map((incident) => (
                    <div key={incident.id} className="d-flex justify-content-between align-items-start mb-3 pb-2" style={{
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ flex: 1, marginRight: '15px' }}>
                        <p className="text-white small mb-0" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                          {incident.title}
                        </p>
                      </div>
                      <button className="btn btn-warning btn-sm" style={{ 
                        minWidth: '40px',
                        fontSize: '10px',
                        padding: '2px 8px'
                      }}>
                        ACT
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Half - Overview Charts */}
        <div className="overview-section" style={{ 
          width: '50%',
          backgroundColor: '#2c5282',
          padding: '15px',
          overflowY: 'auto'
        }}>
          
          {/* Charts - Vertical Stack (4 charts one below another) */}
          <div className="charts-container">
            {/* Chart 1 - Overview */}
            <div className="mb-3">
              <div style={{ height: '200px' }}>
                <ReactECharts 
                  option={createOverviewChart()} 
                  style={{ height: '100%', width: '100%' }} 
                />
              </div>
            </div>
            
            {/* Chart 2 - Transit Trips */}
            <div className="mb-3">
              <div style={{ height: '200px' }}>
                <ReactECharts 
                  option={createTransitChart()} 
                  style={{ height: '100%', width: '100%' }} 
                />
              </div>
            </div>
            
            {/* Chart 3 - Daily Traffic */}
            <div className="mb-3">
              <div style={{ height: '200px' }}>
                <ReactECharts 
                  option={createDailyTrafficChart()} 
                  style={{ height: '100%', width: '100%' }} 
                />
              </div>
            </div>
            
            {/* Chart 4 - Bike Trips */}
            <div className="mb-3">
              <div style={{ height: '200px' }}>
                <ReactECharts 
                  option={createBikeTripsChart()} 
                  style={{ height: '100%', width: '100%' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobility;
