import Image from 'next/image'
import React from 'react'

const Photo = () => {
  return (
    <div className='w-[106px] h-[42.4px] flex overflow-hidden relative '>
        <div className='h-full w-[42.4px] rounded-full border-[1.44188px] border-white box-border overflow-hidden absolute left-0'>
            <img src="/Icons/profileTemplate.jpg"  alt='' className='object-cover'/>
        </div>
        <div className='h-full w-[42.4px] rounded-full border-[1.44188px] border-white box-border overflow-hidden absolute left-[21.2px]'>
            <img src="/Icons/profileTemplate.jpg"  alt='' className='object-cover'/>
        </div>
        <div className='h-full w-[42.4px] rounded-full border-[1.44188px] border-white box-border overflow-hidden absolute right-[21.6px]'>
            <img src="/Icons/profileTemplate.jpg"  alt='' className='object-cover'/>
        </div>
        <div className='h-full w-[42.4px] rounded-full border-[1.44188px] border-white box-border overflow-hidden absolute right-0'>
            <img src="/Icons/profileTemplate.jpg"  alt='' className='object-cover'/>
        </div>
    </div>
  )
}

export default Photo
