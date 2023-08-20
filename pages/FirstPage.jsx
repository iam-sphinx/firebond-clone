import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import SignupSplit from "./SignupSplit";
import LoginSplit from "./LoginSplit";
import HeaderFirstPage from "@/components/molecules/HeaderFirstPage";
export default function FirstPage() {
  const router = useRouter();
  const [OpenLogin, setOpenLogin] = useState(false);
  const [OpenSignUp, setOpenSignup] = useState(false);
  const [on, setOn] = useState(false);
  function onLoginClick() {
    setOpenLogin(!OpenLogin);
  }
  function onSignUpClick() {
    setOpenSignup(!OpenSignUp);
  }

  return (
    <>
      <Modal
        onClose={() => {
          setOpenLogin(!OpenLogin);
        }}
        open={OpenLogin}
        style={{}}
        BackdropProps={{ onClick: () => setOpenLogin(false) }}
      >
        <div>
          <LoginSplit />
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setOpenSignup(!OpenSignUp);
        }}
        open={OpenSignUp}
        style={{}}
        BackdropProps={{ onClick: () => setOpenSignup(false) }}
      >
        <div>
          <SignupSplit />
        </div>
      </Modal>
      <div className="min-h-screen  relative overflow-x-hidden scrollbar-hide">
        <HeaderFirstPage
          onSignUpClick={onSignUpClick}
          onLoginClick={onLoginClick}
        />
        <div className="w-full h-auto absolute bottom-[70px] -z-10 opacity-40">
          <img
            src="Icons/stars.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full h-auto absolute top-[420px] flex justify-center">
          <img
            src="Icons/frontpageBackground.svg"
            alt=""
            className=" h-full w-full object-cover mix-blend-lighten"
          />
        </div>

        <div className="w-full flex justify-center">
          <div className="relative top-[103px] w-[811px] text-center font-semibold text-[72px] text-[#EAE9EB]">
            <div className="">
            <h1>The Growth</h1>
            <h1 className="relative bottom-4">Platform for Web3</h1>

            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="relative top-[110px] text-center font-normal text-[#A9A6B7] text-3xl w-[597px] h-auto">
            <h1>Firebond enables higher user acquisition, engagement, and retention for DApps</h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <a
            href="https://firebond.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="relative top-[150px] w-[159px] h-[58px] rounded-[10px] border-[1.5px] border-[#FE702A] text-white flex justify-center items-center font-medium text-xl z-10"
              style={{
                background:
                  "linear-gradient(180deg, #000000 -197.62%, #FE702A 1328.57%)",
              }}
            >
              Learn more
            </button>
          </a>
        </div>
      </div>
    </>
    // <>
    //   <Modal
    //     onClose={() => {
    //       setOpenLogin(!OpenLogin);
    //     }}
    //     open={OpenLogin}
    //     style={{}}
    //   >
    //     <div>
    //       <LoginSplit />
    //     </div>
    //   </Modal>
    //   <Modal
    //     onClose={() => {
    //       setOpenSignup(!OpenSignUp);
    //     }}
    //     open={OpenSignUp}
    //     style={{}}
    //   >
    //     <div>
    //       <SignupSplit />
    //     </div>
    //   </Modal>
    //   <div className="bg-[#0c0c0c] h-[100vh] w-[100vw]">
    //     <div className="flex content-center">
    //       <Image
    //         src="/Icons/FireBondIcon.png"
    //         width={200}
    //         height={200}
    //         alt="FireBond"
    //       ></Image>
    //       <button
    //         className="absolute border-[1px] bg-[red] rounded-[15px] h-[30px] w-[100px] my-[20px] mx-[10px] right-[20px]"
    //         onClick={onSignUpClick}
    //       >
    //         sign up
    //       </button>
    //       <button
    //         className="absolute border-[1px] bg-[red] rounded-[15px] h-[30px] w-[100px] my-[20px] mx-[10px] right-[150px]"
    //         onClick={onLoginClick}
    //       >
    //         Log in
    //       </button>
    //     </div>
    //     <div className="text-white flex h-screen justify-center flex-col w-full text-[100px] text-center leading-[1]   ">
    //       <div>
    //         SCALE WEB3
    //         <br /> COMMUNITIES
    //         <span className="text-[red]">
    //           10X <br />
    //           FASTER
    //         </span>
    //       </div>
    //       <div className="text-white text-[30px] m-[20px] text-center leading-[1] ">
    //         Helping web3 communities Win through data and automation
    //       </div>
    //     </div>
    //     {/* <div className="text-white text-[30px] text-center leading-[1]     w-[60vw]">
    //       <h1>Helping web3 communities Win through data and automation</h1>
    //     </div> */}
    //   </div>
    // </>
  );
}
