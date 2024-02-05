import * as React from 'react';
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 1, // Add a 0.1-second delay between animations
    },
  },
  exit:{},
};

const childVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit:
  { opacity: 0,y:-20, },
};

export default function DisableElevation() {
  const navigate = useNavigate()
  return (
    <motion.div className="container" initial="initial"
    animate="animate"
    exit="exit"
    variants={containerVariants}>
      <motion.div className="home" variants={childVariants}>
        <motion.h1 variants={childVariants}>NoteHub</motion.h1>
        <motion.p id='tagline' variants={childVariants}>A Secure Oasis for All Your Notes</motion.p>
        <motion.button className='btn_login' id='login' variants={childVariants} onClick={e => navigate('/login')}>Login</motion.button>
        <motion.button className='btn_login' variants={childVariants} onClick={e => navigate('/register')}>Register</motion.button>
      </motion.div>
    </motion.div>
  );
}

    