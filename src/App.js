import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import MyEvent from './pages/MyEvent';
import Register from './pages/Register';



export default function App() {
  return (
    <Router>
      <Navbar />
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
    </Router>
  );
}
