import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import Notes from './pages/Notes'
import NoteRoute from './pages/NoteRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const [islogin, setislogin] = useState(false)
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <AnimatePresence mode='wait'>
          <Home />
        </AnimatePresence>
      )
    },
    {
      path: "/login", element: (
        <AnimatePresence mode='wait'>
          <motion.div key="login" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
            <Login setislogin={setislogin} />
          </motion.div>
        </AnimatePresence>
      )
    },
    {
      path: "/register", element: (
        <AnimatePresence mode='wait'>
          <motion.div key="register" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
            <Register />
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      path: "/mynotes", element: (
        <AnimatePresence mode='wait'>
          <motion.div key="mynotes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <NoteRoute setislogin={setislogin} />
          </motion.div>
        </AnimatePresence>
      ),
      children: [
        {
          index: true, element: (
            <AnimatePresence mode='wait'>
              <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Notes setislogin={setislogin} />
              </motion.div>
            </AnimatePresence>
          )
        },
        {
          path: "createnote", element: (
            <AnimatePresence mode='wait'>
              <motion.div key="createnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0 }}>
                <CreateNote />
              </motion.div>
            </AnimatePresence>
          ),
        },
        {
          path: "editnote/:id", element: (
            <AnimatePresence mode='wait'>
              <motion.div key="editnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <EditNote />
              </motion.div>
            </AnimatePresence>
          )
        }
      ]
    },
    {
      path: "*",
      element: (
        <AnimatePresence mode='wait'>
          <motion.div key="404" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Home />
          </motion.div>
        </AnimatePresence>
      ),
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
