import React, { useState } from "react";
import {TiDelete} from "react-icons/ti"

const Mission = (props: any) => {
    const [heading,setHeading] = useState('');
    const [subHeading,setSubHeading] = useState('');

    const handleSub = async (e)=>{
        const newSubHeading = e.target.value
        setSubHeading(newSubHeading);
        await props.updateMission(props.id, heading,subHeading);
    }

    const handleHead = async (e)=>{
        const newHeading = e.target.value
        setHeading(newHeading);
       await props.updateMission(props.id, heading,subHeading);
    }

  return (
    <div className="w-full h-auto">
      <div className="flex gap-[22.07px]">
        <div>
          <div className="w-[97.93px] h-[34px] bg-[#191F27] rounded-[4px] flex justify-center items-center relative">
            <h1 className="font-medium text-xs text-white">
              Step {props.step}
            </h1>
            <TiDelete className="absolute -top-[6px] -right-[6px] hover:text-red-600" onClick={()=>props.delete(props.id)} />
          </div>
          <div className=" w-full flex justify-center">
            <div className="w-0 h-[182px] border-[1px] border-dashed border-[#44494F]"></div>
          </div>
        </div>

        {/* Heading & Subheading */}

        <div>
          <div className="mb-6">
            <h1 className="font-medium text-[14px] leading-[19px] text-white mb-[11px]">
              Heading
            </h1>
            <div className="w-[578px] h-[41px]  flex items-center  bg-[#2E363F] rounded-lg overflow-hidden">
              <div className="w-full h-[41px] bg-[#2E363F] ">
                <input
                  className="w-full h-full px-6 overflow-hidden text-ellipsis outline-none bg-inherit text-white text-base font-medium"
                  value={heading}
                  onChange={handleHead}
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="font-medium text-[14px] leading-[19px] text-white mb-[11px]">
              sub Heading
            </h1>
            <div className="w-[578px] h-[41px]  flex items-center  bg-[#2E363F] rounded-lg overflow-hidden">
              <div className="w-full h-[41px] bg-[#2E363F] ">
                <input
                  className="w-full h-full px-6 overflow-hidden text-ellipsis outline-none bg-inherit text-white text-base font-medium"
                 value={subHeading}
                 onChange={handleSub}
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
