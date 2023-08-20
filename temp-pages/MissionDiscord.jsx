import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import NavbarMissionOnboarding from "@/components/molecules/NavbarMissionOnboarding";
import BeAchamp from "@/components/molecules/BeAchamp";
import MissionStepsCard from "@/components/molecules/MissionStepCard";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import ShareFeedbackCard from "@/components/molecules/ShareFeedbackCard";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
import { HiPencil, HiRocketLaunch } from "react-icons/hi2";
function missionCheck(k: string) {
  fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      authorization: `Bearer ${k}`,
    },
  })
    .then((result) => result.json())
    .then(async (response) => {
      console.log(response);
      let data = response;
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        //server id
        if (data[i].id == "882790547252959498") {
          flag = true;
          break;
        }
      }
      if (flag) {
        localStorage.setItem("discordMission", "true");
      }
    });
}

function MissionDiscord() {
  if (typeof window !== "undefined") {
    let k = localStorage.getItem("accessToken") || "";

    missionCheck(k);
  }
  const title = "Discord Mission";
  const description = `Get a Discord Role and introduce yourself to the community
GUIDE 📚
1. Join our discord if you haven't done that yet.
2. You'll then get a verified role.
3. Write a message telling us who you are and what your top skills you have!
4. Post it in the #introduce-yourself channelDo all this and then you'll have access to the Quests that require a role.
SUBMISSION 📝
This quest will auto-validate when you claim it.`;
  const tags = ["onboarding"];
  const missionSteps = [
    "Join our Discord",
    "Join on Discord Channel and get verified",
    "Start a conversation ",
    "Start a conversation on any discord channel you like containing at least 10 characters",
  ];
  const xp = 1000;
  const submission_type = { type: "empty" };
  const coinType = "USDC";
  const [file, setFile] = useState("");

  function handleFileSelect(e: any) {
    setFile(e.target.value);
  }
  function handleUpload() {}
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          {/* Edit Section */}
          <NavbarMissionOnboarding
            title={title}
            description={description}
            heading1={missionSteps[0]}
            heading2={missionSteps[1]}
            subheading1={missionSteps[2]}
            subheading2={missionSteps[3]}
            submission_type={submission_type}
            xp={xp}
          />

          {/* Main Content Section */}
          <div className="mt-6 flex justify-center items-center">
            <div className="flex">
              <div className="text-[#ffffff] ml-[20px] mb-[50px] w-[auto]  border-[1px] border-[#353B43] rounded-[20px]">
                <Image
                  src="Icons/TechnicalBg.svg"
                  width={800}
                  height={1}
                  alt="kjdfhah"
                  className="mx-[10px] my-[10px] mb-[40px]"
                />
                <div className="font-semibold text-2xl text-white mx-3">
                  Discord Mission
                </div>
                <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
                  <pre className="overflow-auto no-scrollbar">
                    {description}
                  </pre>
                  <div className="mt-[60px] mb-3">
                    <MissionStepsCard
                      heading1="Join our Discord"
                      descp1="Join Discord Channel and get verified"
                      heading2="Start a conversation"
                      descp2="Start a conversation on any discord channel you like containing at least 10 characters"
                    />
                  </div>
                </div>
              </div>
              <div className="text-[#ffffff] w-[auto] h-[auto] ml-[20px]">
                <BeAchamp
                  title="Discord Mission for Firebond"
                  tags={["Writing", "Marketing"]}
                  val={xp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="grid grid-cols-[auto,auto] gap-0  bg-[#171C23] grid-rows-[71px,100px,auto] h-[1500px] w-full md:grid-cols-[auto,1fr]">
    //   <div className="row-span-3 border-r-[1px] border-r-[#353B43]">
    //     <Sidebar />
    //   </div>
    //   <div className="border-b-[1px] border-b-[#353B43]">
    //     <Header />
    //   </div>
    //   <div className="">
    //   <NavbarMissionOnboarding
    //         title={title}
    //         description={description}
    //         heading1={missionSteps[0]}
    //         heading2={missionSteps[1]}
    //         subheading1={missionSteps[2]}
    //         subheading2={missionSteps[3]}
    //       />
    //   </div>
    //   <div className="flex">
    //     <div className="text-[#ffffff] ml-[20px] mb-[10px] w-[auto]  border-[1px] border-[#353B43] rounded-[20px]">
    //       <Image
    //         src="/MissionPageBanner.png"
    //         width={800}
    //         height={1}
    //         alt="kjdfhah"
    //         className="mx-[10px] my-[10px]"
    //       />
    //       <div className="font-semibold text-2xl text-white mx-3">
    //         Discord Mission
    //       </div>
    //       <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
    //         <pre className="overflow-auto no-scrollbar">{description}</pre>
    //         <div className="my-[60px]">
    //           <MissionStepsCard
    //             heading1={"Join our Discord"}
    //             descp1={missionSteps[0]}
    //             heading2="Start a conversation"
    //             descp2={missionSteps[1]}
    //           />
    //         </div>
    //       </div>

    //     </div>
    //     <div className="text-[#ffffff] w-[auto] h-[auto] ml-[20px]">
    //         <BeAchamp
    //           title="Discord Mission for Firebond"
    //           tags={["Writing", "Marketing"]}
    //           val="2.9"
    //         />
    //       </div>
    //   </div>
    // </div>
  );
}

export default RouteGuardAdmin(MissionDiscord);
