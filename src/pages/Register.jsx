import { useState } from 'react';
import axios from '../api/axiosInstance';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', photoURL: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password) {
      setError("All fields except Photo URL are required");
      return;
    }

    if (!form.email.includes('@')) {
      setError("Enter a valid email address");
      return;
    }

    try {
      await axios.post('/api/auth/register', form);
      setSuccess("🎉 Registered successfully!");
    } catch (err) {
      setError(err.response?.data?.message || '❌ Registration failed');
    }
  };

  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Create Your Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 border border-green-300 p-2 rounded text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Photo URL (optional)</label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setForm({ ...form, photoURL: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
