import React from 'react'

const MissionStepsCard = (props:any) => {
  return (
    <div className="bg-[#232B35]  w-auto h-[351px] rounded-[20px]">
        <div className="text-[24px] relative mx-[30px] top-[20px] mb-[50px] text-[General Sans] font-[600] font-[General Sans] mb-[35px] text-white ">Missions steps</div>
        <div className='flex'>
        <div className='ml-[30px] relative top-[10px]'>
        <div className=" bg-[#191F27]   text-white w-[80px] text-center rounded-[4px] text-[12px] font-[500]"><p>Step 1</p></div>
        <div className="ml-[40px] h-[140px] border-l-2 border-dotted border-gray-700 "></div>
        <div className=" bg-[#191F27] text-center rounded-[4px] w-[80px] text-white text-[12px] font-[500] "><p>Step 2</p></div>
        </div>

            <div className='w-full '>
                <div  className="p-5 m-2 bg-gray font- mb-3 text-white h-auto w-auto  border-2 border-gray-700 rounded-[8px]">

                    <h2 className="text-xl font-bold">{props.heading1}</h2>
                    <p className='text-s text-gray-400 h-10'>{props.descp1}</p>
                 </div>
            <div>

            <div  className="p-5 m-2 bg-gray font- mb-3 text-white h-auto w-auto border-2 border-gray-700 rounded-[8px]">

                    <h2 className="text-xl font-bold">{props.heading2}</h2>
                    <p className='text-s text-gray-400 h-10'>{props.descp2} </p>
                 </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MissionStepsCard