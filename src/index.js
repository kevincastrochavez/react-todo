import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TodosLoader from './components/TodosLoader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodosLoader>
      <App />
    </TodosLoader>
  </React.StrictMode>
);

reportWebVitals();
