import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3500,

        style: {
          background: 'rgba(15, 23, 42, 0.92)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px',
          padding: '16px 18px',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          fontSize: '14px',
          fontWeight: '500',
        },

        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },

        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />

  </React.StrictMode>
);