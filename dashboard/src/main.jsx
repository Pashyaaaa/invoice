import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import axios from "axios"
import DaftarPelangganPage from "./pages/DaftarPelangganPage.jsx"
import RiwayatPembayaranPage from "./pages/RiwayatPembayaranPage.jsx"
import ModalBayar, { loader as modalLoader } from "./components/ModalBayar.jsx"
import { loader as rootLoader } from "./components/ListPelanggan.jsx"
import ModalUbahInvoice, { loader as modalUbahLoader } from "./components/ModalUbahInvoice.jsx"
import PopUpAlert, { loader as popUpAlertLoader } from "./components/PopUpAlert.jsx"

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
      },
      {
        path: "/dashboard/daftar-pelanggan/ubah-invoice/:id",
        element: <ModalUbahInvoice />,
        loader: modalUbahLoader
      },
      {
        path: "/dashboard/daftar-pelanggan/hapus-invoice/:id",
        element: <PopUpAlert />,
        loader: popUpAlertLoader
      },
    ]
  },
  {
    path: "/dashboard/riwayat-pembayaran/:id",
    element: <RiwayatPembayaranPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
