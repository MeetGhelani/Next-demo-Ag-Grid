"use client";

import dynamic from "next/dynamic";
import { TrendingUp, Users, ShoppingBag, IndianRupee } from "lucide-react";
import GridSkeleton from "@/components/GridSkeleton";
import GridErrorBoundary from "@/components/GridErrorBoundary";

const OrdersGrid = dynamic(() => import("@/components/OrdersGrid"), {
  loading: () => <GridSkeleton height="h-[480px]" rows={10} />,
  ssr: false,
});

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#181716] dark:text-[#fafafa] tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] uppercase tracking-wider">
          Overview & Key Metrics
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Total Customers */}
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)] transition-all hover:border-[#b8966c]/60 dark:hover:border-[#3f3f46]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78756e] dark:text-[#a1a1aa]">
              Total Customers
            </span>
            <div className="p-2 bg-[#f4f2ea] dark:bg-[#27272a] rounded-lg text-[#181716] dark:text-[#fafafa]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#181716] dark:text-[#fafafa]">
            8,421
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf4ee] dark:bg-[#142e20] px-2 py-0.5 text-[11px] font-semibold text-[#22573d] dark:text-[#4ade80] border border-[#c8e2d1] dark:border-[#1e462d]">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </span>
            <span className="text-xs text-[#78756e] dark:text-[#a1a1aa]">vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)] transition-all hover:border-[#b8966c]/60 dark:hover:border-[#3f3f46]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78756e] dark:text-[#a1a1aa]">
              Total Orders
            </span>
            <div className="p-2 bg-[#f4f2ea] dark:bg-[#27272a] rounded-lg text-[#181716] dark:text-[#fafafa]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#181716] dark:text-[#fafafa]">
            1,248
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf4ee] dark:bg-[#142e20] px-2 py-0.5 text-[11px] font-semibold text-[#22573d] dark:text-[#4ade80] border border-[#c8e2d1] dark:border-[#1e462d]">
              <TrendingUp className="w-3 h-3" />
              +12.4%
            </span>
            <span className="text-xs text-[#78756e] dark:text-[#a1a1aa]">vs last month</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)] transition-all hover:border-[#b8966c]/60 dark:hover:border-[#3f3f46]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78756e] dark:text-[#a1a1aa]">
              Total Revenue
            </span>
            <div className="p-2 bg-[#f4f2ea] dark:bg-[#27272a] rounded-lg text-[#181716] dark:text-[#fafafa]">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#181716] dark:text-[#fafafa]">
            ₹24.5 L
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf4ee] dark:bg-[#142e20] px-2 py-0.5 text-[11px] font-semibold text-[#22573d] dark:text-[#4ade80] border border-[#c8e2d1] dark:border-[#1e462d]">
              <TrendingUp className="w-3 h-3" />
              +6.8%
            </span>
            <span className="text-xs text-[#78756e] dark:text-[#a1a1aa]">vs last month</span>
          </div>
        </div>
      </div>

      {/* Main Grid & Recent Orders Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* All Orders Table Section */}
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)] lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#181716] dark:text-[#fafafa] tracking-tight">
              All Orders
            </h2>
            <span className="text-xs font-medium text-[#78756e] dark:text-[#a1a1aa] uppercase tracking-wider">
              15 Total Records
            </span>
          </div>
          <GridErrorBoundary fallbackTitle="Could not render Orders Grid">
            <OrdersGrid />
          </GridErrorBoundary>
        </div>

        {/* Recent Orders Side Panel */}
        <div className="rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#181716] dark:text-[#fafafa] tracking-tight">
              Recent Activity
            </h2>
            <span className="text-xs font-medium text-[#78756e] dark:text-[#a1a1aa]">Latest</span>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f9f8f4] dark:hover:bg-[#1c1c21] transition-colors">
              <div>
                <p className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">#1001</p>
                <p className="text-xs text-[#78756e] dark:text-[#a1a1aa]">ABC Ltd • Laptop</p>
              </div>
              <span className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">₹80,000</span>
            </div>

            <div className="border-t border-[#f4f2ea] dark:border-[#27272a]" />

            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f9f8f4] dark:hover:bg-[#1c1c21] transition-colors">
              <div>
                <p className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">#1002</p>
                <p className="text-xs text-[#78756e] dark:text-[#a1a1aa]">XYZ Ltd • Monitor</p>
              </div>
              <span className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">₹25,000</span>
            </div>

            <div className="border-t border-[#f4f2ea] dark:border-[#27272a]" />

            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f9f8f4] dark:hover:bg-[#1c1c21] transition-colors">
              <div>
                <p className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">#1003</p>
                <p className="text-xs text-[#78756e] dark:text-[#a1a1aa]">PQR Ltd • Keyboard</p>
              </div>
              <span className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">₹8,000</span>
            </div>

            <div className="border-t border-[#f4f2ea] dark:border-[#27272a]" />

            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f9f8f4] dark:hover:bg-[#1c1c21] transition-colors">
              <div>
                <p className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">#1004</p>
                <p className="text-xs text-[#78756e] dark:text-[#a1a1aa]">LMN Ltd • Mouse</p>
              </div>
              <span className="text-sm font-semibold text-[#181716] dark:text-[#fafafa]">₹2,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
