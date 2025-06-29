import { useState, useContext } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function AddEvent() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    name: user?.name || '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/events/add', form);
      setMessage('✅ Event added successfully!');
      setForm({ title: '', name: user.name, date: '', time: '', location: '', description: '' });
    } catch (err) {
      setMessage('❌ Failed to add event');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      {message && <p className="mb-3 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Event Title" value={form.title} onChange={handleChange} className="w-full border p-2" required />
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full border p-2" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border p-2" required />
        <input name="time" type="time" value={form.time} onChange={handleChange} className="w-full border p-2" required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-2" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2" rows="4" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Event</button>
      </form>
    </div>
  );
}
