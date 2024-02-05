import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { CiSearch } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import { BsPlusLg } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import NoteItem from '../components/NoteItem';
import toast from 'react-hot-toast';
import SyncLoader from "react-spinners/SyncLoader";
import Logo from "..//components/letter_1027530.webp"
import { motion } from 'framer-motion';


export default function Notes({ setislogin }) {

  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [token, setToken] = useState('')
  const [loading, setloading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const fetchNotes = async (token) => {
    setloading(true)
    const res = await axios.get('api/notes', {
      headers: { Authorization: token }
    })
    setNotes(res.data)
    setloading(false)

  }

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setToken(token)
    if (token) {
      fetchNotes(token)
    }
  }, [])
  function logout() {
    localStorage.clear()
    setislogin(false)
    toast.success("Logout Successful")
    navigate("/")
  }
  const handleSearch = () => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredNotes(filtered);
    if (filtered.length === 0) {
      toast.error("No matching notes");
    }
  };
  return (
    <section >
      <header className='notes__header'>
        <h2 id='notehub_title'>NoteHub</h2>
        <img src={Logo} alt="" id='logo' />
        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}>
          <input type="text" autoFocus placeholder='Keyword...' value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} />
          <button className='btn hoverr' onClick={handleSearch}><CiSearch /></button>
        </div>
        <button className='btn hoverr' onClick={logout}><IoIosLogOut /></button>
      </header>
      {
        loading ? <div id='loader'><SyncLoader color="#7634d8" /></div> :
          <div className="notes__container">
            {filteredNotes.length > 0
              ? filteredNotes.map((note, index) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <NoteItem note={note} />
                </motion.div>
              ))
              : notes.length > 0 ? (notes.map((note, index) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <NoteItem note={note} />
                </motion.div>
              ))) : (<div id='loader'>Create a note</div>)}
          </div>}
      <Link to='createnote' className='btn add__btn hoverr'><BsPlusLg /></Link>
    </section>
  )
}


