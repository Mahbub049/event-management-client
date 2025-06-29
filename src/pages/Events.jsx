import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import moment from 'moment';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events/all');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleJoin = async (id) => {
    try {
      await axios.patch(`/api/events/join/${id}`);
      fetchEvents(); // reload
    } catch (err) {
      alert('Already joined or error occurred!');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchTitle = event.title.toLowerCase().includes(search.toLowerCase());

    const eventDate = moment(event.date);
    const today = moment();
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('week');
    const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week');
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
    const endOfLastMonth = moment().subtract(1, 'months').endOf('month');

    let matchFilter = true;
    switch (filter) {
      case 'today':
        matchFilter = eventDate.isSame(today, 'day');
        break;
      case 'thisWeek':
        matchFilter = eventDate.isBetween(startOfWeek, endOfWeek, null, '[]');
        break;
      case 'lastWeek':
        matchFilter = eventDate.isBetween(startOfLastWeek, endOfLastWeek, null, '[]');
        break;
      case 'thisMonth':
        matchFilter = eventDate.isBetween(startOfMonth, endOfMonth, null, '[]');
        break;
      case 'lastMonth':
        matchFilter = eventDate.isBetween(startOfLastMonth, endOfLastMonth, null, '[]');
        break;
      default:
        matchFilter = true;
    }

    return matchTitle && matchFilter;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📅 All Events</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-64"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredEvents.map(event => (
          <div key={event._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p><strong>Host:</strong> {event.name}</p>
            <p><strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p className="my-2"><strong>Description:</strong> {event.description}</p>
            <p><strong>Attendees:</strong> {event.attendeeCount}</p>
            <button
              onClick={() => handleJoin(event._id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Join Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
