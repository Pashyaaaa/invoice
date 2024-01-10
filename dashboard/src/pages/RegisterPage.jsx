import { useState } from 'react'
import axios from 'axios'
import {
  Link,
  useNavigate
} from 'react-router-dom'

export default function RegisterPage() {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    const userRegisterData = {
      name: nama,
      email,
      password,
      confPassword
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, userRegisterData)
      navigate('/login')
    } catch(error) {
      if(error.response) {
        console.log(error.message)
        setErrorMessage(error.response.data.message)
      }
    }
  }

  return (
    <section className="max-w-md mx-auto h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={ handleRegister }
        >
          <h5 className="text-xl font-medium text-gray-900">Register akun</h5>
          <div>
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
              value={nama}
              onChange={e => setNama(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="confPassword"
              id="confPassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={confPassword}
              onChange={e => setConfPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div
              className="text-sm text-red-800"
              role="alert"
            >
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Buat akun
          </button>
          <div className="text-sm font-medium text-gray-500">
            Belum punya akun? <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
