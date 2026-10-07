import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCompleteTrip, fetchStartTrip, fetchTripMap, fetchFailTrip } from '../api/fleet'

export function useTripDetails(id) {
    const queryClient = useQueryClient()

    const { data: trip, isLoading, isError, error } = useQuery({
        queryKey: ['trip-map', id],
        queryFn: () => fetchTripMap(id),
        enabled: !!id,
    })

    const startTrip = useMutation({
        mutationFn: () => fetchStartTrip(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trip-map', id ]}),
    })

    const completeTrip = useMutation({
        mutationFn: () => fetchCompleteTrip(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trip-map', id ]}), 
    })

    const failTrip = useMutation({
        mutationFn: () => fetchFailTrip(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trip-map', id ]}) 
    })

    return { trip, isLoading, isError, error, startTrip, completeTrip, failTrip }
}