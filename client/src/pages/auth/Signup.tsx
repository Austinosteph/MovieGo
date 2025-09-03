import Register from '@/components/Register';

const Signup = () => {
	return (
		<div className="sm:flex">
			<div className="min-h-screen bg-black-green w-full space-y-80">
				<div className="p-6 px-6 space-y-96">
					<img src="/logo.png" className="w-32 h-12" />
					<h1 className="text-white font-light text-5xl leading-tight">
						Welcome. Begin your cinematic adventure now with our ticketing
						platform!
					</h1>
				</div>
			</div>
			<div className="min-h-screen w-full flex items-center justify-center">
				<Register />
			</div>
		</div>
	);
};
export default Signup;
