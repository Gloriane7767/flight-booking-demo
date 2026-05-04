
const SearchBooking = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Search Booking</h2>

            <input id="searchEmail" placeholder="Enter email" className="border p-2 w-full mb-2" />

            <button className="bg-purple-600 text-white px-4 py-2 rounded">
                Search
            </button>
        </div>
    );
};

export default SearchBooking;
