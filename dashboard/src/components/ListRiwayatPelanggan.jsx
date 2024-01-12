import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import axios from "axios"
import { getFormatDate } from "../../public/getFormatDate"

export default function ListRiwayatPelanggan() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pelanggan, setPelanggan] = useState({})

  useEffect(() => {
    getPelanggan()
  }, [])

  const getPelanggan = async () => {
    const response = await axios.get(`http://localhost:5000/invoices/${id}`)
    setPelanggan(response.data)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="pb-4 bg-white flex justify-between">
        <span className="ms-4 font-semibold text-xl">Riwayat pembayaran / {pelanggan.name}</span>
        <button
          type="button"
          className="flex items-center group"
          onClick={() => navigate(-1)}
        >
          <svg
            className="w-4 h-4 text-gray-800 me-1 transition-all group-hover:me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          <span>Kembali</span>
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap"
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap"
            >
              Tanggal pesan
            </th>
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap"
            >
              Tanggal Bayar
            </th>
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap"
            >
              Nominal
            </th>
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap"
            >
              Keterangan
            </th>
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-bhover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap">
              1
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {pelanggan.createdAt}
            </th>
            <td className="px-6 py-4 whitespace-nowrap">
              {`2024-01-11 (07:47)`}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Rp {pelanggan.total}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              DP
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Batal</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
