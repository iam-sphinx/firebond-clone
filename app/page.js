"use client";
// import AnalyticsCardMainDashboard from "../components/molecules/AnalyticsCardMainDashboard";
import Header from "../components/atoms/Header";
import Sidebar from "../components/molecules/Sidebar";
import { useState } from "react";
// import RecentlyJoinedCardDashboardScreen from "../components/molecules/RecentlyJoinedCardDashboardScreen";
// import Mission from "../components/atoms/Mission";
// import CommunityHealth from "../components/molecules/CommunityHealth";
// import OnboardingExperienceCard from "../components/molecules/OnboardingExperienceCard";

export default function Home() {
  const [name, setName] = useState("user");
  const [membersData, setmembersData] = useState([{}]);
  const [contributors, setcontributors] = useState(0);
  const [submissions, setsubmissions] = useState(0);
  const [created, setcreated] = useState(0);
  const [active, setactive] = useState(0);

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1] overflow-auto scrollbar-hidden flex justify-between">
          {/* Left Section */}
          <div className="h-full w-full px-6 pt-[29px] flex justify-center bg-[#171C23] items-center">
            <div>
              <div className="h-full w-full ">
                <h2 className="text-white text-2xl font-semibold mb-2">
                  {name}’s Space
                </h2>
                <h3 className="font-normal text-base text-[#A6A6A6] mb-6">
                  Here’s what’s happening with your community
                </h3>
                {/* Main Section */}
                <div className="flex gap-6 mb-10">
                  {/* Analytics & Recently Joined Section */}
                  <div className="w-[365px] h-[750px] bg-[#232B35] rounded-[20px] overflow-hidden relative ">
                    <div className="absolute top-[29px]">
                      {/* <AnalyticsCardMainDashboard /> */}
                    </div>
                    <div className="h-[350px] w-[365px] z-10 absolute bottom-0">
                      {/* <RecentlyJoinedCardDashboardScreen /> */}
                    </div>
                  </div>

                  {/* Mission & Community Health Section */}
                  <div className="flex flex-col justify-between gap-5">
                    <div className="h-[365px] w-[469px] bg-[#232A35] rounded-[20px] flex items-end">
                      {/* <Mission
                        contributors={contributors}
                        submission={submissions}
                        created={created.toString()}
                        active={active.toString()}
                      /> */}
                    </div>

                    <div className="h-[365px] w-[469px] bg-[#232A35] rounded-[20px] flex items-end">
                      {/* <Mission
                        contributors={contributors}
                        submission={submissions}
                        created={created.toString()}
                        active={active.toString()}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mb-10">
                  {/* Analytics & Recently Joined Section */}
                  <div className="w-[365px] h-[750px] bg-[#232B35] rounded-[20px] overflow-hidden relative ">
                    <div className="absolute top-[29px]">
                      {/* <AnalyticsCardMainDashboard /> */}
                    </div>
                    <div className="h-[350px] w-[365px] z-10 absolute bottom-0">
                      {/* <RecentlyJoinedCardDashboardScreen /> */}
                    </div>
                  </div>

                  {/* Mission & Community Health Section */}
                  <div className="flex flex-col justify-between gap-5">
                    <div className="h-[365px] w-[469px] bg-[#232A35] rounded-[20px] flex items-end">
                      {/* <Mission
                        contributors={contributors}
                        submission={submissions}
                        created={created.toString()}
                        active={active.toString()}
                      /> */}
                    </div>

                    <div className="h-[365px] w-[469px] bg-[#232A35] rounded-[20px] flex items-end">
                      {/* <Mission
                        contributors={contributors}
                        submission={submissions}
                        created={created.toString()}
                        active={active.toString()}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mb-10">
                  {/* Analytics & Recently Joined Section */}
                  <div className="w-[365px] h-[750px] bg-[#232B35] rounded-[20px] overflow-hidden relative ">
                    <div className="absolute top-[29px]">
                      {/* <AnalyticsCardMainDashboard /> */}
                    </div>
                    <div className="h-[350px] w-[365px] z-10 absolute bottom-0">
                      {/* <RecentlyJoinedCardDashboardScreen /> */}
                    </div>
                  </div>

                  {/* Mission & Community Health Section */}
                  <div className="flex flex-col justify-between gap-5">
                    <div className="h-[365px] w-[469px] bg-[#232A35] rounded-[20px] flex items-end">
                      {/* <Mission
                        contributors={contributors}
                        submission={submissions}
                        created={created.toString()}
                        active={active.toString()}
                      /> */}
                    </div>
                    <div className="h-[365px] w-[469px] bg-[#232A35] rounded-[20px] flex items-end">
                      {/* <Mission
                        contributors={contributors}
                        submission={submissions}
                        created={created.toString()}
                        active={active.toString()}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-auto h-auto px-6 border-l bg-[#171C23] border-[#333840]">
            <h1 className="text-white font-semibold text-[22px] leading-[29.6px] mt-[29px] mb-[55px]">
              Onboarding Experience
            </h1>

            {/* Cards */}
            {/* {cards.map((card, index) => {
              return (
                <div key={card.key}> */}
            {/* <OnboardingExperienceCard
                    flag={card.flag}
                    key={index}
                    title={card.title}
                    label={card.description}
                    buttonText={card.buttonText}
                    handleClick={card.onclick}
                  /> */}
            {/* </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
