import React, { useState, useEffect } from 'react';

/**
 * SUVIDHA ADMIN PANEL - COMPLAINT DETAIL VIEW
 * 
 * Updated with:
 * - Speaker icon (🔊) on every button, label, section title, status, timeline, etc.
 * - Bottom-center Back button (same design as user screens)
 */

function ComplaintDetail({ setScreen, t, speak }) {
  // ==================== STATE MANAGEMENT ====================
  const [adminData, setAdminData] = useState(null);
  const [complaint, setComplaint] = useState(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [remarks, setRemarks] = useState([]);

  // ==================== DUMMY DATA ====================
  const dummyComplaint = {
    id: 1,
    tokenId: 'SUV12345678',
    name: 'Rajesh Kumar',
    mobile: '9876543210',
    email: 'rajesh.kumar@email.com',
    address: 'House No. 123, Sector 45, Gurugram, Haryana - 122001',
    department: 'Electricity',
    service: 'Register Complaint',
    problem: 'Power outage in my area for last 3 hours. Multiple houses affected. This is causing problems for students studying and people working from home. Need urgent resolution.',
    date: '2026-02-08',
    time: '09:30 AM',
    status: 'Pending',
    priority: 'High',
    assignedTo: 'Not Assigned',
    
    timeline: [
      {
        date: '2026-02-08',
        time: '09:30 AM',
        action: 'Complaint Registered',
        status: 'Pending',
        note: 'Complaint submitted via SUVIDHA kiosk'
      }
    ],
    
    attachments: [
      { name: 'power_meter_photo.jpg', size: '2.3 MB', type: 'image' },
      { name: 'electricity_bill.pdf', size: '1.1 MB', type: 'pdf' }
    ],
    
    previousComplaints: 2,
    estimatedResolution: '24-48 hours'
  };

  const dummyRemarks = [
    {
      id: 1,
      author: 'System',
      role: 'Auto',
      date: '2026-02-08',
      time: '09:30 AM',
      text: 'Complaint automatically registered in the system'
    }
  ];

  // ==================== LIFECYCLE ====================
  useEffect(() => {
    const storedAdmin = localStorage.getItem('suvidhaAdmin');
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    }
    
    setComplaint(dummyComplaint);
    setRemarks(dummyRemarks);
  }, []);

  // ==================== HANDLERS ====================
  const handleUpdateStatus = () => {
    speak('Opening Update Status screen');
    setScreen('updateStatus');
  };

  const handleCallUser = () => {
    speak(`Calling user ${complaint.name}`);
    if (window.confirm(`📞 Call User?\n\nName: ${complaint.name}\nMobile: ${complaint.mobile}`)) {
      alert(`Calling ${complaint.mobile}...`);
    }
  };

  const handleSendSMS = () => {
    speak('Sending SMS to user');
    const message = prompt(
      `📱 Send SMS to ${complaint.name} (${complaint.mobile})\n\nEnter your message:`,
      `Dear ${complaint.name}, regarding your complaint ${complaint.tokenId}, our team is working on it. - ${adminData?.department} Dept`
    );
    
    if (message) {
      alert(`SMS Sent to ${complaint.mobile}`);
      const newRemark = {
        id: remarks.length + 1,
        author: adminData.name,
        role: adminData.department,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        text: `SMS sent: "${message}"`
      };
      setRemarks([...remarks, newRemark]);
    }
  };

  const handleAddRemark = () => {
    speak('Add your remark');
    setShowRemarkModal(true);
  };

  const handleSubmitRemark = () => {
    if (!remark.trim()) {
      alert('Please enter a remark');
      speak('Please enter a remark');
      return;
    }

    const newRemark = {
      id: remarks.length + 1,
      author: adminData.name,
      role: adminData.department,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      text: remark
    };

    setRemarks([...remarks, newRemark]);
    setRemark('');
    setShowRemarkModal(false);
    speak('Remark added successfully');
    alert('✓ Remark added successfully!');
  };

  const handleDownloadAttachment = (file) => {
    speak(`Downloading ${file.name}`);
    alert(`Downloading ${file.name}...`);
  };

  const handleBack = () => {
    speak(t.back || 'Back');
    setScreen('complaintList');
  };

  // ==================== STYLING ====================
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

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

    content: {
      padding: '40px',
      maxWidth: '1400px',
      margin: '0 auto'
    },

    pageHeader: {
      marginBottom: '30px'
    },

    tokenId: {
      fontSize: '42px',
      fontWeight: 'bold',
      color: '#2563eb',
      fontFamily: 'monospace',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    statusBadge: {
      display: 'inline-block',
      padding: '10px 25px',
      borderRadius: '25px',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },

    dateInfo: {
      fontSize: '18px',
      color: '#64748b',
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px',
      marginBottom: '30px'
    },

    card: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },

    cardTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    infoRow: {
      display: 'flex',
      padding: '15px 0',
      borderBottom: '1px solid #e2e8f0'
    },

    infoLabel: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#475569',
      minWidth: '160px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    infoValue: {
      fontSize: '18px',
      color: '#1e3a8a',
      flex: 1
    },

    problemText: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: '#334155',
      backgroundColor: '#f8fafc',
      padding: '20px',
      borderRadius: '10px',
      marginTop: '15px',
      borderLeft: '4px solid #2563eb'
    },

    actionButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '20px'
    },

    actionButton: {
      padding: '18px 25px',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },

    primaryButton: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
    },

    secondaryButton: {
      backgroundColor: '#ffffff',
      color: '#2563eb',
      border: '2px solid #2563eb'
    },

    successButton: {
      backgroundColor: '#22c55e',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
    },

    warningButton: {
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
    },

    timeline: {
      marginTop: '20px'
    },

    timelineItem: {
      padding: '20px',
      borderLeft: '4px solid #2563eb',
      marginBottom: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      marginLeft: '20px',
      position: 'relative'
    },

    timelineDate: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    timelineAction: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '5px'
    },

    timelineNote: {
      fontSize: '16px',
      color: '#475569'
    },

    attachmentsList: {
      marginTop: '15px'
    },

    attachmentItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      marginBottom: '10px',
      border: '1px solid #e2e8f0'
    },

    attachmentInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },

    attachmentIcon: {
      fontSize: '32px'
    },

    attachmentName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1e3a8a',
      marginBottom: '3px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    attachmentSize: {
      fontSize: '14px',
      color: '#64748b'
    },

    downloadButton: {
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    remarksList: {
      marginTop: '20px',
      maxHeight: '400px',
      overflowY: 'auto'
    },

    remarkItem: {
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '3px solid #2563eb'
    },

    remarkHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },

    remarkAuthor: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1e3a8a'
    },

    remarkDate: {
      fontSize: '14px',
      color: '#64748b'
    },

    remarkText: {
      fontSize: '16px',
      color: '#334155',
      lineHeight: '1.6'
    },

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
      borderRadius: '15px',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    },

    modalTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    textarea: {
      width: '100%',
      minHeight: '150px',
      padding: '15px',
      fontSize: '18px',
      borderRadius: '10px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      boxSizing: 'border-box',
      resize: 'vertical'
    },

    modalButtons: {
      display: 'flex',
      gap: '15px',
      marginTop: '20px'
    },

    priorityBadge: {
      display: 'inline-block',
      padding: '6px 16px',
      borderRadius: '15px',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: '10px'
    },

    // Back button styles (same as user screens)
    backButtonContainer: {
      marginTop: '60px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    },
    backButton: {
      padding: '20px 60px',
      fontSize: '26px',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #64748b',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#64748b',
      minWidth: '280px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    }
  };

  // Status color helper
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'In Progress': return { backgroundColor: '#ddd6fe', color: '#5b21b6' };
      case 'Resolved': return { backgroundColor: '#d1fae5', color: '#065f46' };
      default: return { backgroundColor: '#e2e8f0', color: '#475569' };
    }
  };

  // Priority color helper
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return { backgroundColor: '#fee2e2', color: '#991b1b' };
      case 'Medium': return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'Low': return { backgroundColor: '#dbeafe', color: '#1e40af' };
      default: return { backgroundColor: '#e2e8f0', color: '#475569' };
    }
  };

  // ==================== RENDER ====================
  if (!adminData || !complaint) {
    return (
      <div style={{...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '24px', color: '#64748b'}}>
          <span onClick={() => speak('Loading complaint details')} style={{ cursor: 'pointer' }}>🔊</span> 
          Loading complaint details...
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
            <div style={styles.headerTitle}>
              <span onClick={() => speak('SUVIDHA Admin - Complaint Details')} style={{ cursor: 'pointer', marginRight: '10px' }}>🔊</span>
              SUVIDHA ADMIN
            </div>
            <div style={styles.headerSubtitle}>Complaint Details</div>
          </div>
        </div>

        <button 
          style={styles.backButton}
          onClick={handleBack}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          <span style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); speak('Back to List'); }}>🔊</span>
          ← Back to List
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <div style={styles.tokenId}>
            <span onClick={() => speak(`Token ID ${complaint.tokenId}`)} style={{ cursor: 'pointer' }}>🔊</span> 
            📄 {complaint.tokenId}
          </div>
          <div>
            <span style={{...styles.statusBadge, ...getStatusStyle(complaint.status)}}>
              <span onClick={() => speak(`Status ${complaint.status}`)} style={{ cursor: 'pointer' }}>🔊</span> 
              {complaint.status}
            </span>
            <span style={{...styles.priorityBadge, ...getPriorityStyle(complaint.priority)}}>
              <span onClick={() => speak(`Priority ${complaint.priority}`)} style={{ cursor: 'pointer' }}>🔊</span> 
              {complaint.priority} Priority
            </span>
          </div>
          <div style={styles.dateInfo}>
            <span onClick={() => speak(`Submitted on ${complaint.date} at ${complaint.time}`)} style={{ cursor: 'pointer' }}>🔊</span> 
            📅 Submitted: {complaint.date} at {complaint.time}
          </div>
        </div>

        {/* Main Grid */}
        <div style={styles.mainGrid}>
          
          {/* Left Column - Main Details */}
          <div>
            
            {/* User Information */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                <span onClick={() => speak('User Information')} style={{ cursor: 'pointer' }}>🔊</span> 
                👤 User Information
              </h2>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Name')} style={{ cursor: 'pointer' }}>🔊</span> Name:
                </div>
                <div style={styles.infoValue}>{complaint.name}</div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Mobile')} style={{ cursor: 'pointer' }}>🔊</span> Mobile:
                </div>
                <div style={styles.infoValue}>{complaint.mobile}</div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Email')} style={{ cursor: 'pointer' }}>🔊</span> Email:
                </div>
                <div style={styles.infoValue}>{complaint.email}</div>
              </div>

              <div style={{...styles.infoRow, borderBottom: 'none'}}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Address')} style={{ cursor: 'pointer' }}>🔊</span> Address:
                </div>
                <div style={styles.infoValue}>{complaint.address}</div>
              </div>
            </div>

            {/* Complaint Details */}
            <div style={{...styles.card, marginTop: '30px'}}>
              <h2 style={styles.cardTitle}>
                <span onClick={() => speak('Complaint Details')} style={{ cursor: 'pointer' }}>🔊</span> 
                📋 Complaint Details
              </h2>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Department')} style={{ cursor: 'pointer' }}>🔊</span> Department:
                </div>
                <div style={styles.infoValue}>
                  {complaint.department === 'Electricity' && '⚡ '}
                  {complaint.department === 'Water' && '💧 '}
                  {complaint.department === 'Gas' && '🔥 '}
                  {complaint.department === 'Municipal' && '🏢 '}
                  {complaint.department}
                </div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Service Type')} style={{ cursor: 'pointer' }}>🔊</span> Service Type:
                </div>
                <div style={styles.infoValue}>{complaint.service}</div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Assigned To')} style={{ cursor: 'pointer' }}>🔊</span> Assigned To:
                </div>
                <div style={styles.infoValue}>{complaint.assignedTo}</div>
              </div>

              <div style={{...styles.infoRow, borderBottom: 'none'}}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Estimated Resolution')} style={{ cursor: 'pointer' }}>🔊</span> Est. Resolution:
                </div>
                <div style={styles.infoValue}>{complaint.estimatedResolution}</div>
              </div>

              <div style={{marginTop: '20px'}}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Problem Description')} style={{ cursor: 'pointer' }}>🔊</span> Problem Description:
                </div>
                <div style={styles.problemText}>
                  {complaint.problem}
                </div>
              </div>
            </div>

            {/* Attachments */}
            {complaint.attachments && complaint.attachments.length > 0 && (
              <div style={{...styles.card, marginTop: '30px'}}>
                <h2 style={styles.cardTitle}>
                  <span onClick={() => speak(`Attachments ${complaint.attachments.length}`)} style={{ cursor: 'pointer' }}>🔊</span> 
                  📎 Attachments ({complaint.attachments.length})
                </h2>

                <div style={styles.attachmentsList}>
                  {complaint.attachments.map((file, index) => (
                    <div key={index} style={styles.attachmentItem}>
                      <div style={styles.attachmentInfo}>
                        <div style={styles.attachmentIcon}>
                          {file.type === 'image' ? '🖼️' : '📄'}
                        </div>
                        <div>
                          <div style={styles.attachmentName}>
                            <span onClick={() => speak(file.name)} style={{ cursor: 'pointer' }}>🔊</span> 
                            {file.name}
                          </div>
                          <div style={styles.attachmentSize}>{file.size}</div>
                        </div>
                      </div>
                      <button
                        style={styles.downloadButton}
                        onClick={() => handleDownloadAttachment(file)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                      >
                        <span onClick={(e) => { e.stopPropagation(); speak('Download'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                        ⬇️ Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remarks/Comments */}
            <div style={{...styles.card, marginTop: '30px'}}>
              <h2 style={styles.cardTitle}>
                <span onClick={() => speak(`Remarks and Comments ${remarks.length}`)} style={{ cursor: 'pointer' }}>🔊</span> 
                💬 Remarks & Comments ({remarks.length})
              </h2>

              <div style={styles.remarksList}>
                {remarks.map((remarkItem) => (
                  <div key={remarkItem.id} style={styles.remarkItem}>
                    <div style={styles.remarkHeader}>
                      <div style={styles.remarkAuthor}>
                        {remarkItem.author} ({remarkItem.role})
                      </div>
                      <div style={styles.remarkDate}>
                        {remarkItem.date} • {remarkItem.time}
                      </div>
                    </div>
                    <div style={styles.remarkText}>{remarkItem.text}</div>
                  </div>
                ))}
              </div>

              <button
                style={{...styles.actionButton, ...styles.secondaryButton, marginTop: '15px', width: '100%'}}
                onClick={handleAddRemark}
              >
                <span onClick={(e) => { e.stopPropagation(); speak('Add Remark'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                ➕ Add Remark
              </button>
            </div>

          </div>

          {/* Right Column - Actions & Timeline */}
          <div>
            
            {/* Quick Actions */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                <span onClick={() => speak('Quick Actions')} style={{ cursor: 'pointer' }}>🔊</span> 
                ⚡ Quick Actions
              </h2>

              <div style={styles.actionButtons}>
                <button
                  style={{...styles.actionButton, ...styles.primaryButton, gridColumn: '1 / -1'}}
                  onClick={handleUpdateStatus}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  <span onClick={(e) => { e.stopPropagation(); speak('Update Status'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                  <span>📝</span> Update Status
                </button>

                <button
                  style={{...styles.actionButton, ...styles.successButton}}
                  onClick={handleCallUser}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
                >
                  <span onClick={(e) => { e.stopPropagation(); speak('Call User'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                  <span>📞</span> Call User
                </button>

                <button
                  style={{...styles.actionButton, ...styles.warningButton}}
                  onClick={handleSendSMS}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                >
                  <span onClick={(e) => { e.stopPropagation(); speak('Send SMS'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                  <span>📱</span> Send SMS
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div style={{...styles.card, marginTop: '30px'}}>
              <h2 style={styles.cardTitle}>
                <span onClick={() => speak('Timeline')} style={{ cursor: 'pointer' }}>🔊</span> 
                🕐 Timeline
              </h2>

              <div style={styles.timeline}>
                {complaint.timeline.map((item, index) => (
                  <div key={index} style={styles.timelineItem}>
                    <div style={styles.timelineDate}>
                      <span onClick={() => speak(`${item.date} at ${item.time}`)} style={{ cursor: 'pointer' }}>🔊</span> 
                      {item.date} • {item.time}
                    </div>
                    <div style={styles.timelineAction}>
                      <span onClick={() => speak(item.action)} style={{ cursor: 'pointer' }}>🔊</span> 
                      {item.action}
                    </div>
                    <div style={styles.timelineNote}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div style={{...styles.card, marginTop: '30px'}}>
              <h2 style={styles.cardTitle}>
                <span onClick={() => speak('Additional Information')} style={{ cursor: 'pointer' }}>🔊</span> 
                ℹ️ Additional Info
              </h2>

              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Previous Complaints')} style={{ cursor: 'pointer' }}>🔊</span> Previous Complaints:
                </div>
                <div style={styles.infoValue}>{complaint.previousComplaints}</div>
              </div>

              <div style={{...styles.infoRow, borderBottom: 'none'}}>
                <div style={styles.infoLabel}>
                  <span onClick={() => speak('Department')} style={{ cursor: 'pointer' }}>🔊</span> Department:
                </div>
                <div style={styles.infoValue}>{complaint.department}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Back Button - Bottom Center */}
        <div style={styles.backButtonContainer}>
          <button
             style={styles.backButton}
             onClick={() => {
               speak(t.back || 'Back to Complaint List');
              setScreen('complaintList');  // ← yeh line se clear ho jayega kahan ja raha hai
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
         >
             <span 
               style={{ cursor: 'pointer' }} 
               onClick={(e) => { 
                 e.stopPropagation(); 
                 speak(t.back || 'Back'); 
              }}
            >
              🔊
            </span>
             ← {t.back || 'Back'}
          </button>
        </div>

      </div>

      {/* Add Remark Modal */}
      {showRemarkModal && (
        <div style={styles.modal} onClick={() => setShowRemarkModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>
              <span onClick={() => speak('Add Remark')} style={{ cursor: 'pointer' }}>🔊</span> 
              💬 Add Remark
            </h2>
            
            <textarea
              style={styles.textarea}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter your remark or comment here..."
              autoFocus
            />

            <div style={styles.modalButtons}>
              <button
                style={{...styles.actionButton, ...styles.primaryButton, flex: 2}}
                onClick={handleSubmitRemark}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                <span onClick={(e) => { e.stopPropagation(); speak('Submit'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                ✓ Submit
              </button>
              <button
                style={{...styles.actionButton, ...styles.secondaryButton, flex: 1}}
                onClick={() => {
                  setShowRemarkModal(false);
                  setRemark('');
                  speak('Cancelled');
                }}
              >
                <span onClick={(e) => { e.stopPropagation(); speak('Cancel'); }} style={{ cursor: 'pointer' }}>🔊</span> 
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ComplaintDetail;