import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import axios from 'axios'
import DaftarPelangganPage from './pages/DaftarPelangganPage.jsx'
import ModalBayar, { loader as modalLoader } from './components/ModalBayar.jsx'
import { loader as rootLoader } from './components/ListPelanggan.jsx'

axios.defaults.withCredentials = true

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/dashboard/daftar-pelanggan",
    element: <DaftarPelangganPage />,
    loader: rootLoader,
    children: [
      {
        path: "/dashboard/daftar-pelanggan/bayar-invoice/:id",
        element: <ModalBayar />,
        loader: modalLoader
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
