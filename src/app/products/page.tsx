"use client";

import ProductsGrid from "@/components/ProductsGrid";
import { Package, Plus, Layers, AlertTriangle, CheckCircle2, Box } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Product Catalog
          </h1>
          <p className="mt-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
            Inventory Tracking & Pricing Directory
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total SKUs</span>
            <Box className="w-4 h-4 text-stone-700" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">320</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">Across 4 main categories</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">In Stock</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">285</p>
          <span className="text-[11px] text-emerald-600 mt-1 inline-block font-medium">89.1% available</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Warning</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">18</p>
          <span className="text-[11px] text-amber-600 mt-1 inline-block font-medium">Reorder required</span>
        </div>

        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
            <Layers className="w-4 h-4 text-stone-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">17</p>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">Backordered items</span>
        </div>
      </div>

      {/* Embedded AG Grid Component */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Inventory & Products Master Grid
          </h2>
          <span className="text-xs text-stone-400">Drag column headers to group, search, and filter</span>
        </div>
        <ProductsGrid />
      </div>
    </div>
  );
}