import { useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
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
    <div className="min-h-[90vh] bg-gradient-to-b from-white to-blue-50 py-12 px-6 font-montserrat">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-10">🗂️ My Events</h2>

      {myEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => (
            <div key={event._id} className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-800 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-2">📅 {event.date} ⏰ {event.time}</p>
              <p className="text-sm text-gray-700"><strong>📍 Location:</strong> {event.location}</p>
              <p className="text-sm text-gray-700 mt-2"><strong>📝 Description:</strong> {event.description}</p>
              <p className="text-sm text-gray-700 mt-1"><strong>👥 Attendees:</strong> {event.attendeeCount}</p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setEditData(event)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-full font-medium transition"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full font-medium transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl">
            <h3 className="text-2xl font-bold text-blue-700 mb-6">Edit Event</h3>

            <div className="space-y-4">
              <input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={editData.date}
                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={editData.time}
                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                type="time"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                placeholder="Location"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows="3"
                placeholder="Description"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditData(null)}
                className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-black font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
