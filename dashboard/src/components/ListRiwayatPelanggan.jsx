import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import axios from "axios"
import { getFormatDate } from "/public/getFormatDate.js"

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
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 sm:text-base">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sm:text-sm">
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
          <ListPembayaran pelanggan={pelanggan} />
        </tbody>
      </table>
    </div>
  )
}

function ListPembayaran({ pelanggan }) {
  const component = pelanggan.pembayaran && pelanggan.pembayaran.length > 0 ? (pelanggan.pembayaran.map(item => (
      <tr key={item.id} className="bg-white border-bhover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap">
          1
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {pelanggan.createdAt && getFormatDate(pelanggan.createdAt)}
        </th>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.tanggal_bayar && getFormatDate(item.tanggal_bayar)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          Rp {item.bayar && item.bayar.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          DP
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Batal</a>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="6"
        className="px-6 py-4 font-semibold text-lg text-center"
      >
        Belum ada pembayaran
      </td>
    </tr>
  )

  return component
}