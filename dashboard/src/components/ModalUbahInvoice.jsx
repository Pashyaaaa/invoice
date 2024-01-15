import axios from "axios"
import getPelanggan from "../libs/getPelanggan"
import { useEffect, useState } from "react"
import {
  useNavigate,
  useLoaderData
} from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { set, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export async function loader({ params }) {
  const pelanggan = await getPelanggan(params.id)
  return { pelanggan }
}

export default function ModalUbahInvoice() {
  const navigate = useNavigate()
  const { pelanggan } = useLoaderData()

  const [nama, setNama] = useState(pelanggan.name)
  const [alamat, setAlamat] = useState(pelanggan.address)
  const [noHP, setNoHP] = useState(pelanggan.number)
  const [durasi, setDurasi] = useState(0)
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
  const [totalPembayaran, setTotalPembayaran] = useState(pelanggan.total)

  const handleDateChange = (date) => {
    setTanggalCheckin(date);
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/invoices/${pelanggan.id}`, {
        name: nama,
        number: noHP,
        address: alamat,
        day: durasi.toString(),
        check_in: tanggalCheckin,
        check_out: tanggalCheckout,
        total: totalPembayaran
      },{
        headers: {
          "Content-type": "application/json",
        },
      })
      navigate('/dashboard/daftar-pelanggan')
    } catch (error) {
      console.log(error.response.data.message)
    }

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
    <div
      className="bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
      onClick={() => navigate(-1)}
    >
      <div
        className="absolute p-4 w-full max-w-md max-h-full"
        onClick={e => handleStopPropagation(e)}
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ubah Invoice
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => navigate(-1)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
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
            <div>
              <div className="mb-5">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama :
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={nama}
                  onChange={e => setNama(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="noHP"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  No Telepon :
                </label>
                <input
                  type="tel"
                  name="noHP"
                  id="noHP"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={noHP}
                  onChange={e => setNoHP(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alamat :
                </label>
                <input
                  type="text"
                  name="alamat"
                  id="alamat"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                  Total :
                </label>
                <input
                  type="number"
                  name="total"
                  id="total"
                  className="bg-gray-100 border border-gray-400 font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={totalPembayaran}
                  onChange={e => setTotalPembayaran(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg className="me-2 -ms-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
              </svg>
              Ubah
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
