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
import { BsDash } from "react-icons/bs";

export default function MemberListCardMissionPage(props) {
  const cards = props.cards;
  //DO NOT REMOVE BELOW COMMENT
  
  // const [players, setPlayers] = useState([
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
  // ]);
  // const sortedPlayers = [...players].sort((a, b) => (a.xp - a.previousXP) - (b.xp - b.previousXP));

  // useEffect(()=>{
  //   setPlayers(sortedPlayers)
  // },[])

  return (
    <div className="h-full w-full bg-[#232B35] rounded-[20px]">
      <div className="h-full w-full p-6">
        <div className="h-full w-full">
          <h1 className="text-2xl font-medium text-white mb-6">Top contributors</h1>
          <div className="grid grid-cols-9 mb-[15px]">
            <h1 className="text-base font-normal text-[#AEABD8] col-span-3">
              Ranking
            </h1>
            <h1 className="text-base font-normal text-[#AEABD8] col-span-3">
              Completed missions
            </h1>
            <h1 className="text-base font-normal text-[#AEABD8] col-span-2">
              Platform
            </h1>
            <h1 className="text-base font-normal text-[#AEABD8] ">xP</h1>
          </div>

          <div className="max-h-[550px] overflow-auto scrollbar-hide">
            {cards && cards.map((item : any, index : any) => {
              return (
                <div className="grid grid-cols-9 mb-[19.72px]" key={index}>
                  <div className="col-span-3 ">
                    <div className="flex items-center">
                      {/* {item.xp > item.previousXP ? (
                        <Image
                          src="Icons/greenUp.svg"
                          alt=""
                          height={3.72}
                          width={7.45}
                        />
                      ) : item.xp < item.previousXP ? (
                        <Image
                          src="Icons/redDown.svg"
                          alt=""
                          height={4}
                          width={8}
                        />
                      ) : (
                        <Image
                          src="Icons/dash.svg"
                          height={14}
                          width={8}
                          alt=""
                        />
                      )} */}

                      <h1 className="text-lg font-medium text-white ml-[9.68px] mr-4">
                        {index + 1}
                      </h1>

                      <div className="h-10 w-10 overflow-hidden rounded-full mr-[10.8px]">
                        <Image
                          src="/Icons/profileTemplate.jpg"
                          height={40}
                          width={40}
                          alt=""
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
                    {/* <div className="flex gap-[7px]">
                      {item.platform.map((item,index)=>{
                        return (
                          <div key={index} className={`h-10 w-10 rounded-[10px] flex items-center justify-center ${item === "Discord" && "bg-[#6359E9]"} ${item === "Twitter" && "bg-[#64CFF6]"}`}>
                            <Image src={item === "Discord" ? "Icons/Discord.svg" : "Icons/Twitter.svg"} height={item === "Discord" ? 14.78 : 16.25} width={20} alt=" "/>
                          </div>
                        )
                      })}
                    </div> */}
                  </div>
                  <div className="">{item.current_xp}</div>
                </div>
              );
            })}
          </div>

      </div>
    </div>
          {/* Footer
          <div className="h-[51.5px] w-full border-t border-[#353B43] flex justify-end items-center px-[79px]">
            <button className="font-normal text-sm text-[#D9D9D9]">Show next 100</button>
          </div> */}
        </div>

   
  );
}
