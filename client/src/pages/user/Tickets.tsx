import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { isAuthenticated, getUserRole } from '../../lib/auth';
import { logout } from '../../lib/auth';
import { Link } from 'react-router-dom';

interface Ticket {
	_id: string;
	title: string;
	theater: string;
	timeToWatch: string;
	dateToWatch: string;
	seats: string[];
	status?: string;
}

// Reducer setup
type State = { activeTab: 'upcoming' | 'history' };
type Action = { type: 'TOGGLE_TAB'; payload: 'upcoming' | 'history' };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'TOGGLE_TAB':
			return { ...state, activeTab: action.payload };
		default:
			return state;
	}
};

const Tickets = () => {
	const navigate = useNavigate();
	const handleclick = () => navigate('/user');

	// useReducer for tab switching
	const [state, dispatch] = useReducer(reducer, { activeTab: 'upcoming' });

	const { data: bookings = [] } = useQuery<Ticket[]>({
		queryKey: ['bookings'],
		queryFn: async () => {
			const res = await axios.get(
				'https://moviego-6jj2.onrender.com/api/v1/booking',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			return res.data.bookings ?? [];
		},
	});

	const filteredBookings =
		state.activeTab === 'upcoming'
			? bookings.filter((b) => b.status === 'confirmed')
			: bookings.filter((b) => b.status !== 'confirmed');

	useEffect(() => {
		if (!isAuthenticated() || getUserRole() !== 'user') {
			logout();
			navigate('/signin');
		}
	}, [navigate]);

	const handleLogout = () => {
		logout();
		navigate('/signin');
	};
	const handlemovie = () => {
		navigate('/user');
	};

	return (
		<div className="bg-black-green min-h-screen w-full overflow-auto">
			<nav className="p-4 px-6 flex justify-between">
				<div>
					<img src="/logo.png" className="w-32 h-12" />
				</div>
				<div className="flex space-x-2 items-center ">
					<Button
						className="bg-green-800 border border-black hover:bg-green-900"
						onClick={handlemovie}
					>
						Movies
					</Button>
					<Button
						className="bg-red-600 border border-black hover:bg-red-800"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
			</nav>
			<div className="flex flex-col space-y-10 justify-center items-center pt-20">
				{/* Buttons */}
				<div className="flex flex-row space-x-4">
					<Button
						onClick={() =>
							dispatch({ type: 'TOGGLE_TAB', payload: 'upcoming' })
						}
						className={`p-7 text-base sm:min-w-sm rounded-2xl ${
							state.activeTab === 'upcoming'
								? 'bg-green-700 border border-green-950'
								: 'bg-transparent border border-gray-400 hover:bg-green-950'
						}`}
					>
						Upcoming
					</Button>
					<Button
						onClick={() => dispatch({ type: 'TOGGLE_TAB', payload: 'history' })}
						className={`p-7 text-base sm:min-w-sm rounded-2xl ${
							state.activeTab === 'history'
								? 'bg-green-700 border border-green-950'
								: 'bg-transparent border border-gray-400 hover:bg-green-950'
						}`}
					>
						History
					</Button>
				</div>

				{/* Tickets grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
					{filteredBookings.length === 0 ? (
						<p className="text-gray-400 text-2xl col-span-3 text-center">
							No bookings found
						</p>
					) : (
						filteredBookings.map((ticket) => (
							<div
								key={ticket._id}
								className="border border-gray-700 rounded-2xl p-6 shadow flex flex-col text-white space-y-6"
							>
								<div className="mb-4 space-y-2">
									<h1 className="font-normal text-lg">Date</h1>
									<p className="font-medium text-2xl">{ticket.dateToWatch}</p>
								</div>
								<div className="mb-4 space-y-2">
									<h1 className="font-normal text-lg">Movie Title</h1>
									<p className="font-medium text-2xl">{ticket.title}</p>
								</div>
								<div className="flex flex-row justify-between mb-8">
									<div>
										<h1 className="font-normal text-lg">Ticket</h1>
										<p className="font-medium text-2xl">
											{ticket.seats.join(', ')}
										</p>
									</div>
									<div>
										<h1 className="font-normal text-lg">Hours</h1>
										<p className="font-medium text-2xl">{ticket.timeToWatch}</p>
									</div>
								</div>
								<Button
									className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-4 text-lg rounded-md"
									onClick={handleclick}
								>
									Download Ticket
								</Button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Tickets;
