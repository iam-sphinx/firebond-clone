import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import Image from "next/image";
import SmallMissionCard from "@/components/molecules/SmallMissionCard";
import MissionShareYourFeedback from "./MissionShareYourFeedback";
import { useRouter } from "next/router";
import Link from "next/link";

var page = "";
const content = [
  {
    title: "#Twitter",
    text_color: "text-[#03A9F4]",
    card_Array: [
      {
        title: "Follow on Twitter",
        mission: "Follow us on twitter",
        usdc: "1000",
        page: "/MissionTwitter",
      },
      {
        title: "Write a tweet about Firebond",
        mission:
          "Mission : Write a thoughtful message about firebond on why we rock!...",
        usdc: "1000",
        page: "/MissionTwitter",
      },
    ],
  },
  {
    title: "#Discord",
    text_color: "text-[#6665D2]",
    card_Array: [
      {
        title: "Make Friends",
        mission: "Join discord channel and get veri..",
        usdc: "1000",
        page: "/MissionDiscord",
      },
    ],
  },
  {
    title: "#Community",
    text_color: "text-[#6665D2]",
    card_Array: [
      {
        title: "Be A Champion",
        mission: "Follow firebond twitter and get ..",
        usdc: "1000",
        page: "/MissionOnboardingMisison",
      },
      {
        title: "Feedback",
        mission:
          "Mission: Give your feedback regarding the project, if there any issue .....",
        usdc: "1000",
        page: "./MissionShareYourFeedback",
      },
      {
        title: "Create a video",
        mission:
          "Mission : Create a video demonstrating how to deploy a blockchain validator....",
        usdc: "1000",
        page: "/MissionTechnicalTutorial",
      },

      {
        title: "Design our company digital mascot ",
        mission: "Mission : We want to distribute our NFT to .....",
        usdc: "1000",
        page: "/MissionDigitalMascot",
      },

      {
        title: "Write a kickass blog post for Firebond",
        mission: "Mission : Write a blog piece for firebond.....",
        usdc: "1000",
        page: "./MissionKickassBlogPost",
      },
      {
        title: "Onboard 10 new community members",
        mission: "Mission : This mission is for onboarding .....",
        usdc: "1000",
        page: "/MissionOnboardingNewMembers",
      },
    ],
  },
  {
    title: "#AskMeAnything",
    text_color: "text-[#98EC96]",
    card_Array: [
      {
        title: "Participating in AMA",
        mission: "Earn by participating in AMA...",
        usdc: "1000",
        page: "/MissionAMAQuestion",
      },
      {
        title: "Submit An AMA Question",
        mission: "Mission: Submit your questions regarding the AMA.....",
        usdc: "1000",
        page: "/MissionAMAQuestion",
      },
    ],
  },
];

const MissionTemplatePage = () => {
  const router = useRouter();
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <div className="w-full h-[125px] sticky top-[80px] bg-[#171C23] py-6 z-10 border-b border-[#353B43]">
            <div className="flex gap-[3px] text-[#A6A6A6] font-normal text-base mb-2  ml-6">
              <Link href="/MissionMain" className="inline">
                Mission
              </Link>
              /<div className="inline text-[white] font-[600]">Template</div>
            </div>
            <div className="w-full px-6 flex justify-between">
              <h1 className="text-white font-semibold text-2xl">Templates</h1>
              <button className="h-[33px] w-[95px] flex justify-center items-center border border-[#757575] rounded-lg">
                <div className="flex gap-[5.46px]">
                  <Image src="Icons/add.svg" alt="" height={16} width={16} />
                  <button
                    onClick={() => router.push("/MissionCreationFormPage")}
                    className="font-medium text-sm text-[#757575]"
                  >
                    Create
                  </button>
                </div>
              </button>
            </div>
          </div>

          {/* Main Section */}
          <div className="w-full h-auto flex justify-center items-center">
            <div className="mt-[40px] w-auto">
              {content.map((item, index) => {
                return (
                  <div key={index}>
                    <h1
                      className={`${item.text_color} font-medium text-base w-auto mb-6 `}
                    >
                      {item.title}
                    </h1>
                    <div className="max-w-[1140px] flex flex-wrap gap-6 mb-6">
                      {item.card_Array.map((card, index) => {
                        return (
                          <div key={index}>
                            <SmallMissionCard
                              missionDiscription={card.mission}
                              missionTitle={card.title}
                              usdc={card.usdc}
                              page={card.page}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTemplatePage;
