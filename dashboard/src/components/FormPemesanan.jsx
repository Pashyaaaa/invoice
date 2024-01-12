import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { set, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import axios from "axios"

export default function FormPemesanan() {
  const [nama, setNama] = useState('')
  const [noHP, setNoHP] = useState('')
  const [alamat, setAlamat] = useState('')
  const [tanggalCheckin, setTanggalCheckin] = useState(() => {
    // Set tanggal default dengan zona waktu Asia/Jakarta dan jam 13:00:00
    const defaultDate = set(new Date(), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 });
    return utcToZonedTime(defaultDate, 'Asia/Jakarta');
  })
  const [tanggalCheckout, setTanggalCheckout] = useState(() => {
    // Set tanggal default dengan zona waktu Asia/Jakarta dan jam 13:00:00
    const defaultDate = set(new Date(), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 });
    return utcToZonedTime(defaultDate, 'Asia/Jakarta');
  })
  const [totalPembayaran, setTotalPembayaran] = useState(0)
  const [durasi, setDurasi] = useState(0) // Variable untuk menyimpan durasi pemesanan
  const [isAlert, setIsAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState()
  const [textAlert, setTextAlert] = useState('')

  const handleDateChange = (date) => {
    setTanggalCheckin(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('name', nama)
    formData.append('number', noHP)
    formData.append('address', alamat)
    formData.append('day', durasi.toString()) // Mengirim durasi pemesanan
    formData.append('check_in', tanggalCheckin)
    formData.append('check_out', tanggalCheckout)
    formData.append('total', totalPembayaran)
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/invoices`, formData, {
        headers: {
          "Content-type": "application/json"
        }
      })
      setIsAlert(true)
      setErrorAlert(false)
      setTextAlert('Sukses! Pelanggan berhasil ditambahkan.')
      console.log(tanggalCheckin)
    } catch (error) {
      setIsAlert(true)
      setErrorAlert(true)
      setTextAlert('Gagal! Pelanggan gagal ditambahkan.')
    }
    
    // Reset form fields
    setNama('')
    setNoHP('')
    setAlamat('')
    setTanggalCheckin(() => {
      // Set tanggal default dengan zona waktu Asia/Jakarta dan jam 13:00:00
      const defaultDate = set(new Date(), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 });
      return utcToZonedTime(defaultDate, 'Asia/Jakarta');
    })
    setTanggalCheckout(() => {
      // Set tanggal default dengan zona waktu Asia/Jakarta dan jam 13:00:00
      const defaultDate = set(new Date(), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 });
      return utcToZonedTime(defaultDate, 'Asia/Jakarta');
    })
    setTotalPembayaran(0)
    setDurasi(0)
  }
  
  useEffect(() => {
    // Menghitung durasi saat terjadi perubahan pada tanggalCheckin atau tanggalCheckout
    if (tanggalCheckin && tanggalCheckout) {
      const diffInTime = tanggalCheckout.getTime() - tanggalCheckin.getTime()
      const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24))
      setDurasi(diffInDays)
    }
  }, [tanggalCheckin, tanggalCheckout])

  return (
    <section className='p-4'>
      <form
        onSubmit={handleSubmit}
        className='max-w-2xl'
      >
        {isAlert && (
          <div className={`flex items-center p-4 mb-4 ${errorAlert ? 'text-red-800 border-t-4 border-red-300 bg-red-50  ' : 'text-green-800 border-t-4 border-green-300 bg-green-50'}`}>
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div className="ms-3 text-sm font-medium md:text-base">
              {textAlert}
            </div>
            <button
              type="button"
              className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2  p-1.5 inline-flex items-center justify-center h-8 w-8 ${errorAlert ? 'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200' : 'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200'}`}
              onClick={() => setIsAlert(!isAlert)}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}
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
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
              <DatePicker
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                timeCaption="Time"
                timeZone="Asia/Jakarta"
                selectsStart
                value={tanggalCheckin}
                selected={tanggalCheckin}
                onChange={handleDateChange}
                startDate={tanggalCheckin}
                className='bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5'
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
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                timeCaption="Time"
                timeZone="Asia/Jakarta"
                selectsEnd
                value={tanggalCheckout}
                selected={tanggalCheckout}
                onChange={date => setTanggalCheckout(date)}
                endDate={tanggalCheckout}
                startDate={tanggalCheckin}
                minDate={tanggalCheckin}
                className='bg-gray-50 border border-gray-400 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5'
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
