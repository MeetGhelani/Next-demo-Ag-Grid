"use client";

import dynamic from "next/dynamic";
import { ShoppingCart, Clock, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import GridSkeleton from "@/components/GridSkeleton";
import GridErrorBoundary from "@/components/GridErrorBoundary";

const OrdersGrid = dynamic(() => import("@/components/OrdersGrid"), {
  loading: () => <GridSkeleton height="h-[480px]" rows={10} />,
  ssr: false,
});

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
            Orders Management
          </h1>
          <p className="mt-1 text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] uppercase tracking-wider">
            Real-time Order Processing & Fulfillment Tracking
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#181716] dark:bg-[#10b981] hover:bg-[#2c2a29] dark:hover:bg-[#059669] text-[#fbfaf7] dark:text-[#022c22] text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer">
          <ArrowUpRight className="w-4 h-4" />
          <span>New Order Entry</span>
        </button>
      </div>

      {/* Orders Volume KPI Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Volume</span>
            <ShoppingCart className="w-4 h-4 text-[#181716] dark:text-[#fafafa]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">1,248</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">₹24.5 L total gross sales</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-[#22573d] dark:text-[#4ade80]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">1,180</p>
          <span className="text-[11px] text-[#22573d] dark:text-[#4ade80] mt-1 inline-block font-medium">94.5% fulfillment rate</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Processing</span>
            <Clock className="w-4 h-4 text-[#8c5d14] dark:text-[#fbbf24]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">12</p>
          <span className="text-[11px] text-[#8c5d14] dark:text-[#fbbf24] mt-1 inline-block font-medium">In warehouse fulfillment</span>
        </div>

        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#78756e] dark:text-[#a1a1aa]">
            <span className="text-xs font-semibold uppercase tracking-wider">Cancelled / Refunded</span>
            <XCircle className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#181716] dark:text-[#fafafa]">56</p>
          <span className="text-[11px] text-[#78756e] dark:text-[#a1a1aa] mt-1 inline-block">4.4% return rate</span>
        </div>
      </div>

      {/* Embedded Main Interactive AG Grid */}
      <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
              Interactive Order Master Grid
            </h2>
            <p className="text-xs text-[#78756e] dark:text-[#a1a1aa] mt-0.5">
              Drag column headers to group, search, filter, and export CSV reports.
            </p>
          </div>
        </div>
        <GridErrorBoundary fallbackTitle="Could not render Orders Grid">
          <OrdersGrid />
        </GridErrorBoundary>
      </div>
    </div>
  );
}