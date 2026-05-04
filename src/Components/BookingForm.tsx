import AllFlights from "../Pages/AllFlights.tsx";
import AvailableFlights from "../Pages/AvailableFlights.tsx";
import BookingFlight from "../Pages/BookingFlight.tsx";
import SearchBooking from "../Pages/SearchBooking.tsx";
import CancelBooking from "../Pages/CancelBooking.tsx";
import { useState } from "react";

const BookingForm = () => {
    const [flightId, setFlightId] = useState<number | null>(null);

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">✈️ Flight Reservation</h1>

            {/* FILTER */}
            <div className="mb-4 space-x-4">

                {/* All Flights */}
                <AllFlights />

                {/* Available Flights */}
                <AvailableFlights />

            </div>

            {/* FLIGHTS */}
            <div id="flights" className="space-y-3 mb-10"></div>

            {/* BOOKING FORM */}
            <div className="bg-white p-4 rounded shadow mb-6">
                {flightId && <BookingFlight flightId={flightId} onClose={() => setFlightId(null)} />}
            </div>

            {/* SEARCH */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <SearchBooking />
            </div>

            {/* BOOKINGS */}
            <div id="bookings" className="space-y-3"></div>

            {/* CANCELLATION */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <CancelBooking />
            </div>

        </div>
    );
};

export default BookingForm;
