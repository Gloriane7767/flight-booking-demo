type Props = { onClick: () => void; isActive: boolean };

const AvailableFlights = ({ onClick, isActive }: Props) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded font-medium transition-colors ${
            isActive ? "bg-green-700 text-white" : "bg-green-500 text-white hover:bg-green-600"
        }`}
    >
        Available Flights
    </button>
);

export default AvailableFlights;
