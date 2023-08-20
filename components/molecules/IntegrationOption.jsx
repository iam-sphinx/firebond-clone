// import { IconType } from 'react-icons/fa';
import Button from "../atoms/Button";
import { MdDone } from "react-icons/md";

import Image from "next/image";
export const IntegrationOption = (props: any) => {
  const notConnected =
    "absolute left-[479px] top-[18px] border-[1px] border-[#FFFFFF] rounded-[8px] w-[103px] h-[34px] text-white";

  function handleClick() {}
  return (
    // its responsible for whole outer box
    <div className={`border-b-[1px] border-[#353B43] w-[595px] h-[80px] `}>
      <div
        className={`absolute top-[13px] left-[19px] border-[1px] border-[#353B43] rounded-[10px] w-[45px] h-[45px]  flex items-center justify-center ${props.IconBackgroundStyle}`}
      >
        {/* put icon in left rectangle */}
        <props.Icon size={props.IconSize} color={props.IconColor} />
      </div>
      <div className="absolute top-[10px] left-[88px]">
        <p className="font-bold font-['General Sans']  text-white">
          {props.CapName}
        </p>
        <p className=" font-['General Sans'] text-[#A6A6A6]">
          Import roles and create {props.SmallName} based bounties
        </p>
      </div>
      <Button
        onClick={props.handleClick}
        label={"Connect"}
        styles={notConnected}
      />
      {/* <button className={notConnected}>Connect</button> */}
      <button
        onClick={props.handleClick}
        className={`absolute left-[463px] bg-white top-[18px] border-[1px] border-[#FFFFFF] rounded-[8px] w-[140px] h-[34px] text-black ${props.visibility}`}
      >
        <div className="inline">
          <MdDone className="relative left-[10px] top-[10px] w-[15px] h-[15px]"></MdDone>
          <div className="relative left-[1px] top-[-10px]">Connected</div>
        </div>
      </button>

      {/* <Button onClick={handleClick} label={"Connected"} styles='absolute left-[463px] bg-white top-[18px] border-[1px] border-[#FFFFFF] rounded-[8px] w-[119px] h-[34px] text-black' />      */}
    </div>
  );
};
