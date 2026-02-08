import React, { useState } from 'react';

/**
 * SUVIDHA - Government Public Service Kiosk Application
 * Complete React App with multilingual support and accessibility features
 */

// ==================== SCREEN COMPONENTS (OUTSIDE App) ====================

/**
 * SCREEN 1: Welcome Screen
 */
const WelcomeScreen = ({ styles, t, setScreen }) => (
  <div style={styles.screenContainer}>
    <h1 style={styles.title}>🏛️ SUVIDHA</h1>
    <p style={styles.subtitle}>{t.welcomeSubtitle}</p>
    
    <button 
      style={styles.button}
      onClick={() => setScreen('language')}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
    >
      <span style={styles.ttsIcon}>🔊</span>
      {t.start}
    </button>
  </div>
);

/**
 * SCREEN 2: Language Selection Screen
 */
const LanguageScreen = ({ styles, t, language, setLanguage, setScreen }) => (
  <div style={styles.screenContainer}>
    <h2 style={styles.sectionTitle}>{t.selectLanguage}</h2>
    
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
          <span style={styles.ttsIcon}>🔊</span>
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
const DepartmentScreen = ({ styles, t, selectDepartment, setScreen }) => (
  <div style={styles.screenContainer}>
    <h2 style={styles.sectionTitle}>{t.selectDepartment}</h2>
    
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
          <span style={styles.ttsIcon}>🔊</span>
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
const ServiceScreen = ({ styles, t, selectService, setScreen }) => (
  <div style={styles.screenContainer}>
    <h2 style={styles.sectionTitle}>{t.selectService}</h2>
    
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
          <span style={styles.ttsIcon}>🔊</span>
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
const FormScreen = ({ styles, t, userData, setUserData, handleFormSubmit, setScreen }) => (
  <div style={styles.screenContainer}>
    <h2 style={styles.sectionTitle}>{t.fillForm}</h2>
    
    <div style={styles.formContainer}>
      {/* Name Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>
          <span style={styles.ttsIcon}>🔊</span> {t.name}
        </label>
        <input
          type="text"
          style={styles.input}
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder={t.name}
        />
      </div>
      
      {/* Mobile Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>
          <span style={styles.ttsIcon}>🔊</span> {t.mobile}
        </label>
        <input
          type="tel"
          maxLength="10"
          style={styles.input}
          value={userData.mobile}
          onChange={(e) => setUserData({ ...userData, mobile: e.target.value.replace(/\D/g, '') })}
          placeholder="10-digit number"
        />
      </div>
      
      {/* Problem Description Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>
          <span style={styles.ttsIcon}>🔊</span> {t.problem}
        </label>
        <textarea
          style={styles.textarea}
          value={userData.problem}
          onChange={(e) => setUserData({ ...userData, problem: e.target.value })}
          placeholder={t.problem}
        />
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
          <span style={styles.ttsIcon}>🔊</span>
          {t.next}
        </button>
      </div>
    </div>
  </div>
);

/**
 * SCREEN 6: Confirm Screen
 */
const ConfirmScreen = ({ styles, t, userData, handleConfirm, setScreen }) => (
  <div style={styles.screenContainer}>
    <h2 style={styles.sectionTitle}>{t.confirm}</h2>
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
        style={{...styles.button, backgroundColor: '#22c55e', minWidth: '250px'}}
        onClick={handleConfirm}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
      >
        <span style={styles.ttsIcon}>🔊</span>
        ✓ {t.submit}
      </button>
    </div>
  </div>
);

/**
 * SCREEN 7: Receipt Screen
 */
const ReceiptScreen = ({ styles, t, token, userData, resetApp }) => (
  <div style={styles.screenContainer}>
    <h2 style={{...styles.sectionTitle, color: '#22c55e'}}>✓ {t.receipt}</h2>
    
    <div style={styles.receiptBox}>
      <p style={styles.receiptText}>{t.tokenNumber}</p>
      <div style={styles.tokenDisplay}>{token}</div>
      <p style={styles.receiptText}>📱 {t.smsMessage}</p>
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
      <span style={styles.ttsIcon}>🔊</span>
      🏠 {t.home}
    </button>
  </div>
);

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
      keepToken: 'Please keep this token for reference'
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
      keepToken: 'कृपया इस टोकन को संदर्भ के लिए रखें'
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
      keepToken: 'রেফারেন্সের জন্য এই টোকেন রাখুন'
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
      keepToken: 'రిఫరెన్స్ కోసం ఈ టోకెన్‌ను ఉంచండి'
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
      keepToken: 'कृपया हे टोकन संदर्भासाठी ठेवा'
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
      keepToken: 'குறிப்புக்காக இந்த டோக்கனை வைத்திருக்கவும்'
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
      keepToken: 'કૃપા કરીને સંદર્ભ માટે આ ટોકન રાખો'
    }
  };

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
    setUserData({ ...userData, service: service });
    setScreen('form');
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

  const handleConfirm = () => {
    const newToken = generateToken();
    setToken(newToken);
    setScreen('receipt');
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

  // ==================== MAIN RENDER ====================
  
  return (
    <div style={styles.container}>
      {screen === 'welcome' && <WelcomeScreen styles={styles} t={t} setScreen={setScreen} />}
      {screen === 'language' && <LanguageScreen styles={styles} t={t} language={language} setLanguage={setLanguage} setScreen={setScreen} />}
      {screen === 'department' && <DepartmentScreen styles={styles} t={t} selectDepartment={selectDepartment} setScreen={setScreen} />}
      {screen === 'service' && <ServiceScreen styles={styles} t={t} selectService={selectService} setScreen={setScreen} />}
      {screen === 'form' && <FormScreen styles={styles} t={t} userData={userData} setUserData={setUserData} handleFormSubmit={handleFormSubmit} setScreen={setScreen} />}
      {screen === 'confirm' && <ConfirmScreen styles={styles} t={t} userData={userData} handleConfirm={handleConfirm} setScreen={setScreen} />}
      {screen === 'receipt' && <ReceiptScreen styles={styles} t={t} token={token} userData={userData} resetApp={resetApp} />}
      
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
}

export default App;