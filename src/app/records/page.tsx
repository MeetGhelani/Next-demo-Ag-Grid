"use client";

import dynamic from "next/dynamic";
import { FileText, Download, ShieldCheck, Activity, Terminal } from "lucide-react";
import GridSkeleton from "@/components/GridSkeleton";
import GridErrorBoundary from "@/components/GridErrorBoundary";

const RecordsGrid = dynamic(() => import("@/components/RecordsGrid"), {
  loading: () => <GridSkeleton height="h-[460px]" rows={8} />,
  ssr: false,
});

export default function RecordsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
            System Records & Audit Logs
          </h1>
          <p className="mt-1 text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] uppercase tracking-wider">
            Immutable Audit Trail & Security Event Logs
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#181716] dark:bg-[#10b981] hover:bg-[#2c2a29] dark:hover:bg-[#059669] text-[#fbfaf7] dark:text-[#022c22] text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Logs (JSON)</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Audit Events</span>
            <FileText className="w-4 h-4 text-[#181716] dark:text-[#fafafa]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">4,520</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">Last 30 days activity</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Security Integrity</span>
            <ShieldCheck className="w-4 h-4 text-[#22573d] dark:text-[#4ade80]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">100%</p>
          <span className="text-[11px] text-[#22573d] dark:text-[#4ade80] mt-1 inline-block font-medium">0 breaches detected</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">API Requests</span>
            <Activity className="w-4 h-4 text-[#181716] dark:text-[#fafafa]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">128.4k</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">99.98% uptime</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">System Operations</span>
            <Terminal className="w-4 h-4 text-[#8c5d14] dark:text-[#fbbf24]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">142</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">Automated cron triggers</span>
        </div>
      </div>

      {/* Embedded AG Grid Component */}
      <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
            Security & Audit Master Grid
          </h2>
          <span className="text-xs text-[#78756e] dark:text-[#a1a1aa]">Drag column headers to group, search, and filter</span>
        </div>
        <GridErrorBoundary fallbackTitle="Could not render Records Grid">
          <RecordsGrid />
        </GridErrorBoundary>
      </div>
    </div>
  );
}