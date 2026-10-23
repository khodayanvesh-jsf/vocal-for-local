/**
 * ============================================================================
 * 🌿 VOCALFORLOCAL • ADILABAD SUPER-APP (MASTER APPLICATION FILE)
 * ============================================================================
 * File Location : src/App.jsx
 * Description   : Complete Single-File Architecture containing Mobile Portals
 *                 (Customer, Merchant, Service Provider, Rider) + Desktop
 *                 Founder Admin Web Suite & Developer Testing Simulator.
 *
 * ============================================================================
 * 📑 QUICK NAVIGATION TABLE OF CONTENTS (Press Ctrl + F and search the tag)
 * ============================================================================
 * [SECTION-01] : Imports & Native Smartphone Bezel Wrapper (MobilePhoneShell)
 * [SECTION-02] : Application State Variables (Auth, Carts, Orders, Admin, GPS)
 * [SECTION-03] : Security, OTP, Anti-Fraud ID, Password & Biometric Functions
 * [SECTION-04] : Logistics, Cart Management, Order Flow & Event Math Functions
 * [SECTION-05] : Screen 1 — Native Device Permissions Gateway UI
 * [SECTION-06] : Screen 2 — Multi-Step Registration, Login & Fast PIN UI
 * [SECTION-07] : Portal 1 — Customer Super-App (Stores, Decor Bidding, Taxi)
 * [SECTION-08] : Portal 2 — Merchant & Decorator Partner App UI
 * [SECTION-09] : Portal 3 — Delivery Agent / Bike & Auto Captain App UI
 * [SECTION-10] : Portal 4 — Desktop Founder Admin Web Suite & Testing Bench
 * [SECTION-11] : Main Render Router, Top Control Bar & Google Maps Modal
 * ============================================================================
 */

// ============================================================================
// [SECTION-01] IMPORTS & NATIVE SMARTPHONE BEZEL WRAPPER
// ============================================================================
import React, { useState } from 'react';
import {
  INITIAL_CATEGORIES,
  CURATED_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_FUNCTION_HALLS,
  DECORATION_SERVICE_MODULES,
  REJECTION_REASONS
} from './data';

/**
 * MobilePhoneShell Component
 * --------------------------
 * Wraps any mobile portal inside a realistic 405px smartphone frame with
 * a top status bar, scrollable body, and bottom home indicator bar.
 * Future Update Tip: Adjust `max-w-[405px]` or `min-h-[800px]` to resize phone frame.
 */
