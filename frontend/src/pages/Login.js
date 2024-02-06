import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useEffect } from 'react';


export default function SignIn({ setislogin }) {
  useEffect(() => {
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Execute the function initially
    setVhProperty();

    // Update the value on window resize
    window.addEventListener('resize', setVhProperty);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', setVhProperty);
    };
  }, []);
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success("Submiting...",{
      duration: 500,
      position: 'top-center',})
    console.log(values)
    try {
      const res = await axios.post('https://note-hub.vercel.app/users/login', values)
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
          <input type="email" required placeholder="Enter your email" onChange={e => setValues({ ...values, email: e.target.value })} />
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
