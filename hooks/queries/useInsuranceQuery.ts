import { useQuery } from '@tanstack/react-query';
import { insuranceApi } from '@/lib/api';
import { apiInsurancePlanToPlan } from '@/lib/api-transforms';
import { INSURANCE_PLANS as FALLBACK_PLANS } from '@/lib/insurance-data';

export const insuranceQueryKeys = {
  plans: () => ['insurance', 'plans'] as const,
  myBookings: () => ['insurance', 'my-bookings'] as const,
};

export function useInsurancePlans() {
  return useQuery({
    queryKey: insuranceQueryKeys.plans(),
    queryFn: () =>
      insuranceApi.getPlans().then((res) => res.map(apiInsurancePlanToPlan)),
    placeholderData: FALLBACK_PLANS,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyInsuranceBookings(enabled = true) {
  return useQuery({
    queryKey: insuranceQueryKeys.myBookings(),
    queryFn: () => insuranceApi.getMyBookings(),
    enabled,
  });
}
