import React, { useState, useEffect } from 'react';

/**
 * SUVIDHA ADMIN PANEL - DASHBOARD
 * 
 * Purpose: Show overview of complaints and statistics for the logged-in admin
 * 
 * Features:
 * - Summary cards (Total, Pending, In Progress, Resolved, Today's complaints)
 * - Department-wise breakdown
 * - Quick stats with color coding
 * - Touch-friendly navigation
 * - Real-time dummy data
 */

function AdminDashboard() {
  // ==================== STATE MANAGEMENT ====================
  
  const [adminData, setAdminData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==================== DUMMY DATA ====================
  
  /**
   * Dummy complaints data for testing
   * In production, fetch this from backend API
   */
  const dummyComplaints = [
    {
      id: 1,
      tokenId: 'SUV12345678',
      name: 'Rajesh Kumar',
      mobile: '9876543210',
      department: 'Electricity',
      service: 'Register Complaint',
      problem: 'Power outage in my area for last 3 hours',
      date: '2026-02-08',
      time: '09:30 AM',
      status: 'Pending'
    },
    {
      id: 2,
      tokenId: 'SUV23456789',
      name: 'Priya Sharma',
      mobile: '9876543211',
      department: 'Water',
      service: 'Register Complaint',
      problem: 'No water supply since morning',
      date: '2026-02-08',
      time: '10:15 AM',
      status: 'In Progress'
    },
    {
      id: 3,
      tokenId: 'SUV34567890',
      name: 'Amit Patel',
      mobile: '9876543212',
      department: 'Gas',
      service: 'New Application',
      problem: 'Need new LPG connection',
      date: '2026-02-07',
      time: '02:45 PM',
      status: 'Resolved'
    },
    {
      id: 4,
      tokenId: 'SUV45678901',
      name: 'Sunita Verma',
      mobile: '9876543213',
      department: 'Municipal',
      service: 'Register Complaint',
      problem: 'Street light not working',
      date: '2026-02-08',
      time: '11:20 AM',
      status: 'Pending'
    },
    {
      id: 5,
      tokenId: 'SUV56789012',
      name: 'Vikram Singh',
      mobile: '9876543214',
      department: 'Electricity',
      service: 'Track Status',
      problem: 'Meter reading incorrect',
      date: '2026-02-07',
      time: '03:30 PM',
      status: 'In Progress'
    },
    {
      id: 6,
      tokenId: 'SUV67890123',
      name: 'Anjali Desai',
      mobile: '9876543215',
      department: 'Water',
      service: 'Register Complaint',
      problem: 'Water pipe leakage on main road',
      date: '2026-02-06',
      time: '04:15 PM',
      status: 'Resolved'
    },
    {
      id: 7,
      tokenId: 'SUV78901234',
      name: 'Karan Mehta',
      mobile: '9876543216',
      department: 'Electricity',
      service: 'New Application',
      problem: 'New electricity connection needed',
      date: '2026-02-08',
      time: '08:45 AM',
      status: 'Pending'
    },
    {
      id: 8,
      tokenId: 'SUV89012345',
      name: 'Neha Gupta',
      mobile: '9876543217',
      department: 'Municipal',
      service: 'Register Complaint',
      problem: 'Garbage not collected for 3 days',
      date: '2026-02-07',
      time: '01:20 PM',
      status: 'In Progress'
    },
    {
      id: 9,
      tokenId: 'SUV90123456',
      name: 'Rohit Joshi',
      mobile: '9876543218',
      department: 'Gas',
      service: 'Register Complaint',
      problem: 'Gas cylinder delivery delayed',
      date: '2026-02-06',
      time: '05:30 PM',
      status: 'Resolved'
    },
    {
      id: 10,
      tokenId: 'SUV01234567',
      name: 'Pooja Rao',
      mobile: '9876543219',
      department: 'Water',
      service: 'Register Complaint',
      problem: 'Dirty water supply in our area',
      date: '2026-02-08',
      time: '07:50 AM',
      status: 'Pending'
    },
    {
      id: 11,
      tokenId: 'SUV11234568',
      name: 'Arjun Reddy',
      mobile: '9876543220',
      department: 'Electricity',
      service: 'Register Complaint',
      problem: 'High electricity bill dispute',
      date: '2026-02-05',
      time: '06:00 PM',
      status: 'Resolved'
    },
    {
      id: 12,
      tokenId: 'SUV22345679',
      name: 'Kavita Iyer',
      mobile: '9876543221',
      department: 'Municipal',
      service: 'New Application',
      problem: 'Birth certificate application',
      date: '2026-02-08',
      time: '12:30 PM',
      status: 'In Progress'
    }
  ];

  // ==================== LIFECYCLE ====================
  
  useEffect(() => {
    // Simulate loading admin data from localStorage
    const storedAdmin = localStorage.getItem('suvidhaAdmin');
    
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      setAdminData(admin);
      
      // Filter complaints based on admin's department
      const filteredComplaints = admin.department === 'All' 
        ? dummyComplaints 
        : dummyComplaints.filter(c => c.department === admin.department);
      
      setComplaints(filteredComplaints);
    }
    
    // Simulate API loading delay
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // ==================== CALCULATIONS ====================
  
  /**
   * Calculate statistics from complaints data
   */
  const getStatistics = () => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Pending').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    
    // Today's complaints (date = 2026-02-08)
    const today = complaints.filter(c => c.date === '2026-02-08').length;
    
    return { total, pending, inProgress, resolved, today };
  };

  /**
   * Get department-wise complaint count
   */
  const getDepartmentStats = () => {
    const departments = ['Electricity', 'Water', 'Gas', 'Municipal'];
    
    return departments.map(dept => ({
      name: dept,
      icon: dept === 'Electricity' ? '⚡' : dept === 'Water' ? '💧' : dept === 'Gas' ? '🔥' : '🏢',
      total: complaints.filter(c => c.department === dept).length,
      pending: complaints.filter(c => c.department === dept && c.status === 'Pending').length,
      inProgress: complaints.filter(c => c.department === dept && c.status === 'In Progress').length,
      resolved: complaints.filter(c => c.department === dept && c.status === 'Resolved').length
    }));
  };

  const stats = getStatistics();
  const deptStats = getDepartmentStats();

  // ==================== HANDLERS ====================
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('suvidhaAdmin');
      alert('✓ Logged out successfully!');
      // In real app: window.location.href = '/admin/login';
      window.location.reload();
    }
  };

  const handleViewComplaints = () => {
    alert('📋 Navigating to Complaint List...\n\n(In production, this will open ComplaintList.js)');
    // In real app with React Router:
    // history.push('/admin/complaints');
  };

  const handleViewAnalytics = () => {
    alert('📊 Navigating to Analytics...\n\n(In production, this will open Analytics.js)');
    // In real app: history.push('/admin/analytics');
  };

  // ==================== STYLING ====================
  
  const styles = {
    // Main container
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

    // Header section
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

    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },

    userInfo: {
      textAlign: 'right'
    },

    userName: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '3px'
    },

    userDept: {
      fontSize: '16px',
      opacity: 0.9
    },

    logoutButton: {
      padding: '12px 25px',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#dc2626',
      color: '#ffffff',
      transition: 'all 0.3s ease'
    },

    // Main content area
    content: {
      padding: '40px',
      maxWidth: '1400px',
      margin: '0 auto'
    },

    // Welcome section
    welcomeSection: {
      marginBottom: '40px'
    },

    welcomeTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '10px'
    },

    welcomeText: {
      fontSize: '20px',
      color: '#64748b'
    },

    // Statistics cards grid
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },

    // Individual stat card
    statCard: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },

    statIcon: {
      fontSize: '48px',
      marginBottom: '15px'
    },

    statLabel: {
      fontSize: '18px',
      color: '#64748b',
      fontWeight: '600',
      marginBottom: '10px'
    },

    statValue: {
      fontSize: '42px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },

    statChange: {
      fontSize: '14px',
      color: '#22c55e',
      fontWeight: '600'
    },

    // Section title
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    // Department stats grid
    deptGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },

    // Department card
    deptCard: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      borderLeft: '6px solid'
    },

    deptHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '20px'
    },

    deptIcon: {
      fontSize: '40px'
    },

    deptName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e3a8a'
    },

    deptStats: {
      marginTop: '20px'
    },

    deptStatRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '18px'
    },

    deptStatLabel: {
      color: '#64748b',
      fontWeight: '600'
    },

    deptStatValue: {
      fontWeight: 'bold'
    },

    // Action buttons
    actionButtons: {
      display: 'flex',
      gap: '20px',
      marginTop: '40px',
      flexWrap: 'wrap'
    },

    actionButton: {
      flex: 1,
      minWidth: '250px',
      padding: '25px 40px',
      fontSize: '22px',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },

    // Loading screen
    loadingContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f4f8'
    },

    loadingText: {
      fontSize: '28px',
      color: '#64748b',
      fontWeight: '600'
    }
  };

  // ==================== RENDER ====================
  
  // Show loading screen
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>⏳ Loading Dashboard...</div>
      </div>
    );
  }

  // Show error if no admin data
  if (!adminData) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>
          ❌ Please login first!
          <br />
          <button 
            onClick={() => window.location.reload()} 
            style={{...styles.actionButton, marginTop: '20px', backgroundColor: '#2563eb', color: '#fff'}}
          >
            Go to Login
          </button>
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
            <div style={styles.headerSubtitle}>Complaint Management System</div>
          </div>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <div style={styles.userName}>👤 {adminData.name}</div>
            <div style={styles.userDept}>{adminData.department} Department</div>
          </div>
          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>
            Welcome back, {adminData.name}! 👋
          </h1>
          <p style={styles.welcomeText}>
            Here's what's happening with {adminData.department === 'All' ? 'all departments' : 'your department'} today
          </p>
        </div>

        {/* Statistics Cards */}
        <div style={styles.statsGrid}>
          
          {/* Total Complaints */}
          <div 
            style={{...styles.statCard, borderTop: '4px solid #3b82f6'}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>📋</div>
            <div style={styles.statLabel}>Total Complaints</div>
            <div style={{...styles.statValue, color: '#3b82f6'}}>{stats.total}</div>
            <div style={styles.statChange}>All time</div>
          </div>

          {/* Pending */}
          <div 
            style={{...styles.statCard, borderTop: '4px solid #f59e0b'}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>⏳</div>
            <div style={styles.statLabel}>Pending</div>
            <div style={{...styles.statValue, color: '#f59e0b'}}>{stats.pending}</div>
            <div style={{...styles.statChange, color: '#f59e0b'}}>Needs attention</div>
          </div>

          {/* In Progress */}
          <div 
            style={{...styles.statCard, borderTop: '4px solid #8b5cf6'}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>🔄</div>
            <div style={styles.statLabel}>In Progress</div>
            <div style={{...styles.statValue, color: '#8b5cf6'}}>{stats.inProgress}</div>
            <div style={{...styles.statChange, color: '#8b5cf6'}}>Being worked on</div>
          </div>

          {/* Resolved */}
          <div 
            style={{...styles.statCard, borderTop: '4px solid #22c55e'}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>✅</div>
            <div style={styles.statLabel}>Resolved</div>
            <div style={{...styles.statValue, color: '#22c55e'}}>{stats.resolved}</div>
            <div style={styles.statChange}>Completed</div>
          </div>

          {/* Today's Complaints */}
          <div 
            style={{...styles.statCard, borderTop: '4px solid #ec4899'}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>📅</div>
            <div style={styles.statLabel}>Today Received</div>
            <div style={{...styles.statValue, color: '#ec4899'}}>{stats.today}</div>
            <div style={{...styles.statChange, color: '#ec4899'}}>Feb 8, 2026</div>
          </div>
        </div>

        {/* Department-wise Breakdown */}
        {adminData.department === 'All' && (
          <>
            <h2 style={styles.sectionTitle}>
              <span>🏢</span> Department-wise Overview
            </h2>
            
            <div style={styles.deptGrid}>
              {deptStats.map((dept, index) => (
                <div 
                  key={dept.name} 
                  style={{
                    ...styles.deptCard,
                    borderLeftColor: 
                      dept.name === 'Electricity' ? '#f59e0b' :
                      dept.name === 'Water' ? '#3b82f6' :
                      dept.name === 'Gas' ? '#ef4444' : '#22c55e'
                  }}
                >
                  <div style={styles.deptHeader}>
                    <div style={styles.deptIcon}>{dept.icon}</div>
                    <div style={styles.deptName}>{dept.name}</div>
                  </div>

                  <div style={styles.deptStats}>
                    <div style={styles.deptStatRow}>
                      <span style={styles.deptStatLabel}>Total:</span>
                      <span style={{...styles.deptStatValue, color: '#3b82f6'}}>{dept.total}</span>
                    </div>
                    <div style={styles.deptStatRow}>
                      <span style={styles.deptStatLabel}>Pending:</span>
                      <span style={{...styles.deptStatValue, color: '#f59e0b'}}>{dept.pending}</span>
                    </div>
                    <div style={styles.deptStatRow}>
                      <span style={styles.deptStatLabel}>In Progress:</span>
                      <span style={{...styles.deptStatValue, color: '#8b5cf6'}}>{dept.inProgress}</span>
                    </div>
                    <div style={{...styles.deptStatRow, borderBottom: 'none'}}>
                      <span style={styles.deptStatLabel}>Resolved:</span>
                      <span style={{...styles.deptStatValue, color: '#22c55e'}}>{dept.resolved}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button
            style={{...styles.actionButton, backgroundColor: '#2563eb', color: '#ffffff'}}
            onClick={handleViewComplaints}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            <span style={{fontSize: '28px'}}>📋</span>
            View All Complaints
          </button>

          <button
            style={{...styles.actionButton, backgroundColor: '#8b5cf6', color: '#ffffff'}}
            onClick={handleViewAnalytics}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'}
          >
            <span style={{fontSize: '28px'}}>📊</span>
            View Analytics
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;