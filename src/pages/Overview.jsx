import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const Overview = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Mock data matching the smart city dashboard design
        const mockData = {
          indices: {
            liveability: { value: 80.76, rank: 15, change: 'up' },
            economic: { value: 77, lastYear: 72, change: 'up' },
            mobility: { value: 66, lastYear: 68, change: 'down' },
            environment: { value: 64, lastYear: 62, change: 'up' }
          },
          environment: {
            airQuality: [
              { name: 'CO2 Gas Data', value: 54, color: '#28a745' },
              { name: 'PM2.5', value: 129, color: '#fd7e14' },
              { name: 'NO2', value: 87, color: '#ffc107' },
              { name: 'PM10', value: 261, color: '#dc3545' },
              { name: 'O3', value: 98, color: '#ffc107' },
              { name: 'SO2', value: 132, color: '#fd7e14' }
            ],
            greenSpace: 14
          },
          sewage: {
            efficiency: [
              { name: 'Golden Gate Park', value: 81 },
              { name: 'Bernal Heights', value: 76 },
              { name: 'Fremont', value: 83 },
              { name: 'Noe Valley', value: 95 },
              { name: 'Lombard Street', value: 88 }
            ],
            avgEfficiency: 5,
            input: 84,
            output: 62
          },
          solidWaste: {
            processing: [
              { name: 'Category 1', value: 19, color: '#17a2b8' },
              { name: 'Category 2', value: 41, color: '#e83e8c' },
              { name: 'Category 3', value: 7, color: '#fd7e14' },
              { name: 'Category 4', value: 16, color: '#28a745' },
              { name: 'Category 5', value: 13, color: '#6f42c1' }
            ],
            activeVehicles: 231,
            totalVehicles: 240,
            wasteReclamation: 81
          },
          water: {
            efficiency: [
              { name: 'Golden Gate Park', value: 68 },
              { name: 'Bernal Heights', value: 83 },
              { name: 'Fremont', value: 88 },
              { name: 'Noe Valley', value: 85 },
              { name: 'Lombard Street', value: 72 }
            ],
            qualityIndex: 91,
            demand: 211,
            supply: 194
          },
          streetLight: {
            coverage: 78,
            on: 1200,
            off: 126,
            avgPowerConsumption: 8864
          },
          buildingManagement: {
            sustainabilityIndex: 86,
            avgWaterConsumption: 5283,
            avgPowerConsumption: 29
          },
          surveillance: {
            functional: 34000,
            faulty: 4000,
            noFeed: 2000,
            incidentsDetected: 814000,
            cameraCoverage: 73
          },
          parking: {
            occupancy: 86,
            avgRevenue: 4.86
          },
          urbanMobility: {
            fastCharging: 1031,
            rapidCharging: { active: 52, inactive: 12 },
            publicTransportAdoption: 23,
            avgCongestion: 65
          },
          power: {
            renewable: 30,
            nonRenewable: 44,
            activeBackouts: 17,
            scheduledBackouts: 4
          }
        };

        setDashboardData(mockData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Chart configurations
  const createRadarChart = (data, title) => ({
    title: {
      text: title,
      textStyle: { color: '#fff', fontSize: 12 },
      top: 10,
      left: 'center'
    },
    radar: {
      indicator: data.map(item => ({ name: item.name, max: 100 })),
      radius: '60%',
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      splitArea: { show: false },
      axisLabel: { color: '#fff', fontSize: 10 }
    },
    series: [{
      type: 'radar',
      data: [{
        value: data.map(item => item.value),
        areaStyle: { color: 'rgba(0, 255, 255, 0.3)' },
        lineStyle: { color: '#00ffff', width: 2 },
        itemStyle: { color: '#00ffff' }
      }]
    }]
  });

  const createPieChart = (data, title, colors) => ({
    title: {
      text: title,
      textStyle: { color: '#fff', fontSize: 12 },
      top: 10,
      left: 'center'
    },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      data: data.map((item, index) => ({
        value: item.value,
        name: item.name || `${item.value}%`,
        itemStyle: { color: colors[index] || item.color }
      })),
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }}
    }]
  });

  const createGaugeChart = (value, title, color = '#00ffff') => ({
    title: {
      text: title,
      textStyle: { color: '#fff', fontSize: 12 },
      top: 10,
      left: 'center'
    },
    series: [{
      type: 'gauge',
      radius: '80%',
      center: ['50%', '60%'],
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      axisLine: {
        lineStyle: {
          width: 15,
          color: [[1, 'rgba(255, 255, 255, 0.2)']]
        }
      },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
      pointer: { show: false },
      detail: {
        formatter: '{value}%',
        fontSize: 20,
        color: '#fff',
        offsetCenter: [0, '0%']
      },
      data: [{ value: value }],
      progress: {
        show: true,
        width: 15,
        itemStyle: { color: color }
      }
    }]
  });

  if (loading) {
    return (
      <div className="container-fluid py-4" style={{ backgroundColor: '#1e3a5f', minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-white">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-page" style={{ 
      backgroundColor: '#1e3a5f', 
      minHeight: '100vh',
      color: '#fff',
      padding: '20px'
    }}>
      
      {/* Top Index Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0" style={{ backgroundColor: '#2c5282', color: '#fff' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-heart-fill text-danger me-2"></i>
                <h6 className="mb-0">Liveability Index</h6>
                <span className="badge bg-success ms-auto">
                  <i className="bi bi-arrow-up"></i>
                </span>
              </div>
              <h2 className="mb-1">{dashboardData.indices?.liveability?.value}</h2>
              <div className="d-flex justify-content-between">
                <small>Rank</small>
                <small className="text-danger">{dashboardData.indices?.liveability?.rank}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0" style={{ backgroundColor: '#2c5282', color: '#fff' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-currency-dollar text-warning me-2"></i>
                <h6 className="mb-0">Economic Index</h6>
                <span className="badge bg-success ms-auto">
                  <i className="bi bi-arrow-up"></i>
                </span>
              </div>
              <h2 className="mb-1">{dashboardData.indices?.economic?.value}</h2>
              <div className="d-flex justify-content-between">
                <small>Last Year</small>
                <small className="text-success">{dashboardData.indices?.economic?.lastYear}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0" style={{ backgroundColor: '#2c5282', color: '#fff' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-diagram-3 text-info me-2"></i>
                <h6 className="mb-0">Mobility Index</h6>
                <span className="badge bg-danger ms-auto">
                  <i className="bi bi-arrow-down"></i>
                </span>
              </div>
              <h2 className="mb-1">{dashboardData.indices?.mobility?.value}</h2>
              <div className="d-flex justify-content-between">
                <small>Last Year</small>
                <small className="text-danger">{dashboardData.indices?.mobility?.lastYear}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0" style={{ backgroundColor: '#2c5282', color: '#fff' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-tree text-success me-2"></i>
                <h6 className="mb-0">Environment Index</h6>
                <span className="badge bg-success ms-auto">
                  <i className="bi bi-arrow-up"></i>
                </span>
              </div>
              <h2 className="mb-1">{dashboardData.indices?.environment?.value}</h2>
              <div className="d-flex justify-content-between">
                <small>Last Year</small>
                <small className="text-success">{dashboardData.indices?.environment?.lastYear}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="row">
        {/* Environment */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-tree me-2"></i>
                Environment
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-1 mb-3">
                {dashboardData.environment?.airQuality?.map((item, index) => (
                  <div key={index} className="col-4">
                    <div className="text-center p-2 rounded" style={{ backgroundColor: item.color }}>
                      <div className="text-white fw-bold">{item.value}</div>
                      <small className="text-white" style={{ fontSize: '10px' }}>
                        {item.name.split(' ')[0]}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h6 className="text-white">Air Quality Index</h6>
                <div className="text-info">Green Space <strong>{dashboardData.environment?.greenSpace}%</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sewage */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-droplet me-2"></i>
                Sewage
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '200px' }}>
                <ReactECharts 
                  option={createRadarChart(dashboardData.sewage?.efficiency || [], 'Plant Efficiency')} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white">Avg Effluent Quality</small>
                  <small className="text-info">{dashboardData.sewage?.avgEfficiency} mg/L</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-white">Input <span className="text-info">{dashboardData.sewage?.input} Mg/L</span></small>
                  <small className="text-white">Output <span className="text-info">{dashboardData.sewage?.output} Mg/day</span></small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solid Waste Management */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-trash me-2"></i>
                Solid Waste Management
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '150px' }}>
                <ReactECharts 
                  option={createPieChart(
                    dashboardData.solidWaste?.processing || [], 
                    'Waste Processing',
                    ['#17a2b8', '#e83e8c', '#fd7e14', '#28a745', '#6f42c1']
                  )} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white">Active Vehicles</small>
                  <small className="text-info">{dashboardData.solidWaste?.activeVehicles}/{dashboardData.solidWaste?.totalVehicles}</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-white">Waste Reclamation</small>
                  <small className="text-info">{dashboardData.solidWaste?.wasteReclamation}%</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Water */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-droplet-fill me-2"></i>
                Water
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '200px' }}>
                <ReactECharts 
                  option={createRadarChart(dashboardData.water?.efficiency || [], 'Plant Efficiency')} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white">Water Quality Index</small>
                  <small className="text-info">{dashboardData.water?.qualityIndex}/100</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-white">Demand <span className="text-info">{dashboardData.water?.demand} Mgl/day</span></small>
                  <small className="text-white">Supply <span className="text-info">{dashboardData.water?.supply} Mgl/day</span></small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Street Light */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Street Light
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '150px' }}>
                <ReactECharts 
                  option={createGaugeChart(dashboardData.streetLight?.coverage || 0, 'Street Light Coverage', '#ffc107')} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-success">{dashboardData.streetLight?.on} On</small>
                  <small className="text-danger">{dashboardData.streetLight?.off} Off</small>
                </div>
                <div className="text-center">
                  <small className="text-white">Avg Power Consumed</small>
                  <div className="text-info fw-bold">{dashboardData.streetLight?.avgPowerConsumption}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Building Management */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-building me-2"></i>
                Building Management
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '120px' }}>
                <ReactECharts 
                  option={createGaugeChart(dashboardData.buildingManagement?.sustainabilityIndex || 0, 'Sustainability Index', '#28a745')} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="mt-2">
                <div className="text-center mb-2">
                  <small className="text-white">Avg Water Consumption</small>
                  <div className="text-info fw-bold">{dashboardData.buildingManagement?.avgWaterConsumption} gl/month</div>
                </div>
                <div className="text-center">
                  <small className="text-white">Avg Power Consumption</small>
                  <div className="text-info fw-bold">{dashboardData.buildingManagement?.avgPowerConsumption} MWhr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row mt-3">
        {/* Surveillance */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-camera me-2"></i>
                Surveillance
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-around mb-3">
                <div className="text-center">
                  <div className="badge bg-success">{(dashboardData.surveillance?.functional / 1000).toFixed(0)}K</div>
                  <small className="d-block text-white">Functional</small>
                </div>
                <div className="text-center">
                  <div className="badge bg-danger">{(dashboardData.surveillance?.faulty / 1000).toFixed(0)}K</div>
                  <small className="d-block text-white">Faulty</small>
                </div>
                <div className="text-center">
                  <div className="badge bg-warning">{(dashboardData.surveillance?.noFeed / 1000).toFixed(0)}K</div>
                  <small className="d-block text-white">No Feed</small>
                </div>
              </div>
              <div className="text-center mb-2">
                <div className="text-info fw-bold">{(dashboardData.surveillance?.incidentsDetected / 1000).toFixed(0)}K</div>
                <small className="text-white">Incidents Detected Prev.Month</small>
              </div>
              <div className="text-center">
                <small className="text-white">Camera Coverage</small>
                <div className="text-info fw-bold">{dashboardData.surveillance?.cameraCoverage}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Parking */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-car-front me-2"></i>
                Parking
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '150px' }}>
                <ReactECharts 
                  option={createGaugeChart(dashboardData.parking?.occupancy || 0, 'Parking Occupancy', '#6f42c1')} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="text-center mt-2">
                <small className="text-white">Avg Revenue Generated/Month</small>
                <div className="text-info fw-bold">${dashboardData.parking?.avgRevenue}M</div>
              </div>
            </div>
          </div>
        </div>

        {/* Urban Mobility */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-bus-front me-2"></i>
                Urban Mobility
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white">Fast Charging</small>
                  <div className="progress flex-grow-1 ms-2" style={{ height: '15px' }}>
                    <div className="progress-bar bg-success" style={{ width: '90%' }}></div>
                  </div>
                  <small className="text-white ms-2">{dashboardData.urbanMobility?.fastCharging}</small>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white">Rapid Charging</small>
                  <div className="d-flex">
                    <span className="badge bg-success me-1">{dashboardData.urbanMobility?.rapidCharging?.active}</span>
                    <span className="badge bg-danger">{dashboardData.urbanMobility?.rapidCharging?.inactive}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-center">
                  <small className="text-white d-block">Public Transportation Adoption</small>
                  <div className="text-info fw-bold">{dashboardData.urbanMobility?.publicTransportAdoption}%</div>
                </div>
                <div className="col-6 text-center">
                  <small className="text-white d-block">Avg Congestion</small>
                  <div className="text-info fw-bold">{dashboardData.urbanMobility?.avgCongestion}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Power */}
        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card border-0 h-100" style={{ backgroundColor: '#2c5282' }}>
            <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
              <h6 className="text-white mb-0">
                <i className="bi bi-lightning me-2"></i>
                Power
              </h6>
            </div>
            <div className="card-body">
              <div style={{ height: '120px' }}>
                <ReactECharts 
                  option={createPieChart([
                    { value: dashboardData.power?.renewable, name: 'Renewable' },
                    { value: dashboardData.power?.nonRenewable, name: 'Non-Renewable' }
                  ], 'Energy Resource', ['#28a745', '#dc3545'])} 
                  style={{ height: '100%' }} 
                />
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-success">Renewable</small>
                  <small className="text-success">{dashboardData.power?.renewable}%</small>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-danger">Non-Renewable</small>
                  <small className="text-danger">{dashboardData.power?.nonRenewable}%</small>
                </div>
                <div className="row">
                  <div className="col-6 text-center">
                    <div className="text-danger fw-bold">{dashboardData.power?.activeBackouts}</div>
                    <small className="text-white" style={{ fontSize: '10px' }}>Active Blackouts Prev.Month</small>
                  </div>
                  <div className="col-6 text-center">
                    <div className="text-success fw-bold">{dashboardData.power?.scheduledBackouts}</div>
                    <small className="text-white" style={{ fontSize: '10px' }}>Go to Settings Brownouts Prev.Month</small>
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

export default Overview;
