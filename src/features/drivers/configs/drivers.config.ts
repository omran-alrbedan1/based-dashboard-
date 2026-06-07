import { FilterConfig } from '@/hooks/useFilter';
import type { Driver } from '../types/drivers.types';
import type { DriverStatus } from '../types/drivers.types';

export interface DriverStatusConfig {
  label: string;
  labelAr: string;
  color: string;
  textColor: string;
  dotColor: string;
  icon: React.ComponentType<any>;
  iconColor?: string;
}

export const driverFilterConfig: FilterConfig<Driver>[] = [
  {
    key: 'search',
    label: 'Search',
    type: 'search',
    getValue: (driver) => [driver.name, driver.phone, driver.email ?? ''],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'suspended', label: 'Suspended' },
      { value: 'pending', label: 'Pending' },
      { value: 'offline', label: 'Offline' },
    ],
    getValue: (driver) => driver.status,
  },
  {
    key: 'area_id',
    label: 'Area',
    type: 'select',
    options: [
      { value: '1', label: 'عمان' },
      { value: '2', label: 'إربد' },
      { value: '3', label: 'الزرقاء' },
      { value: '4', label: 'العقبة' },
      { value: '5', label: 'السلط' },
      { value: '6', label: 'مادبا' },
    ],
    getValue: (driver) => String(driver.areas?.[0]?.id ?? ''),
  },
]

export const driverStatusConfig: Record<DriverStatus, DriverStatusConfig> = {
  active: {
    label: 'Active',
    labelAr: 'نشط',
    color: 'bg-[#4A7C3F]/10',
    textColor: 'text-[#4A7C3F]',
    dotColor: 'bg-[#4A7C3F]',
    icon: () => null,
  },
  suspended: {
    label: 'Suspended',
    labelAr: 'موقوف',
    color: 'bg-[#DC2626]/10',
    textColor: 'text-[#DC2626]',
    dotColor: 'bg-[#DC2626]',
    icon: () => null,
  },
  pending: {
    label: 'Pending',
    labelAr: 'بانتظار الموافقة',
    color: 'bg-[#D97706]/10',
    textColor: 'text-[#D97706]',
    dotColor: 'bg-[#D97706]',
    icon: () => null,
  },
  offline: {
    label: 'Offline',
    labelAr: 'غير متصل',
    color: 'bg-[#6B7280]/10',
    textColor: 'text-[#6B7280]',
    dotColor: 'bg-[#6B7280]',
    icon: () => null,
  },
}
