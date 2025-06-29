import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-[80vh] flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700">
          Welcome to <span className="text-gray-800">EventApp</span> 🎉
        </h1>
        <p className="text-lg text-gray-700">
          A modern MERN-based event management platform with custom authentication, filtering, and smooth UI/UX.
        </p>
        <div className="space-x-4">
          <Link to="/events" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Browse Events
          </Link>
          <Link to="/add-event" className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">
            Add Your Event
          </Link>
        </div>
      </div>
    </div>
  );
}
