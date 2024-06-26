import { useState } from 'react'
import axios from 'axios'
import {
  Link,
  useNavigate
} from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email: email,
        password: password
      })
      navigate('/')
    } catch(error) {
      if(error.response) {
        setErrorMessage(error.response.data.message)
      }
    }
  }

  return (
    <section className="max-w-md mx-auto h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={ handleLogin }
        >
          <h5 className="text-xl font-medium text-gray-900">Login akun</h5>
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
            Login ke akun Anda
          </button>
          <div className="text-sm font-medium text-gray-500">
            Belum punya akun? <Link to="/register" className="text-blue-700 hover:underline">Buat Akun</Link>
          </div>
        </form>
      </div>
    </section>
  )
}