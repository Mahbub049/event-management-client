import { useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function MyEvent() {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchMyEvents = async () => {
    const res = await axios.get(`/api/events/my-events/${user.name}`);
    setMyEvents(res.data);
  };

  useEffect(() => {
    if (user?.name) fetchMyEvents();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    await axios.delete(`/api/events/delete/${id}`);
    fetchMyEvents();
  };

  const handleUpdate = async () => {
    await axios.put(`/api/events/update/${editData._id}`, editData);
    setEditData(null);
    fetchMyEvents();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🗂️ My Events</h2>
      {myEvents.map(event => (
        <div key={event._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p><strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p className="my-2"><strong>Description:</strong> {event.description}</p>
          <p><strong>Attendees:</strong> {event.attendeeCount}</p>

          <div className="mt-2 flex gap-2">
            <button onClick={() => setEditData(event)} className="bg-yellow-500 text-white px-3 py-1 rounded">Update</button>
            <button onClick={() => handleDelete(event._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}

      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Event</h3>
            <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="w-full border p-2 mb-2" />
            <input value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="w-full border p-2 mb-2" type="date" />
            <input value={editData.time} onChange={(e) => setEditData({ ...editData, time: e.target.value })} className="w-full border p-2 mb-2" type="time" />
            <input value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} className="w-full border p-2 mb-2" />
            <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="w-full border p-2 mb-2" rows="3" />

            <div className="flex gap-2 mt-3 justify-end">
              <button onClick={() => setEditData(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
