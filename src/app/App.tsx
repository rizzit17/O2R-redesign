import { useState, useRef, useEffect } from "react";
import {
  Home, Grid3X3, ShoppingCart, Tag, Package, MapPin, Search,
  Bell, ChevronRight, ChevronDown, Plus, Minus, ArrowLeft, X,
  Check, Phone, Truck, FileText, Star, Gift, Clock, User,
  HelpCircle, LogOut, Filter, Award, TrendingUp, RefreshCw,
  AlertCircle, Loader2, Globe, BookOpen, ReceiptText, CreditCard,
  MessageSquare, Zap, Menu, Upload, FileCheck, Info
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "login" | "otp"
  | "home" | "products" | "categories" | "cart" | "offers"
  | "drawer" | "calling-slot" | "signup" | "address" | "orders"
  | "deliveries" | "invoices" | "language" | "help" | "loading"
  | "empty" | "error" | "account";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Thums Up 250ml", pack: "250ml × 15", weight: "3750ml", mrp: 300, price: 250, discount: 50, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop&auto=format", category: "Beverages", brand: "Coca Cola", inCart: 1, stock: 12 },
  { id: 2, name: "Chingles Filz Jar", pack: "360g × 1", weight: "360g", mrp: 134, price: 116, discount: 18, image: "https://images.unsplash.com/photo-1582845512747-e42001c95638?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "DS Group", inCart: 0, stock: 8 },
  { id: 3, name: "Pulse Golmol Imli", pack: "525g × 1", weight: "525g", mrp: 150, price: 113, discount: 37, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "DS Group", inCart: 0, stock: 24 },
  { id: 4, name: "Britannia Good Day", pack: "300g × 12", weight: "3.6kg", mrp: 480, price: 420, discount: 60, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop&auto=format", category: "Biscuits", brand: "Britannia", inCart: 0, stock: 15 },
  { id: 5, name: "Cadbury Dairy Milk", pack: "38g × 20", weight: "760g", mrp: 380, price: 340, discount: 40, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop&auto=format", category: "Chocolates", brand: "Cadbury", inCart: 0, stock: 18 },
  { id: 6, name: "Too Yumm Rings", pack: "23g × 12", weight: "276g", mrp: 120, price: 96, discount: 24, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "Excyt", inCart: 0, stock: 9 },
  { id: 7, name: "Dettol Handwash", pack: "200ml × 6", weight: "1.2L", mrp: 360, price: 300, discount: 60, image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=300&fit=crop&auto=format", category: "Personal Care", brand: "Dettol", inCart: 0, stock: 11 },
  { id: 8, name: "Pass Pass Meetha Magic", pack: "11.7g × 18", weight: "210.6g", mrp: 90, price: 72, discount: 18, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop&auto=format", category: "Mouth Freshener", brand: "DS Group", inCart: 0, stock: 5 },
  { id: 9, name: "Fun Flips Classic Salty", pack: "100g × 10", weight: "1kg", mrp: 120, price: 100, discount: 20, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "Fun Flips", inCart: 0, stock: 0 },
  { id: 10, name: "LuvIt Choco Spread", pack: "310g × 1", weight: "310g", mrp: 180, price: 150, discount: 30, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop&auto=format", category: "Chocolates", brand: "LuvIt", inCart: 0, stock: 20 }
];

const CATEGORIES = [
  { id: 1, name: "Beverages", icon: "🥤", count: 48, color: "#E0F2FE" },
  { id: 2, name: "Snacks", icon: "🍿", count: 112, color: "#FEF3C7" },
  { id: 3, name: "Biscuits", icon: "🍪", count: 67, color: "#DCFCE7" },
  { id: 4, name: "Chocolates", icon: "🍫", count: 43, color: "#FFE4E6" },
  { id: 5, name: "Personal Care", icon: "🧴", count: 89, color: "#F3E8FF" },
  { id: 6, name: "Mouth Freshener", icon: "🌿", count: 31, color: "#D1FAE5" },
  { id: 7, name: "Dairy", icon: "🥛", count: 24, color: "#FFF9DB" },
  { id: 8, name: "Instant Food", icon: "🍜", count: 56, color: "#FFEDD5" },
  { id: 9, name: "Household", icon: "🧹", count: 38, color: "#E0F2FE" },
  { id: 10, name: "Confectionery", icon: "🍬", count: 77, color: "#FAE8FF" },
];

const OFFERS = [
  { id: 1, code: "CUP15918", title: "Free Products Worth ₹376", desc: "Place 25 orders worth min. ₹2,000 each", progress: 18, target: 25, type: "scheme", reward: "Luvit Eclairs × 4, Chingles × 2", unlocked: false, discountValue: 0 },
  { id: 2, code: "CUP88181", title: "Free Products Worth ₹100", desc: "Place 30 orders worth min. ₹500 each", progress: 22, target: 30, type: "scheme", reward: "TooYumm Rings × 3", unlocked: false, discountValue: 0 },
  { id: 3, code: "CUP2827", title: "Free Gift Worth ₹500", desc: "Place 20 orders worth min. ₹5,500 each", progress: 14, target: 20, type: "scheme", reward: "Premium Gift Hamper", unlocked: false, discountValue: 0 },
  { id: 4, code: "CUP49359", title: "₹150 Off on Order", desc: "Min. order value ₹4,200", progress: 100, target: 100, type: "coupon", reward: "₹150 discount", unlocked: true, discountValue: 150 },
  { id: 5, code: "CUP19111", title: "₹75 Off on Order", desc: "Min. order value ₹2,600", progress: 100, target: 100, type: "coupon", reward: "₹75 discount", unlocked: true, discountValue: 75 },
  { id: 6, code: "CUP68219", title: "Free Products Worth ₹552", desc: "Place 25 orders worth min. ₹3,000 each", progress: 8, target: 25, type: "scheme", reward: "Assorted Products Bundle", unlocked: false, discountValue: 0 },
];

const ORDERS = [
  { id: "ORD-7821", date: "25 May 2026", items: 8, total: 2450, status: "delivered", address: "Sector 70 Noida, Noida-Greater Noida Expressway, Aniwas, 201310", products: [{ id: 1, name: "Thums Up 250ml", qty: 3, price: 250 }, { id: 4, name: "Britannia Good Day", qty: 2, price: 420 }, { id: 5, name: "Cadbury Dairy Milk", qty: 2, price: 340 }, { id: 7, name: "Dettol Handwash", qty: 1, price: 300 }] },
  { id: "ORD-7756", date: "22 May 2026", items: 5, total: 1180, status: "out for delivery", address: "Sector 70 Noida, Noida-Greater Noida Expressway, Aniwas, 201310", products: [{ id: 2, name: "Chingles Filz Jar", qty: 2, price: 116 }, { id: 3, name: "Pulse Golmol Imli", qty: 1, price: 113 }, { id: 6, name: "Too Yumm Rings", qty: 2, price: 96 }] },
  { id: "ORD-7703", date: "19 May 2026", items: 12, total: 3890, status: "delivered", address: "Sector 62, Block C, Noida, Uttar Pradesh - 201301", products: [{ id: 1, name: "Thums Up 250ml", qty: 4, price: 250 }, { id: 4, name: "Britannia Good Day", qty: 3, price: 420 }, { id: 5, name: "Cadbury Dairy Milk", qty: 2, price: 340 }, { id: 10, name: "LuvIt Choco Spread", qty: 3, price: 150 }] },
  { id: "ORD-7642", date: "15 May 2026", items: 3, total: 620, status: "cancelled", address: "Sector 70 Noida, Noida-Greater Noida Expressway, Aniwas, 201310", products: [{ id: 8, name: "Pass Pass Meetha Magic", qty: 2, price: 72 }, { id: 6, name: "Too Yumm Rings", qty: 1, price: 96 }] },
  { id: "ORD-7598", date: "11 May 2026", items: 9, total: 2240, status: "delivered", address: "Sector 50, Block A, Noida, Uttar Pradesh - 201303", products: [{ id: 1, name: "Thums Up 250ml", qty: 2, price: 250 }, { id: 2, name: "Chingles Filz Jar", qty: 3, price: 116 }, { id: 7, name: "Dettol Handwash", qty: 2, price: 300 }, { id: 10, name: "LuvIt Choco Spread", qty: 2, price: 150 }] },
];

const DELIVERIES = [
  { id: "DEL-4421", orderId: "ORD-7756", date: "26 May 2026", eta: "2:00 PM – 4:00 PM", items: 5, status: "out for delivery", driver: "Ramesh Kumar", phone: "9876543210" },
  { id: "DEL-4398", orderId: "ORD-7821", date: "25 May 2026", eta: "Delivered at 3:45 PM", items: 8, status: "delivered", driver: "Suresh Singh", phone: "9123456780" },
  { id: "DEL-4351", orderId: "ORD-7703", date: "20 May 2026", eta: "Delivered at 11:20 AM", items: 12, status: "delivered", driver: "Ajay Yadav", phone: "9988776655" },
];

const INVOICES = [
  { id: "INV-2024-0521", orderId: "ORD-7821", date: "25 May 2026", amount: 2450, gst: 220, total: 2670, status: "paid" },
  { id: "INV-2024-0498", orderId: "ORD-7703", date: "19 May 2026", amount: 3890, gst: 350, total: 4240, status: "paid" },
  { id: "INV-2024-0462", orderId: "ORD-7598", date: "11 May 2026", amount: 2240, gst: 201, total: 2441, status: "paid" },
];

const LOCALIZATIONS: Record<string, Record<string, string>> = {
  English: {
    shopCategory: "Shop by Category",
    trending: "Trending Now",
    bestSellers: "Best Sellers",
    deliverTo: "Deliver to",
    limitedTime: "Limited Time Offer",
    schemeProgress: "Scheme Progress",
    ordersToUnlock: "more orders to unlock",
    searchPlaceholder: "Search products, brands, categories...",
    allOffers: "Offers & Schemes",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    welcome: "Welcome back!",
    signinDesc: "Sign in to manage your orders",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "Enter mobile number",
    sendOtp: "Send OTP",
    verifyOtp: "Verify OTP",
    verifyTitle: "Verify OTP",
    sentTo: "Sent to +91",
    enterOtp: "Enter 4-digit OTP",
    resendOtp: "Resend OTP",
    businessTitle: "Your Business",
    businessDesc: "Tell us about your shop",
    shopName: "Shop Name",
    ownerName: "Owner Name",
    gstLabel: "GST Number (optional)",
    getStarted: "Get Started",
    privacyText: "By continuing, you agree to our Terms & Privacy Policy.",
    readPrivacy: "Read Privacy Policy",
    change: "Change",
    edit: "Edit",
    addressTitle: "Delivery Address",
    currentLocation: "Use current location",
    saveAddress: "Save Address"
  },
  Hindi: {
    shopCategory: "श्रेणी के अनुसार खरीदें",
    trending: "अभी ट्रेंडिंग",
    bestSellers: "सबसे ज्यादा बिकने वाले",
    deliverTo: "यहाँ पहुँचाएं",
    limitedTime: "सीमित समय का ऑफर",
    schemeProgress: "योजना की प्रगति",
    ordersToUnlock: "ऑर्डर अनलॉक करने के लिए शेष",
    searchPlaceholder: "उत्पाद, ब्रांड, श्रेणियों को खोजें...",
    allOffers: "ऑफ़र और योजनाएं",
    terms: "नियम और शर्तें",
    privacy: "गोपनीयता नीति",
    welcome: "स्वागत है!",
    signinDesc: "अपने ऑर्डर प्रबंधित करने के लिए लॉग इन करें",
    mobileLabel: "मोबाइल नंबर",
    mobilePlaceholder: "मोबाइल नंबर दर्ज करें",
    sendOtp: "ओटीपी भेजें",
    verifyOtp: "ओटीपी सत्यापित करें",
    verifyTitle: "ओटीपी सत्यापित करें",
    sentTo: "इस नंबर पर भेजा गया: +91",
    enterOtp: "4-अंकीय ओटीपी दर्ज करें",
    resendOtp: "ओटीपी पुनः भेजें",
    businessTitle: "आपका व्यवसाय",
    businessDesc: "अपनी दुकान की जानकारी दें",
    shopName: "दुकान का नाम",
    ownerName: "मालिक का नाम",
    gstLabel: "जीएसटी नंबर (वैकल्पिक)",
    getStarted: "शुरू करें",
    privacyText: "आगे बढ़कर, आप हमारे नियमों और गोपनीयता नीति से सहमत होते हैं।",
    readPrivacy: "गोपनीयता नीति पढ़ें",
    change: "बदलें",
    edit: "संपादित करें",
    addressTitle: "वितरण का पता",
    currentLocation: "वर्तमान स्थान का उपयोग करें",
    saveAddress: "पता सहेजें"
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cn(...cls: (string | false | undefined | null)[]) {
  return cls.filter(Boolean).join(" ");
}

function translate(key: string, lang: string): string {
  if (lang !== "Hindi") return key;
  const dict: Record<string, string> = {
    "Home": "होम",
    "Categories": "श्रेणियां",
    "Cart": "कार्ट",
    "Offers": "ऑफ़र",
    "Orders": "ऑर्डर",
    "Deliveries": "वितरण",
    "Invoices": "इनवॉइस",
    "Help & Support": "सहायता और समर्थन",
    "Calling Slot": "कॉलिंग स्लॉट",
    "Language Settings": "भाषा सेटिंग्स",
    "My Account": "मेरा खाता",
    "Manage Address": "पता प्रबंधित करें",
    "All Brands": "सभी ब्रांड",
    "All Categories": "सभी श्रेणियां",
    "Cart Details": "कार्ट विवरण",
    "Offers & Schemes": "ऑफ़र और योजनाएं",
    "My Orders": "मेरे ऑर्डर",
    "Shop": "दुकान",
    "Quick Language": "त्वरित भाषा",
    "Sign Out": "साइन आउट",
    "Verify": "सत्यापित करें",
    "Shop Info": "दुकान की जानकारी",
    "Mobile": "मोबाइल",
    "Verify OTP": "ओटीपी सत्यापित करें",
    "Items total (MRP)": "आइटम का कुल मूल्य (MRP)",
    "Wholesale Discount": "थोक छूट",
    "Delivery charge": "वितरण शुल्क",
    "Handling charge": "हैंडलिंग शुल्क",
    "Grand Total": "कुल योग",
    "Total Amount": "कुल राशि",
    "Saved": "बचे",
    "Place Order": "ऑर्डर प्लेस करें",
    "Bill Details": "बिल विवरण",
    "Add": "जोड़ें",
    "View Cart": "कार्ट देखें",
    "item added": "आइटम जोड़ा गया",
    "items added": "आइटम जोड़े गए",
    "Coupon Applied": "कूपन लागू किया गया",
    "Active Scheme Benefit": "सक्रिय योजना लाभ",
    "Your cart is empty": "आपका कार्ट खाली है",
    "Browse Products": "उत्पादों को ब्राउज़ करें",
    "Change Order Address": "ऑर्डर का पता बदलें",
    "Confirm and Update Order": "पुष्टि करें और ऑर्डर अपडेट करें",
    "Delivery Location": "वितरण का स्थान",
    "Save Address": "पता सहेजें",
    "Use current location": "वर्तमान स्थान का उपयोग करें",
    "Warning: You are editing the delivery address for dispatching order": "चेतावनी: आप ऑर्डर भेजने के लिए वितरण पता संपादित कर रहे हैं",
    "Call Support Hotline": "सपोर्ट हॉटलाइन पर कॉल करें",
    "Mon–Sat · 10 AM to 6 PM": "सोम-शनि · सुबह 10 से शाम 6 बजे",
    "Call Us": "कॉल करें",
    "Live Chat": "लाइव चैट",
    "Raise Ticket": "टिकट बनाएं",
    "User Guide": "उपयोगकर्ता गाइड",
    "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",
    "delivered": "पहुंचाया गया",
    "out for delivery": "वितरण के लिए बाहर",
    "cancelled": "रद्द किया गया",
    "paid": "भुगतान किया गया",
    "Sort & Filter": "क्रमबद्ध और फ़िल्टर",
    "Default Sort": "डिफ़ॉल्ट क्रम",
    "Price: Low to High": "कीमत: कम से अधिक",
    "Price: High to Low": "कीमत: अधिक से कम",
    "Savings: High to Low": "बचत: अधिक से कम",
    "Thums Up 250ml": "थम्स अप 250ml",
    "Chingles Filz Jar": "चिंगल्स फिल्ज जार",
    "Pulse Golmol Imli": "पल्स गोलमोल इमली",
    "Britannia Good Day": "ब्रिटानिया गुड डे",
    "Cadbury Dairy Milk": "कैडबरी डेयरी मिल्क",
    "Too Yumm Rings": "टू यम रिंग्स",
    "Dettol Handwash": "डेटॉल हैंडवॉश",
    "Pass Pass Meetha Magic": "पास पास मीठा मैजिक",
    "Fun Flips Classic Salty": "फन फ्लिप्स क्लासिक साल्टी",
    "LuvIt Choco Spread": "लविट चोको स्प्रेड",
    "Beverages": "पेय पदार्थ",
    "Snacks": "स्नैक्स",
    "Biscuits": "बिस्कुट",
    "Chocolates": "चॉकलेट",
    "Personal Care": "व्यक्तिगत देखभाल",
    "Mouth Freshener": "माउथ फ्रेशनर",
    "Dairy": "डेयरी उत्पाद",
    "Instant Food": "त्वरित भोजन",
    "Household": "घरेलू सामान",
    "Confectionery": "मिठाई",
    "Shop by Category": "श्रेणी के अनुसार खरीदें",
    "Trending Now": "अभी ट्रेंडिंग",
    "Best Sellers": "सबसे ज्यादा बिकने वाले",
    "Deliver to": "यहाँ पहुँचाएं",
    "Limited Time Offer": "सीमित समय का ऑफर",
    "Scheme Progress": "योजना की प्रगति",
    "more orders to unlock": "ऑर्डर अनलॉक करने के लिए शेष",
    "Search products, brands, categories...": "उत्पाद, ब्रांड, श्रेणियों को खोजें...",
    "Terms & Conditions": "नियम और शर्तें",
    "Privacy Policy": "गोपनीयता नीति",
    "Welcome back!": "स्वागत है!",
    "Sign in to manage your orders": "अपने ऑर्डर प्रबंधित करने के लिए लॉग इन करें",
    "Mobile Number": "मोबाइल नंबर",
    "Enter mobile number": "मोबाइल नंबर दर्ज करें",
    "Send OTP": "ओटीपी भेजें",
    "Sent to +91": "इस नंबर पर भेजा गया: +91",
    "Enter 4-digit OTP": "4-अंकीय ओटीपी दर्ज करें",
    "Resend OTP": "ओटीपी पुनः भेजें",
    "Your Business": "आपका व्यवसाय",
    "Tell us about your shop": "अपनी दुकान की जानकारी दें",
    "Shop Name": "दुकान का नाम",
    "Owner Name": "मालिक का नाम",
    "GST Number (optional)": "जीएसटी नंबर (वैकल्पिक)",
    "Get Started": "शुरू करें",
    "By continuing, you agree to our Terms & Privacy Policy.": "आगे बढ़कर, आप हमारे नियमों और गोपनीयता नीति से सहमत होते हैं।",
    "Read Privacy Policy": "गोपनीयता नीति पढ़ें",
    "Change": "बदलें",
    "Edit": "संपादित करें",
    "Delivery Address": "वितरण का पता",
    "Retailer Dashboard": "रिटेलर डैशबोर्ड",
    "Welcome, Rishit!": "स्वागत है, ऋषित!",
    "SAVED THIS MONTH": "इस महीने की बचत",
    "3 Active Schemes": "3 सक्रिय योजनाएं",
    "Fun Flips Deal": "फन फ्लिप्स सौदा",
    "Buy 3 Fun Flips Salty, Get 1 Free!": "3 फन फ्लिप्स साल्टी खरीदें, 1 मुफ्त पाएं!",
    "Add crunchy snack bundles to your retail store.": "अपनी खुदरा दुकान में कुरकुरे स्नैक्स जोड़ें।",
    "Out of Stock": "स्टॉक में नहीं",
    "Fun Flips is temporarily unavailable": "फन फ्लिप्स अस्थायी रूप से अनुपलब्ध है",
    "We will maintain layout and restock in 2 days.": "हम लेआउट बनाए रखेंगे और 2 दिनों में स्टॉक करेंगे।",
    "Notify Me": "मुझे सूचित करें",
    "Featured Partner": "प्रदर्शित भागीदार",
    "LuvIt Chocolate Fest! 🍫": "लविट चॉकलेट उत्सव! 🍫",
    "Up to 30% discount on LuvIt Cocoa Spreads. Tap to order.": "लविट कोको स्प्रेड पर 30% तक की छूट। ऑर्डर करने के लिए टैप करें।",
    "Mega Chocolate Festival": "मेगा चॉकलेट महोत्सव",
    "LuvIt is restocking. Explore Cadbury Dairy Milk deals instead!": "लविट फिर से स्टॉक हो रहा है। इसके बजाय कैडबरी डेयरी मिल्क के सौदों को देखें!",
    "7 more orders to unlock ₹376 Free Gift": "₹376 का मुफ्त उपहार अनलॉक करने के लिए 7 और ऑर्डर",
    "18 Orders (₹36,000)": "18 ऑर्डर (₹36,000)",
    "Goal: 25 Orders": "लक्ष्य: 25 ऑर्डर",
    "All Products": "सभी उत्पाद",
    "All Offers": "सभी ऑफ़र",
    "Schemes": "योजनाएं",
    "Coupons": "कूपन",
    "Unlocked": "अनलॉक किया गया",
    "Active Schemes": "सक्रिय योजनाएं",
    "Unlocked Coupons": "अनलॉक किए गए कूपन",
    "Potential Rewards": "संभावित पुरस्कार",
    "Free Products Worth": "मुफ्त उत्पाद मूल्य",
    "Place 25 orders worth min. ₹2,000 each": "प्रत्येक न्यूनतम ₹2,000 के 25 ऑर्डर दें",
    "Free Gift Worth": "मुफ्त उपहार मूल्य",
    "Place 30 orders worth min. ₹500 each": "प्रत्येक न्यूनतम ₹500 के 30 ऑर्डर दें",
    "Place 20 orders worth min. ₹5,500 each": "प्रत्येक न्यूनतम ₹5,500 के 20 ऑर्डर दें",
    "Place 25 orders worth min. ₹3,000 each": "प्रत्येक न्यूनतम ₹3,000 के 25 ऑर्डर दें",
    "₹150 Off on Order": "ऑर्डर पर ₹150 की छूट",
    "Min. order value ₹4,200": "न्यूनतम ऑर्डर मूल्य ₹4,200",
    "₹75 Off on Order": "ऑर्डर पर ₹75 की छूट",
    "Min. order value ₹2,600": "न्यूनतम ऑर्डर मूल्य ₹2,600",
    "₹150 discount": "₹150 छूट",
    "₹75 discount": "₹75 छूट",
    "Apply": "लागू करें",
    "Free Products Worth ₹376": "मुफ्त उत्पाद मूल्य ₹376",
    "Free Products Worth ₹100": "मुफ्त उत्पाद मूल्य ₹100",
    "Free Gift Worth ₹500": "मुफ्त उपहार मूल्य ₹500",
    "Free Products Worth ₹552": "मुफ्त उत्पाद मूल्य ₹552",
    "Reward Benefit": "पुरस्कार का लाभ",
    "items": "आइटम",
    "Orders placed": "ऑर्डर किए गए",
    "remaining": "शेष",
    "Account": "खाता विवरण",
    "Support Hotline Available": "सपोर्ट हॉटलाइन उपलब्ध",
    "Mon–Sat · 9:00 AM to 6 PM": "सोम-शनि · सुबह 9:00 बजे से शाम 6 बजे",
    "Morning slots": "सुबह के स्लॉट",
    "Afternoon slots": "दोपहर के स्लॉट",
    "Evening slots": "शाम के स्लॉट",
    "Select a Time Slot": "समय स्लॉट चुनें",
    "Confirm": "पुष्टि करें",
    "Click to select document": "दस्तावेज़ चुनने के लिए क्लिक करें",
    "Supports JPG, PNG or PDF · Max 5MB": "JPG, PNG या PDF का समर्थन करता है · अधिकतम 5MB",
    "Uploading document...": "दस्तावेज़ अपलोड हो रहा है...",
    "Change Shipping Address": "शिपिंग पता बदलें",
    "Hide Details": "विवरण छिपाएं",
    "View Details": "विवरण देखें",
    "Reorder": "पुनः ऑर्डर करें",
    "Out for delivery today": "वितरण के लिए आज बाहर",
    "En Route": "रास्ते में",
    "Delivered": "पहुंचा दिया",
    "Track Order": "ऑर्डर ट्रैक करें",
    "View Invoice": "इनवॉइस देखें",
    "Total Paid": "कुल भुगतान",
    "GST Paid": "जीएसटी भुगतान",
    "ALL CLEAR": "सभी भुगतान साफ",
    "3 INVOICES": "3 इनवॉइस",
    "Total Invoice": "कुल इनवॉइस",
    "Download PDF Invoice": "पीडीएफ इनवॉइस डाउनलोड करें",
    "App Language": "ऐप भाषा चुनें",
    "Select your preferred language": "अपनी पसंदीदा भाषा चुनें",
    "Continue with": "जारी रखें",
    "All": "सभी",
    "Sector 70, Noida": "सेक्टर 70, नोएडा",
    "Rishit Wholesale Store": "ऋषित थोक भंडार",
    "Rishit Wholesale Store (Updating Order)": "ऋषित थोक भंडार (ऑर्डर अपडेट हो रहा है)",
    "Registered Mobile": "पंजीकृत मोबाइल",
    "GSTIN": "जीएसटीIN",
    "Verified Retailer": "सत्यापित रिटेलर",
    "Account details": "खाता विवरण",
    "Save": "सहेजें",
    "Total Orders": "कुल ऑर्डर",
    "Monthly Savings": "मासिक बचत",
    "Shop/Building Name": "दुकान/भवन का नाम",
    "Street Address": "सड़क का पता",
    "Area / Locality": "क्षेत्र / इलाका",
    "City": "शहर",
    "PIN Code": "पिन कोड",
    "State": "राज्य",
    "6-digit PIN code": "6-अंकीय पिन कोड",
    "House no., street/block name": "मकान नंबर, सड़क/ब्लॉक का नाम",
    "Area, colony name": "क्षेत्र, कॉलोनी का नाम",
    "Enter 15-digit GSTIN (optional)": "15-अंकीय जीएसटीIN दर्ज करें (वैकल्पिक)",
    "15-digit business identifier.": "15-अंकीय व्यावसायिक पहचानकर्ता।",
    "Full name": "पूरा नाम",
    "As displayed on your PAN or Aadhaar.": "जैसा कि आपके पैन या आधार पर प्रदर्शित है।",
    "e.g. Sharma General Store": "जैसे: शर्मा जनरल स्टोर",
    "Use your official business brand name.": "अपने आधिकारिक व्यावसायिक ब्रांड नाम का उपयोग करें।",
    "Upload GST Cert. or Shop Photo": "जीएसटी प्रमाणपत्र या दुकान का फोटो अपलोड करें",
    "Confirm: ": "पुष्टि करें: ",
    "Use Current Location": "वर्तमान स्थान का उपयोग करें",
    "Phone Number": "फ़ोन नंबर",
    "Email Address": "ईमेल पता",
    "Save Changes": "बदलाव सहेजें"
  };
  return dict[key] || key;
}

// ─── Skeletons ────────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-2.5 flex flex-col gap-3 animate-pulse">
      <div className="bg-slate-200 aspect-square rounded-xl w-full" />
      <div className="h-4 bg-slate-200 rounded w-2/3" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="flex justify-between items-center mt-1">
        <div className="h-5 bg-slate-200 rounded w-1/4" />
        <div className="h-7 bg-slate-200 rounded-xl w-1/3" />
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 animate-pulse">
      <div className="w-11 h-11 bg-slate-200 rounded-xl flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-200 rounded w-1/3" />
      </div>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1.5 w-1/3">
          <div className="h-4 bg-slate-200 rounded" />
          <div className="h-3 bg-slate-200 rounded w-3/4" />
        </div>
        <div className="h-6 bg-slate-200 rounded-full w-20" />
      </div>
      <div className="h-px bg-slate-100 my-1" />
      <div className="flex gap-4">
        <div className="h-4 bg-slate-200 rounded w-16" />
        <div className="h-4 bg-slate-200 rounded w-20" />
      </div>
      <div className="flex gap-2 mt-1">
        <div className="h-8 bg-slate-200 rounded-xl flex-1" />
        <div className="h-8 bg-slate-200 rounded-xl flex-1" />
      </div>
    </div>
  );
}

// ─── Micro Components ─────────────────────────────────────────────────────────
function Pill({ children, variant = "amber" }: { children: React.ReactNode; variant?: string }) {
  const v: Record<string, string> = {
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red: "bg-rose-50 text-rose-700 border border-rose-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    gray: "bg-slate-50 text-slate-600 border border-slate-200",
    gold: "bg-yellow-50 text-amber-800 border border-yellow-300 font-bold",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-inter", v[variant] || v.amber)}>
      {children}
    </span>
  );
}

function Stepper({ qty, onInc, onDec }: { qty: number; onInc: () => void; onDec: () => void }) {
  return (
    <div className="flex items-center border border-primary rounded-xl overflow-hidden bg-white shadow-sm">
      <button onClick={onDec} className="w-8 h-8 flex items-center justify-center text-primary hover:bg-emerald-50 active:scale-90 transition-transform">
        <Minus size={12} strokeWidth={3} />
      </button>
      <span className="w-5 text-center text-xs font-bold text-slate-800 font-poppins">{qty}</span>
      <button onClick={onInc} className="w-8 h-8 flex items-center justify-center text-primary hover:bg-emerald-50 active:scale-90 transition-transform">
        <Plus size={12} strokeWidth={3} />
      </button>
    </div>
  );
}

function TopBar({
  onDrawer, onCart, cartCount, lang, text, searchQuery, setSearchQuery, onSearchSubmit
}: {
  onDrawer: () => void; onCart: () => void; cartCount: number; lang: string; text: any;
  searchQuery: string; setSearchQuery: (q: string) => void; onSearchSubmit: () => void;
}) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 pt-3 pb-3 shadow-sm">
      <div className="flex items-center justify-between mb-2 gap-1">
        <button onClick={onDrawer} className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-700 mr-0.5 flex-shrink-0 transition-colors">
          <Menu size={20} />
        </button>
        <button onClick={() => { }} className="flex-1 flex flex-col text-left min-w-0">
          <div className="flex items-center gap-1">
            <MapPin size={13} className="text-rose-500 fill-rose-50" />
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider font-inter">{translate("Deliver to", lang)}</span>
            <ChevronDown size={11} className="text-slate-500" />
          </div>
          <span className="text-slate-800 text-sm font-bold font-poppins mt-0.5 leading-tight truncate">{translate("Sector 70, Noida", lang)}</span>
        </button>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-1.5 rounded-full hover:bg-slate-50 relative text-slate-700">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <button onClick={onCart} className="p-1.5 rounded-full hover:bg-slate-50 relative text-slate-700">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white font-inter">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="relative mt-2">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit();
            }
          }}
          placeholder={translate("Search products, brands, categories...", lang)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-primary focus:bg-white transition-all font-inter"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

function SubHeader({ title, subtitle, onBack, onCart, cartCount }: {
  title: string; subtitle?: string; onBack: () => void; onCart?: () => void; cartCount?: number;
}) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-700 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-slate-800 font-bold text-sm font-poppins">{title}</h1>
          {subtitle && <p className="text-slate-400 text-[10px] font-semibold mt-0.5 font-inter uppercase tracking-wide">{subtitle}</p>}
        </div>
      </div>
      {onCart && (
        <button onClick={onCart} className="relative p-2 hover:bg-slate-50 rounded-xl text-slate-700 transition-colors">
          <ShoppingCart size={20} />
          {cartCount !== undefined && cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white font-inter">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

function BottomNav({ active, onChange, cartCount, lang }: { active: Screen; onChange: (s: Screen) => void; cartCount: number; lang: string }) {
  const tabs = [
    { id: "home" as Screen, icon: Home, label: translate("Home", lang) },
    { id: "categories" as Screen, icon: Grid3X3, label: translate("Categories", lang) },
    { id: "cart" as Screen, icon: ShoppingCart, label: translate("Cart", lang), badge: cartCount },
    { id: "offers" as Screen, icon: Tag, label: translate("Offers", lang) },
    { id: "orders" as Screen, icon: Package, label: translate("Orders", lang) },
  ];
  return (
    <div className="bg-white border-t border-slate-100 flex py-1.5 shadow-lg z-30">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const on = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex-1 flex flex-col items-center gap-1 py-1 transition-colors relative"
          >
            <div className={cn("p-1 rounded-xl transition-colors relative", on ? "text-primary bg-emerald-50/50" : "text-slate-400 hover:text-slate-600")}>
              <Icon size={20} strokeWidth={on ? 2.5 : 1.8} />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white font-inter animate-bounce">
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              )}
            </div>
            <span className={cn("text-[9px] font-inter uppercase tracking-wide", on ? "font-bold text-primary" : "font-semibold text-slate-400")}>{tab.label}</span>
            {on && <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}

function FloatingCartCTA({ count, total, onView, lang }: { count: number; total: number; onView: () => void; lang: string }) {
  if (count === 0) return null;
  return (
    <div className="absolute bottom-[66px] left-4 right-4 z-40">
      <button
        onClick={onView}
        className="w-full bg-primary text-white rounded-2xl p-3.5 flex items-center justify-between shadow-xl active:scale-[0.98] transition-transform hover:bg-primary-hover"
      >
        <div className="flex items-center gap-2.5">
          <div className="bg-white/20 rounded-xl p-1.5"><ShoppingCart size={14} className="text-white" /></div>
          <span className="font-bold text-xs font-poppins uppercase tracking-wider">{count} {count > 1 ? translate("items added", lang) : translate("item added", lang)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-100 font-inter">{translate("View Cart", lang)}</span>
          <span className="font-bold text-sm font-poppins border-l border-white/20 pl-2.5">₹{total}</span>
          <ChevronRight size={16} />
        </div>
      </button>
    </div>
  );
}

function ProductCard({ p, onAdd, onInc, onDec, lang }: {
  p: typeof PRODUCTS[0]; onAdd: () => void; onInc: () => void; onDec: () => void; lang: string;
}) {
  const fallback = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&auto=format";
  const savingsPercent = Math.round((p.discount / p.mrp) * 100);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all group">
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => { (e.target as HTMLImageElement).src = fallback; }} />

        {p.discount > 0 && (
          <div className="absolute top-2 left-0 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-r-lg shadow-sm font-inter">
            {savingsPercent}% {lang === "Hindi" ? "छूट" : "OFF"}
          </div>
        )}

        {p.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center">
            <span className="text-white font-bold text-xs uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded-full shadow-md font-poppins">{translate("Out of Stock", lang)}</span>
          </div>
        )}

        {p.stock > 0 && (
          p.inCart === 0 ? (
            <button onClick={onAdd}
              className="absolute bottom-2 right-2 bg-white hover:bg-emerald-50 text-primary border border-emerald-100 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md active:scale-95 transition-transform font-inter"
            >
              + {translate("Add", lang)}
            </button>
          ) : (
            <div className="absolute bottom-2 right-2 shadow-md">
              <Stepper qty={p.inCart} onInc={onInc} onDec={onDec} />
            </div>
          )
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 justify-between gap-1 bg-white">
        <div>
          <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase font-inter">{p.pack} · {p.weight}</p>
          <p className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 font-poppins mt-0.5" title={p.name}>{p.name}</p>
        </div>
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[13px] font-black text-emerald-700 font-poppins">₹{p.price}</span>
            <span className="text-[10px] text-slate-400 line-through font-inter">MRP ₹{p.mrp}</span>
          </div>
          {p.discount > 0 && (
            <span className="text-[9px] font-black text-rose-500 font-inter bg-rose-50 px-1 rounded">Save ₹{p.discount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PRIVACY POLICY MODAL ──────────────────────────────────────────────────
function PrivacyPolicyModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: string }) {
  if (!open) return null;
  const t = LOCALIZATIONS[lang] || LOCALIZATIONS.English;
  const isHindi = lang === "Hindi";

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80%]">
        <div className="bg-primary px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <h2 className="font-bold font-poppins text-sm uppercase tracking-wide">{t.privacy}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-700 rounded-lg transition-colors"><X size={18} /></button>
        </div>
        <div className="p-5 overflow-y-auto font-inter text-xs text-slate-600 leading-relaxed flex flex-col gap-4">
          {isHindi ? (
            <>
              <p className="font-bold text-slate-800">O2R रिटेलर गोपनीयता नीति में आपका स्वागत है।</p>
              <p>हम आपके डेटा को सुरक्षित रखने के लिए प्रतिबद्ध हैं। हम केवल वही व्यावसायिक डेटा एकत्र करते हैं जो आपके ऑर्डर को संसाधित करने और आपके व्यवसाय अनुभव को बेहतर बनाने के लिए आवश्यक है।</p>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-2">
                <p className="font-bold text-slate-700">1. हम क्या जानकारी एकत्र करते हैं:</p>
                <ul className="list-disc list-inside flex flex-col gap-1 text-[11px]">
                  <li>दुकान का नाम और संपर्क विवरण</li>
                  <li>सत्यापन के लिए ओटीपी और मोबाइल नंबर</li>
                  <li>जीएसटी नंबर और वितरण पता</li>
                </ul>
              </div>
              <p className="font-bold text-slate-700">2. डेटा सुरक्षा:</p>
              <p>आपका व्यक्तिगत व्यावसायिक विवरण एन्क्रिप्टेड सर्वर पर संग्रहीत किया जाता है और कभी भी बिना अनुमति के किसी तीसरे पक्ष के साथ साझा नहीं किया जाता है।</p>
            </>
          ) : (
            <>
              <p className="font-bold text-slate-800">Welcome to the O2R Retailer Privacy Policy.</p>
              <p>We are fully committed to protecting your business parameters. We only collect details essential to process orders and improve your B2B logistics.</p>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-2">
                <p className="font-bold text-slate-700">1. Information We Collect:</p>
                <ul className="list-disc list-inside flex flex-col gap-1 text-[11px]">
                  <li>Shop credentials & contact details</li>
                  <li>Verification phone & OTP checks</li>
                  <li>GST details & shipping coordinates</li>
                </ul>
              </div>
              <p className="font-bold text-slate-700">2. Data Security:</p>
              <p>Your details are stored securely. We enforce industry-grade encryption models and do not trade your data to third parties.</p>
            </>
          )}
        </div>
        <div className="border-t border-slate-100 px-5 py-3 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="bg-primary hover:bg-primary-hover text-white px-5 py-1.5 rounded-xl font-bold font-poppins text-xs shadow-md">
            {isHindi ? "ठीक है" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: LOGIN ────────────────────────────────────────────────────────────
function LoginScreen({ onContinue, lang, setLang, onSignUp }: {
  onContinue: (phone: string) => void;
  lang: string; setLang: (l: string) => void; onSignUp: () => void;
}) {
  const [phone, setPhone] = useState("");
  const isHindi = lang === "Hindi";
  const isValid = phone.length === 10;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Language toggle */}
      <div className="absolute top-5 right-5 z-20 flex bg-slate-100 p-0.5 rounded-xl">
        <button onClick={() => setLang("English")} className={cn("px-2.5 py-1 rounded-lg text-[10px] font-black font-inter transition-all", lang === "English" ? "bg-white text-primary shadow-sm" : "text-slate-500")}>EN</button>
        <button onClick={() => setLang("Hindi")} className={cn("px-2.5 py-1 rounded-lg text-[10px] font-black font-inter transition-all", lang === "Hindi" ? "bg-white text-primary shadow-sm" : "text-slate-500")}>हि</button>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-16 pb-6 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Logo */}
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg shadow-emerald-700/10">
          <span className="text-base font-black text-white font-poppins">O2R</span>
        </div>

        <h1 className="text-[28px] font-black text-slate-900 leading-tight tracking-tight font-poppins">
          {isHindi ? "अपने फोन नंबर से जारी रखें" : "Continue with your phone number"}
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-inter font-medium leading-relaxed">
          {isHindi ? "लॉगिन करने के लिए अपना मोबाइल नंबर दर्ज करें" : "Enter your mobile number to log into this app"}
        </p>

        {/* Phone input — floating label */}
        <div className="mt-9 relative">
          <span className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-slate-400 tracking-wide font-inter z-10">
            {isHindi ? "फोन नंबर" : "Phone Number"}
          </span>
          <div className="flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-primary transition-colors bg-white">
            <div className="px-4 py-4 flex items-center gap-2 border-r border-slate-200 bg-slate-50 flex-shrink-0">
              <span className="text-base">🇮🇳</span>
              <span className="text-sm font-bold text-slate-700 font-inter">+91</span>
            </div>
            <input
              type="tel" maxLength={10}
              placeholder={isHindi ? "मोबाइल नंबर" : "Enter Phone Number"}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 px-4 py-4 text-sm font-inter text-slate-800 outline-none bg-white placeholder-slate-300"
            />
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => { if (isValid) onContinue(phone); }}
          className={cn(
            "mt-6 w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wider font-poppins transition-all",
            isValid
              ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-emerald-700/20 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          {isHindi ? "जारी रखें" : "Continue"}
        </button>

        {/* Terms */}
        <p className="mt-5 text-center text-[11px] text-slate-400 font-inter leading-relaxed px-2">
          {isHindi ? "जारी रखने पर आप हमारी " : "By clicking continue you agree to our "}
          <button className="text-primary font-bold underline underline-offset-2">
            {isHindi ? "नियम और शर्तें" : "Terms and conditions"}
          </button>
        </p>
      </div>

      {/* Sign Up footer */}
      <div className="px-6 pb-8 text-center flex-shrink-0">
        <div className="h-px bg-slate-100 mb-5" />
        <p className="text-sm text-slate-400 font-inter">
          {isHindi ? "खाता नहीं है? " : "Don't have an account? "}
          <button onClick={onSignUp} className="text-slate-800 font-black underline underline-offset-2 font-inter">
            {isHindi ? "साइन अप करें" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── SCREEN: OTP ──────────────────────────────────────────────────────────────
function OtpScreen({ phone, onVerify, onBack, lang }: {
  phone: string; onVerify: () => void; onBack: () => void; lang: string;
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const isHindi = lang === "Hindi";
  const filled = otp.every((d) => d !== "");

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 pt-5 flex-shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl text-slate-700 transition-colors">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-4 pb-8 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
          <Phone size={24} className="text-primary" />
        </div>

        <h1 className="text-[26px] font-black text-slate-900 leading-tight tracking-tight font-poppins">
          {isHindi ? "ओटीपी दर्ज करें" : "Enter OTP"}
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-inter font-medium leading-relaxed">
          {isHindi ? `+91 ${phone} पर 4-अंकीय कोड भेजा गया` : `We've sent a 4-digit code to +91 ${phone}`}
        </p>

        {/* OTP boxes */}
        <div className="flex gap-3 mt-9 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              ref={(el: HTMLInputElement | null) => { refs.current[i] = el; }}
              type="text" inputMode="numeric" maxLength={1} value={otp[i]}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d?$/.test(v)) {
                  const n = [...otp]; n[i] = v; setOtp(n);
                  if (v && i < 3) refs.current[i + 1]?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
              }}
              className={cn(
                "w-16 h-16 border-2 rounded-2xl text-center text-2xl font-black outline-none transition-all font-poppins",
                otp[i] ? "border-primary bg-emerald-50/60 text-primary" : "border-slate-200 bg-slate-50 text-slate-800 focus:border-primary focus:bg-white"
              )}
            />
          ))}
        </div>

        {/* Resend */}
        <div className="mt-5 text-center">
          {timer > 0 ? (
            <p className="text-sm text-slate-400 font-inter">
              {isHindi ? `${timer}s में पुनः भेजें` : "Resend code in "}<span className="font-bold text-slate-600">{!isHindi && `${timer}s`}</span>
            </p>
          ) : (
            <button onClick={() => setTimer(30)} className="text-sm text-primary font-bold font-inter underline underline-offset-2">
              {isHindi ? "ओटीपी पुनः भेजें" : "Resend OTP"}
            </button>
          )}
        </div>

        {/* Verify */}
        <button
          onClick={() => { if (filled) onVerify(); }}
          className={cn(
            "mt-8 w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wider font-poppins transition-all",
            filled
              ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-emerald-700/20 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          {isHindi ? "सत्यापित करें" : "Verify OTP"}
        </button>

        <p className="mt-4 text-center text-[11px] text-slate-400 font-inter">
          {isHindi ? "गलत नंबर? " : "Wrong number? "}
          <button onClick={onBack} className="text-primary font-bold underline underline-offset-2">
            {isHindi ? "वापस जाएं" : "Go back"}
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── SCREEN: HOME ─────────────────────────────────────────────────────────────
function HomeScreen({
  products, navigate, cartCount, onAdd, onInc, onDec, lang, text, setBrandFilter,
  searchQuery, setSearchQuery, onSearchSubmit, setCategoryFilter
}: {
  products: typeof PRODUCTS; navigate: (s: Screen) => void; cartCount: number;
  onAdd: (id: number) => void; onInc: (id: number) => void; onDec: (id: number) => void;
  lang: string; text: any; setBrandFilter: (b: string) => void;
  searchQuery: string; setSearchQuery: (q: string) => void; onSearchSubmit: () => void;
  setCategoryFilter: (c: string) => void;
}) {
  const total = products.reduce((s, p) => s + p.price * p.inCart, 0);
  const savings = products.reduce((s, p) => s + p.discount * p.inCart, 0);

  // Check if Fun Flips product is unavailable
  const funFlipsProduct = products.find(p => p.brand === "Fun Flips") || { stock: 0 };
  const funFlipsAvailable = funFlipsProduct.stock > 0;

  // LuvIt Advertisement state (could mock unavailable)
  const luvItProduct = products.find(p => p.brand === "LuvIt");
  const luvItAvailable = luvItProduct && luvItProduct.stock > 0;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <TopBar
        onDrawer={() => navigate("drawer")}
        onCart={() => navigate("cart")}
        cartCount={cartCount}
        lang={lang}
        text={text}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={onSearchSubmit}
      />
      <div className="flex-1 overflow-y-auto pb-32" style={{ scrollbarWidth: "none" }}>

        {/* Savings & Welcome Header */}
        <div className="px-4 pt-3 flex gap-3">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl p-4 flex-1 shadow-lg text-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 text-7xl select-none">💰</div>
            <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest font-inter">{translate("Retailer Dashboard", lang)}</p>
            <h3 className="text-lg font-black font-poppins mt-0.5">{translate("Welcome, Rishit!", lang)}</h3>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
              <div>
                <p className="text-[9px] text-emerald-200 font-semibold font-inter">{translate("SAVED THIS MONTH", lang)}</p>
                <p className="text-sm font-black font-poppins">₹2,450</p>
              </div>
              <div className="bg-white/15 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                <span className="text-[9px] font-bold font-inter">{lang === "Hindi" ? "3 सक्रिय योजनाएं" : "3 Active Schemes"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advertisement 1: Fun Flips */}
        <div className="px-4 mt-3">
          <div className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white p-4 flex items-center justify-between shadow-sm min-h-[110px]">
            <div className="z-10 max-w-[65%] flex flex-col justify-between h-full">
              <div>
                <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-inter">{translate("Fun Flips Deal", lang)}</span>
                <h3 className="text-slate-800 text-sm font-black mt-1 font-poppins leading-tight">{translate("Buy 3 Fun Flips Salty, Get 1 Free!", lang)}</h3>
              </div>
              <p className="text-slate-400 text-[10px] mt-1 font-inter">{translate("Add crunchy snack bundles to your retail store.", lang)}</p>
            </div>
            <div className="text-4xl">🍿</div>

            {/* Out of Stock State Overlay */}
            {!funFlipsAvailable && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] flex flex-col justify-center items-center p-3 text-center transition-all z-20">
                <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest font-poppins shadow-md">🚫 {translate("Out of Stock", lang)}</span>
                <h4 className="text-white text-xs font-bold mt-1 font-poppins">{translate("Fun Flips is temporarily unavailable", lang)}</h4>
                <p className="text-slate-300 text-[9px] font-inter max-w-[200px] mt-0.5">{translate("We will maintain layout and restock in 2 days.", lang)}</p>
                <button onClick={() => alert(lang === "Hindi" ? "स्टॉक होने पर हम आपको एसएमएस द्वारा सूचित करेंगे!" : "We will notify you via SMS when restocked!")} className="mt-2 bg-white/20 hover:bg-white/30 text-white border border-white/10 px-3 py-1 rounded-lg text-[9px] font-bold transition-all">
                  {translate("Notify Me", lang)}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-3 grid grid-cols-4 gap-2.5">
          {([
            { icon: Package, label: translate("Orders", lang), screen: "orders", color: "bg-emerald-50 text-primary border-emerald-100" },
            { icon: Truck, label: translate("Deliveries", lang), screen: "deliveries", color: "bg-blue-50 text-blue-700 border-blue-100" },
            { icon: FileText, label: translate("Invoices", lang), screen: "invoices", color: "bg-rose-50 text-rose-700 border-rose-100" },
            { icon: Tag, label: translate("Offers", lang), screen: "offers", color: "bg-amber-50 text-amber-700 border-amber-100" },
          ] as const).map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} onClick={() => navigate(a.screen)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-95 transition-transform text-center"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", a.color)}>
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-bold text-slate-700 font-inter">{a.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scheme Progress Card */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full -mr-8 -mt-8" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-700">
                <Award size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="bg-amber-50 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-inter">{translate("Scheme Progress", lang)}</span>
                <p className="text-xs font-bold text-slate-800 mt-1 font-poppins">{lang === "Hindi" ? "₹376 का मुफ्त उपहार अनलॉक करने के लिए 7 और ऑर्डर" : "7 more orders to unlock ₹376 Free Gift"}</p>

                {/* Thick Progress bar with Milestones */}
                <div className="mt-2.5 relative">
                  <div className="bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all" style={{ width: "72%" }} />
                  </div>
                  {/* Milestone dots */}
                  <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-700/30 my-auto" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-700/30 my-auto" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white my-auto border border-amber-500" />
                  </div>
                </div>

                <div className="flex justify-between mt-1.5 text-[9px] font-bold font-inter text-slate-400">
                  <span>{lang === "Hindi" ? "18 ऑर्डर (₹36,000)" : "18 Orders (₹36,000)"}</span>
                  <span className="text-amber-600">{translate("Goal: 25 Orders", lang)}</span>
                </div>
              </div>
              <button onClick={() => navigate("offers")} className="p-1.5 hover:bg-slate-50 rounded-xl text-primary"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        {/* Advertisement 2: LuvIt */}
        <div className="px-4 mt-3">
          {luvItAvailable ? (
            <button
              onClick={() => {
                setCategoryFilter("All");
                setBrandFilter("LuvIt");
                navigate("products");
              }}
              className="w-full text-left rounded-3xl overflow-hidden border border-slate-100 bg-white p-4 flex items-center justify-between shadow-sm relative hover:border-slate-200 transition-all"
            >
              <div className="max-w-[70%] z-10">
                <span className="bg-emerald-50 text-primary border border-emerald-100 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-inter">{translate("Featured Partner", lang)}</span>
                <h3 className="text-slate-800 text-sm font-black mt-1 font-poppins leading-tight">{translate("LuvIt Chocolate Fest! 🍫", lang)}</h3>
                <p className="text-slate-400 text-[10px] mt-0.5 font-inter">{translate("Up to 30% discount on LuvIt Cocoa Spreads. Tap to order.", lang)}</p>
              </div>
              <div className="text-4xl z-10">🍫</div>
              <div className="absolute right-3 top-3"><ChevronRight size={16} className="text-slate-400" /></div>
            </button>
          ) : (
            // Fallback State
            <button
              onClick={() => {
                setCategoryFilter("All");
                setBrandFilter("All Brands");
                navigate("products");
              }}
              className="w-full text-left rounded-3xl overflow-hidden border border-amber-200 bg-amber-50/50 p-4 flex items-center justify-between shadow-sm relative transition-all"
            >
              <div className="max-w-[70%]">
                <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-inter flex items-center gap-1 w-max">
                  <Info size={10} /> {translate("Fallback Active", lang)}
                </span>
                <h3 className="text-slate-800 text-sm font-black mt-1 font-poppins leading-tight">{translate("Mega Chocolate Festival", lang)}</h3>
                <p className="text-slate-500 text-[10px] mt-0.5 font-inter">{translate("LuvIt is restocking. Explore Cadbury Dairy Milk deals instead!", lang)}</p>
              </div>
              <div className="text-4xl">🎁</div>
              <div className="absolute right-3 top-3"><ChevronRight size={16} className="text-amber-500" /></div>
            </button>
          )}
        </div>

        {/* Category Scrollable Pills */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider font-poppins">{translate("Shop by Category", lang)}</h2>
            <button onClick={() => navigate("categories")} className="text-primary text-xs font-black font-inter">{lang === "Hindi" ? "सभी देखें" : "See all"}</button>
          </div>
          <div className="flex gap-2.5 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.slice(0, 7).map((c) => (
              <button key={c.id} onClick={() => {
                setCategoryFilter(c.name);
                setBrandFilter("All Brands");
                navigate("products");
              }} className="flex flex-col items-center gap-1.5 flex-shrink-0 group">
                <div className="w-13 h-13 rounded-2xl flex items-center justify-center text-xl border border-slate-100 group-hover:scale-105 transition-transform" style={{ background: c.color }}>
                  {c.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-600 w-16 text-center leading-tight font-inter">{translate(c.name, lang)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending grid */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={16} className="text-primary" />
              <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider font-poppins">{translate("Trending Now", lang)}</h2>
            </div>
            <button onClick={() => {
              setCategoryFilter("All");
              setBrandFilter("All Brands");
              navigate("products");
            }} className="text-primary text-xs font-black font-inter">{lang === "Hindi" ? "सभी देखें" : "View all"}</button>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} p={p}
                onAdd={() => onAdd(p.id)} onInc={() => onInc(p.id)} onDec={() => onDec(p.id)} lang={lang} />
            ))}
          </div>
        </div>

        {/* Best Sellers grid */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 px-4 mb-2">
            <Star size={16} className="text-primary" />
            <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider font-poppins">{translate("Best Sellers", lang)}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {products.slice(4, 8).map((p) => (
              <ProductCard key={p.id} p={p}
                onAdd={() => onAdd(p.id)} onInc={() => onInc(p.id)} onDec={() => onDec(p.id)} lang={lang} />
            ))}
          </div>
        </div>
      </div>
      <FloatingCartCTA count={cartCount} total={total} onView={() => navigate("cart")} lang={lang} />
    </div>
  );
}

// ─── SCREEN: PRODUCTS ─────────────────────────────────────────────────────────
function ProductsScreen({
  products, onBack, navigate, cartCount, onAdd, onInc, onDec, brand, setBrand,
  category, setCategory, searchQuery, setSearchQuery, lang
}: {
  products: typeof PRODUCTS; onBack: () => void; navigate: (s: Screen) => void; cartCount: number;
  onAdd: (id: number) => void; onInc: (id: number) => void; onDec: (id: number) => void;
  brand: string; setBrand: (b: string) => void;
  category: string; setCategory: (c: string) => void;
  searchQuery: string; setSearchQuery: (q: string) => void;
  lang: string;
}) {
  const brands = ["All Brands", "Britannia", "Cadbury", "Coca Cola", "Dettol", "DS Group", "Excyt", "LuvIt", "Fun Flips"];

  // Sorting state
  const [sortBy, setSortBy] = useState<"none" | "lowHigh" | "highLow" | "discount">("none");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter products by brand, category and search query
  const filtered = products.filter((p) => {
    const matchesBrand = brand === "All Brands" || p.brand === brand;
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesSearch;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "lowHigh") return a.price - b.price;
    if (sortBy === "highLow") return b.price - a.price;
    if (sortBy === "discount") return b.discount - a.discount;
    return 0;
  });

  const total = products.reduce((s, p) => s + p.price * p.inCart, 0);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-700"><ArrowLeft size={20} /></button>
            <div>
              <h1 className="text-slate-800 font-bold text-sm font-poppins">
                {category === "All" ? translate("All Products", lang) : translate(category, lang)}
              </h1>
              <p className="text-slate-400 text-[10px] font-semibold mt-0.5 font-inter uppercase tracking-wider">
                {filtered.length} {translate("items", lang)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("cart")} className="relative p-2 hover:bg-slate-50 rounded-xl text-slate-700">
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white font-inter">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search Input on Products View */}
        <div className="relative mx-4 mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translate("Search products, brands, categories...", lang)}
            className="w-full bg-slate-50 border border-slate-200 text-xs pl-9 pr-8 py-2 rounded-xl outline-none focus:border-primary focus:bg-white transition-all font-inter"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Brand Scrollable Pills */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {brands.map((b) => {
            const active = b === brand;
            return (
              <button key={b} onClick={() => setBrand(b)}
                className={cn(
                  "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border font-inter shadow-sm",
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                )}
              >
                {translate(b, lang)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-36" style={{ scrollbarWidth: "none" }}>
        {/* Promotional Banner */}
        <div className="mx-4 mt-4 rounded-3xl overflow-hidden h-28 relative bg-slate-800 shadow-sm border border-slate-100">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&h=200&fit=crop&auto=format"
            alt="promo" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center p-4 bg-gradient-to-r from-black/60 to-transparent">
            <div>
              <span className="bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-inter">{translate("Redesign Benefit", lang)}</span>
              <h3 className="text-white font-bold text-base font-poppins mt-1">{translate("Direct Wholesale Rates", lang)}</h3>
              <p className="text-emerald-200 text-xs mt-0.5 font-inter font-semibold">{translate("Instant discount schemes applied to checkout", lang)}</p>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between px-4 mt-4 mb-3 relative">
          <p className="text-xs font-bold text-slate-400 font-inter uppercase tracking-wide">
            {sorted.length} {lang === "Hindi" ? "नतीजे मिले" : "results found"}
          </p>

          <div className="relative">
            <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center gap-1.5 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl px-3 py-2 bg-white hover:border-slate-300 shadow-sm font-inter">
              <Filter size={12} className="text-primary" /> {translate("Sort & Filter", lang)}
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 flex flex-col gap-1">
                {[
                  { id: "none" as const, l: translate("Default Sort", lang) },
                  { id: "lowHigh" as const, l: translate("Price: Low to High", lang) },
                  { id: "highLow" as const, l: translate("Price: High to Low", lang) },
                  { id: "discount" as const, l: translate("Savings: High to Low", lang) }
                ].map((opt) => (
                  <button key={opt.id} onClick={() => { setSortBy(opt.id); setShowSortDropdown(false); }}
                    className={cn("text-left text-[11px] font-semibold font-inter px-3 py-2 rounded-xl transition-colors", sortBy === opt.id ? "bg-emerald-50 text-primary" : "text-slate-600 hover:bg-slate-50")}>
                    {opt.l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {sorted.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center py-12 text-slate-400">
              <span className="text-3xl">🔍</span>
              <p className="text-xs font-bold text-slate-800 font-poppins mt-2">{translate("No products found", lang)}</p>
              <button onClick={() => { setSearchQuery(""); setBrand("All Brands"); setCategory("All"); }} className="mt-3 bg-primary text-white text-[10px] font-bold px-3.5 py-1.5 rounded-xl shadow-md">
                Reset Filters
              </button>
            </div>
          ) : (
            sorted.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={() => onAdd(p.id)} onInc={() => onInc(p.id)} onDec={() => onDec(p.id)} lang={lang} />
            ))
          )}
        </div>
      </div>
      <FloatingCartCTA count={cartCount} total={total} onView={() => navigate("cart")} lang={lang} />
    </div>
  );
}

// ─── SCREEN: CATEGORIES ───────────────────────────────────────────────────────
function CategoriesScreen({
  onBack, navigate, setCategoryFilter, setBrandFilter, lang
}: {
  onBack: () => void; navigate: (s: Screen) => void;
  setCategoryFilter: (c: string) => void; setBrandFilter: (b: string) => void;
  lang: string;
}) {
  const [search, setSearch] = useState("");
  const filtered = CATEGORIES.filter(c => translate(c.name, lang).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={translate("All Categories", lang)} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8" style={{ scrollbarWidth: "none" }}>
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={translate("Search categories…", lang)}
            className="w-full bg-white border border-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-primary transition-all font-inter"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((c) => (
            <button key={c.id} onClick={() => {
              setCategoryFilter(c.name);
              setBrandFilter("All Brands");
              navigate("products");
            }}
              className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm p-4 flex flex-col items-center justify-center text-center gap-2.5 active:scale-[0.98] transition-transform"
            >
              <div className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: c.color }}>
                {c.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight font-poppins truncate max-w-[130px]">{translate(c.name, lang)}</p>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5 font-inter">{c.count} {translate("items", lang)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: CART ─────────────────────────────────────────────────────────────
function CartScreen({
  products, onBack, navigate, onPlaceOrder, lang, text, onInc, onDec, couponDiscount, appliedCouponCode
}: {
  products: typeof PRODUCTS; onBack: () => void; navigate: (s: Screen) => void; onPlaceOrder: () => void;
  lang: string; text: any; onInc: (id: number) => void; onDec: (id: number) => void;
  couponDiscount: number; appliedCouponCode: string;
}) {
  const items = products.filter((p) => p.inCart > 0);
  const sub = items.reduce((s, p) => s + p.mrp * p.inCart, 0);
  const saved = items.reduce((s, p) => s + p.discount * p.inCart, 0);
  const net = sub - saved;
  const delivery = net > 0 ? 40 : 0;

  // Subtract coupon discount from total
  const beforeCoupon = net + delivery;
  const grand = Math.max(0, beforeCoupon - couponDiscount);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={translate("Cart Details", lang)} subtitle={`${items.length} ${translate("Products", lang)}`} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ scrollbarWidth: "none" }}>

        {/* Deliver To Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 mb-3">
          <div className="flex items-start gap-3 justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mt-0.5 flex-shrink-0">
                <MapPin size={18} className="fill-rose-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-poppins">{translate("Deliver to", lang)}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-inter font-medium">
                  Sector 70 Noida, Noida-Greater Noida Expressway, Aniwas, 201310
                </p>
              </div>
            </div>
            <button onClick={() => navigate("address")}
              className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-primary px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all flex-shrink-0 font-inter"
            >
              {translate("Change", lang)}
            </button>
          </div>
        </div>

        {/* Savings Nudge */}
        {saved > 0 && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl px-4 py-3 flex items-center gap-3 mb-3 shadow-sm">
            <div className="text-lg">🎉</div>
            <p className="text-[11px] text-emerald-800 font-bold font-inter flex-1">
              {lang === "Hindi" ? "आप इस ऑर्डर पर" : "You are saving"} <span className="font-extrabold text-emerald-900 text-xs">₹{saved}</span> {lang === "Hindi" ? "बचा रहे हैं!" : "on this order!"}
            </p>
            <span className="bg-emerald-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full font-poppins">{translate("SAVED", lang)}</span>
          </div>
        )}

        {/* Offer nudge */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl px-4 py-3.5 flex items-center gap-3 mb-3 shadow-sm">
          <Tag size={15} className="text-amber-700" />
          <p className="text-xs text-amber-800 flex-1 font-inter font-medium">
            {lang === "Hindi" ? "अतिरिक्त छूट पाने के लिए और सामान जोड़ें" : "Add more items to get extra discounts"}
          </p>
          <ChevronRight size={15} className="text-amber-600" />
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <ShoppingCart size={32} />
            </div>
            <p className="text-sm font-bold text-slate-800 font-poppins">{translate("Your cart is empty", lang)}</p>
            <button onClick={() => navigate("products")} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors font-poppins uppercase tracking-wider">
              {translate("Browse Products", lang)}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-3.5 flex gap-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/56"; }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-snug font-poppins">{translate(item.name, lang)}</p>
                    <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{translate(item.pack, lang)} · {item.weight}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-black text-slate-800 font-poppins">₹{item.price * item.inCart}</span>
                      <span className="text-[10px] text-slate-400 line-through font-inter">₹{item.mrp * item.inCart}</span>
                      <span className="text-[9px] font-black text-rose-500 font-inter bg-rose-50 px-1 rounded">{translate("Save", lang)} ₹{item.discount * item.inCart}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Stepper qty={item.inCart} onInc={() => onInc(item.id)} onDec={() => onDec(item.id)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scheme Nudge */}
        {items.length > 0 && (
          <div className="bg-amber-50/50 rounded-3xl border border-yellow-200 p-4 mt-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 rounded-full -mr-6 -mt-6" />
            <div className="flex items-center gap-2 mb-2 text-amber-800">
              <Award size={16} />
              <p className="text-xs font-bold uppercase tracking-wider font-poppins">{translate("Active Scheme Benefit", lang)}</p>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-inter font-medium">
              {lang === "Hindi" ? "₹552 मूल्य के बल्क मुफ़्त उत्पादों को अनलॉक करने के लिए 25 और ऑर्डर (न्यूनतम ₹3,000 प्रत्येक) दें।" : "Place 25 more orders (min. ₹3,000 each) to unlock bulk free products worth ₹552."}
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {["Luvit Eclairs", "Chingles Filz"].map((n) => (
                <div key={n} className="flex items-center gap-1 bg-white border border-amber-200 rounded-full px-3 py-1 shadow-sm">
                  <span className="text-xs">🍬</span>
                  <span className="text-[10px] font-bold text-amber-800 font-inter">{translate(n, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bill Summary */}
        {items.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 mt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 font-poppins">{translate("Bill Details", lang)}</h3>
            {[
              { l: translate("Items total (MRP)", lang), v: `₹${sub}` },
              { l: translate("Wholesale Discount", lang), v: `-₹${saved}`, isSaved: true },
              { l: translate("Delivery charge", lang), v: delivery === 0 ? translate("FREE", lang) : `₹${delivery}`, isFree: delivery === 0 },
              couponDiscount > 0 ? { l: `${translate("Coupon Discount", lang)} (${appliedCouponCode})`, v: `-₹${couponDiscount}`, isSaved: true } : null,
              { l: translate("Handling charge", lang), v: translate("FREE", lang) },
            ].filter(Boolean).map((r: any) => (
              <div key={r.l} className="flex items-center justify-between mb-2.5 text-xs font-inter font-semibold">
                <span className="text-slate-400">{r.l}</span>
                <span className={cn(
                  r.isSaved ? "text-rose-500" : r.isFree ? "text-primary font-bold" : "text-slate-700"
                )}>
                  {r.v}
                </span>
              </div>
            ))}
            <div className="h-px bg-slate-100 my-2.5" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 font-poppins">{translate("Grand Total", lang)}</span>
              <span className="text-base font-black text-emerald-800 font-poppins">₹{grand}</span>
            </div>
          </div>
        )}
      </div>

      {/* Place Order Panel: Integrated naturally inside flex column without absolute positioning */}
      {items.length > 0 && (
        <div className="bg-white border-t border-slate-100 px-4 py-4 flex items-center justify-between shadow-xl z-40 pb-6">
          <div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-inter">{translate("Total Amount", lang)}</p>
            <p className="text-lg font-black text-slate-800 font-poppins">₹{grand}</p>
            <p className="text-[10px] font-black text-rose-500 font-inter">{translate("Saved", lang)} ₹{saved + couponDiscount}</p>
          </div>
          <button onClick={onPlaceOrder}
            className="bg-primary hover:bg-primary-hover text-white py-3.5 px-7 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-transform font-poppins"
          >
            {translate("Place Order", lang)} <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: OFFERS ───────────────────────────────────────────────────────────
function OffersScreen({
  onBack, onApplyCoupon, appliedCouponCode, lang
}: {
  onBack: () => void;
  onApplyCoupon?: (code: string, discount: number) => void;
  appliedCouponCode?: string;
  lang: string;
}) {
  const [tab, setTab] = useState("All");
  const tabs = [
    translate("All", lang),
    translate("Schemes", lang),
    translate("Coupons", lang),
    translate("Unlocked", lang)
  ];
  const filtered = OFFERS.filter((o) => {
    const isUnlocked = o.unlocked || o.progress >= o.target;
    if (tab === translate("Schemes", lang)) return o.type === "scheme";
    if (tab === translate("Coupons", lang)) return o.type === "coupon";
    if (tab === translate("Unlocked", lang)) return isUnlocked;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-700"><ArrowLeft size={20} /></button>
          <h1 className="text-slate-800 font-bold text-sm flex-1 font-poppins">{translate("Offers & Schemes", lang)}</h1>
          <Gift size={20} className="text-primary" />
        </div>
        <div className="flex gap-1.5 px-4 pb-3">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-1.5 rounded-full text-xs font-bold transition-all border font-inter",
                t === tab
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8" style={{ scrollbarWidth: "none" }}>
        {/* Stats Summary Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 mb-4 flex gap-4">
          {[
            { label: translate("Active Schemes", lang), value: "3", icon: "🎯" },
            { label: translate("Unlocked Coupons", lang), value: "2", icon: "🏷️" },
            { label: translate("Potential Rewards", lang), value: "₹1,028", icon: "💰" }
          ].map((s) => (
            <div key={s.label} className="flex-1 flex flex-col items-center gap-1 text-center">
              <span className="text-xl">{s.icon}</span>
              <span className="text-sm font-black text-slate-800 font-poppins">{s.value}</span>
              <span className="text-[9px] font-bold text-slate-400 leading-tight font-inter">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Offers list */}
        <div className="flex flex-col gap-3">
          {filtered.map((o) => {
            const pct = Math.min(100, Math.round((o.progress / o.target) * 100));
            const isCoupon = o.type === "coupon";
            const isApplied = appliedCouponCode === o.code;

            return isCoupon ? (
              // Redesigned Coupon Voucher (Issue 8: Ticket design)
              <div key={o.id} className="relative bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:border-slate-200 transition-all">
                {/* Visual Voucher Punch-outs */}
                <div className="absolute top-1/2 -left-2.5 w-5 h-5 rounded-full bg-slate-50 border border-slate-100 pointer-events-none -translate-y-1/2" />
                <div className="absolute top-1/2 -right-2.5 w-5 h-5 rounded-full bg-slate-50 border border-slate-100 pointer-events-none -translate-y-1/2" />

                <div className="p-4 border-b border-dashed border-slate-100 flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-50 border border-blue-100 text-blue-700 text-[8px] font-black px-1.5 py-0.5 rounded font-inter uppercase">Coupon</span>
                      {isApplied && <span className="bg-emerald-50 border border-emerald-100 text-primary text-[8px] font-black px-1.5 py-0.5 rounded font-inter uppercase">{translate("Coupon Applied", lang)}</span>}
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 mt-2 font-poppins">{translate(o.title, lang)}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{translate(o.desc, lang)}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-center flex flex-col gap-0.5">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-inter">Code</span>
                    <span className="text-[11px] font-black text-slate-800 font-mono">{o.code}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50/50 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-inter font-semibold">
                    <Gift size={13} className="text-amber-600" />
                    <span>{translate("Reward Benefit", lang)}: {translate(o.reward, lang)}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (onApplyCoupon) {
                        const val = o.discountValue ?? 0;
                        onApplyCoupon(o.code, val);
                      }
                    }}
                    className={cn(
                      "font-bold font-poppins text-[10px] px-3.5 py-1.5 rounded-xl shadow-md transition-all uppercase tracking-wider",
                      isApplied
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-primary hover:bg-primary-hover text-white"
                    )}
                  >
                    {isApplied ? translate("Applied", lang) : translate("Apply", lang)}
                  </button>
                </div>
              </div>
            ) : (
              // Redesigned Scheme Card (Issue 8 & 10: Circular progress & milestone metrics)
              <div key={o.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 hover:border-slate-200 transition-all flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded font-inter uppercase">{translate("Schemes", lang)}</span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">Code: {o.code}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 mt-2 font-poppins">{translate(o.title, lang)}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{translate(o.desc, lang)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl text-amber-700 flex-shrink-0">
                    🎁
                  </div>
                </div>

                {/* Styled milestone tracker */}
                <div>
                  <div className="relative">
                    <div className="bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200/50">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    {/* Tick markers */}
                    <div className="absolute inset-0 flex justify-between px-1.5 pointer-events-none">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 my-auto" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 my-auto" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 my-auto" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white my-auto border border-emerald-500" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] font-bold font-inter text-slate-400">
                    <span>{o.progress} / {o.target} {translate("Orders placed", lang)}</span>
                    <span className="text-primary">{o.target - o.progress} {translate("remaining", lang)}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <Award size={14} className="text-primary flex-shrink-0" />
                  <p className="text-[10px] text-emerald-800 font-semibold font-inter leading-relaxed">
                    {translate("Reward Benefit", lang)}: {translate(o.reward, lang)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: DRAWER ───────────────────────────────────────────────────────────
function DrawerScreen({ onClose, navigate, lang, setLang, onPrivacyOpen, ownerName, shopName }: {
  onClose: () => void; navigate: (s: Screen) => void; lang: string; setLang: (l: string) => void;
  onPrivacyOpen: () => void; ownerName: string; shopName: string;
}) {
  const isHindi = lang === "Hindi";
  const groups = [
    { title: isHindi ? "खाता विवरण" : "Account", items: [{ icon: User, label: isHindi ? "मेरा खाता" : "My Account", s: "account" as Screen }, { icon: MapPin, label: isHindi ? "पते प्रबंधित करें" : "Manage Address", s: "address" as Screen }] },
    { title: isHindi ? "दुकान" : "Shop", items: [{ icon: Award, label: isHindi ? "सभी ब्रांड" : "All Brands", s: "products" as Screen }, { icon: Grid3X3, label: isHindi ? "सभी श्रेणियां" : "Categories", s: "categories" as Screen }, { icon: Tag, label: isHindi ? "ऑफ़र और योजनाएं" : "Offers & Schemes", s: "offers" as Screen }] },
    { title: isHindi ? "ऑर्डर" : "Orders", items: [{ icon: Package, label: isHindi ? "मेरे ऑर्डर" : "My Orders", s: "orders" as Screen }, { icon: Truck, label: isHindi ? "वितरण ट्रैकिंग" : "Deliveries", s: "deliveries" as Screen }, { icon: FileText, label: isHindi ? "इनवॉइस रसीदें" : "Invoices", s: "invoices" as Screen }] },
    { title: isHindi ? "सहायता" : "Support", items: [{ icon: Phone, label: isHindi ? "कॉलिंग स्लॉट" : "Calling Slot", s: "calling-slot" as Screen }, { icon: HelpCircle, label: isHindi ? "सहायता केंद्र" : "Help & Support", s: "help" as Screen }, { icon: Globe, label: isHindi ? "भाषा बदलें" : "Language Settings", s: "language" as Screen }] },
  ];

  return (
    <div className="flex h-full z-[100] absolute inset-0">
      <div className="w-[300px] bg-white flex flex-col shadow-2xl relative overflow-hidden">

        {/* Profile Header — flex-shrink-0 so it never scrolls out of view */}
        <div className="bg-slate-900 px-5 pt-14 pb-5 text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mb-8" />
          <div className="flex items-center gap-3.5 mb-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center border-2 border-emerald-400 shadow-md">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm font-poppins">{ownerName}</h2>
              <p className="text-slate-300 text-xs font-inter font-medium mt-0.5">+91 80765 13921</p>
              <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest font-inter mt-1">{shopName} · Noida</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 relative z-10">
            {[{ l: "Orders", v: "48" }, { l: "Savings", v: "₹2.4k" }, { l: "Schemes", v: "3" }].map((s) => (
              <div key={s.l} className="bg-white/10 rounded-2xl p-2 text-center border border-white/5">
                <p className="text-xs font-bold font-poppins">{s.v}</p>
                <p className="text-slate-400 text-[9px] font-bold font-inter mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable menu area */}
        <div className="flex-1 overflow-y-auto flex flex-col" style={{ scrollbarWidth: "none" }}>

          {/* Language Quick-Toggle */}
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between flex-shrink-0">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wide font-inter">Quick Language</span>
            <div className="flex bg-slate-200 p-0.5 rounded-xl">
              <button onClick={() => setLang("English")} className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold font-inter transition-all", lang === "English" ? "bg-white text-primary shadow-sm" : "text-slate-500")}>
                EN
              </button>
              <button onClick={() => setLang("Hindi")} className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold font-inter transition-all", lang === "Hindi" ? "bg-white text-primary shadow-sm" : "text-slate-500")}>
                हिन्दी
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-3 py-4 flex flex-col gap-4">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-1.5 font-inter">{g.title}</p>
                {g.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} onClick={() => { onClose(); navigate(item.s); }}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 flex-1 font-inter">{item.label}</span>
                      <ChevronRight size={13} className="text-slate-300" />
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Privacy Policy */}
            <div className="border-t border-slate-100 pt-3">
              <button onClick={onPrivacyOpen} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 text-left">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 text-primary flex items-center justify-center flex-shrink-0">
                  <BookOpen size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700 flex-1 font-inter">{isHindi ? "गोपनीयता नीति पढ़ें" : "Read Privacy Policy"}</span>
                <ChevronRight size={13} className="text-slate-300" />
              </button>
            </div>
          </div>

          {/* Log Out */}
          <div className="px-3 pb-8 flex-shrink-0">
            <button className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-rose-500 w-full hover:bg-rose-50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center"><LogOut size={15} className="text-rose-400" /></div>
              <span className="text-xs font-bold font-poppins uppercase tracking-wider">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />
    </div>
  );
}

// ─── SCREEN: CALLING SLOT ─────────────────────────────────────────────────────
function CallingSlotScreen({ onBack, lang }: { onBack: () => void; lang: string }) {
  const [sel, setSel] = useState<string | null>(null);
  const groups: Record<string, string[]> = {
    "Morning": ["09:00 – 09:30 AM", "09:30 – 10:00 AM", "10:00 – 10:30 AM", "10:30 – 11:00 AM", "11:00 – 11:30 AM", "11:30 AM – 12:00 PM"],
    "Afternoon": ["12:00 – 12:30 PM", "12:30 – 01:00 PM", "01:00 – 01:30 PM", "01:30 – 02:00 PM", "02:00 – 02:30 PM", "02:30 – 03:00 PM"],
    "Evening": ["03:00 – 03:30 PM", "03:30 – 04:00 PM", "04:00 – 04:30 PM", "04:30 – 05:00 PM", "05:00 – 05:30 PM", "05:30 – 06:00 PM"],
  };
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={translate("Calling Slot", lang)} subtitle={translate("Schedule support callback", lang)} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ scrollbarWidth: "none" }}>
        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-4 mb-4 flex items-center gap-3 shadow-sm">
          <Phone size={18} className="text-primary" />
          <div>
            <p className="text-xs font-bold text-slate-800 font-poppins">{translate("Support Hotline Available", lang)}</p>
            <p className="text-[10px] text-slate-500 font-semibold font-inter mt-0.5">{lang === "Hindi" ? "सोम-शनि · सुबह 9:00 से शाम 6:00 बजे" : "Mon–Sat · 9:00 AM to 6:00 PM"}</p>
          </div>
        </div>
        {Object.entries(groups).map(([period, slots]) => (
          <div key={period} className="mb-4">
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <Clock size={13} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-inter">{translate(`${period} slots`, lang)}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button key={s} onClick={() => setSel(s)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs font-bold border transition-all shadow-sm font-inter",
                    sel === s
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border-t border-slate-100 px-4 py-4 z-40 pb-6">
        <button onClick={() => { if (sel) { alert(lang === "Hindi" ? `सफलतापूर्वक स्लॉट बुक किया गया: ${sel}` : `Successfully scheduled callback at: ${sel}`); onBack(); } }} className={cn(
          "w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg font-poppins",
          sel ? "bg-primary text-white hover:bg-primary-hover shadow-emerald-700/10" : "bg-slate-100 text-slate-400"
        )}>
          {sel ? `${translate("Confirm", lang)}: ${sel}` : translate("Select a Time Slot", lang)}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: SIGNUP ───────────────────────────────────────────────────────────
function SignupScreen({ onBack, lang, setLang, onPrivacyOpen }: {
  onBack: () => void; lang: string; setLang: (l: string) => void; onPrivacyOpen: () => void;
}) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // File Upload State (Issue 13: Guideline-driven document uploads)
  const [uploadFile, setUploadFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const t = LOCALIZATIONS[lang] || LOCALIZATIONS.English;
  const isHindi = lang === "Hindi";

  // Simulate document upload
  const handleSimulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadFile("gst_certificate_2026.pdf");
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="flex flex-col min-h-full bg-white relative">

      {/* English / Hindi Toggle on Signup Page (Issue 2: Language Accessibility) */}
      <div className="absolute top-4 right-4 flex bg-slate-100 p-0.5 rounded-xl z-20">
        <button onClick={() => setLang("English")} className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black font-inter transition-all", lang === "English" ? "bg-white text-primary shadow-sm" : "text-slate-500")}>
          EN
        </button>
        <button onClick={() => setLang("Hindi")} className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black font-inter transition-all", lang === "Hindi" ? "bg-white text-primary shadow-sm" : "text-slate-500")}>
          हिन्दी
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-14 pb-8 overflow-y-auto">
        <div className="w-13 h-13 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-lg shadow-emerald-700/10">
          <span className="text-lg font-black text-white font-poppins">O2R</span>
        </div>

        {step === 1 && (
          <>
            <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-tight font-poppins">{t.welcome}</h1>
            <p className="text-slate-400 text-xs mt-1.5 font-inter font-medium">{t.signinDesc}</p>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-tight font-poppins">{t.verifyTitle}</h1>
            <p className="text-slate-400 text-xs mt-1.5 font-inter font-medium">{t.sentTo} <span className="font-bold text-slate-700">{phone}</span></p>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-tight font-poppins">{t.businessTitle}</h1>
            <p className="text-slate-400 text-xs mt-1.5 font-inter font-medium">{t.businessDesc}</p>
          </>
        )}

        {/* Steps Visual Labels (Issue 1: Redesign step layout hierarchy) */}
        <div className="mt-5 mb-5 flex flex-col gap-2">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={cn("h-1.5 rounded-full flex-1 transition-colors", s <= step ? "bg-primary" : "bg-slate-100")} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-black uppercase tracking-wider text-slate-400 font-inter px-0.5">
            <span className={cn(step === 1 ? "text-primary font-black" : "")}>{isHindi ? "1. मोबाइल" : "1. Mobile"}</span>
            <span className={cn(step === 2 ? "text-primary font-black" : "")}>{isHindi ? "2. ओटीपी" : "2. Verify"}</span>
            <span className={cn(step === 3 ? "text-primary font-black" : "")}>{isHindi ? "3. दुकान" : "3. Shop Info"}</span>
          </div>
        </div>

        {/* Form contents */}
        {step === 1 && (
          <div className="flex flex-col gap-5 mt-2">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{t.mobileLabel}</label>
              <div className="flex gap-2.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3.5 flex items-center gap-1.5 text-xs text-slate-500 font-bold font-inter">
                  <span>🇮🇳</span><span>+91</span>
                </div>
                <input type="tel" placeholder={t.mobilePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-primary focus:bg-white transition-all font-inter text-slate-700" />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold mt-1.5 font-inter">A 4-digit verification code will be sent by SMS.</p>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-transform font-poppins">
              {t.sendOtp}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6 mt-2">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-4 block uppercase tracking-wide font-inter">{t.enterOtp}</label>
              <div className="flex gap-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <input key={i} ref={(el: HTMLInputElement | null) => { refs.current[i] = el; }} type="text" maxLength={1} value={otp[i]}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^\d?$/.test(v)) {
                        const n = [...otp]; n[i] = v; setOtp(n);
                        if (v && i < 3) refs.current[i + 1]?.focus();
                      }
                    }}
                    className="w-14 h-14 border-2 border-slate-200 focus:border-primary rounded-2xl text-center text-lg font-black outline-none focus:bg-white bg-slate-50 transition-all font-poppins text-slate-800" />
                ))}
              </div>
              <p className="text-center text-xs text-slate-400 mt-4 font-inter font-semibold">
                Didn't receive code? <button className="text-primary font-black hover:underline">{t.resendOtp}</button>
              </p>
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-transform font-poppins">
              {t.verifyOtp}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4 mt-2">
            {[
              { id: "shop", l: t.shopName, ph: "e.g. Sharma General Store", desc: "Use your official business brand name." },
              { id: "owner", l: t.ownerName, ph: "Full name", desc: "As displayed on your PAN or Aadhaar." },
              { id: "gst", l: t.gstLabel, ph: "Enter 15-digit GSTIN (optional)", desc: "15-digit business identifier." }
            ].map((f) => (
              <div key={f.id}>
                <label className="text-xs font-bold text-slate-600 mb-1 block uppercase tracking-wide font-inter">{f.l}</label>
                <input type="text" placeholder={f.ph} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-primary focus:bg-white transition-all font-inter text-slate-700" />
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5 font-inter">{f.desc}</p>
              </div>
            ))}

            {/* Document Upload Area (Issue 13: Upload boxes with guidelines, preview, and status) */}
            <div className="mt-1">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">
                {isHindi ? "जीएसटी प्रमाणपत्र या दुकान का फोटो" : "Upload GST Cert. or Shop Photo"}
              </label>

              {!uploadFile && !uploading && (
                <button
                  type="button"
                  onClick={handleSimulateUpload}
                  className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-300 transition-all text-slate-400 text-center"
                >
                  <Upload size={22} className="text-slate-400" />
                  <div className="font-inter">
                    <p className="text-xs font-bold text-slate-700">{isHindi ? "फाइल चुनने के लिए क्लिक करें" : "Click to select document"}</p>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Supports JPG, PNG or PDF · Max 5MB</p>
                  </div>
                </button>
              )}

              {uploading && (
                <div className="w-full border border-slate-100 rounded-2xl p-4 bg-slate-50 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 font-inter">
                    <span className="flex items-center gap-1.5"><Loader2 size={12} className="animate-spin text-primary" /> Uploading document...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {uploadFile && (
                <div className="w-full border border-emerald-100 rounded-2xl p-3.5 bg-emerald-50/50 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <FileCheck size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate font-inter">{uploadFile}</p>
                      <p className="text-[10px] text-slate-400 font-bold font-inter mt-0.5">1.2 MB · Success</p>
                    </div>
                  </div>
                  <button onClick={() => setUploadFile(null)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg">
                    <X size={15} />
                  </button>
                </div>
              )}
            </div>

            <button onClick={onBack} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-transform font-poppins mt-3">
              {t.getStarted} →
            </button>
          </div>
        )}

        {/* Privacy Policy consent block (Issue 2: Hindi/English Toggle) */}
        <div className="mt-8 border-t border-slate-100 pt-5 text-center flex flex-col gap-1.5">
          <p className="text-[10px] text-slate-400 font-semibold font-inter leading-relaxed max-w-[280px] mx-auto">
            {t.privacyText}
          </p>
          <button onClick={onPrivacyOpen} className="text-primary hover:underline font-black text-[10px] font-inter uppercase tracking-wider">
            {t.readPrivacy} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: ADDRESS ──────────────────────────────────────────────────────────
function AddressScreen({ onBack, lang, text, editingOrderId, onSaveOrderAddress }: {
  onBack: () => void; lang: string; text: any; editingOrderId: string | null;
  onSaveOrderAddress?: (orderId: string, address: string) => void;
}) {
  const [shopName, setShopName] = useState(editingOrderId ? "Sharma General Store (Updating Order)" : "");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("Noida");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("Uttar Pradesh");

  const handleSave = () => {
    const formattedAddress = `${shopName ? shopName + ", " : ""}${street}, ${locality}, ${city}, ${state} - ${pin}`;
    if (editingOrderId && onSaveOrderAddress) {
      onSaveOrderAddress(editingOrderId, formattedAddress);
    } else {
      alert(lang === "Hindi" ? "प्रोफ़ाइल वितरण पता सफलतापूर्वक अपडेट किया गया!" : "Profile delivery address updated successfully!");
    }
    onBack();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={editingOrderId ? translate("Change Order Address", lang) : translate("Delivery Address", lang)} subtitle={editingOrderId ? `${translate("Order", lang)}: ${editingOrderId}` : undefined} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ scrollbarWidth: "none" }}>
        <div className="h-40 rounded-3xl overflow-hidden relative mb-4 bg-slate-200 border border-slate-100 shadow-sm">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&h=300&fit=crop&auto=format" alt="map" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary rounded-full p-3 shadow-xl text-white"><MapPin size={22} className="fill-white" /></div>
          </div>
          <button className="absolute bottom-3 right-3 bg-white hover:bg-slate-50 text-primary text-[10px] font-black px-3.5 py-2 rounded-xl shadow-md border border-slate-100 transition-all font-inter uppercase tracking-wider">
            {translate("Use Current Location", lang)}
          </button>
        </div>

        {/* Warning label if updating active order */}
        {editingOrderId && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-2 items-start mb-4">
            <Info size={14} className="text-amber-700 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-amber-800 font-bold leading-normal font-inter">
              Warning: You are editing the delivery address for dispatching order <span className="font-extrabold">{editingOrderId}</span>.
            </p>
          </div>
        )}

        {[
          { label: translate("Shop/Building Name", lang), val: shopName, set: setShopName, ph: "e.g. Sharma General Store" },
          { label: translate("Street Address", lang), val: street, set: setStreet, ph: "House no., street/block name" },
          { label: translate("Area / Locality", lang), val: locality, set: setLocality, ph: "Area, colony name" },
          { label: translate("City", lang), val: city, set: setCity, ph: "City" },
          { label: translate("PIN Code", lang), val: pin, set: setPin, ph: "6-digit PIN code" },
          { label: translate("State", lang), val: state, set: setState, ph: "State" }
        ].map((f) => (
          <div key={f.label} className="mb-4">
            <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{f.label}</label>
            <input type="text" placeholder={f.ph} value={f.val} onChange={(e) => f.set(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-primary transition-all font-inter text-slate-700" />
          </div>
        ))}
      </div>
      <div className="bg-white border-t border-slate-100 px-4 py-4 z-40 pb-6">
        <button onClick={handleSave} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-transform font-poppins">
          {editingOrderId ? translate("Confirm and Update Order", lang) : translate("Save Address", lang)}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: ORDERS ───────────────────────────────────────────────────────────
function OrdersScreen({ orders, onBack, navigate, setEditingOrderId, lang, onReorder }: {
  orders: typeof ORDERS; onBack: () => void; navigate: (s: Screen) => void;
  setEditingOrderId: (id: string | null) => void; lang: string;
  onReorder: (productIds: { id: number; qty: number }[]) => void;
}) {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Active", "Delivered", "Cancelled"];
  const filtered = orders.filter((o) => {
    if (tab === "Active") return o.status === "out for delivery";
    if (tab === "Delivered") return o.status === "delivered";
    if (tab === "Cancelled") return o.status === "cancelled";
    return true;
  });

  // Track expanded details state for Issue 6
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const badgeV: Record<string, string> = { delivered: "green", "out for delivery": "amber", cancelled: "red" };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-700"><ArrowLeft size={20} /></button>
          <h1 className="text-slate-800 font-bold text-sm flex-1 font-poppins">{translate("My Orders", lang)}</h1>
        </div>
        <div className="flex gap-1.5 px-4 pb-3">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-1.5 rounded-full text-xs font-bold transition-all border font-inter",
                t === tab
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              )}
            >
              {translate(t, lang)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        {filtered.map((o) => {
          const expanded = expandedId === o.id;

          return (
            <div key={o.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3 hover:border-slate-200 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 font-poppins">{o.id}</p>
                  <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{o.date}</p>
                </div>
                <Pill variant={badgeV[o.status] || "gray"}>{translate(o.status, lang)}</Pill>
              </div>

              <div className="flex items-center gap-4 py-2.5 border-t border-b border-slate-50 my-0.5 text-xs">
                <div className="flex items-center gap-1 text-slate-500 font-inter font-semibold">
                  <Package size={13} />
                  <span>{o.items} {translate("items", lang)}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-800 font-poppins font-bold">
                  <CreditCard size={13} className="text-slate-400" />
                  <span>₹{o.total}</span>
                </div>
              </div>

              {/* Expanded Details Section: products + address */}
              {expanded && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-3 animate-fade-in">
                  {/* Products ordered */}
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 font-inter block mb-1.5">{lang === "Hindi" ? "ऑर्डर किए गए उत्पाद" : "Products Ordered"}</span>
                    <div className="flex flex-col gap-1.5">
                      {o.products.map((p) => (
                        <div key={p.id} className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold font-inter text-slate-700 flex-1 truncate pr-2">{p.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 font-inter">×{p.qty}</span>
                          <span className="text-[11px] font-bold text-slate-800 font-poppins ml-2">₹{p.price * p.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Delivery address */}
                  <div className="border-t border-slate-200 pt-2">
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 font-inter">{translate("Delivery Location", lang)}</span>
                    <p className="text-[11px] font-semibold font-inter text-slate-700 leading-normal mt-0.5">{o.address}</p>
                  </div>
                  {(o.status !== "delivered" && o.status !== "cancelled") ? (
                    <button
                      onClick={() => { setEditingOrderId(o.id); navigate("address"); }}
                      className="bg-white hover:bg-emerald-50 text-primary border border-emerald-100 rounded-xl py-2 px-3 text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                    >
                      <MapPin size={11} /> {translate("Change Shipping Address", lang)}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold font-inter bg-slate-100/50 p-2 rounded-xl">
                      <Info size={10} /> {lang === "Hindi" ? "वितरित/रद्द ऑर्डर का पता नहीं बदल सकते।" : "Address cannot be modified for delivered/cancelled orders."}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setExpandedId(expanded ? null : o.id)}
                  className="flex-1 border border-slate-200 rounded-xl py-2 text-[10px] font-bold text-slate-600 hover:border-slate-300 transition-all font-inter"
                >
                  {expanded ? translate("Hide Details", lang) : translate("View Details", lang)}
                </button>
                {o.status === "delivered" && (
                  <button onClick={() => { onReorder(o.products.map(p => ({ id: p.id, qty: p.qty }))); alert(lang === "Hindi" ? "उत्पाद कार्ट में जोड़े गए!" : "Items added to your cart!"); }} className="flex-1 border border-primary rounded-xl py-2 text-[10px] font-bold text-primary hover:bg-emerald-50 transition-all font-inter">
                    {translate("Reorder", lang)}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SCREEN: DELIVERIES ───────────────────────────────────────────────────────
function DeliveriesScreen({ onBack, lang }: { onBack: () => void; lang: string }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={translate("Deliveries", lang)} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: "none" }}>
        {DELIVERIES.map((d) => (
          <div key={d.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:border-slate-200 transition-all">
            {d.status === "out for delivery" && (
              <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center gap-2">
                <Zap size={13} className="text-amber-600" />
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide font-inter">{lang === "Hindi" ? "आज डिलीवरी के लिए तैयार" : "Out for delivery today"}</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-bold text-slate-800 font-poppins">{d.orderId}</p>
                  <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{d.date}</p>
                </div>
                <Pill variant={d.status === "delivered" ? "green" : "amber"}>
                  {d.status === "delivered" ? translate("delivered", lang) : translate("En Route", lang)}
                </Pill>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-3 py-2.5 mb-3 border border-slate-100">
                <Clock size={13} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-600 font-inter">{translate("ETA", lang)}: {d.eta}</span>
              </div>
              {d.status === "out for delivery" && (
                <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-primary flex-shrink-0"><User size={13} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate font-inter">{d.driver}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-inter">{translate("Delivery Partner", lang)}</p>
                  </div>
                  <button onClick={() => alert(`Calling ${d.driver}...`)} className="w-8 h-8 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Phone size={13} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => alert(lang === "Hindi" ? "ट्रैकिंग शुरू हो रही है..." : "Opening live tracking map...")} className="flex-1 border border-slate-200 rounded-xl py-2 text-[10px] font-bold text-slate-600 font-inter hover:border-slate-300">
                  {translate("Track Order", lang)}
                </button>
                <button onClick={() => alert(lang === "Hindi" ? "इनवॉइस डाउनलोड हो रहा है..." : "Downloading invoice PDF...")} className="flex-1 border border-slate-200 rounded-xl py-2 text-[10px] font-bold text-slate-600 font-inter hover:border-slate-300">
                  {translate("View Invoice", lang)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: INVOICES ─────────────────────────────────────────────────────────
function InvoicesScreen({ onBack, lang }: { onBack: () => void; lang: string }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={translate("Invoices", lang)} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-inter">{translate("Total Paid", lang)}</p>
            <p className="text-lg font-black text-emerald-800 mt-1 font-poppins">₹9,351</p>
            <p className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-max mx-auto mt-1 font-inter">{lang === "Hindi" ? "पूर्ण भुगतान" : "ALL CLEAR"}</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-inter">{translate("GST Paid", lang)}</p>
            <p className="text-lg font-black text-slate-800 mt-1 font-poppins">₹771</p>
            <p className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full w-max mx-auto mt-1 font-inter">{lang === "Hindi" ? "3 चालान" : "3 INVOICES"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 hover:border-slate-200 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{inv.orderId}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 font-poppins">{inv.id}</p>
                  <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{inv.date}</p>
                </div>
                <Pill variant="green">{translate("paid", lang)}</Pill>
              </div>
              <div className="flex flex-col gap-1.5 py-2.5 border-t border-b border-slate-50 my-2 text-xs">
                {[{ l: translate("Subtotal", lang), v: `₹${inv.amount}` }, { l: translate("GST (18%)", lang), v: `₹${inv.gst}` }].map((r) => (
                  <div key={r.l} className="flex justify-between font-inter font-semibold">
                    <span className="text-slate-400">{r.l}</span>
                    <span className="text-slate-600">{r.v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-slate-800 font-poppins">{translate("Total Invoice", lang)}</span>
                  <span className="font-black text-emerald-800 font-poppins">₹{inv.total}</span>
                </div>
              </div>
              <button onClick={() => alert(lang === "Hindi" ? "पीडीएफ इनवॉइस डाउनलोड हो रहा है..." : "Downloading PDF invoice...")} className="w-full border border-primary text-primary hover:bg-emerald-50 rounded-xl py-2 text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all font-inter">
                <FileText size={13} /> {translate("Download PDF Invoice", lang)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: LANGUAGE ─────────────────────────────────────────────────────────
function LanguageScreen({ onBack, language, setLanguage }: {
  onBack: () => void; language: string; setLanguage: (l: string) => void;
}) {
  const langs = [
    { n: "English", nat: "English", f: "🇬🇧" },
    { n: "Hindi", nat: "हिन्दी", f: "🇮🇳" },
    { n: "Marathi", nat: "मराठी", f: "🇮🇳" },
    { n: "Tamil", nat: "தமிழ்", f: "🇮🇳" },
    { n: "Telugu", nat: "తెలుగు", f: "🇮🇳" },
    { n: "Gujarati", nat: "ગુજરાતી", f: "🇮🇳" },
    { n: "Bengali", nat: "বাংলা", f: "🇮🇳" },
    { n: "Kannada", nat: "कन्नड़", f: "🇮🇳" },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-700"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="text-slate-800 font-bold text-sm font-poppins">{translate("App Language", language)}</h1>
            <p className="text-slate-400 text-[10px] font-semibold mt-0.5 font-inter uppercase tracking-wide">ऐप भाषा चुनें</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 flex flex-col gap-2" style={{ scrollbarWidth: "none" }}>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1 font-inter">{translate("Select your preferred language", language)}</p>
        {langs.map((l) => {
          const active = language === l.n;
          return (
            <button key={l.n} onClick={() => setLanguage(l.n)}
              className={cn(
                "flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all w-full text-left bg-white shadow-sm",
                active
                  ? "border-primary bg-emerald-50/30"
                  : "border-slate-100 hover:border-slate-200"
              )}
            >
              <span className="text-xl flex-shrink-0">{l.f}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 font-poppins">{l.n}</p>
                <p className="text-[10px] text-slate-400 font-semibold font-inter mt-0.5">{l.nat}</p>
              </div>
              {active && <div className="w-5.5 h-5.5 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><Check size={11} strokeWidth={3} /></div>}
            </button>
          );
        })}
      </div>
      <div className="bg-white border-t border-slate-100 px-4 py-4 z-40 pb-6">
        <button onClick={onBack} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/10 font-poppins">
          {translate("Continue with", language)} {language}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: HELP ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:border-slate-200 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="text-xs font-bold text-slate-700 flex-1 pr-3 font-inter">{q}</span>
        <ChevronDown size={14} className={cn("text-slate-400 flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-4 pb-4 border-t border-slate-50 pt-3"><p className="text-[11px] text-slate-500 leading-relaxed font-inter font-medium">{a}</p></div>}
    </div>
  );
}

function HelpScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <SubHeader title="Help & Support" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-3.5" style={{ scrollbarWidth: "none" }}>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800 font-poppins">Call Support Hotline</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5 font-inter">Mon–Sat · 10 AM to 6 PM</p>
            <p className="text-sm font-black text-primary mt-2 font-poppins">8268 263 232</p>
          </div>
          <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md font-poppins">Call Us</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MessageSquare, l: "Live Chat", c: "bg-blue-50 border-blue-100 text-blue-700" },
            { icon: FileText, l: "Raise Ticket", c: "bg-amber-50 border-amber-100 text-amber-700" },
            { icon: BookOpen, l: "User Guide", c: "bg-emerald-50 border-emerald-100 text-primary" }
          ].map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.l} className="bg-white border border-slate-100 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm text-center">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", a.c)}><Icon size={16} /></div>
                <span className="text-[10px] font-bold text-slate-700 font-inter">{a.l}</span>
              </button>
            );
          })}
        </div>
        <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mt-2 px-1 font-inter">Frequently Asked Questions</h2>
        {[
          { q: "How do I place a bulk order?", a: "Browse products or search by name/brand, add to cart with desired quantities, and tap Place Order." },
          { q: "When will my order be delivered?", a: "Orders placed before 2 PM are typically delivered the next business day." },
          { q: "How do I track my order?", a: "Go to My Orders → select order → tap Track to see real-time updates." },
          { q: "How do schemes and rewards work?", a: "Complete the required number of orders within the scheme period to unlock free products." },
          { q: "Can I cancel an order?", a: "Orders can be cancelled within 30 minutes of placement. Contact support for assistance." },
        ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  );
}

// ─── SCREEN: SKELETON CONTAINER ───────────────────────────────────────────────
function SkeletonContainer({ screen, onBack }: { screen: Screen; onBack: () => void }) {
  const titleMap: Record<string, string> = {
    home: "O2R Retailer",
    products: "All Products",
    categories: "All Categories",
    cart: "Cart Details",
    offers: "Offers & Schemes",
    orders: "My Orders",
    deliveries: "Deliveries",
    invoices: "Invoices",
    help: "Help & Support",
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <SubHeader title={titleMap[screen] || "Loading..."} onBack={onBack} />
      <div className="flex-1 px-4 pt-4 pb-8 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {screen === "products" || screen === "home" ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : screen === "categories" ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        ) : screen === "orders" || screen === "deliveries" || screen === "invoices" ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <OrderSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-slate-100 p-4 h-32 animate-pulse" />
            <div className="bg-white rounded-3xl border border-slate-100 p-4 h-24 animate-pulse" />
            <div className="bg-white rounded-3xl border border-slate-100 p-4 h-40 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: STATES ───────────────────────────────────────────────────────────
function StateScreen({ type, onBack, onRetry }: { type: "loading" | "empty" | "error"; onBack: () => void; onRetry?: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <SubHeader title={type === "loading" ? "Loading" : type === "empty" ? "No Results" : "Error"} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5">
        {type === "loading" && (
          <>
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-primary animate-pulse">
              <Loader2 size={38} className="animate-spin" />
            </div>
            <div className="text-center">
              <h2 className="text-sm font-bold text-slate-800 font-poppins">Loading your data</h2>
              <p className="text-xs text-slate-400 mt-1 font-inter font-semibold">Please wait a moment…</p>
            </div>
            <div className="flex gap-1.5 mt-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary"
                  style={{ animation: `dotbounce 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </>
        )}
        {type === "empty" && (
          <>
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl">📦</div>
            <div className="text-center">
              <h2 className="text-sm font-bold text-slate-800 font-poppins">No products found</h2>
              <p className="text-xs text-slate-400 mt-1 font-inter font-semibold">Try a different category or search term</p>
            </div>
            <button onClick={onBack} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md font-poppins">Browse All Products</button>
          </>
        )}
        {type === "error" && (
          <>
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
              <AlertCircle size={36} />
            </div>
            <div className="text-center">
              <h2 className="text-sm font-bold text-slate-800 font-poppins">Connection error</h2>
              <p className="text-xs text-slate-400 mt-1 font-inter font-semibold">Check your internet and try again</p>
            </div>
            <div className="flex gap-3">
              <button onClick={onBack} className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-xs font-inter hover:border-slate-300">Go Back</button>
              <button onClick={onRetry} className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md font-poppins">
                <RefreshCw size={12} /> Retry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: ACCOUNT ──────────────────────────────────────────────────────────
function AccountScreen({
  onBack, lang, text, shopName, setShopName, ownerName, setOwnerName
}: {
  onBack: () => void; lang: string; text: any;
  shopName: string; setShopName: (v: string) => void;
  ownerName: string; setOwnerName: (v: string) => void;
}) {
  const [phone] = useState("+91 80765 13921");
  const [gstin, setGstin] = useState("07AAAAA1111A1Z1");
  const [email, setEmail] = useState("rishit@o2r.com");

  const handleSave = () => {
    alert(lang === "Hindi" ? "खाता जानकारी सफलतापूर्वक सहेजी गई!" : "Account information saved successfully!");
    onBack();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <SubHeader title={translate("My Account", lang)} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ scrollbarWidth: "none" }}>

        {/* Profile Card */}
        <div className="bg-slate-900 rounded-3xl p-5 text-white mb-5 relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mb-8" />
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center border-2 border-emerald-400 shadow-md">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm font-poppins">{ownerName}</h2>
              <p className="text-slate-300 text-xs font-inter font-medium mt-0.5">{phone}</p>
              <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest font-inter mt-1">{shopName}</p>
            </div>
          </div>
        </div>

        {/* Edit fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{translate("Shop Name", lang)}</label>
            <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-primary transition-all font-inter text-slate-700" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{translate("Owner Name", lang)}</label>
            <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-primary transition-all font-inter text-slate-700" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{translate("Phone Number", lang)}</label>
            <input type="text" value={phone} disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none transition-all font-inter text-slate-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{translate("GSTIN", lang)}</label>
            <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-primary transition-all font-inter text-slate-700" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block uppercase tracking-wide font-inter">{translate("Email Address", lang)}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-primary transition-all font-inter text-slate-700" />
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-slate-100 px-4 py-4 z-40 pb-6">
        <button onClick={handleSave} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-transform font-poppins">
          {translate("Save Changes", lang)}
        </button>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TABS: Screen[] = ["home", "categories", "cart", "offers", "orders"];
const ALL_SCREENS: Screen[] = ["login", "otp", "home", "products", "categories", "cart", "offers", "drawer", "calling-slot", "signup", "address", "orders", "deliveries", "invoices", "language", "help", "loading", "empty", "error"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [prev, setPrev] = useState<Screen>("home");
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState(ORDERS);
  // Global account profile state so Drawer + Account screen stay in sync
  const [profileShopName, setProfileShopName] = useState("Sharma General Store");
  const [profileOwnerName, setProfileOwnerName] = useState("RishitTest");

  // Global Language & Translations Setup (Issue 2: English/Hindi Toggle Support)
  const [language, setLanguage] = useState("English");
  const text = LOCALIZATIONS[language] || LOCALIZATIONS.English;

  // Global Address editing state (Issue 6)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

  // Interactive Brand Filter
  const [brandFilter, setBrandFilter] = useState("All Brands");

  // Search & Category Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Coupon applied states
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Modern Shimmer Transition Loading State (Issue 18)
  const [isLoading, setIsLoading] = useState(false);

  // Privacy Policy modal overlay state (Issue 2)
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");

  const go = (s: Screen) => {
    setIsLoading(true);
    setPrev(screen);
    setScreen(s);
    setTimeout(() => {
      setIsLoading(false);
    }, 450); // mock load time
  };

  const back = () => {
    setIsLoading(true);
    const target = prev === screen ? "home" : prev;
    setScreen(target);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const add = (id: number) => setProducts((ps: typeof PRODUCTS) => ps.map((p: typeof PRODUCTS[0]) => p.id === id ? { ...p, inCart: 1 } : p));
  const inc = (id: number) => setProducts((ps: typeof PRODUCTS) => ps.map((p: typeof PRODUCTS[0]) => p.id === id ? { ...p, inCart: p.inCart + 1 } : p));
  const dec = (id: number) => setProducts((ps: typeof PRODUCTS) => ps.map((p: typeof PRODUCTS[0]) => p.id === id ? { ...p, inCart: Math.max(0, p.inCart - 1) } : p));
  const reorder = (items: { id: number; qty: number }[]) => setProducts((ps: typeof PRODUCTS) => ps.map((p: typeof PRODUCTS[0]) => { const item = items.find((i: { id: number; qty: number }) => i.id === p.id); return item ? { ...p, inCart: p.inCart + item.qty } : p; }));

  const handleSaveOrderAddress = (orderId: string, address: string) => {
    setOrders((os: typeof ORDERS) => os.map((o: typeof ORDERS[0]) => o.id === orderId ? { ...o, address } : o));
    setEditingOrderId(null);
    alert(`Delivery address updated for Order ${orderId}!`);
  };

  const cartCount = products.reduce((s: number, p: typeof PRODUCTS[0]) => s + p.inCart, 0);
  const showNav = TABS.includes(screen);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-inter antialiased">

      {/* Screen Picker */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-slate-950/90 backdrop-blur-md flex gap-1 p-1.5 overflow-x-auto shadow-md border-b border-white/5" style={{ scrollbarWidth: "none" }}>
        {ALL_SCREENS.map((s) => (
          <button key={s} onClick={() => { setPrev(screen); setScreen(s); }}
            className={cn("flex-shrink-0 px-3 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all", screen === s ? "bg-primary text-white shadow-md shadow-emerald-700/20" : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200")}>
            {s}
          </button>
        ))}
      </div>

      {/* Phone Simulator Frame */}
      <div className="relative mt-12 rounded-[52px] border-[10px] border-slate-800 shadow-2xl overflow-hidden bg-slate-50 transition-all"
        style={{ width: 375, height: "calc(100vh - 68px)", maxHeight: 812 }}>
        <div className="w-full h-full flex flex-col overflow-hidden relative">

          {/* Screen Content Wrapper */}
          <div className="flex-1 overflow-hidden relative flex flex-col"
            style={{ scrollbarWidth: "none" }}>

            {isLoading ? (
              <SkeletonContainer screen={screen} onBack={back} />
            ) : (
              <>
                {screen === "login" && (
                  <LoginScreen
                    onContinue={(phone) => { setLoginPhone(phone); go("otp"); }}
                    lang={language}
                    setLang={setLanguage}
                    onSignUp={() => go("signup")}
                  />
                )}
                {screen === "otp" && (
                  <OtpScreen
                    phone={loginPhone}
                    onVerify={() => go("home")}
                    onBack={back}
                    lang={language}
                  />
                )}
                {screen === "home" && (
                  <HomeScreen
                    products={products}
                    navigate={go}
                    cartCount={cartCount}
                    onAdd={add}
                    onInc={inc}
                    onDec={dec}
                    lang={language}
                    text={text}
                    setBrandFilter={setBrandFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchSubmit={() => go("products")}
                    setCategoryFilter={setCategoryFilter}
                  />
                )}
                {screen === "products" && (
                  <ProductsScreen
                    products={products}
                    onBack={back}
                    navigate={go}
                    cartCount={cartCount}
                    onAdd={add}
                    onInc={inc}
                    onDec={dec}
                    brand={brandFilter}
                    setBrand={setBrandFilter}
                    category={categoryFilter}
                    setCategory={setCategoryFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    lang={language}
                  />
                )}
                {screen === "categories" && <CategoriesScreen onBack={back} navigate={go} setCategoryFilter={setCategoryFilter} setBrandFilter={setBrandFilter} lang={language} />}
                {screen === "cart" && (
                  <CartScreen
                    products={products}
                    onBack={back}
                    navigate={go}
                    onPlaceOrder={() => go("orders")}
                    lang={language}
                    text={text}
                    onInc={inc}
                    onDec={dec}
                    couponDiscount={couponDiscount}
                    appliedCouponCode={appliedCouponCode}
                  />
                )}
                {screen === "offers" && (
                  <OffersScreen
                    onBack={back}
                    onApplyCoupon={(code, val) => {
                      if (appliedCouponCode === code) {
                        setAppliedCouponCode("");
                        setCouponDiscount(0);
                      } else {
                        setAppliedCouponCode(code);
                        setCouponDiscount(val);
                      }
                    }}
                    appliedCouponCode={appliedCouponCode}
                    lang={language}
                  />
                )}
                {screen === "drawer" && (
                  <DrawerScreen
                    onClose={back}
                    navigate={go}
                    lang={language}
                    setLang={setLanguage}
                    onPrivacyOpen={() => setPrivacyOpen(true)}
                    ownerName={profileOwnerName}
                    shopName={profileShopName}
                  />
                )}
                {screen === "calling-slot" && <CallingSlotScreen onBack={back} lang={language} />}
                {screen === "signup" && (
                  <SignupScreen
                    onBack={back}
                    lang={language}
                    setLang={setLanguage}
                    onPrivacyOpen={() => setPrivacyOpen(true)}
                  />
                )}
                {screen === "address" && (
                  <AddressScreen
                    onBack={back}
                    lang={language}
                    text={text}
                    editingOrderId={editingOrderId}
                    onSaveOrderAddress={handleSaveOrderAddress}
                  />
                )}
                {screen === "account" && (
                  <AccountScreen
                    onBack={back}
                    lang={language}
                    text={text}
                    shopName={profileShopName}
                    setShopName={setProfileShopName}
                    ownerName={profileOwnerName}
                    setOwnerName={setProfileOwnerName}
                  />
                )}
                {screen === "orders" && (
                  <OrdersScreen
                    orders={orders}
                    onBack={back}
                    navigate={go}
                    setEditingOrderId={setEditingOrderId}
                    lang={language}
                    onReorder={reorder}
                  />
                )}
                {screen === "deliveries" && <DeliveriesScreen onBack={back} lang={language} />}
                {screen === "invoices" && <InvoicesScreen onBack={back} lang={language} />}
                {screen === "language" && (
                  <LanguageScreen
                    onBack={back}
                    language={language}
                    setLanguage={setLanguage}
                  />
                )}
                {screen === "help" && <HelpScreen onBack={back} />}
                {screen === "loading" && <StateScreen type="loading" onBack={back} />}
                {screen === "empty" && <StateScreen type="empty" onBack={back} />}
                {screen === "error" && <StateScreen type="error" onBack={back} onRetry={() => go("home")} />}
              </>
            )}
          </div>

          {showNav && !isLoading && <BottomNav active={screen} onChange={go} cartCount={cartCount} lang={language} />}
        </div>
      </div>

      {/* Global translated Privacy Policy Overlay */}
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} lang={language} />

      <style>{`
        @keyframes dotbounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        *::-webkit-scrollbar { display: none; }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
