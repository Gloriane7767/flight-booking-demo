import { useState } from "react";
import { getBookingsByEmail, cancelBooking } from "../api/flightapi.ts";
import type { Booking } from "../types";

// Allows a user to find their bookings by email and cancel individual ones
const CancelBooking = () => {
    const [email, setEmail] = useState("");                          // user's email input
    const [bookings, setBookings] = useState<Booking[]>([]);         // list of bookings fetched by email
    const [searched, setSearched] = useState(false);                 // tracks if a search has been made
    const [messages, setMessages] = useState<Record<number, string>>({}); // per-booking status messages

    // Fetches bookings for the entered email and resets previous messages
    const handleFind = async () => {
        try {
            const data = await getBookingsByEmail(email);
            setBookings(data);
            setSearched(true);
            setMessages({});
        } catch (err) {
            console.error("Find error:", err);
        }
    };

    // Calls the cancel API for a specific booking and shows a result message on that card
    const handleCancel = async (bookingId: number) => {
        try {
            await cancelBooking(bookingId, email);
            setMessages(m => ({ ...m, [bookingId]: "Cancelled successfully." }));
        } catch (err) {
            console.error("Cancel error:", err);
            setMessages(m => ({ ...m, [bookingId]: "Cancellation failed." }));
        }
    };

    // Removes a booking card from the visible list without calling the API
    const handleDismiss = (bookingId: number) => {
        setBookings(b => b.filter(x => x.id !== bookingId));
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>

            <input
                placeholder="Enter email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleFind}
            >
                Find Bookings
            </button>

            {searched && bookings.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">No bookings found for this email.</p>
            )}

            {bookings.map((booking) => (
                <div key={booking.id} className="border p-2 mt-2 rounded relative">
                    <button
                        className="absolute top-1 right-1 text-gray-400 text-xs"
                        onClick={() => handleDismiss(booking.id)}
                    >✕</button>
                    <p className="text-xs text-gray-400">Booking ID: {booking.id}</p>
                    <p className="font-bold">{booking.flightNumber} → {booking.destination}</p>
                    <p className="text-sm text-gray-500">{booking.departureTime} – {booking.arrivalTime}</p>
                    <p className="text-sm">Passenger: {booking.passengerName}</p>
                    <p className="text-sm">Status: {booking.status}</p>
                    <p className="text-sm font-bold">${booking.price}</p>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded mt-2 text-sm"
                        onClick={() => handleCancel(booking.id)}
                    >
                        Cancel Booking
                    </button>
                    {messages[booking.id] && (
                        <p className="mt-1 text-sm text-gray-500">{messages[booking.id]}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CancelBooking;
