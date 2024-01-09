import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function ModalBayar({ isOpen, onClick }) {
  const [nama, setNama] = useState('Evan Rafa Radya Alifian')
  const [noHP, setNoHP] = useState('087852386596')
  const [alamat, setAlamat] = useState('jl. Nangka 6 No. 21 Perumanas, Kamal')
  const [tanggalBooking, setTanggalBooking] = useState()
  const [tanggalCheckout, setTanggalCheckout] = useState()
  const [totalPembayaran, setTotalPembayaran] = useState(1000000)
  const [bayarInvoice, setBayarInvoice] = useState(0)

  const handleInputClick = (e) => {
    e.stopPropagation()
  }

  const handleInputFocus = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Reset form fields
    setNama('')
    setNoHP('')
    setAlamat('')
    setTanggalBooking('')
    setTanggalCheckout('')
    setTotalPembayaran(0)
    setBayarInvoice(0)

    const sisaBayar = totalPembayaran - bayarInvoice

    console.log({
      nama,
      noHP,
      alamat,
      tanggalBooking,
      tanggalCheckout,
      totalPembayaran: `Rp ${totalPembayaran.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      pembayaranInvoice: `Rp ${bayarInvoice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      sisaPembayaran: `Rp ${sisaBayar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    })
  }

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen`}
      onClick={onClick}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Pembayaran Invoice
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClick}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form
            className="p-4 md:p-5"
            onSubmit={ handleSubmit }
          >
            <div className='divide-y divide-slate-700'>
              <div>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nama Pelanggan"
                    required
                    onClick={handleInputClick}
                    onFocus={handleInputFocus}
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="noHP"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="noHP"
                    id="noHP"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nomor Telepon Pelanggan"
                    required
                    onClick={handleInputClick}
                    onFocus={handleInputFocus}
                    value={noHP}
                    onChange={e => setNoHP(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="alamat"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Alamat
                  </label>
                  <input
                    type="text"
                    name="alamat"
                    id="alamat"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Alamat Pelanggan"
                    required
                    onClick={handleInputClick}
                    onFocus={handleInputFocus}
                    value={alamat}
                    onChange={e => setAlamat(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="alamat"
                    className="block mb-2 font-medium text-sm text-gray-900">
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
                        value={tanggalBooking}
                        selected={tanggalBooking}
                        onChange={date => setTanggalBooking(date)}
                        startDate={tanggalBooking}
                        className='bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date end'
                        placeholderText="Booking"
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
                        startDate={tanggalBooking}
                        minDate={tanggalBooking}
                        className='bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 '
                        placeholderText="Checkout"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className='flex items-center justify-between mb-2 text-sm font-medium text-gray-900'>
                    <span>Total pembayaran</span>
                    <span>Rp {totalPembayaran.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  </div>
                </div>
              </div>
              <div className="mb-5 pt-5">
                <label
                  htmlFor="bayarInvoice"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Bayar Invoice
                </label>
                <input
                  type="number"
                  name="bayarInvoice"
                  id="bayarInvoice"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Nomor Telepon Pelanggan"
                  required
                  onClick={handleInputClick}
                  onFocus={handleInputFocus}
                  value={bayarInvoice}
                  onChange={e => setBayarInvoice(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div> 
  )
}
