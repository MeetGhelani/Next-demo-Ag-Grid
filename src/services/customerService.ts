import { apiFetch } from "./apiClient";
import { Customer, SaveCustomerRequest } from "@/types/customer";
import { ApiResponse } from "@/types/api";

/**
 * Fetch customer list from ASP.NET Core database API GET /api/Demo/customers
 */
export async function getCustomersApi(): Promise<Customer[]> {
  const response = await apiFetch<ApiResponse<Customer>>("/Demo/customers", {
    method: "GET",
  });

  if (response && Array.isArray(response.dataList)) {
    return response.dataList;
  }

  return [];
}

/**
 * Save new customer to database via ASP.NET Core API POST /api/Demo/customer
 */
export async function saveCustomerApi(
  payload: SaveCustomerRequest
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>("/Demo/customer", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update existing customer in database via ASP.NET Core API PUT /api/Demo/update-customer/{Id}
 */
export async function updateCustomerApi(
  id: number | string,
  payload: Customer
): Promise<ApiResponse> {
  const stringId = String(id);
  return apiFetch<ApiResponse>(`/Demo/update-customer/${stringId}`, {
    method: "PUT",
    body: JSON.stringify({
      Id: stringId,
      FName: payload.FName,
      Email: payload.Email,
      CName: payload.CName,
      ATier: payload.ATier,
      Status: payload.Status,
    }),
  });
}

/**
 * Delete customer from database via ASP.NET Core API DELETE /api/Demo/delete-customer/{Id}
 */
export async function deleteCustomerApi(id: number | string): Promise<ApiResponse> {
  const stringId = String(id);
  return apiFetch<ApiResponse>(`/Demo/delete-customer/${stringId}`, {
    method: "DELETE",
  });
}

/**
 * Legacy compatibility alias
 */
export async function createCustomerApi(
  customerData: SaveCustomerRequest
): Promise<ApiResponse> {
  return saveCustomerApi(customerData);
}
