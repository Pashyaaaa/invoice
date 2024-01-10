import FormPemesanan from "./components/FormPemesanan"
import DefaultLayout from "./DefaultLayout"

export default function RootPage() {
  return (
    <DefaultLayout page={'tambah-pelanggan'}>
      <FormPemesanan />
    </DefaultLayout>
  )
}