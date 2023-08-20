import React from "react";
import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/atoms/Header";
import MemberListCardMissionPage from "../components/molecules/MemberListCardMissionPage";
import { BsChevronDown } from "react-icons/bs";

import Image from "next/image";

import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
function MemberScreen() {
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <div className="h-full w-full p-6">
            <div className="w-full h-full">
              <h1 className="text-white font-semibold text-2xl mb-2">
                Community members
              </h1>
              <div className="flex justify-between items-center mb-9">
                <h3 className="text-[#A6A6A6] font-normal text-base">
                  Check who’s ahead of everyone
                </h3>

                <button className="border border-[#757575] rounded-lg py-[7px] px-[11px]">
                  <div className="flex gap-[8.28px]">
                    <h1 className="text-[#757575] font-medium text-sm">
                      Last week
                    </h1>
                    <Image
                      src="Icons/Arrow_Down.svg"
                      height={3.72}
                      width={7.45}
                      alt=""
                    />
                  </div>
                </button>
              </div>
              <MemberListCardMissionPage />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <div className='grid grid-cols-[auto,auto]   bg-[#171C23] grid-rows-[71px,auto] h-[1000px] w-[1450px]    md:grid-cols-[auto,1fr]'>
    //     {/* sidebar */}
    //     <div className='row-span-3 border-r-[1px] border-r-[#353B43]'>
    //         <Sidebar/>
    //     </div>
    //     {/* ----- */}

    //     {/* header */}
    //     <div className='border-b-[1px] border-b-[#353B43]'>
    //         <Header/>
    //     </div>
    //     {/* --header-- */}

    //     <div className='ml-[10px] h-[auto] w-[auto] bg-[#171C23]'>
    //         <div className='text-[#FFFFFF] font-[600] text-[24px] my-[10px] mx-[20px]'>Community members</div>

    //         <div className='flex mx-[20px] mb-[30px] w-[auto] bg-[#171C23] '>
    //           <p className='text-[#A6A6A6] font-[400] text-[16px]'>check who is ahead of evryone</p>
    //           <button className='absolute right-[20px] flex items-center justify-evenly mb-[10px] border-[1px] border-[#757575]  text-[#757575] rounded-[8px] w-[109px] h-[33px]'>Last Week <BsChevronDown color='#757575' size={15} className=''/></button>

    //         </div>
    //         <div className=''>
    //            <MemberListCardMissionPage/>
    //           </div>

    //     </div>

    //   </div>
    // </>
  );
}

export default RouteGuardAdmin(MemberScreen);
