import React from 'react'

const Navber = () => {
  return (
   <nav className=' bg-slate-800 text-white'>
    <div className="myContainer flex justify-between items-center px-4 py-5 h-14">

    <div className="logo font-bold ">
    <span className='text-green-700'> &lt;</span>
      Pass
      <span className='text-green-700'>OP /&gt;</span>
     
      
      
    </div>
    <div>
      <button className='text-white flex w-full   '>
      <img className='invert p-3 w-20 flex py-1 justify-center items-center ' src="/git.png" alt="" />
      <span className='font-bold flex  py-2 p-1 justify-center ring-white ring-1 rounded-full  '>Github</span>
      </button>
    </div>
    </div>
   </nav>
  )
}

export default Navber