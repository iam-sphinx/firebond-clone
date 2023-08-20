import React from 'react'
import { PlatformIconWithBox } from '../atoms/PlatformIconWithBox'
import { FaDiscord, FaEthereum, FaTwitter } from 'react-icons/fa'
import { CiMail } from "react-icons/ci"
export default function IntegrationSelectFormBuilder() {
  return (
    
      <div className='flex flex-col bg-[#171C23] w-[454px] h-[256px] rounded-[10px]'>
            <div className='m-[30px] text-[white] text-[25px] '>
                Select the integration
                <span className='text-[25px] ml-[120px]'>X</span>
            </div>
            <div className='flex flex-row m-[20px]'>
                {/* <div> */}
                    <PlatformIconWithBox BoxStyle="bg-[#2C333D] border-[1px] border-[#FFFFFF] rounded-[9px] w-[80px] h-[80px] m-[10px]  " IconColor="white" IconSize="40" Icon={FaTwitter} />
                    <PlatformIconWithBox BoxStyle="bg-[#2C333D] border-[1px] border-[#FFFFFF] rounded-[9px] w-[80px] h-[80px] m-[10px]  " IconColor="white" IconSize="40" Icon={FaDiscord} />
                    <PlatformIconWithBox BoxStyle="bg-[#2C333D] border-[#FFFFFF] border-[1px]  rounded-[9px] w-[80px] h-[80px] m-[10px] " IconColor="white" IconSize="40" Icon={CiMail}/>
                    <PlatformIconWithBox BoxStyle="bg-[#2C333D] border-[#FFFFFF] border-[1px]  rounded-[9px] w-[80px] h-[80px] m-[10px] " IconColor="white" IconSize="40" Icon={FaEthereum} />
                {/* </div> */}
            </div>
      </div>
    
  )
}
