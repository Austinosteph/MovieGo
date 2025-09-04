import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../lib/auth';
import { logout } from '../../lib/auth';

const AdminDashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated() || getUserRole() !== 'admin') {
			logout();
			navigate('/signin');
		}
	}, [navigate]);

	const handleLogout = () => {
		logout();
		navigate('/signin');
	};
	return (
		<div>
			Admin Dashboard
			<button
				onClick={handleLogout}
				className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
			>
				Logout
			</button>
		</div>
	);
};
export default AdminDashboard;
