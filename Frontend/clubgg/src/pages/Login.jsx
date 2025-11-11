
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // If backend returns a token (existing auth flow)
      if (data && data.token) {
        onLogin && onLogin(data.user);
        setSuccess('Login successful');
        setTimeout(() => navigate('/clubs'), 500);
        return;
      }

      // If backend returns clubs JSON (new sample login)
      if (data && Array.isArray(data.clubs)) {
        // store clubs in localStorage so other pages can access if needed
        try {
          localStorage.setItem('clubs', JSON.stringify(data.clubs));
        } catch (storageErr) {
          console.warn('localStorage setItem failed', storageErr);
        }
        setSuccess('Login successful');
        setTimeout(() => navigate('/clubs'), 500);
        return;
      }

      // Handle errors
      setError(data && data.error ? data.error : 'Login failed');
      setSuccess('');
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold mb-4 text-gray-800">Login</h4>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="sr-only">Email</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="sr-only">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-3 text-sm text-red-700 bg-red-100 rounded px-3 py-2">{error}</div>
          )}
          {success && (
            <div className="mb-3 text-sm text-green-700 bg-green-100 rounded px-3 py-2">{success}</div>
          )}

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a className="text-indigo-600 hover:underline" href="/register">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
