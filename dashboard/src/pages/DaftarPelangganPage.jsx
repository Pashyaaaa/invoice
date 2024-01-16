import DefaultLayout from '../DefaultLayout'
import ListPelanggan from '../components/ListPelanggan'
import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

export default function DaftarPelangganPage() {
  const downloadPDF = () => {
    // Ganti URL dengan URL tempat menyimpan file PDF yang sudah ada
    const pdfUrl = 'http://localhost:5000/cetakPembayaran/13';

    // Buat elemen <a> dengan atribut download untuk mengunduh file PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'existing.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DefaultLayout page={'daftar-pelanggan'}>
      <ListPelanggan />
      <button type="button" onClick={downloadPDF}>ini tombol</button>
    </DefaultLayout>
  )
}
