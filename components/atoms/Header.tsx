import React from "react";
import linkWallet from "@/utils/authentication/linkWallet";
import router from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
let data = 0;

declare var window: any;

function handlelogout() {
  localStorage.removeItem("data");
  router.push("/FirstPage");
}
const Header = (props:any) => {
  const [name, setName] = useState("user");
  const [Avatar, setAvatar] = useState("Icons/Avatar.svg");
  function getPuclicURL(user: any) {
    console.log(user.community_admin_avatar);
    const { data } = supabase.storage
      .from("community_admin_avatar")
      .getPublicUrl(`${user.email}`);
    console.log("yeh hai image ki puclic url");
    console.log(data.publicUrl);
    setAvatar(data.publicUrl);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedJsonData = localStorage.getItem("data");
      const jsonData = JSON.parse(storedJsonData ?? "{}");
      if (jsonData != null && jsonData.name) setName(jsonData.name);
      if (jsonData != null && jsonData.community_admin_avatar) {
        getPuclicURL(jsonData);
      }
    }
  }, [name]);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/FirstPage");
  };
  const onWalletLink = linkWallet();
  return (
    <div className="w-full h-[80px] sticky top-0 z-10 bg-[#171C23] border-b border-[#353B43] py-5 px-4">
      <div className="w-full h-full flex justify-end items-center">
        <div className="flex gap-[15px]">
          <button
            type="button"
            className="h-[40px] w-auto px-6 bg-[#313131] rounded-[25px] cursor-pointer"
            onClick={handleLogout}
          >
            <h1 className="text-white font-normal text-base">Logout</h1>
          </button>
          {/* Notifications */}

          {/* <ShowNotifications /> */}

          {/* Profile */}
          <div className="h-[40px] w-auto pr-5 pl-1 rounded-full bg-[#242627] flex gap-[10px] items-center cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/AdminAvatar.svg"
                height={32}
                width={32}
                alt=""
                className="object-contain"
              />
            </div>

            <h1 className="text-base font-normal text-[#777879]">
              Hello, <span className="text-white">{props.username!=undefined?props.username:name}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
