import React from "react";
import Image from "next/image";
import { AiOutlineStar,AiFillStar } from "react-icons/ai";
interface MissionMainCardProps {
  profileUrl1 :string,
  profileUrl2 :string,
  profileUrl3 : string,
  profileUrl4 : string,
  submission : number,
  daysLeft: any,
  usdc: number,
  title: string,
  tags:[],
  xp:number
}



const MissionMainCard: React.FC<MissionMainCardProps> = ({
  daysLeft,
  profileUrl1,
  profileUrl2,
  profileUrl3,
  profileUrl4,
  submission,
  usdc,
  title,
  tags,
  xp,
}) => {
  return (
    <div className="h-[218px] w-[381px] bg-[#232B36] rounded-[20px]">
      <div className="p-6">
        <div className="flex justify-between ">
          <h1 className="font-semibold text-[20px] font-['General Sans'] font-[600] text-white break-words">
            {(title!=null||title==="")?title:"Mission title"}
          </h1>
          {usdc>0&&(<button className="px-[5px] h-[30px] bg-[#FE702A5C]/[36%] rounded-[8px] ">
            <h1 className=" font-bold text-[10px] text-center bg-gradient-to-r from-[#FD241C] to-[#FE702A] bg-clip-text text-transparent">
              {usdc}{" "}USDC
            </h1>
          </button>)}
          
        </div>
        {/* for tags */}
        <div className="flex gap-[6.13px]">
        {(tags!=null&&tags.length>0)? tags.map((item:any, index) => {
                      return (
                        <div key={index} className="inline-flex gap-[4.33px] bg-[#363C44] px-[5px] py-[5px] mt-[] rounded-[2.0348px] justify-center items-center">
                        
                        <h1 className=" text-[12px] font-[400] text-white font-open-sans">
                          {item.title}
                        </h1>
                      </div>
                       
                      );
                    }):"NoTags"}
         
        </div>
        <hr className="mt-[60px] border-[#353B43]" />
        <div className="mt-[15px] flex gap-[20px] justify-between">
        
          <div className="flex flex-col  gap-[6.5px]">
           
            <h1 className="text-[#757575] font-normal text-xs">
               Total Submissions
            </h1>
            <h1 className="text-[white] font-normal text-xs">
               {submission}
            </h1>
          </div>
          <div className="flex flex-col  gap-[6.5px]">
           
            <h1 className="text-[#757575] font-normal text-xs">
                Deadline In
            </h1>
            <h1 className="text-[white] font-normal text-xs">
                {daysLeft}
            </h1>
         </div>
         <div className="flex flex-col  gap-[6.5px]">
           
            <h1 className="text-[#757575] font-normal text-xs">
                Xp
            </h1>
            <h1 className="text-[white] font-normal text-xs">
              <span>
              <AiFillStar width={14} height={14} color="#FF8D00" className="inline"  /> {xp}
              </span>
                
            </h1>
         </div>

        </div>
      </div>
    </div>
  );
};

export default MissionMainCard;
