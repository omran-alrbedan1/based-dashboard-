export type VendorApprovalStatus = "Pending" | "Approved" | "Rejected"

export interface VendorApprovalRequest {
  id: string
  storeName: { en: string; ar: string }
  ownerName: string
  email: string
  phone: string
  type: "restaurant" | "store" | "supplier"
  area: string
  status: VendorApprovalStatus
  submittedDate: string
  rejectionReason?: { en: string; ar: string }
}

export const vendorApprovalRequests: VendorApprovalRequest[] = [
  {
    id: "VEN-APP-001",
    storeName: { en: "Golden Oven Bakery", ar: "مخبز الفرن الذهبي" },
    ownerName: "Khaled Al-Masri",
    email: "khaled@goldenoven.jo",
    phone: "+962791234111",
    type: "store",
    area: "Amman",
    status: "Pending",
    submittedDate: "2026-06-01",
  },
  {
    id: "VEN-APP-002",
    storeName: { en: "Fresh Harvest Market", ar: "سوق الحصاد الطازج" },
    ownerName: "Layla Haddad",
    email: "layla@freshharvest.jo",
    phone: "+962792345222",
    type: "supplier",
    area: "Zarqa",
    status: "Pending",
    submittedDate: "2026-05-28",
  },
  {
    id: "VEN-APP-003",
    storeName: { en: "Al Rabie Restaurant", ar: "مطعم الربيع" },
    ownerName: "Mohammad Al-Ali",
    email: "mohammad@alrabie.jo",
    phone: "+962793456333",
    type: "restaurant",
    area: "Irbid",
    status: "Approved",
    submittedDate: "2026-05-20",
  },
  {
    id: "VEN-APP-004",
    storeName: { en: "Nature's Pantry", ar: "مخزن الطبيعة" },
    ownerName: "Sara Nasser",
    email: "sara@naturespantry.jo",
    phone: "+962794567444",
    type: "store",
    area: "Amman",
    status: "Rejected",
    submittedDate: "2026-05-15",
    rejectionReason: {
      en: "Gluten-free certificate is expired. Please renew and resubmit.",
      ar: "شهادة خلو من الجلوتين منتهية الصلاحية. يرجى التجديد وإعادة التقديم.",
    },
  },
  {
    id: "VEN-APP-005",
    storeName: { en: "Taza Grill House", ar: "مطعم طازة جريل" },
    ownerName: "Ahmad Odeh",
    email: "ahmad@tazagrill.jo",
    phone: "+962795678555",
    type: "restaurant",
    area: "Aqaba",
    status: "Pending",
    submittedDate: "2026-06-03",
  },
  {
    id: "VEN-APP-006",
    storeName: { en: "Daily Bread Supplies", ar: "تموين الخبز اليومي" },
    ownerName: "Rami Khalaf",
    email: "rami@dailybread.jo",
    phone: "+962796789666",
    type: "supplier",
    area: "Amman",
    status: "Pending",
    submittedDate: "2026-06-02",
  },
]
