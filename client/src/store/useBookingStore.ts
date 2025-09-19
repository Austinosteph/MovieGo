import { create } from 'zustand';

interface BookingState {
	movieId: string | null;
	title: string | null;
	duration: number | null;
	theater: string | null;
	date: string | null;
	time: string | null;
	seats: string[];
	pricePerSeat: number;

	setBooking: (data: {
		movieId?: string | null;
		title?: string | null;
		duration?: number | null;
		theater?: string | null;
		date?: string | null;
		time?: string | null;
	}) => void;

	addSeat: (seat: string) => void;
	removeSeat: (seat: string) => void;
	clearSeats: () => void;
	resetBooking: () => void;
	getTotal: () => number;
}

export const useBookingStore = create<BookingState>((set, get) => ({
	movieId: null,
	title: null,
	duration: null,
	theater: null,
	date: null,
	time: null,
	seats: [],
	pricePerSeat: 1000,

	setBooking: (data) => set((state) => ({ ...state, ...data })),

	addSeat: (seat) =>
		set((state) => ({
			seats: state.seats.includes(seat) ? state.seats : [...state.seats, seat],
		})),

	removeSeat: (seat) =>
		set((state) => ({
			seats: state.seats.filter((s) => s !== seat),
		})),

	clearSeats: () => set({ seats: [] }),

	resetBooking: () =>
		set({
			movieId: null,
			title: null,
			duration: null,
			theater: null,
			date: null,
			time: null,
			seats: [],
			pricePerSeat: 1000,
		}),

	getTotal: () => get().seats.length * get().pricePerSeat,
}));
