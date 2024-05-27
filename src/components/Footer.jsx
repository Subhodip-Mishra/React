import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center'>
    <div className="logo font-bold ">
    <span className='text-green-700'> &lt;</span>
      Pass
      <span className='text-green-700'>OP /&gt;</span>
    </div>
    <div className='flex'>Created with<img className=' flex w-10 p-2 py-1' src="/heart.png" alt="" />by Suvodeep</div>
    </div>
    </>
  )
}

export default Footer