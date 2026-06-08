import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Hash,
  User,
  Building2,
  CheckCircle,
  Coins,
  CalendarDays,
  Clock,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { DataTable, type Column } from '@/components/shared/custom/DataTable';
import { OrderStatusBadge } from '@/components/shared/badges';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDateTime } from '@/lib/formatter';
import type { Order } from '../types/orders.types';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface AvatarProps {
  name: string;
  imageUrl?: string;
}

function Avatar({ name, imageUrl }: AvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="h-8 w-8 rounded-full object-cover ring-1 ring-border shrink-0"
      />
    );
  }

  return (
    <div
      className={cn(
        'flex h-8 w-8 text-white items-center justify-center rounded-full text-[11px] font-medium bg-gradient-to-r from-primary to-primary/70'
      )}
    >
      {getInitials(name)}
    </div>
  );
}

function MobileOrderCard({ item, onViewDetails }: { 
  item: Order; 
  onViewDetails: () => void;
}) {
  const { t } = useTranslation('orders');
  return (
    <div
      className="bg-card border border-border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1">
          <Avatar name={item.customer.name} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {item.customer.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {item.customer.email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.supplier')}</p>
          <p className="text-sm font-medium text-foreground truncate">
            {item.supplier.name}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.status')}</p>
          <OrderStatusBadge status={item.status} size="sm" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.total')}</p>
          <p className="font-semibold text-foreground">
            {formatCurrency(item.total, item.currency)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.eta')}</p>
          <p className="text-xs text-muted-foreground">
            {item.delivery.eta
              ? new Date(item.delivery.eta).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'}
          </p>
        </div>
      </div>

      <div className="mb-3 pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground mb-1">{t('table.date')}</p>
        <p className="text-xs text-muted-foreground">
          {formatDateTime(item.created_at)}
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2 gap-2"
        onClick={onViewDetails}
      >
        <Eye className="h-3.5 w-3.5" />
        {t('table.details')}
        <ChevronRight className="h-3.5 w-3.5 ml-auto" />
      </Button>
    </div>
  );
}

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
  pagination?: {
    total: number;
    page: number;
    lastPage: number;
  };
  onPageChange?: (page: number) => void;
}

export function OrdersTable({ 
  orders, 
  loading = false,
  pagination = {
    total: 0,
    page: 1,
    lastPage: 1,
  },
  onPageChange = () => {},
}: OrdersTableProps) {
  const navigate = useNavigate();
  const { t } = useTranslation('orders');

  const columns: Column<Order>[] = [
    {
      key: 'order_number',
      header: t('table.orderNumber'),
      headerIcon: Hash,
      width: 'w-32',
      cell: (order) => (
        <span className="font-mono text-xs font-semibold text-foreground bg-muted px-2 py-1 rounded-md">
          {order.order_number}
        </span>
      ),
    },
    {
      key: 'customer',
      header: t('table.customer'),
      headerIcon: User,
      width: 'w-48',
      cell: (order) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={order.customer.name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-tight text-foreground">
              {order.customer.name}
            </p>
            <p className="truncate text-xs leading-tight text-muted-foreground">
              {order.customer.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'supplier',
      header: t('table.supplier'),
      headerIcon: Building2,
      width: 'w-40',
      cell: (order) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {order.supplier.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {order.supplier.phone}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('table.status'),
      headerIcon: CheckCircle,
      width: 'w-28',
      cell: (order) => <OrderStatusBadge status={order.status} size="sm" />,
    },
    {
      key: 'total',
      header: t('table.total'),
      headerIcon: Coins,
      width: 'w-24',
      cell: (order) => (
        <span className="font-semibold text-sm tabular-nums">
          {formatCurrency(order.total, order.currency)}
        </span>
      ),
    },
    {
      key: 'eta',
      header: t('table.eta'),
      headerIcon: Clock,
      width: 'w-24',
      cell: (order) => (
        <span className="text-xs text-muted-foreground">
          {order.delivery.eta
            ? new Date(order.delivery.eta).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '—'}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: t('table.date'),
      headerIcon: CalendarDays,
      width: 'w-32',
      cell: (order) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            {format(new Date(order.created_at), 'MMM d, yyyy')}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 ml-5">
            {format(new Date(order.created_at), 'h:mm a')}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: 'w-24',
      cell: (order) => (
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 px-2.5 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/orders/${order.id}`);
          }}
        >
          <Eye className="h-3.5 w-3.5 text-primary" />
          {t('table.details')}
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      data={orders}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      onRowClick={(order) => navigate(`/orders/${order.id}`)}
      getRowId={(order) => order.id}
      mobileCardComponent={MobileOrderCard}
      emptyMessage={t('table.noData')}
    />
  );
}