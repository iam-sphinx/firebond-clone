import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/atoms/Header";
import NavbarMissionOnboarding from "../components/molecules/NavbarMissionOnboarding";
import BeAchamp from "../components/molecules/BeAchamp";
import MissionStepCard from "../components/molecules/MissionStepCard";
import MissionStepsCard from "../components/molecules/MissionStepCard";
const title = "Onboard 10 new community members";
import Image from "next/image";
const description = `This bounty is for onboarding 10 new people into Firebond Discord
community. You’d do that by generating a new invite link
(we’re not counting past invitations)from our Discord and sharing it with people
who are genuinely mission aligned.
1. No prize if it looks like you’re just gaming the system by inviting
   random people who don’t care about Próspera’s mission.So be thoughtful 
   about who you invite.
2. No prize if it looks like you’re just gaming the system by inviting
   random people who don’t care about Próspera’s mission.So be thoughtful about
   who you invite.When they arrive they should introduce themselves so we 
   understand their story.This also helps us know they’re not just 
   friends helping someone score a quick bounty.
3. When you reach 10 people, submit your claim and we’ll review.
   For those who recruit the right people and help us build out our community
   with high quality participants,this mission can extend beyond 20.`;

const tags = ["✍️Writing", "📢Marketing"];
const missionSteps = [
  " Onboard 10 new members",
  "Invite new members",
  "Submit mission",
  "Share the proof of work",
];
const xp = 1000;
const coinType = "USDC";
const submission_type = { type: "file" };

const MissionOnboardingNewMembers = () => {
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
              <div className="text-[#ffffff] ml-[20px] w-[auto] mb-[50px] border-[1px] border-[#353B43] rounded-[20px]">
                <Image
                  src="Icons/TechnicalBg.svg"
                  width={800}
                  height={1}
                  alt="kjdfhah"
                  className="mx-[10px] my-[10px] mb-[40px]"
                />
                <div className="font-semibold text-2xl text-white mx-3">
                  Onboard 10 new community members
                </div>
                <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
                  <pre className="overflow-auto no-scrollbar font-['General Sans']">
                    {description}
                  </pre>
                </div>
                <div className="mt-[60px] mb-3 px-3">
                  <MissionStepsCard
                    className="mx-[20px]"
                    heading1="Onboard 10 new members "
                    heading2="Submit mission"
                    descp1="Invite new members"
                    descp2="Share the proof of work"
                  />
                </div>
              </div>
              <div className="text-[#ffffff] w-[auto] h-[auto] ml-[30px]">
                <BeAchamp
                  val="1000"
                  tags={tags}
                  title="Onboarding 10 new community members"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="grid grid-cols-[auto,auto] gap-0  bg-[#171C23] grid-rows-[71px,100px,auto] h-[1500px] w-full md:grid-cols-[auto,1fr]">
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

    //         <div className="font-semibold text-2xl text-white mx-3">
    //           Onboard 10 new community members
    //         </div>
    //         <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
    //           <pre className="overflow-auto no-scrollbar font-['General Sans']">
    //             {description}
    //           </pre>
    //         </div>
    //         <MissionStepsCard
    //           className="mx-[20px]"
    //           heading1="Onboard 10 new members "
    //           heading2="Submit mission"
    //           descp1="Invite new members"
    //           descp2="Share the proof of work"
    //         />
    //       </div>
    //       <div className="text-[#ffffff] w-[auto] h-[auto] ml-[30px]">
    //         <BeAchamp
    //           val="1000"
    //           tags={tags}
    //           title="Onboarding 10 new community members"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MissionOnboardingNewMembers;
