import React, { useEffect, useState } from "react";
import TopContentCard from "./TopContentCard";
import axios from "axios";
import { supabase } from "@/utils/supabaseClient";

interface Tweet  {
  "text" : string,
  "id" : string,
  "created_at" : string,
} 

const TopContentAnalyticsScreen = (props: any) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [slicedTweets, setSlicedTweets] = useState<Tweet[]>([]);

  const data =
    typeof window !== "undefined" ? localStorage.getItem("data") : null;
  const actualData = data ? JSON.parse(data) : "";
  const wallet_id = actualData.wallet_id;

  const getTweets = async () => {
    const url = `api/getTweetsRoute/?id=${props.twitterID}`;
    const response = await fetch(url);
    const userData = await response.json();
    console.log("heeee");
    const data = userData.data;
    setTweets(data);
    if (data != "") {
      const { data, error } = await supabase
        .from("community_data")
        .insert({ recent_tweets: tweets })
        .eq(wallet_id, wallet_id);
    }

    //fetching updated data
    try {
      const { data, error } = await supabase
        .from("community_data")
        .select()
        .eq(wallet_id, wallet_id);
        

      setTweets(data ? data[0].recent_tweets : []);
      const slicedTweets = tweets.slice(0,3);
      setSlicedTweets(slicedTweets);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTweets();
  });

  const users = [
    {
      key: 1,
      userid: "andrebiachi",
      username: "Esther Howard",
      time: 23,
      tag: "#YGPZ",
      profileUrl: "Icons/Twitter.svg",
      discription:
        "The real golden treasure is your inner peace Like! Hale if you agree",
    },
    {
      key: 2,
      userid: "andrebiachi",
      username: "Esther Howard",
      time: 23,
      tag: "#YGPZ",
      profileUrl: "Icons/Twitter.svg",
      discription:
        "The real golden treasure is your inner peace Like! Hale if you agree",
    },
    {
      key: 3,
      userid: "andrebiachi",
      username: "Esther Howard",
      time: 23,
      tag: "#YGPZ",
      profileUrl: "Icons/Twitter.svg",
      discription:
        "The real golden treasure is your inner peace Like! Hale if you agree",
    },
  ];

  return (
    <div className="h-[449px] w-[503px] overflow-hidden rounded-[20px] bg-[#232B35] p-6 ml-[13px]">
      <div className="h-full w-full ">
        <div className="flex justify-between items-center mb-[30px]">
          <h1 className="text-white font-medium text-[24px] leading-[32.4px]">
            Top content
          </h1>

          <button className="text-[#D9D9D9] font-normal text-[15px] leading-[20.25px]">
            Show all
          </button>
        </div>

        <div>
          {slicedTweets?.map((item, index) => {
            return (
              <div key={index}>
                     <TopContentCard
                     discription={item.text}
                     profileUrl={""}
                     userid={item.id}
                     time={item.created_at}
                     username={""}
                     tag={""}
                   />
              </div>
            );
          })}
          {/* {tweets.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item}</h1>
              </div>
              //   <div key={item.key} className="mb-4">
              //     <TopContentCard
              //       discription={item.discription}
              //       profileUrl={item.profileUrl}
              //       userid={item.userid}
              //       time={item.time}
              //       username={item.username}
              //       tag={item.tag}
              //     />
              //   </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default TopContentAnalyticsScreen;
