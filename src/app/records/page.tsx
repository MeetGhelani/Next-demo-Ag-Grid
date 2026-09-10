"use client";

import RecordsGrid from "@/components/RecordsGrid";
import { FileText, Download, ShieldCheck, Activity, Terminal } from "lucide-react";

export default function RecordsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            System Records & Audit Logs
          </h1>
          <p className="mt-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
            Immutable Audit Trail & Security Event Logs
          </p>
        </div>

        <button
          onClick={() => alert("Downloading full audit log archive...")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Logs (JSON)</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Audit Events</span>
            <FileText className="w-4 h-4 text-stone-700" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">4,520</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">Last 30 days activity</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Security Integrity</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">100%</p>
          <span className="text-[11px] text-emerald-600 mt-1 inline-block font-medium">0 breaches detected</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">API Requests</span>
            <Activity className="w-4 h-4 text-stone-700" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">128.4k</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">99.98% uptime</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">System Operations</span>
            <Terminal className="w-4 h-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">142</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">Automated cron triggers</span>
        </div>
      </div>

      {/* Embedded AG Grid Component */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Security & Audit Master Grid
          </h2>
          <span className="text-xs text-stone-400">Drag column headers to group, search, and filter</span>
        </div>
        <RecordsGrid />
      </div>
    </div>
  );
}