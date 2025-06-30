import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaPlusCircle } from 'react-icons/fa';

export default function Home() {
  return (
    <section className="min-h-[90vh] font-montserrat bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white p-10 md:p-14 rounded-3xl shadow-2xl text-center space-y-8 transition-all duration-300">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight tracking-tight">
          Welcome to <span className="text-gray-900">EventApp</span> 🎉
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Plan, manage, and discover events with ease. <br className="hidden md:block" />
          Your go-to MERN-powered event management platform with secure authentication and intuitive UX.
        </p>

        {/* Call to Actions */}
        <div className="flex justify-center gap-4 flex-wrap pt-2">
          <Link
            to="/events"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:shadow-md transition-all duration-300"
          >
            <FaCalendarAlt /> Browse Events
          </Link>
          <Link
            to="/add-event"
            className="flex items-center gap-2 border border-blue-600 hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-full text-lg font-medium shadow hover:shadow-md transition-all duration-300"
          >
            <FaPlusCircle /> Add Your Event
          </Link>
        </div>
      </div>
    </section>
  );
}
