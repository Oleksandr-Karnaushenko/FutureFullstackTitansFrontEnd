import React from 'react';
import ReactDOM from 'react-dom/client';

import 'modern-normalize';
import App from "./components/App/App.jsx";
import './index.css';
import { store, persistor } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
  </React.StrictMode>
);
