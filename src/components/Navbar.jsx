import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🎉 EventApp</Link>

      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/add-event">Add Event</Link>
        <Link to="/my-event">My Event</Link>

        {!user ? (
          <>
          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded">Sign In</Link>
          <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded">Register</Link>
          </>
        ) : (
          <div className="relative group">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer border"
            />
            <div className="absolute hidden group-hover:block right-0 top-10 bg-white text-black rounded shadow-md min-w-[150px] p-2">
              <div className="text-sm px-2">{user.name}</div>
              <button onClick={handleLogout} className="mt-2 bg-red-500 text-white w-full py-1 rounded">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
