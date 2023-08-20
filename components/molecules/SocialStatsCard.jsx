import React from "react";
import StatBadge from "../atoms/StatBadge";
import IconButton from "../atoms/IconButton";

interface SocialStatsCardProps {
  title: string;
  count: number;
  // for statbadge
  stat : string
  color : string 
}

export default function SocialStatsCard(props: any) {
  return (
    <div className="card card-side bg-base-100 shadow-xl h-32 w-80 absolute left-72 top-48 bg-[#232B36] rounded-3xl">
      <div className="w-16">
        <img className="ml-5 mt-8 rounded-2xl" src={props.imageUrl}/>
      </div>
      <div className="card-body flex">
        <div className="card-title font-sans text-base font-normal leading-normal tracking-normal text-left text-[#8C89B4]">
          New {props.title} User
        </div>
        <span className="font-sans text-2xl font-semibold leading-8 tracking-normal text-left text-[White] flex-grow">
          {props.count}
        </span>
        <span className="ml-auto absolute h-[30] w-[40] left-[230px] top-[30] mt-9">
          <StatBadge stat={props.stat} color={props.color}/>
        </span>
      </div>
    </div>
  );
}
