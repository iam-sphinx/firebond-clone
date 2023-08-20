import MissionFormData from "@/utils/MissionFormData";
import Image from "next/image";
import React, { useState } from "react";

const Priority = () => {
  const [on, setOn] = useState(false);
  const obj = MissionFormData();

  const [status, setStatus] = useState(obj.priority);


  obj.priority = status;

  return (
    <div>
      <h1 className="font-medium text-[16px] mt-6 leading-[22px] text-white mb-[10px]">
        Priority
      </h1>
      <div
        className="w-[383px] h-[41px] flex justify-between items-center bg-[#232B35] rounded-[8px] pr-3 pl-[23px] cursor-pointer mb-[10px]"
        onClick={() => {
          setOn(!on);
        }}
      >
        <div className="flex gap-[10.25px] justify-center items-center">
          <h1 className="font-normal text-[14px] leading-[19px] text-white">
            {status}
          </h1>
        </div>
        <Image
          src="Icons/Arrow_Down.svg"
          height={4.97}
          width={9.83}
          alt=""
          className={`${on && "-rotate-180"}`}
        />
      </div>
      {on && (
        <div className="w-auto h-[174px] bg-[#232B35] border border-[#757575] shadow-[20px, 35px, 50px, rgba(0, 0, 0, 0.25)] rounded-[16px] pt-[17px] pb-[18px]">
          <div className="h-full w-full flex flex-col">
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus("No Priority");
                setOn(false);
              }}
            >
              <h1 className="text-sm font-normal text-white text-start ml-[23px]">No Priority</h1>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus("Urgent");
                setOn(false);
              }}
            >
              <h1 className="text-sm font-normal text-white text-start ml-[23px]">Urgent</h1>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus("High");
                setOn(false);
              }}
            >
              <h1 className="text-sm font-normal text-white text-start ml-[23px]">High</h1>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus("Medium");
                setOn(false);
              }}
            >
              <h1 className="text-sm font-normal text-white text-start ml-[23px] ">Medium</h1>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus("Low");
                setOn(false);
              }}
            >
              <h1 className="text-sm font-normal text-white text-start ml-[23px]">Low</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Priority;
