import { useState } from "react";
import { bookFlight } from "../api/flightapi.ts";

type Props = { flightId: number; onClose: () => void };

const BookingFlight = ({ flightId, onClose }: Props) => {
    const [confirmed, setConfirmed] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBook = async () => {
        setLoading(true);
        try {
            await bookFlight(flightId, name, email);
            setMessage("Booking confirmed!");
        } catch (err) {
            console.error("Booking error:", err);
            setMessage("Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!confirmed) return (
        <div>
            <p className="mb-3 font-semibold">Do you want to book this flight?</p>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setConfirmed(true)}>Yes</button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>No</button>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Book Flight</h2>
            <input
                className="border rounded px-3 py-2 text-sm w-full mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="border rounded px-3 py-2 text-sm w-full mb-2"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleBook}
                    disabled={loading}
                >
                    {loading ? "Booking..." : "Book"}
                </button>
                <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
};

export default BookingFlight;
