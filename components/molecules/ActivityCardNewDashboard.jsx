import React, { useState } from "react";

const ActivityCard = () => {
  const [divs, setDivs] = useState(Array(130).fill({ color: "bg-[#171C23]" }));
  const handleClick = (index: number) => {
    const newDiv = [...divs];
    //    here to implement logic of colors
    newDiv[index] = { color: "bg-blue-500" };
    setDivs(newDiv);
  };
  return (
    <div className="w-[841px] h-[325px] bg-[#232B35] pl-[34px] pr-[37px] pt-[21px] pb-[41px] rounded-[10px]">
      <div className="h-full w-full">
        <h1 className="text-white text-[26px] leading-[35px] font-semibold mb-[33px]">
          Activity
        </h1>
        <div className="h-[140.65px] w-full grid grid-cols-26 grid-rows-5 gap-[10px] mb-[32.35px]">
          {divs.map((div, index) => (
            <div
              key={index}
              className={`${div.color} rounded-[3px]`}
              onClick={() => handleClick(index)}
            ></div>
          ))}
        </div>
        <div className="flex gap-[10px]">
          <h1 className="text-white text-[16px] leading-[22px] font-medium">
            Active
          </h1>
          <div className="flex gap-[6px]">
            <div className="h-5 w-5 bg-[#93E7A2] rounded-[4px]"></div>
            <div className="h-5 w-5 bg-[#3EBE5E] rounded-[4px]"></div>
            <div className="h-5 w-5 bg-[#2F984A] rounded-[4px]"></div>
            <div className="h-5 w-5 bg-[#216435] rounded-[4px]"></div>
            <div className="h-5 w-5 bg-[#171C23] rounded-[4px]"></div>
          </div>
          <h1 className="text-white text-[16px] leading-[22px] font-medium">
            Inactive
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
