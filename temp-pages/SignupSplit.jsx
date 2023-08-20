import Image from "next/image";
import router from "next/router";
import React, { useState } from "react";
const SignupSplit = () => {
  return (
    <>
      <div className="flex justify-center items-center h-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-[#232B35] h-auto w-[485px] shadow-[6px,6px,20px,rgba(15,15,15,0.26)] rounded-md">
          <div className="w-full h-[54px] border-b border-[#353B43] flex items-center pl-[30px]">
            <h1 className="text-[#AEABD8] font-open-sans font-normal text-[13.1px] leading-[17.68px] tracking-[0.16em]">
              SIGNUP AS
            </h1>
          </div>
          <div className="w-full h-auto pr-[50px] pl-[30px] pb-[29px] pt-[37px]">
            <button
              onClick={() => router.push("/CommunitySetupScreen")}
              className="w-full h-[45px] bg-white border border-[#EAEAEA] flex justify-center items-center rounded-[9px] mb-6"
            >
              <div className="flex gap-[14px] items-center justify-center">
                <h1 className="font-medium text-black text-xs">
                  Community Admin
                </h1>
              </div>
            </button>
            {/* <button
              onClick={() => router.push("/UserLoginSignupPopup")}
              className="w-full h-[45px] bg-white border border-[#EAEAEA] flex justify-center items-center rounded-[9px] "
            >
              <div className="flex gap-[14px] items-center justify-center">
                <h1 className="font-medium text-black text-xs">User</h1>
              </div>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupSplit;
