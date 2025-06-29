import { useState } from 'react';
import axios from '../api/axiosInstance';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', photoURL: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Registered successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      <input placeholder="Photo URL" onChange={e => setForm({ ...form, photoURL: e.target.value })} />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
