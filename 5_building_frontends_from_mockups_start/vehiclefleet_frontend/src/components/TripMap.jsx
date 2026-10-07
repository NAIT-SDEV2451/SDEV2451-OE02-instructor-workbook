import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Polyline, useMap, Marker, Tooltip } from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
})

function FitBounds({ positions }) {
    const map = useMap()
    useEffect(() => {
        map.fitBounds(positions, { padding: [50, 50] })
    }, [map, positions])
    return null
}

function TripMap({ startLocation, endLocation, startCoordinates, endCoordinates }) {
    if(!startCoordinates || !endCoordinates) {
        return (
            <div className="card bg-base-200 shadow-sm">
                <div className="card-body items-center justify-center min-h-48 text-base-content/40 text-sm">
                    route map - {startLocation} -&gt; {endLocation}
                </div>
            </div>
        )
    }

    const positions = [
        [startCoordinates.lat, startCoordinates.lng],
        [endCoordinates.lat, endCoordinates.lng],
    ]
    const center = [
        (startCoordinates.lat + endCoordinates.lat) / 2,
        (startCoordinates.lng + endCoordinates.lng) / 2,
    ]

    return (
        <div className="rounded-box overflow-hidden shadow-sm" style={{ height: '300px' }}>
            <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline 
                    positions={positions}
                    pathOptions={{ color: '#570df8', dashArray: '10, 8', weight: 2 }}                
                />
                <Marker position={positions[0]}>
                    <Tooltip>Start: {startLocation}</Tooltip>
                </Marker>
                <Marker position={positions[1]}>
                    <Tooltip>End: {endLocation}</Tooltip>
                </Marker>
                <FitBounds positions={positions} />
            </MapContainer>
        </div>
    )
}

export default TripMap