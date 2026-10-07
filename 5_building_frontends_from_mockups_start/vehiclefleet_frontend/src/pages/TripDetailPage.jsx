import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import TripInfo from '../components/TripInfo'
import TripMap from '../components/TripMap'
import { useTripDetails } from '../hooks/useTripDetails'
import { STATUS_BADGE, STATUS_LABEL } from '../constants/tripStatus'

function TripDetailPage() {
    const { id } = useParams()
    const { trip, isLoading, isError, error, startTrip, completeTrip, failTrip } = useTripDetails(id)

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>
    if (isError || !trip) return <p className="text-error">{error ? error?.message : 'Trip Not Found'}</p>

    const isUpdating = 
        startTrip.isPending || completeTrip.isPending || failTrip.isPending

    const mutationError =
        startTrip.error || completeTrip.error || failTrip.error

    return (
        <div className="flex flex-col gap-6">
            <div>
                <BackButton 
                    to="/trips"
                    label="Back to Trips"
                />
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">
                        Trip #{trip.id}
                    </h1>
                    <span className={`badge ${STATUS_BADGE[trip.status] ?? 'badge-ghost'}`}>
                        {STATUS_LABEL[trip.status] ?? trip.status}
                    </span>
                </div>
            </div>

            <TripMap 
                startLocation={trip.start_location}
                endLocation={trip.end_location}
                startCoordinates={trip.start_coordinates}
                endCoordinates={trip.end_coordinates}
            />

            <div className="flex flex-wrap gap-2">
                {trip.status === 'pending' && (
                    <button
                        className="btn btn-primary"
                        onClick={() => startTrip.mutate()}
                        disabled={isUpdating}
                    >
                        {startTrip.isPending ? <span className="loading loading-spinner loading-sm"></span> : 'Start Trip'}
                    </button>
                )}
                {trip.status === 'in_progress' && (
                    <>
                        <button
                            className="btn btn-outline"
                            onClick={() => completeTrip.mutate()}
                            disabled={isUpdating}
                        >
                            {completeTrip.isPending ? <span className="loading loading-spinner loading-sm"></span> : 'Complete Trip'}
                        </button>
                        <button
                            className="btn btn-outline btn-error"
                            onClick={() => failTrip.mutate()}
                            disabled={isUpdating}
                        >
                            {failTrip.isPending ? <span className="loading loading-spinner loading-sm"></span> : "Can't Be Delivered"}
                        </button>
                    </>
                )}
                
            </div>

            {mutationError && (
                <div role="alert" className="alert alert-error">
                    <span>{mutationError.message}</span>
                </div>
            )}

            <TripInfo trip={trip} />
        </div>
    )
}

export default TripDetailPage
