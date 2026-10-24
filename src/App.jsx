/**
 * ============================================================================
 * 🌿 VOCALFORLOCAL • ADILABAD SUPER-APP (MASTER APPLICATION FILE)
 * ============================================================================
 * File Location : src/App.jsx
 * Description   : Complete Single-File Architecture containing Mobile Portals
 *                 (Customer, Merchant, Service Provider, Rider) + Desktop
 *                 Founder Admin Web Suite, Automated Screen Flow Tester, and
 *                 Multi-Page Event Decoration & Reverse-Bidding Workflow.
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
 * [SECTION-07] : Portal 1 — Customer Super-App
 *    [07A]     : Hyperlocal Store Catalog & Curiosity Deal Box
 *    [07B]     : Function Hall Direct Transparent Booking
 *    [07C]     : Multi-Page Event Decoration & Reverse-Bidding Suite (New Isolated Pages)
 *    [07D]     : Bike Taxi, 3W Auto & Parcel Booking
 * [SECTION-08] : Portal 2 — Merchant & Decorator Partner App UI (Stock Manual)
 * [SECTION-09] : Portal 3 — Delivery Agent / Bike & Auto Captain App UI
 * [SECTION-10] : Portal 4 — Desktop Founder Admin Web Suite & Testing Bench
 * [SECTION-11] : Automated Screen-by-Screen Flow Testing Simulator
 * [SECTION-12] : Main Render Router, Top Control Bar & Google Maps Modal
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

// ============================================================================
// NATIVE SMARTPHONE BEZEL WRAPPER
// ============================================================================
function MobilePhoneShell({ title, badge, children }) {
  return (
    <div className="w-full max-w-[405px] mx-auto bg-[#071318] border-[7px] border-slate-800/90 rounded-[44px] shadow-[0_25px_70px_-15px_rgba(16,185,129,0.28)] overflow-hidden flex flex-col min-h-[800px] max-h-[850px] relative">
      <div className="bg-[#040B0E] px-5 py-2.5 flex justify-between items-center text-[10px] text-slate-300 border-b border-emerald-950/80 select-none">
        <span className="font-extrabold text-emerald-400 tracking-wide flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {title}
        </span>
        <div className="w-16 h-3.5 bg-slate-900 rounded-full border border-slate-800" />
        <span className="text-teal-300 font-semibold">{badge}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-gradient-to-b from-[#071318] via-[#09181F] to-[#050E12]">
        {children}
      </div>
      <div className="bg-[#040B0E] py-2.5 flex justify-center border-t border-emerald-950/60">
        <div className="w-28 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION & GLOBAL STATE
// ============================================================================
function AppContent() {
  
  // ============================================================================
  // [SECTION-02] APPLICATION STATE VARIABLES
  // ============================================================================
  const isDirectAdminUrl =
    typeof window !== 'undefined' && window.location.search.includes('admin');

  // View & Navigation State
  const [viewMode, setViewMode] = useState(isDirectAdminUrl ? 'founder_web' : 'mobile_app');
  const [founderTab, setFounderTab] = useState('testing'); // 'approvals' | 'testing' | 'users' | 'escrow' | 'flow_tester'
  const [testSimulatedOrderCount, setTestSimulatedOrderCount] = useState(0);

  // Registration & Device Lock State
  const savedDeviceUser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('vfl_device_registered_user') || 'null')
      : null;
  const [hasRegisteredOnDevice, setHasRegisteredOnDevice] = useState(!!savedDeviceUser);
  const [onboardingStep, setOnboardingStep] = useState('auth');
  const [authStage, setAuthStage] = useState(savedDeviceUser ? 'fast_login' : 'landing');
  const [selectedRole, setSelectedRole] = useState(savedDeviceUser?.role || 'customer');
  const [permissions, setPermissions] = useState({
    location: true,
    notifications: true,
    camera: true,
    storage: true
  });

  // Simulated Database Registry
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
        govId: '[Redacted]',
        role: 'customer',
        passwordHash: 'Adilabad@2026',
        fastPin: '1990',
        selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    ];
  });

  // Registration & Login Form State
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
  const [loginForm, setLoginForm] = useState({ usernameOrPhone: '', password: '', pinInput: '' });
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState(savedDeviceUser || null);

  // Active Portals & Discovery
  const [activePortal, setActivePortal] = useState('customer');
  const [isPrimeCustomer, setIsPrimeCustomer] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [surpriseBoxOpen, setSurpriseBoxOpen] = useState(false);
  const [activeCuriosityFilter, setActiveCuriosityFilter] = useState('all');

  // Master Data & Commission Sliders
  const [categories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [functionHalls] = useState(INITIAL_FUNCTION_HALLS);
  const [merchantCommissionPct, setMerchantCommissionPct] = useState(0);
  const [consumerFeePct, setConsumerFeePct] = useState(0);

  // Category Carts
  const [selectedCategory, setSelectedCategory] = useState('daily_needs');
  const [activeCustomerSection, setActiveCustomerSection] = useState('shop'); // 'shop' | 'events' | 'taxi'
  const [selectedVariantMap, setSelectedVariantMap] = useState({});
  const [categoryCarts, setCategoryCarts] = useState({ daily_needs: [], construction: [], medicines: [] });
  const [showCartWindow, setShowCartWindow] = useState(false);

  // GPS Map & Taxi Route State
  const [mapModal, setMapModal] = useState({
    open: false,
    mode: 'consumer_pin',
    lat: 19.6641,
    lng: 78.532,
    addressLabel: 'Collectorate Chowk, Adilabad (19.6641° N, 78.5320° E)',
    distanceKm: 2.2
  });
  const [mapType, setMapType] = useState('street');
  const [taxiRoute, setTaxiRoute] = useState({
    pickup: 'Adilabad Bus Stand (19.6668° N, 78.5310° E)',
    drop: 'RIMS Hospital Gate (19.6580° N, 78.5250° E)',
    distanceKm: 3.4,
    mode: '2w_taxi'
  });

  // Active Orders & Dispatch Queue
  const [orders, setOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [riderOtpInput, setRiderOtpInput] = useState('');
  const [reviewText, setReviewText] = useState('');

  // --- ADMIN MASTER DATABASE & MULTI-PHONE SIMULATOR STATE ---
  // Array of active simulated phones. Admin can add as many as needed.
  const [splitScreens, setSplitScreens] = useState([
    { id: 'phone_1', role: 'customer' },
    { id: 'phone_2', role: 'merchant' },
    { id: 'phone_3', role: 'service_provider' },
    { id: 'phone_4', role: 'delivery_agent' }
  ]);
  const [adminDbTab, setAdminDbTab] = useState('users'); // 'users' | 'catalog' | 'merchants'
  // Raw JSON Editor state for Admin full-control overrides
  const [editingRecord, setEditingRecord] = useState(null);
  
  // --- MULTI-PAGE EVENT DECORATION & REVERSE-BIDDING WORKFLOW STATE ---
  // decorStep: 'setup' (Page A) | 'bidding' (Page B - with Accept/Request More) | 'escrow_payment' (Page C - Confirmation & Escrow)
  const [decorStep, setDecorStep] = useState('setup');
  const [eventDate, setEventDate] = useState('2026-10-29');
  const [eventTime, setEventTime] = useState('18:00');
  const [venueType, setVenueType] = useState('Function Hall / Open Lawn');
  const [venueAddress, setVenueAddress] = useState('Vidya Nagar Colony, Adilabad');
  const [decorCart, setDecorCart] = useState([]);
  const [decorBids, setDecorBids] = useState([]);
  const [biddingStatus, setBiddingStatus] = useState('IDLE'); // 'IDLE' | 'BROADCASTED' | 'ACCEPTED' | 'PAID'
  const [selectedWinningBid, setSelectedWinningBid] = useState(null);
  const [merchantBidForm, setMerchantBidForm] = useState({ price: 21500, notes: 'Includes welcome gate + extra spotlights' });
  const [hallBookingState, setHallBookingState] = useState(null);

  // Merchant Approvals & Stock Manual
  const [pendingMerchants, setPendingMerchants] = useState([
    { id: 'pm_1', businessName: 'Balaji Steel & Cement Traders', phone: '9848011223', categoryId: 'construction', eSigned: true, status: 'pending' }
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
        { id: 'mv2', label: '1 Litre Carton', price: 56, mrp: 60, weightGrams: 1000 }
      ]
    }
  ]);
  const [newProdForm, setNewProdForm] = useState({
    categoryId: 'daily_needs',
    subCategoryBrand: '',
    shopName: 'Sri Laxmi Supermart',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80',
    variants: [
      { label: '500 g', price: 45, mrp: 55, weightGrams: 500 },
      { label: '1 kg', price: 85, mrp: 100, weightGrams: 1000 }
    ]
  });

  // --- MERCHANT & DECORATOR LOCAL STATE ---
  const [merchantTab, setMerchantTab] = useState('orders'); // 'orders' | 'stock' | 'bids'
  const [stockItems, setStockItems] = useState([
    { id: 'st_1', name: 'Swastick Turmeric Powder', category: 'daily_needs', price: 50, unit: '250gms', inStock: true },
    { id: 'st_2', name: 'Swastick Turmeric Powder', category: 'daily_needs', price: 100, unit: '500gms', inStock: true },
    { id: 'st_3', name: 'Amul Fresh Milk', category: 'daily_needs', price: 28, unit: '500ml', inStock: false }
  ]);
  const [serviceAvailability, setServiceAvailability] = useState({
    marrageDecor: true, haldiStage: true, djLighting: false
  });
  const [myBidAmount, setMyBidAmount] = useState('');
  const [myBidReason, setMyBidReason] = useState('');

  // ==========================================================================
  // [SECTION-03] SECURITY, OTP, ANTI-FRAUD ID, PASSWORD & BIOMETRIC FUNCTIONS
  // ==========================================================================
  const validatePasswordStrength = (pw) => pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);

  const handleSendRegistrationOtp = () => {
    if (!/^\d{10}$/.test(regForm.phone)) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }
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

  const handleVerifyRegistrationOtp = () => {
    if (!regForm.otpInput || regForm.otpInput !== regForm.generatedOtp) {
      setAuthError('Invalid OTP! Please enter the exact 6-digit code received.');
      return;
    }
    setRegForm((prev) => ({ ...prev, otpVerified: true }));
    setAuthError('');
    setAuthStage('signup_step2');
  };

  const handleCaptureSelfie = (e) => {
    const file = e.target.files?.[0];
    if (file) setRegForm((prev) => ({ ...prev, selfieUrl: URL.createObjectURL(file) }));
  };

  const handleCompleteIdentityStep = () => {
    if (!regForm.fullName.trim() || !regForm.username.trim()) {
      setAuthError('Please fill in your Full Legal Name and Username.');
      return;
    }
    const cleanedGovId = regForm.govId.replace(/\s+/g, '');
    if (cleanedGovId.length !== 12) {
      setAuthError('Please enter a valid 12-character ID proof.');
      return;
    }
    if (registeredUsers.some((u) => u.govId === cleanedGovId)) {
      setAuthError('This ID Proof is already registered with another account.');
      return;
    }
    if (registeredUsers.some((u) => u.username.toLowerCase() === regForm.username.toLowerCase())) {
      setAuthError('Username already taken.');
      return;
    }
    setAuthError('');
    setAuthStage('signup_step3');
  };

  const handleFinalizeRegistration = () => {
    if (!validatePasswordStrength(regForm.password)) {
      setAuthError('Password must be at least 8 characters, with 1 uppercase letter and 1 number.');
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
      govId: '[Verified]',
      role: selectedRole,
      passwordHash: regForm.password,
      fastPin: regForm.fastPin,
      selfieUrl: regForm.selfieUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      biometricEnabled: true,
      registeredAt: new Date().toISOString()
    };

    const updatedDb = [...registeredUsers, newUser];
    setRegisteredUsers(updatedDb);
    localStorage.setItem('vfl_registered_users_db', JSON.stringify(updatedDb));
    localStorage.setItem('vfl_device_registered_user', JSON.stringify(newUser));
    setHasRegisteredOnDevice(true);
    setCurrentUser(newUser);

    alert('✅ Verification Successful! Device is now locked to your credentials.');
    setOnboardingStep('app');
    setActivePortal(selectedRole === 'customer' ? 'customer' : selectedRole === 'delivery_agent' ? 'rider' : 'merchant');
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    const query = loginForm.usernameOrPhone.trim().toLowerCase();
    const matchedUser = registeredUsers.find(
      (u) => (u.username.toLowerCase() === query || u.phone === query) && u.role === selectedRole
    );
    if (!matchedUser || matchedUser.passwordHash !== loginForm.password) {
      setAuthError('Invalid credentials for this role.');
      return;
    }
    setCurrentUser(matchedUser);
    localStorage.setItem('vfl_device_registered_user', JSON.stringify(matchedUser));
    setHasRegisteredOnDevice(true);
    setAuthError('');
    setOnboardingStep('app');
    setActivePortal(matchedUser.role === 'customer' ? 'customer' : matchedUser.role === 'delivery_agent' ? 'rider' : 'merchant');
  };

  const handlePinLogin = (e) => {
    e.preventDefault();
    const targetUser = currentUser || savedDeviceUser;
    if (!targetUser || loginForm.pinInput !== targetUser.fastPin) {
      setAuthError('Incorrect 4-Digit PIN.');
      return;
    }
    setCurrentUser(targetUser);
    setAuthError('');
    setOnboardingStep('app');
    setActivePortal(targetUser.role === 'customer' ? 'customer' : targetUser.role === 'delivery_agent' ? 'rider' : 'merchant');
  };

  const handleBiometricLogin = async () => {
    const targetUser = currentUser || savedDeviceUser;
    if (!targetUser) return;
    setCurrentUser(targetUser);
    setOnboardingStep('app');
    setActivePortal(targetUser.role === 'customer' ? 'customer' : targetUser.role === 'delivery_agent' ? 'rider' : 'merchant');
  };

  const handleGrantAllPermissions = () => {
    setPermissions({ location: true, notifications: true, camera: true, storage: true });
  };

  // ==========================================================================
  // [SECTION-04] LOGISTICS & ORDER MATH FUNCTIONS
  // ==========================================================================
  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  const calculateLogistics = (weightGrams, distanceKm, heavyTransportFee = 0, laborFee = 0) => {
    let vehicle = '2-Wheeler Rider (Up to 45kg)';
    let baseDelivery = 25;
    if (weightGrams > 45000 && weightGrams <= 300000) {
      vehicle = '3-Wheeler Auto (Up to 3 Quintals / ₹150 Cap)';
      baseDelivery = Math.min(Math.ceil(weightGrams / 100000) * 50, 150);
    } else if (weightGrams > 300000) {
      vehicle = 'Merchant Heavy Transport';
      baseDelivery = 0;
    }
    return { vehicle, deliveryFee: baseDelivery + Number(heavyTransportFee || 0) + Number(laborFee || 0) };
  };

  const handleAddToCart = (product) => {
    const chosenVariantId = selectedVariantMap[product.id] || product.variants[0].id;
    const variant = product.variants.find((v) => v.id === chosenVariantId) || product.variants[0];
    const currentCart = categoryCarts[product.categoryId] || [];
    const existing = currentCart.find((i) => i.productId === product.id && i.variantId === variant.id);
    let updated;
    if (existing) {
      updated = currentCart.map((i) => i.productId === product.id && i.variantId === variant.id ? { ...i, qty: i.qty + 1 } : i);
    } else {
      updated = [...currentCart, { productId: product.id, variantId: variant.id, name: `${product.subCategoryBrand} (${variant.label})`, shopName: product.shopName, price: variant.price, mrp: variant.mrp || variant.price + 15, weightGrams: variant.weightGrams, image: product.image, qty: 1 }];
    }
    setCategoryCarts({ ...categoryCarts, [product.categoryId]: updated });
  };

  const handleUpdateCartQty = (catId, productId, variantId, delta) => {
    const currentCart = categoryCarts[catId] || [];
    const updated = currentCart.map((i) => i.productId === productId && i.variantId === variant.id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0);
    setCategoryCarts({ ...categoryCarts, [catId]: updated });
  };

  const handlePlaceCategoryOrder = async (catId) => {
    const currentCart = categoryCarts[catId] || [];
    if (currentCart.length === 0) return;
    const totalWeightGrams = currentCart.reduce((s, i) => s + i.weightGrams * i.qty, 0);
    const itemsTotal = currentCart.reduce((s, i) => s + i.price * i.qty, 0);
    const { vehicle, deliveryFee } = calculateLogistics(totalWeightGrams, mapModal.distanceKm, 0, 0);
    const gst = Number(((itemsTotal + deliveryFee) * 0.05).toFixed(2));
    const grandTotal = Number((itemsTotal + deliveryFee + gst).toFixed(2));
    const secretOtp = String(Math.floor(1000 + Math.random() * 9000));

    const newOrder = {
      id: `VFL-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: catId,
      categoryName: categories.find((c) => c.id === catId)?.name || 'Town Order',
      customerName: currentUser?.fullName || 'Khoday Anvesh',
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

  const handleCreateConcurrentNewOrder = () => {
    const sampleItem = products[0];
    const v = sampleItem.variants[0];
    const secretOtp = String(Math.floor(1000 + Math.random() * 9000));
    const newOrd = {
      id: `VFL-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: 'daily_needs',
      categoryName: 'Daily Home Needs',
      customerName: `Neighbor #${orders.length + 1}`,
      address: 'Vidya Nagar, Adilabad',
      distanceKm: 1.5,
      items: [{ productId: sampleItem.id, variantId: v.id, name: `${sampleItem.subCategoryBrand} (${v.label})`, price: v.price, weightGrams: v.weightGrams, qty: 1 }],
      totalWeightGrams: v.weightGrams,
      vehicle: '2-Wheeler Rider',
      itemsTotal: v.price,
      heavyTransportFee: 0,
      laborFee: 0,
      deliveryFee: 25,
      gst: 5,
      grandTotal: v.price + 30,
      status: 'ORDER_PLACED_MERCHANT_POPUP',
      tokenHandedOver: false,
      secretOtp
    };
    setOrders([newOrd, ...orders]);
    setActiveOrderId(newOrd.id);
  };

  const handleMerchantConfirmBill = (orderId, heavyFee, laborCost) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: 'MERCHANT_CONFIRMED_WAIT_PAYMENT' } : o));
  };

  const handleCustomerPayOrder = (orderId) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: 'PAYMENT_DONE_PACKING_STARTED' } : o));
  };

  const handleMerchantDispatchAlert = (orderId) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: 'READY_FOR_PICKUP_AGENT_ALERTED' } : o));
  };

  const handleRiderAcceptPickupToken = (orderId) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: 'OUT_FOR_DELIVERY_LIVE_MAP', tokenHandedOver: true } : o));
  };

  const handleVerifyDeliveryOtp = (orderId) => {
    const target = orders.find((o) => o.id === orderId);
    if (target && riderOtpInput.trim() === target.secretOtp) {
      setOrders(orders.map((o) => o.id === orderId ? { ...o, status: 'DELIVERED_REVIEW_POPUP' } : o));
      setRiderOtpInput('');
    } else {
      alert('Incorrect 4-digit doorstep OTP!');
    }
  };

  const getDaysUntilEvent = () => {
    const today = new Date('2026-10-23T00:00:00');
    const selected = new Date(`${eventDate}T00:00:00`);
    return Math.max(Math.ceil((selected - today) / (1000 * 60 * 60 * 24)), 1);
  };
  const daysAway = getDaysUntilEvent();
  const advancePercentage = daysAway >= 5 ? 35 : 85;

  // ==========================================================================
  // [SECTION-05] SCREEN 1 — NATIVE DEVICE PERMISSIONS GATEWAY UI
  // ==========================================================================
  const renderPermissionsScreen = () => (
    <MobilePhoneShell title="VocalForLocal • Setup" badge="Step 1 of 2">
      <div className="flex flex-col justify-between h-full py-2 space-y-4 text-white">
        <div className="text-center space-y-1.5 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 mx-auto flex items-center justify-center text-3xl shadow-lg">
            🌿
          </div>
          <h1 className="text-lg font-extrabold">Peace-of-Mind Permissions</h1>
          <p className="text-[11px] text-slate-300">Grant permissions to connect with local stores and bike captains.</p>
        </div>
        <div className="space-y-2.5">
          {['Location', 'Notifications', 'Camera', 'Storage'].map((p, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold">{p} Access</span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">✓ Allowed</span>
            </div>
          ))}
        </div>
        <button onClick={() => setOnboardingStep('auth')} className="w-full bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-2xl text-xs cursor-pointer">
          Continue to Login / Sign Up ➔
        </button>
      </div>
    </MobilePhoneShell>
  );

  // ==========================================================================
  // [SECTION-06] SCREEN 2 — MULTI-STEP REGISTRATION & LOGIN UI
  // ==========================================================================
  const renderAuthScreen = () => (
    <MobilePhoneShell title="VocalForLocal" badge="Security Vault">
      <div className="flex flex-col justify-center min-h-[730px] px-3 py-2 text-white">
        <div className="flex justify-center mb-3">
          <div className="w-24 h-24 rounded-full border-2 border-emerald-400/80 bg-slate-900 flex flex-col items-center justify-center p-2 text-center shadow-lg">
            <span className="text-3xl">🌿</span>
            <span className="text-[9px] font-black tracking-widest text-emerald-300">VOCALFORLOCAL</span>
          </div>
        </div>

        {authError && <div className="bg-rose-950 border border-rose-500 rounded-xl p-2 mb-2 text-[11px] text-rose-200 text-center font-semibold">⚠️ {authError}</div>}

        {authStage === 'fast_login' && (
          <div className="space-y-4 px-2">
            <div className="text-center">
              <h2 className="text-sm font-bold text-emerald-400">Welcome Back</h2>
              <p className="text-xs text-slate-300 font-semibold">{currentUser?.fullName || savedDeviceUser?.fullName}</p>
            </div>
            <form onSubmit={handlePinLogin} className="space-y-3">
              <label className="block text-[10px] text-slate-400 text-center font-bold">ENTER 4-DIGIT QUICK PIN</label>
              <input type="password" maxLength={4} required autoFocus placeholder="••••" value={loginForm.pinInput} onChange={(e) => setLoginForm({ ...loginForm, pinInput: e.target.value })} className="w-36 mx-auto block bg-slate-900 border-2 border-emerald-500 rounded-2xl py-2 text-center text-xl tracking-[0.4em] font-mono text-white outline-none" />
              <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl text-xs cursor-pointer">Unlock with PIN</button>
            </form>
          </div>
        )}

        {authStage === 'landing' && (
          <div className="space-y-4 px-3">
            <div className="text-center">
              <h2 className="text-sm font-black text-white">Adilabad Secure Portal</h2>
              <p className="text-[11px] text-slate-400">Verified Hyperlocal Accounts & Fraud Prevention</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Select Account Role</label>
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 text-white font-bold text-xs rounded-xl p-3 outline-none">
                <option value="customer">Customer</option>
                <option value="merchant">Merchant</option>
                <option value="service_provider">Service Provider</option>
                <option value="delivery_agent">Delivery Agent</option>
              </select>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button type="button" onClick={() => setAuthStage('signin')} className="flex-1 py-3 bg-slate-800 text-white text-xs font-black rounded-xl border border-slate-700 cursor-pointer">Sign In</button>
              {!hasRegisteredOnDevice ? (
                <button type="button" onClick={() => setAuthStage('signup_step1')} className="flex-1 py-3 bg-emerald-500 text-slate-950 text-xs font-black rounded-xl cursor-pointer">Register New</button>
              ) : (
                <button type="button" onClick={() => setAuthStage('fast_login')} className="flex-1 py-3 bg-teal-500 text-slate-950 text-xs font-black rounded-xl cursor-pointer">Quick PIN</button>
              )}
            </div>
          </div>
        )}

        {authStage === 'signin' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3 px-3">
            <h3 className="text-xs font-bold text-emerald-400 text-center">Sign In</h3>
            <input type="text" required placeholder="Username or Mobile" value={loginForm.usernameOrPhone} onChange={(e) => setLoginForm({ ...loginForm, usernameOrPhone: e.target.value })} className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none" />
            <input type="password" required placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none" />
            <div className="flex gap-2">
              <button type="button" onClick={() => setAuthStage('landing')} className="px-3 py-2 bg-slate-800 text-xs rounded-xl cursor-pointer">← Back</button>
              <button type="submit" className="flex-1 py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl cursor-pointer">Verify & Enter</button>
            </div>
          </form>
        )}

        {authStage === 'signup_step1' && (
          <div className="space-y-3 px-3">
            <h3 className="text-xs font-bold text-white text-center">Step 1: Phone OTP Verification</h3>
            <div className="flex gap-2">
              <input type="tel" maxLength={10} required placeholder="10-Digit Mobile" value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white outline-none" />
              <button type="button" onClick={handleSendRegistrationOtp} className="bg-amber-400 text-slate-950 font-bold text-[10px] px-3 rounded-xl cursor-pointer">Send OTP</button>
            </div>
            {regForm.generatedOtp && (
              <div className="space-y-2">
                <input type="text" maxLength={6} placeholder="6-Digit OTP" value={regForm.otpInput} onChange={(e) => setRegForm({ ...regForm, otpInput: e.target.value })} className="w-full bg-slate-900 border border-emerald-500 rounded-xl p-2 text-center font-mono text-white outline-none" />
                <button type="button" onClick={handleVerifyRegistrationOtp} className="w-full bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl text-xs cursor-pointer">Verify Phone ➔</button>
              </div>
            )}
          </div>
        )}

        {authStage === 'signup_step2' && (
          <div className="space-y-2.5 px-3">
            <h3 className="text-xs font-bold text-white text-center">Step 2: Identity Verification</h3>
            <input type="text" required placeholder="Full Legal Name" value={regForm.fullName} onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white outline-none" />
            <input type="text" required placeholder="Unique Username" value={regForm.username} onChange={(e) => setRegForm({ ...regForm, username: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white outline-none" />
            <input type="text" maxLength={12} required placeholder="12-Character Gov ID Proof" value={regForm.govId} onChange={(e) => setRegForm({ ...regForm, govId: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs font-mono text-white outline-none" />
            <input type="file" accept="image/*" onChange={handleCaptureSelfie} className="w-full text-[10px] text-slate-300" />
            <button type="button" onClick={handleCompleteIdentityStep} className="w-full bg-emerald-500 text-slate-950 font-black py-2 rounded-xl text-xs cursor-pointer">Continue to Security ➔</button>
          </div>
        )}

        {authStage === 'signup_step3' && (
          <div className="space-y-3 px-3">
            <h3 className="text-xs font-bold text-white text-center">Step 3: Password & PIN Setup</h3>
            <input type="password" required placeholder="Password (Min 8 chars, 1 Cap, 1 Num)" value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white outline-none" />
            <input type="password" required placeholder="Confirm Password" value={regForm.confirmPassword} onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white outline-none" />
            <input type="password" maxLength={4} required placeholder="4-Digit Quick PIN" value={regForm.fastPin} onChange={(e) => setRegForm({ ...regForm, fastPin: e.target.value })} className="w-36 mx-auto block bg-slate-900 border border-emerald-500 rounded-xl p-2 text-center font-mono text-white outline-none" />
            <button type="button" onClick={handleFinalizeRegistration} className="w-full bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl text-xs cursor-pointer">Lock Device & Complete Setup</button>
          </div>
        )}
      </div>
    </MobilePhoneShell>
  );

  // ==========================================================================
  // [SECTION-07] PORTAL 1 — CUSTOMER SUPER-APP
  // ==========================================================================
  const renderCustomerPortal = () => {
    const currentCart = categoryCarts[selectedCategory] || [];
    const approvedProducts = products.filter((p) => p.categoryId === selectedCategory && p.status === 'approved');

    return (
      <MobilePhoneShell title="🌿 VocalForLocal" badge="Peace-of-Mind Hub">
        <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-extrabold text-emerald-300">VocalForLocal</h2>
            <button onClick={() => setMapModal({ ...mapModal, open: true })} className="text-[10px] text-teal-300 flex items-center gap-1 mt-0.5">
              📍 {mapModal.addressLabel.slice(0, 30)}...
            </button>
          </div>
          <button onClick={() => setShowCartWindow(true)} className="bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-2xl text-[11px] font-extrabold shadow cursor-pointer">
            🛒 {currentCart.reduce((s, i) => s + i.qty, 0)}
          </button>
        </div>

        {/* Customer Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 text-[11px] bg-slate-900 p-1 rounded-xl">
          <button onClick={() => setActiveCustomerSection('shop')} className={`py-1.5 rounded-lg font-extrabold ${activeCustomerSection === 'shop' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'}`}>🛍️ Stores</button>
          <button onClick={() => { setActiveCustomerSection('events'); setDecorStep('setup'); }} className={`py-1.5 rounded-lg font-extrabold ${activeCustomerSection === 'events' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'}`}>🎉 Decor Bids</button>
          <button onClick={() => setActiveCustomerSection('taxi')} className={`py-1.5 rounded-lg font-extrabold ${activeCustomerSection === 'taxi' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'}`}>🏍️ Taxi</button>
        </div>

        {/* [SECTION-07A] HYPERLOCAL STORE CATALOG */}
        {activeCustomerSection === 'shop' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {categories.filter((c) => c.id !== 'decorations').map((cat) => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`p-2 rounded-2xl border text-left transition ${selectedCategory === cat.id ? 'border-emerald-400 bg-emerald-500/15' : 'border-slate-800 bg-slate-900'}`}>
                  <img src={cat.image} alt={cat.name} className="w-full h-10 object-cover rounded-xl mb-1" />
                  <p className="text-[10px] font-extrabold text-white truncate">{cat.name}</p>
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {approvedProducts.map((prod) => (
                <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex gap-2.5 items-center">
                  <img src={prod.image} alt={prod.subCategoryBrand} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{prod.subCategoryBrand}</h4>
                    <p className="text-[10px] text-emerald-400 font-bold">₹{prod.variants[0].price} / {prod.variants[0].label}</p>
                    <button onClick={() => handleAddToCart(prod)} className="mt-1 bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-xl text-[10px] font-black cursor-pointer">+ Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [SECTION-07C] MULTI-PAGE EVENT DECORATION & REVERSE-BIDDING SUITE */}
        {activeCustomerSection === 'events' && (
          <div className="space-y-3">
            {/* PAGE A: EVENT SETUP & DATE SELECTION */}
            {decorStep === 'setup' && (
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-emerald-400">📅 Step 1: Event Date, Time & Venue</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[9px] text-slate-400">Event Date</label>
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-1.5 text-white" />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400">Time</label>
                    <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-1.5 text-white" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400">Venue Type</label>
                  <select value={venueType} onChange={(e) => setVenueType(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-1.5 text-xs text-white">
                    <option value="Function Hall / Open Lawn">Function Hall / Open Lawn</option>
                    <option value="Home / Residential Rooftop">Home / Residential Rooftop</option>
                    <option value="Community Mandapam">Community Mandapam</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400">Venue Address & GPS Location</label>
                  <input type="text" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-1.5 text-xs text-white" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[10px] font-bold text-slate-300 mb-1.5">Select Decor Modules:</h4>
                  {DECORATION_SERVICE_MODULES.slice(0, 3).map((mod) => {
                    const inCart = decorCart.some((i) => i.id === mod.id);
                    return (
                      <div key={mod.id} className="bg-slate-950 p-2 rounded-xl mb-1.5 flex justify-between items-center border border-slate-800">
                        <div>
                          <p className="text-[11px] font-bold">{mod.title}</p>
                          <p className="text-[9px] text-emerald-400">Est: ₹{mod.baseEstimate}</p>
                        </div>
                        <button onClick={() => setDecorCart(inCart ? decorCart.filter((i) => i.id !== mod.id) : [...decorCart, mod])} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold cursor-pointer ${inCart ? 'bg-rose-600 text-white' : 'bg-emerald-400 text-slate-950'}`}>
                          {inCart ? 'Remove' : '+ Select'}
                        </button>
                      </div>
                    );
                  })}
                </div>
                {decorCart.length > 0 && (
                  <button onClick={() => { setDecorStep('bidding'); setBiddingStatus('BROADCASTED'); setDecorBids([{ id: 'b1', maskedVendor: 'Decorator Partner #A1', price: 21500, features: 'Floral arch + warm LED spotlights' }, { id: 'b2', maskedVendor: 'Decorator Partner #B2', price: 19800, features: 'Stage setup + grand entrance gate' }]); }} className="w-full bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs cursor-pointer shadow">
                    Broadcast to Market Decorators & Start Bidding ➔
                  </button>
                )}
              </div>
            )}

            {/* PAGE B: LIVE REVERSE-BIDDING WINDOW (With Accept vs. Request More Bids) */}
            {decorStep === 'bidding' && (
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-teal-500/50 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-teal-300">🌸 Live Reverse-Bidding Window</h3>
                  <span className="text-[9px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">Zero Bias</span>
                </div>
                <p className="text-[10px] text-slate-300">Merchants are competing anonymously for your event setup. Review quotes below:</p>

                <div className="space-y-2">
                  {decorBids.map((b) => (
                    <div key={b.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between font-bold text-xs">
                        <span className="text-white">{b.maskedVendor}</span>
                        <span className="text-emerald-400">₹{b.price}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{b.features}</p>
                      <button onClick={() => { setSelectedWinningBid(b); setDecorStep('escrow_payment'); }} className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-lg text-xs cursor-pointer mt-1">
                        ✓ Accept This Quote & Proceed to Escrow
                      </button>
                    </div>
                  ))}
                </div>

                {/* Option to Request More Bids from Market Dominance */}
                <button onClick={() => alert('🔄 Broadcast extended to more Adilabad decorators! New competing bids will appear shortly.')} className="w-full bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 font-bold py-2 rounded-xl text-xs cursor-pointer">
                  🔄 Require More Bids from Market (Lower Rates)
                </button>
                <button onClick={() => setDecorStep('setup')} className="w-full text-center text-[10px] text-slate-400 underline pt-1 cursor-pointer">
                  ← Back to Event Setup
                </button>
              </div>
            )}

            {/* PAGE C: ESCROW PAYMENT & CONFIRMATION WINDOW */}
            {decorStep === 'escrow_payment' && selectedWinningBid && (
              <div className="bg-emerald-950/80 border border-emerald-400 p-3.5 rounded-2xl space-y-3 text-xs">
                <h3 className="font-extrabold text-emerald-300">🔐 Secure Escrow Payment & Confirmation</h3>
                <p className="text-[11px] text-slate-200">
                  Winning Bid: <strong>{selectedWinningBid.maskedVendor}</strong> — ₹{selectedWinningBid.price}
                </p>
                <div className="bg-slate-900 p-2.5 rounded-xl space-y-1 border border-emerald-500/30">
                  <p className="text-[10px] font-bold text-amber-300">
                    Required {advancePercentage}% Escrow Advance: ₹{Math.round((selectedWinningBid.price * advancePercentage) / 100)}
                  </p>
                  <p className="text-[9px] text-slate-400">Balance {100 - advancePercentage}% due 5 hours before event setup.</p>
                </div>
                <button onClick={() => { setBiddingStatus('PAID'); alert('🎉 Escrow advance locked! Full-screen confirmation sent to decorator and payment success sent to consumer.'); }} className="w-full bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer shadow">
                  Pay ₹{Math.round((selectedWinningBid.price * advancePercentage) / 100)} via UPI Escrow Now ➔
                </button>
                <button onClick={() => setDecorStep('bidding')} className="w-full text-center text-[10px] text-slate-300 underline cursor-pointer">
                  ← Return to Bidding Window
                </button>
              </div>
            )}
          </div>
        )}

        {/* [SECTION-07D] BIKE TAXI, 3W AUTO & PARCEL */}
        {activeCustomerSection === 'taxi' && (
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2 text-[11px]">
            <h3 className="font-bold text-emerald-400">🏍️ Instant Bike Taxi, 3W Auto & Parcel</h3>
            <p className="text-[10px] text-slate-400">Pickup: {taxiRoute.pickup}</p>
            <p className="text-[10px] text-slate-400">Drop: {taxiRoute.drop}</p>
            <button onClick={() => alert('🛵 Nearby captain assigned! GPS live tracking active.')} className="w-full bg-emerald-400 text-slate-950 font-black py-2 rounded-xl text-xs cursor-pointer">
              Book Ride / Dispatch Parcel (₹31)
            </button>
          </div>
        )}

        {/* ISOLATED CATEGORY CART MODAL */}
        {showCartWindow && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500 rounded-3xl max-w-sm w-full p-4 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="font-extrabold text-emerald-400">🛒 Cart Checkout</h3>
                <button onClick={() => setShowCartWindow(false)} className="bg-slate-800 px-2 py-0.5 rounded cursor-pointer">✕</button>
              </div>
              {currentCart.length === 0 ? (
                <p className="text-slate-400 text-center py-4">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {currentCart.map((i) => (
                      <div key={`${i.productId}_${i.variantId}`} className="flex justify-between bg-slate-800 p-2 rounded-xl">
                        <span>{i.name} x{i.qty}</span>
                        <span>₹{i.price * i.qty}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => handlePlaceCategoryOrder(selectedCategory)} className="w-full bg-emerald-400 text-slate-950 font-black py-2.5 rounded-2xl cursor-pointer">
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

        {/* TAB 1: CURRENT ORDERS / APPOINTMENTS LIST */}
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

        {/* TAB 2: ADVANCED STOCK & INVENTORY MANUAL */}
        {merchantTab === 'stock' && (
          <div className="space-y-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-emerald-400">📋 Advanced Stock Management</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Edit prices, delete items, or hide out-of-stock products globally.</p>
              </div>
            </div>

            <div className="space-y-3">
              {stockItems.map((item, idx) => (
                <div key={item.id} className="bg-slate-900 border border-slate-700 p-3 rounded-xl flex flex-col gap-2 shadow-sm">
                  {/* Item Name & Delete Button */}
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <span className="font-extrabold text-xs">{item.name}</span>
                    <button 
                      onClick={() => {
                        if(window.confirm('Delete this product from your shop?')) {
                          setStockItems(stockItems.filter(i => i.id !== item.id));
                        }
                      }}
                      className="bg-rose-950/50 text-rose-400 border border-rose-800 px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer hover:bg-rose-900"
                    >
                      🗑️ Remove
                    </button>
                  </div>

                  {/* Price Editor & Stock Toggle */}
                  <div className="flex justify-between items-center gap-3 pt-1">
                    {/* Inline Price Editor */}
                    <div className="flex-1 flex items-center bg-[#03080b] border border-slate-700 rounded-lg px-2 py-1">
                      <span className="text-slate-400 text-[10px] pr-1">₹</span>
                      <input 
                        type="number" 
                        value={item.price} 
                        onChange={(e) => {
                          const updated = [...stockItems];
                          updated[idx].price = Number(e.target.value);
                          setStockItems(updated);
                        }}
                        className="w-full bg-transparent text-emerald-300 font-bold text-xs outline-none"
                      />
                      <span className="text-slate-500 text-[9px] pl-1 border-l border-slate-700 ml-1">/ {item.unit}</span>
                    </div>

                    {/* In-Stock Toggle */}
                    <button 
                      onClick={() => { 
                        const updated = [...stockItems]; 
                        updated[idx].inStock = !updated[idx].inStock; 
                        setStockItems(updated); 
                      }} 
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black cursor-pointer transition ${
                        item.inStock 
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                          : 'bg-slate-800 text-slate-400 border border-slate-600'
                      }`}
                    >
                      {item.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ANONYMOUS DECORATION REVERSE-BIDDING DESK */}
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
  // [SECTION-09] PORTAL 3 — DELIVERY AGENT / BIKE & AUTO CAPTAIN APP UI
  // ==========================================================================
  const renderRiderPortal = () => (
    <MobilePhoneShell title="🛵 VocalForLocal Captain" badge="GPS Live">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-white">
        <div>
          <h2 className="text-xs font-black text-emerald-400">Delivery & Bike Taxi Radar</h2>
          <p className="text-[10px] text-slate-400">OTP Masked Until Doorstep</p>
        </div>
        <button onClick={() => setActivePortal('customer')} className="bg-slate-800 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-[9px] font-bold cursor-pointer">
          🛍️ Personal Shop
        </button>
      </div>

      <div className="space-y-2 text-white">
        {orders.length === 0 ? (
          <p className="text-[11px] text-slate-400 py-8 text-center">No active dispatches. Standing by in Adilabad.</p>
        ) : (
          orders.map((ord) => (
            <div key={ord.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-[11px] space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-400">{ord.id}</span>
                <span>{ord.vehicle}</span>
              </div>
              <p className="text-[10px] text-slate-300">Drop: {ord.address}</p>
              {ord.status === 'READY_FOR_PICKUP_AGENT_ALERTED' && (
                <button onClick={() => handleRiderAcceptPickupToken(ord.id)} className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl text-xs cursor-pointer">
                  🎟️ Accept Pickup Token
                </button>
              )}
              {ord.status === 'OUT_FOR_DELIVERY_LIVE_MAP' && (
                <div className="space-y-1.5 pt-1 border-t border-slate-800">
                  <input type="text" placeholder="Enter 4-Digit Doorstep OTP" value={riderOtpInput} onChange={(e) => setRiderOtpInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-1.5 text-white font-mono" />
                  <button onClick={() => handleVerifyDeliveryOtp(ord.id)} className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl text-xs cursor-pointer">
                    ✓ Verify OTP & Complete Delivery
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </MobilePhoneShell>
  );

  // ==========================================================================
  // [SECTION-10] PORTAL 4 — DESKTOP FOUNDER ADMIN WEB SUITE & TESTING BENCH
  // ==========================================================================
  const renderFounderWebDashboard = () => (
    <div className="min-h-screen bg-[#040c10] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-emerald-950 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-xl">🌿</div>
          <div>
            <h1 className="text-base font-extrabold text-white">Founder Control Suite</h1>
            <p className="text-xs text-slate-400">Master Admin Dashboard</p>
          </div>
        </div>
        <button onClick={() => setViewMode('mobile_app')} className="bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs cursor-pointer shadow">📱 Return to Mobile App</button>
      </header>

      {/* Sidebar & Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="space-y-2">
          {[
            { id: 'approvals', label: '🛡️ Approvals & KYC', count: pendingMerchants.length + pendingSubCategories.length },
            { id: 'testing', label: '🧪 Testing Sandbox Bench', count: splitScreens.length + ' Phones' },
            { id: 'flow_tester', label: '🔄 Screen Flow Tester', count: 'QA' },
            { id: 'database', label: '🗄️ Master Database Editor', count: 'Full Control' },
            { id: 'escrow', label: '💰 Escrow & Commissions', count: `${merchantCommissionPct}%` }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setFounderTab(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition border cursor-pointer ${founderTab === tab.id ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'}`}>
              <span>{tab.label}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700">{tab.count}</span>
            </button>
          ))}
        </aside>

        <main className="lg:col-span-3 space-y-6">
          {/* Approvals Tab */}
          {founderTab === 'approvals' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                <h2 className="text-sm font-bold text-emerald-400">Merchant & Service Provider Onboarding Queue ({pendingMerchants.length})</h2>
                {pendingMerchants.map((pm) => (
                  <div key={pm.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-extrabold text-white">{pm.businessName}</p>
                      <p className="text-slate-400">Phone: {pm.phone}</p>
                    </div>
                    <button onClick={() => setPendingMerchants(pendingMerchants.filter((m) => m.id !== pm.id))} className="bg-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl cursor-pointer">✓ Approve</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testing Sandbox Tab */}
          {founderTab === 'testing' && (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-extrabold text-emerald-400">📱 Multi-Phone Testing Array</h2>
                  <p className="text-xs text-slate-300">Open 4, 5, or more phones side-by-side to watch the entire ecosystem sync live.</p>
                </div>
                <button onClick={() => { setOnboardingStep('app'); setActivePortal('split'); setViewMode('mobile_app'); }} className="bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs cursor-pointer shadow">
                  Launch Multi-Phone View ➔
                </button>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Configure Phone Array:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {splitScreens.map((phone, idx) => (
                    <div key={phone.id} className="bg-slate-900 p-3 rounded-xl border border-slate-700 relative">
                      <button onClick={() => setSplitScreens(splitScreens.filter((_, i) => i !== idx))} className="absolute top-1 right-2 text-rose-500 font-bold hover:text-rose-400 cursor-pointer">✕</button>
                      <p className="text-[10px] text-slate-400">Screen {idx + 1}</p>
                      <p className="text-xs font-extrabold text-emerald-300 capitalize">{phone.role.replace('_', ' ')}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <select id="addPhoneRole" className="bg-slate-900 text-xs border border-slate-700 text-white rounded p-1.5 outline-none">
                    <option value="customer">Customer</option>
                    <option value="merchant">Merchant</option>
                    <option value="service_provider">Decorator</option>
                    <option value="delivery_agent">Rider</option>
                  </select>
                  <button onClick={() => { const val = document.getElementById('addPhoneRole').value; setSplitScreens([...splitScreens, { id: `phone_${Date.now()}`, role: val }]); }} className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 rounded text-xs cursor-pointer">
                    + Add Phone
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================== */}
          {/* [SECTION-11] AUTOMATED SCREEN-BY-SCREEN FLOW TESTING SIMULATOR             */}
          {/* ========================================================================== */}
          {founderTab === 'flow_tester' && (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-4 text-xs">
              <h2 className="text-base font-extrabold text-emerald-400">🔄 1-Click Screen-by-Screen Flow Tester</h2>
              <p className="text-slate-300">Instantly jump to any operational screen in the mobile app without manual navigation:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button onClick={() => { setOnboardingStep('permissions'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">1. Permissions Gateway</p></button>
                <button onClick={() => { setOnboardingStep('auth'); setAuthStage('landing'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">2. Auth & Page 1</p></button>
                <button onClick={() => { setOnboardingStep('auth'); setAuthStage('signup_step2'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">3. ID & Selfie Verification</p></button>
                <button onClick={() => { setOnboardingStep('app'); setActivePortal('customer'); setActiveCustomerSection('shop'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">4. Customer Store Hub</p></button>
                <button onClick={() => { setOnboardingStep('app'); setActivePortal('customer'); setActiveCustomerSection('events'); setDecorStep('setup'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">5. Decor Bidding (Page A)</p></button>
                <button onClick={() => { setOnboardingStep('app'); setActivePortal('customer'); setActiveCustomerSection('events'); setDecorStep('bidding'); setDecorBids([{ id: 'b1', maskedVendor: 'Decorator #1', price: 21500, features: 'Floral arch' }]); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">6. Reverse-Bidding (Page B)</p></button>
                <button onClick={() => { setOnboardingStep('app'); setActivePortal('merchant'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">7. Merchant Stock Manual</p></button>
                <button onClick={() => { setOnboardingStep('app'); setActivePortal('rider'); setViewMode('mobile_app'); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-400 text-left cursor-pointer"><p className="font-bold text-emerald-300">8. Delivery Captain Radar</p></button>
              </div>
            </div>
          )}

          {/* Master Database Editor */}
          {founderTab === 'database' && (
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-5 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-extrabold text-amber-400">🗄️ Master Database Editor</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Full root access to edit, suspend, or delete accounts and products.</p>
                </div>
                <span className="bg-rose-500/20 border border-rose-500/50 text-rose-300 font-extrabold px-3 py-1 rounded-full text-[10px] animate-pulse">⚠️ Live Data</span>
              </div>
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                <button onClick={() => setAdminDbTab('users')} className={`px-4 py-2 rounded-xl font-bold transition ${adminDbTab === 'users' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>👥 Users & Merchants</button>
                <button onClick={() => setAdminDbTab('catalog')} className={`px-4 py-2 rounded-xl font-bold transition ${adminDbTab === 'catalog' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>📦 Products & Catalog</button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse bg-slate-950">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-700 text-slate-300 uppercase text-[9px] tracking-wider">
                      <th className="p-3">Data ID Ref</th>
                      <th className="p-3">Display Name / Title</th>
                      <th className="p-3">Role / Category</th>
                      <th className="p-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {(adminDbTab === 'users' ? registeredUsers : products).map((r, i) => (
                      <tr key={r.id || i} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-mono text-[10px] text-slate-500">{r.id || `prod_${i}`}</td>
                        <td className="p-3 font-bold text-white">{r.fullName || r.subCategoryBrand}</td>
                        <td className="p-3 font-mono text-[10px] text-emerald-400">{r.role || r.categoryId}</td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingRecord({ type: adminDbTab, index: i, jsonStr: JSON.stringify(r, null, 2) })} className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/50 px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition">✎ Edit</button>
                            <button onClick={() => { if(window.confirm(`Are you sure you want to PERMANENTLY DELETE ${r.fullName || r.subCategoryBrand}?`)) { if (adminDbTab === 'users') { setRegisteredUsers(registeredUsers.filter(user => user.id !== r.id)); } else { setProducts(products.filter(prod => prod.id !== r.id)); } } }} className="bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-700 px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition">🗑️ Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Escrow & Commissions Tab */}
          {founderTab === 'escrow' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-xs">
              <h2 className="text-sm font-bold text-emerald-400">Town Commission Governance</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p>Merchant Commission: {merchantCommissionPct}%</p>
                  <input type="range" min="0" max="10" value={merchantCommissionPct} onChange={(e) => setMerchantCommissionPct(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p>Consumer Fee: {consumerFeePct}%</p>
                  <input type="range" min="0" max="5" value={consumerFeePct} onChange={(e) => setConsumerFeePct(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  // ==========================================================================
  // [SECTION-12] MAIN RENDER ROUTER, TOP CONTROL BAR & GOOGLE MAPS MODAL
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#03080b] text-white flex flex-col">
      {/* Top Control Bar */}
      <nav className="w-full bg-slate-900 border-b border-emerald-500/40 px-4 py-2.5 flex justify-between items-center sticky top-0 z-50 shadow-lg text-xs">
        <span className="font-black text-emerald-300">VOCALFORLOCAL CONTROL SUITE</span>
        {viewMode === 'mobile_app' && !isDirectAdminUrl ? (
          <button onClick={() => { setFounderTab('testing'); setViewMode('founder_web'); }} className="bg-emerald-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl cursor-pointer">💻 Founder Desk</button>
        ) : (
          <button onClick={() => setViewMode('mobile_app')} className="bg-teal-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl cursor-pointer">📱 Back to App</button>
        )}
      </nav>

      {/* Router Logic */}
      {viewMode === 'founder_web' || isDirectAdminUrl ? (
        <div className="flex-1 w-full">{renderFounderWebDashboard()}</div>
      ) : (
        <main className="flex-1 p-4 flex flex-col justify-center items-center">
          {onboardingStep === 'permissions' && renderPermissionsScreen()}
          {onboardingStep === 'auth' && renderAuthScreen()}
          {onboardingStep === 'app' && (
            <>
              {activePortal === 'customer' && renderCustomerPortal()}
              {activePortal === 'merchant' && renderMerchantPortal()}
              {activePortal === 'rider' && renderRiderPortal()}
              
              {/* Multi-Phone Split Screen Router */}
              {activePortal === 'split' && (
                <div className="w-full flex overflow-x-auto gap-6 pb-6 px-4 snap-x snap-mandatory hide-scroll">
                  {splitScreens.map((phone, idx) => (
                    <div key={phone.id} className="min-w-[405px] flex-shrink-0 snap-center relative">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black z-50 whitespace-nowrap">
                        PHONE {idx + 1}: {phone.role.toUpperCase()}
                      </div>
                      {phone.role === 'customer' && renderCustomerPortal()}
                      {(phone.role === 'merchant' || phone.role === 'service_provider') && renderMerchantPortal()}
                      {phone.role === 'delivery_agent' && renderRiderPortal()}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      )}

      {/* Google Maps Modal */}
      {mapModal.open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500 rounded-3xl max-w-sm w-full p-4 space-y-3 text-xs">
            <h3 className="font-bold text-emerald-400">🗺️ GPS Coordinates Confirmed</h3>
            <p className="text-slate-300">{mapModal.addressLabel}</p>
            <button onClick={() => setMapModal({ ...mapModal, open: false })} className="w-full bg-emerald-400 text-slate-950 font-black py-2.5 rounded-2xl cursor-pointer">
              ✓ Confirm Location
            </button>
          </div>
        </div>
      )}

      {/* JSON Database Editor Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500 rounded-3xl w-full max-w-2xl p-5 space-y-4 flex flex-col">
            <h3 className="font-extrabold text-amber-400 text-sm">🗄️ Master Database Editor</h3>
            <textarea 
              value={editingRecord.jsonStr} 
              onChange={(e) => setEditingRecord({ ...editingRecord, jsonStr: e.target.value })} 
              className="h-64 bg-[#03080b] text-emerald-300 font-mono text-[11px] p-3 rounded-xl border border-slate-700 outline-none" 
            />
            <div className="flex gap-3">
              <button onClick={() => setEditingRecord(null)} className="flex-1 bg-slate-800 py-2.5 rounded-xl font-bold cursor-pointer">Cancel</button>
              <button 
                onClick={() => {
                  try {
                    const data = JSON.parse(editingRecord.jsonStr);
                    if (editingRecord.type === 'users') { 
                      const a = [...registeredUsers]; 
                      a[editingRecord.index] = data; 
                      setRegisteredUsers(a); 
                    } else { 
                      const a = [...products]; 
                      a[editingRecord.index] = data; 
                      setProducts(a); 
                    }
                    setEditingRecord(null); 
                    alert('✅ Saved');
                  } catch(e) { 
                    alert('❌ Invalid JSON'); 
                  }
                }} 
                className="flex-1 bg-amber-500 text-slate-950 py-2.5 rounded-xl font-black cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} // <--- END OF AppContent FUNCTION

// ============================================================================
// GLOBAL ERROR BOUNDARY (CATCHES CRASHES & PREVENTS BLANK SCREENS)
// ============================================================================
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("VocalForLocal App Crashed:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071318] flex flex-col items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 border-2 border-rose-500 rounded-3xl w-full max-w-2xl p-6 shadow-2xl shadow-rose-900/50">
            <h2 className="text-xl font-black text-rose-400 mb-2">⚠️ Application Crashed!</h2>
            <p className="text-xs text-slate-300 mb-4">Please check the code lines below to find your mistake:</p>
            
            <div className="bg-[#03080b] rounded-xl p-4 border border-rose-900/50 mb-3 overflow-x-auto">
              <p className="text-[11px] font-bold text-rose-300 mb-1">Error Message:</p>
              <p className="text-xs font-mono text-rose-100">{this.state.error?.toString()}</p>
            </div>

            <div className="bg-[#03080b] rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <p className="text-[11px] font-bold text-amber-400 mb-1">Stack Trace & Line Numbers:</p>
              <pre className="text-[10px] text-slate-400 font-mono leading-relaxed whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack || this.state.error?.stack}
              </pre>
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="mt-5 w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-3 rounded-xl shadow-lg transition cursor-pointer"
            >
              🔄 Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// DEFAULT EXPORT (Wraps the application in the Error Catcher)
// ============================================================================
export default function App() {
  return (
    <GlobalErrorBoundary>
      <AppContent />
    </GlobalErrorBoundary>
  );
}