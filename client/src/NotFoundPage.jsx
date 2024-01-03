import { Link, useRouteError } from 'react-router-dom'

export default function NotFoundPage() {
  const error = useRouteError()

  return (
    <header className='max-w-sm mx-auto h-screen flex flex-col justify-center gap-y-6 text-center'>
      <h1 className='font-bold text-2xl'>Oops!</h1>
      <p>Maaf, halaman yang anda cari tidak ditemukan. <Link to={'/'} className='text-blue-800'>Kembali ke halaman dashboard</Link></p>
      <p>
        <i>404 | {error.statusText || error.message}</i>
      </p>
    </header>
  )
}
