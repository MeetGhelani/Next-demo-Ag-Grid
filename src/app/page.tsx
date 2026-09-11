"use client";

import dynamic from "next/dynamic";
import { TrendingUp, Users, ShoppingBag, IndianRupee } from "lucide-react";
import GridSkeleton from "@/components/GridSkeleton";
import GridErrorBoundary from "@/components/GridErrorBoundary";

const OrdersGrid = dynamic(() => import("@/components/OrdersGrid"), {
  loading: () => <GridSkeleton height="h-[480px]" rows={10} />,
  ssr: false,
});

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
          Overview & Key Metrics
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Total Customers */}
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-stone-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Total Customers
            </span>
            <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
            8,421
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </span>
            <span className="text-xs text-stone-400">vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-stone-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Total Orders
            </span>
            <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
            1,248
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <TrendingUp className="w-3 h-3" />
              +12.4%
            </span>
            <span className="text-xs text-stone-400">vs last month</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-stone-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Total Revenue
            </span>
            <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
            ₹24.5 L
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <TrendingUp className="w-3 h-3" />
              +6.8%
            </span>
            <span className="text-xs text-stone-400">vs last month</span>
          </div>
        </div>
      </div>

      {/* Main Grid & Recent Orders Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* All Orders Table Section */}
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-stone-900 tracking-tight">
              All Orders
            </h2>
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
              15 Total Records
            </span>
          </div>
          <GridErrorBoundary fallbackTitle="Could not render Orders Grid">
            <OrdersGrid />
          </GridErrorBoundary>
        </div>

        {/* Recent Orders Side Panel */}
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-stone-900 tracking-tight">
              Recent Activity
            </h2>
            <span className="text-xs font-medium text-stone-400">Latest</span>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-stone-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-stone-800">#1001</p>
                <p className="text-xs text-stone-500">ABC Ltd • Laptop</p>
              </div>
              <span className="text-sm font-semibold text-stone-900">₹80,000</span>
            </div>

            <div className="border-t border-stone-100" />

            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-stone-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-stone-800">#1002</p>
                <p className="text-xs text-stone-500">XYZ Ltd • Monitor</p>
              </div>
              <span className="text-sm font-semibold text-stone-900">₹25,000</span>
            </div>

            <div className="border-t border-stone-100" />

            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-stone-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-stone-800">#1003</p>
                <p className="text-xs text-stone-500">PQR Ltd • Keyboard</p>
              </div>
              <span className="text-sm font-semibold text-stone-900">₹8,000</span>
            </div>

            <div className="border-t border-stone-100" />

            <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-stone-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-stone-800">#1004</p>
                <p className="text-xs text-stone-500">LMN Ltd • Mouse</p>
              </div>
              <span className="text-sm font-semibold text-stone-900">₹2,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}