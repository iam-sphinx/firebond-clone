import React, { useEffect } from "react";
import { useState } from "react";
import MemberXpDetailsForTopContributor from "../atoms/MemberXpDetailsForTopContributor";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { VscBlank, VscDash } from "react-icons/vsc";
import { platform } from "os";
import Link from "next/link";
import Image from "next/image";
import { PlatformIconWithBox } from "../atoms/PlatformIconWithBox";
import { supabase } from "@/utils/supabaseClient";
//function to get the list of members from supabase database from table leaderboard

var wallet_id = "";

export default function MemberListCardMissionPage() {
  const [players, setPlayers] = useState([]);
  if (typeof window !== "undefined") {
    const storedJsonData = localStorage.getItem("data");
    // console.log(storedJsonData)
    const jsonData = JSON.parse(storedJsonData ?? "{}");
    wallet_id = jsonData.wallet_id;
    console.log(jsonData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
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
      console.log("members hain", rowData.Members);
      rowData.Members.sort((a:any,b:any)=>{
        return b.missions_completed.length - a.missions_completed.length;
      })
      console.log("after sorting",rowData.Members)
      setPlayers(rowData.Members);
    } catch (error) {
      console.error(error);
    }
  }

  //return memberList;

  return (
    <div className="h-full w-full bg-[#232B35] rounded-[20px]">
      <div className="h-full w-full p-6">
        <div className="h-full w-full">
          <h1 className="text-2xl font-medium text-white mb-6">Members</h1>
          <div className="grid grid-cols-9 mb-[15px]">
            <h1 className="text-base font-normal text-[#AEABD8] col-span-3">
              Profile ID
            </h1>
            <h1 className="text-base font-normal text-[#AEABD8] col-span-3">
              Completed missions
            </h1>
            <h1 className="text-base font-normal text-[#AEABD8] col-span-2">
              Platform
            </h1>
            <h1 className="text-base font-normal text-[#AEABD8] ">XP</h1>
          </div>

          <div className="max-h-[550px] overflow-auto scrollbar-hide">
            {players &&
              players.map((item: any, index: any) => {
                return (
                  <div className="grid grid-cols-9 mb-[19.72px]" key={index}>
                    <div className="col-span-3 ">
                      <div className="flex gap-[10.8px] items-center">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src="/Icons/profileTemplate.jpg"
                            height={40}
                            width={40}
                            alt="ProfileImg"
                            className="object-cover"
                          />
                        </div>

                        <h1 className=" text-[18px] leading-[24px] font-normal font-open-sans text-white">
                          @{item.User_name}
                        </h1>
                      </div>
                    </div>
                    <div className="col-span-3">
                      {item.missions_completed.length}
                    </div>
                    <div className="col-span-2">
                      <div className="flex gap-[7px]">
                        {/* {item.platform.map((item: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className={`h-10 w-10 rounded-[10px] flex items-center justify-center ${
                                item === "Discord" && "bg-[#6359E9]"
                              } ${item === "Twitter" && "bg-[#64CFF6]"}`}
                            >
                              <Image
                                src={
                                  item === "Discord"
                                    ? "Icons/Discord.svg"
                                    : "Icons/twitch.svg"
                                }
                                height={item === "Discord" ? 14.78 : 16.25}
                                width={20}
                                alt=" "
                              />
                            </div>
                          );
                        })} */}
                      </div>
                    </div>
                    <div className="">{item.current_xp}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Footer */}
      {/* <div className="h-[51.5px] w-full border-t border-[#353B43] flex justify-end items-center px-[79px]">
        <button className="font-normal text-sm text-[#D9D9D9]">
          Show next 100
        </button>
      </div> */}
    </div>

    // username ,previous xp,current cp,missions completed.
    // <>
    // {/* <div className="absolute h-[750px] w-[1150px] bg-[#242B35] rounded-[20px]  overflow-y-auto scrollbar">
    //   <div className="absolute text-[#FFFFFF] font-[General Sans] font-[500] text-[24px] left-[24px] top-[22px]  ">
    //     Members
    //   </div> */}
    // {/* <div className="absolute text-[#D9D9D9] font-[General Sans] font-[400] text-[14px] left-[592px] top-[32px]  ">Show All</div> */}

    // {/* <div>
    //   <div className="absolute text-[#A6A6A6] text-[12px] font-[400] font-[General Sans] top-[85px] left-[24px]">
    //     Profile ID
    //   </div>
    //   <div className="absolute text-[#A6A6A6] text-[12px] font-[400] font-[General Sans] top-[85px] left-[400px]">
    //     completed missions
    //   </div>
    //   <div className="absolute text-[#A6A6A6] text-[12px] font-[400] font-[General Sans] top-[85px] left-[800px]">
    //     platform
    //   </div>
    //   <div className="absolute text-[#A6A6A6] text-[12px] font-[400] font-[General Sans] top-[85px] left-[1000px]">
    //     XP
    //   </div>
    // </div>

    //     <div className="absolute top-[90px] left-[15px] w-[auto]">
    //       <ul>{ele}</ul>
    //     </div>

    //   </div>
    //   <div className="relative bg-[#242B35] border-t-[1px] w-[1150px] h-[50px] border-[#353B43] top-[700px] rounded-b-[20px]">
    //   <Link
    //       href="/"
    //       className="absolute top-[15px] right-[70px] text-[#D9D9D9]"
    //     >
    //       Show next 100
    //     </Link>
    //     </div> */}
    // // </>
  );
}

// let list=member_List();

//   {
//     name: "Player1",
//     xp: 10,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player2",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord","Twitter"],
//   },
//   {
//     name: "Player3",
//     xp: 4,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player1",
//     xp: 4,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Twitter"],
//   },
//   {
//     name: "Player2",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player3",
//     xp: 1,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Twitter",]
//   },
//   {
//     name: "Player1",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Twitter","Discord"]
//   },
//   {
//     name: "Player2",
//     xp: 5,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Twitter"],
//   },
//   {
//     name: "Player3",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player1",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player2",
//     xp: 4,
//     missionsCompleted: 0,
//     previousXP: 4,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player3",
//     xp: 5,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player1",
//     xp: 3,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player2",
//     xp: 1,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player3",
//     xp: 1,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player1",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player2",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player3",
//     xp: 1,
//     missionsCompleted: 0,
//     previousXP: 5,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player1",
//     xp: 1,
//     missionsCompleted: 0,
//     previousXP: 5,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player2",
//     xp: 0,
//     missionsCompleted: 0,
//     previousXP: 2,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player3",
//     xp: 0,
//     missionsCompleted: 0,
//     previousXP: 1,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player1",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player2",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
//   {
//     name: "Player3",
//     xp: 2,
//     missionsCompleted: 0,
//     previousXP: 0,
//     platform: ["Discord"],
//   },
// ]);
