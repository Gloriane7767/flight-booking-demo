import axios from "axios";
import type { Flight, Booking } from "../types";

const api = axios.create({
    baseURL: "/api/flights",
});

export const getAllFlights = () =>
    api.get<Flight[]>("").then((r) => r.data);

export const getAvailableFlights = () =>
    api.get<Flight[]>("").then((r) => r.data);

export const bookFlight = (flightId: number, passengerName: string, passengerEmail: string) =>
    api.post<Booking>(`/${flightId}/book`, { passengerName, passengerEmail }).then((r) => r.data);

export const getBookingsByEmail = (email: string) =>
    api.get<Booking[]>(`/bookings?email=${email}`).then((r) => r.data);

export const cancelBooking = (bookingId: number, email: string) =>
    api.delete(`/${bookingId}/cancel?email=${email}`).then((r) => r.data);
