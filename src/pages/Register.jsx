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
      setSuccess("Registered successfully!");
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}

      <input placeholder="Name" className="border p-2 w-full" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" className="border p-2 w-full" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="border p-2 w-full" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Photo URL (optional)" className="border p-2 w-full" onChange={e => setForm({ ...form, photoURL: e.target.value })} />

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
    </form>
  );
}
