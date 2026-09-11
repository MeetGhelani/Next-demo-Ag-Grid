"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
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
  Trash2,
  Search,
  FileSpreadsheet,
  Filter,
  Maximize2,
  CheckSquare,
  Square,
  RotateCcw,
  RefreshCw,
  Server,
  AlertCircle,
  X,
  Loader2,
  User,
  Mail,
  Building,
  Award,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { getCustomersApi, updateCustomerApi, deleteCustomerApi } from "@/services/customerService";
import { Customer } from "@/types/customer";
import { useTheme } from "@/context/ThemeContext";

ModuleRegistry.registerModules([
  AllCommunityModule,
  AllEnterpriseModule,
]);

const CustomerCellRenderer = memo(function CustomerCellRenderer(params: { data?: Customer }) {
  if (!params.data) return null;
  const name = params.data.FName || params.data.name || "Customer";
  const email = params.data.Email || params.data.email || "";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-2.5 h-full">
      <div className="w-7 h-7 rounded-full bg-[#181716] dark:bg-[#fafafa] text-[#fbfaf7] dark:text-[#121215] font-semibold flex items-center justify-center text-[10px] flex-shrink-0 shadow-2xs">
        {initials}
      </div>
      <div className="truncate leading-tight">
        <p className="font-semibold text-[#181716] dark:text-[#fafafa] text-xs">{name}</p>
        <p className="text-[10px] text-[#78756e] dark:text-[#a1a1aa] truncate">{email}</p>
      </div>
    </div>
  );
});

const TierCellRenderer = memo(function TierCellRenderer(params: { data?: Customer }) {
  if (!params.data) return null;
  const rawTier = (params.data.ATier || params.data.tier || "standard").toString().toLowerCase();

  let label = "Standard";
  let badgeStyle = "bg-[#f4f2ea] dark:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border-[#dcd8ce] dark:border-[#3f3f46] font-semibold";

  if (rawTier.includes("vip")) {
    label = "VIP";
    badgeStyle = "bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-300 border-amber-300/90 dark:border-amber-800/80 font-bold shadow-2xs";
  } else if (rawTier.includes("enterprise")) {
    label = "Enterprise";
    badgeStyle = "bg-[#181716] dark:bg-[#fafafa] text-[#fbfaf7] dark:text-[#121215] border-[#181716] dark:border-[#fafafa] font-bold shadow-2xs";
  }

  return (
    <div className="flex items-center h-full">
      <span className={`inline-flex items-center px-2.5 py-0.5 h-5.5 rounded-md text-[11px] border leading-none ${badgeStyle}`}>
        {label}
      </span>
    </div>
  );
});

