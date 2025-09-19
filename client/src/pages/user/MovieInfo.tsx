import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../../lib/auth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CiLocationOn } from 'react-icons/ci';
import { useBookingStore } from '../../store/useBookingStore';

interface Movie {
	_id: string;
	title: string;
	description: string;
	image: string;
	duration: number;
	availableSeats: string[];
	dateToWatch: string;
	timeToWatch: string;
}

const MovieInfo = () => {
	const navigate = useNavigate();
	const { movieinfoID } = useParams<{ movieinfoID: string }>();

	const { theater, date, time, setBooking } = useBookingStore();

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

	const { data: movie } = useQuery<Movie>({
		queryKey: ['movie', movieinfoID],
		queryFn: async () => {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No token found');

			const res = await axios.get(
				`http://localhost:3000/api/v1/movie/${movieinfoID}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return res.data;
		},
		enabled: !!movieinfoID,
	});

	const handleProceed = () => {
		setBooking({
			movieId: movie?._id,
			title: movie?.title,
			duration: movie?.duration,
			theater,
			date,
			time,
		});
		navigate(`/user/${movieinfoID}/booking`);
	};

	return (
		<div className="bg-black-green min-h-screen w-full space-y-4 overflow-auto">
			{/* Navbar */}
			<nav className="p-4 px-6 flex justify-between items-center">
				<img src="/logo.png" className="w-24 sm:w-32 h-10 sm:h-12" />
				<Button
					className="bg-red-500 border border-black text-sm sm:text-base"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</nav>

			<main className="p-4 sm:p-6 space-y-10 sm:space-y-16 flex flex-col h-full">
				<div className="flex flex-col lg:flex-row lg:space-x-20 xl:space-x-80 lg:px-20 xl:px-28 lg:pr-10">
					{/* first; Theater/Date/Time */}
					<div className="space-y-12 flex-1">
						{/* Theater */}
						<div className="text-white space-y-6">
							<h1 className="font-semibold text-2xl sm:text-4xl">Theater</h1>
							<div className="flex flex-wrap gap-3">
								{['Galaxy View', 'Epic Reel', 'SilverScreen'].map((t) => (
									<div
										key={t}
										onClick={() => setBooking({ theater: t })}
										className={`border border-white rounded-full p-2 flex items-center px-3 space-x-2 hover:cursor-pointer hover:bg-green-600 transition ${
											theater === t ? 'bg-green-700' : ''
										}`}
									>
										<CiLocationOn className="w-5 h-5 sm:w-6 sm:h-6" />
										<span className="font-mono text-sm sm:text-lg">{t}</span>
									</div>
								))}
							</div>
						</div>

						{/* Date */}
						<div className="text-white space-y-6">
							<h1 className="font-semibold text-2xl sm:text-4xl">Date</h1>
							<div className="flex flex-wrap gap-3">
								{['22 Oct Mon', '23 Oct Tue', '24 Oct Wed'].map((d) => (
									<div
										key={d}
										onClick={() => setBooking({ date: d })}
										className={`border border-white rounded-xl p-3 sm:p-4 flex flex-col justify-center items-center hover:cursor-pointer hover:bg-green-600 transition ${
											date === d ? 'bg-green-700' : ''
										}`}
									>
										<p className="text-sm sm:text-base font-medium">
											{d.split(' ')[0]} {d.split(' ')[1]}
										</p>
										<p className="text-lg sm:text-xl font-black">
											{d.split(' ')[2]}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Time */}
						<div className="text-white space-y-6">
							<h1 className="font-semibold text-2xl sm:text-4xl">Time</h1>
							<div className="flex flex-wrap gap-3">
								{['15:40', '18:00', '20:15', '22:30'].map((tm) => (
									<div
										key={tm}
										onClick={() => setBooking({ time: tm })}
										className={`border border-white p-2 px-4 rounded-md flex items-center hover:cursor-pointer hover:bg-green-600 transition ${
											time === tm ? 'bg-green-700' : ''
										}`}
									>
										<p className="text-sm sm:text-base font-medium">{tm}</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Movie details */}
					<div className="mt-10 lg:mt-0 w-full lg:w-[250px] space-y-5 text-white flex-shrink-0">
						<img
							src={`http://localhost:3000${movie?.image}`}
							className="w-full sm:w-64 h-full sm:h-96 object-cover rounded-2xl mx-auto"
						/>
						<div className="space-y-2 text-center lg:text-left">
							<h1 className="font-semibold text-xl sm:text-2xl">
								{movie?.title}
							</h1>
							<p className="font-normal text-sm sm:text-lg">
								{movie?.description}
							</p>
							<div className="flex justify-center lg:justify-start space-x-2 text-sm sm:text-lg">
								<p className="font-medium">Duration:</p>
								<p>{movie?.duration} hours</p>
							</div>
						</div>
					</div>
				</div>

				{/* Booking Summary */}
				<div className="flex justify-center lg:justify-end lg:pr-32">
					<div className="w-full sm:w-80 h-auto sm:h-72 mb-4 rounded-2xl border border-white p-6 text-white flex flex-col space-y-4">
						<h1 className="font-semibold text-xl sm:text-3xl text-center">
							{theater || 'Select Theater'}
						</h1>
						<p className="font-semibold text-lg sm:text-2xl">
							{date || 'Select Date'}
						</p>
						<p className="text-base sm:text-xl">{time || 'Select Time'}</p>
						<p className="text-sm sm:text-base">
							*Seat selection can be done after this
						</p>
						<Button
							className="bg-green-700 border border-green-950 mt-2 hover:bg-green-800 text-sm sm:text-base disabled:opacity-50"
							disabled={!theater || !date || !time}
							onClick={handleProceed}
						>
							Proceed
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default MovieInfo;
