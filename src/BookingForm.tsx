
const BookingForm = () => {
    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">✈️ Flight Reservation</h1>

            {/* FILTER */}
            <div className="mb-4 space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    All Flights
                </button>

                <button  className="bg-green-500 text-white px-4 py-2 rounded">
                    Available Flights
                </button>
            </div>

            {/* FLIGHTS */}
            <div id="flights" className="space-y-3 mb-10"></div>

            {/* BOOKING FORM */}
            <div className="bg-white p-4 rounded shadow mb-10">
                <h2 className="text-xl font-bold mb-4">Book Flight</h2>

                <input id="name" placeholder="Name" className="border p-2 w-full mb-2" />
                <input id="email" placeholder="Email" className="border p-2 w-full mb-2" />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Confirm Booking
                </button>
            </div>

            {/* SEARCH */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-bold mb-4">Search Booking</h2>

                <input id="searchEmail" placeholder="Enter email" className="border p-2 w-full mb-2" />

                <button className="bg-purple-600 text-white px-4 py-2 rounded">
                    Search
                </button>
            </div>

            {/* BOOKINGS */}
            <div id="bookings" className="space-y-3"></div>
        </div>
    );
};

export default BookingForm;