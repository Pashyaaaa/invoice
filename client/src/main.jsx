import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/RootPage.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import LoginPage from './routes/LoginPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import ListInvoicesPage from './routes/ListInvoicesPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/list-invoices",
    element: <ListInvoicesPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
