import React, { useState } from 'react';

/**
 * SUVIDHA ADMIN PANEL - LOGIN SCREEN
 * 
 * Purpose: Allow government officers to log in to their department's complaint management system
 * 
 * Features:
 * - Employee ID field
 * - Password field
 * - Department dropdown selection
 * - Touch-friendly large buttons
 * - Accessibility-focused design
 * - Dummy authentication (replace with real API later)
 */

function AdminLogin() {
  // ==================== STATE MANAGEMENT ====================
  
  // Form input states
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ==================== DUMMY DATA ====================
  
  /**
   * Dummy admin credentials for testing
   * In production, replace this with real API authentication
   */
  const dummyAdmins = [
    { employeeId: 'EMP001', password: 'admin123', department: 'Electricity', name: 'Rajesh Kumar' },
    { employeeId: 'EMP002', password: 'admin123', department: 'Water', name: 'Priya Sharma' },
    { employeeId: 'EMP003', password: 'admin123', department: 'Gas', name: 'Amit Patel' },
    { employeeId: 'EMP004', password: 'admin123', department: 'Municipal', name: 'Sunita Verma' },
    { employeeId: 'ADMIN', password: 'admin123', department: 'All', name: 'Super Admin' }
  ];

  // Department options
  const departments = [
    { value: 'Electricity', label: '⚡ Electricity Department', icon: '⚡' },
    { value: 'Water', label: '💧 Water Supply Department', icon: '💧' },
    { value: 'Gas', label: '🔥 Gas Department', icon: '🔥' },
    { value: 'Municipal', label: '🏢 Municipal Services', icon: '🏢' },
    { value: 'All', label: '👑 All Departments (Admin)', icon: '👑' }
  ];

  // ==================== HANDLERS ====================
  
  /**
   * Handle login form submission
   */
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!employeeId.trim()) {
      setError('Please enter Employee ID');
      return;
    }

    if (!password.trim()) {
      setError('Please enter Password');
      return;
    }

    if (!department) {
      setError('Please select Department');
      return;
    }

    // Simulate loading
    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Check credentials against dummy data
      const admin = dummyAdmins.find(
        (admin) =>
          admin.employeeId === employeeId &&
          admin.password === password &&
          admin.department === department
      );

      if (admin) {
        // Success - Store admin data in localStorage
        localStorage.setItem('suvidhaAdmin', JSON.stringify(admin));
        
        // Show success message
        alert(`✓ Login Successful!\n\nWelcome ${admin.name}\nDepartment: ${admin.department}`);
        
        // In real app, navigate to dashboard
        // Example: window.location.href = '/admin/dashboard';
        // Or using React Router: history.push('/admin/dashboard');
        
        console.log('Login successful:', admin);
      } else {
        // Failed login
        setError('❌ Invalid credentials or department mismatch');
      }

      setLoading(false);
    }, 1500); // 1.5 second delay to simulate network request
  };

  /**
   * Clear all form fields
   */
  const handleClear = () => {
    setEmployeeId('');
    setPassword('');
    setDepartment('');
    setError('');
  };

  // ==================== STYLING ====================
  
  const styles = {
    // Main container
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

    // Login card
    loginCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '50px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
      maxWidth: '600px',
      width: '100%'
    },

    // Header section
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },

    logo: {
      fontSize: '64px',
      marginBottom: '10px'
    },

    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '8px',
      letterSpacing: '1px'
    },

    subtitle: {
      fontSize: '20px',
      color: '#64748b',
      fontWeight: '500'
    },

    // Form elements
    form: {
      width: '100%'
    },

    formGroup: {
      marginBottom: '30px'
    },

    label: {
      display: 'block',
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '10px'
    },

    input: {
      width: '100%',
      padding: '18px 20px',
      fontSize: '20px',
      borderRadius: '12px',
      border: '3px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },

    select: {
      width: '100%',
      padding: '18px 20px',
      fontSize: '20px',
      borderRadius: '12px',
      border: '3px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },

    // Password field wrapper
    passwordWrapper: {
      position: 'relative'
    },

    // Show/Hide password button
    togglePassword: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '5px',
      outline: 'none'
    },

    // Error message
    error: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      padding: '15px 20px',
      borderRadius: '10px',
      fontSize: '18px',
      marginBottom: '20px',
      border: '2px solid #fecaca',
      fontWeight: '600',
      textAlign: 'center'
    },

    // Buttons container
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px'
    },

    // Login button
    loginButton: {
      flex: 2,
      padding: '20px 40px',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
      backgroundColor: loading ? '#94a3b8' : '#2563eb',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
      transition: 'all 0.3s ease',
      outline: 'none'
    },

    // Clear button
    clearButton: {
      flex: 1,
      padding: '20px 30px',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #64748b',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#64748b',
      transition: 'all 0.3s ease',
      outline: 'none'
    },

    // Demo credentials box
    demoBox: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#f0fdf4',
      borderRadius: '12px',
      border: '2px solid #86efac'
    },

    demoTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '10px'
    },

    demoText: {
      fontSize: '16px',
      color: '#166534',
      lineHeight: '1.6',
      fontFamily: 'monospace'
    }
  };

  // ==================== RENDER ====================
  
  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🏛️</div>
          <h1 style={styles.title}>SUVIDHA ADMIN</h1>
          <p style={styles.subtitle}>Government Service Portal</p>
        </div>

        {/* Login Form */}
        <form style={styles.form} onSubmit={handleLogin}>
          
          {/* Error Message */}
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {/* Employee ID Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>👤 Employee ID</label>
            <input
              type="text"
              style={styles.input}
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
              placeholder="Enter your Employee ID"
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>🔒 Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                style={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Department Selection */}
          <div style={styles.formGroup}>
            <label style={styles.label}>🏢 Department</label>
            <select
              style={styles.select}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={loading}
            >
              <option value="">-- Select Your Department --</option>
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.loginButton}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = '#2563eb';
              }}
            >
              {loading ? '⏳ Logging in...' : '✓ Login'}
            </button>

            <button
              type="button"
              style={styles.clearButton}
              onClick={handleClear}
              disabled={loading}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
            >
              ✕ Clear
            </button>
          </div>
        </form>

        {/* Demo Credentials Box */}
        <div style={styles.demoBox}>
          <div style={styles.demoTitle}>🧪 Demo Credentials (for testing):</div>
          <div style={styles.demoText}>
            ID: EMP001 | Password: admin123 | Dept: Electricity<br />
            ID: EMP002 | Password: admin123 | Dept: Water<br />
            ID: ADMIN | Password: admin123 | Dept: All
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;