import React, { ReactElement } from "react";
import ProfileIcon from "../atoms/ProfileAvatar";

 const TopContentCard =  (props) => {
  return (
    <div className="w-[452px] h-[102px] bg-[#232B35] border-[1px] border-solid border-[#404A54] rounded-2xl">
      <div className="flex gap-3 px-6 py-[18px]">
        <ProfileIcon size={40} imageUrl={props.profileUrl} onProfileIconClick={()=>{}}/>
        <div>
          <h1 className="font-normal text-[15px] leading-5 text-[#8899A6]">
            <span className="text-white font-semibold">{props.username}</span>{" "}
            @{props.userid}{" "}<span className="relative bottom-[3px]">.</span>{" "}{props.time}s
          </h1>
          <p className="text-white font-normal text-[15px] leading-5 min-h-[40px] max-w-[300px] break-words">
            {props.discription}
           {" "}<span className="text-[#64CFF6]">{props.tag}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default TopContentCard;