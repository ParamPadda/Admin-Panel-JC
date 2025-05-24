import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
  <>
  
  <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <ToastContainer />
  
  </>
  )
}

export default App