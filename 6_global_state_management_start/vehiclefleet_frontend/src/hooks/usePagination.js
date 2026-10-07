import { useContext } from 'react'
import { PaginationContext } from '../contexts/PaginationContext'

export function usePagination() {
    const context = useContext(PaginationContext)
    if (!context) {
        throw new Error("usePagination must be used inside a PaginationContext")
    }

    return {
        ...context,
        hasNext: context.page < context.totalPages,
        hasPrevious: context.page > 1,
    }
}