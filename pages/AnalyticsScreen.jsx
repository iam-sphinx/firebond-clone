import React, { useEffect, useState } from "react";
import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/atoms/Header";
import MemberGrowthCardAnalyticsScreen from "../components/molecules/MemberGrowthCardAnalyticsScreen";
import SocialStatsCard from "../components/molecules/SocialStatsCard";
import NewMemberCardAnalyticScreen from "../components/molecules/NewMemberCardAnalyticScreen";
import UserBaseAnalytics from "../components/molecules/UserBaseAnalytics";
import TopContributorCardLeaderboardScreen from "../components/molecules/TopContributorCardLeaderboardScreen";
import TopContentCard from "../components/molecules/TopContentCard";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
import TopContributorAnalyticsScreen from "@/components/molecules/TopContributorAnalyticsScreen";
import { supabase } from "@/utils/supabaseClient";
import cron from "node-cron";

import axios from "axios";
import TopContentAnalyticsScreen from "@/components/molecules/TopContentAnalyticsScreen";


const AnalyticsScreen = () => {
  const [twitterID, setTwitterID] = useState("");
  const [followers, setFollowers] = useState("");
  const [percentageChange, setPercentageChange] = useState(0);
  const [cronicData, setCronicData] = useState("");

  const localData =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("data") || "")
      : null;

  const CronicFunction = async () => {
    console.log("cronicc");
    const url = `/api/cronSchedule/?id=${twitterID}`;
    const response = await fetch(url);
    const userData = await response.json();

    // Fetching previous data and storing it in a local variable
    let previousFollowers = localStorage.getItem("prev_followers") || "0";

    // Only updating the database if userData is not empty
    if (userData !== "") {
      console.log("right3");

      try {
        await supabase
          .from("community_data")
          .update({ followers: userData.data.public_metrics.followers_count })
          .eq("wallet_id", localData.wallet_id);
      } catch (error) {
        console.log(error);
      }
    }

    // Fetching the updated data
    try {
      const { data, error } = await supabase
        .from("community_data")
        .select("followers")
        .eq("wallet_id", localData.wallet_id);

      if (error) {
        console.log(error);
        return;
      }

      // Updating the local variable with the updated data
      const updatedFollowers = data ? data[0].followers : "0";

      // Calculating the percentage change
      const percentageChange =
        ((Number(updatedFollowers) - Number(previousFollowers)) /
          Number(previousFollowers)) *
        100;

      setPercentageChange(percentageChange);

      // Storing the updated followers as the previous followers for the next iteration
      localStorage.setItem("prev_followers", updatedFollowers);
    } catch (error) {
      console.log(error);
    }
  };

  //getTwitterID
  const getTwitterID = async () => {
    console.log("twitterr");
    try {
      const { data, error } = await supabase
        .from("community_data")
        .select()
        .eq("wallet_id", localData.wallet_id);

      //setting twitterID for further data
      console.log(localData.wallet_id);
      console.log(data);
      const twitid = await (data ? data[0].twitterID : "");
      setTwitterID(twitid);

      console.log("right2");
      console.log(twitterID);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  //fetching data and setting to state variables
  const getUpdatedData = async () => {
    console.log("updatee");
    try {
      const { data, error } = await supabase
        .from("community_data")
        .select()
        .eq("wallet_id", localData.wallet_id);

      //setting Followers for further data
      const folowrs = await (data ? data[0].followers : "");
      console.log("right1");
      setFollowers(folowrs);
      console.log(followers);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //first fetching data for twitter ID
    getTwitterID();
    // now running cronic function
    CronicFunction();
    //getting updated value
    getUpdatedData();
  });

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide">
        <Header />

        {/* Centeral Section */}
        <div className=" w-full flex justify-center items-center">
          <div className="mt-[5px] p-6">
            <h1 className="font-semibold text-[24px] leading-[32.4px] text-white mb-2">
              Analytics
            </h1>
            <p className="font-normal text-[#A6A6A6] text-[16px] leading-[21.6px] mb-6">
              Here’s what’s happening with your community
            </p>

            <div className="flex">
              {/* Left Section */}
              <div>
                <div className="flex  gap-[26px] mb-[26px]">
                  <UserBaseAnalytics
                    imageUrl="Icons/twitter.svg"
                    height={16.25}
                    width={20}
                    title="New Twitter users"
                    count={followers}
                    percentage={percentageChange}
                    bgColor="#64CFF6"
                  />
                  <UserBaseAnalytics
                    imageUrl="Icons/Discord.svg"
                    height={14.78}
                    width={20}
                    title="New Discord users"
                    count="632"
                    percentage={1.29}
                    bgColor="#6359E9"
                  />
                </div>

                {/* Member growth section */}
                <div className="mb-[26px] relative filter blur-sm">
                  <MemberGrowthCardAnalyticsScreen />
                </div>

                {/* New Members section */}
                <div>
                  <NewMemberCardAnalyticScreen />
                </div>
              </div>
              {/* Right Section */}
              <div className=" flex flex-col gap-[26px] ">
                <div className="w-[505px] h-[433px] bg-[#232B35] rounded-[20px]  overflow-hidden ml-[13px]">
                  <TopContributorAnalyticsScreen />
                </div>
                <TopContentAnalyticsScreen twitterID = {twitterID}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteGuardAdmin(AnalyticsScreen);
