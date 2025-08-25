import React from 'react'

const nav = () => {
  return (
    <div className='flex   text-white  p-4  '>
        
 <h1 className='text-4xl bold font-mono '>yTasks</h1>
      <ul className='flex  justify-end font-serif  sm:gap-10 ml-auto sm:mr-20 mt-1 text-xl gap-5 mr-4   '>
        <li className='cursor-pointer'>Home</li>
        <li className='cursor-pointer' >Lists</li>
        
      </ul>
    </div>
  )
}

export default nav
