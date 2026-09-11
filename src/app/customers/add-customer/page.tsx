"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  Award,
  Activity,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { saveCustomerApi } from "@/services/customerService";
import { SaveCustomerRequest } from "@/types/customer";

export default function AddCustomerPage() {
  const [formData, setFormData] = useState<SaveCustomerRequest>({
    FName: "",
    Email: "",
    CName: "",
    ATier: "standard",
    Status: "Active",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!formData.FName.trim() || !formData.Email.trim() || !formData.CName.trim()) {
      setErrorMessage("Please fill in all required fields (Full Name, Email, and Company Name).");
      return;
    }

    try {
      setSubmitting(true);
      
      // POST call to ASP.NET Core API DemoController: POST /api/Demo/customer
      const res = await saveCustomerApi(formData);

      const msg = res.message || `Customer "${formData.FName}" saved successfully to database!`;
      setSuccessMessage(msg);
      
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save customer to the database API. Check backend connection.";
      console.warn("API request failed:", err);
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/customers"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors shadow-2xs"
          title="Back to Customers"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Add New Customer
          </h1>
          <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Save Record to ASP.NET Core SQL Database
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Status Alerts */}
        {successMessage && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900">Success!</p>
              <p className="mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-medium animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-900">Error</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Full Name (FName) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Full Name (FName) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="FName"
                  value={formData.FName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg bg-white outline-none transition-all text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Email Address (Email) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Email Address (Email) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="e.g. rahul.sharma@gmail.com"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg bg-white outline-none transition-all text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Company Name (CName) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Company Name (CName) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Building className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="CName"
                  value={formData.CName}
                  onChange={handleChange}
                  placeholder="e.g. Tech Solutions Pvt Ltd"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg bg-white outline-none transition-all text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Account Tier (ATier) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Account Tier (ATier)
              </label>
              <div className="relative flex items-center">
                <Award className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <select
                  name="ATier"
                  value={formData.ATier}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg bg-white outline-none transition-all text-stone-900 cursor-pointer"
                >
                  <option value="standard">standard</option>
                  <option value="enterprise">enterprise</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>

            {/* Account Status (Status) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Account Status (Status)
              </label>
              <div className="relative flex items-center">
                <Activity className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <select
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg bg-white outline-none transition-all text-stone-900 cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-5 flex items-center justify-end gap-3">
            <Link
              href="/customers"
              className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{submitting ? "Saving to Database..." : "Save Customer"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
