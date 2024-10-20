import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Outlet } from "react-router-dom";
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import AvailableBooks from './components/availablebooks.jsx';
import CheckoutBook from './components/checkedoutbooks.jsx';
import CheckinBook from './components/checkin.jsx';
import CheckedoutBooks from './components/checkedoutbooks.jsx';

// import book from '../../server/routes/books.js'

const router = createBrowserRouter([
  {
    path: "/books",
    element: <App />,  // Main App component
    children: [
      {
        path: "availablebooks", 
        element: <AvailableBooks />,
      },
      {
        path: "checkout", 
        element: <CheckoutBook />,
      },
      {
        path: "checkin", 
        element: <CheckinBook />,
      },
      {
        path: "checkedoutbooks", 
        element: <CheckedoutBooks />,
      }
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
