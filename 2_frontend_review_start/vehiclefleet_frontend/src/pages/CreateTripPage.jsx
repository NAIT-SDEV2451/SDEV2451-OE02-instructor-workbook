import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import { DRIVERS, VEHICLES } from '../mockData';

function CreateTripPage() {
    const navigate = useNavigate();

    function handleSubmit(formData) {
        console.log("NEW TRIP CREATED - (NOT A REAL CALL)", formData);
        navigate("/trips");
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Create A New Trip
            </h2>
            <TripForm drivers={DRIVERS} vehicles={VEHICLES} onSubmit={handleSubmit}/>
        </div>
    )
}

export default CreateTripPage;