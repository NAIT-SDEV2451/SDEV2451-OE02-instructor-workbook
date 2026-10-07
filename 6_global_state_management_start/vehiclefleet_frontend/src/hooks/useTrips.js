import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTrips, createTrip } from '../api/fleet'

export function useTrips(page = 1) {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trips'],
    queryFn: () => fetchTrips(page),
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['trips'] })
  }, [page])

  return {
    trips: data ?? { results: [], count: 0 },
    isLoading,
    isError,
    error,
  }
}

export function useCreateTrip() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
    },
  })
}
