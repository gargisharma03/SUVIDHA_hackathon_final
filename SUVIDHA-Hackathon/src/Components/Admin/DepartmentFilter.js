import React from 'react';

/**
 * SUVIDHA ADMIN PANEL - DEPARTMENT FILTER COMPONENT
 * 
 * Purpose: Reusable component for filtering complaints by department
 * 
 * Features:
 * - Visual department cards with icons
 * - Active/inactive states
 * - Count badges showing complaints per department
 * - Touch-friendly design
 * - Can be used across multiple screens
 * - Auto-hides for department-specific admins
 * 
 * Usage:
 * <DepartmentFilter 
 *   selectedDepartment={department}
 *   onDepartmentChange={(dept) => setDepartment(dept)}
 *   complaintCounts={{ Electricity: 12, Water: 8, Gas: 5, Municipal: 10 }}
 *   adminDepartment="All"
 * />
 */

function DepartmentFilter({ 
  selectedDepartment = 'All', 
  onDepartmentChange, 
  complaintCounts = {},
  adminDepartment = 'All',
  showCounts = true,
  layout = 'horizontal' // 'horizontal' or 'vertical'
}) {
  
  // ==================== DEPARTMENT DATA ====================
  
  const departments = [
    { 
      id: 'All', 
      name: 'All Departments', 
      icon: '🏛️',
      color: '#3b82f6',
      description: 'View all complaints'
    },
    { 
      id: 'Electricity', 
      name: 'Electricity', 
      icon: '⚡',
      color: '#f59e0b',
      description: 'Power supply & billing'
    },
    { 
      id: 'Water', 
      name: 'Water Supply', 
      icon: '💧',
      color: '#06b6d4',
      description: 'Water connection & supply'
    },
    { 
      id: 'Gas', 
      name: 'Gas', 
      icon: '🔥',
      color: '#ef4444',
      description: 'LPG & gas connection'
    },
    { 
      id: 'Municipal', 
      name: 'Municipal Services', 
      icon: '🏢',
      color: '#22c55e',
      description: 'Sanitation & civic services'
    }
  ];

  // ==================== HANDLERS ====================
  
  const handleDepartmentClick = (deptId) => {
    if (onDepartmentChange) {
      onDepartmentChange(deptId);
    }
  };

  // ==================== STYLING ====================
  
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      marginBottom: '30px'
    },

    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    subtitle: {
      fontSize: '16px',
      color: '#64748b',
      marginBottom: '25px'
    },

    // Horizontal layout
    gridHorizontal: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px'
    },

    // Vertical layout (list style)
    gridVertical: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },

    // Department card
    deptCard: {
      padding: '20px',
      borderRadius: '12px',
      border: '3px solid',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },

    deptCardInactive: {
      borderColor: '#e2e8f0',
      backgroundColor: '#ffffff'
    },

    deptCardActive: {
      borderColor: '#2563eb',
      backgroundColor: '#eff6ff',
      boxShadow: '0 4px 16px rgba(37, 99, 235, 0.2)'
    },

    deptHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },

    deptIconName: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },

    deptIcon: {
      fontSize: '32px'
    },

    deptName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e3a8a'
    },

    deptDescription: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '5px'
    },

    // Count badge
    countBadge: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
      minWidth: '45px',
      textAlign: 'center'
    },

    countBadgeInactive: {
      backgroundColor: '#cbd5e1',
      color: '#64748b'
    },

    // Stats summary (horizontal layout)
    statsSummary: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      marginTop: '20px'
    },

    statItem: {
      textAlign: 'center'
    },

    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '5px'
    },

    statLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '600'
    },

    // Quick filter buttons (compact version)
    quickFilterContainer: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    },

    quickFilterButton: {
      padding: '12px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '25px',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    // Admin restriction message
    restrictionMessage: {
      padding: '20px',
      backgroundColor: '#fef3c7',
      borderRadius: '10px',
      border: '2px solid #fbbf24',
      textAlign: 'center'
    },

    restrictionText: {
      fontSize: '18px',
      color: '#92400e',
      fontWeight: '600'
    }
  };

  // ==================== RENDER ====================
  
  // If admin is not "All", don't show the filter (they can only see their department)
  if (adminDepartment !== 'All') {
    return (
      <div style={styles.container}>
        <div style={styles.restrictionMessage}>
          <div style={styles.restrictionText}>
            🔒 You can only view {adminDepartment} Department complaints
          </div>
        </div>
      </div>
    );
  }

  // Calculate total complaints
  const totalComplaints = Object.values(complaintCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div style={styles.container}>
      
      {/* Title */}
      <div style={styles.title}>
        <span>🏢</span> Filter by Department
      </div>
      <div style={styles.subtitle}>
        Select a department to view specific complaints
      </div>

      {/* Department Cards/Buttons */}
      <div style={layout === 'horizontal' ? styles.gridHorizontal : styles.gridVertical}>
        {departments.map((dept) => {
          const isActive = selectedDepartment === dept.id;
          const count = dept.id === 'All' ? totalComplaints : (complaintCounts[dept.id] || 0);

          return (
            <div
              key={dept.id}
              style={{
                ...styles.deptCard,
                ...(isActive ? styles.deptCardActive : styles.deptCardInactive)
              }}
              onClick={() => handleDepartmentClick(dept.id)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }
              }}
            >
              <div style={styles.deptHeader}>
                <div style={styles.deptIconName}>
                  <span style={styles.deptIcon}>{dept.icon}</span>
                  <div>
                    <div style={styles.deptName}>{dept.name}</div>
                    <div style={styles.deptDescription}>{dept.description}</div>
                  </div>
                </div>

                {showCounts && (
                  <div style={{
                    ...styles.countBadge,
                    ...(isActive ? {} : styles.countBadgeInactive)
                  }}>
                    {count}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      {showCounts && (
        <div style={styles.statsSummary}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{totalComplaints}</div>
            <div style={styles.statLabel}>Total Complaints</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{complaintCounts.Electricity || 0}</div>
            <div style={styles.statLabel}>⚡ Electricity</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{complaintCounts.Water || 0}</div>
            <div style={styles.statLabel}>💧 Water</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{complaintCounts.Gas || 0}</div>
            <div style={styles.statLabel}>🔥 Gas</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{complaintCounts.Municipal || 0}</div>
            <div style={styles.statLabel}>🏢 Municipal</div>
          </div>
        </div>
      )}

    </div>
  );
}

// ==================== QUICK FILTER VARIANT ====================

/**
 * Compact version - just buttons, no descriptions
 * Usage: <QuickDepartmentFilter ... />
 */
export function QuickDepartmentFilter({ 
  selectedDepartment = 'All', 
  onDepartmentChange,
  adminDepartment = 'All'
}) {
  
  const departments = [
    { id: 'All', name: 'All', icon: '🏛️' },
    { id: 'Electricity', name: 'Electricity', icon: '⚡' },
    { id: 'Water', name: 'Water', icon: '💧' },
    { id: 'Gas', name: 'Gas', icon: '🔥' },
    { id: 'Municipal', name: 'Municipal', icon: '🏢' }
  ];

  const styles = {
    container: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },

    label: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#64748b'
    },

    button: {
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '20px',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },

    buttonActive: {
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
      color: '#ffffff'
    },

    buttonInactive: {
      backgroundColor: '#ffffff',
      borderColor: '#cbd5e1',
      color: '#64748b'
    }
  };

  if (adminDepartment !== 'All') {
    return null;
  }

  return (
    <div style={styles.container}>
      <span style={styles.label}>🏢 Department:</span>
      
      {departments.map((dept) => {
        const isActive = selectedDepartment === dept.id;
        
        return (
          <button
            key={dept.id}
            style={{
              ...styles.button,
              ...(isActive ? styles.buttonActive : styles.buttonInactive)
            }}
            onClick={() => onDepartmentChange && onDepartmentChange(dept.id)}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.target.style.backgroundColor = '#f1f5f9';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.target.style.backgroundColor = '#ffffff';
              }
            }}
          >
            <span>{dept.icon}</span>
            {dept.name}
          </button>
        );
      })}
    </div>
  );
}

export default DepartmentFilter;