import { useParams } from "react-router-dom";
import { TRIPS } from "../mockData";

function TripDetailPage() {
    const { id } = useParams();

    const trip = TRIPS.find((trip) => trip.id === Number(id));    


    return (
         <div className="card bg-base-100 w-full shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Trip #{trip.id}</h2>
                <div className="p-4">
                    <h3>Driver & Vehicle Details</h3>
                    <ul className="list bg-base-100 rounded-box shadow-md">
                        <li className="list-row">Driver Info:</li>
                        <li className="list-row"> 
                            <div>
                                <div>{trip.driver_detail.name}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">
                                    {trip.driver_detail.phone} - {trip.driver_detail.email}
                                </div>
                            </div>
                            <p className="text-right">
                                {trip.driver_detail.license_number}
                            </p>
                        </li>
                        <li className="list-row">
                            Vehicle Info:
                        </li>
                        <li className="list-row"> 
                            <div>
                                <div>{trip.vehicle_detail.make} {trip.vehicle_detail.model} {trip.vehicle_detail.year}</div>
                            </div>
                            <p className="text-right">
                                {trip.vehicle_detail.license_plate}
                            </p>
                        </li>

                    </ul>
                </div>
                <div className="max-w-full w-full p-4">
                    <ul className="timeline w-full table-fixed">
                        <li>
                            <div className="timeline-start">Start Location</div>
                            <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </div>
                            <div className="timeline-end timeline-box">{trip.start_location} - {trip.start_time ? new Date(trip.start_time).toLocaleString() : ""}</div>
                            <hr />
                        </li>
                         <li>
                            <hr />
                            <div className="timeline-start">Distance</div>
                            <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </div>
                            <div className="timeline-end timeline-box">{trip.distance ?? (
                                <span className="badge badge-warning badge-sm">In Progress</span>
                            )}</div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-start">End Location</div>
                            <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </div>
                            <div className="timeline-end timeline-box">{trip.end_location} - {trip.end_time ? new Date(trip.end_time).toLocaleString() : ""}</div> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TripDetailPage;