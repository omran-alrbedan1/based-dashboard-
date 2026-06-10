// src/features/products/data/products.data.ts

export type ProductApprovalStatus = "Pending" | "Approved" | "Rejected";
export type GlutenStatus = "Gluten Free" | "May Contain Gluten" | "Not Gluten Free";
export type CertificateType = "image" | "pdf";
export type CategoryType = "Meals" | "Bakery" | "Snacks" | "Drinks";

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface CertificateRecord {
  type: CertificateType;
  url: string;
  label: LocalizedString;
  expiryDate: string;
}

export interface VendorRecord {
  id: string;
  storeName: LocalizedString;
  email: string;
  phone: string;
  registrationDate: string;
}

export interface NutritionRecord {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  sugar: number;
  sodium: number;
}

export interface CustomizationItem {
  name: LocalizedString;
  price: number;
}

export interface ProductApprovalRequest {
  id: string;
  productId: string;
  vendorId: string;
  name: LocalizedString;
  deion: LocalizedString;
  price: number;
  mainImage: string;
  category: CategoryType;
  ingredients: LocalizedString[];
  glutenStatus: GlutenStatus;
  nutrition: NutritionRecord;
  customization: CustomizationItem[];
  certificate: CertificateRecord;
  submittedDate: string;
  status: ProductApprovalStatus;
  vendorName: LocalizedString;
  rejectionReason?: LocalizedString;
}

