import {
  Link,
  Outlet,
  useLoaderData
} from "react-router-dom"
import getAllPelanggan from "../libs/getAllpelanggan"

export function loader() {
  const pelanggan = getAllPelanggan()
  return { pelanggan }
}

export default function ListPelanggan() {
  const { pelanggan } = useLoaderData()

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-600 lg:text-base">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 lg:text-base">
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
              <tr key={item.nama} className="odd:bg-white even:bg-gray-50 border-b">
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
                  {item.tanggalPemesanan}
                </th>
                <td
                  scope="row"
                  className="px-6 py-4 whitespace-nowrap font-medium"
                >
                  {item.nama}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {item.alamat}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {item.noHP}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {item.tanggalCheckin}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {item.tanggalCheckout}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {`Rp ${item.totalPembayaran.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {`Rp ${item.sisaBayarInvoice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
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
