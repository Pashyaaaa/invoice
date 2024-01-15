import getPelanggan from "../libs/getPelanggan"
import axios from "axios"
import { useState } from "react"
import { getFormatDate } from "/public/getFormatDate.js"
import {
  useLoaderData,
  useNavigate
} from "react-router-dom"

export async function loader({ params }) {
  const pelanggan = await getPelanggan(params.id)
  return { pelanggan }
}

export default function ModalBayar() {
  const navigate = useNavigate()
  const { pelanggan } = useLoaderData()

  const [bayarInvoice, setBayarInvoice] = useState(0)
  const [keteranganPembayaran, setKeteranganPembayaran] = useState('')
  const [tanggalBayarInvoice, setTanggalBayarInvoice] = useState('')

  const handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/pembayaran`, {
        bayar: parseInt(bayarInvoice, 10),
        keterangan: keteranganPembayaran,
        tanggal_bayar: tanggalBayarInvoice,
        invoice_id: pelanggan.id,
      }, {
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.log('Error:', error.message);
      console.log('Response data:', error.response?.data);
    }

    setBayarInvoice(0)
    setKeteranganPembayaran('')
    setTanggalBayarInvoice('')
    navigate('/dashboard/daftar-pelanggan')
  }

  return (
    <div
      className="bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
      onClick={() => navigate(-1)}
    >
      <div
        className="absolute p-4 w-full max-w-md max-h-full"
        onClick={e => handleStopPropagation(e)}
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Pembayaran Invoice
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => navigate(-1)}
            >
              <svg
                className="w-3 h-3"
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
            <div className='divide-y divide-slate-700'>
              <div>
                <div className="mb-5">
                  <span className="block mb-2 text-sm font-medium text-gray-900">Nama :</span>
                  <span className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5">{pelanggan.name}</span>
                </div>
                <div className="mb-5">
                  <span className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon :</span>
                  <span className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5">{pelanggan.number}</span>
                </div>
                <div className="mb-5">
                  <span className="block mb-2 text-sm font-medium text-gray-900">Alamat :</span>
                  <span className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5">{pelanggan.address}</span>
                </div>
                <div className="mb-5">
                  <span className="block mb-2 font-medium text-sm text-gray-900">Tanggal Checkin & Checkout :</span>
                  <div className="flex items-center">
                    <span className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5">{getFormatDate(pelanggan.check_in)}</span>
                    <span className="mx-4 text-gray-500">ke</span>
                    <span className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5">{getFormatDate(pelanggan.check_out)}</span>
                  </div>
                </div>
                <div className="mb-5">
                  <div className='flex items-center justify-between mb-2 text-sm font-medium text-gray-900'>
                    <span>Total pembayaran :</span>
                    <span>Rp {pelanggan.total.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <div className="mb-5">
                  <label
                    htmlFor="tanggalBayar"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Set Tanggal Bayar
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                      </svg>
                    </div>
                    <input
                      id="tanggalBayar"
                      datepicker="true"
                      type="datetime-local"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Pilih tanggal bayar"
                      value={tanggalBayarInvoice}
                      onChange={e => setTanggalBayarInvoice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="bayarInvoice"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nominal
                  </label>
                  <input
                    type="number"
                    name="bayarInvoice"
                    id="bayarInvoice"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nominal"
                    required
                    onClick={handleStopPropagation}
                    onFocus={handleStopPropagation}
                    value={bayarInvoice}
                    onChange={e => setBayarInvoice(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="keteranganInvoice"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Keterangan
                  </label>
                  <input
                    type="text"
                    name="keteranganInvoice"
                    id="keteranganInvoice"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Keterangan pembayaran"
                    required
                    onClick={handleStopPropagation}
                    onFocus={handleStopPropagation}
                    value={keteranganPembayaran}
                    onChange={e => setKeteranganPembayaran(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div> 
  )
}