export const approvalRequests: ProductApprovalRequest[] = [
  {
    id: "PROD-001",
    productId: "PROD-001",
    vendorId: "VEN-001",
    name: {
      en: "Chicken Kabsa Meal",
      ar: "وجبة كبسة الدجاج",
    },
    deion: {
      en: "Traditional Chicken Kabsa meal with basmati rice, nuts, and special tomato sauce. Served with salad and yogurt.",
      ar: "وجبة كبسة دجاج تقليدية مع أرز بسمتي، مكسرات، وصلصة الطماطم الخاصة. تقدم مع سلطة ولبن.",
    },
    price: 45.00,
    mainImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80",
    category: "Meals",
    ingredients: [
      { en: "Basmati rice", ar: "أرز بسمتي" },
      { en: "Chicken", ar: "دجاج" },
      { en: "Onion", ar: "بصل" },
      { en: "Tomato", ar: "طماطم" },
      { en: "Mixed nuts", ar: "مكسرات مشكلة" },
      { en: "Kabsa spices", ar: "بهارات كبسة" },
    ],
    glutenStatus: "Gluten Free",
    nutrition: {
      calories: 620,
      protein: 38,
      carbohydrates: 72,
      fat: 22,
      sugar: 8,
      sodium: 890,
    },
    customization: [
      {
        name: { en: "Extra rice", ar: "أرز إضافي" },
        price: 10,
      },
      {
        name: { en: "Extra chicken", ar: "دجاج إضافي" },
        price: 15,
      },
      {
        name: { en: "Spicy sauce", ar: "صلصة حارة" },
        price: 3,
      },
    ],
    certificate: {
      type: "pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      label: {
        en: "Gluten Free Certificate",
        ar: "شهادة خلو من الجلوتين",
      },
      expiryDate: "2027-01-15",
    },
    submittedDate: "2026-05-15",
    status: "Pending",
    vendorName: {
      en: "Al Asala Restaurant",
      ar: "مطعم الأصالة",
    },
  },
  {
    id: "PROD-002",
    productId: "PROD-002",
    vendorId: "VEN-002",
    name: {
      en: "Cheese & Thyme Pastries",
      ar: "معجنات جبنة وزعتر",
    },
    deion: {
      en: "Fresh pastries stuffed with cheese and Palestinian thyme mixture, baked daily in the oven.",
      ar: "معجنات طازجة محشوة بخليط الجبنة والزعتر الفلسطيني، تُخبز يومياً في الفرن.",
    },
    price: 12.50,
    mainImage: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
    category: "Bakery",
    ingredients: [
      { en: "Wheat flour", ar: "دقيق قمح" },
      { en: "White cheese", ar: "جبنة بيضاء" },
      { en: "Palestinian thyme", ar: "زعتر فلسطيني" },
      { en: "Olive oil", ar: "زيت زيتون" },
      { en: "Sesame", ar: "سمسم" },
    ],
    glutenStatus: "May Contain Gluten",
    nutrition: {
      calories: 310,
      protein: 12,
      carbohydrates: 35,
      fat: 14,
      sugar: 3,
      sodium: 520,
    },
    customization: [
      {
        name: { en: "Extra cheese", ar: "جبنة إضافية" },
        price: 4,
      },
      {
        name: { en: "Extra olive oil", ar: "زيت زيتون إضافي" },
        price: 2,
      },
    ],
    certificate: {
      type: "image",
      url: "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=900&q=80",
      label: {
        en: "Food Quality Certificate",
        ar: "شهادة الجودة الغذائية",
      },
      expiryDate: "2026-10-20",
    },
    submittedDate: "2026-05-10",
    status: "Approved",
    vendorName: {
      en: "Al Quds Bakeries",
      ar: "مخابز القدس",
    },
  },
  {
    id: "PROD-003",
    productId: "PROD-003",
    vendorId: "VEN-003",
    name: {
      en: "Natural Mango Juice",
      ar: "عصير مانجو طبيعي",
    },
    deion: {
      en: "100% fresh mango juice with no added sugar, cold-pasteurized and bottled.",
      ar: "عصير مانجو طازج 100% بدون سكر مضاف، معلب بطريقة التعقيم البارد.",
    },
    price: 18.00,
    mainImage: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
    category: "Drinks",
    ingredients: [
      { en: "Fresh mango", ar: "مانجو طازج" },
      { en: "Water", ar: "ماء" },
      { en: "Citric acid", ar: "حامض الستريك" },
    ],
    glutenStatus: "Gluten Free",
    nutrition: {
      calories: 110,
      protein: 1,
      carbohydrates: 26,
      fat: 0.5,
      sugar: 22,
      sodium: 5,
    },
    customization: [],
    certificate: {
      type: "image",
      url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80",
      label: {
        en: "Sterilization Certificate",
        ar: "شهادة التعقيم",
      },
      expiryDate: "2026-06-01",
    },
    submittedDate: "2026-05-05",
    status: "Rejected",
    vendorName: {
      en: "Nature Juices",
      ar: "عصائر الطبيعة",
    },
    rejectionReason: {
      en: "The sterilization certificate has expired and no new certificate has been submitted.",
      ar: "شهادة التعقيم منتهية الصلاحية ولم يتم تقديم شهادة جديدة.",
    },
  },
  {
    id: "PROD-004",
    productId: "PROD-004",
    vendorId: "VEN-004",
    name: {
      en: "Sweet Potato Chips",
      ar: "رقائق بطاطا حلوة",
    },
    deion: {
      en: "Crunchy baked sweet potato chips with sea salt, healthy and delicious snack.",
      ar: "رقائق بطاطا حلوة مقرمشة مخبوزة مع ملح البحر، وجبة خفيفة صحية ولذيذة.",
    },
    price: 22.00,
    mainImage: "https://images.unsplash.com/photo-1566478989037-eec170784d8b?auto=format&fit=crop&w=900&q=80",
    category: "Snacks",
    ingredients: [
      { en: "Sweet potato", ar: "بطاطا حلوة" },
      { en: "Olive oil", ar: "زيت زيتون" },
      { en: "Sea salt", ar: "ملح البحر" },
      { en: "Paprika", ar: "بابريكا" },
    ],
    glutenStatus: "Gluten Free",
    nutrition: {
      calories: 380,
      protein: 4,
      carbohydrates: 52,
      fat: 18,
      sugar: 12,
      sodium: 420,
    },
    customization: [
      {
        name: { en: "Large size", ar: "حجم كبير" },
        price: 8,
      },
      {
        name: { en: "Extra salt", ar: "ملح إضافي" },
        price: 1,
      },
    ],
    certificate: {
      type: "pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      label: {
        en: "Organic Certificate",
        ar: "شهادة عضوي",
      },
      expiryDate: "2026-12-30",
    },
    submittedDate: "2026-05-18",
    status: "Pending",
    vendorName: {
      en: "Healthy Bites",
      ar: "لدغات صحية",
    },
  },
];