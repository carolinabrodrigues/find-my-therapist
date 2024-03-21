import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './pages/User';
import MatchedProfiles from './pages/MatchedProfiles';
import Questions from './pages/Questions';
import IsAnon from './components/auth/IsAnon';
import IsPrivate from './components/auth/IsPrivate';
import Error from './pages/Error';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/signup'
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path='/questions'
          element={
            <IsPrivate>
              <Questions />
            </IsPrivate>
          }
        />
        <Route
          path='/user'
          element={
            <IsPrivate>
              <User />
            </IsPrivate>
          }
        />
        <Route
          path='/matchedprofiles'
          element={
            <IsPrivate>
              <MatchedProfiles />
            </IsPrivate>
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
