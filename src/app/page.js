import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Users from '@/components/Users'
import React from 'react'

const page = () => {
  return (
    <div className='bg-cultured-gray h-[100vh] w-full'>
      <Navbar />
      <div className='pt-[100px] w-[100%] flex justify-center items-center'>
        <div className='w-[92%] '>
          <Sidebar />
          <div className='ml-6 pl-[300px]'>
            <Users />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page