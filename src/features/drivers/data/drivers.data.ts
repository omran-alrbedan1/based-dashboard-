// src/pages/drivers/data/drivers.data.ts
import type { 
  Driver, 
  DriverStats, 
  DriverDocument, 
  DriverOrderHistoryItem, 
  DriverArea 
} from '../types/drivers.types'

export const MOCK_AREAS: DriverArea[] = [
  { id: 1, name: 'عمان' },
  { id: 2, name: 'إربد' },
  { id: 3, name: 'الزرقاء' },
  { id: 4, name: 'العقبة' },
  { id: 5, name: 'السلط' },
  { id: 6, name: 'مادبا' },
]

export const MOCK_DRIVERS: Driver[] = [
  {
    id: 1,
    name: 'خالد المطيري',
    phone: '+962 79 777 8899',
    email: 'khalid@example.com',
    status: 'active',
    gender: 'male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    date_of_birth: '1990-05-15',
    national_id: '9876543210',
    address: 'عمان، جبل عمان، شارع الملك حسين',
    vehicle_type: 'سيارة',
    vehicle_model: 'تويوتا كامري 2022',
    vehicle_color: 'أبيض',
    vehicle_plate: '12-34567',
    license_number: 'DRV-887-2021',
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    areas: [MOCK_AREAS[0], MOCK_AREAS[1]],
    orders_count: 145,
    rating: 4.8,
    reviews_count: 89,
  },
  {
    id: 2,
    name: 'عمر الفهد',
    phone: '+962 79 888 9900',
    email: 'omar@example.com',
    status: 'active',
    gender: 'male',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    date_of_birth: '1995-08-22',
    national_id: '8765432109',
    address: 'إربد، وسط المدينة',
    vehicle_type: 'دراجة نارية',
    vehicle_model: 'هوندا سي بي آر 2023',
    vehicle_color: 'أحمر',
    vehicle_plate: '98-76543',
    license_number: 'MC-456-2022',
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    areas: [MOCK_AREAS[0]],
    orders_count: 98,
    rating: 4.9,
    reviews_count: 67,
  },
  {
    id: 3,
    name: 'سارة القحطاني',
    phone: '+962 78 111 2233',
    email: 'sara@example.com',
    status: 'suspended',
    gender: 'female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    date_of_birth: '2000-12-03',
    national_id: '7654321098',
    address: 'الزرقاء، حي الأميرة عالية',
    vehicle_type: 'سيارة',
    vehicle_model: 'هيونداي إلنترا 2021',
    vehicle_color: 'أسود',
    vehicle_plate: '34-56789',
    license_number: 'DRV-223-2023',
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    areas: [MOCK_AREAS[2], MOCK_AREAS[3]],
    orders_count: 67,
    rating: 4.5,
    reviews_count: 34,
  },
  {
    id: 4,
    name: 'فيصل الدوسري',
    phone: '+962 79 444 5566',
    email: 'faisal@example.com',
    status: 'pending',
    gender: 'male',
    avatar: undefined,
    date_of_birth: '1988-03-10',
    national_id: '6543210987',
    address: 'السلط، شارع الشهداء',
    vehicle_type: 'سيارة',
    vehicle_model: 'نيسان سنترا 2020',
    vehicle_color: 'فضي',
    vehicle_plate: '56-78901',
    license_number: 'DRV-789-2024',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    areas: [MOCK_AREAS[4]],
    orders_count: 0,
    rating: 0,
    reviews_count: 0,
  },
  {
    id: 5,
    name: 'نورة العتيبي',
    phone: '+962 77 777 8899',
    email: 'nora@example.com',
    status: 'offline',
    gender: 'female',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    date_of_birth: '1997-07-18',
    national_id: '5432109876',
    address: 'مادبا، شارع البتراء',
    vehicle_type: 'دراجة نارية',
    vehicle_model: 'ياماها إم تي 2022',
    vehicle_color: 'أزرق',
    vehicle_plate: '78-90123',
    license_number: 'MC-112-2021',
    created_at: new Date(Date.now() - 120 * 86400000).toISOString(),
    areas: [MOCK_AREAS[0], MOCK_AREAS[4], MOCK_AREAS[5]],
    orders_count: 210,
    rating: 4.7,
    reviews_count: 156,
  },
  {
    id: 6,
    name: 'ماجد الزهراني',
    phone: '+962 79 222 3344',
    email: 'majed@example.com',
    status: 'active',
    gender: 'male',
    avatar: undefined,
    date_of_birth: '1992-11-28',
    national_id: '4321098765',
    address: 'إربد، شارع الجامعة',
    vehicle_type: 'سيارة',
    vehicle_model: 'شيفروليه أوبترا 2019',
    vehicle_color: 'أخضر',
    vehicle_plate: '90-12345',
    license_number: 'DRV-334-2020',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    areas: [MOCK_AREAS[1]],
    orders_count: 52,
    rating: 4.3,
    reviews_count: 28,
  },
]

