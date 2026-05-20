import AllFlights from "../Pages/AllFlights.tsx";
import AvailableFlights from "../Pages/AvailableFlights.tsx";
import BookingFlight from "../Pages/BookingFlight.tsx";
import SearchBooking from "../Pages/SearchBooking.tsx";
import CancelBooking from "../Pages/CancelBooking.tsx";
import { useState } from "react";
import { getAllFlights, getAvailableFlights } from "../api/flightapi.ts";
import type { Flight } from "../types.ts";

const BookingForm = () => {
    const [flightId, setFlightId] = useState<number | null>(null);
    const [flights, setFlights] = useState<Flight[]>([]);

    async function handleAllFlights() {
        const data = await getAllFlights();
        setFlights(data);
    }

    async function handleAvailableFlights() {
        const data = await getAvailableFlights();
        setFlights(data);
    }

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">✈️ Flight Reservation</h1>

            {/* FILTER */}
            <div className="mb-4 space-x-4">
                {/* All Flights */}
                <AllFlights onClick={handleAllFlights} />

                {/* Available Flights */}
                <AvailableFlights onClick={handleAvailableFlights} />
            </div>

            {/* SEARCH */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <SearchBooking />
            </div>

            {/* FLIGHTS */}
            <div id="flights" className="space-y-3 mb-10">
                {flights.map((flight) => (
                    <div key={flight.id} className="bg-white p-4 rounded shadow flex justify-between items-center relative">
                        <div>
                            <p className="font-bold">{flight.flightNumber} → {flight.destination}</p>
                            <p className="text-sm text-gray-500">{flight.departureTime} – {flight.arrivalTime}</p>
                            <p className="text-sm">{flight.status}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">${flight.price}</p>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded mt-1 text-sm"
                                onClick={() => setFlightId(flight.id)}
                            >
                                Book
                            </button>
                        </div>

                        {/* INLINE MODAL */}
                        {flightId === flight.id && (
                            <div className="absolute right-0 top-0 mt-2 bg-white border rounded shadow-lg p-4 z-50 w-120">
                                <BookingFlight flightId={flightId} onClose={() => setFlightId(null)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CANCELLATION */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <CancelBooking />
            </div>

        </div>
    );
};

export default BookingForm;


