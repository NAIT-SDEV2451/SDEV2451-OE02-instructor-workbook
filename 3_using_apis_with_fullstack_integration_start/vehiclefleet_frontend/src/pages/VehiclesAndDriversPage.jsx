import { useState } from 'react';
import VehicleList from '../components/VehicleList'
import DriverList from '../components/DriverList'
import { useVehicles } from '../hooks/useVehicles'
import { useDrivers } from '../hooks/useDrivers'

function VehiclesAndDriversPage() {
  const [search, setSearch] = useState('')

  const { vehicles, isLoading: loadingVehicles, isError: errorVehicles, error: vError } = useVehicles(search)
  const { drivers, isLoading: loadingDrivers, isError: errorDrivers, error: dError } = useDrivers()

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-semibold mb-3">Vehicles</h2>
        <div className="flex flex-col w-full">
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Vehicles..." className="input w-full" />
        </div>
        {
          errorVehicles ?? (
            <div className="alert alert-error">
              {vError?.message ?? "Could not load vehicles"}
            </div>
          )
        }
        {
          loadingVehicles 
            ? (<span className="loading loading-spinner loading-md"></span>) 
            : (<VehicleList vehicles={vehicles} />)
        }
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Drivers</h2>
        {
          errorDrivers ?? (
            <div className="alert alert-error">
              {dError?.message ?? 'Could not load drivers'}
            </div>
          )
        }
        { 
          loadingDrivers 
            ? (<span className="loading loadin-spinner loading-md"></span>) 
            : (<DriverList drivers={drivers} />)
        } 
      </section>
    </div>
  )
}

export default VehiclesAndDriversPage
