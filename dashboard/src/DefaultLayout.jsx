import useRefreshToken from "./custom hook/useRefreshToken"
import axios from "axios"
import { MdPersonAddAlt1 } from "react-icons/md"
import { PiUserListFill } from "react-icons/pi"
import { FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"
import {
  useNavigate,
  Link
} from "react-router-dom"

export default function DefaultLayout({ children, page }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const { name } = useRefreshToken()
  const navigate = useNavigate()

  const handleOpenSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout')
      navigate('/login')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-300">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-600 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={handleOpenSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/3000/svg"
                >
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link
                to={'/'}
                className="flex ms-2 md:me-24"
              >
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Fiesto Invoice</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center font-medium text-sm sm:text-base text-slate-600 transition-colors hover:text-black"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    <span className="ms-2">Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <aside className={`${isSidebarOpen ? '' : '-translate-x-full'} fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-300 sm:translate-x-0`}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={'/'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <MdPersonAddAlt1 className="text-2xl text-gray-600 transition duration-75 group-hover:text-gray-900" />
                <span className="ms-3 text-gray-600 transition duration-75 group-hover:text-gray-900">Tambah Pelanggan</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/dashboard/daftar-pelanggan'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <PiUserListFill className="text-2xl text-gray-600 transition duration-75 group-hover:text-gray-900" />
                <span className="ms-3 text-gray-600 transition duration-75 group-hover:text-gray-900">Daftar Pelanggan</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="p-4 sm:ml-64">
        <header className="p-4 mb-6 border-2 border-gray-300 border-dashed rounded-lg mt-14">
          <h1 className="font-semibold text-2xl mb-2 lg:text-3xl">Dashboard</h1>
          <p className="font-medium lg:text-lg">{`${page === 'tambah-pelanggan' ? `Selamat datang ${name}, siapa pelanggan yang ingin ditambah?`: 'Daftar pelanggan invoice.'}`}</p>
        </header>
        {children}
      </main>
    </>
  )
}