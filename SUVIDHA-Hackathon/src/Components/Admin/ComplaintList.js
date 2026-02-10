import React, { useState, useEffect } from 'react';

/**
 * SUVIDHA ADMIN PANEL - COMPLAINT LIST
 * 
 * Purpose: Display all complaints in a table with filtering and search
 * 
 * Features:
 * - Table view with all complaint details
 * - Filter by department, status, date
 * - Search by token ID or mobile number
 * - View button to see complaint details
 * - Touch-friendly design
 * - Pagination for large datasets
 */

function ComplaintList() {
  // ==================== STATE MANAGEMENT ====================
  
  const [adminData, setAdminData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('All');

  // ==================== DUMMY DATA ====================
  
  /**
   * Extended dummy complaints data
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
      status: 'Pending',
      priority: 'High'
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
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 3,
      tokenId: 'SUV34567890',
      name: 'Amit Patel',
      mobile: '9876543212',
      department: 'Gas',
      service: 'New Application',
      problem: 'Need new LPG connection for my home',
      date: '2026-02-07',
      time: '02:45 PM',
      status: 'Resolved',
      priority: 'Medium'
    },
    {
      id: 4,
      tokenId: 'SUV45678901',
      name: 'Sunita Verma',
      mobile: '9876543213',
      department: 'Municipal',
      service: 'Register Complaint',
      problem: 'Street light not working near my house',
      date: '2026-02-08',
      time: '11:20 AM',
      status: 'Pending',
      priority: 'Low'
    },
    {
      id: 5,
      tokenId: 'SUV56789012',
      name: 'Vikram Singh',
      mobile: '9876543214',
      department: 'Electricity',
      service: 'Track Status',
      problem: 'Meter reading showing incorrect values',
      date: '2026-02-07',
      time: '03:30 PM',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 6,
      tokenId: 'SUV67890123',
      name: 'Anjali Desai',
      mobile: '9876543215',
      department: 'Water',
      service: 'Register Complaint',
      problem: 'Water pipe leakage on main road causing wastage',
      date: '2026-02-06',
      time: '04:15 PM',
      status: 'Resolved',
      priority: 'High'
    },
    {
      id: 7,
      tokenId: 'SUV78901234',
      name: 'Karan Mehta',
      mobile: '9876543216',
      department: 'Electricity',
      service: 'New Application',
      problem: 'New electricity connection needed for shop',
      date: '2026-02-08',
      time: '08:45 AM',
      status: 'Pending',
      priority: 'Medium'
    },
    {
      id: 8,
      tokenId: 'SUV89012345',
      name: 'Neha Gupta',
      mobile: '9876543217',
      department: 'Municipal',
      service: 'Register Complaint',
      problem: 'Garbage not collected for 3 days in our locality',
      date: '2026-02-07',
      time: '01:20 PM',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 9,
      tokenId: 'SUV90123456',
      name: 'Rohit Joshi',
      mobile: '9876543218',
      department: 'Gas',
      service: 'Register Complaint',
      problem: 'Gas cylinder delivery delayed by 5 days',
      date: '2026-02-06',
      time: '05:30 PM',
      status: 'Resolved',
      priority: 'Low'
    },
    {
      id: 10,
      tokenId: 'SUV01234567',
      name: 'Pooja Rao',
      mobile: '9876543219',
      department: 'Water',
      service: 'Register Complaint',
      problem: 'Dirty water supply in our area, unhealthy',
      date: '2026-02-08',
      time: '07:50 AM',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 11,
      tokenId: 'SUV11234568',
      name: 'Arjun Reddy',
      mobile: '9876543220',
      department: 'Electricity',
      service: 'Register Complaint',
      problem: 'High electricity bill dispute - overcharged',
      date: '2026-02-05',
      time: '06:00 PM',
      status: 'Resolved',
      priority: 'Medium'
    },
    {
      id: 12,
      tokenId: 'SUV22345679',
      name: 'Kavita Iyer',
      mobile: '9876543221',
      department: 'Municipal',
      service: 'New Application',
      problem: 'Birth certificate application for newborn',
      date: '2026-02-08',
      time: '12:30 PM',
      status: 'In Progress',
      priority: 'Low'
    },
    {
      id: 13,
      tokenId: 'SUV33456780',
      name: 'Deepak Sharma',
      mobile: '9876543222',
      department: 'Electricity',
      service: 'Register Complaint',
      problem: 'Frequent voltage fluctuations damaging appliances',
      date: '2026-02-05',
      time: '09:15 AM',
      status: 'Resolved',
      priority: 'High'
    },
    {
      id: 14,
      tokenId: 'SUV44567891',
      name: 'Meera Nair',
      mobile: '9876543223',
      department: 'Water',
      service: 'Track Status',
      problem: 'Following up on previous water complaint',
      date: '2026-02-06',
      time: '11:45 AM',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 15,
      tokenId: 'SUV55678902',
      name: 'Sanjay Gupta',
      mobile: '9876543224',
      department: 'Gas',
      service: 'Register Complaint',
      problem: 'Gas subsidy not credited to account',
      date: '2026-02-08',
      time: '01:00 PM',
      status: 'Pending',
      priority: 'Medium'
    }
  ];

  // ==================== LIFECYCLE ====================
  
  useEffect(() => {
    // Load admin data
    const storedAdmin = localStorage.getItem('suvidhaAdmin');
    
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      setAdminData(admin);
      
      // Filter complaints based on admin's department
      const filtered = admin.department === 'All' 
        ? dummyComplaints 
        : dummyComplaints.filter(c => c.department === admin.department);
      
      setComplaints(filtered);
      setFilteredComplaints(filtered);
    }
  }, []);

  // ==================== FILTERING LOGIC ====================
  
  useEffect(() => {
    let result = [...complaints];

    // Search filter (Token ID or Mobile)
    if (searchTerm) {
      result = result.filter(c => 
        c.tokenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.mobile.includes(searchTerm)
      );
    }

    // Department filter
    if (filterDepartment !== 'All' && adminData?.department === 'All') {
      result = result.filter(c => c.department === filterDepartment);
    }

    // Status filter
    if (filterStatus !== 'All') {
      result = result.filter(c => c.status === filterStatus);
    }

    // Date filter
    if (filterDate !== 'All') {
      result = result.filter(c => c.date === filterDate);
    }

    setFilteredComplaints(result);
  }, [searchTerm, filterDepartment, filterStatus, filterDate, complaints]);

  // ==================== HANDLERS ====================
  
  const handleViewComplaint = (complaint) => {
    alert(`📄 Viewing Complaint Details\n\nToken: ${complaint.tokenId}\nName: ${complaint.name}\nDepartment: ${complaint.department}\nStatus: ${complaint.status}\n\n(In production, this will open ComplaintDetail.js)`);
    // In real app: history.push(`/admin/complaint/${complaint.id}`);
  };

  const handleBackToDashboard = () => {
    alert('🏠 Returning to Dashboard...\n\n(In production, this will navigate back)');
    // In real app: history.push('/admin/dashboard');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('All');
    setFilterStatus('All');
    setFilterDate('All');
  };

  // Get unique dates for filter dropdown
  const uniqueDates = ['All', ...new Set(complaints.map(c => c.date))];

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

    backButton: {
      padding: '12px 25px',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#1e3a8a',
      transition: 'all 0.3s ease'
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

    // Filter section
    filterSection: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },

    filterTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    filterGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },

    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },

    filterLabel: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#475569'
    },

    filterInput: {
      padding: '12px 16px',
      fontSize: '18px',
      borderRadius: '8px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

    filterSelect: {
      padding: '12px 16px',
      fontSize: '18px',
      borderRadius: '8px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

    clearButton: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: '2px solid #64748b',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#64748b',
      transition: 'all 0.3s ease'
    },

    // Results info
    resultsInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '15px'
    },

    resultCount: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e3a8a'
    },

    // Table container
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      overflowX: 'auto'
    },

    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '1200px'
    },

    tableHeader: {
      backgroundColor: '#f8fafc',
      borderBottom: '3px solid #e2e8f0'
    },

    th: {
      padding: '18px 15px',
      textAlign: 'left',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      whiteSpace: 'nowrap'
    },

    tableRow: {
      borderBottom: '1px solid #e2e8f0',
      transition: 'background-color 0.2s ease'
    },

    td: {
      padding: '18px 15px',
      fontSize: '16px',
      color: '#334155'
    },

    tokenId: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      color: '#2563eb',
      fontSize: '16px'
    },

    statusBadge: {
      display: 'inline-block',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap'
    },

    viewButton: {
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap'
    },

    // No results
    noResults: {
      textAlign: 'center',
      padding: '60px 20px',
      fontSize: '24px',
      color: '#64748b'
    }
  };

  // Status badge color helper
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'In Progress':
        return { backgroundColor: '#ddd6fe', color: '#5b21b6' };
      case 'Resolved':
        return { backgroundColor: '#d1fae5', color: '#065f46' };
      default:
        return { backgroundColor: '#e2e8f0', color: '#475569' };
    }
  };

  // ==================== RENDER ====================
  
  if (!adminData) {
    return (
      <div style={{...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '24px', color: '#64748b'}}>
          ❌ Please login first!
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
            <div style={styles.headerSubtitle}>Complaint Management</div>
          </div>
        </div>

        <button 
          style={styles.backButton}
          onClick={handleBackToDashboard}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        
        {/* Page Title */}
        <h1 style={styles.pageTitle}>📋 All Complaints</h1>
        <p style={styles.pageSubtitle}>
          Viewing complaints for: {adminData.department === 'All' ? 'All Departments' : adminData.department + ' Department'}
        </p>

        {/* Filter Section */}
        <div style={styles.filterSection}>
          <div style={styles.filterTitle}>
            <span>🔍</span> Search & Filter
          </div>

          <div style={styles.filterGrid}>
            
            {/* Search */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Search (Token / Mobile)</label>
              <input
                type="text"
                style={styles.filterInput}
                placeholder="SUV12345678 or 9876543210"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Department Filter (only for Super Admin) */}
            {adminData.department === 'All' && (
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Department</label>
                <select
                  style={styles.filterSelect}
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Electricity">⚡ Electricity</option>
                  <option value="Water">💧 Water</option>
                  <option value="Gas">🔥 Gas</option>
                  <option value="Municipal">🏢 Municipal</option>
                </select>
              </div>
            )}

            {/* Status Filter */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Status</label>
              <select
                style={styles.filterSelect}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">🔄 In Progress</option>
                <option value="Resolved">✅ Resolved</option>
              </select>
            </div>

            {/* Date Filter */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Date</label>
              <select
                style={styles.filterSelect}
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                {uniqueDates.map(date => (
                  <option key={date} value={date}>
                    {date === 'All' ? 'All Dates' : date}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            style={styles.clearButton}
            onClick={handleClearFilters}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            ✕ Clear All Filters
          </button>
        </div>

        {/* Results Info */}
        <div style={styles.resultsInfo}>
          <div style={styles.resultCount}>
            📊 Showing {filteredComplaints.length} of {complaints.length} complaints
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          {filteredComplaints.length > 0 ? (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>Token ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Mobile</th>
                  {adminData.department === 'All' && <th style={styles.th}>Department</th>}
                  <th style={styles.th}>Service</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Time</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr 
                    key={complaint.id}
                    style={styles.tableRow}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <td style={styles.td}>
                      <span style={styles.tokenId}>{complaint.tokenId}</span>
                    </td>
                    <td style={styles.td}>{complaint.name}</td>
                    <td style={styles.td}>{complaint.mobile}</td>
                    {adminData.department === 'All' && (
                      <td style={styles.td}>
                        {complaint.department === 'Electricity' && '⚡ '}
                        {complaint.department === 'Water' && '💧 '}
                        {complaint.department === 'Gas' && '🔥 '}
                        {complaint.department === 'Municipal' && '🏢 '}
                        {complaint.department}
                      </td>
                    )}
                    <td style={styles.td}>{complaint.service}</td>
                    <td style={styles.td}>{complaint.date}</td>
                    <td style={styles.td}>{complaint.time}</td>
                    <td style={styles.td}>
                      <span style={{...styles.statusBadge, ...getStatusStyle(complaint.status)}}>
                        {complaint.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.viewButton}
                        onClick={() => handleViewComplaint(complaint)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                      >
                        👁️ View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.noResults}>
              🔍 No complaints found matching your filters
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ComplaintList;