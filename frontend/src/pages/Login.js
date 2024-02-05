import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';


export default function SignIn({ setislogin }) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values)
    try {
      const res = await axios.post('/users/login', values)
      console.log(res)
      localStorage.setItem('authToken', res.data.token)
      setislogin(true)
      toast.success("Login Successful")
      navigate('/mynotes')
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
    }
  }

  return (
    <div className="login_container">
      <div className="login form">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <input type="email"  autoFocus required placeholder="Enter your email" onChange={e => setValues({ ...values, email: e.target.value })} />
          <input type="password" required placeholder="Enter your password" onChange={e => setValues({ ...values, password: e.target.value })} />
          <input type="submit" className="button" value="Login" />
        </form>
        <div className="signup">
          <span className="signup">Don't have an account?
            <Link to="/register">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
}