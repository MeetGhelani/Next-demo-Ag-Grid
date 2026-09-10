"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  GridApi,
  GridReadyEvent,
  ColDef,
  themeQuartz,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import {
  MoreHorizontal,
  Search,
  FileSpreadsheet,
  Filter,
  Maximize2,
  CheckSquare,
  Square,
  RotateCcw,
} from "lucide-react";

ModuleRegistry.registerModules([
  AllCommunityModule,
  AllEnterpriseModule,
]);

export type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  tier: "Enterprise" | "Standard" | "VIP";
  totalSpent: number;
  status: "Active" | "Inactive" | "Pending";
  ordersCount: number;
};

const initialCustomers: Customer[] = [
  { id: "CUST-101", name: "Sarah Jenkins", company: "ABC Ltd", email: "sarah@abcltd.com", tier: "Enterprise", totalSpent: 245000, status: "Active", ordersCount: 18 },
  { id: "CUST-102", name: "David Chen", company: "XYZ Ltd", email: "david@xyz.com", tier: "Standard", totalSpent: 68000, status: "Active", ordersCount: 7 },
  { id: "CUST-103", name: "Elena Rostova", company: "PQR Ltd", email: "elena@pqr.io", tier: "VIP", totalSpent: 412000, status: "Active", ordersCount: 32 },
  { id: "CUST-104", name: "Michael Vance", company: "LMN Ltd", email: "m.vance@lmn.org", tier: "Standard", totalSpent: 18500, status: "Inactive", ordersCount: 2 },
  { id: "CUST-105", name: "Aisha Patel", company: "RST Ltd", email: "aisha@rsttech.com", tier: "Enterprise", totalSpent: 195000, status: "Active", ordersCount: 14 },
  { id: "CUST-106", name: "Robert Taylor", company: "Global Corp", email: "rtaylor@globalcorp.com", tier: "VIP", totalSpent: 520000, status: "Active", ordersCount: 45 },
  { id: "CUST-107", name: "Linda Wu", company: "Tech Solutions", email: "linda@techsolutions.com", tier: "Enterprise", totalSpent: 142000, status: "Pending", ordersCount: 5 },
];

const gridTheme = themeQuartz.withParams({
  backgroundColor: "#ffffff",
  borderColor: "#e7e5e4",
  headerBackgroundColor: "#f5f5f4",
  headerTextColor: "#44403c",
});

const CustomerCellRenderer = (params: { data?: Customer }) => {
  if (!params.data) return null;
  return (
    <div className="flex items-center gap-2.5 h-full">
      <div className="w-7 h-7 rounded-full bg-stone-900 text-white font-semibold flex items-center justify-center text-[10px] flex-shrink-0">
        {params.data.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div className="truncate leading-tight">
        <p className="font-semibold text-stone-900 text-xs">{params.data.name}</p>
        <p className="text-[10px] text-stone-400 truncate">{params.data.email}</p>
      </div>
    </div>
  );
};

const TierCellRenderer = (params: { data?: Customer }) => {
  if (!params.data) return null;
  const tier = params.data.tier;
  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 h-5 rounded-md text-[11px] font-medium border leading-none ${
          tier === "VIP"
            ? "bg-amber-50 text-amber-800 border-amber-200/80"
            : tier === "Enterprise"
            ? "bg-stone-900 text-stone-100 border-stone-800"
            : "bg-stone-100 text-stone-700 border-stone-200/80"
        }`}
      >
        {tier}
      </span>
    </div>
  );
};

const StatusCellRenderer = (params: { data?: Customer }) => {
  if (!params.data) return null;
  const status = params.data.status;
  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 h-5 rounded-full text-[11px] font-medium border leading-none ${
          status === "Active"
            ? "bg-emerald-50/90 text-emerald-700 border-emerald-200/80"
            : status === "Pending"
            ? "bg-amber-50/90 text-amber-700 border-amber-200/80"
            : "bg-stone-100/90 text-stone-600 border-stone-200/80"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            status === "Active" ? "bg-emerald-500" : status === "Pending" ? "bg-amber-500" : "bg-stone-400"
          }`}
        />
        {status}
      </span>
    </div>
  );
};

