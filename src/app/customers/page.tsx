"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Users, Plus, UserCheck, ShieldAlert, Award } from "lucide-react";
import GridSkeleton from "@/components/GridSkeleton";
import GridErrorBoundary from "@/components/GridErrorBoundary";

const CustomersGrid = dynamic(() => import("@/components/CustomersGrid"), {
  loading: () => <GridSkeleton height="h-[460px]" rows={8} />,
  ssr: false,
});

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
            Customers Management
          </h1>
          <p className="mt-1 text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] uppercase tracking-wider">
            Client Directory & Relationship History
          </p>
        </div>

        <Link
          href="/customers/add-customer"
          prefetch={true}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#181716] dark:bg-[#10b981] hover:bg-[#2c2a29] dark:hover:bg-[#059669] text-[#fbfaf7] dark:text-[#022c22] text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Clients</span>
            <Users className="w-4 h-4 text-[#181716] dark:text-[#fafafa]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">148</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">+12 accounts this month</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Accounts</span>
            <UserCheck className="w-4 h-4 text-[#22573d] dark:text-[#4ade80]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">134</p>
          <span className="text-[11px] text-[#22573d] dark:text-[#4ade80] mt-1 inline-block font-medium">90.5% retention rate</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Enterprise & VIP</span>
            <Award className="w-4 h-4 text-[#8c5d14] dark:text-[#fbbf24]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">54</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">Key revenue drivers</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Review</span>
            <ShieldAlert className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">6</p>
          <span className="text-[11px] text-[#8c5d14] dark:text-[#fbbf24] mt-1 inline-block font-medium">KYC verification open</span>
        </div>
      </div>

      {/* Embedded AG Grid Component */}
      <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
            Customer Accounts Master Grid
          </h2>
          <span className="text-xs text-[#78756e] dark:text-[#a1a1aa]">Drag column headers to group, search, and filter</span>
        </div>
        <GridErrorBoundary fallbackTitle="Could not render Customers Grid">
          <CustomersGrid />
        </GridErrorBoundary>
      </div>
    </div>
  );
}