import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import MyEvent from './pages/MyEvent';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/events" element={
              <PrivateRoute><Events /></PrivateRoute>
            } />
            <Route path="/add-event" element={
              <PrivateRoute><AddEvent /></PrivateRoute>
            } />
            <Route path="/my-event" element={
              <PrivateRoute><MyEvent /></PrivateRoute>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
