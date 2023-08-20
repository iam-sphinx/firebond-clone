import Image from "next/image";
import React, { useState } from "react";

import WalletAuth from "@/utils/authentication/walletAuth";
import GoogleSignInButton from "@/utils/authentication/googleAuth";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { Modal } from "@material-ui/core";
import NoAccountPopup from "./NoAccountPopup";
import InstallMetamaskPopup from "./InstallMetamaskPopup";

const LoginSection = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();
  const onConnect = WalletAuth();
  const onSign = GoogleSignInButton();
  const [OpenMagic, setOpenMagic] = useState(false);
  function onMagicClick() {
    setOpenMagic(!OpenMagic);
  }
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
        try {
          const { data, error } = await supabase
            .from("community_data")
            .select("*")
            .eq("wallet_id", accounts[0])
            .single();
          console.log(data);
          if (data != null) {
            await window.localStorage.setItem("data", JSON.stringify(data));
            router.push("/WelcomeScreen1");
          } else {
            console.log("Please Signup");
            handleLoginNoAccountClick();
          }
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install my MetaMask");
      Metamask();
    }
  };

  const [magicLink, setMagicLink] = useState("");
  const [NoAccount, setNoAccount] = useState(false);
  function handleLoginNoAccountClick() {
    setNoAccount(!NoAccount);
  }
  const [InstallMeta, setMetamask] = useState(false);
  function Metamask() {
    setMetamask(!InstallMeta);
  }
  return (
    <>
      <Modal
        onClose={() => {
          setMetamask(!InstallMeta);
        }}
        open={InstallMeta}
        style={{}}
      >
        <div>
          <InstallMetamaskPopup />
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setNoAccount(!NoAccount);
        }}
        open={NoAccount}
        style={{}}
      >
        <div>
          <NoAccountPopup />
        </div>
      </Modal>
      <div className="flex justify-center items-center h-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <div className="bg-[#232B35] h-auto w-[485px] shadow-[6px,6px,20px,rgba(15,15,15,0.26)] rounded-md">
          <div className="w-full h-[54px] border-b border-[#353B43] flex items-center pl-[30px]">
            <h1 className="text-[#AEABD8] font-open-sans font-normal text-[13.1px] leading-[17.68px] tracking-[0.16em]">
              LOGIN HERE
            </h1>
          </div>
          <div className="w-full h-auto pr-[50px] pl-[30px] pb-[29px] pt-[37px]">
            {/*Dont remove these comments*/}
            {/* <div className="h-auto w-full">
              <h1 className="text-white font-medium text-base mb-[9px]">
                Magic Link
              </h1>
            </div> */}
            <div className="flex justify-center items-center">
              <Image
                src={"/MetaMask.png"}
                alt="My Image"
                width={200}
                height={200}
              />
            </div>
            {/* <div className="w-full h-[45px] bg-[#2E363F] rounded-lg overflow-hidden text-ellipsis mb-[35px]">
              <input
                className="text-[#FFFFFFA3] text-black font-normal text-sm w-full h-full px-[18px] pt-[10px] pb-4 outline-none overflow-hidden text-ellipsis"
                placeholder="Enter your magic link"
                value={magicLink}
                onChange={(e) => {
                  setMagicLink(e.target.value);
                }}
              />
            </div> */}
            {/* <div className="w-full h-[17px] flex items-center justify-center mb-[37px]">
              <h1 className="text-[#919191] text-[18px] leading-[27px] ">
                - OR -
              </h1>
            </div> */}
            {/* <button
              className="w-full h-[45px] bg-white border border-[#EAEAEA] flex justify-center items-center rounded-[9px] mb-6"
              onClick={() => {
                onSign();
              }}
            >
              <div className="flex gap-[14px] items-center justify-center">
                <Image src="Icons/Google.svg" height={25} width={25} alt="" />{" "}
                <h1 className="font-medium text-xs text-black">
                  Sign up with Google
                </h1>
              </div>
            </button> */}
            <button
              className="w-full h-[45px] bg-white border border-[#EAEAEA] flex justify-center items-center rounded-[9px]"
              onClick={() => {
                connectWallet();
              }}
            >
              <div className="flex gap-[14px] items-center justify-center">
                <Image src="Icons/Wallet.svg" height={25} width={25} alt="" />{" "}
                <h1 className="font-medium text-xs text-black">
                  Login with Wallet
                </h1>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
