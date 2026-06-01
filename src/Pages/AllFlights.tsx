type Props = { onClick: () => void; isActive: boolean };

const AllFlights = ({ onClick, isActive }: Props) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded font-medium transition-colors ${
            isActive ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
        All Flights
    </button>
);

export default AllFlights;
