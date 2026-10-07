import { usePagination } from "../hooks/usePagination"

function TripsPagination() {
    const { 
        page, 
        totalCount, 
        totalPages, 
        hasNext, 
        hasPrevious, 
        goToNext, 
        goToPrevious 
    } = usePagination()

    return (
        <div className="flex items-center gap-3 mt-4">
            <button className="btn btn-sm btn-outline"
                disabled={!hasPrevious}
                onClick={goToPrevious}
            >
                Previous
            </button>
            <span className="text-sm text-base-content/60">
                Page {page} of {totalPages} - {totalCount} trips total
            </span>
            <button
                className="btn btn-sm btn-outline"
                disabled={!hasNext}
                onClick={goToNext}
            >
                Next
            </button>
        </div>
    )
}

export default TripsPagination