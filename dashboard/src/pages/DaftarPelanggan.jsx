import { useState } from 'react'
import DefaultLayout from '../DefaultLayout'
import ListPelanggan from '../components/ListPelanggan'
import ModalBayar from '../components/ModalBayar'

export default function DaftarPelanggan() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <DefaultLayout page={'dafatr-pelanggan'}>
      <ListPelanggan onClick={handleOpenModal} />
      <ModalBayar isOpen={isModalOpen} onClick={handleOpenModal} />
    </DefaultLayout>
  )
}
