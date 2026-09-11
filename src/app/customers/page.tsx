"use client";

import Link from "next/link";
import CustomersGrid from "@/components/CustomersGrid";
import { Users, Plus, UserCheck, ShieldAlert, Award } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Customers Management
          </h1>
          <p className="mt-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
            Client Directory & Relationship History
          </p>
        </div>

        <Link
          href="/customers/add-customer"
          prefetch={true}
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Clients</span>
            <Users className="w-4 h-4 text-stone-700" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">148</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">+12 accounts this month</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Accounts</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">134</p>
          <span className="text-[11px] text-emerald-600 mt-1 inline-block font-medium">90.5% retention rate</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Enterprise & VIP</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">54</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">Key revenue drivers</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Review</span>
            <ShieldAlert className="w-4 h-4 text-stone-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">6</p>
          <span className="text-[11px] text-amber-600 mt-1 inline-block font-medium">KYC verification open</span>
        </div>
      </div>

      {/* Embedded AG Grid Component */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Customer Accounts Master Grid
          </h2>
          <span className="text-xs text-stone-400">Drag column headers to group, search, and filter</span>
        </div>
        <CustomersGrid />
      </div>
    </div>
  );
}