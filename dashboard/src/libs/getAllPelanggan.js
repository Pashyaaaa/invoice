import axios from "axios"

export default async function getAllPelanggan() {
  const pelanggan = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`)
  return pelanggan.data
}
