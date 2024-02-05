import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosArrowBack } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SyncLoader from 'react-spinners/SyncLoader'
export default function EditNote() {
  const [loading, setloading] = useState(false);
  const [note, setNote] = React.useState({
    title: '',
    content: '',
    date: new Date().toLocaleString(),
    id: ''
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getNotes = async () => {
      setloading(true)
      const token = localStorage.getItem("authToken")
      if (params.id) {
        const res = await axios.get(`https://note-hub.vercel.app/api/notes/${params.id}`, {
          headers: { Authorization: token }
        })
        setNote({
          title: res.data.title,
          content: res.data.content,
          id: res.data._id
        })

       setloading(false) 
      }
    }
    getNotes()
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        await axios.put(`https://note-hub.vercel.app/api/notes/${note.id}`, note, {
          headers: { Authorization: token }
        })
        toast.success("Note Edited")
        navigate('/mynotes')
      }
    } catch (err) {
      window.location.href = '/mynotes'
      toast.error("Error in editing note")
    }
  }
  const deletefun=async()=>{
    try{
        const token=localStorage.getItem("authToken")
        await axios.delete(`https://note-hub.vercel.app/api/notes/${note.id}`,{
          headers:{Authorization:token}
        })
        // window.location='/mynotes';
        toast.success("Note Deleted")
        navigate('/mynotes')
      }catch(err)
      {
        window.location.href='/mynotes';
        console.log(err.response.data.msg)
        toast.error(err.response.data.msg)
      }
  }
  return (
    <section>
      <header className="create-note__header">
        <Link to='/mynotes' className='btn hoverr'><IoIosArrowBack /></Link>
        <button className='btn lg primary' type='submit' onClick={handleSubmit}>Save</button>
        <button className='btn danger' onClick={deletefun}><RiDeleteBin6Line /></button>
      </header>
      {loading?<div id='loader'><SyncLoader color="#7634d8" /></div>:<form className='create-note__form' onSubmit={handleSubmit}>
        <input type="text" placeholder='Title' value={note.title} onChange={e => setNote({ ...note, title: e.target.value })} autoFocus />
        <textarea rows="28" placeholder='Text Here...' value={note.content} onChange={e => setNote({ ...note, content: e.target.value })}></textarea>
      </form>}
    </section>
  )
}
