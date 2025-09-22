import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const Successful = () => {
	const navigate = useNavigate();
	const handleViewTicket = () => {
		navigate('/tickets');
	};
	const handleBackHome = () => {
		navigate('/user');
	};
	return (
		<div className="bg-black-green min-h-screen w-full overflow-auto">
			<main className="text-white flex flex-col items-center justify-center min-h-screen space-y-10">
				<h1 className="font-semibold text-4xl">Payment Success</h1>
				<img src="/public/🦆 icon _check circle_.png" className="w-40 h-40" />

				<div className="flex flex-col  space-y-4 ">
					<Button
						className="bg-green-700 border border-green-950 p-7 hover:bg-green-800 text-base sm:min-w-md"
						onClick={handleViewTicket}
					>
						View Ticket
					</Button>
					<Button
						className="bg-transparent border border-gray-400 hover:bg-green-950 p-7 text-base sm:min-w-md"
						onClick={handleBackHome}
					>
						Back to Homepage
					</Button>
				</div>
			</main>
		</div>
	);
};
export default Successful;
