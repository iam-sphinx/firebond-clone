import React from "react";
import { ImArrowRight2 } from "react-icons/im";

interface HelpCardProps {
  title: string;
  description: string;
}

const HelpCard: React.FC<HelpCardProps> = ({ title, description }) => {
  return (
    <div className="w-full h-full rounded-[20px] bg-[#232B35] relative p-6">
      <h1 className="font-semibold text-2xl text-white overflow-hidden text-ellipsis mb-5">
        {title}
      </h1>
      <div className="h-0 left-0 right-0 absolute border border-[#75757566] " />
      <h1 className="mt-10 font-medium text-base text-[#D9D9D9D9]">
        {description}
      </h1>

      {/* <button className="absolute bottom-[30px] text-sm text-[#D8D8D8] font-medium">
        <div className="flex gap-[7.61px] items-center justify-center">
            <h1>View all</h1>
            <ImArrowRight2/>
        </div>
      </button> */}
    </div>
  );
};

export default HelpCard;
