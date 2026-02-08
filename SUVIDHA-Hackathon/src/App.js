import React, { useState, useEffect } from 'react';
import { createComplaint, getComplaintById } from './api';
import "./accessibility.css";

/**
 * SUVIDHA - Government Public Service Kiosk Application
 * Complete React App with multilingual support and accessibility features
 */

// ==================== SCREEN COMPONENTS (OUTSIDE App) ====================

/**
 * SCREEN 1: Welcome Screen
 */
const WelcomeScreen = ({ styles, t, setScreen, speak }) => (   // ← add speak prop
  <div style={styles.screenContainer}>
    <h1 style={styles.title}>🏛️ SUVIDHA</h1>
    <p style={styles.subtitle}>{t.welcomeSubtitle}</p>
    
    <button 
      style={styles.button}
      onClick={() => setScreen('language')}
      // ... mouse events ...
    >
      
      {t.start}
    </button>

    {/* Add clickable speaker for main content */}
    <span 
      style={{ cursor: 'pointer', fontSize: '36px', marginLeft: '10px' }}
      onClick={() => speak(`${t.welcome} - ${t.welcomeSubtitle}. ${t.start}`)}
      title="Read aloud"
    >
      🔊
    </span>
  </div>
);

/**
 * SCREEN 2: Language Selection Screen
 */
const LanguageScreen = ({ styles, t, language, setLanguage, setScreen, speak, language: currentLang }) => (
  <div style={styles.screenContainer}>
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 style={styles.sectionTitle}>{t.selectLanguage}</h2>
      
      {/* Single speaker – top right */}
      <span
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '48px',
          cursor: 'pointer',
        }}
        onClick={() => speak(
          `${t.selectLanguage}. ` +
          `The available languages are: ` +
          `English, ` +
          `Hindi, ` +
          `Bengali, ` +
          `Telugu, ` +
          `Marathi, ` +
          `Tamil, ` +
          `and Gujarati. ` +
          `Please choose one by clicking on it.` +
          `${t.back} button to go back to welcome screen.`,
          currentLang
          
        )}
        title="Read aloud"
      >
        🔊
      </span>
    </div>
    
    <div style={styles.buttonGrid}>
      {[
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'te', name: 'తెలుగు' },
        { code: 'mr', name: 'मराठी' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'gu', name: 'ગુજરાતી' }
      ].map((lang) => (
        <button
          key={lang.code}
          style={{
            ...styles.languageButton,
            backgroundColor: language === lang.code ? '#2563eb' : '#ffffff',
            color: language === lang.code ? '#ffffff' : '#2563eb'
          }}
          onClick={() => {
            setLanguage(lang.code);
            setScreen('department');
          }}
          onMouseEnter={(e) => {
            if (language !== lang.code) {
              e.target.style.backgroundColor = '#eff6ff';
            }
          }}
          onMouseLeave={(e) => {
            if (language !== lang.code) {
              e.target.style.backgroundColor = '#ffffff';
            }
          }}
        >
          {lang.name}
        </button>
      ))}
    </div>
    
    <button style={styles.backButton} onClick={() => setScreen('welcome')}>
      ← {t.back}
    </button>
  </div>
);

/**
 * SCREEN 3: Department Selection Screen
 */
const DepartmentScreen = ({ styles, t, selectDepartment, setScreen, speak, language }) => (
  <div style={styles.screenContainer}>
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 style={styles.sectionTitle}>{t.selectDepartment}</h2>
      
      <span
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '48px',
          cursor: 'pointer',
        }}
        onClick={() => speak(
          `${t.selectDepartment}. ` +
          `${t.availableDepartments} ${t.electricity}, ${t.water}, ${t.gas}, ${t.municipal}. ` +
          `${t.chooseOneByClicking}.` ,
          language
        )}
        title="Read aloud"
      >
        🔊
      </span>
    </div>
    
    <div style={styles.buttonGrid}>
      {[
        { id: 'electricity', icon: '⚡', label: t.electricity },
        { id: 'water', icon: '💧', label: t.water },
        { id: 'gas', icon: '🔥', label: t.gas },
        { id: 'municipal', icon: '🏢', label: t.municipal }
      ].map((dept) => (
        <button
          key={dept.id}
          style={styles.button}
          onClick={() => selectDepartment(dept.label)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          <span style={{ fontSize: '40px' }}>{dept.icon}</span>
          {dept.label}
        </button>
      ))}
    </div>
    
    <button style={styles.backButton} onClick={() => setScreen('language')}>
      ← {t.back}
    </button>
  </div>
);

/**
 * SCREEN 4: Service Selection Screen
 */
const ServiceScreen = ({ styles, t, selectService, setScreen, speak, language }) => (
  <div style={styles.screenContainer}>
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 style={styles.sectionTitle}>{t.selectService}</h2>
      
      <span
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '48px',
          cursor: 'pointer',
        }}
        onClick={() => speak(
          `${t.selectService}. ` +
          `${t.availableServices} ${t.complaint}, ${t.newApplication}, ${t.trackStatus}. ` +
          `${t.chooseOneByClicking}.`,
          language
        )}
        title="Read aloud"
      >
        🔊
      </span>
    </div>
    
    <div style={styles.buttonGrid}>
      {[
        { id: 'complaint', icon: '📝', label: t.complaint },
        { id: 'newApplication', icon: '📄', label: t.newApplication },
        { id: 'trackStatus', icon: '🔍', label: t.trackStatus }
      ].map((service) => (
        <button
          key={service.id}
          style={styles.button}
          onClick={() => selectService(service.label)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          <span style={{ fontSize: '40px' }}>{service.icon}</span>
          {service.label}
        </button>
      ))}
    </div>
    
    <button style={styles.backButton} onClick={() => setScreen('department')}>
      ← {t.back}
    </button>
  </div>
);

/**
 * SCREEN 5: Form Screen
 */
