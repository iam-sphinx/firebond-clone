import SettingData from "@/utils/SettingData";
import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";

const GeneralInfoSettingPage = (props) => {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [role,setRole] = useState("");
  const [twitter, setTwitter] = useState(props.twitter_handle);
  const [web, setWeb] = useState(props.website_handle);
  const obj = SettingData();
  obj.name = name;
  obj.email = email;

  return (
    <div className="w-[641px] h-auto rounded-[10px] mb-[70px] bg-[#232B35]">
      <div className="p-[37px] h-auto w-auto">
        <h1 className="mb-2 font-semibold text-2xl text-white">
          General Information
        </h1>
        <h3 className="font-normal text-base text-[#A6A6A6]">
          Some of your basic information
        </h3>
      </div>

      <div className="border-[0.5px] border-[#474C52] h-0 w-full" />

      <div className="h-full w-full pt-[44px] pl-[37px] pr-[54.5px] pb-[57.06px]">
        <div className="w-full h-full">
          <h1 className="font-medium text-base text-white mb-[10px]">Name</h1>
          <div className="flex items-center justify-between gap-6 mb-[34px]">
            <div className="w-full h-[41px] shrink bg-[#2E363F] rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="enter name"
                className="w-full h-full outline-none bg-inherit text-ellipsis px-[18px] placeholder:text-[#D0D0D0] text-[#D0D0D0]"
                value = {name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="w-[51.5px] h-[51.5px] shrink-0 rounded-full border-[0.64px] border-dashed border-white flex justify-center items-center cursor-pointer ">
              <BiImageAdd size={24} />
            </div>
          </div>

          <h1 className="font-medium text-base text-white mb-[10px]">
            Your email id
          </h1>
          <div className="flex items-center gap-6 mb-[34px]">
            <div className="w-full h-[41px] bg-[#2E363F] rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full h-full outline-none bg-inherit text-ellipsis px-[18px] placeholder:text-[#D0D0D0] text-[#D0D0D0]"
                value = {email}
                onChange = {(e)=>{setEmail(e.target.value)}}
              />
            </div>
          </div>

          <h1 className="font-medium text-base text-white mb-[10px]">
            Role Title
          </h1>
          <div className="flex gap-[14px] mb-[34px]">
            <button className="px-[15px] h-[41px] flex justify-center items-center hover:bg-[#45505C] bg-[#2E363F] rounded-lg hover:text-white text-[#FFFFFFCC] font-medium text-sm bg-black" >
              Community Manager
            </button>
            <button className="px-[15.64px] h-[41px] flex justify-center items-center hover:bg-[#45505C] bg-[#2E363F] rounded-lg hover:text-white text-[#FFFFFFCC] font-normal text-sm" >
              Contributor
            </button>
          </div>

          <h1 className="font-medium text-base text-white mb-[10px]">
            Your Socials
          </h1>
          <div className="flex items-center justify-between gap-[13.06px] mb-[34px]">
            <div className="w-[40.94px] h-[40.94px] rounded-full shrink-0 flex justify-center items-center bg-[#2E363F] ">
              <BsTwitter size={24} />
            </div>
            <div className="w-full h-[41px] bg-[#2E363F] shrink rounded-lg overflow-hidden">
              <input
                type="url"
                placeholder="firebond/twitter"
                className="w-full h-full outline-none text-ellipsis px-[18px] bg-inherit"
                value={twitter}
                onChange={(e)=>{setTwitter(e.target.value)}}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-[13.06px]">
            <div className="w-[40.94px] h-[40.94px] rounded-full shrink-0 flex justify-center items-center bg-[#2E363F] ">
              <FaGlobe size={24} />
            </div>
            <div className="w-full h-[41px] bg-[#2E363F] shrink rounded-lg overflow-hidden">
              <input
                type="url"
                placeholder="www.firebond.com"
                className="w-full h-full outline-none text-ellipsis px-[18px] bg-inherit"
                value={web}
                onChange={(e)=>{setWeb(e.target.value)}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSettingPage;
