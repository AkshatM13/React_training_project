import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const Echarts = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Add page state

  // Fetch chart data from JSON files
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        console.log('Starting to fetch chart data...');
        
        // Fetch basic charts first
        const [lineData, barData, pieData, doughnutData, gaugeData, heatmapData] = await Promise.all([
          fetch('/data/lineChartData.json').then(res => res.json()),
          fetch('/data/barChartData.json').then(res => res.json()),
          fetch('/data/pieChartData.json').then(res => res.json()),
          fetch('/data/doughnutChartData.json').then(res => res.json()),
          fetch('/data/gaugeChartData.json').then(res => res.json()),
          fetch('/data/heatmapChartData.json').then(res => res.json())
        ]);

        console.log('Basic chart data loaded:', { lineData, barData, pieData, doughnutData, gaugeData, heatmapData });

        // Fetch advanced charts with error handling
        let areaData = {}, scatterData = {}, radarData = {}, funnelData = {}, treemapData = {}, sunburstData = {};
        
        try {
          areaData = await fetch('/data/areaChartData.json').then(res => res.json());
          console.log('Area data loaded:', areaData);
        } catch (e) { console.warn('Area chart data not found'); }
        
        try {
          scatterData = await fetch('/data/scatterChartData.json').then(res => res.json());
          console.log('Scatter data loaded:', scatterData);
        } catch (e) { console.warn('Scatter chart data not found'); }
        
        try {
          radarData = await fetch('/data/radarChartData.json').then(res => res.json());
          console.log('Radar data loaded:', radarData);
        } catch (e) { console.warn('Radar chart data not found'); }
        
        try {
          funnelData = await fetch('/data/funnelChartData.json').then(res => res.json());
          console.log('Funnel data loaded:', funnelData);
        } catch (e) { console.warn('Funnel chart data not found'); }
        
        try {
          treemapData = await fetch('/data/treemapChartData.json').then(res => res.json());
          console.log('Treemap data loaded:', treemapData);
        } catch (e) { console.warn('Treemap chart data not found'); }
        
        try {
          sunburstData = await fetch('/data/sunburstChartData.json').then(res => res.json());
          console.log('Sunburst data loaded:', sunburstData);
        } catch (e) { console.warn('Sunburst chart data not found'); }

        const finalData = {
          line: lineData,
          bar: barData,
          pie: pieData,
          doughnut: doughnutData,
          gauge: gaugeData,
          heatmap: heatmapData,
          area: areaData,
          scatter: scatterData,
          radar: radarData,
          funnel: funnelData,
          treemap: treemapData,
          sunburst: sunburstData
        };

        console.log('Final chart data to be set:', finalData);
        
        setChartData(finalData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  // Generate chart options based on fetched data
  const getChartOption = (chartType) => {
    const data = chartData[chartType];
    if (!data || Object.keys(data).length === 0) {
      console.log(`No data for chart type: ${chartType}`, data);
      return {};
    }

    console.log(`Generating options for ${chartType}:`, data);

    switch (chartType) {
      case 'line':
        return {
          tooltip: { trigger: 'axis' },
          legend: { bottom: 5, textStyle: { fontSize: 7 } },
          grid: { top: 20, left: 40, right: 20, bottom: 35 },
          xAxis: { type: 'category', data: chartData.line.months || [], axisLabel: { fontSize: 7, margin: 8 } },
          yAxis: { type: 'value', axisLabel: { fontSize: 7, margin: 8 } },
          series: chartData.line.series?.map(series => ({
            name: series.name, type: 'line', data: series.data, smooth: true, itemStyle: { color: series.color }
          })) || []
        };

      case 'bar':
        return {
          tooltip: { trigger: 'axis' },
          legend: { bottom: 5, textStyle: { fontSize: 7 } },
          grid: { top: 20, left: 40, right: 20, bottom: 35 },
          xAxis: { type: 'category', data: chartData.bar.categories || [], axisLabel: { fontSize: 7, margin: 8 } },
          yAxis: { type: 'value', axisLabel: { fontSize: 7, margin: 8 } },
          series: chartData.bar.series?.map(series => ({
            name: series.name, type: 'bar', data: series.data, itemStyle: { color: series.color }
          })) || []
        };

      case 'pie':
        return {
          tooltip: { trigger: 'item' },
          legend: { bottom: 0, textStyle: { fontSize: 8 } },
          series: [{
            type: 'pie', radius: '55%', center: ['50%', '40%'], 
            data: chartData.pie.data || [],
            label: { fontSize: 8 }
          }]
        };

      case 'doughnut':
        return {
          tooltip: { trigger: 'item' },
          legend: { bottom: 0, textStyle: { fontSize: 8 } },
          series: [{
            type: 'pie', radius: ['25%', '55%'], center: ['50%', '40%'], 
            data: chartData.doughnut.data || [],
            label: { fontSize: 8 }
          }]
        };

      case 'gauge':
        const metric = chartData.gauge.metrics?.[0];
        return {
          series: [{
            type: 'gauge', radius: '65%', center: ['50%', '50%'],
            axisLine: { lineStyle: { width: 5, color: [[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']] } },
            axisLabel: { fontSize: 7, distance: 20 },
            axisTick: { distance: -15, length: 5 },
            splitLine: { distance: -15, length: 15 },
            detail: { fontSize: 12, offsetCenter: [0, '65%'] },
            data: [{ value: metric?.value || 75, name: metric?.name || 'Score' }]
          }]
        };

      case 'heatmap':
        return {
          tooltip: { position: 'top' },
          grid: { top: 15, left: 25, right: 15, bottom: 35 },
          xAxis: { 
            type: 'category', 
            data: chartData.heatmap.xAxisData || [], 
            axisLabel: { fontSize: 7 },
            splitArea: { show: true }
          },
          yAxis: { 
            type: 'category', 
            data: chartData.heatmap.yAxisData || [], 
            axisLabel: { fontSize: 7 },
            splitArea: { show: true }
          },
          visualMap: { 
            min: chartData.heatmap.min || 0, 
            max: chartData.heatmap.max || 10, 
            left: 'center', 
            bottom: 5, 
            orient: 'horizontal',
            textStyle: { fontSize: 7 },
            itemWidth: 10,
            itemHeight: 8
          },
          series: [{ 
            type: 'heatmap', 
            data: chartData.heatmap.data || [], 
            label: { show: true, fontSize: 7 } 
          }]
        };

      case 'area':
        return {
          tooltip: { trigger: 'axis' },
          legend: { bottom: 5, textStyle: { fontSize: 7 } },
          grid: { top: 20, left: 40, right: 20, bottom: 35 },
          xAxis: { type: 'category', data: chartData.area?.months || [], axisLabel: { fontSize: 7, margin: 8 } },
          yAxis: { type: 'value', axisLabel: { fontSize: 7, margin: 8 } },
          series: chartData.area?.series?.map(series => ({
            name: series.name, type: 'line', data: series.data, smooth: true, 
            areaStyle: {}, itemStyle: { color: series.color }
          })) || []
        };

      case 'scatter':
        return {
          tooltip: { 
            trigger: 'item',
            formatter: function (params) {
              return `X: ${params.value[0]}<br/>Y: ${params.value[1]}`;
            }
          },
          grid: { top: 20, left: 40, right: 20, bottom: 35 },
          xAxis: { 
            type: 'value', 
            name: 'Performance',
            axisLabel: { fontSize: 7 },
            nameTextStyle: { fontSize: 8 }
          },
          yAxis: { 
            type: 'value', 
            name: 'Cost',
            axisLabel: { fontSize: 7 },
            nameTextStyle: { fontSize: 8 }
          },
          series: [{
            type: 'scatter',
            data: chartData.scatter?.data || [],
            symbolSize: 6,
            itemStyle: { color: '#5470c6' }
          }]
        };

      case 'radar':
        return {
          tooltip: { trigger: 'item' },
          legend: { 
            bottom: 5, 
            textStyle: { fontSize: 7 },
            data: chartData.radar?.data?.map(item => item.name) || []
          },
          radar: {
            indicator: chartData.radar?.indicators || [],
            radius: '55%',
            center: ['50%', '45%']
          },
          series: [{
            type: 'radar',
            data: chartData.radar?.data || [],
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.3 }
          }]
        };

      case 'funnel':
        return {
          tooltip: { 
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: { 
            bottom: 5, 
            textStyle: { fontSize: 7 },
            data: chartData.funnel?.data?.map(item => item.name) || []
          },
          series: [{
            type: 'funnel',
            data: chartData.funnel?.data || [],
            width: '70%',
            height: '55%',
            left: '15%',
            top: '20%',
            label: { fontSize: 7 },
            itemStyle: { borderWidth: 1, borderColor: '#fff' }
          }]
        };

      case 'treemap':
        return {
          tooltip: { 
            trigger: 'item',
            formatter: '{b}: {c}'
          },
          series: [{
            type: 'treemap',
            data: chartData.treemap?.data || [],
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            width: '90%',
            height: '80%',
            top: '10%',
            left: '5%',
            label: { 
              show: true, 
              fontSize: 8,
              color: '#fff'
            },
            itemStyle: { 
              borderWidth: 2, 
              borderColor: '#fff'
            }
          }]
        };

      case 'sunburst':
        return {
          tooltip: { 
            trigger: 'item',
            formatter: '{b}: {c}'
          },
          series: [{
            type: 'sunburst',
            data: chartData.sunburst?.data || [],
            radius: [20, '70%'],
            center: ['50%', '50%'],
            itemStyle: { 
              borderRadius: 2, 
              borderWidth: 1,
              borderColor: '#fff'
            },
            label: { 
              fontSize: 7,
              minAngle: 10
            }
          }]
        };

      default: return {};
    }
  };

  // Define different chart sets for each page
  const chartPages = {
    1: [
      { key: 'line', label: 'Line Chart', icon: 'bi-graph-up' },
      { key: 'bar', label: 'Bar Chart', icon: 'bi-bar-chart' },
      { key: 'pie', label: 'Pie Chart', icon: 'bi-pie-chart' },
      { key: 'doughnut', label: 'Doughnut Chart', icon: 'bi-circle' },
      { key: 'gauge', label: 'Gauge Chart', icon: 'bi-speedometer2' },
      { key: 'heatmap', label: 'Heatmap Chart', icon: 'bi-grid-3x3' }
    ],
    2: [
      { key: 'area', label: 'Area Chart', icon: 'bi-graph-up-arrow' },
      { key: 'scatter', label: 'Scatter Plot', icon: 'bi-dot' },
      { key: 'radar', label: 'Radar Chart', icon: 'bi-pentagon' },
      { key: 'funnel', label: 'Funnel Chart', icon: 'bi-funnel' },
      { key: 'treemap', label: 'Treemap', icon: 'bi-grid' },
      { key: 'sunburst', label: 'Sunburst', icon: 'bi-sun' }
    ]
  };

  const chartButtons = chartPages[currentPage] || [];

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading chart data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-2">
      <div className="container">
        {/* Page Navigation */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="text-center">
              <h4 className="mb-2">
                <i className="bi bi-graph-up me-2"></i>
                Apache ECharts Dashboard - Page {currentPage}
              </h4>
              
              {/* Page Navigation Buttons */}
              <div className="btn-group mb-2" role="group">
                <button 
                  type="button" 
                  className={`btn ${currentPage === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCurrentPage(1)}
                >
                  <i className="bi bi-1-circle me-1"></i>
                  Basic Charts
                </button>
                <button 
                  type="button" 
                  className={`btn ${currentPage === 2 ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCurrentPage(2)}
                >
                  <i className="bi bi-2-circle me-1"></i>
                  Advanced Charts
                </button>
              </div>
              
              <div>
                <small className="text-muted">
                  {currentPage === 1 ? 'Basic chart types for data visualization' : 'Advanced chart types for complex analysis'}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="row">
          {chartButtons.map((chart, index) => {
            const chartOption = getChartOption(chart.key);
            const hasValidData = chartOption && Object.keys(chartOption).length > 0;
            
            return (
              <div key={chart.key} className="col-lg-4 col-md-6 mb-2">
                <div className="card h-100">
                  <div className="card-header py-1">
                    <small className="fw-bold text-primary">
                      <i className={`${chart.icon} me-1`}></i>
                      {chart.label}
                    </small>
                  </div>
                  <div className="card-body p-1">
                    {hasValidData ? (
                      <ReactECharts
                        option={chartOption}
                        style={{ height: '200px', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        <div className="text-center">
                          <i className="bi bi-exclamation-triangle text-warning mb-2" style={{ fontSize: '24px' }}></i>
                          <div className="text-muted small">
                            Chart data loading...
                            <br />
                            <small>({chart.key})</small>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Page Info */}
        <div className="row mt-2">
          <div className="col-12 text-center">
            <small className="text-muted">
              Showing {chartButtons.length} charts | Page {currentPage} of {Object.keys(chartPages).length}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Echarts;