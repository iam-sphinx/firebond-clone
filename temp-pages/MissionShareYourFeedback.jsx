import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import NavbarMissionOnboarding from "@/components/molecules/NavbarMissionOnboarding";
import BeAchamp from "@/components/molecules/BeAchamp";
import MissionStepsCard from "@/components/molecules/MissionStepCard";
import Image from "next/image";
export default function MissionShareYourFeedback() {
  const title = "Share Your Feedback";
  const description =
    "Share your feedback about our product on Product Hunt and upload a screenshot.";
  const tags = ["writing", "marketing"];
  const missionSteps = [
    "Write Feedback about product",
    "Submit Mission",
    "           ",
    "Share the proof of work",
  ];
  const xp = 1000;
  const coinType = "USDC";
  const submissionType = { type: "feedback" };
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <NavbarMissionOnboarding
            title={title}
            description={description}
            heading1="Follow our Twitter Handle"
            heading2="Submit your work"
            subheading1="Follow us"
            subheading2="Share the proof of work"
            submission_type={submissionType}
            xp={xp}
          />

          <div className="mt-6 flex justify-center items-center">
            <div className="flex">
              <div className="text-[#ffffff] ml-[20px] mb-[50px] w-[auto]  border-[1px] border-[#353B43] rounded-[20px]">
                <Image
                  src="/MissionPageBanner.png"
                  width={800}
                  height={1}
                  alt="kjdfhah"
                  className="mx-[10px] my-[10px]"
                />
                <div className="mx-[30px] my-[30px]">
                  <div className="font-[600] text-[24px] text-[#ffffff]">
                    Share your feedback
                  </div>
                  <div className="font-[500] text-[16px] text-[#D9D9D9]">
                    Share your feedback about our product on Product Hunt and
                    upload a screenshot.
                  </div>
                </div>
                <div className="mx-[30px] my-[30px]">
                  <MissionStepsCard
                    className="mx-[20px]"
                    heading1="Follow our Twitter Handle"
                    heading2="Submit your work"
                    descp1="Follow us"
                    descp2="Share the proof of work"
                  />
                </div>
              </div>

              <div className="mx-[30px] my-[30px]">
                <BeAchamp
                  val={xp}
                  tags={tags}
                  title="Share your feedback for Firebond"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
