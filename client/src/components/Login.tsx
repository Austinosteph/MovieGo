import { useState } from 'react';
import { FaEyeSlash, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

type LoginData = {
	email: string;
	password: string;
};

type DecodedToken = {
	userId: string;
	name: string;
	role: string;
	exp: number;
};

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [message, setMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	// API call
	const loginUser = async (userData: LoginData) => {
		const res = await axios.post(
			'http://localhost:3000/api/v1/auth/login',
			userData
		);
		return res.data;
	};

	// Mutation
	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			showMessage('Login successful 🎉');

			if (data.token) {
				localStorage.setItem('token', data.token);

				// ✅ decode token to get role
				const decoded: DecodedToken = jwtDecode(data.token);
				localStorage.setItem('role', decoded.role);

				// Redirect based on role
				setTimeout(() => {
					if (decoded.role === 'admin') {
						navigate('/admin');
					} else {
						navigate('/user');
					}
				}, 1500);
			}

			setFormData({ email: '', password: '' });
		},
		onError: (error: any) => {
			const errMsg =
				error.response?.data?.error ||
				error.response?.data?.errors?.join(', ') ||
				'Login failed ❌';
			showMessage(errMsg);
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const showMessage = (msg: string) => {
		setMessage(msg);
		const timer = setTimeout(() => setMessage(''), 5000);
		return () => clearTimeout(timer);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			showMessage('All fields are required!!!!');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			showMessage('Invalid email format');
			return;
		}

		mutation.mutate(formData);
	};

	return (
		<div className="sm:space-y-8 space-y-4 sm:min-w-xl min-w-2xs bg-white sm:px-8 px-5 sm:py-10 py-10 rounded-2xl">
			<h1 className="font-semibold text-3xl text-black">
				Login to your account
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-6">
				{/* Email */}
				<div className="flex flex-col space-y-2">
					<label className="font-medium text-lg">Email</label>
					<input
						type="email"
						name="email"
						placeholder="example@email.com"
						value={formData.email}
						onChange={handleChange}
						className="p-2 border-2 border-gray-600 w-full rounded-lg focus:ring-2 focus:ring-green-600"
					/>
				</div>

				{/* Password */}
				<div className="flex flex-col space-y-2">
					<label className="font-medium text-lg">Password</label>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							className="p-2 pr-10 border-2 border-gray-600 w-full rounded-lg focus:ring-2 focus:ring-green-600"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-3 text-gray-600"
						>
							{showPassword ? <FaEyeSlash /> : <FaRegEyeSlash />}
						</button>
					</div>
				</div>

				{/* Button */}
				<button
					type="submit"
					disabled={mutation.isPending}
					className="w-full bg-green-600 p-3 text-white font-medium rounded-lg hover:bg-green-700"
				>
					{mutation.isPending ? 'Logging in...' : 'Log In'}
				</button>
			</form>

			<div className="flex justify-center items-center text-sm mt-4">
				<span>Don't have an account?</span>
				<Link
					to="/register"
					className="text-green-600 font-medium ml-1 hover:underline"
				>
					Sign up
				</Link>
			</div>

			{message && (
				<p className="bg-white text-black p-3 rounded-lg shadow-lg border border-green-300 mt-4">
					{message}
				</p>
			)}
		</div>
	);
};

export default Login;
