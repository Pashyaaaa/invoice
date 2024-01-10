import { daftarPelanggan } from "../../public/daftarPelanggan";

export default function getPelanggan(id) {
  const pelanggan = daftarPelanggan.filter(pelanggan => pelanggan.id == id)
  return pelanggan
}