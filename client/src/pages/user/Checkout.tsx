import { useBookingStore } from '../../store/useBookingStore';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
	const { movieId, title, theater, date, time, seats, getTotal } =
		useBookingStore();
	const ticketCount = seats.length;

	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: () => {
			if (!token) throw new Error('You must be logged in to book a ticket');

			return axios.post(
				'http://localhost:3000/api/v1/booking',
				{
					movieId,
					title,
					theater,
					dateToWatch: date,
					timeToWatch: time,
					seats,
					totalPrice: getTotal(),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`, // send token
					},
				}
			);
		},
		onSuccess: (res) => {
			alert('Booking confirmed! ID: ' + res.data.bookingId);
			navigate('/successful');
		},
		onError: (err: any) => {
			alert('Booking failed: ' + (err.response?.data?.message || err.message));
			console.error(
				'Booking failed:',
				err.response?.data?.message || err.message
			);
		},
	});

	const handleCheckout = () => {
		if (!seats.length) return alert('Please select at least one seat');
		mutation.mutate();
	};

	return (
		<div className="min-h-screen w-full bg-black-green text-white overflow-auto">
			<div className="max-w-md mx-auto p-8">
				<h1 className="text-4xl font-semibold mb-8">Booking Detail</h1>
				<div className="mb-12">
					<h2 className="text-2xl font-medium mb-4">Schedule</h2>
					<div className="space-y-4">
						<div>
							<p className="text-gray-300 text-lg mb-1">Movie Title</p>
							<p className="text-2xl font-medium">{title}</p>
						</div>
						<div>
							<p className="text-gray-300 text-lg mb-1">Date</p>
							<p className="text-2xl font-medium">{date}</p>
						</div>
						<div className="flex justify-between items-end">
							<div>
								<p className="text-gray-300 text-lg mb-1">
									Tickets ({ticketCount})
								</p>
								<p className="text-2xl font-medium">{seats.join(', ')}</p>
							</div>
							<div className="text-right">
								<p className="text-gray-300 text-lg mb-1">Showtime</p>
								<p className="text-2xl font-medium">{time}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mb-8">
					<h2 className="text-lg font-medium mb-4">Transaction Detail</h2>
					<div className="space-y-2">
						<div className="flex justify-between items-center text-lg">
							<span>REGULAR SEAT</span>
							<span>
								₦ {getTotal() / ticketCount} x {ticketCount}
							</span>
						</div>
						<hr className="border-gray-600 my-4" />
						<div className="flex justify-between items-center text-lg font-semibold">
							<span>Total payment</span>
							<span>₦ {getTotal()}</span>
						</div>
					</div>
				</div>
				<p className="text-gray-400 text-sm mb-6">
					*Purchased ticket cannot be canceled
				</p>
				<Button
					onClick={handleCheckout}
					className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-4 text-lg rounded-lg"
				>
					Checkout Ticket
				</Button>
			</div>
		</div>
	);
};

export default Checkout;
