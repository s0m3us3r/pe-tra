import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { fetchTrainings } from './App.jsx'
import { fetchCustomers } from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';
import CustomerList from './components/CustomerList';
import Error from './components/Error.jsx';
import TrainingStats from './components/TrainingStats.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Calendar fetchTrainings={fetchTrainings} fetchCustomers={fetchCustomers} />,
        index: true
      },
      {
        path: "customers",
        element: <CustomerList fetchCustomers={fetchCustomers} />,
      },
      {
        path: "sessions",
        element: <TrainingList fetchTrainings={fetchTrainings} fetchCustomers={fetchCustomers} />,
      },
      {
        path: "stats",
        element: <TrainingStats fetchTrainings={fetchTrainings} />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
