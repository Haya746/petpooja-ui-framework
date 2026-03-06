"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Bell, ShoppingBag,
  Star, Zap, AlertCircle, Info, CheckCircle, Menu, ArrowUp,
  TrendingUp, TrendingDown,
  Mic, MicOff, PhoneCall, PhoneOff, Volume2, Brain, BarChart3,
  DollarSign, Target, Lightbulb, MessageSquare, Languages,
  ShoppingCart, ChefHat, Layers, Activity, ArrowRight, Play,
  RefreshCw, Hash, Percent, Award, AlertTriangle
} from "lucide-react";
import { Hero } from "@/components/ui/animated-hero";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// ─── Hooks ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Section Wrapper ────────────────────────────────────────────────────────
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children, sub, accent }: { children: React.ReactNode; sub?: string; accent?: string }) {
  return (
    <div className="mb-10 text-center">
      {accent && (
        <span className="inline-block bg-[#DA291C] text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] mb-3 uppercase tracking-wider">
          {accent}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-black text-[var(--pp-black)] dark:text-white mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
        {children}
      </h2>
      {sub && <p className="text-[var(--pp-muted)] dark:text-[#aaa] text-lg font-medium mt-1 max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    const links = [
      { href: "#ai-copilot", label: "AI Copilot" },
      { href: "#revenue-engine", label: "Revenue Engine" },
      { href: "#voice-copilot", label: "Voice AI" },
      { href: "#components", label: "Buttons" },
      { href: "#palette", label: "Colors" },
      { href: "#typography", label: "Typography" },
      { href: "#motion", label: "Motion" },
    ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur shadow-lg border-b-2 border-[#1A1A1A]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#DA291C] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0_#1A1A1A] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
              <span className="text-white font-black text-sm" style={{ fontFamily: "'Fredoka One', cursive" }}>P</span>
            </div>
            <span className="font-black text-xl text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>PetPooja</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="px-3 py-2 rounded-xl font-semibold text-xs text-[#1A1A1A] dark:text-white hover:bg-[#FFC72C] hover:text-[#1A1A1A] transition-all border-2 border-transparent hover:border-[#1A1A1A]">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="flex items-center gap-2 bg-[#FFC72C] text-[#1A1A1A] font-bold px-3 py-2 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline">{dark ? "Day Menu" : "Night Menu"}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl border-2 border-[#1A1A1A] dark:border-white bg-white dark:bg-[#1A1A1A]"
            >
              <Menu className="w-4 h-4 text-[#1A1A1A] dark:text-white" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t-2 border-[#1A1A1A] dark:border-white"
            >
              <div className="py-3 flex flex-col gap-1">
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 font-semibold text-[#1A1A1A] dark:text-white hover:bg-[#FFC72C] rounded-xl transition-all">
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ─── AI Copilot Overview Section ─────────────────────────────────────────────
function AICopilotOverview() {
  const problems = [
    { icon: <TrendingDown className="w-5 h-5" />, text: "Identify high-margin but low-selling menu items" },
    { icon: <AlertTriangle className="w-5 h-5" />, text: "Detect underperforming SKUs reducing overall profitability" },
    { icon: <Layers className="w-5 h-5" />, text: "Classify items by contribution margin & popularity" },
    { icon: <DollarSign className="w-5 h-5" />, text: "Recommend price optimization strategies" },
    { icon: <ShoppingCart className="w-5 h-5" />, text: "Suggest intelligent combos to increase AOV" },
    { icon: <Mic className="w-5 h-5" />, text: "Automate phone-based order taking via AI voice" },
    { icon: <Zap className="w-5 h-5" />, text: "Enable real-time AI-driven upselling during calls" },
    { icon: <Languages className="w-5 h-5" />, text: "Support multi-language ordering — English, Hindi, Hinglish" },
  ];

  const modules = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Revenue Intelligence Engine",
      desc: "Menu profitability analysis, contribution margin calc, sales velocity scoring & smart combo recommendations.",
      color: "bg-[#DA291C]",
      href: "#revenue-engine",
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "AI Voice Ordering Copilot",
      desc: "Natural language order capture, multi-language NLU, real-time upsell engine & direct PoS integration.",
      color: "bg-[#FFC72C] text-[#1A1A1A]",
      href: "#voice-copilot",
    },
  ];

  return (
    <section id="ai-copilot" className="py-24 px-4 bg-[var(--pp-bg)] relative overflow-hidden">
      {/* decorative arch bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-[0.03]" viewBox="0 0 800 400" fill="none">
          <path d="M400 380 C200 380 60 280 60 180 C60 80 200 10 400 10 C600 10 740 80 740 180 C740 280 600 380 400 380Z" fill="#FFC72C" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Section>
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 bg-[#1A1A1A] dark:bg-[#FFC72C] text-[#FFC72C] dark:text-[#1A1A1A] text-xs font-bold px-4 py-2 rounded-full border-2 border-[#FFC72C] dark:border-[#1A1A1A] shadow-[3px_3px_0_#DA291C] mb-4">
              <Brain className="w-4 h-4" /> AI-Powered Platform
            </span>
          </div>
          <SectionTitle sub="Restaurants generate massive volumes of transactional data through their PoS systems. Most businesses fail to leverage this data to optimize profitability and automate revenue-enhancing interactions.">
            Revenue & Voice Copilot
          </SectionTitle>
        </Section>

        {/* Core Modules cards */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {modules.map((m) => (
              <motion.a
                key={m.title}
                href={m.href}
                className={`relative group pp-card border-2 border-[#1A1A1A] flex gap-5 items-start cursor-pointer no-underline`}
                whileHover={{ y: -6, boxShadow: "6px 6px 0px #1A1A1A" }}
                style={{ boxShadow: "3px 3px 0px #1A1A1A" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`w-16 h-16 rounded-2xl border-2 border-[#1A1A1A] flex items-center justify-center flex-shrink-0 text-white ${m.color}`}>
                  {m.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-xl text-[#1A1A1A] dark:text-white mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
                    {m.title}
                  </h3>
                  <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">{m.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#DA291C] flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            ))}
          </div>
        </Section>

        {/* Problem Statement */}
        <Section>
          <div className="pp-card border-2 border-[#1A1A1A] mb-6" style={{ boxShadow: "4px 4px 0px #DA291C" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#DA291C] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Problem Statement
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#f9f9f9] dark:bg-[#222] border border-[#eee] dark:border-[#333] hover:border-[#DA291C] transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[#DA291C] flex-shrink-0 mt-0.5">{p.icon}</span>
                  <span className="text-sm font-medium text-[#1A1A1A] dark:text-[#ddd] leading-snug">{p.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Revenue Intelligence Engine ─────────────────────────────────────────────
type QuadrantKey = "star" | "plow" | "puzzle" | "dog";

const menuItems = [
  { name: "McSpicy Burger", price: 299, cost: 95, sales: 420, category: "Burgers" },
  { name: "Veg Maharaja Mac", price: 249, cost: 72, sales: 310, category: "Burgers" },
  { name: "Classic Fries (L)", price: 149, cost: 28, sales: 680, category: "Sides" },
  { name: "Choco Shake", price: 179, cost: 55, sales: 190, category: "Beverages" },
  { name: "McFlurry Oreo", price: 139, cost: 48, sales: 95, category: "Desserts" },
  { name: "Chicken McNuggets", price: 219, cost: 78, sales: 340, category: "Mains" },
  { name: "Hot & Spicy Wrap", price: 199, cost: 65, sales: 120, category: "Mains" },
  { name: "Filet-O-Fish", price: 229, cost: 88, sales: 75, category: "Burgers" },
  { name: "McAloo Tikki", price: 99, cost: 22, sales: 580, category: "Burgers" },
  { name: "Apple Pie", price: 69, cost: 18, sales: 210, category: "Desserts" },
];

function RevenueEngineSection({ addToast }: { addToast: (msg: string, type: "success" | "error" | "info") => void }) {
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [activeQuadrant, setActiveQuadrant] = useState<QuadrantKey | null>(null);
  const [showCombos, setShowCombos] = useState(false);

  const enriched = menuItems.map(item => {
    const margin = item.price - item.cost;
    const marginPct = ((margin / item.price) * 100);
    const avgSales = menuItems.reduce((a, b) => a + b.sales, 0) / menuItems.length;
    const avgMarginPct = menuItems.reduce((a, b) => a + ((b.price - b.cost) / b.price) * 100, 0) / menuItems.length;
    const isHighMargin = marginPct >= avgMarginPct;
    const isHighSales = item.sales >= avgSales;
    let quadrant: QuadrantKey;
    if (isHighMargin && isHighSales) quadrant = "star";
    else if (!isHighMargin && isHighSales) quadrant = "plow";
    else if (isHighMargin && !isHighSales) quadrant = "puzzle";
    else quadrant = "dog";
    return { ...item, margin, marginPct: Math.round(marginPct), quadrant, revenue: item.price * item.sales };
  });

  const quadrantInfo: Record<QuadrantKey, { label: string; color: string; bgColor: string; desc: string; action: string }> = {
    star: { label: "Stars ⭐", color: "text-[#FFC72C]", bgColor: "bg-[#FFC72C]/20 border-[#FFC72C]", desc: "High margin + High sales", action: "Promote actively" },
    plow: { label: "Cash Plows 🐄", color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-300", desc: "Low margin + High sales", action: "Optimize cost" },
    puzzle: { label: "Puzzles 🧩", color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-900/20 border-purple-300", desc: "High margin + Low sales", action: "Boost visibility" },
    dog: { label: "Dogs 🐕", color: "text-[#DA291C]", bgColor: "bg-[#DA291C]/10 border-[#DA291C]/40", desc: "Low margin + Low sales", action: "Reconsider / Remove" },
  };

  const combos = [
    { items: ["McSpicy Burger", "Classic Fries (L)", "Choco Shake"], savings: "₹47", lift: "+18% AOV", reason: "Top seller combo with high margin beverage" },
    { items: ["McAloo Tikki", "Classic Fries (L)", "Apple Pie"], savings: "₹29", lift: "+12% AOV", reason: "Budget-friendly value combo" },
    { items: ["Chicken McNuggets", "Hot & Spicy Wrap", "Choco Shake"], savings: "₹55", lift: "+22% AOV", reason: "Protein-heavy premium combo" },
  ];

  const totalRevenue = enriched.reduce((a, b) => a + b.revenue, 0);
  const avgMargin = Math.round(enriched.reduce((a, b) => a + b.marginPct, 0) / enriched.length);

  return (
    <section id="revenue-engine" className="py-24 px-4 bg-[var(--pp-bg)] checker-bg">
      <div className="max-w-6xl mx-auto">
        <Section>
          <SectionTitle
            accent="Module 1"
            sub="Contribution margin analysis, sales velocity scoring, and intelligent combo recommendations"
          >
            Revenue Intelligence Engine
          </SectionTitle>
        </Section>

        {/* KPI Strip */}
        <Section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Revenue", value: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: <DollarSign className="w-5 h-5" />, color: "bg-[#DA291C]" },
              { label: "Avg Margin", value: `${avgMargin}%`, icon: <Percent className="w-5 h-5" />, color: "bg-[#FFC72C]" },
              { label: "Menu Items", value: `${menuItems.length}`, icon: <Hash className="w-5 h-5" />, color: "bg-[#1A1A1A]" },
              { label: "Stars Found", value: `${enriched.filter(e => e.quadrant === "star").length}`, icon: <Award className="w-5 h-5" />, color: "bg-[#DA291C]" },
            ].map((kpi) => (
              <motion.div
                key={kpi.label}
                className="pp-card border-2 border-[#1A1A1A] text-center"
                whileHover={{ y: -4, boxShadow: "4px 4px 0px #1A1A1A" }}
                style={{ boxShadow: "2px 2px 0px #1A1A1A" }}
              >
                <div className={`w-10 h-10 ${kpi.color} rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center mx-auto mb-3 text-white`}>
                  {kpi.icon}
                </div>
                <div className="text-2xl font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  {kpi.value}
                </div>
                <div className="text-xs text-[#888] font-semibold mt-1">{kpi.label}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Item Profitability Table */}
        <Section>
          <div className="pp-card border-2 border-[#1A1A1A] mb-8" style={{ boxShadow: "4px 4px 0px #1A1A1A" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#DA291C] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Item-Level Profitability Analysis
              </h3>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm min-w-[580px]">
                <thead>
                  <tr className="border-b-2 border-[#1A1A1A] dark:border-[#444]">
                    {["Item", "Price", "Cost", "Margin", "Margin %", "Sales Vol", "Revenue", "Quadrant"].map(h => (
                      <th key={h} className="text-left px-3 py-2 font-bold text-[#888] dark:text-[#666] uppercase text-xs tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enriched.map((item, i) => {
                    const q = quadrantInfo[item.quadrant];
                    return (
                      <motion.tr
                        key={item.name}
                        className={`border-b border-[#f0f0f0] dark:border-[#2a2a2a] cursor-pointer transition-colors hover:bg-[#FFC72C]/5 ${selectedItem?.name === item.name ? "bg-[#FFC72C]/10 dark:bg-[#FFC72C]/5" : ""}`}
                        onClick={() => setSelectedItem(selectedItem?.name === item.name ? null : item)}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        viewport={{ once: true }}
                      >
                        <td className="px-3 py-2.5 font-semibold text-[#1A1A1A] dark:text-white">{item.name}</td>
                        <td className="px-3 py-2.5 text-[#1A1A1A] dark:text-[#ddd]">₹{item.price}</td>
                        <td className="px-3 py-2.5 text-[#1A1A1A] dark:text-[#ddd]">₹{item.cost}</td>
                        <td className="px-3 py-2.5 font-bold text-green-600">₹{item.margin}</td>
                        <td className="px-3 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${item.marginPct >= 60 ? "bg-green-100 text-green-700 border-green-300" : "bg-orange-100 text-orange-700 border-orange-300"}`}>
                            {item.marginPct}%
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 bg-[#f0f0f0] dark:bg-[#333] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-[#DA291C] rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(item.sales / 680) * 100}%` }}
                                transition={{ duration: 0.8, delay: i * 0.04 }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <span className="text-xs text-[#888]">{item.sales}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-[#1A1A1A] dark:text-[#ddd]">₹{(item.revenue / 1000).toFixed(0)}K</td>
                        <td className="px-3 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border-2 ${q.bgColor} ${q.color}`}>
                            {item.quadrant === "star" ? "⭐" : item.quadrant === "plow" ? "🐄" : item.quadrant === "puzzle" ? "🧩" : "🐕"}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* BCG-style Quadrant Matrix */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="pp-card border-2 border-[#1A1A1A]" style={{ boxShadow: "4px 4px 0px #1A1A1A" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#FFC72C] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[#1A1A1A]" />
                </div>
                <h3 className="text-lg font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Menu Quadrant Matrix
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(quadrantInfo) as QuadrantKey[]).map((key) => {
                  const q = quadrantInfo[key];
                  const items = enriched.filter(e => e.quadrant === key);
                  return (
                    <motion.button
                      key={key}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${activeQuadrant === key ? q.bgColor : "border-[#e0e0e0] dark:border-[#333]"}`}
                      onClick={() => setActiveQuadrant(activeQuadrant === key ? null : key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`font-black text-sm mb-1 ${q.color}`}>{q.label}</div>
                      <div className="text-xs text-[#888] dark:text-[#aaa] mb-2">{q.desc}</div>
                      <div className="text-xs font-bold text-[#1A1A1A] dark:text-[#ddd]">{items.length} items</div>
                      <div className="text-xs text-[#DA291C] font-semibold mt-1">→ {q.action}</div>
                    </motion.button>
                  );
                })}
              </div>
              <AnimatePresence>
                {activeQuadrant && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className={`rounded-xl p-3 border-2 ${quadrantInfo[activeQuadrant].bgColor}`}>
                      <p className={`text-xs font-bold mb-2 ${quadrantInfo[activeQuadrant].color}`}>
                        {quadrantInfo[activeQuadrant].label} items:
                      </p>
                      {enriched.filter(e => e.quadrant === activeQuadrant).map(e => (
                        <div key={e.name} className="text-xs text-[#1A1A1A] dark:text-[#ddd] py-0.5">
                          • {e.name} (₹{e.margin} margin, {e.sales} sales)
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Optimization */}
            <div className="pp-card border-2 border-[#1A1A1A]" style={{ boxShadow: "4px 4px 0px #1A1A1A" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#DA291C] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Price Optimization Signals
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { item: "McFlurry Oreo", current: 139, suggested: 159, reason: "High margin puzzle — raise price", trend: "up" },
                  { item: "Filet-O-Fish", current: 229, suggested: 199, reason: "Low sales dog — reduce price", trend: "down" },
                  { item: "Hot & Spicy Wrap", current: 199, suggested: 219, reason: "Underpriced for margin potential", trend: "up" },
                  { item: "McAloo Tikki", current: 99, suggested: 109, reason: "Star item — small price increase viable", trend: "up" },
                ].map((rec) => (
                  <div key={rec.item} className="flex items-center gap-3 p-3 rounded-xl bg-[#f9f9f9] dark:bg-[#222] border border-[#eee] dark:border-[#333]">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${rec.trend === "up" ? "bg-green-100 text-green-600" : "bg-[#DA291C]/10 text-[#DA291C]"}`}>
                      {rec.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#1A1A1A] dark:text-white truncate">{rec.item}</p>
                      <p className="text-xs text-[#888] dark:text-[#aaa] truncate">{rec.reason}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-[#888] line-through">₹{rec.current}</p>
                      <p className="text-sm font-black text-[#DA291C]">₹{rec.suggested}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Smart Combo Recommendations */}
        <Section>
          <div className="pp-card border-2 border-[#1A1A1A]" style={{ boxShadow: "4px 4px 0px #FFC72C" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#FFC72C] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[#1A1A1A]" />
                </div>
                <h3 className="text-xl font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Smart Combo Recommendations
                </h3>
              </div>
              <button
                onClick={() => { setShowCombos(true); addToast("Combo analysis complete!", "success"); }}
                className="pp-btn-primary text-xs py-2 px-3"
              >
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {combos.map((combo, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border-2 border-[#1A1A1A] overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: "4px 4px 0px #1A1A1A" }}
                  style={{ boxShadow: "2px 2px 0px #1A1A1A" }}
                >
                  <div className="bg-[#1A1A1A] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#FFC72C] font-bold text-xs uppercase tracking-wide">Combo {i + 1}</span>
                      <span className="bg-[#DA291C] text-white text-xs font-bold px-2 py-0.5 rounded-full">{combo.lift}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-[#2a2a2a]">
                    <div className="space-y-1.5 mb-3">
                      {combo.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-[#1A1A1A] dark:text-[#ddd]">
                          <span className="w-4 h-4 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#1A1A1A] font-black text-[10px] flex-shrink-0">{j + 1}</span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-dashed border-[#ccc] dark:border-[#444] pt-3">
                      <p className="text-xs text-[#888] dark:text-[#aaa] italic mb-2">{combo.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1A1A1A] dark:text-white">Customer saves</span>
                        <span className="text-sm font-black text-[#DA291C]">{combo.savings}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── AI Voice Ordering Copilot ───────────────────────────────────────────────
type OrderItem = { name: string; qty: number; price: number; modifier?: string };
type CallStage = "idle" | "greeting" | "ordering" | "upsell" | "confirm" | "done";

function VoiceCopilotSection({ addToast }: { addToast: (msg: string, type: "success" | "error" | "info") => void }) {
  const [callStage, setCallStage] = useState<CallStage>("idle");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [activeLanguage, setActiveLanguage] = useState("English");
  const [isMicActive, setIsMicActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Hindi", "Hinglish", "Tamil", "Telugu"];

  const conversationFlows: Record<string, {stage: CallStage; ai: string; user?: string}[]> = {
    English: [
      { stage: "greeting", ai: "Hello! Welcome to PetPooja. I'm your AI ordering assistant. What would you like to order today?" },
      { stage: "ordering", user: "I'd like a McSpicy Burger please", ai: "Great choice! McSpicy Burger added. Would you like it regular or extra spicy? Also, would you like to make it a combo with fries?" },
      { stage: "ordering", user: "Extra spicy, yes combo please", ai: "Perfect! McSpicy Burger (Extra Spicy) + Large Fries added. Can I get you a beverage to complete the meal?" },
      { stage: "upsell", user: "Just water is fine", ai: "🎯 Quick suggestion — our Choco Shake pairs amazingly with the McSpicy and it's only ₹45 more. Shall I add it?" },
      { stage: "confirm", user: "Sure, add the shake", ai: "Order confirmed! McSpicy Burger (XS) + Large Fries + Choco Shake = ₹497. Sending to kitchen now!" },
      { stage: "done", ai: "✅ KOT #PP-4821 created! Order will be ready in 12-15 minutes. Thank you!" },
    ],
    Hindi: [
      { stage: "greeting", ai: "नमस्ते! PetPooja में आपका स्वागत है। मैं आपका AI ऑर्डर असिस्टेंट हूं। आज आप क्या खाना चाहेंगे?" },
      { stage: "ordering", user: "मुझे एक McSpicy Burger चाहिए", ai: "बढ़िया! McSpicy Burger add हो गया। क्या आप इसे combo में लेना चाहेंगे fries के साथ?" },
      { stage: "upsell", user: "हाँ, combo दे दो", ai: "🎯 एक सुझाव — हमारा Choco Shake McSpicy के साथ बहुत अच्छा लगता है, और सिर्फ ₹45 extra! लेना है?" },
      { stage: "confirm", user: "ठीक है, add कर दो", ai: "ऑर्डर confirm! McSpicy Burger + Large Fries + Choco Shake = ₹497। किचन को भेज रहे हैं!" },
      { stage: "done", ai: "✅ KOT #PP-4821 तैयार! आपका ऑर्डर 12-15 मिनट में ready होगा। धन्यवाद!" },
    ],
    Hinglish: [
      { stage: "greeting", ai: "Hey! PetPooja mein aapka swagat hai! Main aapka AI ordering buddy hoon. Kya loge aaj?" },
      { stage: "ordering", user: "Yaar, ek McSpicy Burger dedo", ai: "Awesome pick! McSpicy add kar diya. Regular ya extra spicy? Aur combo banaoge fries ke saath?" },
      { stage: "upsell", user: "Extra spicy, haan combo chahiye", ai: "🎯 Suno — Choco Shake ke saath McSpicy ka combination ekdum hit hai! Sirf ₹45 extra. Le lo?" },
      { stage: "confirm", user: "Theek hai bhai, le lo", ai: "Done! McSpicy (XS) + Large Fries + Choco Shake = ₹497. Kitchen ko order bhej diya!" },
      { stage: "done", ai: "✅ KOT #PP-4821 ready! Tera order 12-15 min mein ready hoga. Thanks yaar!" },
    ],
  };

  const [chatMessages, setChatMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [flowIndex, setFlowIndex] = useState(0);

  const getFlow = () => conversationFlows[activeLanguage] ?? conversationFlows["English"];

  const startCall = () => {
    setCallStage("greeting");
    setIsMicActive(true);
    setOrder([]);
    setFlowIndex(0);
    setChatMessages([]);
    const flow = getFlow();
    if (flow[0]) {
      simulateAIMessage(flow[0].ai, 500);
    }
  };

  const simulateAIMessage = (text: string, delay: number) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { role: "ai", text }]);
    }, delay);
  };

  const handleNextStep = () => {
    const flow = getFlow();
    const nextIdx = flowIndex + 1;
    if (nextIdx >= flow.length) return;

    const step = flow[nextIdx];
    setFlowIndex(nextIdx);
    setCallStage(step.stage);

    // Add user message if present
    if (step.user) {
      setChatMessages(prev => [...prev, { role: "user", text: step.user! }]);
    }

    // Add AI response
    simulateAIMessage(step.ai, step.user ? 800 : 300);

    // Update order at relevant stages
    if (step.stage === "ordering" && nextIdx === 2) {
      setOrder([{ name: "McSpicy Burger (Extra Spicy)", qty: 1, price: 299, modifier: "Extra Spicy" }]);
    }
    if (step.stage === "ordering" && nextIdx === 3) {
      setOrder(prev => [...prev, { name: "Large Fries", qty: 1, price: 149 }]);
    }
    if (step.stage === "confirm") {
      setOrder(prev => [...prev, { name: "Choco Shake", qty: 1, price: 179 }]);
      addToast("Upsell accepted! +₹179 added to order", "success");
    }
    if (step.stage === "done") {
      setIsMicActive(false);
      setCallStage("done");
      addToast("KOT #PP-4821 created in PoS!", "success");
    }
  };

  const endCall = () => {
    setCallStage("idle");
    setIsMicActive(false);
    setOrder([]);
    setChatMessages([]);
    setFlowIndex(0);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const orderTotal = order.reduce((a, b) => a + b.price * b.qty, 0);

  const features = [
    { icon: <Volume2 className="w-4 h-4" />, label: "Speech-to-Text", desc: "Real-time voice capture" },
    { icon: <Brain className="w-4 h-4" />, label: "Intent Recognition", desc: "NLU with PoS mapping" },
    { icon: <Languages className="w-4 h-4" />, label: "Multi-Language", desc: "EN / HI / Hinglish + more" },
    { icon: <Zap className="w-4 h-4" />, label: "Live Upselling", desc: "Revenue engine powered" },
    { icon: <RefreshCw className="w-4 h-4" />, label: "Modifier Handling", desc: "Size, spice, add-ons" },
    { icon: <ShoppingCart className="w-4 h-4" />, label: "PoS Push", desc: "Auto KOT creation" },
  ];

  const stageLabels: Record<CallStage, string> = {
    idle: "Standby",
    greeting: "Greeting",
    ordering: "Taking Order",
    upsell: "AI Upsell",
    confirm: "Confirming",
    done: "Completed",
  };

  const stageColors: Record<CallStage, string> = {
    idle: "bg-[#888]",
    greeting: "bg-[#FFC72C]",
    ordering: "bg-blue-500",
    upsell: "bg-purple-500",
    confirm: "bg-green-500",
    done: "bg-[#DA291C]",
  };

  return (
    <section id="voice-copilot" className="py-24 px-4 bg-[var(--pp-bg)] arch-bg">
      <div className="max-w-6xl mx-auto">
        <Section>
          <SectionTitle
            accent="Module 2"
            sub="Natural language voice order capture with real-time upselling, multi-language support, and PoS integration"
          >
            AI Voice Ordering Copilot
          </SectionTitle>
        </Section>

        {/* Feature pills */}
        <Section>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a2a2a] rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] text-sm font-semibold text-[#1A1A1A] dark:text-white">
                <span className="text-[#DA291C]">{f.icon}</span>
                <span>{f.label}</span>
                <span className="text-[#888] text-xs">— {f.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Call Interface */}
          <Section className="lg:col-span-2">
            <div className="pp-card border-2 border-[#1A1A1A] h-full" style={{ boxShadow: "4px 4px 0px #1A1A1A" }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isMicActive ? "bg-green-400 animate-pulse" : "bg-[#888]"}`} />
                  <h3 className="text-xl font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
                    Voice Call Interface
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 ${stageColors[callStage]}`}>
                    {stageLabels[callStage]}
                  </span>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setActiveLanguage(lang); if (callStage !== "idle") endCall(); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${activeLanguage === lang ? "bg-[#DA291C] text-white border-[#DA291C] shadow-[2px_2px_0_#1A1A1A]" : "bg-white dark:bg-[#2a2a2a] text-[#1A1A1A] dark:text-white border-[#ccc] dark:border-[#444] hover:border-[#DA291C]"}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Chat Window */}
              <div className="bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-2xl border-2 border-[#e0e0e0] dark:border-[#333] h-72 overflow-y-auto p-4 mb-4 flex flex-col gap-3">
                {callStage === "idle" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[#FFC72C] rounded-2xl border-2 border-[#1A1A1A] flex items-center justify-center mb-3 shadow-[3px_3px_0_#1A1A1A]">
                      <PhoneCall className="w-8 h-8 text-[#1A1A1A]" />
                    </div>
                    <p className="font-bold text-[#1A1A1A] dark:text-white text-sm">Ready to take orders</p>
                    <p className="text-xs text-[#888] mt-1">Select language and press Start Call</p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 bg-[#DA291C] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <Brain className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role === "ai"
                        ? "bg-white dark:bg-[#2a2a2a] text-[#1A1A1A] dark:text-white border-2 border-[#e0e0e0] dark:border-[#444] rounded-tl-sm"
                        : "bg-[#DA291C] text-white rounded-tr-sm"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 bg-[#FFC72C] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center ml-2 flex-shrink-0 mt-0.5">
                        <Mic className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#DA291C] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                      <Brain className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white dark:bg-[#2a2a2a] border-2 border-[#e0e0e0] dark:border-[#444] rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-[#DA291C] rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {callStage === "idle" ? (
                  <button onClick={startCall} className="flex-1 pp-btn-primary justify-center py-3 text-base">
                    <PhoneCall className="w-5 h-5" /> Start AI Call
                  </button>
                ) : callStage === "done" ? (
                  <button onClick={endCall} className="flex-1 pp-btn-yellow justify-center py-3 text-base">
                    <RefreshCw className="w-5 h-5" /> New Call
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleNextStep}
                      disabled={isTyping || flowIndex + 1 >= getFlow().length}
                      className="flex-1 pp-btn-yellow justify-center py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Play className="w-4 h-4" />
                      {flowIndex + 1 < getFlow().length ? `Next: "${getFlow()[flowIndex + 1]?.user ?? "AI Response"}"` : "Call in progress..."}
                    </button>
                    <button onClick={endCall} className="w-12 h-12 bg-[#DA291C] text-white rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center">
                      <PhoneOff className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className={`w-12 h-12 rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center ${isMicActive ? "bg-green-100" : "bg-[#f0f0f0] dark:bg-[#2a2a2a]"}`}>
                  {isMicActive ? <Mic className="w-5 h-5 text-green-600 animate-pulse" /> : <MicOff className="w-5 h-5 text-[#888]" />}
                </div>
              </div>
            </div>
          </Section>

          {/* Order Panel + JSON */}
          <Section>
            <div className="flex flex-col gap-4 h-full">
              {/* Live Order */}
              <div className="pp-card border-2 border-[#1A1A1A]" style={{ boxShadow: "4px 4px 0px #FFC72C" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#FFC72C] rounded-lg border-2 border-[#1A1A1A] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
                  </div>
                  <h4 className="font-black text-[#1A1A1A] dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>Live Order</h4>
                </div>
                {order.length === 0 ? (
                  <p className="text-xs text-[#888] italic text-center py-4">Order will appear as items are added...</p>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {order.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start justify-between p-2.5 bg-[#f9f9f9] dark:bg-[#222] rounded-xl border border-[#eee] dark:border-[#333]"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#1A1A1A] dark:text-white">{item.name}</p>
                            {item.modifier && <p className="text-xs text-[#888]">{item.modifier}</p>}
                          </div>
                          <span className="text-sm font-black text-[#DA291C]">₹{item.price}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div className="border-t-2 border-dashed border-[#ccc] dark:border-[#444] pt-2 flex justify-between">
                      <span className="text-sm font-black text-[#1A1A1A] dark:text-white">Total</span>
                      <span className="text-lg font-black text-[#DA291C]">₹{orderTotal}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* JSON Output */}
              <div className="pp-card border-2 border-[#1A1A1A] flex-1" style={{ boxShadow: "4px 4px 0px #1A1A1A" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg border-2 border-[#FFC72C] flex items-center justify-center">
                    <Hash className="w-4 h-4 text-[#FFC72C]" />
                  </div>
                  <h4 className="font-black text-[#1A1A1A] dark:text-white text-sm" style={{ fontFamily: "'Fredoka One', cursive" }}>
                    Structured JSON Output
                  </h4>
                </div>
                <pre className="text-xs bg-[#1A1A1A] text-[#FFC72C] p-3 rounded-xl overflow-auto max-h-44 font-mono leading-relaxed">
{callStage === "done" ? `{
  "order_id": "PP-4821",
  "channel": "voice",
  "language": "${activeLanguage}",
  "items": ${JSON.stringify(order.map(o => ({ name: o.name, qty: o.qty, price: o.price })), null, 2)
    .split('\n')
    .map((l, i) => i === 0 ? l : '  ' + l)
    .join('\n')},
  "total": ${orderTotal},
  "upsell_accepted": true,
  "upsell_item": "Choco Shake",
  "pos_pushed": true,
  "kot_id": "KOT-4821",
  "status": "confirmed"
}` : `{
  "status": "${callStage === "idle" ? "waiting" : "recording"}",
  "language": "${activeLanguage}",
  "items": [],
  "stage": "${callStage}"
}`}
                </pre>
              </div>
            </div>
          </Section>
        </div>

        {/* Capabilities Grid */}
        <Section className="mt-8">
          <div className="pp-card border-2 border-[#1A1A1A]" style={{ boxShadow: "4px 4px 0px #1A1A1A" }}>
            <h3 className="text-xl font-black text-[#1A1A1A] dark:text-white mb-5" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Voice Copilot Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <Volume2 className="w-5 h-5" />, title: "Speech-to-Text", desc: "Real-time transcription with restaurant-specific vocabulary & noisy environment adaptation", color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300" },
                { icon: <Brain className="w-5 h-5" />, title: "Intent Recognition", desc: "NLU pipeline maps voice to PoS item database with modifier & customization handling", color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300" },
                { icon: <MessageSquare className="w-5 h-5" />, title: "Ambiguity Resolution", desc: "Clarification prompts for unclear items, sizes, or add-ons with confirmations", color: "bg-[#FFC72C]/20 text-[#7a5900] border-[#FFC72C]/50 dark:text-[#FFC72C]" },
                { icon: <Zap className="w-5 h-5" />, title: "Real-time Upsell", desc: "Revenue engine suggests combos & upgrades during live call flow to maximize AOV", color: "bg-[#DA291C]/10 text-[#DA291C] border-[#DA291C]/30" },
                { icon: <ChefHat className="w-5 h-5" />, title: "KOT Auto-Creation", desc: "Structured JSON pushed directly to PoS — zero manual entry, zero errors", color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300" },
                { icon: <Activity className="w-5 h-5" />, title: "Order Analytics", desc: "Every call analyzed for upsell hit rate, avg handle time, and conversion metrics", color: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300" },
              ].map((cap, i) => (
                <motion.div
                  key={cap.title}
                  className={`p-4 rounded-xl border-2 ${cap.color}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {cap.icon}
                    <h4 className="font-black text-sm">{cap.title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Components Showcase ─────────────────────────────────────────────────────
function ButtonsShowcase({ addToast }: { addToast: (msg: string, type: "success" | "error" | "info") => void }) {
  return (
    <div className="pp-card">
      <h3 className="showcase-label">Buttons</h3>
      <div className="flex flex-wrap gap-3 items-center">
        <button onClick={() => addToast("Primary action triggered!", "success")} className="pp-btn-primary">Primary Red</button>
        <button onClick={() => addToast("Golden action!", "info")} className="pp-btn-yellow">Golden Yellow</button>
        <button onClick={() => addToast("Ghost clicked!", "info")} className="pp-btn-ghost">Ghost</button>
        <button disabled className="pp-btn-disabled">Disabled</button>
        <button onClick={() => addToast("Danger! Danger!", "error")} className="pp-btn-danger">Danger</button>
        <button className="pp-btn-icon" aria-label="Bell"><Bell className="w-4 h-4" /></button>
        <button className="pp-btn-icon bg-[#FFC72C] border-[#1A1A1A]" aria-label="Star"><Star className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

// ─── Color Palette ───────────────────────────────────────────────────────────
function ColorPaletteSection({ addToast }: { addToast: (msg: string, type: "success" | "error" | "info") => void }) {
  const swatches = [
    { name: "McRed", hex: "#DA291C", desc: "Primary / Danger", dark: true },
    { name: "Golden Yellow", hex: "#FFC72C", desc: "Accent / Highlight", dark: false },
    { name: "Midnight Black", hex: "#1A1A1A", desc: "Base / Text", dark: true },
    { name: "Crisp White", hex: "#FFFFFF", desc: "Background / Light", dark: false },
    { name: "Tray Brown", hex: "#8B4513", desc: "Earthy / Warm", dark: true },
    { name: "Sesame Gray", hex: "#6B7280", desc: "Muted / Secondary", dark: true },
    { name: "Lettuce Green", hex: "#22C55E", desc: "Success / Veg", dark: false },
    { name: "Ketchup Dark", hex: "#9B1C1C", desc: "Hover / Dark variant", dark: true },
  ];

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    addToast(`${hex} copied to clipboard!`, "success");
  };

  return (
    <Section id="palette" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle sub="Click any swatch to copy the hex code">Color Palette</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {swatches.map((s) => (
            <motion.button
              key={s.hex}
              onClick={() => copyHex(s.hex)}
              className="group relative rounded-2xl overflow-hidden border-2 border-[#1A1A1A] cursor-pointer text-left"
              whileHover={{ y: -4, boxShadow: "5px 5px 0px #1A1A1A" }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: "3px 3px 0px #1A1A1A" }}
            >
              <div className="h-24" style={{ backgroundColor: s.hex }} />
              <div className="p-3 bg-white dark:bg-[#2a2a2a]">
                <p className="font-black text-sm text-[#1A1A1A] dark:text-white">{s.name}</p>
                <p className="text-xs text-[#888] dark:text-[#aaa] mt-0.5">{s.desc}</p>
                <p className="text-xs font-mono font-bold text-[#DA291C] mt-1">{s.hex}</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <span className="bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-[#1A1A1A]">
                  Copy
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Typography ──────────────────────────────────────────────────────────────
function TypographySection() {
  const scale = [
    { name: "Display", size: "text-5xl", weight: "font-black", sample: "Serving Since '55", font: "'Fredoka One', cursive" },
    { name: "Heading 1", size: "text-4xl", weight: "font-black", sample: "Today's Special Menu", font: "'Fredoka One', cursive" },
    { name: "Heading 2", size: "text-3xl", weight: "font-bold", sample: "Build Bold Interfaces", font: "'Fredoka One', cursive" },
    { name: "Heading 3", size: "text-2xl", weight: "font-bold", sample: "Component Library", font: "'DM Sans', sans-serif" },
    { name: "Body Large", size: "text-lg", weight: "font-medium", sample: "Great design is served fresh, never stale.", font: "'DM Sans', sans-serif" },
    { name: "Body Regular", size: "text-base", weight: "font-normal", sample: "Use PetPooja's component system to build faster, with less CSS and more confidence.", font: "'DM Sans', sans-serif" },
    { name: "Caption", size: "text-sm", weight: "font-medium", sample: "Menu items subject to availability. Prices include taxes.", font: "'DM Sans', sans-serif" },
    { name: "Micro", size: "text-xs", weight: "font-bold", sample: "©2026 PETPOOJA DESIGN SYSTEM · ALL RIGHTS RESERVED", font: "'DM Sans', sans-serif" },
  ];

  return (
    <Section id="typography" className="py-20 px-4 bg-[#FFC72C]/5 dark:bg-[#FFC72C]/[0.03]">
      <div className="max-w-5xl mx-auto">
        <SectionTitle sub="Fredoka One for display, DM Sans for body text">Typography Scale</SectionTitle>
        <div className="space-y-2">
          {scale.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex items-baseline gap-4 p-5 bg-white dark:bg-[#2a2a2a] rounded-2xl border-2 border-[#e0e0e0] dark:border-[#333] hover:border-[#DA291C] transition-colors group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <span className="w-28 text-xs font-bold text-[#888] dark:text-[#666] uppercase tracking-wider flex-shrink-0 group-hover:text-[#DA291C] transition-colors">
                {t.name}
              </span>
              <span className={`${t.size} ${t.weight} text-[#1A1A1A] dark:text-white leading-tight flex-1 truncate`}
                style={{ fontFamily: t.font }}>
                {t.sample}
              </span>
              <span className="text-xs font-mono text-[#888] dark:text-[#666] flex-shrink-0 hidden sm:block">
                {t.size.replace("text-", "")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Motion Library ──────────────────────────────────────────────────────────
function MotionCard({ title, desc, demo }: { title: string; desc: string; demo: React.ReactNode }) {
  return (
    <div className="pp-card flex flex-col gap-4">
      <div>
        <h4 className="font-black text-[#1A1A1A] dark:text-white text-lg" style={{ fontFamily: "'Fredoka One', cursive" }}>{title}</h4>
        <p className="text-sm text-[#888] dark:text-[#aaa] mt-1">{desc}</p>
      </div>
      <div className="flex items-center justify-center min-h-[100px] bg-[#f9f9f9] dark:bg-[#222] rounded-xl border-2 border-dashed border-[#ddd] dark:border-[#444] p-4">
        {demo}
      </div>
    </div>
  );
}

function MotionSection() {
  const [clicked, setClicked] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  return (
    <Section id="motion" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle sub="Hover, click, and scroll to see animations">Motion Library</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MotionCard title="Hover Lift" desc="Cards lift with box-shadow pop"
            demo={
              <motion.div
                className="w-24 h-16 bg-[#DA291C] rounded-xl border-2 border-[#1A1A1A] cursor-pointer flex items-center justify-center text-white font-bold text-sm"
                whileHover={{ y: -8, boxShadow: "6px 6px 0px #1A1A1A" }}
                style={{ boxShadow: "3px 3px 0px #1A1A1A" }}
              >Hover me</motion.div>
            }
          />
          <MotionCard title="Press Down" desc="Scale(0.96) click feedback"
            demo={
              <motion.button
                className="bg-[#FFC72C] text-[#1A1A1A] font-bold px-6 py-3 rounded-xl border-2 border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A]"
                whileTap={{ scale: 0.96, x: 2, y: 2, boxShadow: "1px 1px 0px #1A1A1A" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >Press Me!</motion.button>
            }
          />
          <MotionCard title="Spring Bounce" desc="Spring physics entrance"
            demo={
              <motion.div
                className="w-12 h-12 bg-[#FFC72C] rounded-full border-2 border-[#1A1A1A]"
                key={clicked ? "a" : "b"}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                onClick={() => setClicked(!clicked)}
                style={{ cursor: "pointer" }}
              />
            }
          />
          <MotionCard title="Stagger Reveal" desc="Children animate in sequence"
            demo={
              <motion.div className="flex gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div key={i}
                    className="w-10 h-10 rounded-lg border-2 border-[#1A1A1A]"
                    style={{ backgroundColor: i % 2 === 0 ? "#DA291C" : "#FFC72C" }}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  />
                ))}
              </motion.div>
            }
          />
          <MotionCard title="Slide In" desc="Smooth slide from left"
            demo={
              <motion.div
                className="h-10 bg-gradient-to-r from-[#DA291C] to-[#FFC72C] rounded-xl border-2 border-[#1A1A1A] w-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false }}
              />
            }
          />
          <MotionCard title="Ripple Click" desc="Click to trigger ripple effect"
            demo={
              <motion.div
                className="relative w-24 h-24 bg-[#DA291C] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-white font-bold text-xs cursor-pointer overflow-hidden"
                onClick={() => setRippleKey(k => k + 1)}
              >
                Click
                <AnimatePresence>
                  {rippleKey > 0 && (
                    <motion.div
                      key={rippleKey}
                      className="absolute inset-0 rounded-full bg-white/40"
                      initial={{ scale: 0, opacity: 0.7 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            }
          />
        </div>
      </div>
    </Section>
  );
}

// ─── Toast System ─────────────────────────────────────────────────────────────
function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  const icons: Record<string, React.ReactNode> = {
    success: <CheckCircle className="w-4 h-4" />,
    error: <AlertCircle className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />,
  };
  const styles: Record<string, string> = {
    success: "bg-[#FFC72C] text-[#1A1A1A] border-[#1A1A1A]",
    error: "bg-[#DA291C] text-white border-[#1A1A1A]",
    info: "bg-[#1A1A1A] text-white border-[#FFC72C]",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-[3px_3px_0_rgba(0,0,0,0.2)] max-w-xs font-bold text-sm cursor-pointer ${styles[t.type]}`}
            onClick={() => remove(t.id)}
          >
            {icons[t.type]}
            <span className="flex-1">{t.message}</span>
            <X className="w-3 h-3 flex-shrink-0 opacity-70" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const [orderNum] = useState(() => Math.floor(10000 + Math.random() * 90000));
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const d = new Date();
    setDateStr(d.toLocaleDateString());
    setTimeStr(d.toLocaleTimeString());
  }, []);
  const items = [
    ["HERO SECTION", "1"],
    ["AI REVENUE ENGINE", "1"],
    ["VOICE AI COPILOT", "1"],
    ["COMPONENT LIBRARY", "1"],
    ["COLOR PALETTE", "1"],
    ["TYPOGRAPHY SCALE", "1"],
    ["MOTION LIBRARY", "1"],
    ["DARK MODE", "1"],
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white py-16 px-4 border-t-4 border-[#DA291C]">
      <div className="max-w-md mx-auto font-mono text-sm">
        <div className="border-2 border-[#FFC72C] rounded-2xl p-6">
          <div className="text-center mb-4">
            <p className="text-[#FFC72C] font-bold text-xl tracking-widest" style={{ fontFamily: "'Fredoka One', cursive" }}>
              🍔 PETPOOJA
            </p>
            <p className="text-[#888] text-xs mt-1 tracking-widest">AI-POWERED RESTAURANT OS · RECEIPT</p>
          </div>

          <div className="border-t border-dashed border-[#444] mb-4" />

          <div className="space-y-1 text-xs text-[#aaa]">
            <div className="flex justify-between"><span>ORDER #</span><span className="text-[#FFC72C]">PP-{orderNum}</span></div>
            <div className="flex justify-between"><span>DATE</span><span>{dateStr}</span></div>
            <div className="flex justify-between"><span>TIME</span><span>{timeStr}</span></div>
            <div className="flex justify-between"><span>TABLE</span><span>BROWSER-01</span></div>
            <div className="flex justify-between"><span>AI ENGINE</span><span className="text-green-400">ACTIVE</span></div>
            <div className="flex justify-between"><span>VOICE COPILOT</span><span className="text-green-400">READY</span></div>
          </div>

          <div className="border-t border-dashed border-[#444] my-4" />

          <div className="space-y-1 text-xs">
            {items.map(([name, qty]) => (
              <div key={name} className="flex justify-between text-[#ddd]">
                <span>{name}</span>
                <span className="text-[#FFC72C]">x{qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-[#444] my-4" />

          <div className="flex justify-between text-sm font-bold text-white">
            <span>TOTAL MODULES</span>
            <span className="text-[#DA291C]">8 SECTIONS</span>
          </div>
          <div className="flex justify-between text-xs text-[#888] mt-1">
            <span>SATISFACTION GUARANTEED</span>
            <span className="text-[#FFC72C]">100%</span>
          </div>

          <div className="border-t border-dashed border-[#444] my-4" />

          <div className="text-center space-y-2">
            <p className="text-[#FFC72C] font-bold tracking-wider">✦ THANKS FOR VISITING! ✦</p>
            <p className="text-[#666] text-xs">Built with ❤️ and a side of fries</p>
            <p className="text-[#444] text-xs tracking-widest">PETPOOJA DESIGN SYSTEM v2.0</p>
          </div>

          <div className="border-t border-dashed border-[#444] mt-4 pt-4">
            <div className="flex justify-center gap-4 text-[#666] text-xs">
              <span>GitHub</span><span>·</span>
              <span>Docs</span><span>·</span>
              <span>Figma</span><span>·</span>
              <span>API</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll to top ────────────────────────────────────────────────────────────
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-[#DA291C] text-white rounded-xl border-2 border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function PetPoojaApp() {
  const [dark, setDark] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  const removeToast = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "dark" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@400;500;700&family=Nunito:wght@900&display=swap');

        :root {
          --pp-red: #DA291C;
          --pp-yellow: #FFC72C;
          --pp-black: #1A1A1A;
          --pp-white: #FFFFFF;
          --pp-muted: #666;
          --pp-bg: #FAFAF8;
          --pp-card-bg: #FFFFFF;
        }
        .dark {
          --pp-bg: #111111;
          --pp-card-bg: #1E1E1E;
          --pp-muted: #999;
        }

        body { background-color: var(--pp-bg); }

        .pp-card {
          background: var(--pp-card-bg);
          border: 2px solid #e0e0e0;
          border-radius: 1.25rem;
          padding: 1.5rem;
          transition: border-color 0.2s;
        }
        .dark .pp-card { border-color: #2a2a2a; }

        .showcase-label {
          font-family: 'Fredoka One', cursive;
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--pp-black);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .dark .showcase-label { color: white; }
        .showcase-label::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 1.2em;
          background: var(--pp-red);
          border-radius: 2px;
        }

        .pp-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--pp-red); color: white; font-weight: 700;
          padding: 0.6rem 1.25rem; border-radius: 0.75rem;
          border: 2px solid #1A1A1A; box-shadow: 3px 3px 0 #1A1A1A;
          transition: all 0.15s; cursor: pointer; font-size: 0.9rem;
        }
        .pp-btn-primary:hover { box-shadow: 1px 1px 0 #1A1A1A; transform: translate(2px,2px); }
        .pp-btn-primary:active { transform: scale(0.96); }

        .pp-btn-yellow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--pp-yellow); color: #1A1A1A; font-weight: 700;
          padding: 0.6rem 1.25rem; border-radius: 0.75rem;
          border: 2px solid #1A1A1A; box-shadow: 3px 3px 0 #1A1A1A;
          transition: all 0.15s; cursor: pointer; font-size: 0.9rem;
        }
        .pp-btn-yellow:hover { box-shadow: 1px 1px 0 #1A1A1A; transform: translate(2px,2px); }
        .pp-btn-yellow:active { transform: scale(0.96); }
        .pp-btn-yellow:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; }

        .pp-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: #1A1A1A; font-weight: 700;
          padding: 0.6rem 1.25rem; border-radius: 0.75rem;
          border: 2px solid #1A1A1A; transition: all 0.15s; cursor: pointer; font-size: 0.9rem;
        }
        .dark .pp-btn-ghost { color: white; border-color: white; }
        .pp-btn-ghost:hover { background: #1A1A1A; color: white; }
        .dark .pp-btn-ghost:hover { background: white; color: #1A1A1A; }
        .pp-btn-ghost:active { transform: scale(0.96); }

        .pp-btn-disabled {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #e0e0e0; color: #999; font-weight: 700;
          padding: 0.6rem 1.25rem; border-radius: 0.75rem;
          border: 2px solid #ccc; font-size: 0.9rem;
          cursor: not-allowed; opacity: 0.6;
        }

        .pp-btn-danger {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #1A1A1A; color: var(--pp-red); font-weight: 700;
          padding: 0.6rem 1.25rem; border-radius: 0.75rem;
          border: 2px solid var(--pp-red); box-shadow: 3px 3px 0 var(--pp-red);
          transition: all 0.15s; cursor: pointer; font-size: 0.9rem;
        }
        .pp-btn-danger:hover { box-shadow: 1px 1px 0 var(--pp-red); transform: translate(2px,2px); }
        .pp-btn-danger:active { transform: scale(0.96); }

        .pp-btn-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 2.5rem; height: 2.5rem; background: white; color: #1A1A1A;
          border-radius: 0.75rem; border: 2px solid #1A1A1A;
          box-shadow: 2px 2px 0 #1A1A1A; transition: all 0.15s; cursor: pointer;
        }
        .pp-btn-icon:hover { box-shadow: none; transform: translate(2px,2px); }
        .pp-btn-icon:active { transform: scale(0.96); }

        .arch-bg {
          background-image:
            radial-gradient(circle at 10% 20%, rgba(218,41,28,0.04) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(255,199,44,0.06) 0%, transparent 50%);
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .dark .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .checker-bg {
          background-image: repeating-conic-gradient(rgba(255,199,44,0.06) 0% 25%, transparent 0% 50%);
          background-size: 24px 24px;
        }
      `}</style>

      {/* SVG Arch Decoration */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-0 overflow-hidden h-screen">
        <svg className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.04]" viewBox="0 0 400 400" fill="none">
          <path d="M200 380 C120 380 60 320 60 240 C60 160 120 100 200 100 C280 100 340 160 340 240 C340 320 280 380 200 380Z" fill="#FFC72C" />
          <path d="M200 340 C140 340 100 300 100 240 C100 180 140 140 200 140 C260 140 300 180 300 240 C300 300 260 340 200 340Z" fill="none" stroke="#FFC72C" strokeWidth="12" />
        </svg>
        <svg className="absolute -bottom-40 -left-40 w-[500px] h-[500px] opacity-[0.04]" viewBox="0 0 400 400" fill="none">
          <path d="M200 20 C100 20 20 100 20 200 C20 300 100 380 200 380" stroke="#DA291C" strokeWidth="30" fill="none" />
          <path d="M200 80 C140 80 80 140 80 200" stroke="#DA291C" strokeWidth="20" fill="none" />
        </svg>
      </div>

      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center arch-bg grid-bg bg-[var(--pp-bg)] pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-20 right-10 w-48 h-48 opacity-10 text-[#FFC72C]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 90 C25 90 5 70 5 45 C5 20 25 5 50 5 C75 5 95 20 95 45 C95 70 75 90 50 90Z" />
          </svg>
          <svg className="absolute bottom-20 left-10 w-32 h-32 opacity-10 text-[#DA291C]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M30 95 C10 95 5 75 5 50 C5 25 20 5 45 5 C70 5 95 25 95 50" strokeWidth="8" stroke="currentColor" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 w-full">
          <Hero />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#1A1A1A] dark:border-white rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-[#DA291C] rounded-full" />
          </motion.div>
          <span className="text-xs text-[#888] dark:text-[#666] font-medium">Scroll to explore</span>
        </div>
      </section>

      {/* AI Copilot Overview */}
      <AICopilotOverview />

      {/* Revenue Intelligence Engine */}
      <RevenueEngineSection addToast={addToast} />

      {/* Voice AI Copilot */}
      <VoiceCopilotSection addToast={addToast} />

      {/* Components Showcase */}
      <section id="components" className="py-20 px-4 checker-bg bg-[var(--pp-bg)]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <SectionTitle sub="Every component you need, fresh off the grill">The Components Menu</SectionTitle>
          </Section>
          <div className="grid grid-cols-1 gap-6">
            <Section><ButtonsShowcase addToast={addToast} /></Section>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ColorPaletteSection addToast={addToast} />

      {/* Typography */}
      <TypographySection />

      {/* Motion Library */}
      <MotionSection />

      {/* Footer */}
      <Footer />

      {/* Toasts */}
      <ToastContainer toasts={toasts} remove={removeToast} />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}
