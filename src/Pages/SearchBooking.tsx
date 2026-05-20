import { useState } from "react";
import { getBookingsByEmail } from "../api/flightapi.ts";
import type { Booking } from "../types";

const SearchBooking = () => {
    const [email, setEmail] = useState("");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        try {
            const data = await getBookingsByEmail(email);
            setBookings(data);
            setSearched(true);
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Search Booking</h2>

            <input
                id="searchEmail"
                placeholder="Enter email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className="bg-purple-600 text-white px-4 py-2 rounded"
                onClick={handleSearch}
            >
                Search
            </button>

            {searched && bookings.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">No bookings found for this email.</p>
            )}

            {bookings.map((booking) => (
                <div key={booking.id} className="border p-2 mt-2 rounded relative">
                    <button
                        className="absolute top-1 right-1 text-gray-400 text-xs"
                        onClick={() => setBookings(b => b.filter(x => x.id !== booking.id))}
                    >✕</button>
                    <p className="text-xs text-gray-400">Booking ID: {booking.id}</p>
                    <p className="font-bold">{booking.flightNumber} → {booking.destination}</p>
                    <p className="text-sm text-gray-500">{booking.departureTime} – {booking.arrivalTime}</p>
                    <p className="text-sm">Passenger: {booking.passengerName}</p>
                    <p className="text-sm">Status: {booking.status}</p>
                    <p className="text-sm font-bold">${booking.price}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchBooking;
