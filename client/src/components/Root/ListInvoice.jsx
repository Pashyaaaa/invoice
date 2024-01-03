import React from 'react'

export default function ListInvoice() {
  return (
    <section className='bg-slate-300 p-4 rounded-xl'>
      <h2 className='font-bold text-2xl mb-6'>Invoice Pelanggan</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3 w-96">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                No HP
              </th>
              <th scope="col" className="px-6 py-3">
                Checkin
              </th>
              <th scope="col" className="px-6 py-3">
                Checkout
              </th>
              <th scope="col" className="px-6 py-3">
                Total Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Kurang Bayar
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                1
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                17 Januari 2024
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Evan Rafa Radya Alifian
              </th>
              <td className="px-6 py-4">
                087852386596
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                20 Januari 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                21 Januari 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                Rp 1.000.000
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                Rp 1.000.000
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Bayar</a>
                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Batal</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
