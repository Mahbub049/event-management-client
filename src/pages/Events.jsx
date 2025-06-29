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
            fetchEvents();
        } catch (err) {
            alert('❌ Already joined or error occurred!');
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
        <div className="min-h-[90vh] px-6 py-10 bg-gradient-to-br from-white to-blue-50">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📅 Browse Events</h2>

            {/* 🔍 Search & Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded w-48 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">📆 All Dates</option>
                    <option value="today">📍 Today</option>
                    <option value="thisWeek">📅 This Week</option>
                    <option value="lastWeek">📆 Last Week</option>
                    <option value="thisMonth">🗓️ This Month</option>
                    <option value="lastMonth">📖 Last Month</option>
                </select>
            </div>

            {/* 📦 Events */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div
                            key={event._id}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200"
                        >
                            <h3 className="text-xl font-semibold text-blue-800">{event.title}</h3>
                            <p className="text-sm text-gray-500">by {event.name}</p>

                            <div className="mt-2 text-sm text-gray-700 space-y-1">
                                <p><strong>Date:</strong> {moment(event.date).format('MMMM Do, YYYY')}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                            </div>

                            <p className="mt-3 text-sm font-medium text-gray-700">👥 Attendees: {event.attendeeCount}</p>

                            <button
                                onClick={() => handleJoin(event._id)}
                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
                            >
                                ✅ Join Event
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-full">No matching events found.</p>
                )}
            </div>
        </div>
    );
}
