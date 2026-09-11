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

ModuleRegistry.registerModules([
  AllCommunityModule,
  AllEnterpriseModule,
]);

const gridTheme = themeQuartz.withParams({
  backgroundColor: "#ffffff",
  borderColor: "#e7e5e4",
  headerBackgroundColor: "#f5f5f4",
  headerTextColor: "#44403c",
});

const CustomerCellRenderer = (params: { data?: Customer }) => {
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
      <div className="w-7 h-7 rounded-full bg-stone-900 text-white font-semibold flex items-center justify-center text-[10px] flex-shrink-0">
        {initials}
      </div>
      <div className="truncate leading-tight">
        <p className="font-semibold text-stone-900 text-xs">{name}</p>
        <p className="text-[10px] text-stone-400 truncate">{email}</p>
      </div>
    </div>
  );
};

const TierCellRenderer = (params: { data?: Customer }) => {
  if (!params.data) return null;
  const rawTier = (params.data.ATier || params.data.tier || "standard").toString().toLowerCase();
  
  let label = "Standard";
  let badgeStyle = "bg-stone-100 text-stone-700 border-stone-200/80";

  if (rawTier.includes("vip")) {
    label = "VIP";
    badgeStyle = "bg-amber-50 text-amber-800 border-amber-200/80 font-semibold";
  } else if (rawTier.includes("enterprise")) {
    label = "Enterprise";
    badgeStyle = "bg-stone-900 text-stone-100 border-stone-800 font-semibold";
  }

  return (
    <div className="flex items-center h-full">
      <span className={`inline-flex items-center px-2.5 py-0.5 h-5 rounded-md text-[11px] font-medium border leading-none ${badgeStyle}`}>
        {label}
      </span>
    </div>
  );
};

const StatusCellRenderer = (params: { data?: Customer }) => {
  if (!params.data) return null;
  const rawStatus = (params.data.Status || params.data.status || "Active").toString();
  const isActive = rawStatus.toLowerCase() === "active";

  return (
    <div className="flex items-center h-full">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 h-5 rounded-full text-[11px] font-medium border leading-none ${
          isActive
            ? "bg-emerald-50/90 text-emerald-700 border-emerald-200/80"
            : "bg-stone-100/90 text-stone-600 border-stone-200/80"
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
};

const CreatedAtCellRenderer = (params: { data?: Customer }) => {
  if (!params.data || !params.data.CreatedAt) return <span className="text-stone-400 text-xs">-</span>;
  try {
    const date = new Date(params.data.CreatedAt);
    return <span className="text-xs text-stone-600">{date.toLocaleDateString()}</span>;
  } catch {
    return <span className="text-xs text-stone-600">{params.data.CreatedAt}</span>;
  }
};

interface ActionsCellRendererProps {
  data?: Customer;
  onEditCustomer?: (customer: Customer) => void;
  onDeleteCustomer?: (customer: Customer) => void;
}

const ActionsCellRenderer = (params: ActionsCellRendererProps) => {
  if (!params.data) return null;
  const customer = params.data;

  return (
    <div className="flex items-center justify-center gap-1.5 h-full w-full">
      <button
        onClick={() => params.onEditCustomer?.(customer)}
        title="Edit Customer"
        className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => params.onDeleteCustomer?.(customer)}
        title="Delete Customer"
        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors cursor-pointer focus:outline-none"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default function CustomersGrid() {
  const [mounted, setMounted] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi<Customer> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch live database customer list on page load
  const loadCustomerData = useCallback(async () => {
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
    } catch (err: any) {
      console.warn("Backend API request error:", err);
      setError(err?.message || "Could not reach database API");
      setIsLiveApi(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      loadCustomerData();
    }
  }, [mounted, loadCustomerData]);

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

      await loadCustomerData();

      setTimeout(() => {
        setEditingCustomer(null);
      }, 1200);
    } catch (err: any) {
      console.error("Update customer error:", err);
      setEditErrorMsg(err?.message || "Failed to update customer.");
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
      await loadCustomerData();
      setDeletingCustomer(null);
    } catch (err: any) {
      console.error("Delete customer error:", err);
      alert(err?.message || "Failed to delete customer.");
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

  if (!mounted) {
    return (
      <div className="h-[460px] w-full rounded-lg border border-stone-200 bg-white flex items-center justify-center text-xs text-stone-400">
        Loading customers grid...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Live API Status / Error Info Banner */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium text-[11px] ${
            isLiveApi 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
              : "bg-amber-50 text-amber-800 border border-amber-200"
          }`}>
            <Server className="w-3 h-3" />
            {isLiveApi ? "Connected to ASP.NET Core Database API (localhost:5144)" : "API Disconnected"}
          </span>
          {error && (
            <span className="text-rose-600 flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3 h-3" />
              {error}
            </span>
          )}
        </div>

        <button
          onClick={loadCustomerData}
          disabled={loading}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-50"
          title="Reload Data from API"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          <span>Reload Grid</span>
        </button>
      </div>

      {/* Grid Container */}
      <div className="relative h-[460px] w-full rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs">
        {/* Toolbar Controls inside Header Panel */}
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
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowGroupPanelShow="always"
          quickFilterText={quickFilterText || undefined}
          onGridReady={onGridReady}
          rowSelection={rowSelection}
          loading={loading}
        />
      </div>

      {/* Edit Customer Modal Dialog */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-lg w-full p-6 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-amber-700" />
                <h3 className="text-base font-bold text-stone-900">Edit Customer #{editFormData.Id}</h3>
              </div>
              <button
                onClick={() => setEditingCustomer(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg font-medium">
                {editSuccessMsg}
              </div>
            )}

            {editErrorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg font-medium">
                {editErrorMsg}
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Full Name (FName)
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={editFormData.FName}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, FName: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg outline-none text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Email Address (Email)
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                  <input
                    type="email"
                    value={editFormData.Email}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, Email: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg outline-none text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Company Name (CName)
                </label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={editFormData.CName}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, CName: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg outline-none text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Account Tier (ATier)
                  </label>
                  <div className="relative flex items-center">
                    <Award className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                    <select
                      value={editFormData.ATier}
                      onChange={(e) => setEditFormData((prev) => ({ ...prev, ATier: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 rounded-lg outline-none text-stone-900 cursor-pointer"
                    >
                      <option value="standard">standard</option>
                      <option value="enterprise">enterprise</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Status
                  </label>
                  <div className="relative flex items-center">
                    <Activity className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                    <select
                      value={editFormData.Status}
                      onChange={(e) => setEditFormData((prev) => ({ ...prev, Status: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 rounded-lg outline-none text-stone-900 cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-md w-full p-6 space-y-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">Delete Customer Record</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Are you sure you want to delete customer <strong className="text-stone-900">{deletingCustomer.FName || deletingCustomer.name}</strong> (ID #{deletingCustomer.Id ?? deletingCustomer.id})? This will execute a SQL DELETE operation.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingCustomer(null)}
                className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
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
