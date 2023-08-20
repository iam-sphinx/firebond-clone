import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import LeaderboardCard from "@/components/molecules/LeaderboardCard";
import TopContributorCardLeaderboardScreen from "@/components/molecules/TopContributorCardLeaderboardScreen";
import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";
import { useState } from "react";


import RouteGuardAdmin from "@/utils/RouteGuardAdmin";

const LeaderboardUserPage = () => {
  const [cards, setCards] = useState([]);
  const [cards1, setCards1] = useState([{}]);
  // const [leaderboardData, setleaderboardData] = useState([{}]);

  var community_id ="";

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
    }
  }, []);

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
        console.error(error);
        return;
      }
      console.log("members hain", rowData.Members);
      rowData.Members.sort((a:any,b:any)=>{
        return b.current_xp - a.current_xp;
      })
      let temp_arr = [];
      for (let i = 0; i < Math.min(5,rowData.Members.length); i++) {
        temp_arr.push(rowData.Members[i]);
      }
      setCards1(temp_arr);
      setCards(rowData.Members);
    } catch (error) {
      console.error(error);
    }
  }
  let ele:any
  console.log("ye card hai", cards);
  if (cards!=null) {
    ele = cards1.map((card: any, index: any) => {
      return (
        <div key={index}>
          <LeaderboardCard
            rank={index + 1}
            name={card.User_name}
            point={card.current_xp}
          />
        </div>
      );
    });
  }

  return (
    <div className="min-h-screen min-w-fit bg-[#171C23] flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Section */}
      <div className="h-full w-full">
        {/* <Header /> */}
        <div className="h-full w-full p-6">
          <div className="h-full w-full">
            <h1 className="text-white font-semibold text-2xl mb-2">
              Leaderboard
            </h1>
            <div className="flex justify-between items-center mb-9">
              <h3 className="text-[#A6A6A6] font-normal text-base">
                Check who’s ahead of everyone
              </h3>
              
            </div>

            <div className="flex gap-3 mb-[30px]">{ele}</div>
            <div className="w-full h-full">
              <TopContributorCardLeaderboardScreen cards={cards} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardUserPage;