function MobilePhoneShell({ title, badge, children }) {
  return (
    <div className="w-full max-w-[405px] mx-auto bg-[#071318] border-[7px] border-slate-800/90 rounded-[44px] shadow-[0_25px_70px_-15px_rgba(16,185,129,0.28)] overflow-hidden flex flex-col min-h-[800px] max-h-[850px] relative">
      {/* Top Smartphone Notch & Status Bar */}
      <div className="bg-[#040B0E] px-5 py-2.5 flex justify-between items-center text-[10px] text-slate-300 border-b border-emerald-950/80 select-none">
        <span className="font-extrabold text-emerald-400 tracking-wide flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {title}
        </span>
        {/* Speaker / Camera Notch Pill */}
        <div className="w-16 h-3.5 bg-slate-900 rounded-full border border-slate-800" />
        <span className="text-teal-300 font-semibold">{badge}</span>
      </div>

      {/* Main Scrollable App Viewport */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-gradient-to-b from-[#071318] via-[#09181F] to-[#050E12]">
        {children}
      </div>

      {/* Bottom Gesture Home Bar */}
      <div className="bg-[#040B0E] py-2.5 flex justify-center border-t border-emerald-950/60">
        <div className="w-28 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

// ============================================================================
// [SECTION-02] APPLICATION STATE VARIABLES
// ============================================================================
export default function App() {
  // Check if user opened URL with `?admin=true` to jump straight to Founder Web Desk
  const isDirectAdminUrl =
    typeof window !== 'undefined' && window.location.search.includes('admin');

  // --- 2A. FOUNDER CONSOLE & TESTING BENCH STATE ---
  // viewMode controls whether we show the 'mobile_app' bezel or 'founder_web' desktop dashboard
  const [viewMode, setViewMode] = useState(isDirectAdminUrl ? 'founder_web' : 'mobile_app');
  // founderTab controls active tab in Founder Web Desk: 'approvals' | 'testing' | 'users' | 'escrow'
  const [founderTab, setFounderTab] = useState('testing');
  // Counter tracking how many test orders were pushed from the Testing Simulator
  const [testSimulatedOrderCount, setTestSimulatedOrderCount] = useState(0);

  // --- 2B. DEVICE REGISTRATION LOCK & ONBOARDING STATE ---
  // Checks browser localStorage to see if this phone/device already completed registration
  const savedDeviceUser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('vfl_device_registered_user') || 'null')
      : null;
  const [hasRegisteredOnDevice, setHasRegisteredOnDevice] = useState(!!savedDeviceUser);

  // onboardingStep: 'permissions' (Device hardware access) | 'auth' (Login/Register) | 'app' (Main Portals)
  const [onboardingStep, setOnboardingStep] = useState('auth');

  // authStage controls which sub-screen inside 'auth' is displayed:
  // 'landing'      -> Initial Page 1 with Oval Logo, Role Dropdown, [Sign In] & [Register New] buttons
  // 'signin'       -> Username + Password login screen
  // 'signup_step1' -> Mandatory Phone Number + 6-Digit OTP Verification
  // 'signup_step2' -> Full Legal Name + Unique Username + Gov ID Proof + Live Selfie Upload
  // 'signup_step3' -> Strong Password (8+ chars, 1 uppercase, 1 number) + 4-Digit Fast PIN
  // 'fast_login'   -> 4-Digit Quick PIN & Biometric Unlock (shown automatically once registered)
  const [authStage, setAuthStage] = useState(savedDeviceUser ? 'fast_login' : 'landing');

  // Role selector state: 'customer' (Default) | 'merchant' | 'service_provider' | 'delivery_agent'
  const [selectedRole, setSelectedRole] = useState(savedDeviceUser?.role || 'customer');

  // Hardware permissions state (Location, Notifications, Camera, Storage)
  const [permissions, setPermissions] = useState({
    location: true,
    notifications: true,
    camera: true,
    storage: true
  });

  // --- 2C. SIMULATED USERS DATABASE (Stored in localStorage) ---
  // Future Update Tip: Replace localStorage calls with Supabase / Firebase / MongoDB API calls
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const localDb =
      typeof window !== 'undefined' ? localStorage.getItem('vfl_registered_users_db') : null;
    if (localDb) return JSON.parse(localDb);
    return [
      {
        id: 'usr_demo',
        fullName: 'Khoday Anvesh',
        username: 'anvesh_k',
        phone: '9848011223',
        govId: '[ID Redacted]',
        role: 'customer',
        passwordHash: 'Adilabad@2026',
        fastPin: '1990',
        selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    ];
  });

  // Multi-Step Registration Form Fields
  const [regForm, setRegForm] = useState({
    fullName: '',
    username: '',
    phone: '',
    otpInput: '',
    generatedOtp: '',
    otpVerified: false,
    govId: '',
    selfieUrl: '',
    password: '',
    confirmPassword: '',
    fastPin: ''
  });

  // Login Form Fields (Username/Phone + Password OR 4-Digit Quick PIN)
  const [loginForm, setLoginForm] = useState({
    usernameOrPhone: '',
    password: '',
    pinInput: ''
  });

  // Holds any validation error message to display inside the Auth screen
  const [authError, setAuthError] = useState('');
  // Stores the currently logged-in user object
  const [currentUser, setCurrentUser] = useState(savedDeviceUser || null);

  // --- 2D. ACTIVE PORTAL & CUSTOMER DISCOVERY STATE ---
  // activePortal: 'customer' | 'merchant' | 'rider' | 'admin' | 'split'
  const [activePortal, setActivePortal] = useState('customer');
  // Prime Customer toggle: enables silent order merging before rider pickup token handover
  const [isPrimeCustomer, setIsPrimeCustomer] = useState(true);

  // Search & Curiosity Filters in Customer Store View
  const [searchQuery, setSearchQuery] = useState('');
  const [surpriseBoxOpen, setSurpriseBoxOpen] = useState(false);
  const [activeCuriosityFilter, setActiveCuriosityFilter] = useState('all'); // 'all' | 'under100' | 'fresh'

  // --- 2E. MASTER CATALOG & FOUNDER COMMISSION STATE ---
  const [categories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [functionHalls] = useState(INITIAL_FUNCTION_HALLS);

  // Sliders controlled by Founder in the Escrow & Commissions tab
  const [merchantCommissionPct, setMerchantCommissionPct] = useState(0); // 0% to 10%
  const [consumerFeePct, setConsumerFeePct] = useState(0); // 0% to 5%

  // --- 2F. ISOLATED CATEGORY CARTS STATE ---
  // Each category has its own isolated cart so heavy construction items don't mix with groceries
  const [selectedCategory, setSelectedCategory] = useState('daily_needs');
  const [activeCustomerSection, setActiveCustomerSection] = useState('shop'); // 'shop' | 'events' | 'taxi'
  const [selectedVariantMap, setSelectedVariantMap] = useState({});
  const [categoryCarts, setCategoryCarts] = useState({
    daily_needs: [],
    construction: [],
    medicines: []
  });
  const [showCartWindow, setShowCartWindow] = useState(false);

  // --- 2G. GOOGLE MAPS GPS PINPOINT & BIKE TAXI STATE ---
  const [mapModal, setMapModal] = useState({
    open: false,
    mode: 'consumer_pin',
    lat: 19.6641,
    lng: 78.532,
    addressLabel: 'Collectorate Chowk, Adilabad (19.6641° N, 78.5320° E)',
    distanceKm: 2.2
  });
  const [mapType, setMapType] = useState('street'); // 'street' | 'satellite'
  const [taxiRoute, setTaxiRoute] = useState({
    pickup: 'Adilabad Bus Stand (19.6668° N, 78.5310° E)',
    drop: 'RIMS Hospital Gate (19.6580° N, 78.5250° E)',
    distanceKm: 3.4,
    mode: '2w_taxi' // '2w_taxi' | '3w_auto' | 'parcel'
  });

  // --- 2H. LIVE ORDER QUEUE & OTP HANDOVER STATE ---
  const [orders, setOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [riderOtpInput, setRiderOtpInput] = useState('');
  const [reviewText, setReviewText] = useState('');

  // --- 2I. FUNCTION HALLS & ANONYMOUS DECORATOR BIDDING STATE ---
  const [eventDate, setEventDate] = useState('2026-10-29');
  const [eventTime, setEventTime] = useState('18:00');
  const [decorCart, setDecorCart] = useState([]);
  const [decorBids, setDecorBids] = useState([]);
  // biddingStatus: 'IDLE' | 'BROADCASTED' | 'BID_ACCEPTED_AWAITING_MERCHANT' | 'DEAL_FINALIZED_PAYMENT_DUE' | 'ADVANCE_PAID'
  const [biddingStatus, setBiddingStatus] = useState('IDLE');
  const [selectedWinningBid, setSelectedWinningBid] = useState(null);
  const [merchantBidForm, setMerchantBidForm] = useState({
    price: 21500,
    notes: 'Includes complimentary welcome gate + extra 2 LED warm spotlights'
  });
  const [hallBookingState, setHallBookingState] = useState(null);

  // --- 2J. FOUNDER APPROVAL QUEUES (Pending Merchants & Sub-Categories) ---
  const [pendingMerchants, setPendingMerchants] = useState([
    {
      id: 'pm_1',
      businessName: 'Balaji Steel & Cement Traders',
      phone: '9848011223',
      categoryId: 'construction',
      eSigned: true,
      status: 'pending'
    }
  ]);
  const [pendingSubCategories, setPendingSubCategories] = useState([
    {
      id: 'ps_1',
      categoryId: 'daily_needs',
      subCategoryBrand: 'Amul Taaza Homogenised Milk',
      shopName: 'Adilabad Dairy Parlour',
      distanceKm: 0.9,
      rating: 4.9,
      buyersToday: 29,
      curiosityTag: '🥛 Morning Fresh Batch',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80',
      status: 'pending',
      variants: [
        { id: 'mv1', label: '500 ml Pack', price: 28, mrp: 30, weightGrams: 500 },
        { id: 'mv2', label: '1 Litre Carton', price: 56, mrp: 60, weightGrams: 1000 },
        { id: 'mv3', label: '6 x 1L Family Crate', price: 330, mrp: 360, weightGrams: 6000 }
      ]
    }
  ]);

  // Form state for Merchants submitting a new product brand to Founder Admin
  const [newProdForm, setNewProdForm] = useState({
    categoryId: 'daily_needs',
    subCategoryBrand: '',
    shopName: 'Sri Laxmi Supermart',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80',
    variants: [
      { label: '500 g', price: 45, mrp: 55, weightGrams: 500 },
      { label: '1 kg', price: 85, mrp: 100, weightGrams: 1000 },
      { label: '5 kg', price: 410, mrp: 480, weightGrams: 5000 }
    ]
  });

  // ==========================================================================
  // [SECTION-03] SECURITY, OTP, ANTI-FRAUD ID, PASSWORD & BIOMETRIC FUNCTIONS
  // ==========================================================================

  /**
   * validatePasswordStrength
   * Enforces Rule: Minimum 8 characters, at least 1 uppercase letter, and 1 number.
   */
  const validatePasswordStrength = (pw) => {
    return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
  };

  /**
   * handleSendRegistrationOtp (Registration Step 1)
   * Checks that phone is 10 digits and NOT already registered in the database.
   * Generates a 6-digit OTP for verification.
   */
  const handleSendRegistrationOtp = () => {
    if (!/^\d{10}$/.test(regForm.phone)) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Anti-Fraud Check 1: Block duplicate phone numbers
    const phoneExists = registeredUsers.some((u) => u.phone === regForm.phone);
    if (phoneExists) {
      setAuthError('This phone number is already registered. One account per person only.');
      return;
    }

    const testOtp = String(Math.floor(100000 + Math.random() * 900000));
    setRegForm((prev) => ({ ...prev, generatedOtp: testOtp, otpInput: '' }));
    setAuthError('');
    alert(`🔐 VocalForLocal Security OTP: ${testOtp}\n(Test SMS verification for Adilabad)`);
  };

  /**
   * handleVerifyRegistrationOtp (Registration Step 1 -> Step 2)
   * Confirms the user entered the exact 6-digit OTP before unlocking Identity Step 2.
   */
  const handleVerifyRegistrationOtp = () => {
    if (!regForm.otpInput || regForm.otpInput !== regForm.generatedOtp) {
      setAuthError('Invalid OTP! Please enter the exact 6-digit code received.');
      return;
    }
    setRegForm((prev) => ({ ...prev, otpVerified: true }));
    setAuthError('');
    setAuthStage('signup_step2');
  };

  /**
   * handleCaptureSelfie (Registration Step 2)
   * Converts selected camera/file photo into a local preview URL.
   */
  const handleCaptureSelfie = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setRegForm((prev) => ({ ...prev, selfieUrl: tempUrl }));
    }
  };

  /**
   * handleCompleteIdentityStep (Registration Step 2 -> Step 3)
   * Verifies Legal Name, Unique Username, and 12-Digit Government ID Proof.
   * Blocks duplicate IDs or usernames.
   */
  const handleCompleteIdentityStep = () => {
    if (!regForm.fullName.trim() || !regForm.username.trim()) {
      setAuthError('Please fill in your Full Legal Name and Username.');
      return;
    }

    const cleanedGovId = regForm.govId.replace(/\s+/g, '');
    if (cleanedGovId.length !== 12) {
      setAuthError('Please enter a valid 12-digit Government ID proof number.');
      return;
    }

    // Anti-Fraud Check 2: Block duplicate Government ID numbers
    const idExists = registeredUsers.some((u) => u.govId === cleanedGovId);
    if (idExists) {
      setAuthError('This ID Proof is already registered with another account. Duplicate registration blocked.');
      return;
    }

    // Check unique username
    const usernameExists = registeredUsers.some(
      (u) => u.username.toLowerCase() === regForm.username.toLowerCase()
    );
    if (usernameExists) {
      setAuthError('Username already taken. Please pick another username.');
      return;
    }

    setAuthError('');
    setAuthStage('signup_step3');
  };

  /**
   * handleFinalizeRegistration (Registration Step 3 -> App Entry)
   * Validates strong password + 4-digit PIN, saves user to DB, and locks device
   * so no repeat registrations can occur on the same phone.
   */
  const handleFinalizeRegistration = () => {
    if (!validatePasswordStrength(regForm.password)) {
      setAuthError('Password must be at least 8 characters, containing at least 1 uppercase letter and 1 number.');
      return;
    }

    if (regForm.password !== regForm.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    if (!/^\d{4}$/.test(regForm.fastPin)) {
      setAuthError('Please enter a 4-digit quick access PIN.');
      return;
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName: regForm.fullName.trim(),
      username: regForm.username.trim(),
      phone: regForm.phone.trim(),
      govId: '[ID Verified & Redacted]',
      role: selectedRole,
      passwordHash: regForm.password,
      fastPin: regForm.fastPin,
      selfieUrl: regForm.selfieUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      biometricEnabled: true,
      registeredAt: new Date().toISOString()
    };

    // Save to simulated database and lock device
    const updatedDb = [...registeredUsers, newUser];
    setRegisteredUsers(updatedDb);
    localStorage.setItem('vfl_registered_users_db', JSON.stringify(updatedDb));
    localStorage.setItem('vfl_device_registered_user', JSON.stringify(newUser));
    setHasRegisteredOnDevice(true);
    setCurrentUser(newUser);

    // If user registered as a Merchant, add them to Founder Admin approval queue
    if (selectedRole === 'merchant' || selectedRole === 'service_provider') {
      setPendingMerchants([
        ...pendingMerchants,
        {
          id: `pm_${Date.now()}`,
          businessName: newUser.fullName,
          phone: newUser.phone,
          categoryId: 'daily_needs',
          eSigned: true,
          status: 'pending'
        }
      ]);
    }

    alert('✅ Verification Successful! Your account is created and this device is now locked to your credentials.');
    setOnboardingStep('app');
    // Route user to their role's primary portal
    setActivePortal(
      selectedRole === 'customer'
        ? 'customer'
        : selectedRole === 'delivery_agent'
        ? 'rider'
        : 'merchant'
    );
  };

  /**
   * handlePasswordLogin
   * Verifies username/phone + password against registeredUsers database.
   */
  const handlePasswordLogin = (e) => {
    e.preventDefault();
    const query = loginForm.usernameOrPhone.trim().toLowerCase();
    const matchedUser = registeredUsers.find(
      (u) => (u.username.toLowerCase() === query || u.phone === query) && u.role === selectedRole
    );

    if (!matchedUser) {
      setAuthError(`No verified ${selectedRole.replace('_', ' ')} account matches these credentials.`);
      return;
    }

    if (matchedUser.passwordHash !== loginForm.password) {
      setAuthError('Incorrect password. Please try again.');
      return;
    }

    setCurrentUser(matchedUser);
    localStorage.setItem('vfl_device_registered_user', JSON.stringify(matchedUser));
    setHasRegisteredOnDevice(true);
    setAuthError('');
    setOnboardingStep('app');
    setActivePortal(
      matchedUser.role === 'customer'
        ? 'customer'
        : matchedUser.role === 'delivery_agent'
        ? 'rider'
        : 'merchant'
    );
  };

  /**
   * handlePinLogin
   * Fast 4-Digit PIN unlock for devices that already completed registration.
   */
  const handlePinLogin = (e) => {
    e.preventDefault();
    const targetUser = currentUser || savedDeviceUser;
    if (!targetUser) {
      setAuthStage('signin');
      return;
    }

    if (loginForm.pinInput === targetUser.fastPin) {
      setCurrentUser(targetUser);
      setAuthError('');
      setOnboardingStep('app');
      setActivePortal(
        targetUser.role === 'customer'
          ? 'customer'
          : targetUser.role === 'delivery_agent'
          ? 'rider'
          : 'merchant'
      );
    } else {
      setAuthError('Incorrect 4-Digit PIN.');
    }
  };

  /**
   * handleBiometricLogin
   * Uses device WebAuthn / Fingerprint / Face Unlock sensor for 1-tap login.
   */
  const handleBiometricLogin = async () => {
    const targetUser = currentUser || savedDeviceUser;
    if (!targetUser) return;

    if (window.PublicKeyCredential) {
      try {
        setCurrentUser(targetUser);
        setOnboardingStep('app');
        setActivePortal(
          targetUser.role === 'customer'
            ? 'customer'
            : targetUser.role === 'delivery_agent'
            ? 'rider'
            : 'merchant'
        );
      } catch (err) {
        alert('Biometric sensor cancelled. Please enter your 4-digit PIN.');
      }
    } else {
      alert('Biometric sensor not detected on this browser. Please use your 4-digit PIN.');
    }
  };

  /**
   * handleGrantAllPermissions
   * Grants Location, Notification, Camera, and Storage access & requests live GPS coordinates.
   */
  const allPermissionsGranted =
    permissions.location && permissions.notifications && permissions.camera && permissions.storage;

  const handleGrantAllPermissions = () => {
    setPermissions({
      location: true,
      notifications: true,
      camera: true,
      storage: true
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapModal((prev) => ({
            ...prev,
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4)),
            addressLabel: `Live GPS Pin (${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E)`
          }));
        },
        () => {}
      );
    }
  };

  // ==========================================================================
  // [SECTION-04] LOGISTICS, CART MANAGEMENT, ORDER FLOW & EVENT MATH FUNCTIONS
  // ==========================================================================

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;
  const isCustomerLockedWaitingForMerchantBill =
    activeOrder &&
    activeOrder.status === 'ORDER_PLACED_MERCHANT_POPUP' &&
    activeOrder.categoryId === selectedCategory;

  /**
   * calculateLogistics
   * Automatically selects vehicle type and calculates delivery fee based on total order weight:
   * - Up to 45kg (45,000g)        -> 2-Wheeler Rider (Base ₹25 + ₹3 per 0.5km beyond 2.5km)
   * - 45kg to 300kg (3 Quintals)  -> 3-Wheeler Auto (₹50 per Quintal, capped at ₹150 max)
   * - Above 300kg                 -> Merchant Heavy Transport (Custom fee + labor fee)
   */
  const calculateLogistics = (weightGrams, distanceKm, heavyTransportFee = 0, laborFee = 0) => {
    let vehicle = '2-Wheeler Rider (Up to 45kg)';
    let baseDelivery = 25;
    if (weightGrams <= 45000) {
      vehicle = '2-Wheeler Rider (Up to 45kg)';
      baseDelivery = 25;
      if (distanceKm > 2.5) {
        baseDelivery += Math.ceil((distanceKm - 2.5) / 0.5) * 3;
      }
    } else if (weightGrams <= 300000) {
      vehicle = '3-Wheeler Auto (Up to 3 Quintals / ₹150 Cap)';
      const quintals = Math.ceil(weightGrams / 100000);
      baseDelivery = Math.min(quintals * 50, 150);
    } else {
      vehicle = 'Merchant Heavy Transport (Steel/Cement)';
      baseDelivery = 0;
    }
    return {
      vehicle,
      deliveryFee: baseDelivery + Number(heavyTransportFee || 0) + Number(laborFee || 0)
    };
  };

  /**
   * handleAddToCart
   * Adds selected product variant to the isolated category cart.
   * If user is a Prime Customer with an active un-dispatched order in the same category,
   * silently merges the item into that active order.
   */
  const handleAddToCart = (product) => {
    const chosenVariantId = selectedVariantMap[product.id] || product.variants[0].id;
    const variant = product.variants.find((v) => v.id === chosenVariantId) || product.variants[0];

    const mergeableOrder = orders.find(
      (o) =>
        o.categoryId === product.categoryId &&
        [
          'ORDER_PLACED_MERCHANT_POPUP',
          'MERCHANT_CONFIRMED_WAIT_PAYMENT',
          'PAYMENT_DONE_PACKING_STARTED',
          'READY_FOR_PICKUP_AGENT_ALERTED'
        ].includes(o.status) &&
        !o.tokenHandedOver
    );

    if (isPrimeCustomer && mergeableOrder) {
      const updatedItems = [...mergeableOrder.items];
      const existingIdx = updatedItems.findIndex(
        (i) => i.productId === product.id && i.variantId === variant.id
      );
      if (existingIdx > -1) {
        updatedItems[existingIdx].qty += 1;
      } else {
        updatedItems.push({
          productId: product.id,
          name: `${product.subCategoryBrand} (${variant.label})`,
          price: variant.price,
          weightGrams: variant.weightGrams,
          qty: 1,
          variantId: variant.id
        });
      }
      const newWeight = updatedItems.reduce((s, i) => s + i.weightGrams * i.qty, 0);
      const newItemsTotal = updatedItems.reduce((s, i) => s + i.price * i.qty, 0);
      const newDistance = Number((mergeableOrder.distanceKm + 0.3).toFixed(1));
      const { vehicle, deliveryFee } = calculateLogistics(
        newWeight,
        newDistance,
        mergeableOrder.heavyTransportFee,
        mergeableOrder.laborFee
      );
      const gst = Number(((newItemsTotal + deliveryFee) * 0.05).toFixed(2));

      setOrders(
        orders.map((o) =>
          o.id === mergeableOrder.id
            ? {
                ...o,
                items: updatedItems,
                totalWeightGrams: newWeight,
                distanceKm: newDistance,
                vehicle,
                itemsTotal: newItemsTotal,
                deliveryFee,
                gst,
                grandTotal: Number((newItemsTotal + deliveryFee + gst).toFixed(2)),
                status: 'ORDER_PLACED_MERCHANT_POPUP'
              }
            : o
        )
      );
      return;
    }

    const currentCart = categoryCarts[product.categoryId] || [];
    const existing = currentCart.find(
      (item) => item.productId === product.id && item.variantId === variant.id
    );
    let updated;
    if (existing) {
      updated = currentCart.map((item) =>
        item.productId === product.id && item.variantId === variant.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      updated = [
        ...currentCart,
        {
          productId: product.id,
          variantId: variant.id,
          name: `${product.subCategoryBrand} (${variant.label})`,
          shopName: product.shopName,
          price: variant.price,
          mrp: variant.mrp || variant.price + 15,
          weightGrams: variant.weightGrams,
          image: product.image,
          qty: 1
        }
      ];
    }
    setCategoryCarts({ ...categoryCarts, [product.categoryId]: updated });
  };

  /**
   * handleUpdateCartQty
   * Increments or decrements item quantity inside a specific category cart.
   */
  const handleUpdateCartQty = (catId, productId, variantId, delta) => {
    const currentCart = categoryCarts[catId] || [];
    const updated = currentCart
      .map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, qty: item.qty + delta };
        }
        return item;
      })
      .filter((item) => item.qty > 0);
    setCategoryCarts({ ...categoryCarts, [catId]: updated });
  };

  /**
   * handlePlaceCategoryOrder
   * Submits the current category cart to the `/api/orders` serverless endpoint
   * and pushes the order into the Merchant Order Queue with a masked 4-digit doorstep OTP.
   */
  const handlePlaceCategoryOrder = async (catId) => {
    const currentCart = categoryCarts[catId] || [];
    if (currentCart.length === 0) return;

    const totalWeightGrams = currentCart.reduce((s, i) => s + i.weightGrams * i.qty, 0);
    const itemsTotal = currentCart.reduce((s, i) => s + i.price * i.qty, 0);
    const { vehicle, deliveryFee } = calculateLogistics(totalWeightGrams, mapModal.distanceKm, 0, 0);
    const gst = Number(((itemsTotal + deliveryFee) * 0.05).toFixed(2));
    const grandTotal = Number((itemsTotal + deliveryFee + gst).toFixed(2));
    const secretOtp = String(Math.floor(1000 + Math.random() * 9000));

    // Trial API Call to Vercel Serverless Function (/api/orders)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: currentUser?.fullName || (isPrimeCustomer ? 'Anvesh (👑 Prime)' : 'Neighbor #101'),
          items: currentCart,
          totalAmount: grandTotal,
          deliveryAddress: mapModal.addressLabel
        })
      });
      const data = await response.json();
      console.log('API Order Submission Result:', data);
    } catch (err) {
      console.warn('API route not reached, running in offline fallback mode:', err);
    }

    const newOrder = {
      id: `VFL-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: catId,
      categoryName: categories.find((c) => c.id === catId)?.name || 'Town Order',
      customerName: currentUser?.fullName || (isPrimeCustomer ? 'Anvesh (👑 Prime)' : 'Neighbor #101'),
      address: mapModal.addressLabel,
      distanceKm: mapModal.distanceKm,
      items: currentCart,
      totalWeightGrams,
      vehicle,
      itemsTotal,
      heavyTransportFee: 0,
      laborFee: 0,
      deliveryFee,
      gst,
      grandTotal,
      status: 'ORDER_PLACED_MERCHANT_POPUP',
      tokenHandedOver: false,
      secretOtp
    };

    setOrders([newOrder, ...orders]);
    setActiveOrderId(newOrder.id);
    setCategoryCarts({ ...categoryCarts, [catId]: [] });
    setShowCartWindow(false);
  };

  /**
   * handleCreateConcurrentNewOrder
   * Used by the Testing Bench & Merchant Simulator to generate a live test order in 1 click.
   */
  const handleCreateConcurrentNewOrder = () => {
    const sampleItem = products[0];
    const v = sampleItem.variants[1];
    const secretOtp = String(Math.floor(1000 + Math.random() * 9000));
    const newOrd = {
      id: `VFL-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: 'daily_needs',
      categoryName: 'Daily Home Needs',
      customerName: `VocalForLocal Neighbor #${orders.length + 2}`,
      address: 'Vidya Nagar Colony, Adilabad (1.8 km)',
      distanceKm: 1.8,
      items: [
        {
          productId: sampleItem.id,
          variantId: v.id,
          name: `${sampleItem.subCategoryBrand} (${v.label})`,
          price: v.price,
          weightGrams: v.weightGrams,
          qty: 1
        }
      ],
      totalWeightGrams: v.weightGrams,
      vehicle: '2-Wheeler Rider (Up to 45kg)',
      itemsTotal: v.price,
      heavyTransportFee: 0,
      laborFee: 0,
      deliveryFee: 25,
      gst: Number(((v.price + 25) * 0.05).toFixed(2)),
      grandTotal: Number(((v.price + 25) * 1.05).toFixed(2)),
      status: 'ORDER_PLACED_MERCHANT_POPUP',
      tokenHandedOver: false,
      secretOtp
    };
    setOrders([newOrd, ...orders]);
    setActiveOrderId(newOrd.id);
  };

  /**
   * Order Lifecycle Stage Transitions:
   * 1. ORDER_PLACED_MERCHANT_POPUP      -> Merchant reviews stock & adds any heavy transport/labor fee
   * 2. MERCHANT_CONFIRMED_WAIT_PAYMENT  -> Customer pays final bill via UPI Escrow
   * 3. PAYMENT_DONE_PACKING_STARTED     -> Merchant packs order & alerts nearby rider
   * 4. READY_FOR_PICKUP_AGENT_ALERTED   -> Rider accepts pickup token (locks order from cancellation)
   * 5. OUT_FOR_DELIVERY_LIVE_MAP        -> Rider navigates to customer & enters 4-digit doorstep OTP
   * 6. DELIVERED_REVIEW_POPUP           -> Order completed & customer rates experience
   */
  const handleCancelOrderBeforeHandover = (orderId) => {
    setOrders(orders.filter((o) => o.id !== orderId));
    if (activeOrderId === orderId) setActiveOrderId(null);
    alert('Order cancelled prior to rider token handover. Minimal cancellation charge of ₹10 applied.');
  };

  const handleMerchantConfirmBill = (orderId, heavyFee, laborCost) => {
    setOrders(
      orders.map((o) => {
        if (o.id !== orderId) return o;
        const { vehicle, deliveryFee } = calculateLogistics(
          o.totalWeightGrams,
          o.distanceKm,
          heavyFee,
          laborCost
        );
        const gst = Number(((o.itemsTotal + deliveryFee) * 0.05).toFixed(2));
        return {
          ...o,
          heavyTransportFee: Number(heavyFee || 0),
          laborFee: Number(laborCost || 0),
          vehicle,
          deliveryFee,
          gst,
          grandTotal: Number((o.itemsTotal + deliveryFee + gst).toFixed(2)),
          status: 'MERCHANT_CONFIRMED_WAIT_PAYMENT'
        };
      })
    );
  };

  const handleCustomerPayOrder = (orderId) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: 'PAYMENT_DONE_PACKING_STARTED' } : o))
    );
  };

  const handleMerchantDispatchAlert = (orderId) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: 'READY_FOR_PICKUP_AGENT_ALERTED' } : o))
    );
  };

  const handleRiderAcceptPickupToken = (orderId) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: 'OUT_FOR_DELIVERY_LIVE_MAP', tokenHandedOver: true }
          : o
      )
    );
  };

  const handleVerifyDeliveryOtp = (orderId) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;
    if (riderOtpInput.trim() === target.secretOtp) {
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'DELIVERED_REVIEW_POPUP' } : o)));
      setRiderOtpInput('');
    } else {
      alert('Incorrect OTP! Please ask the consumer for the 4-digit code displayed on their screen.');
    }
  };

  const handleCompleteReviewAndReset = (orderId) => {
    setOrders(orders.filter((o) => o.id !== orderId));
    setActiveOrderId(null);
    setReviewText('');
    setShowCartWindow(false);
    setActiveCustomerSection('shop');
  };

  /**
   * getDaysUntilEvent & Dynamic Escrow Percentage
   * Rule: If event is 5+ days away -> 35% advance escrow. If <5 days away -> 85% advance escrow.
   */
  const getDaysUntilEvent = () => {
    const today = new Date('2026-10-23T00:00:00');
    const selected = new Date(`${eventDate}T00:00:00`);
    const diff = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 1);
  };
  const daysAway = getDaysUntilEvent();
  const advancePercentage = daysAway >= 5 ? 35 : 85;

  // ==========================================================================
  // [SECTION-05] SCREEN 1 — NATIVE DEVICE PERMISSIONS GATEWAY UI
  // ==========================================================================
  const renderPermissionsScreen = () => (
    <MobilePhoneShell title="VocalForLocal • Setup" badge="Step 1 of 2">
      <div className="flex flex-col justify-between h-full py-2 space-y-4">
        <div className="text-center space-y-1.5 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30">
            🌿
          </div>
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 px-3 py-0.5 rounded-full border border-emerald-500/30">
            VocalForLocal • Adilabad
          </span>
          <h1 className="text-lg font-extrabold text-white">Peace-of-Mind Permissions</h1>
          <p className="text-[11px] text-slate-300 max-w-xs mx-auto leading-relaxed">
            To connect you with verified neighborhood stores, live GPS bike riders, and instant bill alerts, please grant device permissions.
          </p>
        </div>

        {/* Interactive Permission Toggle Cards */}
        <div className="space-y-2.5">
          {[
            {
              key: 'location',
              icon: '📍',
              title: 'Precise GPS Location',
              desc: 'Auto-calculates nearest shop distance & live rider route'
            },
            {
              key: 'notifications',
              icon: '🔔',
              title: 'Instant Bill & Bid Alerts',
              desc: '3-min merchant bill confirmation & live decorator quotes'
            },
            {
              key: 'camera',
              icon: '📷',
              title: 'Camera & Microphone',
              desc: 'Upload Rx prescriptions, product photos & UPI QR scan'
            },
            {
              key: 'storage',
              icon: '🗂️',
              title: 'Device Storage & Offline Cache',
              desc: 'Saves GST invoices & fast-loads local store catalogs'
            }
          ].map((item) => {
            const granted = permissions[item.key];
            return (
              <div
                key={item.key}
                onClick={() => setPermissions({ ...permissions, [item.key]: !granted })}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  granted
                    ? 'bg-emerald-950/60 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl bg-slate-800/90 w-10 h-10 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    granted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {granted ? '✓ Allowed' : 'Allow'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3 text-[10px] text-emerald-200 flex items-center gap-2">
          <span className="text-base">🛡️</span>
          <span>
            <strong>100% Privacy Promise:</strong> Your phone number & doorstep OTP stay masked until delivery.
          </span>
        </div>

        <div className="space-y-2 pt-1">
          {!allPermissionsGranted ? (
            <button
              onClick={handleGrantAllPermissions}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-extrabold py-3 rounded-2xl text-xs shadow-lg shadow-emerald-500/25"
            >
              ✓ Allow All Permissions & Continue
            </button>
          ) : (
            <button
              onClick={() => setOnboardingStep('auth')}
              className="w-full bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-extrabold py-3 rounded-2xl text-xs shadow-lg"
            >
              Continue to Login / Sign Up ➔
            </button>
          )}
        </div>
      </div>
    </MobilePhoneShell>
  );

  // ==========================================================================
  // [SECTION-06] SCREEN 2 — MULTI-STEP REGISTRATION, LOGIN & FAST PIN UI
  // ==========================================================================
  /**
   * Future Update Tip:
   * To replace the placeholder logo with your final company logo image,
   * replace the `<span>🌿</span>` inside the Oval Company Logo Header below
   * with `<img src="/your-logo.png" alt="VocalForLocal" className="w-full h-full object-contain" />`.
   */
  const renderAuthScreen = () => (
    <MobilePhoneShell title="VocalForLocal" badge="Security Vault">
      <div className="flex flex-col justify-center min-h-[730px] px-3 py-2 text-white">
        {/* Oval Company Logo Header */}
        <div className="flex justify-center mb-3">
          <div className="w-24 h-24 rounded-full border-2 border-emerald-400/80 bg-slate-900/80 flex flex-col items-center justify-center p-2 text-center shadow-lg shadow-emerald-500/20">
            <span className="text-3xl">🌿</span>
            <span className="text-[9px] font-black tracking-widest text-emerald-300">VOCALFORLOCAL</span>
          </div>
        </div>

        {/* Validation / Security Alert Banner */}
        {authError && (
          <div className="bg-rose-950/90 border border-rose-500 rounded-xl p-2.5 mb-2.5 text-[11px] text-rose-200 text-center font-semibold">
            ⚠️ {authError}
          </div>
        )}

        {/* SUB-SCREEN A: FAST ACCESS / DEVICE-LOCKED MODE (4-Digit PIN & Biometrics) */}
        {authStage === 'fast_login' && (
          <div className="space-y-4 px-2">
            <div className="text-center">
              <h2 className="text-sm font-bold text-emerald-400">Welcome Back</h2>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">
                {currentUser?.fullName || savedDeviceUser?.fullName}
              </p>
              <span className="inline-block text-[9px] uppercase tracking-wider bg-slate-800 text-teal-300 px-2 py-0.5 rounded-full mt-1 border border-slate-700">
                {(currentUser?.role || savedDeviceUser?.role || 'customer').replace('_', ' ')}
              </span>
            </div>

            <form onSubmit={handlePinLogin} className="space-y-3">
              <label className="block text-[10px] text-slate-400 text-center font-bold">
                ENTER 4-DIGIT QUICK PIN
              </label>
              <input
                type="password"
                maxLength={4}
                required
                autoFocus
                placeholder="••••"
                value={loginForm.pinInput}
                onChange={(e) => setLoginForm({ ...loginForm, pinInput: e.target.value })}
                className="w-36 mx-auto block bg-[#0a1820] border-2 border-emerald-500/80 rounded-2xl py-2 text-center text-xl tracking-[0.4em] font-mono text-white outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-md"
              >
                Unlock with PIN
              </button>
            </form>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={handleBiometricLogin}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl text-xs text-slate-200 shadow"
              >
                <span className="text-lg">👆</span> Fast Biometric Login
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex justify-between text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setAuthError('');
                  setAuthStage('signin');
                }}
                className="text-teal-400 underline font-semibold"
              >
                Use Password Instead
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear registered device lock for testing?')) {
                    localStorage.removeItem('vfl_device_registered_user');
                    setHasRegisteredOnDevice(false);
                    setCurrentUser(null);
                    setAuthStage('landing');
                  }
                }}
                className="text-rose-400 underline"
              >
                Reset Device Lock
              </button>
            </div>
          </div>
        )}

        {/* SUB-SCREEN B: INITIAL LANDING PAGE (Role Dropdown + Sign In / Register New) */}
        {authStage === 'landing' && (
          <div className="space-y-4 px-3">
            <div className="text-center">
              <h2 className="text-sm font-black text-white">Adilabad Secure Portal</h2>
              <p className="text-[11px] text-slate-400">Verified Hyperlocal Accounts & Fraud Prevention</p>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Select Account Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-[#0a1820] border-2 border-slate-700 text-white font-bold text-xs rounded-xl p-3 outline-none focus:border-emerald-400"
              >
                <option value="customer">Customer (Neighborhood Shopping & Rides)</option>
                <option value="merchant">Merchant (Store / Hall Owner)</option>
                <option value="service_provider">Service Provider (Decorator / Events)</option>
                <option value="delivery_agent">Delivery Agent (Bike / Auto Captain)</option>
              </select>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthError('');
                  setAuthStage('signin');
                }}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-xl border border-slate-700"
              >
                Sign In
              </button>
              {/* Once registered on device, hide 'Register New' and show 'Quick PIN / Bio' */}
              {!hasRegisteredOnDevice ? (
                <button
                  type="button"
                  onClick={() => {
                    setAuthError('');
                    setAuthStage('signup_step1');
                  }}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-md"
                >
                  Register New
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthStage('fast_login')}
                  className="flex-1 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black rounded-xl shadow-md"
                >
                  Quick PIN / Bio
                </button>
              )}
            </div>
          </div>
        )}

        {/* SUB-SCREEN C: USERNAME & PASSWORD SIGN IN */}
        {authStage === 'signin' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3 px-3">
            <div className="text-center mb-1">
              <h3 className="text-xs font-bold text-emerald-400">Sign In to Your Account</h3>
              <span className="text-[10px] text-slate-400 capitalize">Role: {selectedRole.replace('_', ' ')}</span>
            </div>

            <input
              type="text"
              required
              placeholder="Username or 10-Digit Mobile"
              value={loginForm.usernameOrPhone}
              onChange={(e) => setLoginForm({ ...loginForm, usernameOrPhone: e.target.value })}
              className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-400"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-400"
            />

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAuthStage(hasRegisteredOnDevice ? 'fast_login' : 'landing')}
                className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow"
              >
                Verify & Enter
              </button>
            </div>
          </form>
        )}

        {/* SUB-SCREEN D: REGISTRATION STEP 1 OF 3 (Mandatory Phone OTP) */}
        {authStage === 'signup_step1' && (
          <div className="space-y-3 px-3">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Step 1 of 3</span>
              <h3 className="text-xs font-bold text-white">Phone Verification (Anti-Fraud)</h3>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1">10-DIGIT MOBILE NUMBER</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="e.g. 9848011223"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  className="flex-1 bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={handleSendRegistrationOtp}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] px-3 rounded-xl"
                >
                  Send OTP
                </button>
              </div>
            </div>

            {regForm.generatedOtp && (
              <div className="space-y-2 pt-1">
                <label className="block text-[10px] text-emerald-400 font-bold">ENTER 6-DIGIT OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-Digit OTP"
                  value={regForm.otpInput}
                  onChange={(e) => setRegForm({ ...regForm, otpInput: e.target.value })}
                  className="w-full bg-[#0a1820] border-2 border-emerald-500/80 rounded-xl p-2.5 text-center text-sm font-mono tracking-widest text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleVerifyRegistrationOtp}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow"
                >
                  Verify Phone Number ➔
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setAuthStage('landing')}
              className="w-full text-center text-[10px] text-slate-400 underline mt-2"
            >
              Cancel & Return Home
            </button>
          </div>
        )}

        {/* SUB-SCREEN E: REGISTRATION STEP 2 OF 3 (Legal Name, Username, Gov ID & Selfie) */}
        {authStage === 'signup_step2' && (
          <div className="space-y-2.5 px-3">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Step 2 of 3</span>
              <h3 className="text-xs font-bold text-white">Identity Credentials & Verification</h3>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">FULL LEGAL NAME</label>
              <input
                type="text"
                required
                placeholder="As per Government ID"
                value={regForm.fullName}
                onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2 text-xs text-white outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">UNIQUE USERNAME</label>
              <input
                type="text"
                required
                placeholder="e.g. anvesh_adilabad"
                value={regForm.username}
                onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2 text-xs text-white outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">
                GOVERNMENT ID PROOF NUMBER (12 CHARACTERS)
              </label>
              <input
                type="text"
                maxLength={12}
                required
                placeholder="Enter 12-Character ID Proof"
                value={regForm.govId}
                onChange={(e) => setRegForm({ ...regForm, govId: e.target.value })}
                className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2 text-xs font-mono text-white outline-none focus:border-emerald-400"
              />
              <p className="text-[9px] text-slate-400 mt-0.5">Enforces 1 Account Per Citizen policy.</p>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">SELFIE / PHOTO VERIFICATION</label>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleCaptureSelfie}
                className="w-full text-[10px] text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-500 file:text-slate-950"
              />
              {regForm.selfieUrl && (
                <div className="mt-1 flex items-center gap-2">
                  <img
                    src={regForm.selfieUrl}
                    alt="Selfie preview"
                    className="w-9 h-9 rounded-full object-cover border border-emerald-400"
                  />
                  <span className="text-[9px] text-emerald-400 font-bold">✓ Photo attached</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAuthStage('signup_step1')}
                className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleCompleteIdentityStep}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow"
              >
                Continue to Security ➔
              </button>
            </div>
          </div>
        )}

        {/* SUB-SCREEN F: REGISTRATION STEP 3 OF 3 (Strong Password & 4-Digit Quick PIN) */}
        {authStage === 'signup_step3' && (
          <div className="space-y-3 px-3">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Step 3 of 3</span>
              <h3 className="text-xs font-bold text-white">Password & Biometric Fast PIN</h3>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">
                PASSWORD (MIN 8 CHARS, 1 NUMBER, 1 UPPERCASE)
              </label>
              <input
                type="password"
                required
                placeholder="e.g. Adilabad@2026"
                value={regForm.password}
                onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2 text-xs text-white outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">CONFIRM PASSWORD</label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                value={regForm.confirmPassword}
                onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                className="w-full bg-[#0a1820] border-2 border-slate-700 rounded-xl p-2 text-xs text-white outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-0.5">CREATE 4-DIGIT QUICK PIN</label>
              <input
                type="password"
                maxLength={4}
                required
                placeholder="••••"
                value={regForm.fastPin}
                onChange={(e) => setRegForm({ ...regForm, fastPin: e.target.value })}
                className="w-36 bg-[#0a1820] border-2 border-emerald-500/80 rounded-xl p-2 text-center text-sm font-mono tracking-widest text-white outline-none"
              />
              <p className="text-[9px] text-slate-400 mt-0.5">Used for biometric fallback and instant unlocks.</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAuthStage('signup_step2')}
                className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleFinalizeRegistration}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow"
              >
                Lock Device & Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </MobilePhoneShell>
  );

  // ==========================================================================
  // [SECTION-07] PORTAL 1 — CUSTOMER SUPER-APP (STORES, DECOR BIDDING, TAXI)
  // ==========================================================================
  /**
   * Role Access Note:
   * Even if a user logs in as a Merchant, Service Provider, or Delivery Agent,
   * they can switch to this Customer Portal to do their own personal shopping,
   * while remaining restricted from other roles' operational consoles.
   */
  const renderCustomerPortal = () => {
    const currentCart = categoryCarts[selectedCategory] || [];
    const totalSavings = currentCart.reduce(
      (s, i) => s + ((i.mrp || i.price + 12) - i.price) * i.qty,
      0
    );

    // Filter products by selected category, search query, and curiosity filter pills
    const approvedProducts = products
      .filter((p) => p.categoryId === selectedCategory && p.status === 'approved')
      .filter((p) =>
        searchQuery.trim() === ''
          ? true
          : p.subCategoryBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.shopName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((p) => {
        if (activeCuriosityFilter === 'under100') return p.variants[0].price <= 100;
        if (activeCuriosityFilter === 'fresh') return (p.buyersToday || 20) >= 35;
        return true;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return (
      <MobilePhoneShell title="🌿 VocalForLocal" badge="Peace-of-Mind Hub">
        {/* Top Header: Brand Title, Prime Toggle, GPS Address & Category Cart Button */}
        <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                VocalForLocal
              </h2>
              <button
                onClick={() => setIsPrimeCustomer(!isPrimeCustomer)}
                className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition ${
                  isPrimeCustomer
                    ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isPrimeCustomer ? '👑 Prime Merge ON' : 'Standard'}
              </button>
            </div>
            <button
              onClick={() => setMapModal({ ...mapModal, open: true, mode: 'consumer_pin' })}
              className="text-[10px] text-teal-300/90 hover:text-teal-200 flex items-center gap-1 mt-0.5"
            >
              📍 {mapModal.addressLabel.slice(0, 30)}...
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* If logged-in user is a Merchant/Rider shopping for themselves, show quick button back to their duty portal */}
            {currentUser && currentUser.role !== 'customer' && (
              <button
                onClick={() =>
                  setActivePortal(currentUser.role === 'delivery_agent' ? 'rider' : 'merchant')
                }
                className="bg-slate-800 text-amber-300 border border-amber-500/40 px-2 py-1.5 rounded-xl text-[9px] font-bold"
              >
                ⚡ My Duty Desk
              </button>
            )}
            <button
              onClick={() => setShowCartWindow(true)}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 px-3 py-1.5 rounded-2xl text-[11px] font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-1"
            >
              <span>🛒</span>
              <span>{currentCart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
          </div>
        </div>

        {/* Peace-of-Mind Assurance Strip */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl px-3 py-2 flex justify-between items-center text-[10px]">
          <span className="text-emerald-300 font-semibold">🛡️ Zero Hidden Fees</span>
          <span className="text-slate-400">•</span>
          <span className="text-teal-300 font-semibold">⏱️ 3m Bill Lock</span>
          <span className="text-slate-400">•</span>
          <span className="text-amber-300 font-semibold">🔐 OTP Escrow</span>
        </div>

        {/* Live Active Order Tracker Banner */}
        {activeOrder && (
          <div className="bg-slate-900/95 border border-emerald-400/60 rounded-2xl p-3 shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-extrabold text-emerald-300">
                ⚡ {activeOrder.id} • {activeOrder.categoryName}
              </span>
              {!activeOrder.tokenHandedOver && activeOrder.status !== 'DELIVERED_REVIEW_POPUP' && (
                <button
                  onClick={() => handleCancelOrderBeforeHandover(activeOrder.id)}
                  className="text-[9px] bg-rose-950 text-rose-300 border border-rose-700 px-2 py-0.5 rounded-lg font-bold"
                >
                  ✕ Cancel (₹10 Fee)
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-300 mb-1.5">
              Status: <strong className="text-amber-300">{activeOrder.status.replace(/_/g, ' ')}</strong>
            </p>

            {activeOrder.status === 'MERCHANT_CONFIRMED_WAIT_PAYMENT' && (
              <div className="bg-emerald-950/90 border border-emerald-500 p-2.5 rounded-xl">
                <p className="text-[11px] font-bold text-emerald-200 mb-1.5">
                  🔔 Store Verified Stock & Bill: ₹{activeOrder.grandTotal}
                </p>
                <button
                  onClick={() => handleCustomerPayOrder(activeOrder.id)}
                  className="w-full bg-emerald-400 text-slate-950 font-extrabold py-1.5 rounded-xl text-[11px]"
                >
                  Pay ₹{activeOrder.grandTotal} via UPI (Peace-of-Mind Escrow)
                </button>
              </div>
            )}

            {activeOrder.status === 'OUT_FOR_DELIVERY_LIVE_MAP' && (
              <div className="bg-teal-950/80 border border-teal-400 p-2.5 rounded-xl text-[11px]">
                <p className="font-bold text-teal-200">🛵 Neighborhood Rider Live on GPS</p>
                <p className="text-amber-300 font-mono font-bold mt-0.5">
                  🔐 Share Doorstep OTP: {activeOrder.secretOtp}
                </p>
              </div>
            )}

            {activeOrder.status === 'DELIVERED_REVIEW_POPUP' && (
              <div className="bg-amber-950/80 border border-amber-400 p-2.5 rounded-xl text-[11px]">
                <p className="font-bold text-amber-300 mb-1">⭐ Delivered Safely! Rate Local Store</p>
                <input
                  type="text"
                  placeholder="Super fast & fresh quality..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-[11px] mb-1.5 text-white"
                />
                <button
                  onClick={() => handleCompleteReviewAndReset(activeOrder.id)}
                  className="w-full bg-emerald-400 text-slate-950 font-bold py-1.5 rounded-lg"
                >
                  Submit & Continue Exploring
                </button>
              </div>
            )}
          </div>
        )}

        {/* Customer Mode Switcher: Stores | Decor Bids | Bike/Auto */}
        <div className="grid grid-cols-3 gap-1.5 text-[11px] bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveCustomerSection('shop')}
            className={`py-2 rounded-xl font-extrabold transition ${
              activeCustomerSection === 'shop'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow'
                : 'text-slate-300'
            }`}
          >
            🛍️ Local Stores
          </button>
          <button
            onClick={() => setActiveCustomerSection('events')}
            className={`py-2 rounded-xl font-extrabold transition ${
              activeCustomerSection === 'events'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow'
                : 'text-slate-300'
            }`}
          >
            🎉 Decor Bids
          </button>
          <button
            onClick={() => setActiveCustomerSection('taxi')}
            className={`py-2 rounded-xl font-extrabold transition ${
              activeCustomerSection === 'taxi'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow'
                : 'text-slate-300'
            }`}
          >
            🏍️ Bike/Auto
          </button>
        </div>

        {/* CUSTOMER SUB-SECTION 1: HYPERLOCAL SHOPPING */}
        {activeCustomerSection === 'shop' && (
          <div className="space-y-3">
            {/* Curiosity Mystery Deal Box */}
            <div className="bg-gradient-to-r from-emerald-900/70 via-teal-900/70 to-slate-900 border border-emerald-500/40 rounded-2xl p-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                    ✨ Today's Town Curiosity
                  </span>
                  <h3 className="text-xs font-extrabold text-white mt-1">
                    Mystery Local Harvest Deal Box
                  </h3>
                  <p className="text-[10px] text-emerald-200">
                    Tap to reveal which Adilabad store is giving ₹40 instant off!
                  </p>
                </div>
                <button
                  onClick={() => setSurpriseBoxOpen(!surpriseBoxOpen)}
                  className="bg-emerald-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-1.5 rounded-xl shadow"
                >
                  {surpriseBoxOpen ? 'Hide' : '🎁 Reveal'}
                </button>
              </div>
              {surpriseBoxOpen && (
                <div className="mt-2 pt-2 border-t border-emerald-500/30 text-[10px] text-amber-300 font-semibold flex justify-between items-center">
                  <span>🎉 Sri Laxmi Supermart: 5kg Sharbati Atta @ ₹245 (Save ₹35!)</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('daily_needs');
                      handleAddToCart(products[0]);
                    }}
                    className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded"
                  >
                    Grab Now
                  </button>
                </div>
              )}
            </div>

            {/* Search Input & Curiosity Filter Pills */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="🔍 Search atta, fresh onions, cement, Dolo 650..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
              />
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 text-[10px]">
                {[
                  { id: 'all', label: '✨ All Local Gems' },
                  { id: 'fresh', label: '🔥 Most Loved Today' },
                  { id: 'under100', label: '🪙 Pocket Friendly (<₹100)' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveCuriosityFilter(f.id)}
                    className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap border transition ${
                      activeCuriosityFilter === f.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selector Cards */}
            <div className="grid grid-cols-3 gap-2">
              {categories
                .filter((c) => c.id !== 'decorations')
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-2 rounded-2xl border text-left transition ${
                      selectedCategory === cat.id
                        ? 'border-emerald-400 bg-emerald-500/15 shadow-md shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-900/70 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-12 object-cover rounded-xl mb-1.5"
                    />
                    <p className="text-[10px] font-extrabold leading-tight text-white">{cat.name}</p>
                    <span className="text-[8px] text-emerald-400 font-semibold">{cat.badge}</span>
                  </button>
                ))}
            </div>

            <div className="flex justify-between items-center pt-1">
              <div>
                <h3 className="text-xs font-extrabold text-white">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </h3>
                <p className="text-[9px] text-slate-400">
                  {categories.find((c) => c.id === selectedCategory)?.tagline}
                </p>
              </div>
              <span className="text-[9px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                📍 Sorted by Nearest
              </span>
            </div>

            {/* Product List with Measurement Variants */}
            <div className="space-y-2.5">
              {approvedProducts.map((prod) => {
                const chosenVarId = selectedVariantMap[prod.id] || prod.variants[0].id;
                const currentVar = prod.variants.find((v) => v.id === chosenVarId) || prod.variants[0];
                const mrp = currentVar.mrp || Math.round(currentVar.price * 1.15);
                const saved = mrp - currentVar.price;

                return (
                  <div
                    key={prod.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3 flex gap-3 items-center transition shadow-sm"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={prod.image}
                        alt={prod.subCategoryBrand}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      {saved > 0 && (
                        <span className="absolute -top-1.5 -left-1.5 bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-md shadow">
                          SAVE ₹{saved}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-amber-300 font-bold">
                          {prod.curiosityTag || '✨ Local Best-Seller'}
                        </span>
                        <span className="text-[9px] text-emerald-400 font-bold">★ {prod.rating || 4.9}</span>
                      </div>

                      <h4 className="text-xs font-extrabold text-white truncate mt-0.5">
                        {prod.subCategoryBrand}
                      </h4>

                      <p className="text-[10px] text-teal-300/90">
                        🏪 {prod.shopName} • <strong>{prod.distanceKm} km</strong>
                      </p>

                      <div className="flex items-center gap-1.5 mt-2">
                        <select
                          value={currentVar.id}
                          onChange={(e) =>
                            setSelectedVariantMap({ ...selectedVariantMap, [prod.id]: e.target.value })
                          }
                          className="bg-[#061014] border border-slate-700 rounded-xl px-2 py-1 text-[10px] text-emerald-300 font-semibold flex-1"
                        >
                          {prod.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.label} — ₹{v.price}
                            </option>
                          ))}
                        </select>
                        <button
                          disabled={isCustomerLockedWaitingForMerchantBill}
                          onClick={() => handleAddToCart(prod)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition ${
                            isCustomerLockedWaitingForMerchantBill
                              ? 'bg-slate-800 text-slate-500'
                              : 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-sm'
                          }`}
                        >
                          {isCustomerLockedWaitingForMerchantBill ? 'Locked' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CUSTOMER SUB-SECTION 2: FUNCTION HALLS & ANONYMOUS DECORATOR BIDDING */}
        {activeCustomerSection === 'events' && (
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-2xl border border-emerald-500/40">
              <div className="flex justify-between items-center mb-1.5">
                <h3 className="text-[11px] font-bold text-emerald-400">📅 Step 1: Event Date & Time</h3>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  {daysAway}d away ➔ {advancePercentage}% Escrow
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="bg-[#061014] border border-slate-700 rounded-xl p-1.5 text-white"
                />
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="bg-[#061014] border border-slate-700 rounded-xl p-1.5 text-white"
                />
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-[11px] font-bold text-white">🏛️ Function Halls (Direct Transparent Booking)</h3>
              {functionHalls.map((hall) => {
                const isAvailable = !hall.bookedDates.includes(eventDate);
                return (
                  <div key={hall.id} className="bg-[#061014] p-2.5 rounded-xl flex gap-2.5 items-center border border-slate-800">
                    <img src={hall.image} alt={hall.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold">{hall.name}</h4>
                      <p className="text-[9px] text-slate-400">
                        {hall.capacity} • ₹{hall.pricePerDay}/day
                      </p>
                      <span
                        className={`text-[9px] font-bold ${
                          isAvailable ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isAvailable ? `✓ Available ${eventDate}` : `✕ Booked`}
                      </span>
                    </div>
                    {isAvailable && (
                      <button
                        onClick={() =>
                          setHallBookingState({
                            hall,
                            advanceDue: Math.round((hall.pricePerDay * advancePercentage) / 100),
                            status: 'AWAITING_HALL_CONFIRMATION'
                          })
                        }
                        className="bg-emerald-400 text-slate-950 px-2.5 py-1 rounded-lg text-[9px] font-extrabold"
                      >
                        Book
                      </button>
                    )}
                  </div>
                );
              })}
              {hallBookingState && (
                <div className="bg-emerald-950/70 border border-emerald-500 p-2.5 rounded-xl text-[10px]">
                  <p className="font-bold text-emerald-300">
                    {hallBookingState.hall.name} — {hallBookingState.status.replace(/_/g, ' ')}
                  </p>
                  {hallBookingState.status === 'HALL_CONFIRMED_PAY_ADVANCE' && (
                    <button
                      onClick={() => setHallBookingState({ ...hallBookingState, status: 'BOOKED_LOCKED' })}
                      className="mt-1.5 w-full bg-emerald-400 text-slate-950 font-bold py-1.5 rounded-lg"
                    >
                      Pay {advancePercentage}% Escrow Advance (₹{hallBookingState.advanceDue})
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-emerald-400">🌸 Anonymous Decor Reverse-Bidding</h3>
                <span className="text-[9px] text-slate-400">Zero Bias • Best Quote Wins</span>
              </div>
              {DECORATION_SERVICE_MODULES.map((mod) => {
                const inCart = decorCart.some((i) => i.id === mod.id);
                return (
                  <div key={mod.id} className="bg-[#061014] p-2.5 rounded-xl flex gap-2.5 items-center border border-slate-800">
                    <img src={mod.samplePhotos[0]} alt={mod.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold">{mod.title}</h4>
                      <p className="text-[9px] text-slate-400">{mod.programType}</p>
                      <p className="text-[10px] text-emerald-400 font-bold">Est: ₹{mod.baseEstimate}</p>
                    </div>
                    <button
                      onClick={() =>
                        setDecorCart(inCart ? decorCart.filter((i) => i.id !== mod.id) : [...decorCart, mod])
                      }
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${
                        inCart ? 'bg-rose-600 text-white' : 'bg-emerald-400 text-slate-950'
                      }`}
                    >
                      {inCart ? 'Remove' : '+ Select'}
                    </button>
                  </div>
                );
              })}

              {decorCart.length > 0 && (
                <div className="bg-teal-950/60 border border-teal-400/60 p-2.5 rounded-xl text-[10px] space-y-1.5">
                  <p className="font-bold text-teal-200">
                    🛒 Decor Cart ({decorCart.length} Packages Selected)
                  </p>
                  {biddingStatus === 'IDLE' && (
                    <button
                      onClick={() => {
                        setBiddingStatus('BROADCASTED');
                        setDecorBids([
                          {
                            id: 'bid_1',
                            maskedVendor: 'Verified Town Decorator #A1',
                            price: Math.round(decorCart.reduce((s, i) => s + i.baseEstimate, 0) * 0.88),
                            features: 'All selected features + Floral Selfie Arch + Warm LED Lights'
                          }
                        ]);
                      }}
                      className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-lg"
                    >
                      📢 Broadcast to Town Decorators
                    </button>
                  )}

                  {biddingStatus === 'BROADCASTED' &&
                    decorBids.map((b) => (
                      <div key={b.id} className="bg-slate-900 p-2 rounded-lg border border-emerald-500/40">
                        <div className="flex justify-between font-bold">
                          <span>{b.maskedVendor}</span>
                          <span className="text-emerald-400">₹{b.price}</span>
                        </div>
                        <p className="text-[9px] text-slate-300 my-1">{b.features}</p>
                        <button
                          onClick={() => {
                            setSelectedWinningBid(b);
                            setBiddingStatus('BID_ACCEPTED_AWAITING_MERCHANT');
                          }}
                          className="w-full bg-emerald-400 text-slate-950 font-bold py-1 rounded"
                        >
                          Accept Quote & Request Confirmation
                        </button>
                      </div>
                    ))}

                  {biddingStatus === 'BID_ACCEPTED_AWAITING_MERCHANT' && (
                    <p className="text-amber-300 font-bold">⏳ Waiting for Decorator Confirmation...</p>
                  )}

                  {biddingStatus === 'DEAL_FINALIZED_PAYMENT_DUE' && selectedWinningBid && (
                    <div className="bg-emerald-950 border border-emerald-400 p-2 rounded-lg">
                      <p className="font-bold text-emerald-300">
                        ✅ Pay {advancePercentage}% Advance: ₹
                        {Math.round((selectedWinningBid.price * advancePercentage) / 100)}
                      </p>
                      <p className="text-[9px] text-slate-300 mb-1">
                        Balance {100 - advancePercentage}% due 5 hrs before setup.
                      </p>
                      <button
                        onClick={() => setBiddingStatus('ADVANCE_PAID')}
                        className="w-full bg-emerald-400 text-slate-950 font-black py-1 rounded"
                      >
                        Pay Escrow Advance Now
                      </button>
                    </div>
                  )}

                  {biddingStatus === 'ADVANCE_PAID' && (
                    <p className="text-emerald-400 font-bold">
                      🎉 {advancePercentage}% Advance Locked in Safe Escrow!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CUSTOMER SUB-SECTION 3: BIKE TAXI, 3W AUTO & PARCEL */}
        {activeCustomerSection === 'taxi' && (
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2.5 text-[11px]">
            <h3 className="font-bold text-emerald-400">🏍️ Instant Bike Taxi, 3W Auto & Parcel</h3>
            <div className="bg-[#061014] p-2.5 rounded-xl space-y-2 border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup:</span>
                <button
                  onClick={() => setMapModal({ ...mapModal, open: true, mode: 'taxi_pickup' })}
                  className="text-emerald-400 underline font-bold"
                >
                  🗺️ Pin on Map
                </button>
              </div>
              <p className="text-[10px] font-semibold">{taxiRoute.pickup}</p>
              <div className="flex justify-between pt-1.5 border-t border-slate-800">
                <span className="text-slate-400">Drop:</span>
                <button
                  onClick={() => setMapModal({ ...mapModal, open: true, mode: 'taxi_drop' })}
                  className="text-teal-400 underline font-bold"
                >
                  🗺️ Pin on Map
                </button>
              </div>
              <p className="text-[10px] font-semibold">{taxiRoute.drop}</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setTaxiRoute({ ...taxiRoute, mode: '2w_taxi' })}
                className={`p-2 rounded-xl border text-center ${
                  taxiRoute.mode === '2w_taxi' ? 'border-emerald-400 bg-emerald-500/15' : 'border-slate-800'
                }`}
              >
                <p className="font-bold">🏍️ 2W Taxi</p>
                <p className="text-[9px] text-emerald-400">₹31</p>
              </button>
              <button
                onClick={() => setTaxiRoute({ ...taxiRoute, mode: '3w_auto' })}
                className={`p-2 rounded-xl border text-center ${
                  taxiRoute.mode === '3w_auto' ? 'border-emerald-400 bg-emerald-500/15' : 'border-slate-800'
                }`}
              >
                <p className="font-bold">🛺 3W Auto</p>
                <p className="text-[9px] text-emerald-400">₹50</p>
              </button>
              <button
                onClick={() => setTaxiRoute({ ...taxiRoute, mode: 'parcel' })}
                className={`p-2 rounded-xl border text-center ${
                  taxiRoute.mode === 'parcel' ? 'border-emerald-400 bg-emerald-500/15' : 'border-slate-800'
                }`}
              >
                <p className="font-bold">📦 Parcel</p>
                <p className="text-[9px] text-emerald-400">₹31</p>
              </button>
            </div>
          </div>
        )}

        {/* ISOLATED CATEGORY CART MODAL */}
        {showCartWindow && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500 rounded-3xl max-w-sm w-full p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="font-extrabold text-emerald-400 text-xs">
                  🛒 {categories.find((c) => c.id === selectedCategory)?.name} Cart
                </h3>
                <button
                  onClick={() => setShowCartWindow(false)}
                  className="bg-slate-800 px-2.5 py-0.5 rounded-lg text-xs"
                >
                  ✕
                </button>
              </div>
              {currentCart.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Your neighborhood cart is empty.</p>
              ) : (
                <>
                  {totalSavings > 0 && (
                    <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-2 text-[10px] text-emerald-300 font-bold text-center">
                      🎉 You are saving ₹{totalSavings} supporting local Adilabad stores!
                    </div>
                  )}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {currentCart.map((item) => (
                      <div
                        key={`${item.productId}_${item.variantId}`}
                        className="bg-slate-800/90 p-2.5 rounded-xl flex justify-between items-center text-xs"
                      >
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-[10px] text-emerald-400">
                            ₹{item.price} × {item.qty}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              handleUpdateCartQty(selectedCategory, item.productId, item.variantId, -1)
                            }
                            className="bg-slate-700 px-2 py-0.5 rounded-lg font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold px-1">{item.qty}</span>
                          <button
                            onClick={() =>
                              handleUpdateCartQty(selectedCategory, item.productId, item.variantId, 1)
                            }
                            className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePlaceCategoryOrder(selectedCategory)}
                    className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-extrabold py-2.5 rounded-2xl text-xs shadow-lg"
                  >
                    Send Order to Local Store (3-Min SLA)
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </MobilePhoneShell>
    );
  };

  // ==========================================================================
  // [SECTION-08] PORTAL 2 — MERCHANT & DECORATOR PARTNER APP UI
  // ==========================================================================
    const renderMerchantPortal = () => {
    // Local tab state inside the merchant portal
    const [merchantTab, setMerchantTab] = useState('orders'); // 'orders' | 'stock' | 'bids'
    const [stockItems, setStockItems] = useState([
      { id: 'st_1', name: 'Swastick Turmeric Powder', category: 'daily_needs', price: 50, unit: '250gms', inStock: true },
      { id: 'st_2', name: 'Swastick Turmeric Powder', category: 'daily_needs', price: 100, unit: '500gms', inStock: true },
      { id: 'st_3', name: 'Amul Fresh Milk', category: 'daily_needs', price: 28, unit: '500ml', inStock: false } // Out of stock example
    ]);
    const [serviceAvailability, setServiceAvailability] = useState({
      marrageDecor: true,
      haldiStage: true,
      djLighting: false
    });
    const [myBidAmount, setMyBidAmount] = useState('');
    const [myBidReason, setMyBidReason] = useState('');

    return (
      <MobilePhoneShell title="🏪 VocalForLocal Partner" badge="Merchant Desk">
        {/* Top Header & Personal Shopping Shortcut */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
          <div>
            <h2 className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              {currentUser?.fullName || 'Sri Laxmi Supermart'}
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">
              Role: {(currentUser?.role || 'merchant').replace('_', ' ')}
            </p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setActivePortal('customer')}
              className="bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 px-2.5 py-1 rounded-xl text-[9px] font-bold cursor-pointer"
            >
              🛍️ Personal Shop
            </button>
          </div>
        </div>

        {/* Merchant Portal Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 text-[10px] bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
          <button
            onClick={() => setMerchantTab('orders')}
            className={`py-1.5 rounded-lg font-extrabold transition ${
              merchantTab === 'orders'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            📦 Orders
          </button>
          <button
            onClick={() => setMerchantTab('stock')}
            className={`py-1.5 rounded-lg font-extrabold transition ${
              merchantTab === 'stock'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            📋 Stock / Services
          </button>
          <button
            onClick={() => setMerchantTab('bids')}
            className={`py-1.5 rounded-lg font-extrabold transition ${
              merchantTab === 'bids'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            🌸 Bidding Desk
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CURRENT ORDERS / APPOINTMENTS LIST                */}
        {/* ======================================================== */}
        {merchantTab === 'orders' && (
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">Active Customer Orders</h3>
              <button
                onClick={handleCreateConcurrentNewOrder}
                className="bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-xl text-[9px] font-extrabold cursor-pointer"
              >
                + Simulate Incoming Order
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center py-6">
                No active orders right now. Standing by for customer checkout.
              </p>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] space-y-2 shadow-sm"
                >
                  <div className="flex justify-between font-bold">
                    <span className="text-emerald-600 dark:text-emerald-400">{ord.id}</span>
                    <span className="text-slate-600 dark:text-slate-300">Total: ₹{ord.grandTotal}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">
                    <strong>Customer:</strong> {ord.customerName} | <strong>Delivery:</strong> {ord.address}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {ord.items.map((i) => `${i.name} x${i.qty}`).join(', ')}
                  </p>

                  {ord.status === 'ORDER_PLACED_MERCHANT_POPUP' && (
                    <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                      <div className="grid grid-cols-2 gap-1.5 text-slate-800 dark:text-white">
                        <div>
                          <label className="text-[9px] text-slate-500">Heavy Transport (₹)</label>
                          <input
                            type="number"
                            defaultValue={0}
                            onChange={(e) => (ord.heavyTransportFee = Number(e.target.value))}
                            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-500">Labor Fee (₹)</label>
                          <input
                            type="number"
                            defaultValue={0}
                            onChange={(e) => (ord.laborFee = Number(e.target.value))}
                            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-1 text-xs"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleMerchantConfirmBill(ord.id, ord.heavyTransportFee, ord.laborFee)}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl text-xs cursor-pointer"
                      >
                        ✓ Verify Stock & Send Final Bill to Customer
                      </button>
                    </div>
                  )}

                  {ord.status === 'PAYMENT_DONE_PACKING_STARTED' && (
                    <button
                      onClick={() => handleMerchantDispatchAlert(ord.id)}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-1.5 rounded-xl text-xs cursor-pointer"
                    >
                      📦 Packed & Ready ➔ Alert Rider
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: STOCK & PRODUCT INVENTORY MANUAL                 */}
        {/* ======================================================== */}
        {merchantTab === 'stock' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">Stock & Inventory Manual</h3>
              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Live Sync
              </span>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Toggle items out of stock to instantly hide them from consumers across Adilabad.
            </p>

            <div className="space-y-2">
              {stockItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">{item.name}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                      ₹{item.price} / {item.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const updated = [...stockItems];
                        updated[idx].inStock = !updated[idx].inStock;
                        setStockItems(updated);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                        item.inStock
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-400'
                      }`}
                    >
                      {item.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Provider Toggles (Rule 9) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl space-y-2">
              <h4 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                🎉 Service Provider Availability Toggles
              </h4>
              {Object.entries(serviceAvailability).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-xs">
                  <span className="capitalize text-slate-700 dark:text-slate-300">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <button
                    onClick={() =>
                      setServiceAvailability({ ...serviceAvailability, [key]: !val })
                    }
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${
                      val ? 'bg-emerald-500 text-slate-950' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-white'
                    }`}
                  >
                    {val ? 'ON (Available)' : 'OFF (Paused)'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ANONYMOUS DECORATION REVERSE-BIDDING DESK          */}
        {/* ======================================================== */}
        {merchantTab === 'bids' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white">🌸 Live Event Reverse-Bidding Desk</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Submit competitive Indian Rupee bids and pricing justifications. Identities remain masked until the 35% advance escrow is paid.
            </p>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl space-y-2.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-700 dark:text-slate-300">Active Request: Royal Wedding Setup</span>
                <span className="text-emerald-600 dark:text-emerald-400">Est Budget: ₹25,000</span>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">BID AMOUNT (INDR. CURRENCY - NUMERIC ONLY)</label>
                <input
                  type="number"
                  placeholder="e.g. 21500"
                  value={myBidAmount}
                  onChange={(e) => setMyBidAmount(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">PRICING RATIONALE / INCLUSIONS</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Includes welcome flower arch and 4 LED warm spotlights..."
                  value={myBidReason}
                  onChange={(e) => setMyBidReason(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-800 dark:text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!myBidAmount || isNaN(myBidAmount)) {
                    alert('Please enter a valid numeric value for your bid.');
                    return;
                  }
                  setDecorBids([
                    ...decorBids,
                    {
                      id: `bid_${Date.now()}`,
                      maskedVendor: 'Verified Partner (You)',
                      price: Number(myBidAmount),
                      features: myBidReason || 'Standard package inclusions'
                    }
                  ]);
                  setBiddingStatus('BROADCASTED');
                  alert('✅ Competitive bid broadcasted anonymously to consumer!');
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2 rounded-xl text-xs shadow cursor-pointer"
              >
                Submit Anonymous Bid ➔
              </button>
            </div>
          </div>
        )}
      </MobilePhoneShell>
    );
  };
  // ==========================================================================
  // [SECTION-10] PORTAL 4 — DESKTOP FOUNDER ADMIN WEB SUITE & TESTING BENCH
  // ==========================================================================
  /**
   * Dedicated Web Dashboard for the Founder to:
   * 1. Approve/Reject Pending Merchants & Brand Sub-Categories in background
   * 2. Run 1-Click Role & Order Simulations in the Temporary Testing Bench
   * 3. Inspect Verified Citizens Database
   * 4. Adjust Platform Commission Sliders (0-10% Merchant, 0-5% Consumer)
   */
  const renderFounderWebDashboard = () => (
    <div className="min-h-screen bg-[#040c10] text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900/90 border-b border-emerald-950 px-6 py-4 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-50 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-wide">
                VocalForLocal Founder Control Suite
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Adilabad Master Admin
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Background KYC, Sub-Category Moderation & Testing Bench
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.location.search.includes('admin')) {
                window.history.replaceState({}, document.title, window.location.pathname);
              }
              setViewMode('mobile_app');
            }}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            📱 Return to Clean Mobile App View
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Navigation */}
        <aside className="space-y-2">
          {[
            {
              id: 'approvals',
              label: '🛡️ Approvals & Verifications',
              count: pendingMerchants.length + pendingSubCategories.length
            },
            { id: 'testing', label: '🧪 Temporary Testing Bench', count: 'Live' },
            { id: 'users', label: '👥 Registered Citizens Database', count: registeredUsers.length },
            {
              id: 'escrow',
              label: '💰 Escrow & Commissions',
              count: `${merchantCommissionPct}% / ${consumerFeePct}%`
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFounderTab(tab.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition border ${
                founderTab === tab.id
                  ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700">
                {tab.count}
              </span>
            </button>
          ))}
        </aside>

        {/* Main Tab Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* TAB 1: MERCHANT & SUB-CATEGORY APPROVALS */}
          {founderTab === 'approvals' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-bold text-emerald-400">
                      Merchant & Service Provider Onboarding Queue
                    </h2>
                    <p className="text-xs text-slate-400">
                      E-Signed SLA and Adilabad premises verification
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
                    {pendingMerchants.length} Pending
                  </span>
                </div>

                {pendingMerchants.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">No merchants waiting in queue.</p>
                ) : (
                  <div className="space-y-2.5">
                    {pendingMerchants.map((pm) => (
                      <div
                        key={pm.id}
                        className="bg-[#061014] border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3"
                      >
                        <div>
                          <p className="text-sm font-extrabold text-white">{pm.businessName}</p>
                          <p className="text-xs text-slate-400">
                            Phone: {pm.phone} • Category:{' '}
                            <strong className="text-emerald-300 uppercase">{pm.categoryId}</strong>
                          </p>
                          <span className="inline-block text-[9px] bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded mt-1">
                            ✓ Digital E-Sign Recorded
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setPendingMerchants(pendingMerchants.filter((m) => m.id !== pm.id));
                              alert(`Approved merchant: ${pm.businessName}`);
                            }}
                            className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow"
                          >
                            ✓ Approve Merchant
                          </button>
                          <button
                            onClick={() =>
                              setPendingMerchants(pendingMerchants.filter((m) => m.id !== pm.id))
                            }
                            className="bg-rose-950 hover:bg-rose-900 border border-rose-700 text-rose-300 font-bold text-xs px-3 py-2 rounded-xl"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-bold text-emerald-400">
                      Brand Sub-Categories & Product Approvals
                    </h2>
                    <p className="text-xs text-slate-400">
                      Quality check images, town MRP guidelines, and packaging units
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
                    {pendingSubCategories.length} In Review
                  </span>
                </div>

                {pendingSubCategories.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">
                    All product listings approved and live.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pendingSubCategories.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#061014] border border-slate-800 rounded-2xl p-3.5 space-y-2"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.subCategoryBrand}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold text-white truncate">
                              {item.subCategoryBrand}
                            </h3>
                            <p className="text-[10px] text-emerald-400">{item.shopName}</p>
                            <p className="text-[10px] text-slate-400">
                              {item.variants.length} packaging variants listed
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-1 border-t border-slate-800/80">
                          <button
                            onClick={() => {
                              setProducts([...products, { ...item, status: 'approved' }]);
                              setPendingSubCategories(
                                pendingSubCategories.filter((i) => i.id !== item.id)
                              );
                            }}
                            className="flex-1 bg-emerald-500 text-slate-950 font-bold py-1.5 rounded-lg text-xs"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() =>
                              setPendingSubCategories(
                                pendingSubCategories.filter((i) => i.id !== item.id)
                              )
                            }
                            className="flex-1 bg-rose-900/60 border border-rose-700 text-rose-300 font-bold py-1.5 rounded-lg text-xs"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TEMPORARY TESTING BENCH SIMULATOR */}
          {founderTab === 'testing' && (
            <div className="bg-slate-900/80 border border-emerald-500/40 rounded-3xl p-6 space-y-6">
              <div>
                <h2 className="text-base font-extrabold text-emerald-400">
                  🧪 Developer & Founder Sandbox Simulator
                </h2>
                <p className="text-xs text-slate-300">
                  Quickly switch between user personas, test live orders, and inspect mobile screens side-by-side during active development.
                </p>
              </div>

              <div className="bg-[#061014] border border-slate-800 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Simulate Device Login As:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { role: 'customer', name: 'Khoday Anvesh', label: '🛍️ Customer View' },
                    { role: 'merchant', name: 'Sri Laxmi Supermart', label: '🏪 Merchant View' },
                    { role: 'service_provider', name: 'Royal Decorators', label: '🎉 Decorator View' },
                    { role: 'delivery_agent', name: 'Raju (Bike Captain)', label: '🛵 Rider View' }
                  ].map((sim) => (
                    <button
                      key={sim.role}
                      onClick={() => {
                        const mockUser = {
                          id: `mock_${sim.role}`,
                          fullName: sim.name,
                          username: sim.role,
                          role: sim.role,
                          phone: '9848011223'
                        };
                        setCurrentUser(mockUser);
                        setSelectedRole(sim.role);
                        setActivePortal(
                          sim.role === 'customer'
                            ? 'customer'
                            : sim.role === 'delivery_agent'
                            ? 'rider'
                            : 'merchant'
                        );
                        setOnboardingStep('app');
                        setViewMode('mobile_app');
                      }}
                      className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition cursor-pointer"
                    >
                      <p className="text-xs font-extrabold text-emerald-300">{sim.label}</p>
                      <p className="text-[10px] text-slate-400">{sim.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#061014] border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="text-xs font-bold text-white">Generate Live Simulated Town Order</h3>
                  <p className="text-[11px] text-slate-400">
                    Pushes a new customer order into the merchant queue and triggers rider dispatch
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleCreateConcurrentNewOrder();
                    setTestSimulatedOrderCount((c) => c + 1);
                  }}
                  className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-md cursor-pointer"
                >
                  ⚡ Push Test Order (+{testSimulatedOrderCount} generated)
                </button>
              </div>

              <div className="bg-[#061014] border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold text-white">Triple Screen View</h3>
                  <p className="text-[11px] text-slate-400">
                    Renders Customer, Merchant, and Rider screens side-by-side on this monitor
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOnboardingStep('app');
                    setActivePortal('split');
                    setViewMode('mobile_app');
                  }}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs cursor-pointer"
                >
                  Open 3 Phones Side-by-Side ➔
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: REGISTERED CITIZENS DATABASE */}
          {founderTab === 'users' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-bold text-emerald-400">
                    Registered Citizen & Business Records
                  </h2>
                  <p className="text-xs text-slate-400">
                    Enforces single account verification and phone OTP record tracking
                  </p>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
                  {registeredUsers.length} Verified Users
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                      <th className="py-2.5 px-3">Name / Username</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Verified Phone</th>
                      <th className="py-2.5 px-3">ID Proof Status</th>
                      <th className="py-2.5 px-3">Fast Access PIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {registeredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-semibold text-white">
                          {u.fullName} <span className="text-slate-400 text-[10px]">(@{u.username})</span>
                        </td>
                        <td className="py-2.5 px-3 capitalize">
                          <span className="bg-slate-800 text-teal-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-slate-700">
                            {u.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-emerald-400 font-mono">{u.phone}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-emerald-400 font-semibold">✓ Verified Citizen ID</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400">•••• ({u.fastPin})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ESCROW & COMMISSION SLIDERS */}
          {founderTab === 'escrow' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-5">
              <div>
                <h2 className="text-sm font-bold text-emerald-400">
                  Town Commission Governance & Escrow Controls
                </h2>
                <p className="text-xs text-slate-400">
                  Control platform fees and inspect the 35% / 85% dynamic event advance escrow
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#061014] border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Merchant Platform Take-Rate:</span>
                    <span className="text-emerald-400">{merchantCommissionPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={merchantCommissionPct}
                    onChange={(e) => setMerchantCommissionPct(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-400">
                    Capped at 10% maximum under VocalForLocal local governance charter.
                  </p>
                </div>

                <div className="bg-[#061014] border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Consumer Platform Fee:</span>
                    <span className="text-emerald-400">{consumerFeePct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={consumerFeePct}
                    onChange={(e) => setConsumerFeePct(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-400">
                    Protects consumer peace of mind with 0% to 5% flat scaling.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  // ==========================================================================
  // [SECTION-11] MAIN RENDER ROUTER, TOP CONTROL BAR & GOOGLE MAPS MODAL
  // ==========================================================================
  /**
   * Production Tip:
   * When you are ready to hide the top `VOCALFORLOCAL CONTROL SUITE` bar from
   * public customers and keep it accessible ONLY via `https://your-site.vercel.app/?admin=true`,
   * wrap the `<nav>...</nav>` block below inside `{isDirectAdminUrl && ( ... )}`.
   */
  return (
    <div className="min-h-screen bg-[#03080b] text-white flex flex-col">
      {/* 🛠️ TOP FOUNDER ACCESS BAR (Visible for 1-Click Testing) */}
      <nav className="w-full bg-slate-900 border-b border-emerald-500/40 px-4 py-2.5 flex flex-wrap justify-between items-center gap-2 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black tracking-wide text-emerald-300">
            VOCALFORLOCAL CONTROL SUITE
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 hidden sm:inline">
            Active: {viewMode === 'founder_web' || isDirectAdminUrl ? '💻 Full Founder Desk' : '📱 Native Mobile App'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'mobile_app' && !isDirectAdminUrl ? (
            <button
              type="button"
              onClick={() => {
                setFounderTab('testing');
                setViewMode('founder_web');
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>💻 Open Founder Admin & Testing Desk</span>
              <span className="text-[10px] bg-slate-950/25 text-slate-900 px-1.5 rounded font-mono font-bold">
                LIVE
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (window.location.search.includes('admin')) {
                  window.history.replaceState({}, document.title, window.location.pathname);
                }
                setViewMode('mobile_app');
              }}
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>📱 Back to Clean Mobile App</span>
            </button>
          )}
        </div>
      </nav>

      {/* VIEW ROUTER: Renders either Desktop Founder Suite OR Mobile Phone Bezel */}
      {viewMode === 'founder_web' || isDirectAdminUrl ? (
        <div className="flex-1 w-full">
          {renderFounderWebDashboard()}
        </div>
      ) : (
        <main className="flex-1 p-4 flex flex-col justify-center items-center">
          {onboardingStep === 'permissions' && renderPermissionsScreen()}
          {onboardingStep === 'auth' && renderAuthScreen()}
          {onboardingStep === 'app' && (
            <>
              {activePortal === 'customer' && renderCustomerPortal()}
              {activePortal === 'merchant' && renderMerchantPortal()}
              {activePortal === 'rider' && renderRiderPortal()}
              {activePortal === 'admin' && renderFounderWebDashboard()}
              {activePortal === 'split' && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                  {renderCustomerPortal()}
                  {renderMerchantPortal()}
                  {renderRiderPortal()}
                </div>
              )}
            </>
          )}
        </main>
      )}

      {/* GOOGLE MAPS GPS PINPOINT MODAL */}
      {mapModal.open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500 rounded-3xl max-w-sm w-full p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-emerald-400">🗺️ VocalForLocal Live GPS Pin</h3>
              <button
                type="button"
                onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')}
                className="bg-slate-800 px-2.5 py-1 rounded-lg text-[10px]"
              >
                Toggle {mapType === 'street' ? 'Satellite' : 'Street'}
              </button>
            </div>
            <div className="w-full h-52 rounded-2xl overflow-hidden border border-slate-700">
              <iframe
                title="Google Maps Adilabad"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${mapModal.lat},${mapModal.lng}&t=${
                  mapType === 'satellite' ? 'k' : 'm'
                }&z=15&output=embed`}
                allowFullScreen
              />
            </div>
            <button
              type="button"
              onClick={() => setMapModal({ ...mapModal, open: false })}
              className="w-full bg-emerald-400 text-slate-950 font-black py-2.5 rounded-2xl"
            >
              ✓ Confirm GPS Coordinates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}