
import MissionFormData from "@/utils/MissionFormData";
import Image from "next/image";
import React, { useState } from "react";



const Todo = () => {
  const [on, setOn] = useState(false);
  const [status, setStatus] = useState({
    action: "To Do",
    src: "Icons/circle.svg",
  });
  const obj = MissionFormData();

  obj.status = status.action;


  return (
    <div>
      <h1 className="font-medium text-[16px] leading-[22px] text-white mb-[10px]">
        Status
      </h1>
      <div
        className="w-[383px] h-[41px] flex justify-between items-center bg-[#232B35] rounded-[8px] pr-3 pl-[23px] cursor-pointer  mb-2"
        onClick={() => {
          setOn(!on);
        }}
      >
        <div className="flex gap-[10.25px] justify-center items-center ">
          <Image src={status.src} height={16} width={16} alt="" />
          <h1 className="font-normal text-[14px] leading-[19px] text-white">
            {status.action}
          </h1>
        </div>
        <Image
          src="Icons/Arrow_Down.svg"
          height={4.97}
          width={9.83}
          alt=""
          className={`cursor-pointer ${on && "-rotate-180"}`}
        />
      </div>

      {on && (
        <div className="w-[382px] h-[174px] bg-[#232B35] border border-[#757575] shadow-[20px, 35px, 50px, rgba(0, 0, 0, 0.25)] rounded-[16px] pt-[17px] pb-[18px]">
          <div className="h-full w-full flex flex-col">
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus({ action: "Backlog", src: "Icons/dashed.svg" });
                setOn(false);
              }}
            >
              <div className="flex gap-[18px] ml-[32px]">
                <Image src="Icons/dashed.svg" alt="" height={16} width={16} />
                <h1 className="text-sm font-normal text-white">Backlog</h1>
              </div>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus({ action: "To Do", src: "Icons/circle.svg" });
                setOn(false)
              }}
            >
              <div className="flex gap-[18px] ml-[32px]">
                <Image src="Icons/circle.svg" alt="" height={16} width={16} />
                <h1 className="text-sm font-normal text-white">To Do</h1>
              </div>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus({ action: "In Progress", src: "Icons/progress.svg" });
                setOn(false)
              }}
            >
              <div className="flex gap-[18px] ml-[32px]">
                <Image src="Icons/progress.svg" alt="" height={16} width={16} />
                <h1 className="text-sm font-normal text-white">In Progress</h1>
              </div>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus({ action: "In Review", src: "Icons/review.svg" });
                setOn(false);
              }}
            >
              <div className="flex gap-[18px] ml-[32px]">
                <Image src="Icons/review.svg" alt="" height={16} width={16} />
                <h1 className="text-sm font-normal text-white">In Review</h1>
              </div>
            </button>
            <button
              className="h-full w-full hover:bg-[#171C23]"
              onClick={() => {
                setStatus({ action: "Done", src: "Icons/done.svg" });
                setOn(false)
              }}
            >
              <div className="flex gap-[18px] ml-[32px]">
                <Image src="Icons/done.svg" alt="" height={16} width={16} />
                <h1 className="text-sm font-normal text-white">Done</h1>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
