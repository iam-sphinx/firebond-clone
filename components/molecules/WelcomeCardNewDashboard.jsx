import Image from "next/image";
import React from "react";
import Mission from "../atoms/Mission";
import Days from "../atoms/Days";




const WelcomeCardNewDashboard = (props) => {
  

  return (
    <div
      className="w-full h-[270px] px-[54px] py-[67px] rounded-[20px]"
      style={{
        background: "linear-gradient(180deg, #000000 56.25%, #322617 100%)",
      }}
    >
      {/* Profile Photo */}
      <div className="w-full h-full flex justify-between">
        <div className="h-[137px] w-[156.21px] overflow-hidden bg-transparent mask mask-hexagon-2 bg-white">
          <img
            src="/Icons/profileTemplate.jpg"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        {/* User Info Section */}
        <div className="ml-[37.79px] mr-[119px]">
          <h3 className="text-lg font-medium text-[#757575] mb-1">
            @{props.name}
          </h3>
          <h1 className="text-white text-3xl font-thin mb-6">
            Welcome, <span className="font-semibold">{props.name}</span>
          </h1>

          <button className="w-[400px] h-[60px] bg-[#FE702A] rounded-[10px] flex justify-center items-center">
            <div className="flex items-center">
              <h1 className="font-medium text-base text-[#1C1C1C]">
                <span className="font-semibold text-lg">{props.bounty}</span> Total
                Bounty
              </h1>
              <div className="h-0 w-[31px] border border-[#1C1C1C] rotate-90"></div>
              <h1 className="font-medium text-base text-[#1C1C1C]">
                <span className="font-semibold text-lg">{props.xp}</span> Total XP
              </h1>
            </div>
          </button>
        </div>

        {/* Mission and days count section */}
        <div className="flex gap-[71px] items-center">
          <div className="w-[153.8px] h-[153.8px] relative">
            <Mission count = {props.missionCount}/>
          </div>
          <div className="w-[153.8px] h-[153.8px] relative">
            <Days  days ={props.days}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCardNewDashboard;
