import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmpassword: '',
	});
	const [message, setMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const showMessage = (msg: string) => {
		setMessage(msg);
		setTimeout(() => setMessage(''), 5000);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.confirmpassword
		) {
			showMessage('All fields are required!!!!');
			return;
		}

		if (formData.password !== formData.confirmpassword) {
			showMessage('Passwords do not match');
			return;
		}

		showMessage(`Welcome ${formData.name} to MovieGo`);

		setTimeout(() => {
			setFormData({
				name: '',
				email: '',
				password: '',
				confirmpassword: '',
			});
		}, 2000);
	};

	return (
		<div className="sm:space-y-8 sm:w-96 w-72 space-y-4">
			<h1 className="font-semibold text-3xl text-black">Create an account</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-6">
				{/* Name */}
				<div className="flex flex-col space-y-2">
					<label className="font-medium text-lg">Name</label>
					<input
						type="text"
						name="name"
						placeholder="Full name"
						value={formData.name}
						onChange={handleChange}
						className="p-2 border-2 border-gray-600 w-full rounded-lg focus:ring-2 focus:ring-green-600"
					/>
				</div>

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

				{/* Confirm Password */}
				<div className="flex flex-col space-y-2">
					<label className="font-medium text-lg">Confirm Password</label>
					<div className="relative">
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							name="confirmpassword"
							placeholder="Confirm Password"
							value={formData.confirmpassword}
							onChange={handleChange}
							className="p-2 pr-10 border-2 border-gray-600 w-full rounded-lg focus:ring-2 focus:ring-green-600"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword((prev) => !prev)}
							className="absolute right-3 top-3 text-gray-600"
						>
							{showConfirmPassword ? <FaEyeSlash /> : <FaRegEyeSlash />}
						</button>
					</div>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full bg-green-600 p-3 text-white font-medium rounded-lg hover:bg-green-700"
				>
					Sign Up
				</button>
			</form>

			{/* Log in Link */}
			<div className="flex justify-center items-center text-sm">
				<span>Already have an account?</span>
				<Link
					to="/login"
					className="text-green-600 font-medium ml-1 hover:underline"
				>
					Log in
				</Link>
			</div>

			{/* Message */}
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

export default Register;
