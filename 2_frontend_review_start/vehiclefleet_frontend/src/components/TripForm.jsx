import { useState } from 'react';

const EMPTY_FORM = {
    vehicle: "",
    driver: "",
    start_location: "",
    end_location: "",
    start_time: "",
};

function TripForm({ vehicles, drivers, onSubmit }) {
    const [form, setForm] = useState(EMPTY_FORM);
    
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
        setForm(EMPTY_FORM);
    }

    return (
        <div className="card bg-base-100 shadow-md w-full max-w-xl">
            <div className="card-body gap-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">
                                Vehicle
                            </span>
                        </div>
                        <select
                            value={form.vehicle} 
                            name="vehicle"
                            onChange={handleChange} 
                            className="select select-bordered w-full">
                                <option value="" disabled>Select a Vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.license_plate}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">
                                Driver
                            </span>
                        </div>
                        <select 
                            value={form.driver}
                            name="driver"
                            onChange={handleChange} 
                            className="select select-bordered w-full">
                                <option value="" disabled>Select a Driver</option>
                                {drivers.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name} - {driver.phone} {driver.email}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">
                                Start Location
                            </span>
                        </div>
                        <input onChange={handleChange} value={form.start_location} name="start_location" type="text" className="input" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">
                                End Location
                            </span>
                        </div>
                        <input onChange={handleChange} value={form.end_location} name="end_location" type="text" className="input" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text font-medium">
                                Start Time
                            </span>
                        </div>
                        <input onChange={handleChange} value={form.start_time} name="start_time" type="datetime-local" className="input" />
                    </label>
                    <div className="card-actions justify-end pt-2">
                        <button type="submit" className="btn btn-primary">Create Trip</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TripForm;