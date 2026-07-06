import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api';

export const profileQueryKeys = {
  me: () => ['profile', 'me'] as const,
};

export function useProfileQuery(enabled = true) {
  return useQuery({
    queryKey: profileQueryKeys.me(),
    queryFn: () => authApi.getProfile(),
    enabled,
    staleTime: 2 * 60 * 1000,
  });
}
