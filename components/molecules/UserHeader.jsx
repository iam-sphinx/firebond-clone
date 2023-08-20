import React from "react";
import router from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";



declare var window: any;
let username = "";
const UserHeader = () => {
  const [name, setName] = useState("user");

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const storedJsonData = localStorage.getItem("user_wallet_id");
        const jsonData = storedJsonData;
        if (jsonData != null && jsonData) {
          const { data, error } = await supabase
            .from("userdata")
            .select("*")
            .eq("wallet_id", jsonData);
           if (data && data.length > 0) {
             const firstItem = data[0]; 
             const name = firstItem.name;
             console.log(name)
             setName(name);
           }
        }
      }
    };

    fetchData();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/FirstPage");
  };
  return (
    <div className="w-full h-[80px] bg-[#171C23] border-b border-[#353B43] py-5 px-4">
      <div className="w-full h-full flex justify-end items-center">
        <div className="flex gap-[15px]">
          <button
            type="button"
            className="h-[40px] w-auto px-6 bg-[#313131] rounded-[25px] cursor-pointer"
            onClick={handleLogout}
          >
            <h1 className="text-white font-normal text-base">Logout</h1>
          </button>
          <div className="h-[40px] w-auto px-5  rounded-full bg-[#242627] flex gap-[10px] items-center  cursor-pointer">
            <h1 className="text-base font-normal text-[#777879]">
              Hello, <span className="text-white">{name}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