const FormScreen = ({ styles, t, userData, setUserData, handleFormSubmit, setScreen, speak, language }) => {
  const [fileName, setFileName] = useState('');  // to show selected file name

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Store in userData so we can send to backend
      setUserData({ ...userData, file_name: file.name });
    }
  };

  return (
    <div style={styles.screenContainer}>
      <div style={{ position: 'relative', width: '100%' }}>
        <h2 style={styles.sectionTitle}>{t.fillForm}</h2>
        
        <span
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            fontSize: '48px',
            cursor: 'pointer',
          }}
          onClick={() => speak(
            `${t.fillForm}. ` +
            `${t.name}: ${userData.name || t.enterYourName}. ` +
            `${t.mobile}: ${userData.mobile || t.enterMobile}. ` +
            `${t.problem}: ${userData.problem || t.describeProblem}. ` +
            `You can also upload a photo or document as proof if needed. ` +
            `${t.next} when done.`,
            language
          )}
          title="Read aloud"
        >
          🔊
        </span>
      </div>
      
      <div style={styles.formContainer}>
        {/* Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>{t.name}</label>
          <input
            type="text"
            style={styles.input}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder={t.name}
          />
        </div>

        {/* Mobile */}
        <div style={styles.formGroup}>
          <label style={styles.label}>{t.mobile}</label>
          <input
            type="tel"
            maxLength="10"
            style={styles.input}
            value={userData.mobile}
            onChange={(e) => setUserData({ ...userData, mobile: e.target.value.replace(/\D/g, '') })}
            placeholder="10-digit number"
          />
        </div>

        {/* Problem */}
        <div style={styles.formGroup}>
          <label style={styles.label}>{t.problem}</label>
          <textarea
            style={styles.textarea}
            value={userData.problem}
            onChange={(e) => setUserData({ ...userData, problem: e.target.value })}
            placeholder={t.problem}
          />
        </div>

        {/* NEW: Document Upload */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Upload Proof / Photo / Document (optional)
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '22px',
              border: '3px solid #cbd5e1',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
            }}
          />
          {fileName && (
            <p style={{ marginTop: '10px', fontSize: '20px', color: '#2563eb' }}>
              Selected file: {fileName}
            </p>
          )}
        </div>

        <div style={styles.navButtons}>
          <button style={styles.backButton} onClick={() => setScreen('service')}>
            ← {t.back}
          </button>
          <button
            style={{...styles.button, minWidth: '200px'}}
            onClick={handleFormSubmit}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * SCREEN 6: Confirm Screen
 */
const ConfirmScreen = ({ styles, t, userData, handleConfirm, setScreen, isSubmitting, speak, language }) => (
  <div style={styles.screenContainer}>
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 style={styles.sectionTitle}>{t.confirm}</h2>
      
      <span
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '48px',
          cursor: 'pointer',
        }}
        onClick={() => speak(
          `${t.confirm}. ${t.reviewAllDetails}. ` +
          `${t.department}: ${userData.department}. ` +
          `${t.service}: ${userData.service}. ` +
          `${t.name}: ${userData.name}. ` +
          `${t.mobile}: ${userData.mobile}. ` +
          `${t.problem}: ${userData.problem}. ` +
          `${t.ifCorrectSubmit}`,
          language
        )}
        title="Read aloud"
      >
        🔊
      </span>
    </div>
    
    <p style={{ fontSize: '24px', color: '#64748b', marginBottom: '30px' }}>
      {t.reviewDetails}
    </p>
    
    <div style={styles.confirmBox}>
      <div style={styles.confirmRow}>
        <span style={styles.confirmLabel}>{t.department}:</span>
        <span style={styles.confirmValue}>{userData.department}</span>
      </div>
      
      <div style={styles.confirmRow}>
        <span style={styles.confirmLabel}>{t.service}:</span>
        <span style={styles.confirmValue}>{userData.service}</span>
      </div>
      
      <div style={styles.confirmRow}>
        <span style={styles.confirmLabel}>{t.name}:</span>
        <span style={styles.confirmValue}>{userData.name}</span>
      </div>
      
      <div style={styles.confirmRow}>
        <span style={styles.confirmLabel}>{t.mobile}:</span>
        <span style={styles.confirmValue}>{userData.mobile}</span>
      </div>
      
      <div style={{...styles.confirmRow, borderBottom: 'none'}}>
        <span style={styles.confirmLabel}>{t.problem}:</span>
        <span style={styles.confirmValue}>{userData.problem}</span>
      </div>
    </div>
    
    <div style={styles.navButtons}>
      <button style={styles.backButton} onClick={() => setScreen('form')}>
        ← {t.back}
      </button>
      <button
        style={{...styles.button, backgroundColor: '#22c55e', minWidth: '250px', opacity: isSubmitting ? 0.6 : 1}}
        onClick={handleConfirm}
        disabled={isSubmitting}
        onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#16a34a')}
        onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#22c55e')}
      >
        {isSubmitting ? 'Submitting...' : `✓ ${t.submit}`}
      </button>
    </div>
  </div>
);

/**
 * SCREEN 7: Receipt Screen
 */
const ReceiptScreen = ({ styles, t, token, userData, resetApp, speak, language }) => (
  <div style={styles.screenContainer}>
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 style={{...styles.sectionTitle, color: '#22c55e'}}>✓ {t.receipt}</h2>
      
      <span
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '48px',
          cursor: 'pointer',
        }}
        onClick={() => speak(
          `${t.receipt}. ` +
          `${t.tokenIs} ${token}. ` +
          `${t.smsSentTo} ${userData.mobile}. ` +
          `${t.registeredSuccessfully}. ` +
          `${t.thankYouMessage}. ${t.keepTokenForRef}.`,
          language
        )}
        title="Read aloud"
      >
        🔊
      </span>
    </div>
    
    <div style={styles.receiptBox}>
      <p style={styles.receiptText}>{t.tokenNumber}</p>
      <div style={styles.tokenDisplay}>#{token}</div>
      <p style={{ fontSize: '22px', color: '#166534' }}>
        {t.registeredSuccessfully}
      </p>
      <p style={styles.receiptText}>📱 {t.smsSentTo}</p>
      <p style={styles.receiptText}>{t.mobile}: {userData.mobile}</p>
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px dashed #86efac' }} />
      <p style={{...styles.receiptText, fontSize: '30px', fontWeight: 'bold'}}>
        {t.thankYou}
      </p>
      <p style={styles.receiptText}>{t.keepToken}</p>
    </div>
    
    <button
      style={{...styles.button, backgroundColor: '#2563eb', minWidth: '300px'}}
      onClick={resetApp}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
    >
      🏠 {t.home}
    </button>
  </div>
);

