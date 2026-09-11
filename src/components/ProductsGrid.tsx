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
  Pencil,
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

export type Product = {
  sku: string;
  name: string;
  category: "Hardware" | "Peripherals" | "Accessories" | "Furniture";
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

const initialProducts: Product[] = [
  { sku: "PRD-001", name: "Pro Laptop 15-inch", category: "Hardware", price: 95000, stock: 30, status: "In Stock" },
  { sku: "PRD-002", name: "UltraWide 4K Monitor 32\"", category: "Hardware", price: 32000, stock: 18, status: "In Stock" },
  { sku: "PRD-003", name: "Mechanical RGB Keyboard", category: "Peripherals", price: 8000, stock: 5, status: "Low Stock" },
  { sku: "PRD-004", name: "Ergonomic Wireless Mouse", category: "Peripherals", price: 2500, stock: 85, status: "In Stock" },
  { sku: "PRD-005", name: "Ergonomic Office Chair", category: "Furniture", price: 15000, stock: 0, status: "Out of Stock" },
  { sku: "PRD-006", name: "Noise Cancelling Headphones", category: "Accessories", price: 12000, stock: 24, status: "In Stock" },
  { sku: "PRD-007", name: "Thunderbolt 4 Docking Station", category: "Accessories", price: 18000, stock: 3, status: "Low Stock" },
  { sku: "PRD-008", name: "UltraHD 4K Webcam", category: "Peripherals", price: 6500, stock: 60, status: "In Stock" },
];

const gridTheme = themeQuartz.withParams({
  backgroundColor: "#ffffff",
  borderColor: "#e7e5e4",
  headerBackgroundColor: "#f5f5f4",
  headerTextColor: "#44403c",
});

const StockCellRenderer = memo(function StockCellRenderer(params: { data?: Product }) {
  if (!params.data) return null;
  const stock = params.data.stock;
  return (
    <div className="flex items-center gap-2.5 h-full w-full">
      <div className="w-20 bg-stone-100 rounded-full h-1.5 overflow-hidden flex-shrink-0">
        <div
          className={`h-full rounded-full ${
            stock > 20 ? "bg-emerald-500" : stock > 0 ? "bg-amber-500" : "bg-red-500"
          }`}
          style={{ width: `${Math.min((stock / 50) * 100, 100)}%` }}
        />
      </div>
      <span className="font-medium text-stone-700 text-xs">{stock} units</span>
    </div>
  );
});

const CategoryCellRenderer = memo(function CategoryCellRenderer(params: { data?: Product }) {
  if (!params.data) return null;
  return (
    <div className="flex items-center h-full">
      <span className="inline-flex items-center px-2 py-0.5 h-5 rounded bg-stone-100 text-stone-700 font-medium text-[11px] border border-stone-200/80 leading-none">
        {params.data.category}
      </span>
    </div>
  );
});

const StatusCellRenderer = memo(function StatusCellRenderer(params: { data?: Product }) {
  if (!params.data) return null;
  const status = params.data.status;
  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 h-5 rounded-full text-[11px] font-medium border leading-none ${
          status === "In Stock"
            ? "bg-emerald-50/90 text-emerald-700 border-emerald-200/80"
            : status === "Low Stock"
            ? "bg-amber-50/90 text-amber-700 border-amber-200/80"
            : "bg-rose-50/90 text-rose-700 border-rose-200/80"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            status === "In Stock" ? "bg-emerald-500" : status === "Low Stock" ? "bg-amber-500" : "bg-rose-500"
          }`}
        />
        {status}
      </span>
    </div>
  );
});

const ActionsCellRenderer = memo(function ActionsCellRenderer(params: { data?: Product }) {
  if (!params.data) return null;
  return (
    <div className="flex items-center justify-center h-full w-full">
      <button
        onClick={() => alert(`Edit SKU: ${params.data?.sku}`)}
        className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  );
});

export default function ProductsGrid() {
  const [gridApi, setGridApi] = useState<GridApi<Product> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const onGridReady = useCallback((params: GridReadyEvent<Product>) => {
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

  const columnDefs = useMemo<ColDef<Product>[]>(
    () => [
      {
        field: "sku",
        headerName: "SKU",
        enableRowGroup: true,
      },
      {
        field: "name",
        headerName: "Product Name",
        enableRowGroup: true,
        minWidth: 200,
      },
      {
        field: "category",
        headerName: "Category",
        enableRowGroup: true,
        cellRenderer: CategoryCellRenderer,
      },
      {
        field: "price",
        headerName: "Unit Price",
        enableRowGroup: true,
        valueFormatter: (params) => (params.value ? `₹${params.value.toLocaleString()}` : ""),
      },
      {
        field: "stock",
        headerName: "Stock Level",
        enableRowGroup: true,
        cellRenderer: StockCellRenderer,
        minWidth: 180,
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

  const defaultColDef = useMemo<ColDef<Product>>(
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
    <div className="relative h-[460px] w-full rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs">
      {/* Position Toolbar Controls directly inside the Row Group Drop Panel (right side) */}
      <div className="absolute top-1.5 right-2 z-10 flex flex-wrap items-center gap-2">
        {/* Quick Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search products..."
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

      <AgGridReact<Product>
        theme={gridTheme}
        rowData={initialProducts}
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
