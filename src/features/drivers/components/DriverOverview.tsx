import { useTranslation } from 'react-i18next'
import {
    Phone,
    Mail,
    Calendar,
    User,
    Store,
    Truck,
    Package,
    Activity,
    Shield,
    Star,
    IdCard,
    Home,
    Car,
    Palette,
    Hash,
    Navigation,
    Briefcase,
} from 'lucide-react'
import DriverStatusBadge from './DriverStatusBadge'
import type { Driver } from '../types/drivers.types'
import { MetricStatusCard } from '@/components/shared/cards/MetricCard'
import { formatJoinedDate } from '@/lib/formatter'

interface DriverOverviewProps {
    driver: Driver
}

export const DriverOverview: React.FC<DriverOverviewProps> = ({ driver }) => {
    const { t, i18n } = useTranslation('drivers')

    const {
        name,
        email,
        phone,
        avatar,
        status,
        areas,
        created_at,
        gender,
        date_of_birth,
        national_id,
        address,
        vehicle_type,
        vehicle_model,
        vehicle_color,
        vehicle_plate,
        license_number,
        orders_count,
        rating,
        reviews_count,
    } = driver

    const joinedDate = formatJoinedDate(created_at, i18n.language)

    const stats = {
        totalDeliveries: orders_count || 0,
        onTimeRate: 98,
        safetyScore: 95,
        rating: rating || 0,
        reviewCount: reviews_count || 0,
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricStatusCard
                    title={t('stats.deliveries')}
                    value={stats.totalDeliveries}
                    icon={Package}
                />

                <MetricStatusCard
                    title={t('stats.onTimeRate')}
                    value={stats.onTimeRate}
                    icon={Activity}
                    suffix="%"
                />

                <MetricStatusCard
                    title={t('stats.safetyScore')}
                    value={stats.safetyScore}
                    icon={Shield}
                />

                <MetricStatusCard
                    title={t('stats.rating')}
                    value={stats.rating}
                    icon={Star}
                />
            </div>

            <div className="rounded-2xl border border-border bg-background-card overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="md:w-[340px] bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-8 flex flex-col items-center justify-center border-r border-border relative">
                        {/* Status Badge - Top Right */}
                        <div className="absolute top-4 right-4">
                            <DriverStatusBadge status={status} variant="pill" size="md" />
                        </div>

                        <div className="relative group/profile">
                            <div className="h-36 w-36 rounded-full bg-linear-to-br from-primary to-primary/70 p-1">
                                <div className="h-full w-full rounded-full bg-background-card flex items-center justify-center overflow-hidden">
                                    {avatar ? (
                                        <img src={avatar} alt={name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-5xl font-bold text-primary">
                                            {name?.charAt(0).toUpperCase() || '?'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <h3 className="mt-5 text-2xl font-bold text-text-primary text-center">
                            {name || '-'}
                        </h3>

                        {/* Email under name */}
                        <p className="text-sm text-text-secondary text-center mt-1">
                            {email || '-'}
                        </p>
                    </div>

                    <div className="flex-1 p-8">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Phone */}
                            <div className="flex items-center gap-4 group/contact">
                                <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover/contact:bg-primary group-hover/contact:text-white">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.phone')}</p>
                                    <p className="text-sm font-semibold text-text-primary mt-0.5">{phone || '-'}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4 group/contact">
                                <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover/contact:bg-primary group-hover/contact:text-white">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.email')}</p>
                                    <p className="text-sm font-semibold text-text-primary truncate mt-0.5">{email || '-'}</p>
                                </div>
                            </div>

                            {/* Service Areas */}
                            <div className="flex items-center gap-4 group/contact">
                                <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover/contact:bg-primary group-hover/contact:text-white">
                                    <Navigation size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.areas')}</p>
                                    <p className="text-sm font-semibold text-text-primary mt-0.5">
                                        {areas?.length
                                            ? areas.slice(0, 2).map((a) => a.name).join(', ')
                                            : '-'
                                        }
                                        {areas && areas.length > 2 && (
                                            <span className="text-xs text-text-muted ml-1">
                                                +{areas.length - 2}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Joined Date */}
                            <div className="flex items-center gap-4 group/contact">
                                <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover/contact:bg-primary group-hover/contact:text-white">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.joined')}</p>
                                    <p className="text-sm font-semibold text-text-primary mt-0.5">{joinedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {(gender || date_of_birth || national_id || address) && (
                <div className="rounded-2xl border border-border bg-background-card p-6">
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                            <User className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-text-primary">{t('overview.personalInfo')}</h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Gender */}
                        {gender && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <User size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.gender')}</p>
                                    <p className="text-sm font-medium text-text-primary mt-1">{gender}</p>
                                </div>
                            </div>
                        )}

                        {/* Date of Birth */}
                        {date_of_birth && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <Calendar size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.dateOfBirth')}</p>
                                    <p className="text-sm font-medium text-text-primary mt-1">{new Date(date_of_birth).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}

                        {/* National ID */}
                        {national_id && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <IdCard size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.nationalId')}</p>
                                    <p className="text-sm font-medium text-text-primary font-mono mt-1">{national_id}</p>
                                </div>
                            </div>
                        )}

                        {/* Address - Full width */}
                        {address && (
                            <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <Home size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.address')}</p>
                                    <p className="text-sm font-medium text-text-primary mt-1">{address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(vehicle_type || vehicle_model || vehicle_color || vehicle_plate || license_number) && (
                <div className="rounded-2xl border border-border bg-background-card p-6">
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                            <Truck className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-text-primary">{t('overview.vehicleInfo')}</h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Vehicle Type */}
                        {vehicle_type && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <Car size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('driverCard.vehicle')}</p>
                                    <p className="text-sm font-medium text-text-primary mt-1">{vehicle_type}</p>
                                </div>
                            </div>
                        )}

                        {/* Vehicle Model */}
                        {vehicle_model && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <Briefcase size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.vehicleModel')}</p>
                                    <p className="text-sm font-medium text-text-primary mt-1">{vehicle_model}</p>
                                </div>
                            </div>
                        )}

                        {/* Vehicle Color */}
                        {vehicle_color && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <Palette size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.vehicleColor')}</p>
                                    <p className="text-sm font-medium text-text-primary flex items-center gap-2 mt-1">
                                        <span
                                            className="inline-block h-3 w-3 rounded-full shadow-sm"
                                        />
                                        {vehicle_color}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Vehicle Plate */}
                        {vehicle_plate && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <Hash size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.vehiclePlate')}</p>
                                    <p className="text-sm font-medium text-text-primary uppercase mt-1">{vehicle_plate}</p>
                                </div>
                            </div>
                        )}

                        {/* License Number - Full width */}
                        {license_number && (
                            <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-3">
                                <div className="mt-0.5">
                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                        <IdCard size={14} className="text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{t('overview.licenseNumber')}</p>
                                    <p className="text-sm font-medium text-text-primary font-mono mt-1">{license_number}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}