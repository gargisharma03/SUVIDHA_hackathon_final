import React, { useState, useEffect } from 'react';

/**
 * SUVIDHA ADMIN PANEL - ANALYTICS & REPORTS
 * 
 * Purpose: Display visual analytics, charts, and statistics for complaints
 * 
 * Features:
 * - Daily complaint trends
 * - Department-wise breakdown (pie chart visualization)
 * - Status distribution
 * - Resolution time statistics
 * - Performance metrics
 * - Accessible, color-coded charts
 * - Export functionality (simulated)
 * - Date range filtering
 */

function Analytics() {
  // ==================== STATE MANAGEMENT ====================
  
  const [adminData, setAdminData] = useState(null);
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('complaints');

  // ==================== DUMMY DATA ====================
  
  /**
   * Analytics data for different time periods
   */
  const analyticsData = {
    // Daily complaints for last 7 days
    dailyComplaints: [
      { date: '2026-02-02', count: 8, resolved: 5, pending: 3 },
      { date: '2026-02-03', count: 12, resolved: 7, pending: 5 },
      { date: '2026-02-04', count: 10, resolved: 8, pending: 2 },
      { date: '2026-02-05', count: 15, resolved: 10, pending: 5 },
      { date: '2026-02-06', count: 9, resolved: 6, pending: 3 },
      { date: '2026-02-07', count: 14, resolved: 9, pending: 5 },
      { date: '2026-02-08', count: 18, resolved: 11, pending: 7 }
    ],

    // Department-wise distribution
    departmentStats: [
      { department: 'Electricity', total: 28, pending: 8, inProgress: 6, resolved: 14, percentage: 35 },
      { department: 'Water', total: 22, pending: 6, inProgress: 5, resolved: 11, percentage: 27.5 },
      { department: 'Gas', total: 16, pending: 4, inProgress: 3, resolved: 9, percentage: 20 },
      { department: 'Municipal', total: 14, pending: 3, inProgress: 2, resolved: 9, percentage: 17.5 }
    ],

    // Status distribution
    statusStats: {
      pending: 21,
      underReview: 8,
      teamAssigned: 5,
      inProgress: 16,
      resolved: 43,
      rejected: 7
    },

    // Resolution time statistics (in hours)
    resolutionTime: {
      average: 36,
      fastest: 4,
      slowest: 120,
      under24h: 32,
      under48h: 58,
      over48h: 10
    },

    // Peak hours
    peakHours: [
      { hour: '09:00 AM', count: 12 },
      { hour: '10:00 AM', count: 18 },
      { hour: '11:00 AM', count: 15 },
      { hour: '12:00 PM', count: 22 },
      { hour: '01:00 PM', count: 8 },
      { hour: '02:00 PM', count: 14 },
      { hour: '03:00 PM', count: 10 }
    ],

    // Top issues
    topIssues: [
      { issue: 'Power Outage', count: 24 },
      { issue: 'No Water Supply', count: 18 },
      { issue: 'Bill Dispute', count: 12 },
      { issue: 'New Connection', count: 10 },
      { issue: 'Gas Cylinder Delay', count: 8 }
    ]
  };

  // ==================== LIFECYCLE ====================
  
  useEffect(() => {
    const storedAdmin = localStorage.getItem('suvidhaAdmin');
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    }
  }, []);

  // ==================== CALCULATIONS ====================
  
  const getTotalComplaints = () => {
    return analyticsData.departmentStats.reduce((sum, dept) => sum + dept.total, 0);
  };

  const getResolutionRate = () => {
    const total = getTotalComplaints();
    const resolved = analyticsData.statusStats.resolved;
    return ((resolved / total) * 100).toFixed(1);
  };

  const getAveragePerDay = () => {
    const total = analyticsData.dailyComplaints.reduce((sum, day) => sum + day.count, 0);
    return (total / analyticsData.dailyComplaints.length).toFixed(1);
  };

  // ==================== HANDLERS ====================
  
  const handleExportReport = () => {
    alert(
      '📊 Export Report\n\n' +
      'Generating PDF report...\n\n' +
      '✓ Report includes:\n' +
      '- Daily trends\n' +
      '- Department statistics\n' +
      '- Status distribution\n' +
      '- Resolution metrics\n\n' +
      '(In production, this will download a PDF file)'
    );
  };

  const handleBackToDashboard = () => {
    alert('🏠 Returning to Dashboard...');
    // In real app: history.push('/admin/dashboard');
  };

  // ==================== STYLING ====================
  
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

    // Header
    header: {
      backgroundColor: '#1e3a8a',
      color: '#ffffff',
      padding: '25px 40px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },

    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },

    logo: {
      fontSize: '48px'
    },

    headerTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },

    headerSubtitle: {
      fontSize: '18px',
      opacity: 0.9
    },

    headerButtons: {
      display: 'flex',
      gap: '15px'
    },

    headerButton: {
      padding: '12px 25px',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    backButton: {
      backgroundColor: '#ffffff',
      color: '#1e3a8a'
    },

    exportButton: {
      backgroundColor: '#22c55e',
      color: '#ffffff'
    },

    // Content
    content: {
      padding: '40px',
      maxWidth: '1600px',
      margin: '0 auto'
    },

    pageTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '10px'
    },

    pageSubtitle: {
      fontSize: '20px',
      color: '#64748b',
      marginBottom: '30px'
    },

    // Filters
    filterBar: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },

    filterLabel: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#475569'
    },

    filterButton: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    filterButtonActive: {
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
      color: '#ffffff'
    },

    filterButtonInactive: {
      backgroundColor: '#ffffff',
      borderColor: '#cbd5e1',
      color: '#64748b'
    },

    // Key metrics grid
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },

    metricCard: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      borderTop: '4px solid'
    },

    metricIcon: {
      fontSize: '48px',
      marginBottom: '15px'
    },

    metricLabel: {
      fontSize: '16px',
      color: '#64748b',
      fontWeight: '600',
      marginBottom: '10px'
    },

    metricValue: {
      fontSize: '40px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },

    metricSubtext: {
      fontSize: '14px',
      color: '#64748b'
    },

    // Charts section
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '30px',
      marginBottom: '40px'
    },

    chartCard: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },

    chartTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    // Bar chart
    barChart: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },

    barItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },

    barLabel: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#475569',
      minWidth: '120px'
    },

    barContainer: {
      flex: 1,
      height: '40px',
      backgroundColor: '#f1f5f9',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    },

    barFill: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '12px',
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '16px',
      borderRadius: '8px',
      transition: 'width 0.5s ease'
    },

    // Pie chart (visual representation)
    pieChart: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    },

    pieItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      borderLeft: '4px solid'
    },

    pieIcon: {
      fontSize: '32px'
    },

    pieInfo: {
      flex: 1
    },

    pieName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '4px'
    },

    pieValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e3a8a'
    },

    piePercent: {
      fontSize: '14px',
      color: '#64748b',
      marginLeft: '6px'
    },

    // Timeline/Daily chart
    timelineChart: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      height: '250px',
      padding: '20px 0'
    },

    timelineBar: {
      flex: 1,
      backgroundColor: '#3b82f6',
      borderRadius: '8px 8px 0 0',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '10px'
    },

    timelineValue: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#ffffff'
    },

    timelineDate: {
      position: 'absolute',
      bottom: '-30px',
      fontSize: '12px',
      color: '#64748b',
      transform: 'rotate(-45deg)',
      whiteSpace: 'nowrap'
    },

    // Top issues list
    topIssuesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },

    topIssueItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      borderLeft: '4px solid #2563eb'
    },

    issueRank: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2563eb',
      minWidth: '40px'
    },

    issueName: {
      flex: 1,
      fontSize: '18px',
      fontWeight: '600',
      color: '#334155',
      marginLeft: '15px'
    },

    issueCount: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      backgroundColor: '#eff6ff',
      padding: '8px 16px',
      borderRadius: '20px'
    },

    // Resolution time section
    resolutionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '20px'
    },

    resolutionCard: {
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      textAlign: 'center',
      borderTop: '3px solid'
    },

    resolutionValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },

    resolutionLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '600'
    }
  };

  // ==================== RENDER ====================
  
  if (!adminData) {
    return (
      <div style={{...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '24px', color: '#64748b'}}>
          ⏳ Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>🏛️</div>
          <div>
            <div style={styles.headerTitle}>SUVIDHA ADMIN</div>
            <div style={styles.headerSubtitle}>Analytics & Reports</div>
          </div>
        </div>

        <div style={styles.headerButtons}>
          <button 
            style={{...styles.headerButton, ...styles.backButton}}
            onClick={handleBackToDashboard}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            ← Dashboard
          </button>
          <button 
            style={{...styles.headerButton, ...styles.exportButton}}
            onClick={handleExportReport}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
          >
            📥 Export Report
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        
        {/* Page Title */}
        <h1 style={styles.pageTitle}>📊 Analytics Dashboard</h1>
        <p style={styles.pageSubtitle}>
          Comprehensive analytics for {adminData.department === 'All' ? 'all departments' : adminData.department + ' department'}
        </p>

        {/* Filter Bar */}
        <div style={styles.filterBar}>
          <span style={styles.filterLabel}>📅 Time Period:</span>
          
          {['7days', '30days', 'thisMonth', 'lastMonth'].map((range) => (
            <button
              key={range}
              style={{
                ...styles.filterButton,
                ...(dateRange === range ? styles.filterButtonActive : styles.filterButtonInactive)
              }}
              onClick={() => setDateRange(range)}
              onMouseEnter={(e) => {
                if (dateRange !== range) e.target.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                if (dateRange !== range) e.target.style.backgroundColor = '#ffffff';
              }}
            >
              {range === '7days' && 'Last 7 Days'}
              {range === '30days' && 'Last 30 Days'}
              {range === 'thisMonth' && 'This Month'}
              {range === 'lastMonth' && 'Last Month'}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div style={styles.metricsGrid}>
          
          {/* Total Complaints */}
          <div style={{...styles.metricCard, borderTopColor: '#3b82f6'}}>
            <div style={styles.metricIcon}>📋</div>
            <div style={styles.metricLabel}>Total Complaints</div>
            <div style={{...styles.metricValue, color: '#3b82f6'}}>
              {getTotalComplaints()}
            </div>
            <div style={styles.metricSubtext}>Last 7 days</div>
          </div>

          {/* Resolution Rate */}
          <div style={{...styles.metricCard, borderTopColor: '#22c55e'}}>
            <div style={styles.metricIcon}>✅</div>
            <div style={styles.metricLabel}>Resolution Rate</div>
            <div style={{...styles.metricValue, color: '#22c55e'}}>
              {getResolutionRate()}%
            </div>
            <div style={styles.metricSubtext}>
              {analyticsData.statusStats.resolved} resolved
            </div>
          </div>

          {/* Average Response Time */}
          <div style={{...styles.metricCard, borderTopColor: '#f59e0b'}}>
            <div style={styles.metricIcon}>⏱️</div>
            <div style={styles.metricLabel}>Avg Response Time</div>
            <div style={{...styles.metricValue, color: '#f59e0b'}}>
              {analyticsData.resolutionTime.average}h
            </div>
            <div style={styles.metricSubtext}>
              Fastest: {analyticsData.resolutionTime.fastest}h
            </div>
          </div>

          {/* Daily Average */}
          <div style={{...styles.metricCard, borderTopColor: '#8b5cf6'}}>
            <div style={styles.metricIcon}>📈</div>
            <div style={styles.metricLabel}>Daily Average</div>
            <div style={{...styles.metricValue, color: '#8b5cf6'}}>
              {getAveragePerDay()}
            </div>
            <div style={styles.metricSubtext}>Complaints per day</div>
          </div>

        </div>

        {/* Charts Grid */}
        <div style={styles.chartsGrid}>
          
          {/* Daily Complaints Trend */}
          <div style={{...styles.chartCard, gridColumn: 'span 2'}}>
            <h3 style={styles.chartTitle}>
              <span>📈</span> Daily Complaints Trend
            </h3>
            <div style={styles.timelineChart}>
              {analyticsData.dailyComplaints.map((day, index) => {
                const maxCount = Math.max(...analyticsData.dailyComplaints.map(d => d.count));
                const heightPercent = (day.count / maxCount) * 100;
                
                return (
                  <div
                    key={index}
                    style={{
                      ...styles.timelineBar,
                      height: `${heightPercent}%`,
                      minHeight: '40px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={styles.timelineValue}>{day.count}</div>
                    <div style={styles.timelineDate}>
                      {day.date.substring(5)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Distribution */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>
              <span>🏢</span> Department Distribution
            </h3>
            <div style={styles.pieChart}>
              {analyticsData.departmentStats.map((dept) => (
                <div
                  key={dept.department}
                  style={{
                    ...styles.pieItem,
                    borderLeftColor: 
                      dept.department === 'Electricity' ? '#f59e0b' :
                      dept.department === 'Water' ? '#06b6d4' :
                      dept.department === 'Gas' ? '#ef4444' : '#22c55e'
                  }}
                >
                  <div style={styles.pieIcon}>
                    {dept.department === 'Electricity' && '⚡'}
                    {dept.department === 'Water' && '💧'}
                    {dept.department === 'Gas' && '🔥'}
                    {dept.department === 'Municipal' && '🏢'}
                  </div>
                  <div style={styles.pieInfo}>
                    <div style={styles.pieName}>{dept.department}</div>
                    <div>
                      <span style={styles.pieValue}>{dept.total}</span>
                      <span style={styles.piePercent}>({dept.percentage}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>
              <span>📊</span> Status Distribution
            </h3>
            <div style={styles.barChart}>
              <div style={styles.barItem}>
                <div style={styles.barLabel}>Pending</div>
                <div style={styles.barContainer}>
                  <div style={{
                    ...styles.barFill,
                    width: `${(analyticsData.statusStats.pending / getTotalComplaints()) * 100}%`,
                    backgroundColor: '#f59e0b'
                  }}>
                    {analyticsData.statusStats.pending}
                  </div>
                </div>
              </div>

              <div style={styles.barItem}>
                <div style={styles.barLabel}>In Progress</div>
                <div style={styles.barContainer}>
                  <div style={{
                    ...styles.barFill,
                    width: `${(analyticsData.statusStats.inProgress / getTotalComplaints()) * 100}%`,
                    backgroundColor: '#8b5cf6'
                  }}>
                    {analyticsData.statusStats.inProgress}
                  </div>
                </div>
              </div>

              <div style={styles.barItem}>
                <div style={styles.barLabel}>Resolved</div>
                <div style={styles.barContainer}>
                  <div style={{
                    ...styles.barFill,
                    width: `${(analyticsData.statusStats.resolved / getTotalComplaints()) * 100}%`,
                    backgroundColor: '#22c55e'
                  }}>
                    {analyticsData.statusStats.resolved}
                  </div>
                </div>
              </div>

              <div style={styles.barItem}>
                <div style={styles.barLabel}>Rejected</div>
                <div style={styles.barContainer}>
                  <div style={{
                    ...styles.barFill,
                    width: `${(analyticsData.statusStats.rejected / getTotalComplaints()) * 100}%`,
                    backgroundColor: '#ef4444'
                  }}>
                    {analyticsData.statusStats.rejected}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Resolution Time Analysis */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <span>⏱️</span> Resolution Time Analysis
          </h3>
          <div style={styles.resolutionGrid}>
            <div style={{...styles.resolutionCard, borderTopColor: '#22c55e'}}>
              <div style={{...styles.resolutionValue, color: '#22c55e'}}>
                {analyticsData.resolutionTime.under24h}
              </div>
              <div style={styles.resolutionLabel}>Under 24 hours</div>
            </div>

            <div style={{...styles.resolutionCard, borderTopColor: '#f59e0b'}}>
              <div style={{...styles.resolutionValue, color: '#f59e0b'}}>
                {analyticsData.resolutionTime.under48h}
              </div>
              <div style={styles.resolutionLabel}>24-48 hours</div>
            </div>

            <div style={{...styles.resolutionCard, borderTopColor: '#ef4444'}}>
              <div style={{...styles.resolutionValue, color: '#ef4444'}}>
                {analyticsData.resolutionTime.over48h}
              </div>
              <div style={styles.resolutionLabel}>Over 48 hours</div>
            </div>
          </div>
        </div>

        {/* Top Issues */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <span>🔥</span> Top 5 Issues
          </h3>
          <div style={styles.topIssuesList}>
            {analyticsData.topIssues.map((issue, index) => (
              <div key={index} style={styles.topIssueItem}>
                <div style={styles.issueRank}>#{index + 1}</div>
                <div style={styles.issueName}>{issue.issue}</div>
                <div style={styles.issueCount}>{issue.count}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytics;