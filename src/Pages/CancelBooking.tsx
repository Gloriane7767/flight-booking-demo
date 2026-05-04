import { useState } from "react";
import { cancelBooking } from "../api/flightapi.ts";

const CancelBooking = () => {
    const [flightId, setFlightId] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleCancel = async () => {
        try {
            await cancelBooking(Number(flightId), email);
            setMessage("Booking cancelled successfully.");
        } catch (err) {
            console.error("Cancel error:", err);
            setMessage("Cancellation failed. Please check the flight ID and email.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>

            <input
                placeholder="Enter booking ID"
                className="border p-2 w-full mb-2"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
            />

            <input
                placeholder="Enter email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
            >
                Cancel Booking
            </button>

            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
};

export default CancelBooking;
