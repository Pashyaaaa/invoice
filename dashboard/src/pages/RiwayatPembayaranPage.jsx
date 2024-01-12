import DefaultLayout from "../DefaultLayout"
import ListRiwayatPelanggan from "../components/ListRiwayatPelanggan"

export default function RiwayatPembayaranPage() {
  return (
    <DefaultLayout page={'riwayat-pembayaran'}>
      <ListRiwayatPelanggan />
    </DefaultLayout>
  )
}
