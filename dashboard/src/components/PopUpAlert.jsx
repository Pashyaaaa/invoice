import getPelanggan from "../libs/getPelanggan"
import axios from "axios"
import {
  useNavigate,
  useLoaderData
} from "react-router-dom"

export async function loader({ params }) {
  const pelanggan = await getPelanggan(params.id)
  return { pelanggan }
}

export default function PopUpAlert() {
  const { pelanggan } = useLoaderData()
  const navigate = useNavigate()

  const handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleDeleteInvoice = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/invoices/${pelanggan.id}`)
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
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
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">Apakan Anda yakin ingin menghapus pelanggan ini?</h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              onClick={() => handleDeleteInvoice()}
            >
              Ya, saya yakin
            </button>
            <button
              type="button"
              className="text-gray-600 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-950 focus:z-10"
              onClick={() => navigate(-1)}
            >
              Tidak, kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
