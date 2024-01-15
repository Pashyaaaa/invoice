import axios from "axios"
import getPelanggan from "../libs/getPelanggan"
import { useState } from "react"
import {
  useNavigate,
  useLoaderData
} from "react-router-dom"

export async function loader({ params }) {
  const pelanggan = await getPelanggan(params.id)
  return { pelanggan }
}

export default function ModalUbahInvoice() {
  const navigate = useNavigate()
  const { pelanggan } = useLoaderData()

  const [nama, setNama] = useState(pelanggan.name)
  const [alamat, setAlamat] = useState(pelanggan.address)
  const [noHP, setNoHP] = useState(pelanggan.number)
  const [tanggalCheckin, setTanggalCheckin] = useState('')
  const [tanggalCheckout, setTanggalCheckout] = useState('')
  const [totalPembayaran, setTotalPembayaran] = useState(pelanggan.total)

  const handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setNama('')
    setNoHP('')
    setAlamat('')
    setTanggalCheckin('')
    setTanggalCheckout('')
    setTotalPembayaran(0)
  }

  return (
    <div
      className="bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
      onClick={() => navigate(-1)}
    >
      <div
        className="absolute p-4 w-full max-w-md max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ubah Invoice
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => navigate(-1)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form
            className="p-4 md:p-5"
            onSubmit={ handleSubmit }
          >
            <div>
              <div className="mb-5">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama :
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={nama}
                  onChange={e => setNama(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="noHP"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  No Telepon :
                </label>
                <input
                  type="tel"
                  name="noHP"
                  id="noHP"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={noHP}
                  onChange={e => setNoHP(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alamat :
                </label>
                <input
                  type="text"
                  name="alamat"
                  id="alamat"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={alamat}
                  onChange={e => setAlamat(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <span className="block mb-2 font-medium text-sm text-gray-900">Tanggal Checkin & Checkout :</span>
                <div className="flex items-center">
                  <input
                    type='datetime-local'
                    className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={tanggalCheckin}
                    onChange={e => setTanggalCheckin(e.target.value)}
                  />
                  <span className="mx-4 text-gray-500">ke</span>
                  <input
                    type='datetime-local'
                    className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={tanggalCheckout}
                    onChange={e => setTanggalCheckout(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="total"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Total :
                </label>
                <input
                  type="number"
                  name="total"
                  id="total"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={totalPembayaran}
                  onChange={e => setTotalPembayaran(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg className="me-2 -ms-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
              </svg>
              Ubah
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
