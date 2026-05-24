
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderPayment } from '@/types/payment.types';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Hash,
  User,
  CreditCard,
  CheckCircle,
  Coins,
  CalendarDays,
  Fingerprint,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { PaymentMethodBadge, PaymentStatusBadge } from '../shared/badges';
import { cn } from '@/lib/utils';
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
        'flex h-8 w-8 text-white items-center justify-center rounded-full text-[11px] font-medium bg-gradient-primary',
      )}
    >
      {getInitials(name)}
    </div>
  );
}

// Mobile Card Component
function MobilePaymentCard({ payment, index, onViewDetails, t }: { 
  payment: OrderPayment; 
  index: number; 
  onViewDetails: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1">
          <Avatar
            name={payment.customer.name}
            imageUrl={payment.customer.avatar_url}
            index={index}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {payment.customer.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {payment.customer.email}
            </p>
          </div>
        </div>
        <span className="font-mono text-xs text-muted-foreground shrink-0 ml-2">
          #{payment.order_number}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.method')}</p>
          <PaymentMethodBadge method={payment.payment_method} size="sm" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.status')}</p>
          <PaymentStatusBadge status={payment.payment_status} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.amount')}</p>
          <p className="font-semibold text-foreground">
            {payment.total.toFixed(2)} {payment.currency}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.date')}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(payment.created_at), 'MMM d, yyyy')}
          </p>
        </div>
      </div>

      {payment.payment_record?.payment_intent_id && (
        <div className="mb-3 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">{t('table.intentId')}</p>
          <p className="text-xs font-mono text-muted-foreground truncate">
            {payment.payment_record.payment_intent_id}
          </p>
        </div>
      )}

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

interface PaymentsTableProps {
  payments: OrderPayment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const navigate = useNavigate();
  const { t } = useTranslation('payments');
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
      <div className="space-y-3">
        {payments.map((payment, index) => (
          <MobilePaymentCard
            key={payment.id}
            payment={payment}
            index={index}
            onViewDetails={() => navigate(`/payments/${payment.id}`)}
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
            <TableRow className="">
              <TableHead className="w-25 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Hash className="h-3.5 w-3.5 text-primary" />
                  {t('table.order')}
                </span>
              </TableHead>

              <TableHead className="w-50 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-primary" />
                  {t('table.customer')}
                </span>
              </TableHead>

              <TableHead className="w-32 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5 text-primary" />
                  {t('table.method')}
                </span>
              </TableHead>

              <TableHead className="w-30 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  {t('table.status')}
                </span>
              </TableHead>

              <TableHead className="w-28 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Coins className="h-3.5 w-3.5 text-primary" />
                  {t('table.amount')}
                </span>
              </TableHead>

              <TableHead className="w-40 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Fingerprint className="h-3.5 w-3.5 text-primary" />
                  {t('table.intentId')}
                </span>
              </TableHead>

              <TableHead className="w-32 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" />
                  {t('table.date')}
                </span>
              </TableHead>

              <TableHead className="w-26" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment, index) => (
              <TableRow
                key={payment.id}
                className="group p-2 transition-colors hover:bg-muted/30"
              >
                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">
                    {payment.order_number}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      name={payment.customer.name}
                      imageUrl={payment.customer.avatar_url}
                      index={index}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-tight text-foreground">
                        {payment.customer.name}
                      </p>
                      <p className="truncate text-xs leading-tight text-muted-foreground">
                        {payment.customer.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <PaymentMethodBadge method={payment.payment_method} size="sm" />
                </TableCell>

                <TableCell>
                  <PaymentStatusBadge status={payment.payment_status} />
                </TableCell>

                <TableCell>
                  <span className="font-medium text-sm tabular-nums">
                    {payment.total.toFixed(2)}
                  </span>
                  <span className="ml-1 text-xs text-muted-foreground">
                    {payment.currency}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="block max-w-36 truncate font-mono text-xs text-muted-foreground">
                    {payment.payment_record?.payment_intent_id ?? '—'}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {format(new Date(payment.created_at), 'MMM d, yyyy')}
                  </div>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1.5 px-2.5 text-xs transition-opacity group-hover:opacity-100"
                    onClick={() => navigate(`/payments/${payment.id}`)}
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