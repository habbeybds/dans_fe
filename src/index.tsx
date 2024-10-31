import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './App.css'; // Import App.css agar berlaku global

const container = document.getElementById('root');

// Pastikan elemen root sudah ada
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
