import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt, FaHome, FaThList } from "react-icons/fa"

export default function DefaultLayout({ children }) {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <header>
        <nav className='max-w-7xl mx-auto bg-blue-600 text-white p-4 rounded-xl flex items-center justify-between'>
          <Link to={'/'} className='font-semibold text-xl'>Fiesto Invoice</Link>
          <span className='flex items-center gap-x-2'>
            <FaSignOutAlt /> Sing out
          </span>
        </nav>
      </header>
      <div className='max-w-7xl mx-auto flex gap-x-4 w-full'>
        <aside className='w-[20%] h-max bg-blue-600 text-white p-4 rounded-xl'>
          <h1 className='font-bold text-xl mb-6'>Navigation</h1>
          <ul>
            <li>
              <Link
                to={'/'}
                className='flex items-center gap-x-4 p-4 font-medium rounded-lg transition-colors hover:bg-slate-200 hover:text-slate-900'
              >
                <FaHome className='text-xl' /> Home
              </Link>
            </li>
            <li>
              <Link
                to={'/list-invoices'}
                className='flex items-center gap-x-4 p-4 font-medium rounded-lg transition-colors hover:bg-slate-200 hover:text-slate-900'
              >
                <FaThList className='text-xl' /> List Invoice
              </Link>
            </li>
          </ul>
        </aside>
        <main className='w-[80%]'>
          {children}
        </main>
      </div>
    </div>
  )
}
