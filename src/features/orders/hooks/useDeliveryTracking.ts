export function useDeliveryTracking(_orderId: number, _enabled: boolean) {
  return {
    location: null,
    apiStatus: 'idle' as const,
    errorMessage: null,
  };
}