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

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-700">
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
            {pelanggan.map((item, i) => (
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
                  <Link
                    to={`/dashboard/riwayat-pembayaran/${item.id}`}
                    className="transition-colors hover:text-blue-600"
                  >
                    {`Rp ${item.sisa_bayar.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                  </Link>
                </td>
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/dashboard/daftar-pelanggan/bayar-invoice/${item.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Bayar
                  </Link>
                  <Link
                    to={''}
                    className="font-medium text-green-600 hover:underline ms-3"
                  >
                    Ubah
                  </Link>
                  <Link
                    to={''}
                    className="font-medium text-red-600 hover:underline ms-3"
                  >
                    Batal
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </>
  )
}
