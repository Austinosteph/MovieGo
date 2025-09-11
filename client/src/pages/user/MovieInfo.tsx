import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../../lib/auth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CiLocationOn } from 'react-icons/ci';

interface Movie {
	_id: string;
	title: string;
	description: string;
	image: string;
}

const MovieInfo = () => {
	const navigate = useNavigate();
	const { movieinfoID } = useParams<{ movieinfoID: string }>();

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

	const {
		data: movie,
		isLoading,
		isError,
	} = useQuery<Movie>({
		queryKey: ['movie', movieinfoID],
		queryFn: async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('No token found');
			}

			const res = await axios.get(
				`http://localhost:3000/api/v1/movie/${movieinfoID}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log('Fetched movie data:', res.data); //remove later
			return res.data;
		},
		enabled: !!movieinfoID,
	});

	return (
		<div className="bg-black-green min-h-screen w-full space-y-4 overflow-auto">
			<nav className="p-4 px-6 flex justify-between">
				<div>
					<img src="/logo.png" className="w-32 h-12" />
				</div>
				<div className="flex space-x-4 items-center">
					<Button
						className="bg-red-500 border border-black"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
			</nav>

			<main className="p-6 space-y-16 h-screen flex flex-col">
				<div className="flex space-x-80 px-28 pr-10">
					{/* first; get details from data base and update code */}
					<div className="space-y-16">
						{/* Theater */}
						<div className="text-white space-y-8">
							<h1 className="font-semibold text-4xl">Theater</h1>
							<div className="flex space-x-2">
								<div className="border border-white rounded-full p-2 flex justify-center items-center px-3 space-x-2 hover:cursor-pointer hover:bg-green-600">
									<CiLocationOn className="w-6 h-6" />
									<span className="font-mono text-lg">Bukit Bintang</span>
								</div>
								<div className="border border-white rounded-full p-2 flex justify-center items-center px-3 space-x-2 hover:cursor-pointer hover:bg-green-600">
									<CiLocationOn className="w-6 h-6" />
									<span className="font-mono text-lg">BIOI Putrajaye</span>
								</div>
								<div className="border border-white rounded-full p-2 flex justify-center items-center px-3 space-x-2 hover:cursor-pointer hover:bg-green-600">
									<CiLocationOn className="w-6 h-6" />
									<span className="font-mono text-lg">KB Mall </span>
								</div>
							</div>
						</div>
						{/* Date */}
						<div className="text-white space-y-8">
							<h1 className="font-semibold text-4xl">Date</h1>
							<div className="flex space-x-4">
								<div className="flex space-x-4">
									<div className="border border-white rounded-xl p-4 flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">22 Oct</p>
										<p className="text-xl font-black">Mon</p>
									</div>
								</div>
								<div className="flex space-x-4">
									<div className="border border-white rounded-xl p-4 flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">22 Oct</p>
										<p className="text-xl font-black">Mon</p>
									</div>
								</div>
								<div className="flex space-x-4">
									<div className="border border-white rounded-xl p-4 flex flex-col justify-center items-center hover:cursor-pointer  hover:bg-green-600">
										<p className="text-base font-medium">22 Oct</p>
										<p className="text-xl font-black">Mon</p>
									</div>
								</div>
								<div className="flex space-x-4">
									<div className="border border-white rounded-xl p-4 flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">22 Oct</p>
										<p className="text-xl font-black">Mon</p>
									</div>
								</div>
								<div className="flex space-x-4">
									<div className="border border-white rounded-xl p-4 flex flex-col justify-center items-center hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">22 Oct</p>
										<p className="text-xl font-black">Mon</p>
									</div>
								</div>
								<div className="flex space-x-4">
									<div className="border border-white rounded-xl p-4 flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">22 Oct</p>
										<p className="text-xl font-black">Mon</p>
									</div>
								</div>
							</div>
						</div>
						{/* Time */}
						<div className="text-white space-y-8">
							<h1 className="font-semibold text-4xl">Time</h1>
							<div className="flex space-x-4">
								<div className="flex space-x-4">
									<div className="border border-white p-2 px-4 rounded-md flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">15:40</p>
									</div>
									<div className="border border-white p-2 px-4 rounded-md flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">15:40</p>
									</div>
									<div className="border border-white p-2 px-4 rounded-md flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-green-600">
										<p className="text-base font-medium">15:40</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* second */}
					<div className="w-[250px] h-[548px] bg-blue-700">2</div>
				</div>

				<div className="flex justify-end pr-64">
					<div className="bg-amber-700 w-[373px] h-[325px]">3</div>
				</div>
			</main>
		</div>
	);
};

export default MovieInfo;
