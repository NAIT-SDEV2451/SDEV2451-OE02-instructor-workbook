import { useQuery } from "@tanstack/react-query"
import { fetchEvent } from "../api/events"

export function useEvent(id) {
    return useQuery({
        queryKey: ['event', id],
        queryFn: () => fetchEvent(id)
    })
}

