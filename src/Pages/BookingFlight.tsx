import { useState } from "react";
import { bookFlight } from "../api/flightapi.ts";

type Props = { flightId: number; onClose: () => void };

const BookingFlight = ({ flightId, onClose }: Props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validate = () => {
        const e: { name?: string; email?: string } = {};
        if (!name.trim()) e.name = "Name is required.";
        if (!email.trim()) e.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleBook = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await bookFlight(flightId, name, email);
            setMessage("Booking confirmed!");
            setSuccess(true);
        } catch {
            setMessage("Booking failed. Please try again.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-3">Book Flight</h2>
            <input
                className={`border rounded px-3 py-2 text-sm w-full mb-1 ${errors.name ? "border-red-500" : ""}`}
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mb-2">{errors.name}</p>}

            <input
                className={`border rounded px-3 py-2 text-sm w-full mb-1 ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

            <div className="flex gap-2 mt-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
                    onClick={handleBook}
                    disabled={loading}
                >
                    {loading ? "Booking..." : "Confirm"}
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded text-sm" onClick={onClose}>
                    Cancel
                </button>
            </div>
            {message && (
                <p className={`mt-2 text-sm font-medium ${success ? "text-green-600" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default BookingFlight;
