import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function SignIn() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values)
    try {
      const res = await axios.post('/users/register', values)
      console.log(res)
      toast.success("Register Successful")
      navigate('/login')
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
    }
  }


  return (
    <div className="login_container">
      <div className="login form">
        <header>Register</header>
        <form onSubmit={handleSubmit}>
          <input type="text" required autoFocus placeholder="Enter your name" onChange={e => setValues({ ...values, username: e.target.value })} />
          <input type="email" required placeholder="Enter your email" onChange={e => setValues({ ...values, email: e.target.value })} />
          <input type="password" required placeholder="Enter your password" onChange={e => setValues({ ...values, password: e.target.value })} />
          <input type="submit" className="button" value="Register" />
        </form>
        <div className="signup">
          <span className="signup">Already have an account?
            <Link to="/login">Signin</Link>
          </span>
        </div>
      </div>
    </div>
  );
}