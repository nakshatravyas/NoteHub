import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import{IoIosArrowBack} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
export default function CreateNote() {
  const [note, setNote] = React.useState({
    title: '',
    content: '',
    date: new Date().toLocaleString()
  })
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        await axios.post(`/api/notes`, note, {
          headers: { Authorization: token }
        })
        console.log("suceess")
        toast.success("Note Created")
        navigate('/mynotes')
      }
    } catch (err) {
      console.log('error')
      toast.error("Error in creating note")
      // window.location.href = '/mynotes'
    }
  }
  return (
    <section>
      <header className="create-note__header">
        <Link to='/mynotes' className='btn hoverr'><IoIosArrowBack/></Link>
        <button className='btn lg primary' onClick={handleSubmit}>Save</button>
      </header>
      <form className='create-note__form'>
        <input type="text" placeholder='Title' onChange={e => setNote({ ...note, title: e.target.value })} autoFocus/>
        <textarea rows="28" placeholder='Text Here...' onChange={e => setNote({ ...note, content: e.target.value })}></textarea>
      </form>
    </section>
  )
}
