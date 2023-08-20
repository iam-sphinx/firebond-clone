import React, { useState } from "react";


export default function TwitterHandlePopUp(props:any) {
    
    function onContinueClick(){

    }
    
    const [TwitterHandle, setTwitterHandle] = useState("");
  return (
   

        <div className="bg-[#232B35] absolute  rounded-[10px]  w-[485px] shadow-[6px,6px,20px,rgba(15,15,15,0.26)]">
         
          <div className="w-full h-auto pr-[50px] pl-[30px] pb-[29px] pt-[37px]">
            <div className="h-auto">
              <h1 className="text-white font-medium text-base mb-[9px]">
                {props.title}
              </h1>
            </div>
            <div className="h-[45px] bg-[#2E363F] rounded-lg overflow-hidden text-ellipsis mb-[35px]">
              <input
                className="text-[#FFFFFFA3] text-black font-normal text-sm w-full h-full px-[18px] pt-[10px] pb-4 outline-none overflow-hidden text-ellipsis"
                placeholder={props.placeholder}
                value={TwitterHandle}
                onChange={(e)=>{
                  setTwitterHandle(e.target.value);
                  props.handlePopUpInputValue(e);
                }
                  
                }
              />
            </div>
          
            <button
              className="w-full h-[45px] bg-[#FE702A] border border-[#EAEAEA] flex justify-center items-center rounded-[9px] mb-6"
              onClick={props.onContinueClick}
            >
              <div className="flex gap-[14px] items-center justify-center">
              
                <h1 className="font-medium text-xs text-white">
                  Continue
                </h1>
              </div>
            </button>
           
          </div>
        </div>
     
   
  )
}
