export type Flight = {
    id: number;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    status: string;
    destination: string;
    price: number;
};

export type Booking = {
    id: number;
    flightNumber: string;
    passengerName: string;
    passengerEmail: string;
    departureTime: string;
    arrivalTime: string;
    status: string;
    destination: string;
    price: number;
};


