import React from "react";

interface CommunityHealthProps {
  Twitter: number;
  Total: number;
}

export default function CommunityHealth(prop: any) {
  return (
    <div className="card card-side shadow-xl absolute w-full h-full  bg-[#242B35] flex justify-center items-center rounded-3xl">
      <p className="absolute left-10 top-7 w-258 h-32 font-semibold font-weight-[600px] text-white text-2xl leading-8">
        Community Health
      </p>
      <div className="flex flex-col justify-end items-center w-full">
      <div
            className="absolute radial-progress text-[#4D545E] mb-[17px]"
            style={
              {
                "--value": "100",
                "--size": "14rem",
                "--thickness": "13px",
              } as React.CSSProperties
            }
          ></div>
        <div
          className="radial-progress text-amber-500 mt-[20px]"
          style={
            {
              "--value": `${prop.Twitter}`,
              "--size": "14rem",
              "--thickness": "13px",
              "--z-index":"100px"
            } as React.CSSProperties
          }
        >
          <div className=" flex justify-center font-generalsans font-medium text-base md:text-lg text-gray-600 leading-6 md:leading-7">
            Total
          </div>
          <div className="font-generalsans font-medium text-3xl text-gray-300 leading-10">
            {prop.Total}
          </div>
        </div>
        <div className="flex justify-center space-x-4 relative h-[18px] left-[-100px] top-[30px]">
          <label className="inline-flex items-center">
            <div className="h-[18px] w-[18px] rounded-full bg-gray-600"></div>
            <span className="text-[#D9D9D9] ml-2 font-generalsans  font-medium text-base md:text-lg leading-6 md:leading-7">
              Discord
            </span>
          </label>
          <label className="inline-flex items-center">
            <div className="h-[18px] w-[18px] rounded-full bg-amber-500"></div>
            <span className="text-[#D9D9D9] ml-2 font-generalsans  font-medium text-base md:text-lg leading-6 md:leading-7">
              Twitter
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
