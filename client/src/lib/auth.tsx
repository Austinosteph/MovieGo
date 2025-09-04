import { jwtDecode } from 'jwt-decode';

type MyJwtPayload = {
	userId: string;
	name: string;
	role: string;
	exp: number;
};

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('token');
	if (!token) return false;

	try {
		const decoded = jwtDecode<MyJwtPayload>(token);
		const currentTime = Date.now() / 1000;

		if (!decoded.exp || decoded.exp < currentTime) {
			localStorage.removeItem('token');
			return false;
		}
		return true;
	} catch {
		localStorage.removeItem('token');
		return false;
	}
};

export const getUserRole = (): string | null => {
	const token = localStorage.getItem('token');
	if (!token) return null;

	try {
		const decoded = jwtDecode<MyJwtPayload>(token);
		return decoded.role || null;
	} catch {
		return null;
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user'); // optional
	window.location.href = '/signin';
};
