import React, { useEffect, useState } from "react";
import Header from "../components/atoms/Header";
import Image from "next/image";
import MissionMainCard from "../components/molecules/MissionMainCard";
import ActivityCard from "@/components/molecules/ActivityCardNewDashboard";
import UserSidebar from "@/components/molecules/UserSidebar";
import Transactions from "@/components/molecules/Transactions";
import WelcomeCardNewDashboard from "@/components/molecules/WelcomeCardNewDashboard";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { getDate } from "date-fns";

/**
 * community_id;
 * user_wallet_id
 */

export default function YourSpace(props: any) {
  const [name, setName] = useState("ayush");
  const [xp, setXp] = useState(50);
  const [missionCount, setmissionCount] = useState(10);
  const [days, setDays] = useState(0);
  const [bounty, setBounty] = useState(20);
  const [communityName, setCommunityName] = useState("Satoshi");
  const router = useRouter();

  var community_id ="";
  var user_wallet_id = "";
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("yahan aa raha");
      const storedJsonData = localStorage.getItem("data");
      const storedJsonwallet = localStorage.getItem("user_wallet_id");
      const storedJsonCommunity = localStorage.getItem("community_id");
      const jsonData = JSON.parse(storedJsonData ?? "{}");
      // console.log(storedJsonwallet,storedJsonCommunity)
      if (storedJsonCommunity !== null) {
        community_id = storedJsonCommunity;
      }
      if (storedJsonwallet !== null) {
        user_wallet_id = storedJsonwallet;
      }
    }
  }, []);

  function handleCardClick(missionDetails: any) {
   
    router.push({
      pathname: '/MissionForUser',
      query: {
        myData: JSON.stringify(missionDetails),
       }
    },)
    
  }

  function daysleft(dueDate: any) {
    let temp = getDate(new Date(dueDate.seleted_date)) - getDate(new Date());
    if (dueDate == "" || dueDate == null) {
      return "No Due Date";
    } else if (temp >= 0) {
      return `${temp} Days Left`;
    } else {
      return "Expired";
    }
  }
  const [missions, setmissions] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch the community data row using the user's wallet_id as a filter condition
      const { data: rowData, error } = await supabase
        .from("community_data")
        .select("*")
        .eq("id", community_id)
        .single();
      if (error) {
        console.error("error aa raha", error);
        return;
      }
      console.log("sahi chal raha sab",rowData);
      setCommunityName(rowData.community_name);

      const members = rowData.Members.filter(
        (item: any) => item.user_wallet_id === user_wallet_id
      );
      console.log(members[0]);
      setName(members[0].User_name);
      setXp(members[0].current_xp);
      setBounty(members[0].current_bounty);
      setmissionCount(members[0].missions_completed.length);
      // setCommunityName(members[0])
      const joinDate = new Date(members[0].date_of_join);
      const currentDate = new Date();

      

      // Calculate the time difference in milliseconds
      const timeDiff = currentDate.getTime() - joinDate.getTime();

      

      // Convert milliseconds to days
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      console.log(currentDate,joinDate,timeDiff,daysDiff)

      setDays(daysDiff);

      setmissions(rowData.missions);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-full bg-[#171C23] w-full">
      {/* Main Div */}
      <div className="h-full w-full flex">
        {/* Sidebar */}
        <UserSidebar username = {name} />
        <div className="w-full h-full overflow-scroll scrollbar-hide">
          <Header username = {name} />
          {/* Main Section & Right Side Section */}
          <div>
            <h1 className="text-white text-2xl font-bold m-2">
              {communityName}&apos;s Space
            </h1>
            <h3 className="text-white text-l font-bold m-2">
              Here&apos;s what&apos;s happening with your community
            </h3>
          </div>
          <div className="mb-5">
            <WelcomeCardNewDashboard
              name={name}
              xp={xp}
              bounty={bounty}
              missionCount={missionCount}
              days={days}
            />
            <div className="flex flex-col justify-end items-center w-full"></div>
          </div>
          <div className="bg-[#232B35]  width-[1200px] height-[352px] left-[290px] top-[494px] m-5 p-5">
            <div className="flex">
              <div className="m-4 bg-[#232B35]">
                <Image
                  src="/form 4-1.png"
                  alt="hell"
                  width={360}
                  height={220}
                  className=" bg-black width-[360.76px] height-[220px] left-[747px] top-[566px]"
                />
              </div>
              <div className=" m-5 p-5 text-white text-2xl font-bold m-2 width-[276px] height-[35px] left-[1163px] top-[556px]">
                Make a Referral Bonus
              </div>
            </div>
          </div>
          <div className="m-5 flex justify-between ">
            {/* Main Section */}
            <div className="flex justify-center scrollbar-hide p-6 ">
              <div className="m-5 p-5">
                <div className="flex">
                  <div className="">
                    <Transactions />
                  </div>
                  <div className=" width-[841px] height-[325px] left-[649px] top-[870px]">
                    <ActivityCard />
                  </div>
                </div>
                <div className=" w-[1200px] h-[539px] left-[290px] top-[1219px]">
                  <div className="flex m-100 p-10">
                    <h1 className=" left-[322 px] text-white text-2xl font-bold ">
                      Available Missions
                    </h1>
                    {/* <h1 className=" left-[1275 px] text-white text-2xl font-bold " >View All </h1> */}
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                    {missions &&
                      missions.map((item: any, index) => {
                        return (
                          <div
                            className="m-[8px] "
                            key={index}
                            onClick={() => {
                              handleCardClick(item);
                            }}
                          >
                            <MissionMainCard
                              profileUrl1={"/Avatar.png"}
                              profileUrl2={"/Avatar.png"}
                              profileUrl3={"/Avatar.png"}
                              profileUrl4={"/Avatar.png"}
                              submission={item.submission}
                              daysLeft={daysleft(item)}
                              usdc={item.amount}
                              title={item.title}
                              tags={item.tags}
                              xp={item.xp}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
