import {
  Link,
  Outlet,
  useLoaderData
} from "react-router-dom"
import getAllPelanggan from "../libs/getAllpelanggan"
import { getFormatDate } from "/public/getFormatDate.js"

export async function loader() {
  const pelanggan = await getAllPelanggan()
  return { pelanggan }
}

export default function ListPelanggan() {
  const { pelanggan } = useLoaderData()

  const sortedPelanggan = pelanggan.toReversed()

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-700 sm:text-base">
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
                Tanggal pemesanan
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                Nama Pelanggan
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                Alamat
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                No Handphone
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                Checkin
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                Checkout
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                Sisa Bayar
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
            <ListComponent sortedPelanggan={sortedPelanggan} />
          </tbody>
        </table>
      </div>
      <Outlet />
    </>
  )
}

function ListComponent({ sortedPelanggan }) {
  const component = sortedPelanggan && sortedPelanggan.length > 0 ? sortedPelanggan.map((item, i) => (
    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
      <th
        scope="row"
        className="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
      >
        {i+1}
      </th>
      <th
        scope="row"
        className="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
      >
        {getFormatDate(item.createdAt)}
      </th>
      <td
        scope="row"
        className="px-6 py-4 whitespace-nowrap font-medium"
      >
        {item.name}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
      >
        {item.address}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
      >
        {item.number}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
      >
        {getFormatDate(item.check_in)}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
      >
        {getFormatDate(item.check_out)}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
      >
        {`Rp ${item.total.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
      >
        {item.sisa_bayar === "0" ? 'Lunas' : `Rp ${item.sisa_bayar.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
      </td>
      <td className="flex items-center px-6 py-4 whitespace-nowrap">
        <Link
          to={`/dashboard/riwayat-pembayaran/${item.id}`}
          className="font-medium text-blue-600 hover:underline"
        >
          <svg className="w-4 h-4 text-blue-600 hover:underline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
            </g>
          </svg>
        </Link>
        <Link
          to={`/dashboard/daftar-pelanggan/bayar-invoice/${item.id}`}
          className="font-medium ms-4"
        >
          <svg className="w-4 h-4 text-blue-600 hover:underline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
          </svg>
        </Link>
        <Link
          to={`/dashboard/daftar-pelanggan/ubah-invoice/${item.id}`}
          className="font-medium ms-4"
        >
          <svg className="w-4 h-4 text-green-600 hover:underline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
          </svg>
        </Link>
        <Link
          to={`/dashboard/daftar-pelanggan/hapus-invoice/${item.id}`}
          className="font-medium ms-4"
        >
          <svg className="w-4 h-4 text-red-600 hover:underline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>
        </Link>
      </td>
    </tr>
  )) : (
    <tr>
      <td
        colSpan="10"
        className="px-6 py-4 font-semibold text-lg text-center"
      >
        Belum ada invoice yang terdaftar
      </td>
    </tr>
  )

  return component
}