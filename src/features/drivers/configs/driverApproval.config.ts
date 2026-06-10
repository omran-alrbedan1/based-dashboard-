import { FilterConfig } from '@/hooks/useFilter'
import type { DriverApprovalRequest } from '../data/driverApproval.data'
import { icons } from '@/constants/images';

export const driverApprovalFilterConfig: FilterConfig<DriverApprovalRequest>[] = [
  {
    key: 'name',
    label: 'Search',
    type: 'search',
    getValue: (driver) => [driver.driverName, driver.email, driver.phone],
  },
  {
    key: 'vehicleType',
    label: 'Vehicle Type',
    type: 'select',
    options: [
      { value: 'car', label: 'Car' },
      { value: 'motorcycle', label: 'Motorcycle' },
    ],
    getValue: (driver) => driver.vehicleType.toLowerCase(),
  },
  {
    key: 'dateRange',
    label: 'Submitted Date',
    type: 'range',
    getValue: (driver) => new Date(driver.submittedDate).getTime(),
  },
]


export  const DOCUMENT_META: Record<string, { label: string; icon: string }> = {
    national_id: { label: 'National ID', icon: icons.nationalId },
    driving_license: { label: 'Driving License', icon: icons.drivingLicense },
    vehicle_license: { label: 'Vehicle License', icon: icons.vehicleLicense },
    insurance: { label: 'Insurance', icon: icons.insuranceDocument },
  }