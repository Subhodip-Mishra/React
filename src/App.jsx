import { useState } from 'react'
import './App.css'
import Navber from './components/Navber'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Navber/>
    
    <div className='min-h-[90vh]'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
