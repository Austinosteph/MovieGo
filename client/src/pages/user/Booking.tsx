import SeatSelection from '@/components/Seat-Selection';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '../../store/useBookingStore';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
	const { seats, getTotal } = useBookingStore();
	const navigate = useNavigate();

	const handleProceed = () => {
		navigate('/checkout');
	};

	return (
		<div className="bg-black-green min-h-screen w-full overflow-auto">
			<main className="p-4 sm:p-16 space-y-4">
				<h1 className="text-white font-semibold text-2xl sm:text-4xl px-4 sm:px-8">
					Seat
				</h1>
				<div>
					<SeatSelection />
				</div>
			</main>

			<div className="border-b-2 border-gray-500 my-4" />

			<footer className="flex flex-col sm:flex-row justify-center items-center sm:space-x-10 space-y-4 sm:space-y-0 p-4 text-white mb-5">
				<div className="text-center sm:text-left">
					<h1 className="font-medium text-lg">TOTAL</h1>
					<p className="font-bold text-2xl sm:text-4xl">NAIRA {getTotal()}</p>
				</div>

				<div className="text-center sm:text-left">
					<h1 className="font-medium text-lg">SEAT</h1>
					<p className="font-bold text-2xl sm:text-4xl">
						{seats.length > 0 ? seats.join(', ') : 'No seat selected'}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
					<Button
						className="bg-transparent border border-gray-400 hover:bg-green-900 px-6 py-3 text-base"
						onClick={() => navigate(-1)}
					>
						Back
					</Button>

					<Button
						className="bg-green-700 border border-green-950 px-6 py-3 hover:bg-green-800 text-base disabled:opacity-50"
						disabled={seats.length === 0}
						onClick={handleProceed}
					>
						Proceed Payment
					</Button>
				</div>
			</footer>
		</div>
	);
};

export default Booking;
