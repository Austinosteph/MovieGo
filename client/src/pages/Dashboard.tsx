import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div className="bg-black-green min-h-screen w-full">
			<nav className="p-4 px-4 flex justify-between">
				<div>
					<img src="/logo.png" className="w-32 h-12" />
				</div>
				<div className="flex space-x-2">
					<Button className="bg-green-500">
						<Link to="/signin">Login</Link>
					</Button>
					<Button className="bg-transparent border border-white">
						<Link to="/signup">Register</Link>
					</Button>
				</div>
			</nav>
		</div>
	);
};
export default Dashboard;
