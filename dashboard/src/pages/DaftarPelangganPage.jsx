import { useState } from 'react'
import DefaultLayout from '../DefaultLayout'
import ListPelanggan from '../components/ListPelanggan'
import ModalBayar from '../components/ModalBayar'
import { daftarPelanggan } from '../../public/daftarPelanggan'

export default function DaftarPelangganPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (e) => {
    e.preventDefault()
    setIsModalOpen(!isModalOpen)
  }

  return (
    <DefaultLayout page={'dafatr-pelanggan'}>
      <ListPelanggan onClick={handleOpenModal} daftarPelanggan={daftarPelanggan} />
      <ModalBayar isOpen={isModalOpen} onClick={handleOpenModal} />
    </DefaultLayout>
  )
}
