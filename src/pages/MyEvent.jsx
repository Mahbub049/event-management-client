import { useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function MyEvent() {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchMyEvents = async () => {
    try {
      const res = await axios.get(`/api/events/my-events/${user.name}`);
      setMyEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    if (user?.name) fetchMyEvents();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`/api/events/delete/${id}`);
      fetchMyEvents();
    } catch (err) {
      alert('❌ Failed to delete event');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/events/update/${editData._id}`, editData);
      setEditData(null);
      fetchMyEvents();
    } catch (err) {
      alert('❌ Update failed');
    }
  };

  return (
    <div className="p-6 min-h-[90vh] bg-gradient-to-b from-white to-blue-50">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">🗂️ My Events</h2>

      {myEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map(event => (
            <div key={event._id} className="bg-white border border-gray-200 shadow-md rounded-lg p-5">
              <h3 className="text-xl font-semibold text-blue-800 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-1">📅 {event.date} ⏰ {event.time}</p>
              <p className="text-sm text-gray-600"><strong>📍 Location:</strong> {event.location}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>📝 Description:</strong> {event.description}</p>
              <p className="text-sm text-gray-600 mt-1"><strong>👥 Attendees:</strong> {event.attendeeCount}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditData(event)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for editing */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Edit Event</h3>

            <input
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              type="date"
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              type="time"
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              placeholder="Location"
              className="w-full border p-2 mb-3 rounded"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows="3"
              placeholder="Description"
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditData(null)}
                className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
