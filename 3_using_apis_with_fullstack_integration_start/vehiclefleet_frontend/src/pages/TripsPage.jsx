import TripList from '../components/TripList'
import { useTrips } from '../hooks/useTrips'

function TripsPage() {
  const { trips, isLoading, isError, error } = useTrips();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Trips</h2>
      {
        isLoading
          ? (<span className="loading loading-spinner loading-md"></span>)
          : (<TripList trips={trips} />)
      }
      {isError ?? (
        <div className="alert alert-error">
          {error?.message ?? 'Error trying to fetch trips'}
        </div>
      )}
    </div>
  )
}

export default TripsPage
