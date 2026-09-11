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

export type AuditRecord = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: "Authentication" | "Data Export" | "System Update" | "Permission Change";
  ipAddress: string;
  status: "Success" | "Warning" | "Failed";
};

const initialRecords: AuditRecord[] = [
  { id: "LOG-9001", timestamp: "2026-09-10 10:45:12", user: "sarah.admin@axiom.io", action: "Exported Monthly Sales CSV Report", category: "Data Export", ipAddress: "192.168.1.104", status: "Success" },
  { id: "LOG-9002", timestamp: "2026-09-10 10:32:05", user: "system.bot", action: "Automated Nightly Database Backup Complete", category: "System Update", ipAddress: "10.0.4.12", status: "Success" },
  { id: "LOG-9003", timestamp: "2026-09-10 09:14:50", user: "david.chen@xyz.com", action: "User Session Authenticated (2FA Verified)", category: "Authentication", ipAddress: "49.207.18.22", status: "Success" },
  { id: "LOG-9004", timestamp: "2026-09-10 08:55:01", user: "unknown.user", action: "Failed Authentication Attempt (Invalid Password)", category: "Authentication", ipAddress: "185.220.101.5", status: "Warning" },
  { id: "LOG-9005", timestamp: "2026-09-09 23:10:40", user: "sarah.admin@axiom.io", action: "Updated Role Permissions for VIP Customer Tier", category: "Permission Change", ipAddress: "192.168.1.104", status: "Success" },
  { id: "LOG-9006", timestamp: "2026-09-09 18:22:15", user: "elena.r@pqr.io", action: "Bulk CSV Upload: Product Stock Quantities", category: "Data Export", ipAddress: "103.22.45.12", status: "Success" },
  { id: "LOG-9007", timestamp: "2026-09-09 15:04:33", user: "system.bot", action: "AG Grid License Validation Heartbeat Executed", category: "System Update", ipAddress: "127.0.0.1", status: "Success" },
];

const StatusCellRenderer = memo(function StatusCellRenderer(params: { data?: AuditRecord }) {
  if (!params.data) return null;
  const status = params.data.status;
  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 h-5.5 rounded-full text-[11px] font-semibold border leading-none shadow-2xs ${
          status === "Success"
            ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300/90 dark:border-emerald-800/80"
            : status === "Warning"
            ? "bg-amber-50 dark:bg-amber-950/80 text-amber-950 dark:text-amber-300 border-amber-300/90 dark:border-amber-800/80"
            : "bg-rose-50 dark:bg-rose-950/80 text-rose-950 dark:text-rose-300 border-rose-300/90 dark:border-rose-800/80"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            status === "Success" ? "bg-emerald-500" : status === "Warning" ? "bg-amber-500" : "bg-rose-500"
          }`}
        />
        {status}
      </span>
    </div>
  );
});

const CategoryCellRenderer = memo(function CategoryCellRenderer(params: { data?: AuditRecord }) {
  if (!params.data) return null;
  return (
    <div className="flex items-center h-full">
      <span className="inline-flex items-center px-2.5 py-0.5 h-5.5 rounded bg-[#f4f2ea] dark:bg-[#27272a] text-[#181716] dark:text-[#fafafa] font-semibold text-[11px] border border-[#dcd8ce] dark:border-[#3f3f46] leading-none shadow-2xs">
        {params.data.category}
      </span>
    </div>
  );
});

export default function RecordsGrid() {
  const { theme } = useTheme();
  const [gridApi, setGridApi] = useState<GridApi<AuditRecord> | null>(null);
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

  const onGridReady = useCallback((params: GridReadyEvent<AuditRecord>) => {
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

  const columnDefs = useMemo<ColDef<AuditRecord>[]>(
    () => [
      {
        field: "id",
        headerName: "Log ID",
        enableRowGroup: true,
        cellClass: "font-mono font-bold text-[#181716] dark:text-[#fafafa]",
      },
      {
        field: "timestamp",
        headerName: "Timestamp",
        enableRowGroup: true,
        cellClass: "font-mono text-[#78756e] dark:text-[#a1a1aa]",
      },
      {
        field: "user",
        headerName: "User / Actor",
        enableRowGroup: true,
      },
      {
        field: "action",
        headerName: "Action Summary",
        enableRowGroup: true,
        minWidth: 220,
      },
      {
        field: "category",
        headerName: "Category",
        enableRowGroup: true,
        cellRenderer: CategoryCellRenderer,
      },
      {
        field: "ipAddress",
        headerName: "IP Address",
        enableRowGroup: true,
        cellClass: "font-mono text-[#78756e] dark:text-[#a1a1aa]",
      },
      {
        field: "status",
        headerName: "Status",
        enableRowGroup: true,
        cellRenderer: StatusCellRenderer,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef<AuditRecord>>(
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
    <div className="relative h-[460px] w-full rounded-xl border border-[#eae7df] dark:border-[#27272a] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.015)] bg-white dark:bg-[#121215]">
      {/* Position Toolbar Controls directly inside the Row Group Drop Panel (right side) */}
      <div className="absolute top-1.5 right-2 z-10 flex flex-wrap items-center gap-2">
        {/* Quick Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#78756e] dark:text-[#a1a1aa] absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search logs..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-md bg-white dark:bg-[#18181b] w-44 sm:w-56 outline-none transition-all shadow-xs placeholder:text-[#9a968d] dark:placeholder:text-[#71717a] text-[#181716] dark:text-[#fafafa]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onExportCsv}
            title="Export CSV"
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
            title="Auto-Fit Columns"
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
            title="Reset Grid"
            className="p-1.5 bg-white dark:bg-[#18181b] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] rounded-md transition-colors shadow-xs cursor-pointer focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AgGridReact<AuditRecord>
        theme={gridTheme}
        rowData={initialRecords}
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
