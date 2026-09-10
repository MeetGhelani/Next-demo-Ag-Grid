"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Records",
    href: "/records",
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-28 flex-col items-center border-r border-stone-200/80 bg-white px-3 py-6 shadow-[1px_0_4px_rgba(0,0,0,0.02)] select-none">
      {/* Brand Monogram */}
      <div className="mb-6 flex w-full flex-col items-center gap-1.5 py-1">
        <motion.div 
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-11 h-11 flex items-center justify-center bg-stone-900 text-white rounded-lg font-bold text-xs tracking-wider shadow-xs cursor-pointer"
        >
          AX
        </motion.div>
        <h1 className="text-sm font-semibold tracking-wider uppercase text-stone-800">
          Axiom
        </h1>
      </div>

      <div className="w-full border-t border-stone-200 mb-6" />

      {/* Main Navigation */}
      <nav className="flex w-full flex-col items-center gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex w-full flex-col items-center justify-center rounded-lg py-2.5 px-1 text-[11px] font-medium transition-colors duration-200"
            >
              {/* Active Sliding Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-stone-900 rounded-lg shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover Background when inactive */}
              {!isActive && (
                <div className="absolute inset-0 rounded-lg bg-stone-100/0 transition-colors duration-200 group-hover:bg-stone-100/80" />
              )}

              {/* Content (Icon + Label) */}
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-200 ${
                  isActive ? "text-white" : "text-stone-500 group-hover:text-stone-900"
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2 : 1.7} />
                <span className="tracking-tight font-medium">{item.title}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="my-6 w-full border-t border-stone-200" />

      {/* Bottom Settings Link */}
      {(() => {
        const isSettingsActive = pathname === "/settings";
        return (
          <Link
            href="/settings"
            className="group relative flex w-full flex-col items-center justify-center rounded-lg py-2.5 px-1 mt-auto text-[11px] font-medium transition-colors duration-200"
          >
            {isSettingsActive && (
              <motion.div
                layoutId="active-sidebar-pill"
                className="absolute inset-0 bg-stone-900 rounded-lg shadow-xs"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {!isSettingsActive && (
              <div className="absolute inset-0 rounded-lg bg-stone-100/0 transition-colors duration-200 group-hover:bg-stone-100/80" />
            )}
            <motion.div
              whileTap={{ scale: 0.92 }}
              className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-200 ${
                isSettingsActive ? "text-white" : "text-stone-500 group-hover:text-stone-900"
              }`}
            >
              <Settings size={19} strokeWidth={isSettingsActive ? 2 : 1.7} />
              <span className="tracking-tight font-medium">Settings</span>
            </motion.div>
          </Link>
        );
      })()}
    </aside>
  );
}