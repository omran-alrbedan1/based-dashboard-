# Product Approval — API Requirements

**Date:** 21/05/2026  
**Section:** Admin — Product Approval Management

---

## APIs Needed

### 1. Get Approval Requests
```
GET /api/admin/product-approval/requests
```

**Query Parameters:**

| Param | Type | Example |
|-------|------|---------|
| `search` | string | `chicken` — searches in `name.en` and `name.ar` |
| `status` | string | `Pending` / `Approved` / `Rejected` |
| `category` | string | `Meals` / `Bakery` / `Snacks` / `Drinks` |
| `vendorId` | string | `VEN-001` |
| `page` | number | `1` |
| `limit` | number | `10` |

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "requests": [ ...ProductApprovalRequest[] ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "itemsPerPage": 10
    }
  }
}
```

---

### 2. Get Single Request Details
```
GET /api/admin/product-approval/requests/:id
```

**Expected Response:**
```json
{
  "success": true,
  "data": ProductApprovalRequest
}
```

---

### 3. Approve a Product
```
POST /api/admin/product-approval/:id/approve
```

No request body needed.

**Expected Response:**
```json
{
  "success": true
}
```

---

### 4. Reject a Product
```
POST /api/admin/product-approval/:id/reject
```

**Request Body:**
```json
{
  "reasonEn": "Rejection reason in English",
  "reasonAr": "سبب الرفض بالعربي"
}
```

Both fields are **required**.

**Expected Response:**
```json
{
  "success": true
}
```

---

### 5. Get Vendors List (for filter dropdown)
```
GET /api/admin/vendors/list
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    { "id": "VEN-001", "name": { "en": "Al Asala Restaurant", "ar": "مطعم الأصالة" } }
  ]
}
```

---

### 6. Get Categories List (for filter dropdown)
```
GET /api/admin/categories/list
```

**Expected Response:**
```json
{
  "success": true,
  "data": ["Meals", "Bakery", "Snacks", "Drinks"]
}
```

---

## Data Shape — `ProductApprovalRequest`

```typescript
interface ProductApprovalRequest {
  id: string
  productId: string
  vendorId: string

  name: { en: string; ar: string }
  description: { en: string; ar: string }

  price: number
  category: "Meals" | "Bakery" | "Snacks" | "Drinks"
  mainImage: string  // URL

  ingredients: Array<{ en: string; ar: string }>

  glutenStatus: "Gluten Free" | "May Contain Gluten" | "Not Gluten Free"

  nutrition: {
    calories: number
    protein: number
    carbohydrates: number
    fat: number
    sugar: number
    sodium: number
  }

  customization: Array<{
    name: { en: string; ar: string }
    price: number
  }>

  certificate: {
    type: "image" | "pdf"
    url: string
    label: { en: string; ar: string }
    expiryDate: string  // YYYY-MM-DD
  }

  submittedDate: string  // YYYY-MM-DD
  status: "Pending" | "Approved" | "Rejected"

  vendorName: { en: string; ar: string }
  vendorEmail: string
  vendorPhone: string

  rejectionReason?: { en: string; ar: string }  // only when status is Rejected
}
```

---

## Statuses

| Status | When |
|--------|------|
| `Pending` | Product submitted, waiting for review |
| `Approved` | Admin approved the product |
| `Rejected` | Admin rejected — `rejectionReason` must be included in the response |

---

## Notes

- All text fields must be provided in **both English and Arabic**
- `rejectionReason` is only required when `status` is `Rejected`
- Certificate `expiryDate` format: `YYYY-MM-DD`
- Images and PDFs are sent as URLs
- Search must be **case-insensitive** and cover both `name.en` and `name.ar`
- All filters can be combined together (e.g. `status=Pending&category=Meals&search=دجاج`)