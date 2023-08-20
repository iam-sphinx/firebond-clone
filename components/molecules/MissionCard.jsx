import Image from "next/image";
import React from "react";
import Photo from "../atoms/Photo";
import router from "next/router";

function Mission(props: any) {
  console.log(props);
  return (
    <div className="w-full h-full bg-[#232A35] rounded-[20px] overflow-hidden flex items-end">
      <div className="w-full h-[285px] bg-[#404A5473] rounded-[20px] p-6">
        <div className="w-full h-full">
          <div className="flex justify-between items-center mb-[55px]">
            <h1 className="text-white font-semibold text-2xl">Missions</h1>
            <Image
              src="Icons/add.svg"
              height={29}
              width={29}
              alt=""
              className="cursor-pointer"
              onClick={() => router.push("/MissionCreationFormPage")}
            />
          </div>

          <div className="flex justify-between items-center mb-[64px]">
            <button className="w-[195px] h-[52px] rounded-[10px] border border-[#FFFFFF3B] bg-[#FFFFFF24] flex items-center">
              <p className=" text-white font-open-sans font-semibold text-2xl px-[23px]">
                {/* Progress is denoting = total mission Created */}
                {props.created ? props.created : 0}{" "}
                <span className="font-extralight text-xs">Created</span>
              </p>
            </button>
            <button className="w-[195px] h-[52px] rounded-[10px] border border-[#FFFFFF3B] bg-[#FFFFFF24] flex items-center">
              <p className=" text-white font-open-sans font-semibold text-2xl px-[23px]">
                {/* Review right now is representing = Active Mission */}
                {props.active ? props.active : 0}{" "}
                <span className="font-extralight text-xs">Active</span>
              </p>
            </button>
          </div>

          <div className="flex gap-[11px] items-center">
            <Photo />
            <p className="text-[#757575] font-normal text-base">
              {props.submission ? props.submission : 0} submissions from{" "}
              <span className="text-white">
                {props.contibutors ? props.contributors : 0} + contributors
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
