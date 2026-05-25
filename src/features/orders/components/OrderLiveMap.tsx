import { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LiveLocation } from '../types/orders.types';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom driver icon
const driverIcon = new L.DivIcon({
  html: `<div class="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full shadow-lg flex items-center justify-center ring-4 ring-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L12 6"/>
      <path d="M12 18L12 22"/>
      <path d="M4.93 4.93L7.76 7.76"/>
      <path d="M16.24 16.24L19.07 19.07"/>
      <path d="M2 12L6 12"/>
      <path d="M18 12L22 12"/>
      <path d="M4.93 19.07L7.76 16.24"/>
      <path d="M16.24 7.76L19.07 4.93"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  className: 'driver-marker',
  popupAnchor: [0, -20],
});

// Customer location icon
const customerIcon = new L.DivIcon({
  html: `<div class="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center ring-2 ring-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  </div>`,
  iconSize: [28, 28],
  className: 'customer-marker',
  popupAnchor: [0, -16],
});

// Component to auto-center map and fit bounds
function MapController({ 
  driverLocation, 
  customerLocation 
}: { 
  driverLocation?: LiveLocation | null;
  customerLocation?: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  
  useEffect(() => {
    const locations = [];
    if (driverLocation) locations.push([driverLocation.lat, driverLocation.lng]);
    if (customerLocation) locations.push([customerLocation.lat, customerLocation.lng]);
    
    if (locations.length === 1) {
      map.setView(locations[0] as [number, number], 14);
    } else if (locations.length === 2) {
      const bounds = L.latLngBounds(locations as [number, number][]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [driverLocation, customerLocation, map]);
  
  return null;
}

interface Props {
  orderId: number;
  isOnDelivery: boolean;
  liveLocation?: LiveLocation | null;
  customerLocation?: { lat: number; lng: number; address?: string } | null;
  apiStatus?: 'connected' | 'failed' | 'not_available';
  route?: Array<{ lat: number; lng: number }>;
}

export default function OrderLiveMap({ 
  isOnDelivery, 
  liveLocation, 
  customerLocation,
  apiStatus,
  route = [] 
}: Props) {
  const { t } = useTranslation('orders');
  const [mapLoaded, setMapLoaded] = useState(false);
  
  if (!isOnDelivery) return null;

  const isConnected = apiStatus === 'connected';
  const isFailed = apiStatus === 'failed';
  const defaultCenter = { lat: 24.7136, lng: 46.6753 };
  
  const mockCustomerLocation = customerLocation || {
    lat: (liveLocation?.lat || 24.7136) + 0.005,
    lng: (liveLocation?.lng || 46.6753) + 0.003,
    address: t('liveMap.customerLocation')
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
          {t('liveMap.title')}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
            }`}
          />
          <span className="text-[10px] sm:text-xs text-text-muted">
            {isConnected ? t('liveMap.status.live') : isFailed ? t('liveMap.status.offline') : t('liveMap.status.notAvailable')}
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-border relative z-0">
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenReady={() => setMapLoaded(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {route.length > 0 && (
            <Polyline
              positions={route.map(p => [p.lat, p.lng])}
              color="#7A8F4E"
              weight={3}
              opacity={0.7}
              dashArray="5, 10"
            />
          )}
          
          {liveLocation && isConnected && (
            <Marker 
              position={[liveLocation.lat, liveLocation.lng]}
              icon={driverIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-primary">{t('liveMap.driverLocation')}</p>
                  <p className="text-xs text-text-muted">
                    {t('liveMap.updatedAt', { time: new Date(liveLocation.updated_at).toLocaleTimeString() })}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
          
          {mockCustomerLocation && (
            <Marker 
              position={[mockCustomerLocation.lat, mockCustomerLocation.lng]}
              icon={customerIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-red-500">{t('liveMap.deliveryAddress')}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {mockCustomerLocation.address || t('liveMap.customerLocation')}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
          
          <MapController 
            driverLocation={liveLocation && isConnected ? liveLocation : null}
            customerLocation={mockCustomerLocation}
          />
        </MapContainer>
        
        {!mapLoaded && (
          <div className="absolute inset-0 bg-card flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-xs sm:text-sm text-text-muted">{t('liveMap.loading')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Information */}
      <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-muted/30 rounded-lg p-2.5 sm:p-3">
          <div className="flex items-center gap-2 mb-1">
            <Navigation size={12} className="text-primary sm:text-[14px]" />
            <span className="text-[10px] sm:text-xs font-semibold text-text-secondary">
              {t('liveMap.driverStatus.title')}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-text-primary">
            {isConnected ? t('liveMap.driverStatus.active') : isFailed ? t('liveMap.driverStatus.lost') : t('liveMap.driverStatus.awaiting')}
          </p>
          {liveLocation && isConnected && (
            <p className="text-[10px] sm:text-xs text-text-muted mt-1">
              {t('liveMap.driverStatus.lastUpdate', { time: new Date(liveLocation.updated_at).toLocaleTimeString() })}
            </p>
          )}
        </div>
        
        <div className="bg-muted/30 rounded-lg p-2.5 sm:p-3">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={12} className="text-red-500 sm:text-[14px]" />
            <span className="text-[10px] sm:text-xs font-semibold text-text-secondary">
              {t('liveMap.deliveryDistance.title')}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-text-primary">
            {liveLocation && mockCustomerLocation && isConnected
              ? `${calculateDistance(
                  liveLocation.lat, 
                  liveLocation.lng, 
                  mockCustomerLocation.lat, 
                  mockCustomerLocation.lng
                ).toFixed(1)} ${t('liveMap.deliveryDistance.distanceUnit')}`
              : t('liveMap.deliveryDistance.calculating')}
          </p>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1">
            {liveLocation && mockCustomerLocation && isConnected
              ? `${Math.ceil(calculateDistance(
                  liveLocation.lat, 
                  liveLocation.lng, 
                  mockCustomerLocation.lat, 
                  mockCustomerLocation.lng
                ) / 30 * 60)} ${t('liveMap.deliveryDistance.etaUnit')}`
              : t('liveMap.deliveryDistance.etaPending')}
          </p>
        </div>
      </div>
    </div>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}