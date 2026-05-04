type Props = { onClick: () => void };

const AvailableFlights = ({ onClick }: Props) => {
    return (
        <button onClick={onClick} className="bg-green-500 text-white px-4 py-2 rounded">
            Available Flights
        </button>
    );
};

export default AvailableFlights;