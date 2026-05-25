import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order } from '../types/orders.types';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { OrderStatusBadge } from '@/components/shared/badges';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDateTime } from '@/lib/formatter';
import { useState, useEffect } from 'react';

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
  index: number;
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

// Mobile Card Component
function MobileOrderCard({ order, index, onViewDetails, t }: { 
  order: Order; 
  index: number; 
  onViewDetails: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1">
          <Avatar
            name={order.customer.name}
            imageUrl={undefined}
            index={index}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {order.customer.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {order.customer.email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.supplier')}</p>
          <p className="text-sm font-medium text-foreground truncate">
            {order.supplier.name}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.status')}</p>
          <OrderStatusBadge status={order.status} size="sm" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.total')}</p>
          <p className="font-semibold text-foreground">
            {formatCurrency(order.total, order.currency)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.eta')}</p>
          <p className="text-xs text-muted-foreground">
            {order.delivery.eta
              ? new Date(order.delivery.eta).toLocaleTimeString([], {
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
          {formatDateTime(order.created_at)}
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
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const navigate = useNavigate();
  const { t } = useTranslation('orders');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="space-y-3 bg-background">
        {orders.map((order, index) => (
          <MobileOrderCard
            key={order.id}
            order={order}
            index={index}
            onViewDetails={() => navigate(`/orders/${order.id}`)}
            t={t}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <div className="min-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32 whitespace-nowrap">
                <span className="hidden md:flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Hash className="h-3.5 w-3.5 text-primary" />
                  {t('table.orderNumber')} 
                </span>
              </TableHead>

              <TableHead className="w-48 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-primary" />
                  {t('table.customer')}
                </span> 
              </TableHead>

              <TableHead className="w-40 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  {t('table.supplier')}
                </span> 
              </TableHead>

              <TableHead className="w-28 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  {t('table.status')}
                </span> 
              </TableHead>

              <TableHead className="w-24 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Coins className="h-3.5 w-3.5 text-primary" />
                  {t('table.total')}
                </span> 
              </TableHead>

              <TableHead className="w-24 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {t('table.eta')}
                </span> 
              </TableHead>

              <TableHead className="w-32 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" />
                  {t('table.date')}
                </span> 
              </TableHead>

              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                className="group transition-colors hover:bg-muted/30 cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <TableCell>
                  <span className="font-mono text-xs font-semibold text-foreground bg-muted px-2 py-1 rounded-md">
                    {order.order_number}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      name={order.customer.name}
                      imageUrl={undefined}
                      index={index}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-tight text-foreground">
                        {order.customer.name}
                      </p>
                      <p className="truncate text-xs leading-tight text-muted-foreground">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {order.supplier.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {order.supplier.phone}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <OrderStatusBadge status={order.status} size="sm" />
                </TableCell>

                <TableCell>
                  <span className="font-semibold text-sm tabular-nums">
                    {formatCurrency(order.total, order.currency)}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-xs text-muted-foreground">
                    {order.delivery.eta
                      ? new Date(order.delivery.eta).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      {format(new Date(order.created_at), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 ml-5">
                      {format(new Date(order.created_at), 'h:mm a')}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1.5 px-2.5 text-xs transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/orders/${order.id}`);
                    }}
                  >
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    {t('table.details')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}