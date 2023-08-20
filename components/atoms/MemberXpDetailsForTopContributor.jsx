import React from 'react'
import { PlatformIconWithBox } from './PlatformIconWithBox'

export default function MemberXpDetailsForTopContributor(props) {
  return (
    <>
      <div className='inline-block'>
           <span className='inline'>
                <props.change className={`inline ${props.colorOfChange}`}/>
            </span>
            <span className='text-white'>
                {props.position}
            </span>
            <div className="inline avatar absolute">
                <div className="w-[38px] h-[38px]  rounded-full">
                      <img src="/Icons/Ellipse 14.png" alt="IMG"/>
                </div>
                
          </div>
          <div className={`absolute inline text-[#FFFFFF] text-[16px] font-[400] font-[General Sans] left-[78px] ${props.playerNameStyle}`}>
                {props.playerName}
        </div>
        <div className="absolute inline text-[#FFFFFF] text-[16px] font-[400] font-[General Sans] left-[380px] w-[110px]">
                {props.missionsCompleted}
        </div>
       
        <div className="absolute inline left-[780px] ">
                  <PlatformIconWithBox Icon ={props.icon} IconSize={15} IconColor="white" BoxStyle={`bg-[#6359E9] ${props.boxColor} w-[37px] h-[37px] rounded-[10px]`}/>
        </div>
        <div className="absolute inline text-[#FFFFFF] text-[16px] font-[400] font-[General Sans] left-[980px] w-[110px]">
                {props.xp}
        </div>
              
            

      </div>
    </>
  )
}
