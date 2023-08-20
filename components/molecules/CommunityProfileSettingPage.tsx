import { common } from "@material-ui/core/colors";
import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import SettingData from "@/utils/SettingData";

const CommunityProfileSettingPage = (props: any) => {
  
  const [community, setCommunity] = useState(props.community_name);
  const [communityDesc, setCommunityDesc] = useState(
    props.community_description
  );
  const [communityType, setCommunityType] = useState(props.community_type);
  const [twitter, setTwitter] = useState(props.twitter_handle);
  const [web, setWeb] = useState(props.website_handle);
  const obj = SettingData();
  obj.community_name = community;
  obj.community_description = communityDesc;
  

  return (
    <div className="w-[641px] h-auto rounded-[10px] mb-[70px] bg-[#232B35]">
      <div className="p-[37px] h-auto w-auto">
        <h1 className="mb-2 font-semibold text-2xl text-white">
          Community profile
        </h1>
        <h3 className="font-normal text-base text-[#A6A6A6]">
          Some of your community information
        </h3>
      </div>

      <div className="border-[0.5px] border-[#474C52] h-0 w-full" />

      <div className="h-full w-full pt-[44px] pl-[37px] pr-[54.5px] pb-[57.06px]">
        <div className="w-full h-full">
          <h1 className="font-medium text-base text-white mb-[10px]">
            Community name
          </h1>
          <div className="flex items-center justify-between gap-6 mb-[34px]">
            <div className="w-full h-[41px] shrink bg-[#2E363F] rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Firebond"
                value = {community}
                onChange={(e) => {
                  setCommunity(e.target.value);
                }}
                className="w-full h-full outline-none bg-inherit text-ellipsis px-[18px] placeholder:text-[#D0D0D0] text-[#D0D0D0]"
              />
            </div>
            <div className="w-[51.5px] h-[51.5px] shrink-0 rounded-full border-[0.64px] border-dashed border-white flex justify-center items-center cursor-pointer ">
              <BiImageAdd size={24} />
            </div>
          </div>

          <h1 className="font-medium text-base text-white mb-[10px]">
            Community
          </h1>
          <div className="flex items-center mb-[34px]">
            <div className="w-full h-[124px] px-[18px] py-[13px] bg-[#2E363F] rounded-lg overflow-hidden">
              <textarea
                className="w-full h-full text-ellipsis bg-inherit outline-none resize-none scrollbar-hide placeholder:text-[#D0D0D0] text-white font-normal text-sm"
                placeholder="Our goal is to build the community and help the members of the community to gain rewards by completing many tasks / missions. "
                value={communityDesc}
                onChange={(e) => {
                  setCommunityDesc(e.target.value);
                }}
              />
            </div>
          </div>

          <h1 className="font-medium text-base text-white mb-[10px]">
            Community type
          </h1>
          <div className="flex gap-[14px] mb-[34px]">
            <button
              className={`h-[40.94px] w-[65.5px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px]  bg-[#2E363F] rounded-lg ${
                communityType === 1 ? "bg-black text-white" : "bg-[#2E363F]"
              }`}
              onClick={() => setCommunityType(1)}
            >
              DAO
            </button>
            <button
              className={`h-[40.94px] w-[122.81px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px] bg-[#2E363F] rounded-lg ${
                communityType === 2 ? "bg-black text-white" : "bg-[#2E363F]"}`}
              onClick={() => setCommunityType(2)}
            >
              NFT Community
            </button>
            <button
               className={`h-[40.94px] w-[112.98px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px] bg-[#2E363F] rounded-lg ${
                communityType === 3 ? "bg-black text-white" : "bg-[#2E363F]"}`}
              onClick={() => setCommunityType(3)}
            >
              Content Creator
            </button>
            <button
               className={`h-[40.94px] w-[65.5px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px] bg-[#2E363F] rounded-lg ${
                communityType === 4 ? "bg-black text-white" : "bg-[#2E363F]"}`}
              onClick={() => setCommunityType(4)}
            >
              Social
            </button>
          </div>

          <h1 className="font-medium text-base text-white mb-[10px]">
            Community
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
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
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
                onChange={(e) => {
                  setWeb(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfileSettingPage;
