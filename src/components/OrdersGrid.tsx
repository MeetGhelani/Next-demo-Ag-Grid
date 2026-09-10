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
  Eye,
  Pencil,
  Trash2,
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

type Order = {
  orderId: number;
  customer: string;
  product: string;
  amount: number;
  status: string;
};

const gridTheme = themeQuartz.withParams({
  backgroundColor: "#ffffff",
  borderColor: "#e5e7eb",
  headerBackgroundColor: "#f8f8f8",
});

const rowData: Order[] = [
  { orderId: 1001, customer: "ABC Ltd", product: "Laptop", amount: 80000, status: "Completed" },
  { orderId: 1002, customer: "XYZ Ltd", product: "Monitor", amount: 25000, status: "Pending" },
  { orderId: 1003, customer: "PQR Ltd", product: "Keyboard", amount: 8000, status: "Completed" },
  { orderId: 1004, customer: "LMN Ltd", product: "Mouse", amount: 2500, status: "Cancelled" },
  { orderId: 1005, customer: "RST Ltd", product: "Laptop", amount: 95000, status: "Completed" },
  { orderId: 1006, customer: "ABC Ltd", product: "Desk Chair", amount: 15000, status: "Pending" },
  { orderId: 1007, customer: "Global Corp", product: "Monitor", amount: 32000, status: "Completed" },
  { orderId: 1008, customer: "Tech Solutions", product: "Headphones", amount: 12000, status: "Processing" },
  { orderId: 1009, customer: "XYZ Ltd", product: "Laptop", amount: 110000, status: "Completed" },
  { orderId: 1010, customer: "PQR Ltd", product: "Docking Station", amount: 18000, status: "Pending" },
  { orderId: 1011, customer: "Apex Inc", product: "Webcam", amount: 6500, status: "Completed" },
  { orderId: 1012, customer: "LMN Ltd", product: "Keyboard", amount: 7500, status: "Processing" },
  { orderId: 1013, customer: "Global Corp", product: "Laptop", amount: 88000, status: "Cancelled" },
  { orderId: 1014, customer: "RST Ltd", product: "Monitor", amount: 27000, status: "Completed" },
  { orderId: 1015, customer: "Tech Solutions", product: "Mouse", amount: 3000, status: "Completed" },
];

const ActionsCellRenderer = (params: { data?: Order }) => {
  if (!params.data) return null;
  return (
    <div className="flex items-center justify-center gap-1 h-full w-full">
      {/* View Icon Button */}
      <button
        onClick={() => alert(`Viewing Order #${params.data?.orderId}`)}
        title="View Order"
        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors cursor-pointer focus:outline-none"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>

      {/* Edit Icon Button */}
      <button
        onClick={() => alert(`Editing Order #${params.data?.orderId}`)}
        title="Edit Order"
        className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-md transition-colors cursor-pointer focus:outline-none"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      {/* Delete Icon Button */}
      <button
        onClick={() => alert(`Deleting Order #${params.data?.orderId}`)}
        title="Delete Order"
        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors cursor-pointer focus:outline-none"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const columnDefs: ColDef<Order>[] = [
  {
    field: "orderId",
    headerName: "Order ID",
    enableRowGroup: true,
  },
  {
    field: "customer",
    headerName: "Customer",
    enableRowGroup: true,
  },
  {
    field: "product",
    headerName: "Product",
    enableRowGroup: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    enableRowGroup: true,
    valueFormatter: (params) => (params.value ? `₹${params.value.toLocaleString()}` : ""),
  },
  {
    field: "status",
    headerName: "Status",
    enableRowGroup: true,
  },
  {
    colId: "actions",
    headerName: "Actions",
    headerClass: "[&_.ag-header-cell-label]:justify-center",
    cellStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    cellRenderer: ActionsCellRenderer,
  },
];

export default function OrdersGrid() {
  const [mounted, setMounted] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi<Order> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent<Order>) => {
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

  const defaultColDef = useMemo<ColDef<Order>>(
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
      <div className="h-[480px] w-full rounded-lg border border-gray-300 bg-white flex items-center justify-center text-sm text-gray-400">
        Loading grid...
      </div>
    );
  }

  return (
    <div className="relative h-[480px] w-full rounded-lg border border-gray-300 overflow-hidden">
      {/* Position Toolbar Controls directly inside the Row Group Drop Panel (right side) */}
      <div className="absolute top-1.5 right-2 z-10 flex flex-wrap items-center gap-2">
        {/* Quick Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search grid..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs border border-blue-300 focus:border-blue-500 rounded bg-white w-44 sm:w-56 outline-none transition-all shadow-2xs placeholder:text-gray-400 text-gray-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Export CSV / Excel */}
          <button
            onClick={onExportCsv}
            title="Export CSV / Excel"
            className="p-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Column Floating Filters */}
          <button
            onClick={onToggleFilters}
            title={showFilters ? "Hide Column Filters" : "Show Column Filters"}
            className={`p-1.5 border rounded transition-colors shadow-2xs cursor-pointer focus:outline-none ${
              showFilters
                ? "bg-blue-100 text-blue-800 border-blue-400 font-semibold"
                : "bg-white hover:bg-blue-50 text-blue-700 border-blue-300"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
          </button>

          {/* Auto-Fit / Resize Columns */}
          <button
            onClick={onFitColumns}
            title="Auto-Fit Columns to Screen Width"
            className="p-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Select All Rows */}
          <button
            onClick={onSelectAll}
            title="Select All Rows"
            className="p-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <CheckSquare className="w-3.5 h-3.5 text-blue-700" />
          </button>

          {/* Deselect All Rows */}
          <button
            onClick={onDeselectAll}
            title="Deselect All Rows"
            className="p-1.5 bg-white hover:bg-blue-50 text-gray-600 border border-gray-300 rounded transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <Square className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {/* Reset Grid */}
          <button
            onClick={onResetGrid}
            title="Reset Grid Filters & Columns"
            className="p-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded transition-colors shadow-2xs cursor-pointer focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AgGridReact<Order>
        theme={gridTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow="always"
        sideBar="columns"
        quickFilterText={quickFilterText || undefined}
        onGridReady={onGridReady}
        rowSelection={rowSelection}
      />
    </div>
  );
}