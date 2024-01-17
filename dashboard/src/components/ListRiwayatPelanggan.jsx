import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, Outlet } from "react-router-dom"
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
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white flex justify-between">
          <span className="ms-4 font-semibold text-xl">Riwayat pembayaran / {pelanggan.name}</span>
          <button
            type="button"
            className="flex items-center group"
            onClick={() => navigate('/dashboard/daftar-pelanggan')}
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
            <span>Kembali ke daftar pelanggan</span>
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
      <Outlet />
    </>
  )
}

function ListPembayaran({ pelanggan }) {
  const downloadPDF = (id) => {
    // Ganti URL dengan URL tempat menyimpan file PDF yang sudah ada
    const pdfUrl = `${import.meta.env.VITE_API_URL}/cetakPembayaran/${id}`

    // Buat elemen <a> dengan atribut download untuk mengunduh file PDF
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'existing.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
          {item.keterangan && item.keterangan}
        </td>
        <td className="flex items-center px-6 py-4 whitespace-nowrap">
          <button type="button" onClick={() => downloadPDF(item.id)} className="font-medium text-green-600">
            <svg className="w-4 h-4 text-green-600 hover:underline ms-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
              <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
            </svg>
          </button>
          <Link to={`/dashboard/riwayat-pembayaran/${pelanggan.id}/${item.id}`} className="ms-4 font-medium text-red-600 hover:underline">
            <svg className="w-4 h-4 text-red-600 hover:underline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
            </svg>
          </Link>
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