export const MOCK_DRIVER_STATS: Record<number, DriverStats> = {
  1: {
    total_orders: 145,
    completed_orders: 138,
    cancelled_orders: 7,
    avg_rating: 4.8,
    delivery_rate: 95.2,
    avg_delivery_time: 28,
  },
  2: {
    total_orders: 98,
    completed_orders: 95,
    cancelled_orders: 3,
    avg_rating: 4.9,
    delivery_rate: 96.9,
    avg_delivery_time: 22,
  },
  3: {
    total_orders: 67,
    completed_orders: 62,
    cancelled_orders: 5,
    avg_rating: 4.5,
    delivery_rate: 92.5,
    avg_delivery_time: 35,
  },
  5: {
    total_orders: 210,
    completed_orders: 198,
    cancelled_orders: 12,
    avg_rating: 4.7,
    delivery_rate: 94.3,
    avg_delivery_time: 25,
  },
  6: {
    total_orders: 52,
    completed_orders: 48,
    cancelled_orders: 4,
    avg_rating: 4.3,
    delivery_rate: 92.3,
    avg_delivery_time: 30,
  },
}

export const MOCK_DRIVER_DOCUMENTS: Record<number, DriverDocument[]> = {
  1: [
    { id: 1, type: 'national_id', url: '#', verified: true, expires_at: '2026-12-31', uploaded_at: '2024-01-15' },
    { id: 2, type: 'driving_license', url: '#', verified: true, expires_at: '2025-10-15', uploaded_at: '2024-01-15' },
    { id: 3, type: 'vehicle_license', url: '#', verified: true, expires_at: '2025-08-20', uploaded_at: '2024-01-15' },
    { id: 4, type: 'insurance', url: '#', verified: false, expires_at: '2025-06-01', uploaded_at: '2024-03-10' },
    { id: 5, type: 'profile_photo', url: '#', verified: true, uploaded_at: '2024-01-15' },
  ],
  2: [
    { id: 6, type: 'national_id', url: '#', verified: true, expires_at: '2027-03-15', uploaded_at: '2024-02-20' },
    { id: 7, type: 'driving_license', url: '#', verified: true, expires_at: '2025-11-30', uploaded_at: '2024-02-20' },
    { id: 8, type: 'vehicle_license', url: '#', verified: true, expires_at: '2025-05-10', uploaded_at: '2024-02-20' },
    { id: 9, type: 'insurance', url: '#', verified: true, expires_at: '2026-01-20', uploaded_at: '2024-02-20' },
  ],
  3: [
    { id: 10, type: 'national_id', url: '#', verified: true, expires_at: '2026-08-22', uploaded_at: '2024-01-10' },
    { id: 11, type: 'driving_license', url: '#', verified: false, expires_at: '2024-12-01', uploaded_at: '2024-01-10' },
    { id: 12, type: 'vehicle_license', url: '#', verified: true, expires_at: '2025-09-15', uploaded_at: '2024-01-10' },
  ],
  4: [],
  5: [
    { id: 13, type: 'national_id', url: '#', verified: true, expires_at: '2028-01-15', uploaded_at: '2024-06-01' },
    { id: 14, type: 'driving_license', url: '#', verified: true, expires_at: '2026-03-20', uploaded_at: '2024-06-01' },
    { id: 15, type: 'vehicle_license', url: '#', verified: true, expires_at: '2026-07-10', uploaded_at: '2024-06-01' },
    { id: 16, type: 'insurance', url: '#', verified: true, expires_at: '2026-02-28', uploaded_at: '2024-06-01' },
    { id: 17, type: 'profile_photo', url: '#', verified: true, uploaded_at: '2024-06-01' },
  ],
  6: [
    { id: 18, type: 'national_id', url: '#', verified: false, expires_at: '2025-12-31', uploaded_at: '2024-08-15' },
    { id: 19, type: 'driving_license', url: '#', verified: false, expires_at: '2025-11-01', uploaded_at: '2024-08-15' },
    { id: 20, type: 'vehicle_license', url: '#', verified: true, expires_at: '2025-09-20', uploaded_at: '2024-08-15' },
  ],
}

