import React from 'react'
import NavBar from './NavBar'

function header() {
  return (
    <div className='flex flex-col h-[100px] w-screen justify-center items-center sticky p-10'>
        <div className='text-[40px] font-extralight text-black'>
        Analyzing IPL Performance with Pyspark and HDFS 
        </div>        
    </div>
  )
}

export default header