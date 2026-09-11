"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  Play,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#181716] font-sans antialiased selection:bg-[#eae7df]">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#fbfaf7]/90 backdrop-blur-md border-b border-[#eae7df]/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center bg-[#181716] dark:bg-[#fafafa] rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform p-1.5">
              <Image
                src="/logo.png"
                alt="Axiom Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain dark:hidden"
              />
              <Image
                src="/logo-black.png"
                alt="Axiom Logo Dark"
                width={40}
                height={40}
                className="w-full h-full object-contain hidden dark:block"
              />
            </div>
            <span className="font-display text-lg font-semibold tracking-wider uppercase text-[#181716]">
              Axiom
            </span>
          </Link>

          {/* Navigation Links with Smooth Scrolling */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#78756e]">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="hover:text-[#181716] transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="hover:text-[#181716] transition-colors cursor-pointer"
            >
              Features
            </a>
            <a
              href="#stats"
              onClick={(e) => scrollToSection(e, "stats")}
              className="hover:text-[#181716] transition-colors cursor-pointer"
            >
              Metrics
            </a>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, "pricing")}
              className="hover:text-[#181716] transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-[#181716] hover:bg-[#eae7df]/50 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#181716] text-[#fbfaf7] hover:bg-[#2c2a29] rounded-xl shadow-xs transition-all hover:shadow-md active:scale-95"
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 space-y-32">
        {/* HERO SECTION - DEDICATED CLEAN INITIAL VIEWPORT */}
        <section id="home" className="min-h-[calc(100vh-5rem)] flex items-center py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Category Subhead */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs font-semibold text-[#78756e] tracking-widest uppercase"
              >
                YOUR BUSINESS, IN ONE PLACE
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181716] leading-[1.12]"
              >
                Organize. Track. Grow.
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-[#78756e] font-normal leading-relaxed max-w-lg"
              >
                AXIOM is a modern business management platform that keeps your customers,
                orders, products and revenue in sync.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#181716] text-[#fbfaf7] hover:bg-[#2c2a29] rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95"
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white border border-[#eae7df] text-[#181716] hover:bg-[#f4f2ea] rounded-xl shadow-xs transition-colors"
                >
                  View Demo
                  <Play size={14} className="fill-current text-[#181716]" />
                </Link>
              </motion.div>
            </div>

            {/* Right Graphic Column with Ambient Glow & Floating Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-6 flex justify-center lg:justify-end relative"
            >
              {/* Premium Glow Aura Behind Image */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#b8966c]/30 via-[#f4f2ea]/70 to-[#d4b996]/20 blur-3xl opacity-80 pointer-events-none" />
              <div className="absolute -inset-12 rounded-full bg-radial from-[#181716]/10 via-[#eae7df]/40 to-transparent blur-3xl opacity-60 pointer-events-none" />

              {/* Floating Image Container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full max-w-lg lg:max-w-none"
              >
                <Image
                  src="/landing-page-bg.png"
                  alt="Axiom 3D Operations Dashboard Graphic"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section id="stats" className="scroll-mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-10 rounded-2xl border border-[#eae7df] bg-white shadow-xs">
            <div className="text-center space-y-1.5 md:border-r border-[#eae7df]/80 last:border-r-0 px-2">
              <p className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#181716]">
                8K+
              </p>
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#78756e] tracking-tight">
                Happy Customers
              </p>
            </div>
            <div className="text-center space-y-1.5 md:border-r border-[#eae7df]/80 last:border-r-0 px-2">
              <p className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#181716]">
                1K+
              </p>
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#78756e] tracking-tight">
                Orders Managed
              </p>
            </div>
            <div className="text-center space-y-1.5 md:border-r border-[#eae7df]/80 last:border-r-0 px-2">
              <p className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#181716]">
                99.9%
              </p>
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#78756e] tracking-tight">
                Uptime SLA
              </p>
            </div>
            <div className="text-center space-y-1.5 px-2">
              <p className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#181716]">
                4.8/5
              </p>
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#78756e] tracking-tight">
                User Satisfaction
              </p>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF LOGO GRID */}
        <section className="space-y-6 text-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#181716]">
              Trusted by growing businesses
            </h2>
            <p className="text-sm text-[#78756e] mt-1">
              Over 8,000+ companies rely on Axiom to power their daily operations
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-2 grayscale opacity-70">
            <span className="text-xl font-bold tracking-widest text-[#78756e] uppercase">
              ACME CO.
            </span>
            <span className="text-xl font-bold tracking-widest text-[#78756e] uppercase">
              GLOBEX
            </span>
            <span className="text-xl font-bold tracking-widest text-[#78756e] uppercase">
              NOVATECH
            </span>
            <span className="text-xl font-bold tracking-widest text-[#78756e] uppercase">
              ZENITH
            </span>
            <span className="text-xl font-bold tracking-widest text-[#78756e] uppercase">
              PIXEL
            </span>
          </div>
        </section>

        {/* MIDDLE CTA WARM LINEN BANNER */}
        <section id="pricing" className="scroll-mt-24 rounded-2xl border border-[#eae7df] bg-[#f4f2ea] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#181716]">
              Ready to simplify your business?
            </h2>
            <p className="text-sm md:text-base text-[#78756e]">
              Join thousands of teams scaling faster with Axiom.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold bg-[#181716] text-[#fbfaf7] hover:bg-[#2c2a29] rounded-xl shadow-xs transition-all hover:shadow-md active:scale-95 shrink-0"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#78756e]">
              EVERYTHING YOU NEED
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#181716]">
              All the tools to run your business
            </h2>
            <p className="text-base text-[#78756e]">
              Built with precision and high-performance tables to give executive control over your key metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="rounded-xl border border-[#eae7df] bg-white p-6 space-y-4 shadow-xs transition-all hover:shadow-md hover:border-[#b8966c]/60">
              <div className="w-12 h-12 rounded-xl bg-[#f4f2ea] flex items-center justify-center text-[#181716]">
                <Users size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#181716] tracking-tight">
                Customer Management
              </h3>
              <p className="text-sm text-[#78756e] leading-relaxed">
                Track client histories, contact details, and key accounts seamlessly in one centralized place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-[#eae7df] bg-white p-6 space-y-4 shadow-xs transition-all hover:shadow-md hover:border-[#b8966c]/60">
              <div className="w-12 h-12 rounded-xl bg-[#f4f2ea] flex items-center justify-center text-[#181716]">
                <Package size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#181716] tracking-tight">
                Product Catalog
              </h3>
              <p className="text-sm text-[#78756e] leading-relaxed">
                Organize inventory, pricing tiers, and stock counts with real-time grid filtering and search.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-[#eae7df] bg-white p-6 space-y-4 shadow-xs transition-all hover:shadow-md hover:border-[#b8966c]/60">
              <div className="w-12 h-12 rounded-xl bg-[#f4f2ea] flex items-center justify-center text-[#181716]">
                <ShoppingCart size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#181716] tracking-tight">
                Order Tracking
              </h3>
              <p className="text-sm text-[#78756e] leading-relaxed">
                Monitor orders from processing to delivery with custom status workflows and instant actions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-[#eae7df] bg-white p-6 space-y-4 shadow-xs transition-all hover:shadow-md hover:border-[#b8966c]/60">
              <div className="w-12 h-12 rounded-xl bg-[#f4f2ea] flex items-center justify-center text-[#181716]">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#181716] tracking-tight">
                Revenue Insights
              </h3>
              <p className="text-sm text-[#78756e] leading-relaxed">
                Gain clear visibility into sales trends, high-performing items, and growth metrics.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#eae7df] bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#181716] dark:bg-[#fafafa] rounded-lg overflow-hidden p-1">
                  <Image
                    src="/logo.png"
                    alt="Axiom Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain dark:hidden"
                  />
                  <Image
                    src="/logo-black.png"
                    alt="Axiom Logo Dark"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain hidden dark:block"
                  />
                </div>
                <span className="font-display text-lg font-semibold tracking-wider uppercase text-[#181716]">
                  Axiom
                </span>
              </div>
              <p className="text-xs text-[#78756e]">
                Simple. Powerful. Business Ready.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-medium text-[#78756e]">
              <Link href="/dashboard" className="hover:text-[#181716] transition-colors">
                Dashboard
              </Link>
              <Link href="/customers" className="hover:text-[#181716] transition-colors">
                Customers
              </Link>
              <Link href="/products" className="hover:text-[#181716] transition-colors">
                Products
              </Link>
              <Link href="/orders" className="hover:text-[#181716] transition-colors">
                Orders
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-[#eae7df] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78756e]">
            <p>© {new Date().getFullYear()} Axiom Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-[#181716] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#181716] cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
