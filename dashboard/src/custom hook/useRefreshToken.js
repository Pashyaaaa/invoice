import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import {
  useEffect,
  useState
} from "react"

export default function useRefreshToken() {
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    refreshToken()
    getUsers()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token')
      const decoded = jwtDecode(response.data.accessToken)
      setToken(response.data.accessToken)
      setName(decoded.name)
      setExpire(decoded.exp)
    } catch (error) {
      if(error.response) navigate('/login')
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    if(expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token')
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setExpire(decoded.exp)
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  })

  const getUsers = async () => {
    try {
      const response = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error.message);
      // Handle error as needed, e.g., show a message to the user
    }
  }

  return { name, users }
}
