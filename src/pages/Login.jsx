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
        setError('');

        if (!form.email || !form.password) {
            setError("Email and Password are required");
            return;
        }

        try {
            const res = await axios.post('/api/auth/login', form);
            loginUser(res.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    {
        error && (
            <div className="text-red-600 bg-red-100 border border-red-300 p-2 rounded mb-3">
                {error}
            </div>
        )
    }


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

            <input placeholder="Email" className="border p-2 w-full" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" className="border p-2 w-full" onChange={e => setForm({ ...form, password: e.target.value })} />

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Login</button>
        </form>
    );
}
