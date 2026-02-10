import React, { useState, useEffect } from 'react';

/**
 * SUVIDHA ADMIN PANEL - UPDATE STATUS
 * 
 * Purpose: Allow admins to update complaint status with remarks
 * 
 * Features:
 * - Status selection dropdown (Received, Under Review, Team Assigned, In Progress, Resolved, Rejected)
 * - Mandatory remark/comment field
 * - Assign to team member (optional)
 * - Estimated completion date
 * - Confirmation before update
 * - Status history/audit trail
 * - Touch-friendly design
 */

function UpdateStatus() {
  // ==================== STATE MANAGEMENT ====================
  
  const [adminData, setAdminData] = useState(null);
  const [complaint, setComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [priority, setPriority] = useState('');
  const [notifyUser, setNotifyUser] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // ==================== DUMMY DATA ====================
  
  /**
   * Dummy complaint data
   */
  const dummyComplaint = {
    id: 1,
    tokenId: 'SUV12345678',
    name: 'Rajesh Kumar',
    mobile: '9876543210',
    department: 'Electricity',
    service: 'Register Complaint',
    problem: 'Power outage in my area for last 3 hours',
    currentStatus: 'Pending',
    currentPriority: 'High',
    date: '2026-02-08',
    time: '09:30 AM'
  };

  /**
   * Available status options
   */
  const statusOptions = [
    { 
      value: 'Received', 
      label: '📥 Received', 
      description: 'Complaint has been received and logged',
      color: '#3b82f6'
    },
    { 
      value: 'Under Review', 
      label: '🔍 Under Review', 
      description: 'Team is reviewing the complaint',
      color: '#8b5cf6'
    },
    { 
      value: 'Team Assigned', 
      label: '👥 Team Assigned', 
      description: 'Team has been assigned to handle this',
      color: '#6366f1'
    },
    { 
      value: 'In Progress', 
      label: '🔄 In Progress', 
      description: 'Work is currently in progress',
      color: '#f59e0b'
    },
    { 
      value: 'Resolved', 
      label: '✅ Resolved', 
      description: 'Issue has been successfully resolved',
      color: '#22c55e'
    },
    { 
      value: 'Rejected', 
      label: '❌ Rejected', 
      description: 'Complaint has been rejected',
      color: '#ef4444'
    }
  ];

  /**
   * Priority options
   */
  const priorityOptions = [
    { value: 'Low', label: '🟢 Low Priority', color: '#22c55e' },
    { value: 'Medium', label: '🟡 Medium Priority', color: '#f59e0b' },
    { value: 'High', label: '🔴 High Priority', color: '#ef4444' }
  ];

  /**
   * Team members (department-wise)
   */
  const teamMembers = {
    'Electricity': [
      'Ramesh Sharma - Senior Technician',
      'Sunil Kumar - Junior Engineer',
      'Amit Singh - Field Officer',
      'Pradeep Rao - Supervisor'
    ],
    'Water': [
      'Mohan Das - Plumber',
      'Rajiv Nair - Water Inspector',
      'Sanjay Gupta - Team Lead'
    ],
    'Gas': [
      'Harish Patel - Gas Technician',
      'Deepak Joshi - Safety Officer',
      'Arun Kumar - Field Engineer'
    ],
    'Municipal': [
      'Vijay Singh - Sanitation Worker',
      'Rakesh Verma - Road Inspector',
      'Manoj Kumar - Supervisor'
    ]
  };

  /**
   * Pre-defined remark templates
   */
  const remarkTemplates = [
    'Team has been notified and will visit the location soon.',
    'Issue is being investigated by our technical team.',
    'Work order has been created and assigned.',
    'Resolved as per the complaint. Please verify.',
    'Unable to process due to insufficient information.',
    'Duplicate complaint. Merging with existing ticket.',
    'Issue requires approval from higher authorities.',
    'Scheduled for maintenance within 24 hours.'
  ];

  // ==================== LIFECYCLE ====================
  
  useEffect(() => {
    // Load admin data
    const storedAdmin = localStorage.getItem('suvidhaAdmin');
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    }
    
    // Load complaint data
    setComplaint(dummyComplaint);
    
    // Set default values
    setNewStatus(dummyComplaint.currentStatus);
    setPriority(dummyComplaint.currentPriority);
  }, []);

  // ==================== HANDLERS ====================
  
  const handleStatusChange = (status) => {
    setNewStatus(status);
    
    // Auto-suggest remark based on status
    if (status === 'Team Assigned') {
      setRemark('Team has been notified and will visit the location soon.');
    } else if (status === 'In Progress') {
      setRemark('Issue is being investigated by our technical team.');
    } else if (status === 'Resolved') {
      setRemark('Resolved as per the complaint. Please verify.');
    }
  };

  const handleUseTemplate = (template) => {
    setRemark(template);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!newStatus) {
      alert('❌ Please select a status');
      return;
    }

    if (!remark.trim()) {
      alert('❌ Please enter a remark/comment');
      return;
    }

    if (remark.trim().length < 10) {
      alert('❌ Remark should be at least 10 characters long');
      return;
    }

    // Show confirmation
    setShowConfirmation(true);
  };

  const handleConfirmUpdate = () => {
    // Simulate API call
    setTimeout(() => {
      const updateData = {
        complaintId: complaint.tokenId,
        oldStatus: complaint.currentStatus,
        newStatus: newStatus,
        remark: remark,
        assignedTo: assignTo || 'Not Assigned',
        estimatedDate: estimatedDate || 'Not specified',
        priority: priority,
        updatedBy: adminData.name,
        updatedAt: new Date().toLocaleString(),
        notifyUser: notifyUser
      };

      console.log('Status Update:', updateData);

      // Show success message
      alert(
        `✓ Status Updated Successfully!\n\n` +
        `Complaint: ${complaint.tokenId}\n` +
        `New Status: ${newStatus}\n` +
        `Remark: ${remark}\n` +
        `Updated By: ${adminData.name}\n\n` +
        `${notifyUser ? '📱 SMS notification sent to user' : '📱 No notification sent'}`
      );

      // In real app, navigate back
      // history.push(`/admin/complaint/${complaint.id}`);
      
      setShowConfirmation(false);
      handleBack();
    }, 1000);
  };

  const handleBack = () => {
    if (window.confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
      alert('← Returning to Complaint Details...\n\n(In production, this will navigate back)');
      // In real app: history.goBack();
    }
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
      maxWidth: '1200px',
      margin: '0 auto'
    },

    // Complaint info banner
    complaintBanner: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '25px 35px',
      marginBottom: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      borderLeft: '6px solid #2563eb'
    },

    bannerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px'
    },

    bannerItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },

    bannerLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '600'
    },

    bannerValue: {
      fontSize: '18px',
      color: '#1e3a8a',
      fontWeight: 'bold'
    },

    // Form card
    formCard: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },

    formTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },

    // Form sections
    section: {
      marginBottom: '35px'
    },

    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#475569',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    // Form group
    formGroup: {
      marginBottom: '25px'
    },

    label: {
      display: 'block',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#334155',
      marginBottom: '10px'
    },

    required: {
      color: '#ef4444',
      marginLeft: '4px'
    },

    select: {
      width: '100%',
      padding: '16px 20px',
      fontSize: '18px',
      borderRadius: '10px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      transition: 'border-color 0.3s ease'
    },

    textarea: {
      width: '100%',
      minHeight: '150px',
      padding: '16px 20px',
      fontSize: '18px',
      borderRadius: '10px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      resize: 'vertical',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease',
      lineHeight: '1.6'
    },

    input: {
      width: '100%',
      padding: '16px 20px',
      fontSize: '18px',
      borderRadius: '10px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease'
    },

    // Status options grid
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px',
      marginTop: '15px'
    },

    statusOption: {
      padding: '20px',
      borderRadius: '10px',
      border: '3px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff'
    },

    statusOptionSelected: {
      borderColor: '#2563eb',
      backgroundColor: '#eff6ff',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
    },

    statusLabel: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },

    statusDescription: {
      fontSize: '14px',
      color: '#64748b'
    },

    // Remark templates
    templateGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '10px',
      marginBottom: '15px'
    },

    templateButton: {
      padding: '12px 16px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '2px solid #cbd5e1',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#475569',
      textAlign: 'left',
      transition: 'all 0.3s ease'
    },

    // Checkbox
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      cursor: 'pointer'
    },

    checkbox: {
      width: '24px',
      height: '24px',
      cursor: 'pointer'
    },

    checkboxLabel: {
      fontSize: '18px',
      color: '#334155',
      cursor: 'pointer'
    },

    // Action buttons
    actionButtons: {
      display: 'flex',
      gap: '20px',
      marginTop: '40px',
      justifyContent: 'flex-end'
    },

    submitButton: {
      padding: '18px 40px',
      fontSize: '20px',
      fontWeight: 'bold',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
      transition: 'all 0.3s ease'
    },

    cancelButton: {
      padding: '18px 40px',
      fontSize: '20px',
      fontWeight: 'bold',
      borderRadius: '10px',
      border: '2px solid #64748b',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#64748b',
      transition: 'all 0.3s ease'
    },

    // Confirmation modal
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },

    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    },

    modalTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      textAlign: 'center'
    },

    modalBody: {
      fontSize: '18px',
      color: '#334155',
      lineHeight: '1.8',
      marginBottom: '30px'
    },

    confirmRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #e2e8f0'
    },

    confirmLabel: {
      fontWeight: 'bold',
      color: '#64748b'
    },

    confirmValue: {
      color: '#1e3a8a',
      fontWeight: '600'
    },

    modalButtons: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px'
    },

    // Helper text
    helperText: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '8px',
      fontStyle: 'italic'
    },

    charCount: {
      fontSize: '14px',
      color: '#64748b',
      textAlign: 'right',
      marginTop: '5px'
    }
  };

  // ==================== RENDER ====================
  
  if (!adminData || !complaint) {
    return (
      <div style={{...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '24px', color: '#64748b'}}>
          ⏳ Loading...
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
            <div style={styles.headerSubtitle}>Update Complaint Status</div>
          </div>
        </div>

        <button 
          style={styles.backButton}
          onClick={handleBack}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          ← Back
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        
        {/* Complaint Info Banner */}
        <div style={styles.complaintBanner}>
          <div style={styles.bannerGrid}>
            <div style={styles.bannerItem}>
              <div style={styles.bannerLabel}>Token ID</div>
              <div style={styles.bannerValue}>{complaint.tokenId}</div>
            </div>
            <div style={styles.bannerItem}>
              <div style={styles.bannerLabel}>User Name</div>
              <div style={styles.bannerValue}>{complaint.name}</div>
            </div>
            <div style={styles.bannerItem}>
              <div style={styles.bannerLabel}>Department</div>
              <div style={styles.bannerValue}>{complaint.department}</div>
            </div>
            <div style={styles.bannerItem}>
              <div style={styles.bannerLabel}>Current Status</div>
              <div style={styles.bannerValue}>{complaint.currentStatus}</div>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form style={styles.formCard} onSubmit={handleSubmit}>
          <h2 style={styles.formTitle}>
            <span>📝</span> Update Status & Add Remark
          </h2>

          {/* Status Selection */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>1️⃣</span> Select New Status
            </div>

            <div style={styles.statusGrid}>
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  style={{
                    ...styles.statusOption,
                    ...(newStatus === option.value ? styles.statusOptionSelected : {})
                  }}
                  onClick={() => handleStatusChange(option.value)}
                >
                  <div style={{...styles.statusLabel, color: option.color}}>
                    {option.label}
                  </div>
                  <div style={styles.statusDescription}>{option.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Remark/Comment */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>2️⃣</span> Add Remark / Comment
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Quick Templates (Click to use)
              </label>
              <div style={styles.templateGrid}>
                {remarkTemplates.slice(0, 4).map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    style={styles.templateButton}
                    onClick={() => handleUseTemplate(template)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                  >
                    💡 {template.substring(0, 40)}...
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Remark / Comment <span style={styles.required}>*</span>
              </label>
              <textarea
                style={styles.textarea}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter detailed remark about status update, actions taken, or next steps..."
                required
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
              <div style={styles.charCount}>
                {remark.length} characters (minimum 10 required)
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>3️⃣</span> Additional Information (Optional)
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Assign To Team Member
              </label>
              <select
                style={styles.select}
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                <option value="">-- Select Team Member --</option>
                {(teamMembers[complaint.department] || []).map((member, index) => (
                  <option key={index} value={member}>
                    {member}
                  </option>
                ))}
              </select>
              <div style={styles.helperText}>
                Assign this complaint to a specific team member
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Priority Level
              </label>
              <select
                style={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Estimated Completion Date
              </label>
              <input
                type="date"
                style={styles.input}
                value={estimatedDate}
                onChange={(e) => setEstimatedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
              <div style={styles.helperText}>
                Expected date when this issue will be resolved
              </div>
            </div>
          </div>

          {/* Notification */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>4️⃣</span> Notification
            </div>

            <div 
              style={styles.checkboxContainer}
              onClick={() => setNotifyUser(!notifyUser)}
            >
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={notifyUser}
                onChange={(e) => setNotifyUser(e.target.checked)}
              />
              <label style={styles.checkboxLabel}>
                📱 Send SMS notification to user about status update
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={handleBack}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
            >
              ✕ Cancel
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              ✓ Update Status
            </button>
          </div>
        </form>

      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>⚠️ Confirm Status Update</h2>
            
            <div style={styles.modalBody}>
              <p style={{marginBottom: '20px'}}>
                Please review the following changes before confirming:
              </p>

              <div style={styles.confirmRow}>
                <div style={styles.confirmLabel}>Token ID:</div>
                <div style={styles.confirmValue}>{complaint.tokenId}</div>
              </div>

              <div style={styles.confirmRow}>
                <div style={styles.confirmLabel}>Old Status:</div>
                <div style={styles.confirmValue}>{complaint.currentStatus}</div>
              </div>

              <div style={styles.confirmRow}>
                <div style={styles.confirmLabel}>New Status:</div>
                <div style={styles.confirmValue}>{newStatus}</div>
              </div>

              <div style={styles.confirmRow}>
                <div style={styles.confirmLabel}>Priority:</div>
                <div style={styles.confirmValue}>{priority}</div>
              </div>

              {assignTo && (
                <div style={styles.confirmRow}>
                  <div style={styles.confirmLabel}>Assigned To:</div>
                  <div style={styles.confirmValue}>{assignTo}</div>
                </div>
              )}

              <div style={{...styles.confirmRow, borderBottom: 'none'}}>
                <div style={styles.confirmLabel}>Notify User:</div>
                <div style={styles.confirmValue}>{notifyUser ? 'Yes (SMS)' : 'No'}</div>
              </div>

              <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px'}}>
                <div style={{fontWeight: 'bold', marginBottom: '8px', color: '#64748b'}}>Remark:</div>
                <div style={{color: '#334155'}}>{remark}</div>
              </div>
            </div>

            <div style={styles.modalButtons}>
              <button
                style={{...styles.cancelButton, flex: 1}}
                onClick={() => setShowConfirmation(false)}
              >
                ← Go Back
              </button>
              <button
                style={{...styles.submitButton, flex: 2}}
                onClick={handleConfirmUpdate}
              >
                ✓ Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UpdateStatus;