const ActionsCellRenderer = (params: { data?: Customer }) => {
  if (!params.data) return null;
  return (
    <div className="flex items-center justify-center h-full w-full">
      <button
        onClick={() => alert(`Customer options for ${params.data?.name}`)}
        className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
};

const columnDefs: ColDef<Customer>[] = [
  {
    field: "name",
    headerName: "Customer",
    enableRowGroup: true,
    cellRenderer: CustomerCellRenderer,
    minWidth: 200,
  },
  {
    field: "company",
    headerName: "Company",
    enableRowGroup: true,
  },
  {
    field: "tier",
    headerName: "Tier",
    enableRowGroup: true,
    cellRenderer: TierCellRenderer,
  },
  {
    field: "totalSpent",
    headerName: "Total Spent",
    enableRowGroup: true,
    valueFormatter: (params) => (params.value ? `₹${params.value.toLocaleString()}` : ""),
  },
  {
    field: "ordersCount",
    headerName: "Orders",
    enableRowGroup: true,
    valueFormatter: (params) => `${params.value} orders`,
  },
  {
    field: "status",
    headerName: "Status",
    enableRowGroup: true,
    cellRenderer: StatusCellRenderer,
  },
  {
    colId: "actions",
    headerName: "Actions",
    headerClass: "[&_.ag-header-cell-label]:justify-center",
    cellStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    cellRenderer: ActionsCellRenderer,
  },
];

export default function CustomersGrid() {
  const [mounted, setMounted] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi<Customer> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent<Customer>) => {
    setGridApi(params.api);
  }, []);

  const onExportCsv = useCallback(() => {
    gridApi?.exportDataAsCsv();
  }, [gridApi]);

  const onToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const onFitColumns = useCallback(() => {
    if (!gridApi) return;
    gridApi.resetColumnState();
    gridApi.sizeColumnsToFit();
  }, [gridApi]);

  const onSelectAll = useCallback(() => {
    gridApi?.selectAll();
  }, [gridApi]);

  const onDeselectAll = useCallback(() => {
    gridApi?.deselectAll();
  }, [gridApi]);

  const onResetGrid = useCallback(() => {
    gridApi?.resetColumnState();
    gridApi?.setFilterModel(null);
    gridApi?.deselectAll();
    setQuickFilterText("");
    setShowFilters(false);
  }, [gridApi]);

  const defaultColDef = useMemo<ColDef<Customer>>(
    () => ({
      flex: 1,
      enableRowGroup: true,
      sortable: true,
      filter: showFilters,
      floatingFilter: showFilters,
    }),
    [showFilters]
  );

  const rowSelection = useMemo(() => ({ mode: "multiRow" as const }), []);

  if (!mounted) {
    return (
      <div className="h-[460px] w-full rounded-lg border border-stone-200 bg-white flex items-center justify-center text-xs text-stone-400">
        Loading customers grid...
      </div>
    );
  }

  return (
    <div className="relative h-[460px] w-full rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs">
      {/* Position Toolbar Controls directly inside the Row Group Drop Panel (right side) */}
      <div className="absolute top-1.5 right-2 z-10 flex flex-wrap items-center gap-2">
        {/* Quick Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search customers..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs border border-stone-300 focus:border-stone-800 rounded-md bg-white w-44 sm:w-56 outline-none transition-all shadow-2xs placeholder:text-stone-400 text-stone-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onExportCsv}
            title="Export CSV"
            className="p-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleFilters}
            title={showFilters ? "Hide Column Filters" : "Show Column Filters"}
            className={`p-1.5 border rounded-md transition-colors shadow-2xs cursor-pointer focus:outline-none ${
              showFilters
                ? "bg-stone-900 text-white border-stone-900 font-semibold"
                : "bg-white hover:bg-stone-100 text-stone-700 border-stone-300"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onFitColumns}
            title="Auto-Fit Columns"
            className="p-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onSelectAll}
            title="Select All Rows"
            className="p-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <CheckSquare className="w-3.5 h-3.5 text-stone-800" />
          </button>

          <button
            onClick={onDeselectAll}
            title="Deselect All Rows"
            className="p-1.5 bg-white hover:bg-stone-100 text-stone-500 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <Square className="w-3.5 h-3.5 text-stone-400" />
          </button>

          <button
            onClick={onResetGrid}
            title="Reset Grid"
            className="p-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AgGridReact<Customer>
        theme={gridTheme}
        rowData={initialCustomers}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow="always"
        quickFilterText={quickFilterText || undefined}
        onGridReady={onGridReady}
        rowSelection={rowSelection}
      />
    </div>
  );
}
