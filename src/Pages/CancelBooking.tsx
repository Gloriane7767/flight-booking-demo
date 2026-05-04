
const CancelBooking = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>

            <input id="cancelEmail" placeholder="Enter email" className="border p-2 w-full mb-2" />

            <button className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel Booking
            </button>
        </div>
    );
};

export default CancelBooking;