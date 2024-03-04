import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './pages/User';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Need to be wrapped by IsAnon */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {/* Need to be wrapped by IsPrivate */}
        <Route path='/user/:id' element={<User />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
