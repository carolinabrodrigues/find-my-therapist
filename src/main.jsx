import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { ProfileProviderWrapper } from './context/profile.context.jsx';
import { MatchesProviderWrapper } from './context/matches.context.jsx';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <AuthProviderWrapper>
          <ProfileProviderWrapper>
            <MatchesProviderWrapper>
              <App />
            </MatchesProviderWrapper>
          </ProfileProviderWrapper>
        </AuthProviderWrapper>
      </NextUIProvider>
    </Router>
  </React.StrictMode>
);
