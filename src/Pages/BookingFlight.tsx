
const BookingFlight = () => {
    return (
        <div className="bg-white p-4 rounded shadow mb-10">
            <h2 className="text-xl font-bold mb-4">Book Flight</h2>

            <input id="name" placeholder="Name" className="border p-2 w-full mb-2" />
            <input id="email" placeholder="Email" className="border p-2 w-full mb-2" />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Confirm Booking
            </button>
        </div>
    );
};

export default BookingFlight;