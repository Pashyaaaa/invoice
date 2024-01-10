import DefaultLayout from '../DefaultLayout'
import ListPelanggan from '../components/ListPelanggan'

export default function DaftarPelangganPage() {
  return (
    <DefaultLayout page={'daftar-pelanggan'}>
      <ListPelanggan />
    </DefaultLayout>
  )
}
