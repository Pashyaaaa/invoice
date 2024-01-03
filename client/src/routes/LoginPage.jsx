import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <section className="max-w-sm mx-auto h-screen flex flex-col justify-center">
      <div className='bg-slate-300 p-4 rounded-xl'>
        <h1 className='font-bold text-xl mb-12'>Login Ke FIesto Invoce Dashboard</h1>
        <form onSubmit={ handleLogin }>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-900">
              Email Anda
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-900">
              Password Anda
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center">
            Login
          </button>
        </form>
      </div>
    </section>
  )
}
