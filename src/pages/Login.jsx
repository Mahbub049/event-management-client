import { useState, useContext } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      loginUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
