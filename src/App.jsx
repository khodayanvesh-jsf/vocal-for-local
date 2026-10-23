import React, { useState } from 'react';
import {
  INITIAL_CATEGORIES,
  CURATED_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_FUNCTION_HALLS,
  DECORATION_SERVICE_MODULES,
  REJECTION_REASONS
} from './data';

// Native Smartphone Bezel Wrapper with Serene Emerald & Slate Peace-of-Mind Theme
function MobilePhoneShell({ title, badge, children }) {
  return (
    <div className="w-full max-w-[405px] mx-auto bg-[#071318] border-[7px] border-slate-800/90 rounded-[44px] shadow-[0_25px_70px_-15px_rgba(16,185,129,0.28)] overflow-hidden flex flex-col min-h-[800px] max-h-[850px] relative">
      {/* Smartphone Top Notch & Status Bar */}
      <div className="bg-[#040B0E] px-5 py-2.5 flex justify-between items-center text-[10px] text-slate-300 border-b border-emerald-950/80 select-none">
        <span className="font-extrabold text-emerald-400 tracking-wide flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {title}
        </span>
        <div className="w-16 h-3.5 bg-slate-900 rounded-full border border-slate-800" />
        <span className="text-teal-300 font-semibold">{badge}</span>
      </div>

      {/* Scrollable Mobile Viewport */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-gradient-to-b from-[#071318] via-[#09181F] to-[#050E12]">
        {children}
      </div>

      {/* Bottom Home Indicator Bar */}
      <div className="bg-[#040B0E] py-2.5 flex justify-center border-t border-emerald-950/60">
        <div className="w-28 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

export default function App() {
// --- CREDENTIALS & ONBOARDING DATABASE ENGINE ---
  const savedDeviceUser = JSON.parse(localStorage.getItem('vfl_device_registered_user') || 'null');
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

  // Simulated Local Database (Preserved in browser storage)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const localDb = localStorage.getItem('vfl_registered_users_db');
    if (localDb) return JSON.parse(localDb);
    return [
      {
        id: 'usr_demo',
        fullName: 'Khoday Anvesh',
        username: 'anvesh_k',
        phone: '9848011223',
        govId: '999988887777',
        role: 'customer',
        passwordHash: 'Adilabad@2026',
        fastPin: '1990',
        selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    ];
  });

  // Registration Form State
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

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    usernameOrPhone: '',
    password: '',
    pinInput: ''
  });

  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState(savedDeviceUser || null);

  // Active Portal View
  const [activePortal, setActivePortal] = useState('customer');
  const [isPrimeCustomer, setIsPrimeCustomer] = useState(true);

  // Curiosity & Peace-of-Mind Discovery State
  const [searchQuery, setSearchQuery] = useState('');
  const [surpriseBoxOpen, setSurpriseBoxOpen] = useState(false);
  const [activeCuriosityFilter, setActiveCuriosityFilter] = useState('all'); // 'all' | 'under100' | 'fresh'

  // Master Data State
  const [categories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [functionHalls] = useState(INITIAL_FUNCTION_HALLS);

  // Commission Sliders (Founder Admin)
  const [merchantCommissionPct, setMerchantCommissionPct] = useState(0);
  const [consumerFeePct, setConsumerFeePct] = useState(0);

  // Selected Category & Isolated Category Carts
  const [selectedCategory, setSelectedCategory] = useState('daily_needs');
  const [activeCustomerSection, setActiveCustomerSection] = useState('shop'); // 'shop' | 'events' | 'taxi'
  const [selectedVariantMap, setSelectedVariantMap] = useState({});
  const [categoryCarts, setCategoryCarts] = useState({
    daily_needs: [],
    construction: [],
    medicines: []
  });
  const [showCartWindow, setShowCartWindow] = useState(false);

  // Google Maps Pinpoint Modal
  const [mapModal, setMapModal] = useState({
    open: false,
    mode: 'consumer_pin',
    lat: 19.6641,
    lng: 78.5320,
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

  // Active Order Queue
  const [orders, setOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [riderOtpInput, setRiderOtpInput] = useState('');
  const [reviewText, setReviewText] = useState('');

  // Decoration & Function Hall State (35%/85% Dynamic Escrow)
  const [eventDate, setEventDate] = useState('2026-10-29');
  const [eventTime, setEventTime] = useState('18:00');
  const [decorCart, setDecorCart] = useState([]);
  const [decorBids, setDecorBids] = useState([]);
  const [biddingStatus, setBiddingStatus] = useState('IDLE');
  const [selectedWinningBid, setSelectedWinningBid] = useState(null);
  const [merchantBidForm, setMerchantBidForm] = useState({
    price: 21500,
    notes: 'Includes complimentary welcome gate + extra 2 LED warm spotlights'
  });
  const [hallBookingState, setHallBookingState] = useState(null);

  // Merchant Sub-Category & Founder Approval Queue
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

  // Merchant Product Creator Form
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

// --- CREDENTIAL VERIFICATION & FRAUD PREVENTION LOGIC ---

  // Password Policy: min 8 characters, at least 1 number, at least 1 capital letter
  const validatePasswordStrength = (pw) => {
    return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
  };

  // 1. Mandatory Phone Number & OTP Dispatch
  const handleSendRegistrationOtp = () => {
    if (!/^\d{10}$/.test(regForm.phone)) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Anti-fraud: Verify phone is not already in the database
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
    setAuthStage('signup_step2'); // Proceed to Identity Details
  };

  // Selfie file attachment
  const handleCaptureSelfie = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setRegForm((prev) => ({ ...prev, selfieUrl: tempUrl }));
    }
  };

  // 2. Identity & ID Proof Verification (Anti-Duplicate Check)
  const handleCompleteIdentityStep = () => {
    if (!regForm.fullName.trim() || !regForm.username.trim()) {
      setAuthError('Please fill in your Full Legal Name and Username.');
      return;
    }

    // 12-Digit ID Proof format check
    const cleanedGovId = regForm.govId.replace(/\s+/g, '');
    if (!/^\d{12}$/.test(cleanedGovId)) {
      setAuthError('Please enter a valid 12-digit Government ID proof number.');
      return;
    }

    // Anti-fraud: Verify ID proof is not already registered
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
    setAuthStage('signup_step3'); // Proceed to Password & PIN Setup
  };

  // 3. Finalize Registration & Lock Device
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
      govId: regForm.govId.replace(/\s+/g, ''),
      role: selectedRole,
      passwordHash: regForm.password,
      fastPin: regForm.fastPin,
      selfieUrl: regForm.selfieUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      biometricEnabled: true,
      registeredAt: new Date().toISOString()
    };

    // Store in simulated cloud database
    const updatedDb = [...registeredUsers, newUser];
    setRegisteredUsers(updatedDb);
    localStorage.setItem('vfl_registered_users_db', JSON.stringify(updatedDb));

    // Lock device to single registration
    localStorage.setItem('vfl_device_registered_user', JSON.stringify(newUser));
    setHasRegisteredOnDevice(true);
    setCurrentUser(newUser);

    alert('✅ Verification Successful! Your account is created and this device is now locked to your credentials.');
    setOnboardingStep('app');
    setActivePortal('customer'); // All users begin with personal shopping access
  };

  // Database Verification on Standard Login
  const handlePasswordLogin = (e) => {
    e.preventDefault();
    const query = loginForm.usernameOrPhone.trim().toLowerCase();
    const matchedUser = registeredUsers.find(
      (u) => (u.username.toLowerCase() === query || u.phone === query) && u.role === selectedRole
    );

    if (!matchedUser) {
      setAuthError(`No verified ${selectedRole} account matches these credentials.`);
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
    setActivePortal('customer');
  };

  // Fast 4-Digit PIN Login
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
      setActivePortal('customer');
    } else {
      setAuthError('Incorrect 4-Digit PIN.');
    }
  };

  // Biometric Fast Unlock (WebAuthn / Fingerprint Sensor)
  const handleBiometricLogin = async () => {
    const targetUser = currentUser || savedDeviceUser;
    if (!targetUser) return;

    if (window.PublicKeyCredential) {
      try {
        setCurrentUser(targetUser);
        setOnboardingStep('app');
        setActivePortal('customer');
      } catch (err) {
        alert('Biometric sensor cancelled. Please enter your 4-digit PIN.');
      }
    } else {
      alert('Biometric sensor not detected on this browser. Please use your 4-digit PIN.');
    }
  };

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;
  const isCustomerLockedWaitingForMerchantBill =
    activeOrder &&
    activeOrder.status === 'ORDER_PLACED_MERCHANT_POPUP' &&
    activeOrder.categoryId === selectedCategory;

  // Weight & Distance Vehicle Auto-Dispatcher
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

  // Add Item to Isolated Category Cart OR Silent Prime Merge
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

const handlePlaceCategoryOrder = async (catId) => {
    const currentCart = categoryCarts[catId] || [];
    if (currentCart.length === 0) return;

    const totalWeightGrams = currentCart.reduce((s, i) => s + i.weightGrams * i.qty, 0);
    const itemsTotal = currentCart.reduce((s, i) => s + i.price * i.qty, 0);
    const { vehicle, deliveryFee } = calculateLogistics(totalWeightGrams, mapModal.distanceKm, 0, 0);
    const gst = Number(((itemsTotal + deliveryFee) * 0.05).toFixed(2));
    const grandTotal = Number((itemsTotal + deliveryFee + gst).toFixed(2));
    const secretOtp = String(Math.floor(1000 + Math.random() * 9000));

    // Send trial order data to your Vercel Serverless API endpoint
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: currentUser?.name || (isPrimeCustomer ? 'Anvesh (👑 Prime)' : 'Neighbor #101'),
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
      customerName: currentUser?.name || (isPrimeCustomer ? 'Anvesh (👑 Prime)' : 'Neighbor #101'),
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

  // Fixed Event Date Math
  const getDaysUntilEvent = () => {
    const today = new Date('2026-10-23T00:00:00');
    const selected = new Date(`${eventDate}T00:00:00`);
    const diff = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 1);
  };
  const daysAway = getDaysUntilEvent();
  const advancePercentage = daysAway >= 5 ? 35 : 85;

  // STEP 1 SCREEN: NATIVE DEVICE PERMISSIONS GATEWAY
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

// STEP 1: VERIFIED AUTHENTICATION & MULTI-STEP REGISTRATION
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

        {/* Global Error Banner */}
        {authError && (
          <div className="bg-rose-950/90 border border-rose-500 rounded-xl p-2.5 mb-2.5 text-[11px] text-rose-200 text-center font-semibold">
            ⚠️ {authError}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* FAST ACCESS: DEVICE-LOCKED MODE (If Already Registered) */}
        {/* ---------------------------------------------------- */}
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
                onClick={() => { setAuthError(''); setAuthStage('signin'); }}
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

        {/* ---------------------------------------------------- */}
        {/* FRAME 1: LANDING SCREEN                              */}
        {/* ---------------------------------------------------- */}
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
                onClick={() => { setAuthError(''); setAuthStage('signin'); }}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-xl border border-slate-700"
              >
                Sign In
              </button>
              {!hasRegisteredOnDevice ? (
                <button
                  type="button"
                  onClick={() => { setAuthError(''); setAuthStage('signup_step1'); }}
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

        {/* ---------------------------------------------------- */}
        {/* FRAME 2: STANDARD USERNAME & PASSWORD SIGN IN        */}
        {/* ---------------------------------------------------- */}
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

        {/* ---------------------------------------------------- */}
        {/* STEP 1 OF 3: PHONE VERIFICATION & OTP                */}
        {/* ---------------------------------------------------- */}
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

        {/* ---------------------------------------------------- */}
        {/* STEP 2 OF 3: LEGAL NAME, USERNAME, ID & SELFIE       */}
        {/* ---------------------------------------------------- */}
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
                GOVERNMENT ID PROOF NUMBER (12 DIGITS)
              </label>
              <input
                type="text"
                maxLength={12}
                required
                placeholder="Enter 12-Digit ID Number"
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
                  <img src={regForm.selfieUrl} alt="Selfie preview" className="w-9 h-9 rounded-full object-cover border border-emerald-400" />
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

        {/* ---------------------------------------------------- */}
        {/* STEP 3 OF 3: STRONG PASSWORD & QUICK PIN             */}
        {/* ---------------------------------------------------- */}
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

  // 1. CUSTOMER MOBILE APP PORTAL (COOL PEACE-OF-MIND & CURIOSITY SHOPPING UI)
  const renderCustomerPortal = () => {
    const currentCart = categoryCarts[selectedCategory] || [];
    const totalSavings = currentCart.reduce(
      (s, i) => s + ((i.mrp || i.price + 12) - i.price) * i.qty,
      0
    );

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
        {/* Top Bar with User Greeting & Cart */}
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

          <button
            onClick={() => setShowCartWindow(true)}
            className="bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 px-3 py-1.5 rounded-2xl text-[11px] font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-1"
          >
            <span>🛒</span>
            <span>{currentCart.reduce((s, i) => s + i.qty, 0)}</span>
          </button>
        </div>

        {/* Peace-of-Mind Assurance Strip */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl px-3 py-2 flex justify-between items-center text-[10px]">
          <span className="text-emerald-300 font-semibold">🛡️ Zero Hidden Fees</span>
          <span className="text-slate-400">•</span>
          <span className="text-teal-300 font-semibold">⏱️ 3m Bill Lock</span>
          <span className="text-slate-400">•</span>
          <span className="text-amber-300 font-semibold">🔐 OTP Escrow</span>
        </div>

        {/* Active Order Live Banner */}
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

        {/* Mobile Mode Switcher */}
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

        {/* SECTION 1: CURIOUS & CALM HYPERLOCAL SHOPPING */}
        {activeCustomerSection === 'shop' && (
          <div className="space-y-3">
            {/* Curiosity Spotlight Banner */}
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

            {/* Instant Search & Curiosity Filter Pills */}
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

            {/* Category Cards */}
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

            {/* Product Cards with Curiosity Badges & Savings */}
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

        {/* SECTION 2: FUNCTION HALLS & ANONYMOUS DECORATION BIDDING */}
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

        {/* SECTION 3: BIKE TAXI, 3W AUTO & PARCEL */}
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

        {/* ISOLATED CATEGORY CART MODAL WITH PEACE-OF-MIND SAVINGS */}
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

  // 2. MERCHANT MOBILE APP PORTAL
  const renderMerchantPortal = () => (
    <MobilePhoneShell title="🏪 VocalForLocal Merchant" badge="4h Ledger">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div>
          <h2 className="text-xs font-black text-emerald-400">Store Order Queue</h2>
          <p className="text-[10px] text-slate-400">Doorstep OTP Masked (****)</p>
        </div>
        <button
          onClick={handleCreateConcurrentNewOrder}
          className="bg-emerald-400 text-slate-950 px-2.5 py-1 rounded-xl text-[10px] font-extrabold"
        >
          + Simulate Order
        </button>
      </div>

      <div className="space-y-2">
        {orders.length === 0 ? (
          <p className="text-[11px] text-slate-400 text-center py-4">
            No active orders yet. Tap "+ Simulate Order" or place one from the Consumer App.
          </p>
        ) : (
          orders.map((ord) => (
            <div key={ord.id} className="bg-slate-900 p-2.5 rounded-2xl border border-emerald-500/40 text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="font-bold text-emerald-300">{ord.id}</span>
                <span className="text-[9px] text-amber-400">OTP: ****</span>
              </div>
              <p className="text-[10px] text-slate-300">
                {ord.items.map((i) => `${i.name} x${i.qty}`).join(', ')}
              </p>

              {ord.status === 'ORDER_PLACED_MERCHANT_POPUP' && (
                <div className="space-y-1.5 pt-1 border-t border-slate-800">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="text-[9px] text-slate-400">Heavy Transport (0)</label>
                      <input
                        type="number"
                        defaultValue={0}
                        onChange={(e) => (ord.heavyTransportFee = Number(e.target.value))}
                        className="w-full bg-[#061014] border border-slate-700 rounded-lg p-1 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400">Labor Fee (0)</label>
                      <input
                        type="number"
                        defaultValue={0}
                        onChange={(e) => (ord.laborFee = Number(e.target.value))}
                        className="w-full bg-[#061014] border border-slate-700 rounded-lg p-1 text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleMerchantConfirmBill(ord.id, ord.heavyTransportFee, ord.laborFee)}
                    className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl"
                  >
                    ✓ Confirm Stock & Push Final Bill
                  </button>
                </div>
              )}

              {ord.status === 'PAYMENT_DONE_PACKING_STARTED' && (
                <button
                  onClick={() => handleMerchantDispatchAlert(ord.id)}
                  className="w-full bg-amber-400 text-slate-950 font-black py-1.5 rounded-xl"
                >
                  📦 Packed ➔ Alert Rider (5-10m SLA)
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Event & Decor Bidding Console */}
      {(biddingStatus !== 'IDLE' || hallBookingState) && (
        <div className="bg-teal-950/60 border border-teal-400/50 p-2.5 rounded-2xl text-[10px] space-y-2">
          <h3 className="font-bold text-teal-200">🎉 Event & Decor Bidding Desk</h3>
          {hallBookingState && hallBookingState.status === 'AWAITING_HALL_CONFIRMATION' && (
            <button
              onClick={() => setHallBookingState({ ...hallBookingState, status: 'HALL_CONFIRMED_PAY_ADVANCE' })}
              className="w-full bg-emerald-400 text-slate-950 font-bold py-1.5 rounded-xl"
            >
              Confirm Hall Slot ({eventDate})
            </button>
          )}
          {biddingStatus === 'BROADCASTED' && (
            <div className="space-y-1.5">
              <input
                type="number"
                value={merchantBidForm.price}
                onChange={(e) => setMerchantBidForm({ ...merchantBidForm, price: Number(e.target.value) })}
                className="w-full bg-[#061014] border border-slate-700 rounded-lg p-1 text-white"
              />
              <button
                onClick={() =>
                  setDecorBids([
                    ...decorBids,
                    {
                      id: `bid_${Date.now()}`,
                      maskedVendor: 'Decorator Partner #B2',
                      price: merchantBidForm.price,
                      features: merchantBidForm.notes
                    }
                  ])
                }
                className="w-full bg-emerald-400 text-slate-950 font-bold py-1 rounded-lg"
              >
                Submit Competing Quote
              </button>
            </div>
          )}
          {biddingStatus === 'BID_ACCEPTED_AWAITING_MERCHANT' && (
            <button
              onClick={() => setBiddingStatus('DEAL_FINALIZED_PAYMENT_DUE')}
              className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl"
            >
              ✓ Confirm Deal & Raise {advancePercentage}% Escrow Popup
            </button>
          )}
        </div>
      )}

      {/* Add Brand Sub-Category */}
      <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 text-[10px] space-y-1.5">
        <h3 className="font-bold text-emerald-400">➕ Add New Local Product</h3>
        <input
          type="text"
          placeholder="Brand Name (e.g. Fortune Sunflower Oil)"
          value={newProdForm.subCategoryBrand}
          onChange={(e) => setNewProdForm({ ...newProdForm, subCategoryBrand: e.target.value })}
          className="w-full bg-[#061014] border border-slate-700 rounded-xl p-1.5 text-white"
        />
        <button
          onClick={() => {
            if (!newProdForm.subCategoryBrand) return;
            setPendingSubCategories([
              ...pendingSubCategories,
              {
                id: `ps_${Date.now()}`,
                categoryId: newProdForm.categoryId,
                subCategoryBrand: newProdForm.subCategoryBrand,
                shopName: newProdForm.shopName,
                distanceKm: 1.1,
                rating: 4.8,
                buyersToday: 18,
                curiosityTag: '🆕 New Local Arrival',
                image: newProdForm.image,
                status: 'pending',
                variants: newProdForm.variants.map((v, idx) => ({ ...v, id: `v_${Date.now()}_${idx}` }))
              }
            ]);
            setNewProdForm({ ...newProdForm, subCategoryBrand: '' });
            alert('Submitted to Founder Admin for Approval!');
          }}
          className="w-full bg-emerald-400 text-slate-950 font-bold py-1.5 rounded-xl"
        >
          Submit to Founder Admin
        </button>
      </div>
    </MobilePhoneShell>
  );

  // 3. RIDER MOBILE APP PORTAL
  const renderRiderPortal = () => (
    <MobilePhoneShell title="🛵 VocalForLocal Captain" badge="GPS Live">
      <div className="border-b border-slate-800 pb-2">
        <h2 className="text-xs font-black text-emerald-400">Delivery & Bike Taxi Radar</h2>
        <p className="text-[10px] text-slate-400">OTP Masked Until Consumer Doorstep</p>
      </div>
      {orders.length === 0 ? (
        <p className="text-[11px] text-slate-400 py-8 text-center">No active dispatches. Standing by in Adilabad.</p>
      ) : (
        orders.map((ord) => (
          <div key={ord.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-[11px] space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-emerald-400">{ord.id}</span>
              <span>{ord.vehicle.slice(0, 18)}</span>
            </div>
            <p className="text-[10px] text-slate-300">Drop: {ord.address}</p>
            <p className="text-[10px] text-amber-400 font-bold">Consumer OTP: **** (Hidden)</p>

            {ord.status === 'READY_FOR_PICKUP_AGENT_ALERTED' && (
              <button
                onClick={() => handleRiderAcceptPickupToken(ord.id)}
                className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl"
              >
                🎟️ Accept Pickup Token (Locks Order)
              </button>
            )}

            {ord.status === 'OUT_FOR_DELIVERY_LIVE_MAP' && (
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Enter 4-Digit Consumer OTP"
                  value={riderOtpInput}
                  onChange={(e) => setRiderOtpInput(e.target.value)}
                  className="w-full bg-[#061014] border border-slate-700 rounded-xl p-1.5 text-white font-mono"
                />
                <button
                  onClick={() => handleVerifyDeliveryOtp(ord.id)}
                  className="w-full bg-emerald-400 text-slate-950 font-black py-1.5 rounded-xl"
                >
                  ✓ Verify OTP & Complete Delivery
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </MobilePhoneShell>
  );

  // 4. FOUNDER ADMIN PORTAL
  const renderAdminPortal = () => (
    <MobilePhoneShell title="💻 VocalForLocal Admin" badge="Master Governance">
      <div className="bg-slate-900 p-3 rounded-2xl border border-emerald-500/40 text-[11px] space-y-2">
        <h3 className="font-bold text-emerald-400">
          🛡️ Pending Merchants ({pendingMerchants.length})
        </h3>
        {pendingMerchants.map((pm) => (
          <div key={pm.id} className="bg-[#061014] p-2 rounded-xl flex justify-between items-center">
            <div>
              <p className="font-bold">{pm.businessName}</p>
              <p className="text-[9px] text-slate-400">E-Signed • {pm.categoryId}</p>
            </div>
            <button
              onClick={() => setPendingMerchants(pendingMerchants.filter((m) => m.id !== pm.id))}
              className="bg-emerald-400 text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-bold"
            >
              Approve
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-[11px] space-y-2">
        <h3 className="font-bold text-emerald-400">
          📦 Pending Brand Sub-Categories ({pendingSubCategories.length})
        </h3>
        {pendingSubCategories.map((item) => (
          <div key={item.id} className="bg-[#061014] p-2.5 rounded-xl space-y-1.5">
            <p className="font-bold">{item.subCategoryBrand}</p>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setProducts([...products, { ...item, status: 'approved' }]);
                  setPendingSubCategories(pendingSubCategories.filter((i) => i.id !== item.id));
                }}
                className="flex-1 bg-emerald-400 text-slate-950 py-1 rounded-lg font-bold text-[10px]"
              >
                ✓ Approve
              </button>
              <button
                onClick={() =>
                  setPendingSubCategories(pendingSubCategories.filter((i) => i.id !== item.id))
                }
                className="flex-1 bg-rose-600 text-white py-1 rounded-lg font-bold text-[10px]"
              >
                ✕ Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-[11px] space-y-2">
        <div className="flex justify-between">
          <span>Merchant Commission (0-10%):</span>
          <span className="text-emerald-400 font-bold">{merchantCommissionPct}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={merchantCommissionPct}
          onChange={(e) => setMerchantCommissionPct(e.target.value)}
          className="w-full accent-emerald-400"
        />
        <div className="flex justify-between">
          <span>Consumer Fee (0-5%):</span>
          <span className="text-emerald-400 font-bold">{consumerFeePct}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={consumerFeePct}
          onChange={(e) => setConsumerFeePct(e.target.value)}
          className="w-full accent-emerald-400"
        />
      </div>
    </MobilePhoneShell>
  );

  return (
    <div className="min-h-screen text-white p-3 font-sans">
 {/* Role-Enforced Portal Navigation Bar */}
      <div className="max-w-6xl mx-auto mb-4 bg-slate-900/90 backdrop-blur border border-slate-800 p-2 rounded-2xl flex flex-wrap gap-1.5 justify-center items-center text-xs sticky top-2 z-40">
        {/* Shopping Portal is open to Customer, Merchant, Service Provider, and Delivery Agent */}
        <button
          onClick={() => { setOnboardingStep('app'); setActivePortal('customer'); }}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            onboardingStep === 'app' && activePortal === 'customer'
              ? 'bg-emerald-400 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          🛍️ Shopping Hub (Open to All)
        </button>

        {/* Merchant Dashboard: Only accessible to Merchant accounts */}
        <button
          onClick={() => {
            if (currentUser && currentUser.role !== 'merchant') {
              alert(`Access Restricted: You are signed in as a ${currentUser.role.replace('_', ' ')}. You can shop in the Customer Hub, but operational tools are limited to Merchants.`);
              return;
            }
            setOnboardingStep('app');
            setActivePortal('merchant');
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            onboardingStep === 'app' && activePortal === 'merchant'
              ? 'bg-emerald-400 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          🏪 Store Operations
        </button>

        {/* Service Provider Dashboard (Decorators / Event Planners) */}
        <button
          onClick={() => {
            if (currentUser && currentUser.role !== 'service_provider' && currentUser.role !== 'merchant') {
              alert(`Access Restricted: Service Provider desk is for Event Decorators & Convention owners.`);
              return;
            }
            setOnboardingStep('app');
            setActivePortal('merchant');
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            onboardingStep === 'app' && activePortal === 'service_provider'
              ? 'bg-emerald-400 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          🎉 Decorator Bidding Desk
        </button>

        {/* Delivery Partner Dashboard: Only accessible to Delivery Agents */}
        <button
          onClick={() => {
            if (currentUser && currentUser.role !== 'delivery_agent') {
              alert(`Access Restricted: Delivery Radar is strictly for registered Delivery Agents & Captains.`);
              return;
            }
            setOnboardingStep('app');
            setActivePortal('rider');
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            onboardingStep === 'app' && activePortal === 'rider'
              ? 'bg-emerald-400 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          🛵 Delivery Radar
        </button>

        <button
          onClick={() => setOnboardingStep('auth')}
          className="px-3 py-1.5 rounded-xl font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 ml-auto"
        >
          🔐 Device Lock / Switch
        </button>
      </div>

      {/* Render Current Step or Active Portal */}
      {onboardingStep === 'permissions' && renderPermissionsScreen()}
      {onboardingStep === 'auth' && renderAuthScreen()}
      {onboardingStep === 'app' && (
        <>
          {activePortal === 'customer' && renderCustomerPortal()}
          {activePortal === 'merchant' && renderMerchantPortal()}
          {activePortal === 'rider' && renderRiderPortal()}
          {activePortal === 'admin' && renderAdminPortal()}
          {activePortal === 'split' && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
              {renderCustomerPortal()}
              {renderMerchantPortal()}
              {renderRiderPortal()}
            </div>
          )}
        </>
      )}

      {/* Google Maps Pinpoint Modal */}
      {mapModal.open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500 rounded-3xl max-w-sm w-full p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-emerald-400">🗺️ VocalForLocal Live GPS Pin</h3>
              <button
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
