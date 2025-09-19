// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MovieInfo from './pages/user/MovieInfo';
import Booking from './pages/user/Booking';
import Checkout from './pages/user/Checkout';
import Successful from './pages/user/Successful';

export default function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route path="/" element={<Dashboard />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/signin" element={<Signin />} />

			{/* Protected routes */}
			<Route
				path="/admin"
				element={
					<ProtectedRoute>
						<AdminDashboard />
					</ProtectedRoute>
				}
			/>

			{/* User routes */}
			<Route
				path="/user"
				element={
					<ProtectedRoute>
						<UserDashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="user/:movieinfoID"
				element={
					<ProtectedRoute>
						<MovieInfo />
					</ProtectedRoute>
				}
			/>
			<Route
				path="user/:movieinfoID/booking"
				element={
					<ProtectedRoute>
						<Booking />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/checkout"
				element={
					<ProtectedRoute>
						<Checkout />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/successful"
				element={
					<ProtectedRoute>
						<Successful />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
