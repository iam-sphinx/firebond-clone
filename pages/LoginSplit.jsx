import router from "next/router";
import React, { useState } from "react";
import LoginSection from "./LoginSection";
import Modal from "@material-ui/core/Modal";

const LoginSplit = () => {
  const [OpenAdmin, setOpenAdmin] = useState(false);
  function handleAdminClick() {
    setOpenAdmin(!OpenAdmin);
  }

  return (
    <>
      <Modal
        onClose={() => {
          setOpenAdmin(!OpenAdmin);
        }}
        open={OpenAdmin}
        style={{}}
        BackdropProps={{onClick: ()=>setOpenAdmin(false)}}

      >
        <div>
          <LoginSection />
        </div>
      </Modal>
      <div className="flex justify-center items-center h-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-[#232B35] h-auto w-[485px] shadow-[6px,6px,20px,rgba(15,15,15,0.26)] rounded-md">
          <div className="w-full h-[54px] border-b border-[#353B43] flex items-center pl-[30px]">
            <h1 className="text-[#AEABD8] font-open-sans font-normal text-[13.1px] leading-[17.68px] tracking-[0.16em]">
              LOGIN AS
            </h1>
          </div>
          <div className="w-full h-auto pr-[50px] pl-[30px] pb-[29px] pt-[37px]">
            <button
              onClick={handleAdminClick}
              className="w-full h-[45px] bg-white border border-[#EAEAEA] flex justify-center items-center rounded-[9px] mb-6"
            >
              <div className="flex gap-[14px] items-center justify-center">
                <h1 className="font-medium text-xs text-black">
                  Community Admin
                </h1>
              </div>
            </button>
            {/* <button
              onClick={() => router.push("/UserLoginSignupPopup")}
              className="w-full h-[45px] bg-white border border-[#EAEAEA] flex justify-center items-center rounded-[9px]"
            >
              <div className="flex gap-[14px] items-center justify-center">
                <h1 className="font-medium text-xs text-black">User</h1>
              </div>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSplit;
