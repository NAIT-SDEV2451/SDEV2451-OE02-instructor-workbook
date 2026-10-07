import { Link } from "react-router-dom"
import { STATUS_BADGE, STATUS_LABEL } from "../constants/tripStatus"

function TripList({ trips }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>From</th>
            <th>To</th>
            <th>Start Time</th>
            <th>Distance (km)</th>
            <th>Status</th>
            <th aria-label="Trip actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.vehicle_detail.make} {trip.vehicle_detail.model}</td>
              <td>{trip.driver_detail.name}</td>
              <td>{trip.start_location}</td>
              <td>{trip.end_location}</td>
              <td>{new Date(trip.start_time).toLocaleString()}</td>
              <td>{trip.distance !== null ? trip.distance : '-'}</td>
              <td>
                <span className={`badge badge-sm ${STATUS_BADGE[trip.status] ?? 'badge-ghost'}`}>
                  {STATUS_LABEL[trip.status] ?? trip.status}
                </span>
              </td>
              <td>
                <Link to={`/trips/${trip.id}`} className="btn btn-xs btn-ghost">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TripList