const StatusCellRenderer = memo(function StatusCellRenderer(params: { data?: Customer }) {
  if (!params.data) return null;
  const rawStatus = (params.data.Status || params.data.status || "Active").toString();
  const isActive = rawStatus.toLowerCase() === "active";

  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 h-5.5 rounded-full text-[11px] font-semibold border leading-none shadow-2xs ${
          isActive
            ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/80"
            : "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300/80 dark:border-stone-800"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            isActive ? "bg-emerald-500" : "bg-stone-400"
          }`}
        />
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
});

const CreatedAtCellRenderer = memo(function CreatedAtCellRenderer(params: { data?: Customer }) {
  if (!params.data || !params.data.CreatedAt) return <span className="text-[#78756e] dark:text-[#a1a1aa] text-xs">-</span>;
  const rawDate = params.data.CreatedAt;
  const parsedDate = new Date(rawDate);
  const formattedDate = isNaN(parsedDate.getTime()) ? String(rawDate) : parsedDate.toLocaleDateString();

  return <span className="text-xs font-medium text-[#181716] dark:text-[#fafafa]">{formattedDate}</span>;
});

interface ActionsCellRendererProps {
  data?: Customer;
  onEditCustomer?: (customer: Customer) => void;
  onDeleteCustomer?: (customer: Customer) => void;
}

const ActionsCellRenderer = memo(function ActionsCellRenderer(params: ActionsCellRendererProps) {
  if (!params.data) return null;
  const customer = params.data;

  return (
    <div className="flex items-center justify-center gap-1.5 h-full w-full">
      <button
        onClick={() => params.onEditCustomer?.(customer)}
        title="Edit Customer"
        className="p-1.5 text-amber-800 dark:text-amber-400 hover:bg-amber-100/80 dark:hover:bg-amber-950/60 rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => params.onDeleteCustomer?.(customer)}
        title="Delete Customer"
        className="p-1.5 text-rose-700 dark:text-rose-400 hover:bg-rose-100/80 dark:hover:bg-rose-950/60 rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
});

export default function CustomersGrid() {
  const { theme } = useTheme();
  const [gridApi, setGridApi] = useState<GridApi<Customer> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Dynamic AG Grid Theme for Light & Dark mode
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

  // API State
  const [rowData, setRowData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Edit Modal State
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editFormData, setEditFormData] = useState<Customer>({
    FName: "",
    Email: "",
    CName: "",
    ATier: "standard",
    Status: "Active",
  });
  const [updating, setUpdating] = useState(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState<string | null>(null);
  const [editErrorMsg, setEditErrorMsg] = useState<string | null>(null);

  // Delete Modal State
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch live database customer list on mount
  const fetchCustomerData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCustomersApi();

      if (Array.isArray(data) && data.length > 0) {
        setRowData(data);
        setIsLiveApi(true);
      } else {
        setRowData([]);
        setIsLiveApi(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not reach database API";
      console.warn("Backend API request error:", err);
      setError(msg);
      setIsLiveApi(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getCustomersApi()
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          setRowData(data);
          setIsLiveApi(true);
        } else {
          setRowData([]);
          setIsLiveApi(true);
        }
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        const msg = err instanceof Error ? err.message : "Could not reach database API";
        console.warn("Backend API request error:", err);
        setError(msg);
        setIsLiveApi(false);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Handle Edit Click
  const handleEditCustomer = useCallback((customer: Customer) => {
    setEditingCustomer(customer);
    setEditFormData({
      Id: customer.Id ?? customer.id,
      FName: customer.FName || customer.name || "",
      Email: customer.Email || customer.email || "",
      CName: customer.CName || customer.company || "",
      ATier: customer.ATier || customer.tier || "standard",
      Status: customer.Status || customer.status || "Active",
    });
    setEditSuccessMsg(null);
    setEditErrorMsg(null);
  }, []);

  // Handle Delete Click
  const handleDeleteCustomer = useCallback((customer: Customer) => {
    setDeletingCustomer(customer);
  }, []);

  // Submit Edit Form
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const customerId = editingCustomer.Id ?? editingCustomer.id;
    if (!customerId) {
      setEditErrorMsg("Invalid customer ID.");
      return;
    }

    if (!editFormData.FName.trim() || !editFormData.Email.trim() || !editFormData.CName.trim()) {
      setEditErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setUpdating(true);
      setEditErrorMsg(null);
      setEditSuccessMsg(null);

      const res = await updateCustomerApi(customerId, editFormData);
      setEditSuccessMsg(res.message || `Customer updated successfully!`);

      await fetchCustomerData();

      setTimeout(() => {
        setEditingCustomer(null);
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update customer.";
      console.error("Update customer error:", err);
      setEditErrorMsg(msg);
    } finally {
      setUpdating(false);
    }
  };

  // Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!deletingCustomer) return;
    const customerId = deletingCustomer.Id ?? deletingCustomer.id;
    if (!customerId) return;

    try {
      setDeleting(true);
      await deleteCustomerApi(customerId);
      await fetchCustomerData();
      setDeletingCustomer(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete customer.";
      console.error("Delete customer error:", err);
      alert(msg);
    } finally {
      setDeleting(false);
    }
  };

  const columnDefs = useMemo<ColDef<Customer>[]>(
    () => [
      {
        field: "Id",
        headerName: "ID",
        width: 80,
        enableRowGroup: true,
        valueGetter: (params) => params.data?.Id ?? params.data?.id,
      },
      {
        field: "FName",
        headerName: "Customer Name",
        minWidth: 220,
        enableRowGroup: true,
        cellRenderer: CustomerCellRenderer,
        valueGetter: (params) => params.data?.FName || params.data?.name,
      },
      {
        field: "CName",
        headerName: "Company",
        minWidth: 180,
        enableRowGroup: true,
        valueGetter: (params) => params.data?.CName || params.data?.company,
      },
      {
        field: "Email",
        headerName: "Email",
        minWidth: 200,
        enableRowGroup: true,
        valueGetter: (params) => params.data?.Email || params.data?.email,
      },
      {
        field: "ATier",
        headerName: "Tier",
        width: 140,
        enableRowGroup: true,
        cellRenderer: TierCellRenderer,
        valueGetter: (params) => params.data?.ATier || params.data?.tier,
      },
      {
        field: "Status",
        headerName: "Status",
        width: 130,
        enableRowGroup: true,
        cellRenderer: StatusCellRenderer,
        valueGetter: (params) => params.data?.Status || params.data?.status,
      },
      {
        field: "CreatedAt",
        headerName: "Created Date",
        width: 150,
        enableRowGroup: true,
        cellRenderer: CreatedAtCellRenderer,
      },
      {
        colId: "actions",
        headerName: "Actions",
        width: 110,
        headerClass: "[&_.ag-header-cell-label]:justify-center",
        cellStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
        cellRenderer: ActionsCellRenderer,
        cellRendererParams: {
          onEditCustomer: handleEditCustomer,
          onDeleteCustomer: handleDeleteCustomer,
        },
      },
    ],
    [handleEditCustomer, handleDeleteCustomer]
  );

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

  return (
    <div className="space-y-2">
      {/* Live API Status / Error Info Banner */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-semibold text-[11px] ${
            isLiveApi 
              ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/80" 
              : "bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800/80"
          }`}>
            <Server className="w-3 h-3" />
            {isLiveApi ? "Connected to ASP.NET Core Database API (ports 5144 / 8081)" : "API Disconnected"}
          </span>
          {error && (
            <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1 text-[11px] font-medium">
              <AlertCircle className="w-3 h-3" />
              {error}
            </span>
          )}
        </div>

        <button
          onClick={fetchCustomerData}
          disabled={loading}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#181716] dark:text-[#fafafa] bg-[#f4f2ea] dark:bg-[#27272a] hover:bg-[#eae7df] dark:hover:bg-[#3f3f46] border border-[#dcd8ce] dark:border-[#3f3f46] px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-50"
          title="Reload Data from API"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          <span>Reload Grid</span>
        </button>
      </div>

      {/* Grid Container */}
      <div className="relative h-[480px] w-full rounded-xl border border-[#eae7df] dark:border-[#27272a] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.015)] bg-white dark:bg-[#121215]">
        {/* Toolbar Controls inside Header Panel */}
        <div className="absolute top-1.5 right-2 z-10 flex flex-wrap items-center gap-2">
          {/* Quick Search Input */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-[#78756e] dark:text-[#a1a1aa] absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Quick search customers..."
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

        <AgGridReact<Customer>
          theme={gridTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowGroupPanelShow="always"
          quickFilterText={quickFilterText || undefined}
          onGridReady={onGridReady}
          rowSelection={rowSelection}
          loading={loading}
          pagination={true}
          paginationPageSize={15}
          paginationPageSizeSelector={[10, 15, 25, 50]}
        />
      </div>

      {/* Edit Customer Modal Dialog */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 bg-[#181716]/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#18181b] rounded-xl border border-[#eae7df] dark:border-[#27272a] shadow-xl max-w-lg w-full p-6 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-[#f4f2ea] dark:border-[#27272a] pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <h3 className="text-base font-bold text-[#181716] dark:text-[#fafafa]">Edit Customer #{editFormData.Id}</h3>
              </div>
              <button
                onClick={() => setEditingCustomer(null)}
                className="p-1 text-[#78756e] dark:text-[#a1a1aa] hover:text-[#181716] dark:hover:text-[#fafafa] rounded-lg hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editSuccessMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs rounded-lg font-semibold">
                {editSuccessMsg}
              </div>
            )}

            {editErrorMsg && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-300 text-xs rounded-lg font-semibold">
                {editErrorMsg}
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#181716] dark:text-[#fafafa] uppercase tracking-wider">
                  Full Name (FName)
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={editFormData.FName}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, FName: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-lg outline-none text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#121215]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#181716] dark:text-[#fafafa] uppercase tracking-wider">
                  Email Address (Email)
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa] absolute left-3 pointer-events-none" />
                  <input
                    type="email"
                    value={editFormData.Email}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, Email: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-lg outline-none text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#121215]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#181716] dark:text-[#fafafa] uppercase tracking-wider">
                  Company Name (CName)
                </label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={editFormData.CName}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, CName: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-lg outline-none text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#121215]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#181716] dark:text-[#fafafa] uppercase tracking-wider">
                    Account Tier (ATier)
                  </label>
                  <div className="relative flex items-center">
                    <Award className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa] absolute left-3 pointer-events-none" />
                    <select
                      value={editFormData.ATier}
                      onChange={(e) => setEditFormData((prev) => ({ ...prev, ATier: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-lg outline-none text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#121215] cursor-pointer font-medium"
                    >
                      <option value="standard">standard</option>
                      <option value="enterprise">enterprise</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#181716] dark:text-[#fafafa] uppercase tracking-wider">
                    Status
                  </label>
                  <div className="relative flex items-center">
                    <Activity className="w-4 h-4 text-[#78756e] dark:text-[#a1a1aa] absolute left-3 pointer-events-none" />
                    <select
                      value={editFormData.Status}
                      onChange={(e) => setEditFormData((prev) => ({ ...prev, Status: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#eae7df] dark:border-[#27272a] focus:border-[#181716] dark:focus:border-[#fafafa] rounded-lg outline-none text-[#181716] dark:text-[#fafafa] bg-white dark:bg-[#121215] cursor-pointer font-medium"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f4f2ea] dark:border-[#27272a] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-4 py-2 bg-white dark:bg-[#121215] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#181716] dark:bg-[#818cf8] hover:bg-[#2c2a29] dark:hover:bg-[#6366f1] text-[#fbfaf7] dark:text-[#09090b] text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {updating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{updating ? "Updating..." : "Update Customer"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCustomer && (
        <div className="fixed inset-0 z-50 bg-[#181716]/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#18181b] rounded-xl border border-[#eae7df] dark:border-[#27272a] shadow-xl max-w-md w-full p-6 space-y-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#181716] dark:text-[#fafafa]">Delete Customer Record</h3>
                <p className="text-xs text-[#78756e] dark:text-[#a1a1aa] mt-0.5">
                  Are you sure you want to delete customer <strong className="text-[#181716] dark:text-[#fafafa]">{deletingCustomer.FName || deletingCustomer.name}</strong> (ID #{deletingCustomer.Id ?? deletingCustomer.id})? This will execute a SQL DELETE operation.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#f4f2ea] dark:border-[#27272a] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingCustomer(null)}
                className="px-4 py-2 bg-white dark:bg-[#121215] hover:bg-[#f4f2ea] dark:hover:bg-[#27272a] text-[#181716] dark:text-[#fafafa] border border-[#eae7df] dark:border-[#27272a] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{deleting ? "Deleting..." : "Delete Customer"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
