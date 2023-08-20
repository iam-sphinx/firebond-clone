import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TopContributorAnalyticsScreen = () => {
  const [sortedGuys, setSortedGuys] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    var wallet_id = "";
    if (typeof window !== "undefined") {
      const storedJsonData = localStorage.getItem("data");
      // console.log(storedJsonData)
      const jsonData = JSON.parse(storedJsonData ?? "{}");
      wallet_id = jsonData.wallet_id;
      console.log(jsonData);
    }
    try {
      // Fetch the community data row using the user's wallet_id as a filter condition
      const { data: rowData, error } = await supabase
        .from("community_data")
        .select("*")
        .eq("wallet_id", wallet_id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      console.log("members hain ashu", rowData.Members);
      rowData.Members.sort((a: any, b: any) => {
        return b.current_xp - a.current_xp;
      });
      setSortedGuys(rowData.Members);
    } catch (error) {
      console.error(error);
    }
  }

  // Add path to default image here
  const icon = "/Icons/funkyPic.svg";
  return (
    <div className="h-full w-full">
      <h1 className="px-6 pt-6 text-white text-2xl font-medium mb-[30px]">
        Top contributors
      </h1>
      <div className="w-full h-auto">
        {sortedGuys != null &&
          sortedGuys.map((item , index) => {
            return (
              <div
                key={index}
                className="flex px-6 justify-between h-[83px] hover:bg-[#D9D9D90F] items-center cursor-pointer"
              >
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={icon}
                      height={48}
                      width={48}
                      className="object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <h1 className="font-medium text-white text-base mb-[5px]">
                      {item.User_name}
                    </h1>
                    <button className="w-[46px] h-[19px] rounded-[9.5px] bg-[#FFFFFF5C] flex justify-center items-center text-white font-medium text-xs">
                      {index + 1}
                    </button>
                  </div>
                </div>
                <div>
                  <h1 className="text-white font-medium text-base">
                    {item.current_xp} XP
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopContributorAnalyticsScreen;
