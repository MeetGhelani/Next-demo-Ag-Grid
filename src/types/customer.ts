export interface Customer {
  Id?: number | string;
  FName: string;
  Email: string;
  CName: string;
  ATier: string; // "standard" | "enterprise" | "VIP"
  Status: string; // "Active" | "Inactive"
  CreatedAt?: string;

  // Optional compatibility fields
  id?: string | number;
  name?: string;
  email?: string;
  company?: string;
  tier?: string;
  status?: string;
  totalSpent?: number;
  ordersCount?: number;
}

export interface SaveCustomerRequest {
  FName: string;
  Email: string;
  CName: string;
  ATier: string;
  Status: string;
}
