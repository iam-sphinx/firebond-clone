import React from "react";

interface MissionDashboardTemplateCardProps {
  title: string;
  mission: string;
  coin: string;
}

export default function MissionDashboardTemplateCard(prop: any) {
  return (
    <div className="card card-side shadow-xl w-[364px] h-[95px] absolute left-[290px] top-[291px] bg-[#232B35] rounded-2xl">
      <span className="ml-5 mt-5">
      <div className="w-[180px] h-[22px] left-[310px] top-[319px] font-[General Sans] text-[White] font-[600] leading-normal">
        {prop.title}
      </div>
      <div className="card-title font-[General Sans] text-base text-left text-[#8C89B4] font-[400] w-[300px] font-normal  text-xs">
        Mission : {prop.mission}
      </div>
      </span>
      <span className="absolute w-[65px] h-[30px] left-[265px] bg-yellow-400 bg-opacity-30  ml-3 mt-8 rounded-xl flex justify-center items-center text-xs font-[700]"><div className="text-[#FFBA03]">{prop.coin} USDC</div></span>
    </div>
  );
}
