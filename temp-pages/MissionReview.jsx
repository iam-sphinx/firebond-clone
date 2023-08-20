import Header from "@/components/atoms/Header";
import NavbarMissionReview from "@/components/molecules/NavbarMissionReview";
import Sidebar from "@/components/molecules/Sidebar";
import React from "react";

export default function MissionReview() {
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <div className="w-full h-full">
            <NavbarMissionReview />
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="grid grid-cols-[auto,auto] gap-0  bg-[#171C23] grid-rows-[71px,100px,auto] h-full w-full md:grid-cols-[auto,1fr]">
    //     <div className="row-span-3 border-r-[1px] border-r-[#353B43]">
    //       <Sidebar />
    //     </div>
    //     <div className="border-b-[1px] border-b-[#353B43]">
    //       <Header />
    //     </div>
    //     <div className="">
    //       <NavbarMissionReview />
    //     </div>
    //   </div>
    // </div>
  );
}
