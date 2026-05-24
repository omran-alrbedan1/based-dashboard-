
export const API_ENDPOINTS = {
  // Product Approval
  APPROVAL_REQUESTS: "/admin/product-approval/requests",
  APPROVAL_REQUEST_BY_ID: (id: string) => `/admin/product-approval/requests/${id}`,
  APPROVE_PRODUCT: (id: string) => `/admin/product-approval/${id}/approve`,
  REJECT_PRODUCT: (id: string) => `/admin/product-approval/${id}/reject`,

  // Vendors & Categories for filters
  VENDORS_LIST: "/admin/vendors/list",
  CATEGORIES_LIST: "/admin/categories/list",
}