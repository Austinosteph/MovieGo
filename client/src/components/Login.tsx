import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const showMessage = (msg: string) => {
		setMessage(msg);
		setTimeout(() => setMessage(''), 5000);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			showMessage('All fields are required!!!!');
			return;
		}
		showMessage('Login succesfull');
		setTimeout(() => {
			navigate('/user');
		}, 1000);
		setTimeout(() => {
			setFormData({
				email: '',
				password: '',
			});
		}, 2000);
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
							className="absolute right-3 top-3  text-gray-600"
						>
							{showPassword ? <FaEyeSlash /> : <FaRegEyeSlash />}
						</button>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-green-600 p-3 text-white font-medium rounded-lg hover:bg-green-700"
				>
					Sign Up
				</button>
			</form>

			<div>
				{message && (
					<p className="bg-white text-black p-3 rounded-lg shadow-lg border border-green-300">
						{message}
					</p>
				)}
			</div>
		</div>
	);
};
export default Login;