// Simplified mock orders - only what's needed for the list
export const MOCK_DRIVER_ORDERS: Record<number, DriverOrderHistoryItem[]> = {
  1: [
    { 
      id: 1001, 
      order_number: 'ORD-1001',
      status: 'delivered', 
      created_at: new Date(Date.now() - 1 * 3600000).toISOString(), 
      delivery_fee: 20,
      total: 100,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'أحمد محمد', 
        delivery_address: 'عمان، شارع مكة'
      },
      items_count: 3
    },
    { 
      id: 1002, 
      order_number: 'ORD-1002',
      status: 'delivered', 
      created_at: new Date(Date.now() - 3 * 3600000).toISOString(), 
      delivery_fee: 25,
      total: 125,
      currency: 'SAR',
      vendor: { id: 202, name: 'متجر الغذاء الصحي' },
      customer: { 
        name: 'سارة أحمد', 
        delivery_address: 'عمان، عبدون'
      },
      items_count: 2
    },
    { 
      id: 1003, 
      order_number: 'ORD-1003',
      status: 'on_delivery', 
      created_at: new Date(Date.now() - 30 * 60000).toISOString(), 
      delivery_fee: 20,
      total: 80,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'محمد علي', 
        delivery_address: 'عمان، الجبيهة'
      },
      items_count: 4
    },
    { 
      id: 1004, 
      order_number: 'ORD-1004',
      status: 'delivered', 
      created_at: new Date(Date.now() - 24 * 3600000).toISOString(), 
      delivery_fee: 15,
      total: 60,
      currency: 'SAR',
      vendor: { id: 203, name: 'مطحن الأردن' },
      customer: { 
        name: 'ليلى خالد', 
        delivery_address: 'عمان، طبربور'
      },
      items_count: 1
    },
    { 
      id: 1005, 
      order_number: 'ORD-1005',
      status: 'cancelled', 
      created_at: new Date(Date.now() - 48 * 3600000).toISOString(), 
      delivery_fee: 30,
      total: 150,
      currency: 'SAR',
      vendor: { id: 204, name: 'منتجات طبيعية الأردن' },
      customer: { 
        name: 'نادر حسين', 
        delivery_address: 'عمان، الدوار السابع'
      },
      items_count: 5
    },
    { 
      id: 1006, 
      order_number: 'ORD-1006',
      status: 'delivered', 
      created_at: new Date(Date.now() - 72 * 3600000).toISOString(), 
      delivery_fee: 20,
      total: 75,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'رنا سمير', 
        delivery_address: 'عمان، خلدا'
      },
      items_count: 2
    },
    { 
      id: 1007, 
      order_number: 'ORD-1007',
      status: 'pending', 
      created_at: new Date(Date.now() - 15 * 60000).toISOString(), 
      delivery_fee: 18,
      total: 45,
      currency: 'SAR',
      vendor: { id: 202, name: 'متجر الغذاء الصحي' },
      customer: { 
        name: 'يوسف كمال', 
        delivery_address: 'عمان، الشميساني'
      },
      items_count: 2
    },
    { 
      id: 1008, 
      order_number: 'ORD-1008',
      status: 'preparing', 
      created_at: new Date(Date.now() - 45 * 60000).toISOString(), 
      delivery_fee: 22,
      total: 95,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'نورا سعيد', 
        delivery_address: 'عمان، العبدلي'
      },
      items_count: 3
    },
  ],
  2: [
    { 
      id: 2001, 
      order_number: 'ORD-2001',
      status: 'delivered', 
      created_at: new Date(Date.now() - 2 * 3600000).toISOString(), 
      delivery_fee: 18,
      total: 52,
      currency: 'SAR',
      vendor: { id: 202, name: 'متجر الغذاء الصحي' },
      customer: { 
        name: 'محمود درويش', 
        delivery_address: 'إربد، شارع البتراء'
      },
      items_count: 3
    },
    { 
      id: 2002, 
      order_number: 'ORD-2002',
      status: 'delivered', 
      created_at: new Date(Date.now() - 5 * 3600000).toISOString(), 
      delivery_fee: 22,
      total: 35,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'هدى رشيد', 
        delivery_address: 'إربد، شارع الجامعة'
      },
      items_count: 2
    },
    { 
      id: 2003, 
      order_number: 'ORD-2003',
      status: 'delivered', 
      created_at: new Date(Date.now() - 24 * 3600000).toISOString(), 
      delivery_fee: 20,
      total: 20,
      currency: 'SAR',
      vendor: { id: 203, name: 'مطحن الأردن' },
      customer: { 
        name: 'باسل عارف', 
        delivery_address: 'إربد، وسط البلد'
      },
      items_count: 1
    },
    { 
      id: 2004, 
      order_number: 'ORD-2004',
      status: 'on_delivery', 
      created_at: new Date(Date.now() - 20 * 60000).toISOString(), 
      delivery_fee: 25,
      total: 110,
      currency: 'SAR',
      vendor: { id: 204, name: 'منتجات طبيعية الأردن' },
      customer: { 
        name: 'رنا شريف', 
        delivery_address: 'إربد، الحي الشرقي'
      },
      items_count: 4
    },
  ],
  3: [
    { 
      id: 3001, 
      order_number: 'ORD-3001',
      status: 'delivered', 
      created_at: new Date(Date.now() - 6 * 3600000).toISOString(), 
      delivery_fee: 15,
      total: 45,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'علياء حسن', 
        delivery_address: 'الزرقاء، شارع الملك عبدالله'
      },
      items_count: 2
    },
    { 
      id: 3002, 
      order_number: 'ORD-3002',
      status: 'delivered', 
      created_at: new Date(Date.now() - 12 * 3600000).toISOString(), 
      delivery_fee: 20,
      total: 85,
      currency: 'SAR',
      vendor: { id: 202, name: 'متجر الغذاء الصحي' },
      customer: { 
        name: 'محمود عباس', 
        delivery_address: 'الزرقاء، حي الراشد'
      },
      items_count: 3
    },
  ],
  4: [],
  5: [
    { 
      id: 5001, 
      order_number: 'ORD-5001',
      status: 'delivered', 
      created_at: new Date(Date.now() - 4 * 3600000).toISOString(), 
      delivery_fee: 25,
      total: 120,
      currency: 'SAR',
      vendor: { id: 204, name: 'منتجات طبيعية الأردن' },
      customer: { 
        name: 'سعاد محمد', 
        delivery_address: 'مادبا، شارع البتراء'
      },
      items_count: 4
    },
    { 
      id: 5002, 
      order_number: 'ORD-5002',
      status: 'delivered', 
      created_at: new Date(Date.now() - 8 * 3600000).toISOString(), 
      delivery_fee: 18,
      total: 55,
      currency: 'SAR',
      vendor: { id: 203, name: 'مطحن الأردن' },
      customer: { 
        name: 'خالد يونس', 
        delivery_address: 'مادبا، وسط المدينة'
      },
      items_count: 2
    },
    { 
      id: 5003, 
      order_number: 'ORD-5003',
      status: 'on_delivery', 
      created_at: new Date(Date.now() - 45 * 60000).toISOString(), 
      delivery_fee: 22,
      total: 95,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'رانيا محمود', 
        delivery_address: 'مادبا، شارع السلام'
      },
      items_count: 3
    },
  ],
  6: [
    { 
      id: 6001, 
      order_number: 'ORD-6001',
      status: 'delivered', 
      created_at: new Date(Date.now() - 10 * 3600000).toISOString(), 
      delivery_fee: 20,
      total: 65,
      currency: 'SAR',
      vendor: { id: 201, name: 'مخبز الحبوب الخالية' },
      customer: { 
        name: 'أمل عبدالله', 
        delivery_address: 'إربد، شارع الجامعة'
      },
      items_count: 2
    },
    { 
      id: 6002, 
      order_number: 'ORD-6002',
      status: 'pending', 
      created_at: new Date(Date.now() - 60 * 60000).toISOString(), 
      delivery_fee: 28,
      total: 130,
      currency: 'SAR',
      vendor: { id: 202, name: 'متجر الغذاء الصحي' },
      customer: { 
        name: 'فهد القحطاني', 
        delivery_address: 'إربد، الحي الشرقي'
      },
      items_count: 5
    },
  ],
}

export const MOCK_AVAILABLE_AREAS: DriverArea[] = [
  { id: 1, name: "Downtown" },
  { id: 2, name: "Northside" },
  { id: 3, name: "Southside" },
  { id: 4, name: "Eastside" },
  { id: 5, name: "Westside" },
  { id: 6, name: "Airport Area" },
  { id: 7, name: "University District" },
  { id: 8, name: "Business Park" }
];