import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../lib/auth';
import { logout } from '../../lib/auth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Movie {
	_id: string;
	title: string;
	description: string;
	image: string;
	duration: number;
	availableSeats: string[];
	dateToWatch: string;
	timeToWatch: string;
	createdAt: string;
	updatedAt: string;
}
const UserDashboard = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery<Movie[]>({
		queryKey: ['movies'],
		queryFn: async () => {
			const res = await axios.get('http://localhost:3000/api/v1/movie', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			return res.data.movies;
		},
	});

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
	if (isLoading) return <p>Loading movies...</p>;
	if (isError) return <p>Failed to load movies</p>;
	return (
		<div className="bg-black-green min-h-screen w-full space-y-4 overflow-auto">
			<nav className="p-4 px-6 flex justify-between">
				<div>
					<img src="/logo.png" className="w-32 h-12" />
				</div>
				<div className="flex space-x-4 items-center ">
					<Link to="/signin" className="font-semibold text-white">
						My Ticket
					</Link>

					<Button
						className="bg-red-500 border border-black"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
			</nav>
			<main className="flex flex-col justify-center items-center space-y-2">
				<h1 className="text-white sm:text-5xl text-3xl font-bold">
					Now Showing
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
					{data?.map((movie) => (
						<Link to={`/user/${movie._id}`} key={movie._id}>
							<div className="border border-black rounded-xl p-4	 shadow flex flex-col justify-center items-center">
								<img
									src={`http://localhost:3000${movie.image}`}
									alt={movie.title}
									className="rounded-xl w-60 h-96 object-cover mb-2"
								/>
								<h2 className="text-xl font-semibold  text-white">
									{movie.title}
								</h2>
							</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
};
export default UserDashboard;
