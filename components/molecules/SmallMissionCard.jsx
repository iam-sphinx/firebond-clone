import { Router, useRouter } from "next/router";
import React from "react";
interface SmallMissionCardProps {
  missionTitle: String;
  missionDiscription: String;
  usdc: String;
  page
}

const SmallMissionCard: React.FC<SmallMissionCardProps> = ({
  missionDiscription,
  missionTitle,
  usdc,
  page,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-[364px] h-[95px] rounded-[10px] bg-[#232B35] border border-[#7575750A] flex justify-center items-center px-5 cursor-pointer"
      onClick={() => router.push(page)}
    >
      <div className="h-auto w-full flex justify-between items-center">
        <div className="h-full w-full">
          <h1 className="font-semibold text-[16px] leading-[21.6px] text-white mb-1 mx-h-[44px] overflow-hidden text-ellipsis ">
            {missionTitle}
          </h1>
          <h2 className="font-normal text-xs text-[#A6A6A6] h-full overflow-hidden text-ellipsis ">
            Mision: {missionDiscription}
          </h2>
        </div>
        <button className="w-[80px] h-[30px] bg-[rgb(255,186,3)]/[0.36] rounded-[8px] flex justify-center items-center hover:shadow-sm">
          <h1 className="font-bold text-[12px] leading-[14px] text-[#FFBA03]">
            {usdc} XP
          </h1>
        </button>
      </div>
    </div>
  );
};

export default SmallMissionCard;
