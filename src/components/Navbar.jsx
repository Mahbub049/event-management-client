import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition">
          🎉 EventApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/events" className="hover:text-gray-200 transition">Events</Link>
          <Link to="/add-event" className="hover:text-gray-200 transition">Add Event</Link>
          <Link to="/my-event" className="hover:text-gray-200 transition">My Event</Link>

          {/* Auth Section */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-700 font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-700 font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Avatar */}
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:scale-105 transition"
              />

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-3 bg-white text-gray-800 rounded-lg shadow-xl w-48 z-50 transition-all duration-200 ease-in-out ${
                  showDropdown ? 'opacity-100 visible' : 'opacity-0 invisible scale-95'
                }`}
              >
                <div className="p-3">
                  <p className="text-sm font-semibold border-b pb-2">{user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm w-full py-2 rounded-full transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
