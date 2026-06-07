import { useState, useRef } from "react";
import {
  Home, Grid3X3, ShoppingCart, Tag, Package, MapPin, Search,
  Bell, ChevronRight, ChevronDown, Plus, Minus, ArrowLeft, X,
  Check, Phone, Truck, FileText, Star, Gift, Clock, User,
  HelpCircle, LogOut, Filter, Award, TrendingUp, RefreshCw,
  AlertCircle, Loader2, Globe, BookOpen, ReceiptText, CreditCard,
  MessageSquare, Zap, Menu
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "home" | "products" | "categories" | "cart" | "offers"
  | "drawer" | "calling-slot" | "signup" | "address" | "orders"
  | "deliveries" | "invoices" | "language" | "help" | "loading"
  | "empty" | "error";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Thums Up 250ml", pack: "250ml × 15", weight: "3750ml", mrp: 300, price: 250, discount: 50, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop&auto=format", category: "Beverages", brand: "Coca Cola", inCart: 1 },
  { id: 2, name: "Chingles Filz Jar", pack: "360g × 1", weight: "360g", mrp: 134, price: 116, discount: 18, image: "https://images.unsplash.com/photo-1582845512747-e42001c95638?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "DS Group", inCart: 0 },
  { id: 3, name: "Pulse Golmol Imli", pack: "525g × 1", weight: "525g", mrp: 150, price: 113, discount: 37, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "DS Group", inCart: 0 },
  { id: 4, name: "Britannia Good Day", pack: "300g × 12", weight: "3.6kg", mrp: 480, price: 420, discount: 60, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop&auto=format", category: "Biscuits", brand: "Britannia", inCart: 0 },
  { id: 5, name: "Cadbury Dairy Milk", pack: "38g × 20", weight: "760g", mrp: 380, price: 340, discount: 40, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop&auto=format", category: "Chocolates", brand: "Cadbury", inCart: 0 },
  { id: 6, name: "Too Yumm Rings", pack: "23g × 12", weight: "276g", mrp: 120, price: 96, discount: 24, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop&auto=format", category: "Snacks", brand: "Excyt", inCart: 0 },
  { id: 7, name: "Dettol Handwash", pack: "200ml × 6", weight: "1.2L", mrp: 360, price: 300, discount: 60, image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=300&fit=crop&auto=format", category: "Personal Care", brand: "Dettol", inCart: 0 },
  { id: 8, name: "Pass Pass Meetha Magic", pack: "11.7g × 18", weight: "210.6g", mrp: 90, price: 72, discount: 18, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop&auto=format", category: "Mouth Freshener", brand: "DS Group", inCart: 0 },
];

const CATEGORIES = [
  { id: 1, name: "Beverages", icon: "🥤", count: 48, color: "#EFF6FF" },
  { id: 2, name: "Snacks", icon: "🍿", count: 112, color: "#FEF9EE" },
  { id: 3, name: "Biscuits", icon: "🍪", count: 67, color: "#F0FDF4" },
  { id: 4, name: "Chocolates", icon: "🍫", count: 43, color: "#FFF1F2" },
  { id: 5, name: "Personal Care", icon: "🧴", count: 89, color: "#F5F3FF" },
  { id: 6, name: "Mouth Freshener", icon: "🌿", count: 31, color: "#ECFDF5" },
  { id: 7, name: "Dairy", icon: "🥛", count: 24, color: "#FFFBEB" },
  { id: 8, name: "Instant Food", icon: "🍜", count: 56, color: "#FFF7ED" },
  { id: 9, name: "Household", icon: "🧹", count: 38, color: "#F0F9FF" },
  { id: 10, name: "Confectionery", icon: "🍬", count: 77, color: "#FDF4FF" },
];

const OFFERS = [
  { id: 1, code: "CUP15918", title: "Free Products Worth ₹376", desc: "Place 25 orders worth min. ₹2,000 each", progress: 18, target: 25, type: "scheme", reward: "Luvit Eclairs × 4, Chingles × 2", unlocked: false },
  { id: 2, code: "CUP88181", title: "Free Products Worth ₹100", desc: "Place 30 orders worth min. ₹500 each", progress: 22, target: 30, type: "scheme", reward: "TooYumm Rings × 3", unlocked: false },
  { id: 3, code: "CUP2827", title: "Free Gift Worth ₹500", desc: "Place 20 orders worth min. ₹5,500 each", progress: 14, target: 20, type: "scheme", reward: "Premium Gift Hamper", unlocked: false },
  { id: 4, code: "CUP49359", title: "₹25 Off on Order", desc: "Min. order value ₹4,200", progress: 100, target: 100, type: "coupon", reward: "₹25 discount", unlocked: true },
  { id: 5, code: "CUP19111", title: "₹15 Off on Order", desc: "Min. order value ₹2,600", progress: 100, target: 100, type: "coupon", reward: "₹15 discount", unlocked: true },
  { id: 6, code: "CUP68219", title: "Free Products Worth ₹552", desc: "Place 25 orders worth min. ₹3,000 each", progress: 8, target: 25, type: "scheme", reward: "Assorted Products Bundle", unlocked: false },
];

const ORDERS = [
  { id: "ORD-7821", date: "25 May 2026", items: 8, total: 2450, status: "delivered" },
  { id: "ORD-7756", date: "22 May 2026", items: 5, total: 1180, status: "out for delivery" },
  { id: "ORD-7703", date: "19 May 2026", items: 12, total: 3890, status: "delivered" },
  { id: "ORD-7642", date: "15 May 2026", items: 3, total: 620, status: "cancelled" },
  { id: "ORD-7598", date: "11 May 2026", items: 9, total: 2240, status: "delivered" },
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cn(...cls: (string | false | undefined | null)[]) {
  return cls.filter(Boolean).join(" ");
}

const P = { family: "font-family:'Poppins',sans-serif" };
const I = { family: "font-family:'Inter',sans-serif" };

// ─── Micro Components ─────────────────────────────────────────────────────────
function Pill({ children, variant = "amber" }: { children: React.ReactNode; variant?: string }) {
  const v: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold", v[variant] || v.amber)}
      style={{ fontFamily: "Inter,sans-serif" }}>
      {children}
    </span>
  );
}

function Stepper({ qty, onInc, onDec }: { qty: number; onInc: () => void; onDec: () => void }) {
  return (
    <div className="flex items-center border border-[#8B6B00] rounded-xl overflow-hidden">
      <button onClick={onDec} className="w-8 h-8 flex items-center justify-center text-[#8B6B00] active:bg-amber-50">
        <Minus size={13} strokeWidth={2.5} />
      </button>
      <span className="w-6 text-center text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{qty}</span>
      <button onClick={onInc} className="w-8 h-8 flex items-center justify-center text-[#8B6B00] active:bg-amber-50">
        <Plus size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function TopBar({
  onDrawer, onCart, cartCount,
}: { onDrawer: () => void; onCart: () => void; cartCount: number }) {
  return (
    <div className="sticky top-0 z-40 bg-[#8B6B00] px-4 pt-3 pb-3 shadow-md">
      <div className="flex items-center justify-between mb-2.5">
        <button onClick={onDrawer} className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <MapPin size={13} className="text-amber-200" />
            <span className="text-amber-200 text-[11px]" style={{ fontFamily: "Inter,sans-serif" }}>Deliver to</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-sm font-semibold" style={{ fontFamily: "Poppins,sans-serif" }}>Sector 70, Noida</span>
            <ChevronDown size={13} className="text-white" />
          </div>
        </button>
        <div className="flex items-center gap-3">
          <button className="p-1 relative">
            <Bell size={19} className="text-white" />
          </button>
          <button onClick={onCart} className="p-1 relative">
            <ShoppingCart size={19} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ fontFamily: "Inter,sans-serif" }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search products, brands, categories…"
          className="w-full bg-white text-gray-700 placeholder-gray-400 text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none"
          style={{ fontFamily: "Inter,sans-serif" }}
        />
      </div>
    </div>
  );
}

function SubHeader({ title, subtitle, onBack, onCart, cartCount }: {
  title: string; subtitle?: string; onBack: () => void; onCart?: () => void; cartCount?: number;
}) {
  return (
    <div className="sticky top-0 z-40 bg-[#8B6B00] px-4 py-3.5 flex items-center gap-3">
      <button onClick={onBack} className="p-1"><ArrowLeft size={20} className="text-white" /></button>
      <div className="flex-1">
        <h1 className="text-white font-bold text-[15px]" style={{ fontFamily: "Poppins,sans-serif" }}>{title}</h1>
        {subtitle && <p className="text-amber-200 text-xs" style={{ fontFamily: "Inter,sans-serif" }}>{subtitle}</p>}
      </div>
      {onCart && (
        <button onClick={onCart} className="relative p-1">
          <ShoppingCart size={19} className="text-white" />
          {cartCount !== undefined && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

function BottomNav({ active, onChange, cartCount }: { active: Screen; onChange: (s: Screen) => void; cartCount: number }) {
  const tabs = [
    { id: "home" as Screen, icon: Home, label: "Home" },
    { id: "categories" as Screen, icon: Grid3X3, label: "Categories" },
    { id: "cart" as Screen, icon: ShoppingCart, label: "Cart", badge: cartCount },
    { id: "offers" as Screen, icon: Tag, label: "Offers" },
    { id: "orders" as Screen, icon: Package, label: "Orders" },
  ];
  return (
    <div className="bg-white border-t border-gray-100 flex">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const on = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn("flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors", on ? "text-[#8B6B00]" : "text-gray-400")}
          >
            <div className="relative">
              <Icon size={20} strokeWidth={on ? 2.5 : 1.8} />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              )}
            </div>
            <span className={cn("text-[11px]", on ? "font-semibold" : "font-normal")} style={{ fontFamily: "Inter,sans-serif" }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function FloatingCartCTA({ count, total, onView }: { count: number; total: number; onView: () => void }) {
  if (count === 0) return null;
  return (
    <div className="absolute bottom-[57px] left-3 right-3 z-30">
      <button
        onClick={onView}
        className="w-full bg-[#8B6B00] text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-xl active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-2">
          <div className="bg-amber-700 rounded-lg p-1.5"><ShoppingCart size={13} /></div>
          <span className="font-semibold text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>{count} item{count > 1 ? "s" : ""} added</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold" style={{ fontFamily: "Poppins,sans-serif" }}>₹{total}</span>
          <ChevronRight size={15} />
        </div>
      </button>
    </div>
  );
}

function ProductCard({ p, onAdd, onInc, onDec }: {
  p: typeof PRODUCTS[0]; onAdd: () => void; onInc: () => void; onDec: () => void;
}) {
  const fallback = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&auto=format";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-gray-50">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = fallback; }} />
        {p.discount > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ fontFamily: "Inter,sans-serif" }}>
            ₹{p.discount} off
          </div>
        )}
        {p.inCart === 0 ? (
          <button onClick={onAdd}
            className="absolute bottom-2 right-2 bg-[#8B6B00] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md active:scale-95 transition-transform"
            style={{ fontFamily: "Inter,sans-serif" }}>
            ADD
          </button>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center bg-[#8B6B00] rounded-xl overflow-hidden shadow-md">
            <button onClick={onDec} className="w-7 h-7 flex items-center justify-center text-white"><Minus size={11} /></button>
            <span className="text-white text-xs font-bold min-w-[16px] text-center" style={{ fontFamily: "Poppins,sans-serif" }}>{p.inCart}</span>
            <button onClick={onInc} className="w-7 h-7 flex items-center justify-center text-white"><Plus size={11} /></button>
          </div>
        )}
      </div>
      <div className="p-2.5 flex flex-col gap-0.5">
        <p className="text-[11px] text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>{p.pack} · {p.weight}</p>
        <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2" style={{ fontFamily: "Poppins,sans-serif" }}>{p.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>₹{p.price}</span>
          <span className="text-xs text-gray-400 line-through" style={{ fontFamily: "Inter,sans-serif" }}>₹{p.mrp}</span>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: HOME ─────────────────────────────────────────────────────────────
function HomeScreen({ products, navigate, cartCount, onAdd, onInc, onDec }: {
  products: typeof PRODUCTS; navigate: (s: Screen) => void; cartCount: number;
  onAdd: (id: number) => void; onInc: (id: number) => void; onDec: (id: number) => void;
}) {
  const total = products.reduce((s, p) => s + p.price * p.inCart, 0);
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <TopBar onDrawer={() => navigate("drawer")} onCart={() => navigate("cart")} cartCount={cartCount} />
      <div className="flex-1 overflow-y-auto pb-36" style={{ scrollbarWidth: "none" }}>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#8B6B00] to-[#5C4700] p-4 flex items-center justify-between overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-white/5" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/5" />
            <div className="z-10">
              <Pill variant="amber">Limited Time</Pill>
              <h3 className="text-white text-lg font-bold mt-1.5 leading-tight" style={{ fontFamily: "Poppins,sans-serif" }}>
                Unlock Free<br />Products 🎁
              </h3>
              <p className="text-amber-200 text-xs mt-1" style={{ fontFamily: "Inter,sans-serif" }}>25 orders = ₹376 in free goods</p>
              <button onClick={() => navigate("offers")} className="mt-3 bg-white text-[#8B6B00] text-xs font-bold px-4 py-1.5 rounded-full" style={{ fontFamily: "Inter,sans-serif" }}>
                View Schemes →
              </button>
            </div>
            <div className="text-5xl z-10">🎁</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-4 grid grid-cols-4 gap-2">
          {([
            { icon: Package, label: "Orders", screen: "orders", color: "#FEF3C7" },
            { icon: Truck, label: "Deliveries", screen: "deliveries", color: "#DCFCE7" },
            { icon: FileText, label: "Invoices", screen: "invoices", color: "#EFF6FF" },
            { icon: Tag, label: "Offers", screen: "offers", color: "#FDF4FF" },
          ] as const).map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} onClick={() => navigate(a.screen)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.color }}>
                  <Icon size={18} className="text-[#8B6B00]" />
                </div>
                <span className="text-[11px] font-medium text-gray-700 text-center leading-tight" style={{ fontFamily: "Inter,sans-serif" }}>{a.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scheme Progress Nudge */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Award size={18} className="text-[#8B6B00]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500" style={{ fontFamily: "Inter,sans-serif" }}>Scheme Progress</p>
              <p className="text-sm font-semibold text-gray-900 leading-tight" style={{ fontFamily: "Poppins,sans-serif" }}>7 more orders to unlock ₹376</p>
              <div className="mt-1.5 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#8B6B00] h-full rounded-full" style={{ width: "72%" }} />
              </div>
            </div>
            <button onClick={() => navigate("offers")}><ChevronRight size={17} className="text-[#8B6B00]" /></button>
          </div>
        </div>

        {/* Category Strip */}
        <div className="mt-5">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Shop by Category</h2>
            <button onClick={() => navigate("categories")} className="text-[#8B6B00] text-sm font-semibold" style={{ fontFamily: "Inter,sans-serif" }}>See all</button>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.slice(0, 7).map((c) => (
              <button key={c.id} onClick={() => navigate("products")} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[22px] border border-gray-100" style={{ background: c.color }}>
                  {c.icon}
                </div>
                <span className="text-[11px] font-medium text-gray-700 w-14 text-center leading-tight" style={{ fontFamily: "Inter,sans-serif" }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="mt-5">
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={15} className="text-[#8B6B00]" />
              <h2 className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Trending Now</h2>
            </div>
            <button onClick={() => navigate("products")} className="text-[#8B6B00] text-sm font-semibold" style={{ fontFamily: "Inter,sans-serif" }}>View all</button>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} p={p}
                onAdd={() => onAdd(p.id)} onInc={() => onInc(p.id)} onDec={() => onDec(p.id)} />
            ))}
          </div>
        </div>

        {/* Best Sellers */}
        <div className="mt-5">
          <div className="flex items-center gap-1.5 px-4 mb-3">
            <Star size={15} className="text-[#8B6B00]" />
            <h2 className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Best Sellers</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {products.slice(4).map((p) => (
              <ProductCard key={p.id} p={p}
                onAdd={() => onAdd(p.id)} onInc={() => onInc(p.id)} onDec={() => onDec(p.id)} />
            ))}
          </div>
        </div>
      </div>
      <FloatingCartCTA count={cartCount} total={total} onView={() => navigate("cart")} />
    </div>
  );
}

// ─── SCREEN: PRODUCTS ─────────────────────────────────────────────────────────
function ProductsScreen({ products, onBack, navigate, cartCount, onAdd, onInc, onDec }: {
  products: typeof PRODUCTS; onBack: () => void; navigate: (s: Screen) => void; cartCount: number;
  onAdd: (id: number) => void; onInc: (id: number) => void; onDec: (id: number) => void;
}) {
  const [brand, setBrand] = useState("All Brands");
  const brands = ["All Brands", "Britannia", "Cadbury", "Coca Cola", "Dettol", "DS Group", "Excyt"];
  const filtered = brand === "All Brands" ? products : products.filter((p) => p.brand === brand);
  const total = products.reduce((s, p) => s + p.price * p.inCart, 0);

  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <div className="sticky top-0 z-40 bg-[#8B6B00]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack}><ArrowLeft size={20} className="text-white" /></button>
          <div className="flex-1">
            <h1 className="text-white font-bold text-[15px]" style={{ fontFamily: "Poppins,sans-serif" }}>All Products</h1>
            <p className="text-amber-200 text-xs" style={{ fontFamily: "Inter,sans-serif" }}>{filtered.length} products</p>
          </div>
          <button><Search size={19} className="text-white" /></button>
          <button onClick={() => navigate("cart")} className="relative">
            <ShoppingCart size={19} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {brands.map((b) => (
            <button key={b} onClick={() => setBrand(b)}
              className={cn("flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors", b === brand ? "bg-white text-[#8B6B00] font-bold" : "bg-amber-700 text-amber-100")}
              style={{ fontFamily: "Inter,sans-serif" }}>
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-36" style={{ scrollbarWidth: "none" }}>
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden h-32 relative bg-gray-300">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&h=200&fit=crop&auto=format"
            alt="promo" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center p-4 bg-gradient-to-r from-black/50 to-transparent">
            <div>
              <p className="text-amber-300 text-xs font-semibold" style={{ fontFamily: "Inter,sans-serif" }}>New Arrivals</p>
              <h3 className="text-white font-bold text-xl" style={{ fontFamily: "Poppins,sans-serif" }}>Order Now!</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mt-4 mb-3">
          <p className="text-sm text-gray-500" style={{ fontFamily: "Inter,sans-serif" }}>{filtered.length} results</p>
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl px-3 py-1.5 bg-white"
            style={{ fontFamily: "Inter,sans-serif" }}>
            <Filter size={13} className="text-[#8B6B00]" /> Filter
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={() => onAdd(p.id)} onInc={() => onInc(p.id)} onDec={() => onDec(p.id)} />
          ))}
        </div>
      </div>
      <FloatingCartCTA count={cartCount} total={total} onView={() => navigate("cart")} />
    </div>
  );
}

// ─── SCREEN: CATEGORIES ───────────────────────────────────────────────────────
function CategoriesScreen({ onBack, navigate }: { onBack: () => void; navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="All Categories" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8" style={{ scrollbarWidth: "none" }}>
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search categories…"
            className="w-full bg-white border border-gray-200 text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none"
            style={{ fontFamily: "Inter,sans-serif" }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => navigate("products")}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 active:scale-[0.98] transition-transform text-left">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0" style={{ background: c.color }}>
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight" style={{ fontFamily: "Poppins,sans-serif" }}>{c.name}</p>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{c.count} products</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: CART ─────────────────────────────────────────────────────────────
function CartScreen({ products, onBack, navigate, onPlaceOrder }: {
  products: typeof PRODUCTS; onBack: () => void; navigate: (s: Screen) => void; onPlaceOrder: () => void;
}) {
  const items = products.filter((p) => p.inCart > 0);
  const sub = items.reduce((s, p) => s + p.mrp * p.inCart, 0);
  const saved = items.reduce((s, p) => s + p.discount * p.inCart, 0);
  const net = sub - saved;
  const delivery = net > 0 ? 40 : 0;
  const grand = net + delivery;

  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="Cart Details" subtitle={`${items.length} Products`} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-44" style={{ scrollbarWidth: "none" }}>

        {/* Deliver To */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
          <div className="flex items-start gap-3">
            <MapPin size={17} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Deliver to</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed" style={{ fontFamily: "Inter,sans-serif" }}>
                Sector 70 Noida, Noida-Greater Noida Expressway, Aniwas, 201310
              </p>
            </div>
            <button onClick={() => navigate("address")} className="text-[#8B6B00] text-xs font-bold flex-shrink-0" style={{ fontFamily: "Inter,sans-serif" }}>Change</button>
          </div>
        </div>

        {/* Offer nudge */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 px-4 py-3 flex items-center gap-3 mb-3">
          <Tag size={14} className="text-[#8B6B00]" />
          <p className="text-xs text-amber-800 flex-1" style={{ fontFamily: "Inter,sans-serif" }}>
            Add <span className="font-bold">₹2,350 more</span> to get <span className="font-bold">₹15 off</span>
          </p>
          <ChevronRight size={15} className="text-amber-600" />
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
              <ShoppingCart size={32} className="text-[#8B6B00]" />
            </div>
            <p className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Your cart is empty</p>
            <button onClick={() => navigate("products")} className="bg-[#8B6B00] text-white px-6 py-2.5 rounded-xl font-semibold text-sm" style={{ fontFamily: "Inter,sans-serif" }}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight" style={{ fontFamily: "Poppins,sans-serif" }}>{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{item.pack} · {item.weight}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>₹{item.price * item.inCart}</span>
                    <span className="text-xs text-gray-400 line-through" style={{ fontFamily: "Inter,sans-serif" }}>₹{item.mrp * item.inCart}</span>
                    <Pill variant="green">₹{item.discount} off</Pill>
                  </div>
                </div>
                <div className="flex items-end">
                  <Stepper qty={item.inCart} onInc={() => {}} onDec={() => {}} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scheme */}
        {items.length > 0 && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Award size={15} className="text-[#8B6B00]" />
              <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Active Scheme</p>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed" style={{ fontFamily: "Inter,sans-serif" }}>
              Place <span className="font-bold">25 more orders</span> with min. ₹3,000 each to get free products worth <span className="font-bold">₹552</span>
            </p>
            <div className="flex gap-2 mt-2.5">
              {["Luvit Eclairs", "Chingles Filz"].map((n) => (
                <div key={n} className="flex items-center gap-1.5 bg-white border border-amber-200 rounded-full px-2.5 py-1">
                  <span className="text-xs">🍬</span>
                  <span className="text-xs text-amber-800" style={{ fontFamily: "Inter,sans-serif" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bill */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-3">
            <h3 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>Bill Details</h3>
            {[
              { l: "Items total", v: `₹${sub}`, sub2: saved > 0 ? `Saved ₹${saved}` : undefined },
              { l: "Delivery charge", v: `₹${delivery}` },
              { l: "Handling charge", v: "₹0" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500" style={{ fontFamily: "Inter,sans-serif" }}>{r.l}</span>
                  {r.sub2 && <Pill variant="green">{r.sub2}</Pill>}
                </div>
                <span className="text-sm text-gray-700" style={{ fontFamily: "Inter,sans-serif" }}>{r.v}</span>
              </div>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Grand Total</span>
              <span className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>₹{grand}</span>
            </div>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex items-center gap-4">
          <div>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>Total</p>
            <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>₹{grand}</p>
          </div>
          <button onClick={onPlaceOrder}
            className="flex-1 bg-[#8B6B00] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform"
            style={{ fontFamily: "Poppins,sans-serif" }}>
            Place Order <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: OFFERS ───────────────────────────────────────────────────────────
function OffersScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Schemes", "Coupons", "Unlocked"];
  const filtered = OFFERS.filter((o) => {
    if (tab === "Schemes") return o.type === "scheme";
    if (tab === "Coupons") return o.type === "coupon";
    if (tab === "Unlocked") return o.unlocked;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <div className="sticky top-0 z-40 bg-[#8B6B00]">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <button onClick={onBack}><ArrowLeft size={20} className="text-white" /></button>
          <h1 className="text-white font-bold text-[15px] flex-1" style={{ fontFamily: "Poppins,sans-serif" }}>Offers & Schemes</h1>
          <Gift size={19} className="text-white" />
        </div>
        <div className="flex gap-1 px-4 pb-3">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("flex-1 py-1.5 rounded-full text-xs font-medium transition-colors", t === tab ? "bg-white text-[#8B6B00] font-bold" : "text-amber-200")}
              style={{ fontFamily: "Inter,sans-serif" }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8" style={{ scrollbarWidth: "none" }}>
        {/* Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex gap-4">
          {[{ label: "Active Schemes", value: "3", icon: "🎯" }, { label: "Unlocked Coupons", value: "2", icon: "🏷️" }, { label: "Potential Rewards", value: "₹1,028", icon: "💰" }].map((s) => (
            <div key={s.label} className="flex-1 flex flex-col items-center gap-1 text-center">
              <span className="text-lg">{s.icon}</span>
              <span className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{s.value}</span>
              <span className="text-[10px] text-gray-400 leading-tight" style={{ fontFamily: "Inter,sans-serif" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((o) => {
            const pct = Math.min(100, Math.round((o.progress / o.target) * 100));
            return (
              <div key={o.id} className={cn("bg-white rounded-2xl border p-4 shadow-sm", o.unlocked ? "border-green-200 bg-green-50" : "border-gray-100")}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-mono text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-lg bg-gray-50">{o.code}</span>
                      <Pill variant={o.type === "scheme" ? "amber" : "blue"}>{o.type === "scheme" ? "Scheme" : "Coupon"}</Pill>
                      {o.unlocked && <Pill variant="green">✓ Unlocked</Pill>}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{o.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{o.desc}</p>
                  </div>
                  <span className="text-2xl ml-2">{o.unlocked ? "🎉" : "🎁"}</span>
                </div>
                {!o.unlocked && (
                  <>
                    <div className="bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
                      <div className="bg-[#8B6B00] h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>{o.progress}/{o.target} orders</span>
                      <span className="text-xs font-semibold text-[#8B6B00]" style={{ fontFamily: "Inter,sans-serif" }}>{o.target - o.progress} more to unlock</span>
                    </div>
                  </>
                )}
                <div className="mt-3 bg-amber-50 rounded-xl px-3 py-2 flex items-center gap-2">
                  <Gift size={13} className="text-[#8B6B00] flex-shrink-0" />
                  <p className="text-xs text-amber-800" style={{ fontFamily: "Inter,sans-serif" }}>Reward: {o.reward}</p>
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
function DrawerScreen({ onClose, navigate }: { onClose: () => void; navigate: (s: Screen) => void }) {
  const groups = [
    { title: "Account", items: [{ icon: User, label: "My Account", s: "address" as Screen }, { icon: MapPin, label: "Manage Address", s: "address" as Screen }] },
    { title: "Shop", items: [{ icon: Award, label: "All Brands", s: "products" as Screen }, { icon: Grid3X3, label: "Categories", s: "categories" as Screen }, { icon: Tag, label: "Offers & Schemes", s: "offers" as Screen }] },
    { title: "Orders", items: [{ icon: Package, label: "My Orders", s: "orders" as Screen }, { icon: Truck, label: "Deliveries", s: "deliveries" as Screen }, { icon: FileText, label: "Invoices", s: "invoices" as Screen }] },
    { title: "Support", items: [{ icon: Phone, label: "Calling Slot", s: "calling-slot" as Screen }, { icon: HelpCircle, label: "Help & Support", s: "help" as Screen }, { icon: Globe, label: "Language", s: "language" as Screen }, { icon: BookOpen, label: "Terms & Conditions", s: "help" as Screen }] },
  ];

  return (
    <div className="flex h-full">
      <div className="w-[300px] bg-white flex flex-col overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Profile */}
        <div className="bg-[#8B6B00] px-5 pt-10 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-700 flex items-center justify-center border-2 border-amber-400">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-[15px]" style={{ fontFamily: "Poppins,sans-serif" }}>RishitTest</h2>
              <p className="text-amber-200 text-sm" style={{ fontFamily: "Inter,sans-serif" }}>+91 80765 13921</p>
              <p className="text-amber-300 text-xs mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>Retailer · Noida</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ l: "Orders", v: "48" }, { l: "Savings", v: "₹2.4k" }, { l: "Schemes", v: "3" }].map((s) => (
              <div key={s.l} className="bg-amber-700 rounded-xl p-2 text-center">
                <p className="text-white text-sm font-bold" style={{ fontFamily: "Poppins,sans-serif" }}>{s.v}</p>
                <p className="text-amber-300 text-[11px]" style={{ fontFamily: "Inter,sans-serif" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-3 py-4 flex flex-col gap-4">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5" style={{ fontFamily: "Inter,sans-serif" }}>{g.title}</p>
              {g.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} onClick={() => { onClose(); navigate(item.s); }}
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-left">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-[#8B6B00]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 flex-1" style={{ fontFamily: "Inter,sans-serif" }}>{item.label}</span>
                    <ChevronRight size={13} className="text-gray-300" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="px-3 pb-8">
          <button className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-red-500 w-full hover:bg-red-50">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><LogOut size={15} className="text-red-400" /></div>
            <span className="text-sm font-medium" style={{ fontFamily: "Inter,sans-serif" }}>Sign Out</span>
          </button>
        </div>
      </div>
      <div className="flex-1 bg-black/40" onClick={onClose} />
    </div>
  );
}

// ─── SCREEN: CALLING SLOT ─────────────────────────────────────────────────────
function CallingSlotScreen({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState<string | null>(null);
  const groups: Record<string, string[]> = {
    "Morning": ["09:00 – 09:30 AM", "09:30 – 10:00 AM", "10:00 – 10:30 AM", "10:30 – 11:00 AM", "11:00 – 11:30 AM", "11:30 AM – 12:00 PM"],
    "Afternoon": ["12:00 – 12:30 PM", "12:30 – 01:00 PM", "01:00 – 01:30 PM", "01:30 – 02:00 PM", "02:00 – 02:30 PM", "02:30 – 03:00 PM"],
    "Evening": ["03:00 – 03:30 PM", "03:30 – 04:00 PM", "04:00 – 04:30 PM", "04:30 – 05:00 PM", "05:00 – 05:30 PM", "05:30 – 06:00 PM"],
  };
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="Calling Slot" subtitle="Schedule your support call" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28" style={{ scrollbarWidth: "none" }}>
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-5 flex items-center gap-3">
          <Phone size={17} className="text-[#8B6B00] flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Support Available</p>
            <p className="text-xs text-gray-500" style={{ fontFamily: "Inter,sans-serif" }}>Mon–Sat · 9:00 AM to 6:00 PM</p>
          </div>
        </div>
        {Object.entries(groups).map(([period, slots]) => (
          <div key={period} className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={13} className="text-[#8B6B00]" />
              <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{period} slots</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button key={s} onClick={() => setSel(s)}
                  className={cn("py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors", sel === s ? "bg-[#8B6B00] text-white border-[#8B6B00]" : "bg-white text-gray-700 border-gray-200 hover:border-[#8B6B00]")}
                  style={{ fontFamily: "Inter,sans-serif" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <button className={cn("w-full py-3.5 rounded-2xl font-bold text-sm transition-all", sel ? "bg-[#8B6B00] text-white shadow-lg" : "bg-gray-100 text-gray-400")}
          style={{ fontFamily: "Poppins,sans-serif" }}>
          {sel ? `Confirm: ${sel}` : "Select a Time Slot"}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: SIGNUP ───────────────────────────────────────────────────────────
function SignupScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="flex-1 flex flex-col px-6 pt-14">
        <div className="w-12 h-12 rounded-2xl bg-[#8B6B00] flex items-center justify-center mb-6">
          <span className="text-xl font-bold text-white" style={{ fontFamily: "Poppins,sans-serif" }}>O2R</span>
        </div>

        {step === 1 && <><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Welcome back!</h1><p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "Inter,sans-serif" }}>Sign in to manage your orders</p></>}
        {step === 2 && <><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Verify OTP</h1><p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "Inter,sans-serif" }}>Sent to +91 {phone}</p></>}
        {step === 3 && <><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Your Business</h1><p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "Inter,sans-serif" }}>Tell us about your shop</p></>}

        <div className="flex gap-2 my-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={cn("h-1.5 rounded-full flex-1 transition-colors", s <= step ? "bg-[#8B6B00]" : "bg-gray-200")} />
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block" style={{ fontFamily: "Inter,sans-serif" }}>Mobile Number</label>
              <div className="flex gap-2">
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 flex items-center gap-2 text-sm" style={{ fontFamily: "Inter,sans-serif" }}>
                  <span>🇮🇳</span><span>+91</span>
                </div>
                <input type="tel" placeholder="Enter mobile number" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B6B00]" style={{ fontFamily: "Inter,sans-serif" }} />
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-[#8B6B00] text-white py-3.5 rounded-2xl font-bold text-sm mt-2" style={{ fontFamily: "Poppins,sans-serif" }}>
              Send OTP
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-4 block" style={{ fontFamily: "Inter,sans-serif" }}>Enter 4-digit OTP</label>
              <div className="flex gap-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <input key={i} ref={(el) => (refs.current[i] = el)} type="text" maxLength={1} value={otp[i]}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^\d?$/.test(v)) {
                        const n = [...otp]; n[i] = v; setOtp(n);
                        if (v && i < 3) refs.current[i + 1]?.focus();
                      }
                    }}
                    className="w-14 h-14 border-2 border-gray-200 rounded-2xl text-center text-xl font-bold outline-none focus:border-[#8B6B00]"
                    style={{ fontFamily: "Poppins,sans-serif" }} />
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-3" style={{ fontFamily: "Inter,sans-serif" }}>
                Didn't receive? <button className="text-[#8B6B00] font-bold">Resend OTP</button>
              </p>
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-[#8B6B00] text-white py-3.5 rounded-2xl font-bold text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>Verify OTP</button>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            {[{ l: "Shop Name", ph: "e.g. Sharma General Store" }, { l: "Owner Name", ph: "Full name" }, { l: "GST Number (optional)", ph: "Enter GST number" }].map((f) => (
              <div key={f.l}>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block" style={{ fontFamily: "Inter,sans-serif" }}>{f.l}</label>
                <input type="text" placeholder={f.ph} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B6B00]" style={{ fontFamily: "Inter,sans-serif" }} />
              </div>
            ))}
            <button className="w-full bg-[#8B6B00] text-white py-3.5 rounded-2xl font-bold text-sm mt-2" style={{ fontFamily: "Poppins,sans-serif" }}>Get Started →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: ADDRESS ──────────────────────────────────────────────────────────
function AddressScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="Delivery Address" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28" style={{ scrollbarWidth: "none" }}>
        <div className="h-44 rounded-2xl overflow-hidden relative mb-4 bg-gray-200">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&h=300&fit=crop&auto=format" alt="map" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#8B6B00] rounded-full p-3 shadow-xl"><MapPin size={20} className="text-white" /></div>
          </div>
          <button className="absolute bottom-3 right-3 bg-white text-[#8B6B00] text-xs font-bold px-3 py-1.5 rounded-xl shadow" style={{ fontFamily: "Inter,sans-serif" }}>
            Use current location
          </button>
        </div>
        {[{ l: "Shop/Building Name", ph: "e.g. Sharma General Store" }, { l: "Street Address", ph: "House no., street name" }, { l: "Area / Locality", ph: "Area, colony name" }, { l: "City", ph: "City" }, { l: "PIN Code", ph: "6-digit PIN code" }, { l: "State", ph: "State" }].map((f) => (
          <div key={f.l} className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block" style={{ fontFamily: "Inter,sans-serif" }}>{f.l}</label>
            <input type="text" placeholder={f.ph} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B6B00]" style={{ fontFamily: "Inter,sans-serif" }} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <button className="w-full bg-[#8B6B00] text-white py-3.5 rounded-2xl font-bold text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>Save Address</button>
      </div>
    </div>
  );
}

// ─── SCREEN: ORDERS ───────────────────────────────────────────────────────────
function OrdersScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Active", "Delivered", "Cancelled"];
  const filtered = ORDERS.filter((o) => {
    if (tab === "Active") return o.status === "out for delivery";
    if (tab === "Delivered") return o.status === "delivered";
    if (tab === "Cancelled") return o.status === "cancelled";
    return true;
  });
  const badgeV: Record<string, string> = { delivered: "green", "out for delivery": "amber", cancelled: "red" };

  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <div className="sticky top-0 z-40 bg-[#8B6B00]">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <button onClick={onBack}><ArrowLeft size={20} className="text-white" /></button>
          <h1 className="text-white font-bold text-[15px] flex-1" style={{ fontFamily: "Poppins,sans-serif" }}>My Orders</h1>
        </div>
        <div className="flex gap-1 px-4 pb-3">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("flex-1 py-1.5 rounded-full text-xs font-medium", t === tab ? "bg-white text-[#8B6B00] font-bold" : "text-amber-200")}
              style={{ fontFamily: "Inter,sans-serif" }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        {filtered.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{o.id}</p>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{o.date}</p>
              </div>
              <Pill variant={badgeV[o.status] || "gray"}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</Pill>
            </div>
            <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 my-2">
              <div className="flex items-center gap-1.5"><Package size={13} className="text-gray-400" /><span className="text-sm text-gray-700" style={{ fontFamily: "Inter,sans-serif" }}>{o.items} items</span></div>
              <div className="flex items-center gap-1.5"><CreditCard size={13} className="text-gray-400" /><span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>₹{o.total}</span></div>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600" style={{ fontFamily: "Inter,sans-serif" }}>View Details</button>
              {o.status === "delivered" && <button className="flex-1 border border-[#8B6B00] rounded-xl py-2 text-xs font-semibold text-[#8B6B00]" style={{ fontFamily: "Inter,sans-serif" }}>Reorder</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: DELIVERIES ───────────────────────────────────────────────────────
function DeliveriesScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="Deliveries" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: "none" }}>
        {DELIVERIES.map((d) => (
          <div key={d.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {d.status === "out for delivery" && (
              <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center gap-2">
                <Zap size={13} className="text-amber-600" />
                <span className="text-xs font-semibold text-amber-800" style={{ fontFamily: "Inter,sans-serif" }}>Out for delivery today</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{d.orderId}</p>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{d.date}</p>
                </div>
                <Pill variant={d.status === "delivered" ? "green" : "amber"}>{d.status === "delivered" ? "Delivered" : "En Route"}</Pill>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 mb-3">
                <Clock size={13} className="text-gray-400" /><span className="text-xs text-gray-700" style={{ fontFamily: "Inter,sans-serif" }}>{d.eta}</span>
              </div>
              {d.status === "out for delivery" && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><User size={13} className="text-green-700" /></div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-800" style={{ fontFamily: "Inter,sans-serif" }}>{d.driver}</p>
                    <p className="text-[11px] text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>Delivery Partner</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center"><Phone size={13} className="text-white" /></button>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600" style={{ fontFamily: "Inter,sans-serif" }}>Track Order</button>
                <button className="flex-1 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600" style={{ fontFamily: "Inter,sans-serif" }}>View Invoice</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: INVOICES ─────────────────────────────────────────────────────────
function InvoicesScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="Invoices" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>Total Paid</p>
            <p className="text-xl font-bold text-gray-900 mt-1" style={{ fontFamily: "Poppins,sans-serif" }}>₹9,351</p>
            <p className="text-xs text-green-600 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>All cleared</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>GST Paid</p>
            <p className="text-xl font-bold text-gray-900 mt-1" style={{ fontFamily: "Poppins,sans-serif" }}>₹771</p>
            <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>3 invoices</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{inv.orderId}</p>
                  <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{inv.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>{inv.date}</p>
                </div>
                <Pill variant="green">Paid</Pill>
              </div>
              <div className="flex flex-col gap-1.5 py-3 border-t border-b border-gray-100 my-2">
                {[{ l: "Subtotal", v: `₹${inv.amount}` }, { l: "GST", v: `₹${inv.gst}` }].map((r) => (
                  <div key={r.l} className="flex justify-between">
                    <span className="text-xs text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>{r.l}</span>
                    <span className="text-xs text-gray-700" style={{ fontFamily: "Inter,sans-serif" }}>{r.v}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Total</span>
                  <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>₹{inv.total}</span>
                </div>
              </div>
              <button className="w-full border border-[#8B6B00] rounded-xl py-2 text-xs font-bold text-[#8B6B00] flex items-center justify-center gap-2" style={{ fontFamily: "Inter,sans-serif" }}>
                <FileText size={12} /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: LANGUAGE ─────────────────────────────────────────────────────────
function LanguageScreen({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState("English");
  const langs = [
    { n: "English", nat: "English", f: "🇬🇧" },
    { n: "Hindi", nat: "हिन्दी", f: "🇮🇳" },
    { n: "Marathi", nat: "मराठी", f: "🇮🇳" },
    { n: "Tamil", nat: "தமிழ்", f: "🇮🇳" },
    { n: "Telugu", nat: "తెలుగు", f: "🇮🇳" },
    { n: "Gujarati", nat: "ગુજરાતી", f: "🇮🇳" },
    { n: "Bengali", nat: "বাংলা", f: "🇮🇳" },
    { n: "Kannada", nat: "ಕನ್ನಡ", f: "🇮🇳" },
  ];
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <div className="sticky top-0 z-40 bg-[#8B6B00] px-4 py-3.5">
        <div className="flex items-center gap-3">
          <button onClick={onBack}><ArrowLeft size={20} className="text-white" /></button>
          <div>
            <h1 className="text-white font-bold text-[15px]" style={{ fontFamily: "Poppins,sans-serif" }}>App Language</h1>
            <p className="text-amber-200 text-xs" style={{ fontFamily: "Inter,sans-serif" }}>ऐप भाषा चुनें</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28 flex flex-col gap-2" style={{ scrollbarWidth: "none" }}>
        <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "Inter,sans-serif" }}>Select your preferred language</p>
        {langs.map((l) => (
          <button key={l.n} onClick={() => setSel(l.n)}
            className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-colors w-full text-left", sel === l.n ? "border-[#8B6B00] bg-amber-50" : "border-gray-200 bg-white")}>
            <span className="text-2xl">{l.f}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>{l.n}</p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Inter,sans-serif" }}>{l.nat}</p>
            </div>
            {sel === l.n && <div className="w-6 h-6 rounded-full bg-[#8B6B00] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <button className="w-full bg-[#8B6B00] text-white py-3.5 rounded-2xl font-bold text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>Continue with {sel}</button>
      </div>
    </div>
  );
}

// ─── SCREEN: HELP ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="text-sm font-medium text-gray-800 flex-1 pr-3" style={{ fontFamily: "Inter,sans-serif" }}>{q}</span>
        <ChevronDown size={15} className={cn("text-gray-400 flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-4 pb-4"><p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "Inter,sans-serif" }}>{a}</p></div>}
    </div>
  );
}

function HelpScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title="Help & Support" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Call Support Hotline</p>
            <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter,sans-serif" }}>Mon–Sat · 10 AM to 6 PM</p>
            <p className="text-base font-bold text-[#8B6B00] mt-2" style={{ fontFamily: "Poppins,sans-serif" }}>8268 263 232</p>
          </div>
          <button className="bg-[#8B6B00] text-white px-4 py-2.5 rounded-xl font-bold text-sm" style={{ fontFamily: "Inter,sans-serif" }}>Call Us</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ icon: MessageSquare, l: "Live Chat", c: "#EFF6FF" }, { icon: FileText, l: "Raise Ticket", c: "#FEF9EE" }, { icon: BookOpen, l: "Guide", c: "#F0FDF4" }].map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.l} className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col items-center gap-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.c }}><Icon size={17} className="text-[#8B6B00]" /></div>
                <span className="text-xs font-medium text-gray-700 text-center" style={{ fontFamily: "Inter,sans-serif" }}>{a.l}</span>
              </button>
            );
          })}
        </div>
        <h2 className="text-sm font-bold text-gray-900 mt-1" style={{ fontFamily: "Poppins,sans-serif" }}>Frequently Asked Questions</h2>
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

// ─── SCREEN: STATES ───────────────────────────────────────────────────────────
function StateScreen({ type, onBack, onRetry }: { type: "loading" | "empty" | "error"; onBack: () => void; onRetry?: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9FAFB]">
      <SubHeader title={type === "loading" ? "Loading" : type === "empty" ? "No Results" : "Error"} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5">
        {type === "loading" && (
          <>
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
              <Loader2 size={36} className="text-[#8B6B00] animate-spin" />
            </div>
            <div className="text-center">
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Loading your data</h2>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "Inter,sans-serif" }}>Please wait a moment…</p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#8B6B00]"
                  style={{ animation: `dotbounce 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </>
        )}
        {type === "empty" && (
          <>
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl">📦</div>
            <div className="text-center">
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>No products found</h2>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "Inter,sans-serif" }}>Try a different category or search term</p>
            </div>
            <button onClick={onBack} className="bg-[#8B6B00] text-white px-6 py-2.5 rounded-xl font-bold text-sm" style={{ fontFamily: "Inter,sans-serif" }}>Browse All Products</button>
          </>
        )}
        {type === "error" && (
          <>
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <div className="text-center">
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins,sans-serif" }}>Connection error</h2>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "Inter,sans-serif" }}>Check your internet and try again</p>
            </div>
            <div className="flex gap-3">
              <button onClick={onBack} className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm" style={{ fontFamily: "Inter,sans-serif" }}>Go Back</button>
              <button onClick={onRetry} className="bg-[#8B6B00] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2" style={{ fontFamily: "Inter,sans-serif" }}>
                <RefreshCw size={13} /> Retry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TABS: Screen[] = ["home", "categories", "cart", "offers", "orders"];
const ALL_SCREENS: Screen[] = ["home", "products", "categories", "cart", "offers", "drawer", "calling-slot", "signup", "address", "orders", "deliveries", "invoices", "language", "help", "loading", "empty", "error"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [prev, setPrev] = useState<Screen>("home");
  const [products, setProducts] = useState(PRODUCTS);

  const go = (s: Screen) => { setPrev(screen); setScreen(s); };
  const back = () => setScreen(prev === screen ? "home" : prev);

  const add = (id: number) => setProducts((ps) => ps.map((p) => p.id === id ? { ...p, inCart: 1 } : p));
  const inc = (id: number) => setProducts((ps) => ps.map((p) => p.id === id ? { ...p, inCart: p.inCart + 1 } : p));
  const dec = (id: number) => setProducts((ps) => ps.map((p) => p.id === id ? { ...p, inCart: Math.max(0, p.inCart - 1) } : p));

  const cartCount = products.reduce((s, p) => s + p.inCart, 0);
  const showNav = TABS.includes(screen);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center" style={{ fontFamily: "Inter,sans-serif" }}>
      {/* Screen Picker */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-gray-900 flex gap-1 p-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {ALL_SCREENS.map((s) => (
          <button key={s} onClick={() => go(s)}
            className={cn("flex-shrink-0 px-2 py-1 rounded text-[11px] font-mono transition-colors", screen === s ? "bg-amber-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600")}>
            {s}
          </button>
        ))}
      </div>

      {/* Phone Frame */}
      <div className="relative mt-10 rounded-[40px] border-4 border-gray-800 shadow-2xl overflow-hidden bg-[#F9FAFB]"
        style={{ width: 390, height: "calc(100vh - 56px)", maxHeight: 844 }}>
        <div className="w-full h-full flex flex-col overflow-hidden">
          {/* Screen */}
          <div className={cn("flex-1 overflow-hidden relative", screen === "drawer" ? "flex" : "overflow-y-auto")}
            style={{ scrollbarWidth: "none" }}>
            {screen === "home" && <HomeScreen products={products} navigate={go} cartCount={cartCount} onAdd={add} onInc={inc} onDec={dec} />}
            {screen === "products" && <ProductsScreen products={products} onBack={back} navigate={go} cartCount={cartCount} onAdd={add} onInc={inc} onDec={dec} />}
            {screen === "categories" && <CategoriesScreen onBack={back} navigate={go} />}
            {screen === "cart" && <CartScreen products={products} onBack={back} navigate={go} onPlaceOrder={() => go("orders")} />}
            {screen === "offers" && <OffersScreen onBack={back} />}
            {screen === "drawer" && <DrawerScreen onClose={back} navigate={go} />}
            {screen === "calling-slot" && <CallingSlotScreen onBack={back} />}
            {screen === "signup" && <SignupScreen onBack={back} />}
            {screen === "address" && <AddressScreen onBack={back} />}
            {screen === "orders" && <OrdersScreen onBack={back} />}
            {screen === "deliveries" && <DeliveriesScreen onBack={back} />}
            {screen === "invoices" && <InvoicesScreen onBack={back} />}
            {screen === "language" && <LanguageScreen onBack={back} />}
            {screen === "help" && <HelpScreen onBack={back} />}
            {screen === "loading" && <StateScreen type="loading" onBack={back} />}
            {screen === "empty" && <StateScreen type="empty" onBack={back} />}
            {screen === "error" && <StateScreen type="error" onBack={back} onRetry={() => go("home")} />}
          </div>

          {showNav && <BottomNav active={screen} onChange={go} cartCount={cartCount} />}
        </div>
      </div>

      <style>{`
        @keyframes dotbounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        *::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
