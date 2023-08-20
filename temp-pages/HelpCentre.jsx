import Header from "@/components/atoms/Header";
import HelpCard from "@/components/molecules/HelpCard";
import NavbarHelpCentre from "@/components/molecules/NavbarHelpCentre";
import Sidebar from "@/components/molecules/Sidebar";
import React from "react";

export default function HelpCentre() {
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          {/* Introduction */}
          <div className="w-full h-[115px] border-b border-[#253B43] flex items-center justify-start px-6 mb-[33px] sticky top-[80px] z-10 bg-[#171C23]">
            <div className="w-full">
              <h1 className="mb-2 font-semibold text-2xl text-white">
                Help center
              </h1>
              <h2 className="font-medium text-sm text-[#A6A6A6]">
                Get the answers you need for any issues
              </h2>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-full h-auto px-6">
            <div className="w-full h-auto flex flex-wrap gap-6">
              <div className="w-[346px] h-[355px]">
                <HelpCard title="hello" description="hello" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
