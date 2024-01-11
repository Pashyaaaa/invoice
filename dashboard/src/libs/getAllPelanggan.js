import axios from "axios"

export default async function getAllPelanggan() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`)
  return response.data
}