const TrackStatusScreen = ({ styles, t, setScreen, speak, language }) => {
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = async () => {
    const id = trackId.trim();
    if (!id || isNaN(id)) {
      setTrackError(t.enterValidToken);
      return;
    }

    setIsTracking(true);
    setTrackError('');
    setTrackResult(null);

    try {
      const result = await getComplaintById(id);
      setTrackResult(result);
    } catch (err) {
      setTrackError(t.invalidToken);
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div style={styles.screenContainer}>
      <div style={{ position: 'relative', width: '100%' }}>
        <h2 style={styles.sectionTitle}>{t.trackStatus}</h2>
        
        <span
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            fontSize: '48px',
            cursor: 'pointer',
          }}
          onClick={() => speak(
            `${t.trackStatus}. ` +
            `${t.enterTokenToTrack}. ` +
            `${t.clickTrackToSeeStatus}.`,
            language
          )}
          title="Read aloud"
        >
          🔊
        </span>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>
          {t.tokenNumber}
        </label>
        <input
          type="text"
          style={styles.input}
          value={trackId}
          onChange={(e) => {
            let val = e.target.value.trim();
            if (val.startsWith('#')) val = val.substring(1);
            setTrackId(val);
          }}
          placeholder={t.enterTokenInstruction}
        />
      </div>

      {trackError && (
        <p style={{ color: 'red', fontSize: '22px', margin: '15px 0' }}>
          {trackError}
        </p>
      )}

      <div style={styles.navButtons}>
        <button style={styles.backButton} onClick={() => setScreen('service')}>
          ← {t.back}
        </button>
        <button
          style={{
            ...styles.button,
            minWidth: '250px',
            opacity: isTracking ? 0.6 : 1,
          }}
          onClick={handleTrack}
          disabled={isTracking}
        >
          {isTracking ? 'Checking...' : t.trackStatus}
        </button>
      </div>

      {trackResult && (
        <div style={{
          marginTop: '40px',
          backgroundColor: '#f0fdf4',
          padding: '30px',
          borderRadius: '15px',
          border: '2px solid #86efac',
          width: '100%',
          maxWidth: '600px'
        }}>
          <h3 style={{ color: '#15803d', marginBottom: '20px' }}>
            {t.complaintDetails}  {/* Add new key if needed */}
          </h3>
          
          <div style={{ fontSize: '22px', lineHeight: '1.6' }}>
            <p><strong>{t.tokenIs}:</strong> #{trackResult.id}</p>
            <p><strong>{t.status}:</strong> <span style={{
              color: trackResult.status === 'RESOLVED' ? '#22c55e' : 
                     trackResult.status === 'IN_PROGRESS' ? '#f59e0b' : '#ef4444',
              fontWeight: 'bold'
            }}>
              {trackResult.status}
            </span></p>
            <p><strong>{t.department} / {t.issue}:</strong> {trackResult.issue_type}</p>
            <p><strong>{t.description}:</strong> {trackResult.description}</p>
            <p><strong>{t.location}:</strong> {trackResult.location || t.notProvided}</p>
            <p><strong>{t.submittedOn}:</strong> {new Date(trackResult.created_at).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== MAIN APP COMPONENT ====================

function App() {
  // ==================== STATE MANAGEMENT ====================
  
  const [screen, setScreen] = useState('welcome');
  const [language, setLanguage] = useState('en');
  const [userData, setUserData] = useState({
    department: '',
    service: '',
    name: '',
    mobile: '',
    problem: ''
  });
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  // ==================== MULTILINGUAL TEXT DATA ====================
  
  const translations = {
    en: {
      welcome: 'Welcome to SUVIDHA',
      welcomeSubtitle: 'Government Public Service Kiosk',
      start: 'Start',
      selectLanguage: 'Select Your Language',
      selectDepartment: 'Select Department',
      selectService: 'Select Service',
      fillForm: 'Fill Your Details',
      confirm: 'Confirm Your Details',
      receipt: 'Your Request is Submitted',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      home: 'Home',
      electricity: 'Electricity',
      water: 'Water Supply',
      gas: 'Gas',
      municipal: 'Municipal Services',
      complaint: 'Register Complaint',
      newApplication: 'New Application',
      trackStatus: 'Track Status',
      name: 'Full Name',
      mobile: 'Mobile Number',
      problem: 'Describe Your Problem / Request',
      reviewDetails: 'Please review your details',
      department: 'Department',
      service: 'Service',
      tokenNumber: 'Token Number',
      smsMessage: 'SMS sent to your mobile number',
      thankYou: 'Thank you for using SUVIDHA',
      keepToken: 'Please keep this token for reference',
      availableLanguages: 'The available languages are',
      chooseLanguagePrompt: 'Please choose your preferred language by clicking on it.',
      availableDepartments: 'Available departments are',
      availableServices: 'Available services are',
      enterYourName: 'Enter your full name here',
      enterMobile: 'Enter your 10-digit mobile number here',
      describeProblem: 'Describe your problem or request here',
      reviewAllDetails: 'Please review all details below',
      ifCorrectSubmit: 'If everything is correct, click submit.',
      tokenIs: 'Token number is',
      smsSentTo: 'SMS has been sent to',
      registeredSuccessfully: 'Complaint registered successfully',
      thankYouMessage: 'Thank you for using SUVIDHA',
      keepTokenForRef: 'Please keep this token for reference',
      enterTokenToTrack: 'Enter your token number to track status',
      clickTrack: 'Click Track to see the current status'
    },
    hi: {
      welcome: 'सुविधा में आपका स्वागत है',
      welcomeSubtitle: 'सरकारी सार्वजनिक सेवा केंद्र',
      start: 'शुरू करें',
      selectLanguage: 'अपनी भाषा चुनें',
      selectDepartment: 'विभाग चुनें',
      selectService: 'सेवा चुनें',
      fillForm: 'अपना विवरण भरें',
      confirm: 'अपना विवरण सत्यापित करें',
      receipt: 'आपका अनुरोध जमा हो गया है',
      back: 'पीछे',
      next: 'आगे',
      submit: 'जमा करें',
      home: 'होम',
      electricity: 'बिजली',
      water: 'जल आपूर्ति',
      gas: 'गैस',
      municipal: 'नगरपालिका सेवाएं',
      complaint: 'शिकायत दर्ज करें',
      newApplication: 'नया आवेदन',
      trackStatus: 'स्थिति ट्रैक करें',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      problem: 'अपनी समस्या / अनुरोध का विवरण दें',
      reviewDetails: 'कृपया अपना विवरण जांचें',
      department: 'विभाग',
      service: 'सेवा',
      tokenNumber: 'टोकन नंबर',
      smsMessage: 'आपके मोबाइल नंबर पर SMS भेजा गया',
      thankYou: 'सुविधा का उपयोग करने के लिए धन्यवाद',
      keepToken: 'कृपया इस टोकन को संदर्भ के लिए रखें',
      availableLanguages: 'उपलब्ध भाषाएँ हैं',
      chooseLanguagePrompt: 'कृपया अपनी पसंदीदा भाषा पर क्लिक करके चुनें।',
      availableDepartments: 'उपलब्ध विभाग हैं',
      availableServices: 'उपलब्ध सेवाएँ हैं',
      enterYourName: 'यहाँ अपना पूरा नाम दर्ज करें',
      enterMobile: 'यहाँ अपना 10 अंकों का मोबाइल नंबर दर्ज करें',
      describeProblem: 'यहाँ अपनी समस्या या अनुरोध का वर्णन करें',
      reviewAllDetails: 'कृपया नीचे सभी विवरणों की समीक्षा करें',
      ifCorrectSubmit: 'यदि सब कुछ सही है, तो सबमिट पर क्लिक करें।',
      tokenIs: 'टोकन नंबर है',
      smsSentTo: 'आपके मोबाइल पर SMS भेजा गया है',
      registeredSuccessfully: 'शिकायत सफलतापूर्वक दर्ज की गई',
      thankYouMessage: 'SUVIDHA का उपयोग करने के लिए धन्यवाद',
      keepTokenForRef: 'संदर्भ के लिए इस टोकन को रखें',
      enterTokenToTrack: 'अपना टोकन नंबर दर्ज करें',
      clickTrack: 'वर्तमान स्थिति देखने के लिए ट्रैक पर क्लिक करें',
    },
    bn: {
      welcome: 'সুবিধায় স্বাগতম',
      welcomeSubtitle: 'সরকারি জনসেবা কেন্দ্র',
      start: 'শুরু করুন',
      selectLanguage: 'আপনার ভাষা নির্বাচন করুন',
      selectDepartment: 'বিভাগ নির্বাচন করুন',
      selectService: 'সেবা নির্বাচন করুন',
      fillForm: 'আপনার বিবরণ পূরণ করুন',
      confirm: 'আপনার বিবরণ নিশ্চিত করুন',
      receipt: 'আপনার অনুরোধ জমা হয়েছে',
      back: 'পিছনে',
      next: 'পরবর্তী',
      submit: 'জমা দিন',
      home: 'হোম',
      electricity: 'বিদ্যুৎ',
      water: 'জল সরবরাহ',
      gas: 'গ্যাস',
      municipal: 'পৌর সেবা',
      complaint: 'অভিযোগ নিবন্ধন করুন',
      newApplication: 'নতুন আবেদন',
      trackStatus: 'স্ট্যাটাস ট্র্যাক করুন',
      name: 'পুরো নাম',
      mobile: 'মোবাইল নম্বর',
      problem: 'আপনার সমস্যা / অনুরোধ বর্ণনা করুন',
      reviewDetails: 'আপনার বিবরণ পর্যালোচনা করুন',
      department: 'বিভাগ',
      service: 'সেবা',
      tokenNumber: 'টোকেন নম্বর',
      smsMessage: 'আপনার মোবাইল নম্বরে SMS পাঠানো হয়েছে',
      thankYou: 'সুবিধা ব্যবহারের জন্য ধন্যবাদ',
      keepToken: 'রেফারেন্সের জন্য এই টোকেন রাখুন',
      availableLanguages: 'উপলব্ধ ভাষাগুলি হলো',
      chooseLanguagePrompt: 'আপনার পছন্দের ভাষা নির্বাচন করতে এটির উপর ক্লিক করুন।',
      availableDepartments: 'উপলব্ধ বিভাগগুলি হলো',
      availableServices: 'উপলব্ধ পরিষেবাগুলি হলো',
  enterYourName: 'এখানে আপনার পুরো নাম লিখুন',
  enterMobile: 'এখানে আপনার ১০ সংখ্যার মোবাইল নম্বর লিখুন',
  describeProblem: 'এখানে আপনার সমস্যা বা অনুরোধ বর্ণনা করুন',
  reviewAllDetails: 'নীচে সমস্ত বিবরণ পর্যালোচনা করুন',
  ifCorrectSubmit: 'সবকিছু ঠিক থাকলে সাবমিট বোতামে ক্লিক করুন',
  tokenIs: 'টোকেন নম্বর হলো',
  smsSentTo: 'আপনার মোবাইল নম্বরে SMS পাঠানো হয়েছে',
  registeredSuccessfully: 'অভিযোগ সফলভাবে নিবন্ধিত হয়েছে',
  thankYouMessage: 'SUVIDHA ব্যবহার করার জন্য ধন্যবাদ',
  keepTokenForRef: 'রেফারেন্সের জন্য এই টোকেনটি রাখুন',
  enterTokenToTrack: 'আপনার টোকেন নম্বর লিখুন',
  clickTrack: 'বর্তমান অবস্থা দেখতে ট্র্যাক বোতামে ক্লিক করুন',
  enterValidToken: 'দয়া করে বৈধ সংখ্যার টোকেন লিখুন (যেমন ২)',
  invalidToken: 'অবৈধ টোকেন বা সার্ভার ত্রুটি। দয়া করে আবার চেষ্টা করুন।',
  enterTokenInstruction: 'আপনার টোকেন নম্বর লিখুন',
  clickTrackToSeeStatus: 'বর্তমান অবস্থা দেখতে ট্র্যাক বোতামে ক্লিক করুন',

    },
    te: {
      welcome: 'సువిధకు స్వాగతం',
      welcomeSubtitle: 'ప్రభుత్వ ప్రజా సేవా కేంద్రం',
      start: 'ప్రారంభించండి',
      selectLanguage: 'మీ భాషను ఎంచుకోండి',
      selectDepartment: 'విభాగాన్ని ఎంచుకోండి',
      selectService: 'సేవను ఎంచుకోండి',
      fillForm: 'మీ వివరాలను పూరించండి',
      confirm: 'మీ వివరాలను నిర్ధారించండి',
      receipt: 'మీ అభ్యర్థన సమర్పించబడింది',
      back: 'వెనుకకు',
      next: 'తదుపరి',
      submit: 'సమర్పించండి',
      home: 'హోం',
      electricity: 'విద్యుత్',
      water: 'నీటి సరఫరా',
      gas: 'గ్యాస్',
      municipal: 'మునిసిపల్ సేవలు',
      complaint: 'ఫిర్యాదు నమోదు చేయండి',
      newApplication: 'కొత్త దరఖాస్తు',
      trackStatus: 'స్థితిని ట్రాక్ చేయండి',
      name: 'పూర్తి పేరు',
      mobile: 'మొబైల్ నంబర్',
      problem: 'మీ సమస్య / అభ్యర్థనను వివరించండి',
      reviewDetails: 'దయచేసి మీ వివరాలను సమీక్షించండి',
      department: 'విభాగం',
      service: 'సేవ',
      tokenNumber: 'టోకెన్ నంబర్',
      smsMessage: 'మీ మొబైల్ నంబర్‌కు SMS పంపబడింది',
      thankYou: 'సువిధను ఉపయోగించినందుకు ధన్యవాదాలు',
      keepToken: 'రిఫరెన్స్ కోసం ఈ టోకెన్‌ను ఉంచండి',
      availableLanguages: 'అందుబాటులో ఉన్న భాషలు',
      chooseLanguagePrompt: 'మీకు ఇష్టమైన భాషను ఎంచుకోవడానికి దానిపై క్లిక్ చేయండి।',
      availableDepartments: 'అందుబాటులో ఉన్న విభాగాలు',
  availableServices: 'అందుబాటులో ఉన్న సేవలు',
  enterYourName: 'మీ పూర్తి పేరును ఇక్కడ నమోదు చేయండి',
  enterMobile: 'మీ 10 అంకెల మొబైల్ నంబరును ఇక్కడ నమోదు చేయండి',
  describeProblem: 'మీ సమస్య లేదా అభ్యర్థనను ఇక్కడ వివరించండి',
  reviewAllDetails: 'దయచేసి క్రింది అన్ని వివరాలను సమీక్షించండి',
  ifCorrectSubmit: 'ప్రతిదీ సరిగ్గా ఉంటే సబ్మిట్ క్లిక్ చేయండి',
  tokenIs: 'టోకెన్ నంబరు',
  smsSentTo: 'మీ మొబైల్ నంబరుకు SMS పంపబడింది',
  registeredSuccessfully: 'ఫిర్యాదు విజయవంతంగా నమోదైంది',
  thankYouMessage: 'SUVIDHA ఉపయోగించినందుకు ధన్యవాదాలు',
  keepTokenForRef: 'రిఫరెన్స్ కోసం ఈ టోకెన్‌ను ఉంచండి',
  enterTokenToTrack: 'మీ టోకెన్ నంబరును నమోదు చేయండి',
  clickTrack: 'ప్రస్తుత స్థితిని చూడటానికి ట్రాక్ క్లిక్ చేయండి',
  enterValidToken: 'దయచేసి చెల్లుబాటు అయ్యే సంఖ్యాత్మక టోకెన్ నమోదు చేయండి (ఉదా. 2)',
  invalidToken: 'చెల్లని టోకెన్ లేదా సర్వర్ లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.',
  enterTokenInstruction: 'మీ టోకెన్ నంబరును నమోదు చేయండి',
  clickTrackToSeeStatus: 'ప్రస్తుత స్థితిని చూడటానికి ట్రాక్ క్లిక్ చేయండి',
    },
    mr: {
      welcome: 'सुविधा मध्ये आपले स्वागत आहे',
      welcomeSubtitle: 'सरकारी सार्वजनिक सेवा केंद्र',
      start: 'सुरू करा',
      selectLanguage: 'आपली भाषा निवडा',
      selectDepartment: 'विभाग निवडा',
      selectService: 'सेवा निवडा',
      fillForm: 'आपला तपशील भरा',
      confirm: 'आपला तपशील पडताळा',
      receipt: 'आपली विनंती सबमिट केली आहे',
      back: 'मागे',
      next: 'पुढे',
      submit: 'सबमिट करा',
      home: 'होम',
      electricity: 'वीज',
      water: 'पाणी पुरवठा',
      gas: 'गॅस',
      municipal: 'नगरपालिका सेवा',
      complaint: 'तक्रार नोंदवा',
      newApplication: 'नवीन अर्ज',
      trackStatus: 'स्थिती ट्रॅक करा',
      name: 'पूर्ण नाव',
      mobile: 'मोबाइल नंबर',
      problem: 'आपली समस्या / विनंती वर्णन करा',
      reviewDetails: 'कृपया आपला तपशील तपासा',
      department: 'विभाग',
      service: 'सेवा',
      tokenNumber: 'टोकन क्रमांक',
      smsMessage: 'आपल्या मोबाइल नंबरवर SMS पाठवला',
      thankYou: 'सुविधा वापरल्याबद्दल धन्यवाद',
      keepToken: 'कृपया हे टोकन संदर्भासाठी ठेवा',
      availableLanguages: 'उपलब्ध भाषा आहेत',
      chooseLanguagePrompt: 'आपली पसंतीची भाषा निवडण्यासाठी त्यावर क्लिक करा।',
      availableDepartments: 'उपलब्ध विभाग आहेत',
  availableServices: 'उपलब्ध सेवा आहेत',
  enterYourName: 'येथे आपले पूर्ण नाव टाका',
  enterMobile: 'येथे आपला १० अंकी मोबाइल नंबर टाका',
  describeProblem: 'येथे आपली समस्या किंवा विनंती वर्णन करा',
  reviewAllDetails: 'कृपया खालील सर्व तपशील तपासा',
  ifCorrectSubmit: 'सर्व काही बरोबर असल्यास सबमिट क्लिक करा',
  tokenIs: 'टोकन क्रमांक आहे',
  smsSentTo: 'आपल्या मोबाइल नंबरवर SMS पाठवला गेला आहे',
  registeredSuccessfully: 'तक्रार यशस्वीरित्या नोंदवली गेली',
  thankYouMessage: 'SUVIDHA वापरल्याबद्दल धन्यवाद',
  keepTokenForRef: 'संदर्भासाठी हा टोकन ठेवा',
  enterTokenToTrack: 'आपला टोकन क्रमांक टाका',
  clickTrack: 'सध्याची स्थिती पाहण्यासाठी ट्रॅक क्लिक करा',
  enterValidToken: 'कृपया वैध संख्येचा टोकन टाका (उदा. २)',
  invalidToken: 'अवैध टोकन किंवा सर्व्हर त्रुटी. कृपया पुन्हा प्रयत्न करा.',
  enterTokenInstruction: 'आपला टोकन क्रमांक टाका',
  clickTrackToSeeStatus: 'सध्याची स्थिती पाहण्यासाठी ट्रॅक क्लिक करा',

    },
    ta: {
      welcome: 'சுவிதாவுக்கு வரவேற்கிறோம்',
      welcomeSubtitle: 'அரசு பொது சேவை மையம்',
      start: 'தொடங்கு',
      selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      selectDepartment: 'துறையைத் தேர்ந்தெடுக்கவும்',
      selectService: 'சேவையைத் தேர்ந்தெடுக்கவும்',
      fillForm: 'உங்கள் விவரங்களை நிரப்பவும்',
      confirm: 'உங்கள் விவரங்களை உறுதிப்படுத்தவும்',
      receipt: 'உங்கள் கோரிக்கை சமர்ப்பிக்கப்பட்டது',
      back: 'பின்னால்',
      next: 'அடுத்து',
      submit: 'சமர்ப்பிக்கவும்',
      home: 'முகப்பு',
      electricity: 'மின்சாரம்',
      water: 'நீர் வழங்கல்',
      gas: 'எரிவாயு',
      municipal: 'நகராட்சி சேவைகள்',
      complaint: 'புகார் பதிவு செய்யவும்',
      newApplication: 'புதிய விண்ணப்பம்',
      trackStatus: 'நிலையைக் கண்காணிக்கவும்',
      name: 'முழு பெயர்',
      mobile: 'மொபைல் எண்',
      problem: 'உங்கள் பிரச்சனை / கோரிக்கையை விவரிக்கவும்',
      reviewDetails: 'உங்கள் விவரங்களைப் பார்வையிடவும்',
      department: 'துறை',
      service: 'சேவை',
      tokenNumber: 'டோக்கன் எண்',
      smsMessage: 'உங்கள் மொபைல் எண்ணுக்கு SMS அனுப்பப்பட்டது',
      thankYou: 'சுவிதாவைப் பயன்படுத்தியதற்கு நன்றி',
      keepToken: 'குறிப்புக்காக இந்த டோக்கனை வைத்திருக்கவும்',
      availableLanguages: 'கிடைக்கக்கூடிய மொழிகள்',
      chooseLanguagePrompt: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்க அதன் மீது கிளிக் செய்யவும்।',
      availableDepartments: 'கிடைக்கக்கூடிய துறைகள்',
  availableServices: 'கிடைக்கக்கூடிய சேவைகள்',
  enterYourName: 'இங்கு உங்கள் முழு பெயரை உள்ளிடவும்',
  enterMobile: 'இங்கு உங்கள் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
  describeProblem: 'இங்கு உங்கள் பிரச்சனை அல்லது கோரிக்கையை விவரிக்கவும்',
  reviewAllDetails: 'கீழே உள்ள அனைத்து விவரங்களையும் மறுபரிசீலனை செய்யவும்',
  ifCorrectSubmit: 'எல்லாம் சரியாக இருந்தால் சமர்ப்பி என்பதைக் கிளிக் செய்யவும்',
  tokenIs: 'டோக்கன் எண்',
  smsSentTo: 'உங்கள் மொபைல் எண்ணுக்கு SMS அனுப்பப்பட்டது',
  registeredSuccessfully: 'புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது',
  thankYouMessage: 'SUVIDHA பயன்படுத்தியதற்கு நன்றி',
  keepTokenForRef: 'குறிப்புக்காக இந்த டோக்கனை வைத்திருக்கவும்',
  enterTokenToTrack: 'உங்கள் டோக்கன் எண்ணை உள்ளிடவும்',
  clickTrack: 'தற்போதைய நிலையைப் பார்க்க ட்ராக் கிளிக் செய்யவும்',
  enterValidToken: 'செல்லுபடியாகும் எண் டோக்கனை உள்ளிடவும் (எ.கா. 2)',
  invalidToken: 'தவறான டோக்கன் அல்லது சர்வர் பிழை. மீண்டும் முயற்சிக்கவும்.',
  enterTokenInstruction: 'உங்கள் டோக்கன் எண்ணை உள்ளிடவும்',
  clickTrackToSeeStatus: 'தற்போதைய நிலையைப் பார்க்க ட்ராக் கிளிக் செய்யவும்',

    },
    gu: {
      welcome: 'સુવિધામાં આપનું સ્વાગત છે',
      welcomeSubtitle: 'સરકારી જાહેર સેવા કેન્દ્ર',
      start: 'શરૂ કરો',
      selectLanguage: 'તમારી ભાષા પસંદ કરો',
      selectDepartment: 'વિભાગ પસંદ કરો',
      selectService: 'સેવા પસંદ કરો',
      fillForm: 'તમારી વિગતો ભરો',
      confirm: 'તમારી વિગતો પુષ્ટિ કરો',
      receipt: 'તમારી વિનંતી સબમિટ થઈ ગઈ છે',
      back: 'પાછળ',
      next: 'આગળ',
      submit: 'સબમિટ કરો',
      home: 'હોમ',
      electricity: 'વીજળી',
      water: 'પાણી પુરવઠો',
      gas: 'ગેસ',
      municipal: 'મ્યુનિસિપલ સેવાઓ',
      complaint: 'ફરિયાદ નોંધાવો',
      newApplication: 'નવી અરજી',
      trackStatus: 'સ્થિતિ ટ્રેક કરો',
      name: 'પૂરું નામ',
      mobile: 'મોબાઈલ નંબર',
      problem: 'તમારી સમસ્યા / વિનંતીનું વર્ણન કરો',
      reviewDetails: 'કૃપા કરીને તમારી વિગતો તપાસો',
      department: 'વિભાગ',
      service: 'સેવા',
      tokenNumber: 'ટોકન નંબર',
      smsMessage: 'તમારા મોબાઈલ નંબર પર SMS મોકલ્યો',
      thankYou: 'સુવિધાનો ઉપયોગ કરવા બદલ આભાર',
      keepToken: 'કૃપા કરીને સંદર્ભ માટે આ ટોકન રાખો',
      availableLanguages: 'ઉપલબ્ધ ભાષાઓ છે',
      chooseLanguagePrompt: 'તમારી પસંદગીની ભાષા પસંદ કરવા માટે તેના પર ક્લિક કરો.',
      availableDepartments: 'ઉપલબ્ધ વિભાગો છે',
  availableServices: 'ઉપલબ્ધ સેવાઓ છે',
  enterYourName: 'અહીં તમારું પૂરું નામ દાખલ કરો',
  enterMobile: 'અહીં તમારો 10 અંકનો મોબાઈલ નંબર દાખલ કરો',
  describeProblem: 'અહીં તમારી સમસ્યા અથવા વિનંતીનું વર્ણન કરો',
  reviewAllDetails: 'નીચેના તમામ વિગતોની સમીક્ષા કરો',
  ifCorrectSubmit: 'બધું બરાબર હોય તો સબમિટ પર ક્લિક કરો',
  tokenIs: 'ટોકન નંબર છે',
  smsSentTo: 'તમારા મોબાઈલ નંબર પર SMS મોકલવામાં આવ્યો છે',
  registeredSuccessfully: 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ',
  thankYouMessage: 'SUVIDHA નો ઉપયોગ કરવા બદલ આભાર',
  keepTokenForRef: 'સંદર્ભ માટે આ ટોકન રાખો',
  enterTokenToTrack: 'તમારો ટોકન નંબર દાખલ કરો',
  clickTrack: 'વર્તમાન સ્થિતિ જોવા માટે ટ્રેક પર ક્લિક કરો',
  enterValidToken: 'કૃપા કરીને માન્ય સંખ્યાત્મક ટોકન દાખલ કરો (દા.ત. 2)',
  invalidToken: 'અમાન્ય ટોકન અથવા સર્વર ભૂલ. કૃપા કરીને ફરીથી પ્રયાસ કરો.',
  enterTokenInstruction: 'તમારો ટોકન નંબર દાખલ કરો',
  clickTrackToSeeStatus: 'વર્તમાન સ્થિતિ જોવા માટે ટ્રેક પર ક્લિક કરો',
}
    }
  

  const t = translations[language];

  // ==================== HELPER FUNCTIONS ====================
  
  const generateToken = () => {
    return 'SUV' + Math.floor(10000000 + Math.random() * 90000000);
  };

  const selectDepartment = (dept) => {
    setUserData({ ...userData, department: dept });
    setScreen('service');
  };

  const selectService = (service) => {
    setUserData({ ...userData, service });

    if (service === t.trackStatus) {
      setScreen('track'); // new screen
    } else {
      setScreen('form');
    }
  };

  const handleFormSubmit = () => {
    if (!userData.name || !userData.mobile || !userData.problem) {
      alert('Please fill all fields / कृपया सभी फ़ील्ड भरें');
      return;
    }
    
    if (userData.mobile.length !== 10) {
      alert('Please enter valid 10-digit mobile number / कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }
    
    setScreen('confirm');
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);

    const payload = {
      name: userData.name.trim(),
      mobile: userData.mobile.trim(),
      issue_type: `${userData.department} - ${userData.service}`,
      description: userData.problem.trim(),
      location: "Delhi",
      file_name: userData.file_name || '',  // ← sends the selected file name
    };

    try {
      const result = await createComplaint(payload);
      setToken(result.complaint.id);
      setScreen('receipt');
    } catch (err) {
      alert('Error submitting. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetApp = () => {
    setScreen('welcome');
    setLanguage('en');
    setUserData({
      department: '',
      service: '',
      name: '',
      mobile: '',
      problem: ''
    });
    setToken('');
  };

  // ==================== STYLING ====================
  
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    screenContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '50px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      maxWidth: '900px',
      width: '100%',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      fontSize: '56px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      textAlign: 'center',
      letterSpacing: '2px'
    },
    subtitle: {
      fontSize: '28px',
      color: '#475569',
      marginBottom: '50px',
      textAlign: 'center',
      fontWeight: '500'
    },
    sectionTitle: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '40px',
      textAlign: 'center'
    },
    button: {
      padding: '25px 50px',
      fontSize: '28px',
      fontWeight: 'bold',
      borderRadius: '15px',
      border: 'none',
      cursor: 'pointer',
      margin: '15px',
      minWidth: '280px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      outline: 'none'
    },
    languageButton: {
      padding: '30px 40px',
      fontSize: '32px',
      fontWeight: 'bold',
      borderRadius: '15px',
      border: '3px solid #2563eb',
      cursor: 'pointer',
      margin: '12px',
      minWidth: '320px',
      backgroundColor: '#ffffff',
      color: '#2563eb',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '25px',
      marginBottom: '40px',
      width: '100%'
    },
    formContainer: {
      width: '100%',
      maxWidth: '700px'
    },
    formGroup: {
      marginBottom: '35px',
      width: '100%'
    },
    label: {
      display: 'block',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '12px'
    },
    input: {
      width: '100%',
      padding: '20px',
      fontSize: '26px',
      borderRadius: '10px',
      border: '3px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', 'Arial', sans-serif"
    },
    textarea: {
      width: '100%',
      padding: '20px',
      fontSize: '26px',
      borderRadius: '10px',
      border: '3px solid #cbd5e1',
      outline: 'none',
      minHeight: '180px',
      resize: 'vertical',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      boxSizing: 'border-box'
    },
    confirmBox: {
      backgroundColor: '#f8fafc',
      padding: '35px',
      borderRadius: '15px',
      marginBottom: '30px',
      width: '100%',
      border: '2px solid #e2e8f0'
    },
    confirmRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '18px 0',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '24px'
    },
    confirmLabel: {
      fontWeight: 'bold',
      color: '#475569',
      minWidth: '200px'
    },
    confirmValue: {
      color: '#1e3a8a',
      fontWeight: '600',
      flex: 1,
      textAlign: 'right'
    },
    receiptBox: {
      backgroundColor: '#f0fdf4',
      padding: '50px',
      borderRadius: '20px',
      border: '4px dashed #22c55e',
      textAlign: 'center',
      marginBottom: '30px',
      width: '100%'
    },
    tokenDisplay: {
      fontSize: '72px',
      fontWeight: 'bold',
      color: '#15803d',
      margin: '30px 0',
      letterSpacing: '4px',
      fontFamily: 'monospace'
    },
    receiptText: {
      fontSize: '26px',
      color: '#166534',
      margin: '15px 0',
      fontWeight: '500'
    },
    navButtons: {
      display: 'flex',
      gap: '20px',
      marginTop: '30px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    backButton: {
      padding: '20px 40px',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #64748b',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#64748b',
      minWidth: '180px'
    },
    ttsIcon: {
      fontSize: '28px'
    }
   

  };
  // Add this inside function App() { ... }
  console.log('t.back =', t.back);
  const speak = (text, lang = language) => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    window.speechSynthesis.cancel(); // stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' :
                    lang === 'bn' ? 'bn-IN' :
                    lang === 'te' ? 'te-IN' :
                    lang === 'mr' ? 'mr-IN' :
                    lang === 'ta' ? 'ta-IN' :
                    lang === 'gu' ? 'gu-IN' :
                    'en-IN';

    // Wait for voices to load (important fix)
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferred = voices.find(v => v.lang.startsWith(utterance.lang)) || voices[0];
        utterance.voice = preferred;
        window.speechSynthesis.speak(utterance);
      }
    };

    // If voices already loaded, speak immediately
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      // Wait for voices to load (fires once)
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = null; // only once
      };
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
  };

  // ==================== MAIN RENDER ====================
  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  return (
    <div
    style={{
      ...styles.container,
      
      transform: `scale(${fontScale})`,
      transformOrigin: "top center",
      backgroundColor: highContrast ? "#000" : styles.container.backgroundColor,
      color: highContrast ? "#fff" : "#000"
    }}
    >
      
  
    {/* Accessibility bar */}
    <div style={{
      alignSelf: 'flex-end',
      marginBottom: '15px',
      display: 'flex',
      gap: '10px'
    }}>
      <button
        onClick={() => setHighContrast(!highContrast)}
        style={{ padding: '8px 12px', fontSize: '18px' }}
      >
        {highContrast ? 'Normal' : 'High contrast'}
      </button>

      <button
        onClick={() => setFontScale(s => Math.min(s + 0.1, 1.5))}
        style={{ padding: '8px 12px', fontSize: '18px' }}
      >
        A+
      </button>

      <button
        onClick={() => setFontScale(s => Math.max(s - 0.1, 0.8))}
        style={{ padding: '8px 12px', fontSize: '18px' }}
      >
        A-
      </button>
    </div>

    

      
      {screen === 'welcome' && <WelcomeScreen styles={styles} t={t} setScreen={setScreen} speak={speak} />}
      {screen === 'language' && <LanguageScreen styles={styles} t={t} language={language} setLanguage={setLanguage} setScreen={setScreen} speak={speak} />}
      {screen === 'department' && <DepartmentScreen styles={styles} t={t} selectDepartment={selectDepartment} setScreen={setScreen} speak={speak} language={language} />}
      {screen === 'service' && <ServiceScreen styles={styles} t={t} selectService={selectService} setScreen={setScreen} speak={speak} language={language} />}
      {screen === 'form' && <FormScreen styles={styles} t={t} userData={userData} setUserData={setUserData} handleFormSubmit={handleFormSubmit} setScreen={setScreen} speak={speak} language={language} />}
      {screen === 'confirm' && (
        <ConfirmScreen
          styles={styles}
          t={t}
          userData={userData}
          handleConfirm={handleConfirm}
          setScreen={setScreen}
          isSubmitting={isSubmitting}  // ← add this
          speak={speak}
          language={language}
          
        />
      )}
      {screen === 'receipt' && <ReceiptScreen styles={styles} t={t} token={token} userData={userData} resetApp={resetApp} speak={speak} />}
      {screen === 'track' && (
        <TrackStatusScreen 
          styles={styles} 
          t={t} 
          setScreen={setScreen}
          speak={speak} 
          language={language}
        />
      )}
      {screen !== 'welcome' && (
        <div style={{
          marginTop: '30px',
          fontSize: '20px',
          color: '#64748b',
          textAlign: 'center'
        }}>
          🌐 {translations[language].selectLanguage}: <strong>{
            {en: 'English', hi: 'हिंदी', bn: 'বাংলা', te: 'తెలుగు', 
             mr: 'मराठी', ta: 'தமிழ்', gu: 'ગુજરાતી'}[language]
          }</strong>
        </div>
      )}
    </div>
    
  );

};

export default App;