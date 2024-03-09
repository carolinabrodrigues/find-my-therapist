import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { ProfileProviderWrapper } from './context/profile.context.jsx';
import { MatchesProviderWrapper } from './context/matches.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <MatchesProviderWrapper>
          <App />
        </MatchesProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
