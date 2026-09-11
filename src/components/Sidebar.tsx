"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
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

const normalizePath = (path: string | null) => {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const emptySubscribe = () => () => {};

export default function Sidebar() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);
  const { theme, toggleTheme } = useTheme();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <aside className="flex min-h-screen w-28 flex-col items-center border-r border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] px-3 py-6 shadow-[1px_0_4px_rgba(0,0,0,0.015)] select-none">
      {/* Brand Monogram */}
      <Link href="/" className="mb-6 flex w-full flex-col items-center gap-1.5 py-1">
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden bg-[#181716] dark:bg-[#fafafa] shadow-xs cursor-pointer p-1.5"
        >
          <Image
            src="/logo.png"
            alt="Axiom Logo"
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </motion.div>
        <h1 className="text-sm font-semibold tracking-wider uppercase text-[#181716] dark:text-[#fafafa]">
          Axiom
        </h1>
      </Link>

      <div className="w-full border-t border-[#eae7df] dark:border-[#27272a] mb-6" />

      {/* Main Navigation */}
      <nav className="flex w-full flex-col items-center gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const itemPath = normalizePath(item.href);
          const isActive = currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className="group relative flex w-full flex-col items-center justify-center rounded-lg py-2.5 px-1 text-[11px] font-medium transition-colors duration-200"
            >
              {/* Active Sliding Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-[#181716] dark:bg-[#10b981] rounded-lg shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover Background when inactive */}
              {!isActive && (
                <div className="absolute inset-0 rounded-lg bg-[#f4f2ea]/0 dark:bg-[#27272a]/0 transition-colors duration-200 group-hover:bg-[#f4f2ea]/80 dark:group-hover:bg-[#27272a]/80" />
              )}

              {/* Content (Icon + Label) */}
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#fbfaf7] dark:text-[#022c22] font-semibold"
                    : "text-[#78756e] dark:text-[#a1a1aa] group-hover:text-[#181716] dark:group-hover:text-[#fafafa]"
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2 : 1.7} />
                <span className="tracking-tight font-medium">{item.title}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-4 w-full flex flex-col items-center gap-3">
        <div className="w-full border-t border-[#eae7df] dark:border-[#27272a] transition-colors duration-300" />

        {/* Theme Toggle Button (Positioned directly above Settings) */}
        <button
          onClick={toggleTheme}
          suppressHydrationWarning
          title={isClient && theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="group relative flex w-full flex-col items-center justify-center rounded-lg py-2.5 px-1 text-[11px] font-medium transition-colors duration-200 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-lg bg-[#f4f2ea]/0 dark:bg-[#27272a]/0 transition-colors duration-200 group-hover:bg-[#f4f2ea]/80 dark:group-hover:bg-[#27272a]/80" />
          
          <div className="relative z-10 flex flex-col items-center gap-1 text-[#78756e] dark:text-[#a1a1aa] group-hover:text-[#181716] dark:group-hover:text-[#fafafa] transition-colors duration-200">
            {isClient ? (
              <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={19} strokeWidth={1.7} className="text-[#8c5d14]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={19} strokeWidth={1.7} className="text-[#34d399]" />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="w-[19px] h-[19px]" />
            )}
            <span className="tracking-tight font-medium capitalize" suppressHydrationWarning>
              {isClient ? (theme === "light" ? "Light" : "Dark") : "Theme"}
            </span>
          </div>
        </button>

        {/* Settings Link */}
        {(() => {
          const isSettingsActive = currentPath === "/settings" || currentPath.startsWith("/settings/");
          return (
            <Link
              href="/settings"
              prefetch={true}
              className="group relative flex w-full flex-col items-center justify-center rounded-lg py-2.5 px-1 text-[11px] font-medium transition-colors duration-200"
            >
              {isSettingsActive && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-[#181716] dark:bg-[#10b981] rounded-lg shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {!isSettingsActive && (
                <div className="absolute inset-0 rounded-lg bg-[#f4f2ea]/0 dark:bg-[#27272a]/0 transition-colors duration-200 group-hover:bg-[#f4f2ea]/80 dark:group-hover:bg-[#27272a]/80" />
              )}
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-200 ${
                  isSettingsActive
                    ? "text-[#fbfaf7] dark:text-[#022c22] font-semibold"
                    : "text-[#78756e] dark:text-[#a1a1aa] group-hover:text-[#181716] dark:group-hover:text-[#fafafa]"
                }`}
              >
                <Settings size={19} strokeWidth={isSettingsActive ? 2 : 1.7} />
                <span className="tracking-tight font-medium">Settings</span>
              </motion.div>
            </Link>
          );
        })()}
      </div>
    </aside>
  );
}