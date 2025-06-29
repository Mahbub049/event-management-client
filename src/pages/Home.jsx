import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-lg text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
          Welcome to <span className="text-gray-900">EventApp</span> 🎉
        </h1>

        <p className="text-lg text-gray-700">
          A modern MERN-based event management platform with custom authentication, powerful filtering,
          and an intuitive interface built for performance and ease of use.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/events"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition duration-300"
          >
            Browse Events
          </Link>
          <Link
            to="/add-event"
            className="border border-blue-600 hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-xl text-lg font-medium transition duration-300"
          >
            Add Your Event
          </Link>
        </div>
      </div>
    </section>
  );
}
