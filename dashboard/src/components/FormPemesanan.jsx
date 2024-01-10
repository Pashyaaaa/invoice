import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function FormPemesanan() {
  const [date, setDate] = useState(new Date())
  const [nama, setNama] = useState('')
  const [noHP, setNoHP] = useState('')
  const [alamat, setAlamat] = useState('')
  const [tanggalCheckin, setTanggalCheckin] = useState()
  const [tanggalCheckout, setTanggalCheckout] = useState()
  const [totalPembayaran, setTotalPembayaran] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Reset form fields
    setNama('')
    setNoHP('')
    setAlamat('')
    setTanggalCheckin('')
    setTanggalCheckout('')
    setTotalPembayaran(0)

    console.log({
      nama,
      noHP,
      alamat,
      tanggalCheckin,
      tanggalCheckout,
      totalPembayaran: `Rp ${totalPembayaran.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    })
  }

  return (
    <section className='p-4'>
      <form
        onSubmit={handleSubmit}
        className='max-w-2xl'
      >
        <div className="mb-5">
          <label
            htmlFor="nama"
            className="block mb-2 font-medium text-gray-900">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nama Pelanggan"
            required
            value={nama}
            onChange={e => setNama(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="noHP"
            className="block mb-2 font-medium text-gray-900">
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="noHP"
            name="noHP"
            className="bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nomor Telepon Pelanggan"
            required
            value={noHP}
            onChange={e => setNoHP(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alamat"
            className="block mb-2 font-medium text-gray-900">
            Alamat
          </label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            className="bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Alamat Pelanggan"
            required
            value={alamat}
            onChange={e => setAlamat(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alamat"
            className="block mb-2 font-medium text-gray-900">
            Tanggal Booking & Checkout
          </label>
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg 
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
              <DatePicker
                showTimeSelect
                minTime={new Date(0, 0, 0, 12, 30)}
                maxTime={new Date(0, 0, 0, 19, 0)}
                dateFormat="MMMM d, yyyy h:mmaa"
                selectsStart
                value={tanggalCheckin}
                selected={tanggalCheckin}
                onChange={date => setTanggalCheckin(date)}
                startDate={tanggalCheckin}
                className='bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date end'
                placeholderText="Checkin"
                required
              />
            </div>
            <span className="mx-4 text-gray-500">ke</span>
            <div className="relative">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
              <DatePicker
                showTimeSelect
                minTime={new Date(0, 0, 0, 12, 30)}
                maxTime={new Date(0, 0, 0, 19, 0)}
                dateFormat="MMMM d, yyyy h:mmaa"
                selectsEnd
                value={tanggalCheckout}
                selected={tanggalCheckout}
                onChange={date => setTanggalCheckout(date)}
                endDate={tanggalCheckout}
                startDate={tanggalCheckin}
                minDate={tanggalCheckin}
                className='bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 '
                placeholderText="Checkout"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="total"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Total Harga
          </label>
          <input
            type="number"
            id="total"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5"
            required
            value={totalPembayaran}
            onChange={e => setTotalPembayaran(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center ">
          Submit
        </button>
      </form>
    </section>
  )
}
