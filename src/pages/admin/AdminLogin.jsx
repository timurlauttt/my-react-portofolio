import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
	const navigate = useNavigate();
	const { login, currentUser, loading: authLoading } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// If already logged in, redirect to dashboard
		if (!authLoading && currentUser) {
			navigate('/admin/dashboard', { replace: true });
		}
	}, [currentUser, authLoading, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await login(email, password);
			toast.success('Logged in successfully');
			navigate('/admin/dashboard', { replace: true });
		} catch (err) {
			console.error('Login failed', err);
			toast.error(err?.message || 'Login failed. Check credentials.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full bg-white p-8 rounded shadow">
				<h2 className="text-2xl font-bold mb-4">Admin Login</h2>
				<p className="text-sm text-gray-600 mb-6">Sign in to manage your portfolio content.</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div className="flex items-center justify-between">
						<button
							type="submit"
							disabled={loading}
							className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
						>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>
						<Link to="/" className="text-sm text-gray-600 hover:underline">Back to site</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
