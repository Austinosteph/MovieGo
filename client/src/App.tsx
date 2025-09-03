import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Signup />} />
				<Route path="/Signin" element={<Signin />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/user" element={<UserDashboard />} />
			</Routes>
		</BrowserRouter>
	);
}
