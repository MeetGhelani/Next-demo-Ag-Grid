"use client";

import { useState, useCallback, useMemo, memo } from "react";
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
import { useTheme } from "@/context/ThemeContext";

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

const initialOrders: Order[] = [
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

const ActionsCellRenderer = memo(function ActionsCellRenderer(params: { data?: Order }) {
  if (!params.data) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 h-full w-full">
      <button
        onClick={() => alert(`Viewing Order #${params.data?.orderId}`)}
        title="View Order"
        className="p-1.5 text-[#181716] dark:text-[#fafafa] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => alert(`Editing Order #${params.data?.orderId}`)}
        title="Edit Order"
        className="p-1.5 text-amber-800 dark:text-amber-400 hover:bg-amber-100/80 dark:hover:bg-amber-950/60 rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => alert(`Deleting Order #${params.data?.orderId}`)}
        title="Delete Order"
        className="p-1.5 text-rose-700 dark:text-rose-400 hover:bg-rose-100/80 dark:hover:bg-rose-950/60 rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
});

const StatusCellRenderer = memo(function StatusCellRenderer(params: { data?: Order }) {
  if (!params.data) return null;
  const status = params.data.status;
  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 h-5.5 rounded-full text-[11px] font-semibold border leading-none shadow-2xs ${
          status === "Completed"
            ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300/90 dark:border-emerald-800/80"
            : status === "Pending" || status === "Processing"
            ? "bg-amber-50 dark:bg-amber-950/80 text-amber-950 dark:text-amber-300 border-amber-300/90 dark:border-amber-800/80"
            : "bg-rose-50 dark:bg-rose-950/80 text-rose-950 dark:text-rose-300 border-rose-300/90 dark:border-rose-800/80"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            status === "Completed"
              ? "bg-emerald-500"
              : status === "Pending" || status === "Processing"
              ? "bg-amber-500"
              : "bg-rose-500"
          }`}
        />
        {status}
      </span>
    </div>
  );
});

export default function OrdersGrid() {
  const { theme } = useTheme();
  const [gridApi, setGridApi] = useState<GridApi<Order> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const gridTheme = useMemo(
    () =>
      themeQuartz.withParams({
        backgroundColor: theme === "dark" ? "#121215" : "#ffffff",
        borderColor: theme === "dark" ? "#27272a" : "#eae7df",
        headerBackgroundColor: theme === "dark" ? "#18181b" : "#f6f5f0",
        headerTextColor: theme === "dark" ? "#fafafa" : "#181716",
        textColor: theme === "dark" ? "#fafafa" : "#181716",
        foregroundColor: theme === "dark" ? "#fafafa" : "#181716",
      }),
    [theme]
  );

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

  const columnDefs = useMemo<ColDef<Order>[]>(
    () => [
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
        cellRenderer: StatusCellRenderer,
      },
      {
        colId: "actions",
        headerName: "Actions",
        headerClass: "[&_.ag-header-cell-label]:justify-center",
        cellStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
        cellRenderer: ActionsCellRenderer,
      },
    ],
    []
  );

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

  return (
    <div className="relative h-[480px] w-full rounded-xl border border-[#eae7df] dark:border-[#27272a] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.015)] bg-white dark:bg-[#121215]">
      {/* Position Toolbar Controls directly inside the Row Group Drop Panel (right side) */}
      <div className="absolute top-1.5 right-2 z-10 flex flex-wrap items-center gap-2">
        {/* Quick Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#78756e] dark:text-[#a1a1aa] absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search orders..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-md bg-white dark:bg-[#18181b] w-44 sm:w-56 outline-none transition-all shadow-xs placeholder:text-[#9a968d] dark:placeholder:text-[#71717a] text-[#181716] dark:text-[#fafafa]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onExportCsv}
            title="Export CSV / Excel"
            className="p-1.5 bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleFilters}
            title={showFilters ? "Hide Column Filters" : "Show Column Filters"}
            className={`p-1.5 border rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none ${
              showFilters
                ? "bg-[#181716] dark:bg-[#10b981] text-[#fbfaf7] dark:text-[#022c22] border-[#181716] dark:border-[#10b981] font-semibold"
                : "bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border-[#eae7df] dark:border-[#27272a]"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onFitColumns}
            title="Auto-Fit Columns to Screen Width"
            className="p-1.5 bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onSelectAll}
            title="Select All Rows"
            className="p-1.5 bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none"
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#181716] dark:text-[#fafafa]" />
          </button>

          <button
            onClick={onDeselectAll}
            title="Deselect All Rows"
            className="p-1.5 bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#78756e] dark:text-[#a1a1aa] border border-[#eae7df] dark:border-[#27272a] rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none"
          >
            <Square className="w-3.5 h-3.5 text-[#78756e] dark:text-[#a1a1aa]" />
          </button>

          <button
            onClick={onResetGrid}
            title="Reset Grid Filters & Columns"
            className="p-1.5 bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AgGridReact<Order>
        theme={gridTheme}
        rowData={initialOrders}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow="always"
        quickFilterText={quickFilterText || undefined}
        onGridReady={onGridReady}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={15}
        paginationPageSizeSelector={[10, 15, 25, 50]}
      />
    </div>
  );
}