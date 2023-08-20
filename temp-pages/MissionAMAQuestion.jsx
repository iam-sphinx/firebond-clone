import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import NavbarMissionOnboarding from "@/components/molecules/NavbarMissionOnboarding";
import BeAchamp from "@/components/molecules/BeAchamp";
import MissionStepsCard from "@/components/molecules/MissionStepCard";
import Image from "next/image";
import Link from "next/link";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
const title = "Submit An AMA Question";
const description = `To complete this mission, please complete the survey form in the link:
  https://www.notion.so/firebond/Popular-quests-04e7fe68c68a4c94bf878aaddb5fd1ff?pvs=4
  
  Then input the secret code provided at the end of the form.`;
const tags = ["writing", "marketing"];
const missionSteps = [
  " Write a kickass blog",
  "Write a blog",
  "Submit your work",
  "Share the proof of work",
];
const xp = 1000;
const coinType = "USDC";
const submissionType = { type: "url" };
function MissionAMAQuestion() {
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
            submission_type={submissionType}
            xp={xp}
          />

          {/* Main Content Section */}
          <div className="mt-6 flex justify-center items-center">
            <div className="flex">
              <div className="text-[#ffffff] ml-[20px] w-[auto] mb-[50px] border-[1px] border-[#353B43] rounded-[20px]">
                <Image
                  src="Icons/TechnicalBg.svg"
                  width={800}
                  height={1}
                  alt="alt"
                  className="mx-[10px] my-[10px] mb-[40px]"
                />
                <div className="mx-[30px] my-[30px]">
                  <div className="font-[600] text-[24px] text-[#ffffff] my-[20px]">
                    Submit An AMA Question
                  </div>
                  <div className="font-[500] text-[16px] text-[#D9D9D9]">
                    To complete this mission, please complete the survey form in
                    the link:
                    <Link
                      href="https://www.notion.so/firebond/Popular-quests-04e7fe68c68a4c94bf878aaddb5fd1ff?pvs=4"
                      className="block mb-[20px] text-[#FE702A]"
                    >
                      https://www.notion.so/firebond/Popular-quests-04e7fe68c68a4c94bf878aaddb5fd1ff?pvs=4
                    </Link>
                    Then input the secret code provided at the end of the form.
                  </div>
                </div>
                <div className="mx-[30px] my-[30px]">
                  <MissionStepsCard
                    heading1={"Fill in the Survey form"}
                    descp1={"Fill in the form"}
                    heading2="Enter the secret code"
                    descp2={
                      "Enter the secret code provided at the end of the form."
                    }
                  />
                </div>
              </div>
              <div className="text-[#ffffff] w-[auto] h-[auto] ml-[20px]">
                <BeAchamp
                  val="1000"
                  title="Submit An AMA Question"
                  tags={tags}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="grid grid-cols-[auto,auto] gap-0  bg-[#171C23] grid-rows-[71px,100px,auto] h-[1100px] w-full md:grid-cols-[auto,1fr]">
    //     <div className="row-span-3 border-r-[1px] border-r-[#353B43]">
    //       <Sidebar />
    //     </div>
    //     <div className="border-b-[1px] border-b-[#353B43]">
    //       <Header />
    //     </div>
    //     <div className="">
    //       <NavbarMissionOnboarding
    //         title={title}
    //         description={description}
    //         heading1={missionSteps[0]}
    //         heading2={missionSteps[1]}
    //         subheading1={missionSteps[2]}
    //         subheading2={missionSteps[3]}
    //       />
    //     </div>
    //     <div className="flex">
    //       <div className="text-[#ffffff] ml-[20px] mb-[10px] w-[auto]  border-[1px] border-[#353B43] rounded-[20px]">
    //         <Image
    //           src="/MissionPageBanner.png"
    //           width={800}
    //           height={1}
    //           alt="kjdfhah"
    //           className="mx-[10px] my-[10px]"
    //         />
    //         <div className="mx-[30px] my-[30px]">
    //           <div className="font-[600] text-[24px] text-[#ffffff] my-[20px]">
    //             Submit An AMA Question
    //           </div>
    //           <div className="font-[500] text-[16px] text-[#D9D9D9]">
    //             To complete this mission, please complete the survey form in the
    //             link:
    //             <Link
    //               href="https://www.notion.so/firebond/Popular-quests-04e7fe68c68a4c94bf878aaddb5fd1ff?pvs=4"
    //               className="block mb-[20px] text-[#FE702A]"
    //             >
    //               https://www.notion.so/firebond/Popular-quests-04e7fe68c68a4c94bf878aaddb5fd1ff?pvs=4
    //             </Link>
    //             Then input the secret code provided at the end of the form.
    //           </div>
    //         </div>
    //         <div className="mx-[30px] my-[30px]">
    //           <MissionStepsCard
    //             heading1={"Fill in the Survey form"}
    //             descp1={"Fill in the form"}
    //             heading2="Enter the secret code"
    //             descp2={
    //               "Enter the secret code provided at the end of the form."
    //             }
    //           />
    //         </div>
    //       </div>
    //       <div className="text-[#ffffff] w-[auto] h-[auto] ml-[20px]">
    //         <BeAchamp val="1000" title="Submit An AMA Question" tags={tags} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
export default RouteGuardAdmin(MissionAMAQuestion);
