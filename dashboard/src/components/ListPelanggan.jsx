export default function ListPelanggan({ onClick }) {  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-left rtl:text-right text-gray-500 lg:text-base">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 lg:text-base">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Nama Pelanggan
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Alamat
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              No Handphone
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Checkin
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Checkout
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Total
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Sisa Bayar
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white even:bg-gray-50 border-b">
            <th scope="row" className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
              Evan Rafa Radya Alifian
            </th>
            <td className="px-6 py-4 whitespace-nowrap">
              jl. Nangka 6 No. 21 Perumanas, Kamal
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              087852386596
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              08-01-24
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              10-01-24
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Rp 1.000.000
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              Rp 1.000.000
            </td>
            <td className="flex items-center px-6 py-4 whitespace-nowrap">
              <button type="button" className="font-medium text-blue-600 hover:underline" onClick={onClick}>Bayar</button>
              <a href="#" className="font-medium text-green-600 hover:underline ms-3">Edit</a>
              <a href="#" className="font-medium text-red-600 hover:underline ms-3">Batal</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
