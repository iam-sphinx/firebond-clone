import Header from '@/components/atoms/Header'
import Sidebar from '@/components/molecules/Sidebar'
import React from 'react'

const Template = () => {
  return (
    <div className='h-screen min-w-fit bg-[#171C23] flex'>
        <Sidebar/>

        {/* Main Section */}
        <div className="w-full h-full overflow-auto scrollbar-hide ">
            <Header/>

            {/* Centeral Section */}
            <div className='flex-[1]'>

               



            </div>
            
        </div>
    </div>
  )
}

export default Template