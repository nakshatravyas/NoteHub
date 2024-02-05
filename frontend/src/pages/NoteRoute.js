import axios from 'axios'
import React, { useEffect } from 'react'
import{Outlet, useNavigate} from 'react-router-dom'
export default function NoteRoute({setislogin}) {
  const navigate = useNavigate()
  useEffect(() => {
    const checkLogin = async () => {

      const token = localStorage.getItem('authToken')
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: { Authorization: token }
        })
        setislogin(verified.data)
        if (verified.data === false) {
          localStorage.clear()
          navigate('/')
        }
      } else {
        setislogin(false)
        navigate('/')
      }
    }
    checkLogin()
  })
  return (
    <div>
      <Outlet/>
    </div>
  )
}
