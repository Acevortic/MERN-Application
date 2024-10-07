import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import book from '../../server/routes/books.js'

// const Book = createBrowserRouter([
//   {
//     path: "/aviilablebooks",
//     element: <App />,
//     children: [
//       {
//         path: "/aviilablebooks",
//         element: <AvailableBooks />,
//       },
//     ],
//   },
//   {
//     path: "checkedoutbooks",
//     element: <App />,
//     children: [
//       {
//         path: "checkedoutbooks",
//         element: <CheckedoutBooks/>,
//       },
//     ],
//   },
//   {
//     path: "/checkout",
//     element: <App />,
//     children: [
//       {
//         path: "/checkout",
//         element: <CheckoutBook />,
//       },
//     ],
//   },
//   {
//     path: "/checkin",
//     element: <App />,
//     children: [
//       {
//         path: "/checkin",
//         element: <CheckinBook />,
//       },
//     ],
//   }
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App></App>
  </StrictMode>
)
