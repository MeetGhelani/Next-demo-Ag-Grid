"use client";

import { useState } from "react";
import { User, Lock, Bell, Key, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications" | "api">("general");
  const [saved, setSaved] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("Axiom Enterprise Systems");
  const [supportEmail, setSupportEmail] = useState("ops@axiom.io");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST +5:30)");
  const [enable2FA, setEnable2FA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
          Settings & Preferences
        </h1>
        <p className="mt-1 text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] uppercase tracking-wider">
          System Configuration & Team Permissions
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[#eae7df] dark:border-[#27272a] text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] gap-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "general"
              ? "border-b-2 border-[#181716] dark:border-[#10b981] text-[#181716] dark:text-[#34d399] font-semibold"
              : "hover:text-[#181716] dark:hover:text-[#fafafa]"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>General & Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "security"
              ? "border-b-2 border-[#181716] dark:border-[#10b981] text-[#181716] dark:text-[#34d399] font-semibold"
              : "hover:text-[#181716] dark:hover:text-[#fafafa]"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Security & Auth</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "notifications"
              ? "border-b-2 border-[#181716] dark:border-[#10b981] text-[#181716] dark:text-[#34d399] font-semibold"
              : "hover:text-[#181716] dark:hover:text-[#fafafa]"
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab("api")}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "api"
              ? "border-b-2 border-[#181716] dark:border-[#10b981] text-[#181716] dark:text-[#34d399] font-semibold"
              : "hover:text-[#181716] dark:hover:text-[#fafafa]"
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>API Keys & Integration</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-5">
            <h2 className="text-sm font-semibold text-[#181716] dark:text-[#fafafa] border-b border-[#f4f2ea] dark:border-[#27272a] pb-3">
              Company Profile Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#55524c] dark:text-[#a1a1aa] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] rounded-lg outline-none focus:border-[#181716] dark:focus:border-[#10b981] text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#18181b]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#55524c] dark:text-[#a1a1aa] mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] rounded-lg outline-none focus:border-[#181716] dark:focus:border-[#10b981] text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#18181b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#55524c] dark:text-[#a1a1aa] mb-1">
                System Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] rounded-lg outline-none focus:border-[#181716] dark:focus:border-[#10b981] text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#18181b] cursor-pointer"
              >
                <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                <option value="UTC (+0:00)">UTC (+0:00)</option>
                <option value="America/New_York (EST -5:00)">America/New_York (EST -5:00)</option>
                <option value="Europe/London (GMT +0:00)">Europe/London (GMT +0:00)</option>
              </select>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-5">
            <h2 className="text-sm font-semibold text-[#181716] dark:text-[#fafafa] border-b border-[#f4f2ea] dark:border-[#27272a] pb-3">
              Authentication & Security Controls
            </h2>

            <div className="flex items-center justify-between p-3 border border-[#f4f2ea] dark:border-[#27272a] rounded-lg">
              <div>
                <p className="text-xs font-semibold text-[#181716] dark:text-[#fafafa]">Enforce Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-[#78756e] dark:text-[#a1a1aa]">Require TOTP authenticator app verification for all team members.</p>
              </div>
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="w-4 h-4 accent-[#181716] dark:accent-[#10b981] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-4">
            <h2 className="text-sm font-semibold text-[#181716] dark:text-[#fafafa] border-b border-[#f4f2ea] dark:border-[#27272a] pb-3">
              Email & System Alerts
            </h2>

            <div className="flex items-center justify-between p-3 border border-[#f4f2ea] dark:border-[#27272a] rounded-lg">
              <div>
                <p className="text-xs font-semibold text-[#181716] dark:text-[#fafafa]">High-Value Order Alerts</p>
                <p className="text-[11px] text-[#78756e] dark:text-[#a1a1aa]">Receive instant email notifications for orders over ₹50,000.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#181716] dark:accent-[#10b981] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-[#f4f2ea] dark:border-[#27272a] rounded-lg">
              <div>
                <p className="text-xs font-semibold text-[#181716] dark:text-[#fafafa]">Inventory Low Stock Warnings</p>
                <p className="text-[11px] text-[#78756e] dark:text-[#a1a1aa]">Send automatic alert when product stock drops below 10 units.</p>
              </div>
              <input
                type="checkbox"
                checked={lowStockAlerts}
                onChange={(e) => setLowStockAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#181716] dark:accent-[#10b981] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* API Keys */}
        {activeTab === "api" && (
          <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-4">
            <h2 className="text-sm font-semibold text-[#181716] dark:text-[#fafafa] border-b border-[#f4f2ea] dark:border-[#27272a] pb-3">
              Production API Credentials
            </h2>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#55524c] dark:text-[#a1a1aa]">Live API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value="ax_live_998341891238912389123"
                  className="flex-1 px-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] rounded-lg font-mono bg-[#fbfaf7] dark:bg-[#18181b] text-[#55524c] dark:text-[#a1a1aa] select-all"
                />
                <button
                  type="button"
                  onClick={() => alert("Copied API key to clipboard!")}
                  className="px-3 py-2 bg-[#f4f2ea] dark:bg-[#27272a] hover:bg-[#eae7df] dark:hover:bg-[#3f3f46] text-[#181716] dark:text-[#fafafa] text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Copy Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22573d] dark:text-[#4ade80] bg-[#ecf4ee] dark:bg-[#142e20] px-3 py-1.5 rounded-lg border border-[#c8e2d1] dark:border-[#1e462d]">
              <Check className="w-3.5 h-3.5" />
              Settings saved successfully!
            </span>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#181716] dark:bg-[#10b981] hover:bg-[#2c2a29] dark:hover:bg-[#059669] text-[#fbfaf7] dark:text-[#022c22] text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}