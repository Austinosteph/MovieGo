import { Link } from 'react-router-dom';
const Dashboard = () => {
	return (
		<div>
			Dashboard
			<Link
				to="/signin"
				className="text-green-600 font-medium ml-1 hover:underline"
			>
				Sign in
			</Link>
			<Link
				to="/signup"
				className="text-green-600 font-medium ml-1 hover:underline"
			>
				Sign up
			</Link>
		</div>
	);
};
export default Dashboard;
