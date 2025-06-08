import React from 'react'
import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home';

function App() {

  return (
    <>
      <div className="bg-emerald-50 text-white w-full">
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App
