import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from '@/app/utils/constants';

const API_BASE_URL = `${BASE_URL}/api`;


export function useGetUsers() {
  return useQuery<any[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/users`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: 50000,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    refetchOnMount: true,
    retry: 3,
    retryDelay: 1000,
  })
}

