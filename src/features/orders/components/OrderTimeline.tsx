import React from 'react';
import { OrderTimelineEvent } from '../types/orders.types';
import { formatDateTime } from '@/lib/formatter';
import { orderStatusConfig } from '../configs/orders.config';
import {
  Check, Clock, Truck, MapPin, XCircle,
  AlertCircle, CheckCheck, Package,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  events: OrderTimelineEvent[];
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <AlertCircle size={14} strokeWidth={2} />,
  accepted: <CheckCheck size={14} strokeWidth={2} />,
  preparing: <Package size={14} strokeWidth={2} />,
  on_delivery: <Truck size={14} strokeWidth={2} />,
  delivered: <MapPin size={14} strokeWidth={2} />,
  cancelled: <XCircle size={14} strokeWidth={2} />,
};

export default function OrderTimeline({ events }: Props) {
  const completedCount = events.filter((e) => e.is_completed).length;
  const totalSteps = events.length;
  const progressPercent = Math.min((completedCount / (totalSteps - 1)) * 100, 100);
  const { t } = useTranslation('orders');
  const currentStep = events.find((e) => e.is_current);

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 bg-primary rounded-full" />
          <p className="text-xs font-bold text-primary uppercase tracking-wider">
            {t('timeline.title')}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-full sm:w-24 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${(completedCount / totalSteps) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary tabular-nums">
            {completedCount}<span className="text-text-muted font-normal">/{totalSteps}</span>
          </span>
        </div>
      </div>

      {/* Horizontal stepper — md and up only */}
      <div className="hidden md:block px-8 pt-8 pb-6">
        <div className="relative">
          <div className="absolute top-5 left-7 right-[28px] h-[2px] bg-border rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between">
            {events.map((event, i) => {
              const config = orderStatusConfig[event.status];
              return (
                <div key={i} className="flex flex-col items-center gap-2.5">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center relative
                    transition-all duration-500
                    ${event.is_completed
                      ? 'bg-primary shadow-md shadow-primary/25'
                      : event.is_current
                        ? 'bg-primary shadow-lg shadow-primary/30'
                        : 'bg-border border-2 border-border'
                    }
                  `}>
                    {event.is_current && !event.is_completed && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                    )}
                    {event.is_completed ? (
                      <Check size={16} className="text-white" strokeWidth={3} />
                    ) : (
                      <span className={event.is_current ? 'text-white' : 'text-text-muted opacity-60'}>
                        {statusIcons[event.status]}
                      </span>
                    )}
                  </div>
                  <div className="text-center px-1">
                    <p className={`
                      text-[10px] font-bold uppercase tracking-wide whitespace-nowrap
                      ${event.is_current ? 'text-primary' : event.is_completed ? 'text-text-secondary' : 'text-text-muted'}
                    `}>
                      {config.label}
                    </p>
                    {event.is_current && event.timestamp && (
                      <p className="text-[9px] text-primary/60 mt-0.5 font-semibold tabular-nums">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline — mobile only */}
      <div className="md:hidden px-4 py-4">
        <div className="space-y-4">
          {events.map((event, index) => {
            const config = orderStatusConfig[event.status];
            return (
              <div key={index} className="flex items-start gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center relative shrink-0
                  ${event.is_completed || event.is_current ? 'bg-primary' : 'bg-border'}
                `}>
                  {event.is_completed ? (
                    <Check size={12} className="text-white" />
                  ) : event.is_current ? (
                    <span className="text-white">{statusIcons[event.status]}</span>
                  ) : (
                    <span className="text-text-muted opacity-60">{statusIcons[event.status]}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${event.is_current ? 'text-primary' : 'text-text-primary'}`}>
                    {config.label}
                  </p>
                  {event.timestamp && (
                    <p className="text-xs text-text-muted mt-0.5">{formatDateTime(event.timestamp)}</p>
                  )}
                  <p className="text-xs text-text-muted mt-1">
                    {t(`timeline.descriptions.${event.status}`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Banner */}
      {currentStep && (
        <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 rounded-xl bg-primary/10 border border-primary/30 p-3 sm:p-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
              <span className="text-white">{statusIcons[currentStep.status]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs sm:text-sm font-bold text-primary">
                  {t('timeline.currentPrefix')}{orderStatusConfig[currentStep.status].label}
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-text-secondary mt-0.5 leading-relaxed">
                {t(`timeline.descriptions.${currentStep.status}`)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Activity Log */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-border">
        <h5 className="font-bold text-text-primary text-sm sm:text-base mb-3 sm:mb-4">
          {t('timeline.activityLog')}
        </h5>

        <div className="space-y-0">
          {events.map((event, index) => {
            if (!event.timestamp && !event.is_current) return null;
            const config = orderStatusConfig[event.status];

            return (
              <div key={index} className="relative flex items-start gap-2 sm:gap-3 group">
                <div className="relative z-10 shrink-0 mt-2 sm:mt-3">
                  <div className={`
                    w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all
                    ${event.is_completed
                      ? 'bg-primary/10 border-2 border-primary/30'
                      : event.is_current
                        ? 'bg-primary shadow-sm shadow-primary/40'
                        : 'bg-border border border-border'
                    }
                  `}>
                    {event.is_completed ? (
                      <Check size={11} className="text-primary" strokeWidth={3} />
                    ) : event.is_current ? (
                      <span className="text-white">
                        {React.cloneElement(statusIcons[event.status] as React.ReactElement)}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted block" />
                    )}
                  </div>
                </div>

                <div className="flex-1 py-1.5 sm:py-3 px-2 sm:px-3 rounded-xl transition-all duration-200 group-hover:bg-muted/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <h6 className={`text-xs sm:text-sm font-semibold ${event.is_current ? 'text-primary' : 'text-text-primary'}`}>
                        {config.label}
                      </h6>
                      {event.is_current && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-extrabold tracking-wider">
                          {t('timeline.currentBadge')}
                        </span>
                      )}
                    </div>
                    {event.timestamp && (
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-text-muted">
                        <Clock size={9} className="text-text-muted shrink-0" />
                        <span>{formatDateTime(event.timestamp)}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-text-secondary mt-0.5 sm:mt-1 leading-relaxed">
                    {t(`timeline.descriptions.${event.status}`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}