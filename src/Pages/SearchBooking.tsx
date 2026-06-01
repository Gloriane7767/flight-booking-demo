import { useState } from "react";
import { getBookingsByEmail } from "../api/flightapi.ts";
import type { Booking } from "../types";
import { X } from "lucide-react";

type Props = { sharedEmail: string };

const statusBadge = (status: string) => {
    const map: Record<string, string> = {
        CONFIRMED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-600",
        PENDING: "bg-yellow-100 text-yellow-700",
    };
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
};

const SearchBooking = ({ sharedEmail }: Props) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!sharedEmail.trim()) return;
        setLoading(true);
        try {
            const data = await getBookingsByEmail(sharedEmail);
            setBookings(data);
            setSearched(true);
        } catch {
            setBookings([]);
            setSearched(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-3">My Bookings</h2>
            <button
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
                onClick={handleSearch}
                disabled={loading}
            >
                {loading ? "Searching..." : "Find My Bookings"}
            </button>

            {searched && bookings.length === 0 && !loading && (
                <p className="mt-3 text-sm text-gray-500">No bookings found for this email.</p>
            )}

            <div className="space-y-2 mt-3">
                {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded p-3 relative">
                        <button
                            aria-label="Dismiss"
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            onClick={() => setBookings(b => b.filter(x => x.id !== booking.id))}
                        >
                            <X size={14} />
                        </button>
                        <p className="text-xs text-gray-400 mb-1">Booking #{booking.id}</p>
                        <p className="font-bold">{booking.flightNumber} → {booking.destination}</p>
                        <p className="text-sm text-gray-500">{booking.departureTime} – {booking.arrivalTime}</p>
                        <p className="text-sm">Passenger: {booking.passengerName}</p>
                        <div className="flex items-center justify-between mt-1">
                            {statusBadge(booking.status)}
                            <p className="text-sm font-bold">${booking.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBooking;
