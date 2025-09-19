import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';

export default function SeatSelection() {
	const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	const seatsPerRow = 10;

	// Zustand store
	const { seats, addSeat, removeSeat, clearSeats } = useBookingStore();

	const seatLayout = rows.flatMap((row) =>
		Array.from({ length: seatsPerRow }, (_, i) => `${row}${i + 1}`)
	);

	const toggleSeat = (seatId: string) => {
		if (seats.includes(seatId)) {
			removeSeat(seatId);
		} else {
			addSeat(seatId);
		}
	};

	return (
		<div className="p-4 sm:p-8 rounded-lg max-w-4xl sm:max-w-2xl mx-auto">
			{/* Seat Grid */}
			<div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6">
				{seatLayout.map((seatId) => (
					<button
						key={seatId}
						onClick={() => toggleSeat(seatId)}
						className={`
          w-full sm:w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200
          ${
						seats.includes(seatId)
							? 'bg-emerald-500 text-white shadow-lg transform scale-105'
							: 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow-md'
					}
        `}
					>
						{seatId}
					</button>
				))}
			</div>

			{/* Clear Button */}
			<div className="flex justify-center">
				<Button
					onClick={clearSeats}
					variant="secondary"
					className="w-full sm:max-w-md bg-white text-gray-800 hover:bg-gray-100 rounded-full h-12 flex items-center justify-center gap-2"
				>
					<X className="w-5 h-5" />
					Clear Selection ({seats.length} selected)
				</Button>
			</div>
		</div>
	);
}
