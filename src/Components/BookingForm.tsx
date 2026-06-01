import { useState } from "react";
import { Plane } from "lucide-react";
import AllFlights from "../Pages/AllFlights.tsx";
import AvailableFlights from "../Pages/AvailableFlights.tsx";
import BookingFlight from "../Pages/BookingFlight.tsx";
import SearchBooking from "../Pages/SearchBooking.tsx";
import CancelBooking from "../Pages/CancelBooking.tsx";
import { getAllFlights, getAvailableFlights } from "../api/flightapi.ts";
import type { Flight } from "../types.ts";

type Tab = "flights" | "bookings" | "cancel";
type Filter = "all" | "available" | null;

const statusBadge = (status: string) => {
    const map: Record<string, string> = {
        AVAILABLE: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-600",
        DELAYED: "bg-yellow-100 text-yellow-700",
        FULL: "bg-gray-100 text-gray-600",
    };
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
};

const BookingForm = () => {
    const [tab, setTab] = useState<Tab>("flights");
    const [filter, setFilter] = useState<Filter>(null);
    const [flightId, setFlightId] = useState<number | null>(null);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sharedEmail, setSharedEmail] = useState("");
    const itemsPerPage = 5;

    const handleAllFlights = async () => {
        const data = await getAllFlights();
        setFlights(data);
        setCurrentPage(1);
        setFilter("all");
    };

    const handleAvailableFlights = async () => {
        const data = await getAvailableFlights();
        setFlights(data);
        setCurrentPage(1);
        setFilter("available");
    };

    const tabClass = (t: Tab) =>
        `px-5 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === t
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
        }`;

    const paginated = flights.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(flights.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO HEADER */}
            <div className="bg-blue-600 text-white px-6 py-8">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <Plane size={32} />
                    <div>
                        <h1 className="text-2xl font-bold">Flight Reservation</h1>
                        <p className="text-blue-200 text-sm">Search, book, and manage your flights</p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-6">
                {/* SHARED EMAIL INPUT */}
                <div className="bg-white rounded shadow p-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email to use across all sections"
                        className="border rounded px-3 py-2 w-full text-sm"
                        value={sharedEmail}
                        onChange={(e) => setSharedEmail(e.target.value)}
                    />
                </div>

                {/* TABS */}
                <div className="flex border-b bg-white rounded-t shadow-sm mb-0">
                    <button className={tabClass("flights")} onClick={() => setTab("flights")}>✈ Flights</button>
                    <button className={tabClass("bookings")} onClick={() => setTab("bookings")}>📋 My Bookings</button>
                    <button className={tabClass("cancel")} onClick={() => setTab("cancel")}>❌ Cancel</button>
                </div>

                <div className="bg-white rounded-b shadow p-4">
                    {/* FLIGHTS TAB */}
                    {tab === "flights" && (
                        <div>
                            <div className="flex gap-3 mb-4">
                                <AllFlights onClick={handleAllFlights} isActive={filter === "all"} />
                                <AvailableFlights onClick={handleAvailableFlights} isActive={filter === "available"} />
                            </div>

                            {/* EMPTY STATE */}
                            {flights.length === 0 && (
                                <div className="text-center py-12 text-gray-400">
                                    <Plane size={40} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">Click "All Flights" or "Available Flights" to get started.</p>
                                </div>
                            )}

                            {/* FLIGHT CARDS */}
                            <div className="space-y-3">
                                {paginated.map((flight) => (
                                    <div key={flight.id} className="border rounded p-4 flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-2 font-bold">
                                                <span>{flight.flightNumber}</span>
                                                <Plane size={14} className="text-blue-400" />
                                                <span>{flight.destination}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {flight.departureTime} – {flight.arrivalTime}
                                            </p>
                                            <div className="mt-1">{statusBadge(flight.status)}</div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${flight.price}</p>
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded mt-1 text-sm hover:bg-green-600"
                                                onClick={() => setFlightId(flight.id)}
                                            >
                                                Book
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* PAGINATION */}
                            {flights.length > itemsPerPage && (
                                <div className="flex gap-4 items-center mt-4">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                        className="bg-gray-200 px-4 py-2 rounded text-sm disabled:opacity-50"
                                    >Previous</button>
                                    <span className="text-sm">Page {currentPage} of {totalPages}</span>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                        className="bg-gray-200 px-4 py-2 rounded text-sm disabled:opacity-50"
                                    >Next</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* MY BOOKINGS TAB */}
                    {tab === "bookings" && <SearchBooking sharedEmail={sharedEmail} />}

                    {/* CANCEL TAB */}
                    {tab === "cancel" && <CancelBooking sharedEmail={sharedEmail} />}
                </div>
            </div>

            {/* CENTERED MODAL OVERLAY */}
            {flightId !== null && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setFlightId(null)}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <BookingFlight flightId={flightId} onClose={() => setFlightId(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingForm;
