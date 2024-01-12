import axios from "axios"

export default async function getPelanggan(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoices/${id}`)
  return response.data
}