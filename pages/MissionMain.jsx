import React, { useEffect } from "react";
import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/atoms/Header";
import Image from "next/image";
import { AiOutlinePlusCircle } from "react-icons/ai";
import MissionMainCard from "../components/molecules/MissionMainCard";
import AddMoreCard from "../components/molecules/AddMoreCard";
import { useRouter } from "next/router";
import MissionTemplateEdit from "./MissionTemplateEdit";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { getDate, getTime } from "date-fns";
import Photo from "@/components/atoms/Photo";
import { Modal } from "@material-ui/core";
import CopyLinkPopUpFormBuilder from "@/components/molecules/CopyLinkPopUpFormBuilder";
import Tags from "@/components/molecules/Tags";
import MissionFormData from "@/utils/MissionFormData";
import FilterTags from "@/utils/FilterTags";
import { HiOutlinePlusCircle } from "react-icons/hi2";
const twitter = [
  {
    id: 1,
    title: "Follow on Twitter",
    button: 1000,
    mission: "Follow us on Twitter",
  },
  {
    id: 2,
    title: "Write a tweet about Firebond",
    button: 1000,
    mission: "Write a thoughtful message about firebond on why we rock!...",
  },
];

const Discord = [
  {
    id: 1,
    title: "Make Friends",
    button: 1000,
    mission: "Join discord channel and got ver...",
  },
];

const Community = [
  {
    id: 1,
    title: "Be A Champion",
    button: 1000,
    mission: "Follow firebond twitter and get ...",
    route: "/MissionOnboardingMisison",
  },
  {
    id: 2,
    title: "Feedback",
    button: 1000,
    mission: "Give your feedback regarding the ...",
    route: "/MissionShareYourFeedback",
  },
];

const MissionMain = () => {
  const obj = FilterTags();

  const [OpenMission, setOpenMission] = useState(false);
  const [hideTagInput, sethideTagInput] = useState(true);

  const router = useRouter();
  function createhandleclick() {
    router.push("/MissionCreationFormPage");
  }
  function handleCardClick(missionDetails: any) {
    console.log("details->", missionDetails);
    router.push({
      pathname: "/MissionViewPage",
      query: {
        myData: JSON.stringify(missionDetails),
      },
    });
  }

  var wallet_id = "";

  // to display number of days left
  function daysleft(dueDate: any) {
    let temp = getTime(new Date(dueDate.seleted_date)) - getTime(new Date());
    temp = temp / (1000 * 60 * 60 * 24);
    temp = Math.floor(temp);
    console.log("days left", temp);
    if (dueDate == "" || dueDate == null) {
      return "No Due Date";
    } else if (temp >= 0) {
      return `${temp} Days`;
    } else {
      return "Expired";
    }
  }
  const [missions, setmissions] = useState([{}]);
  const [communityId, setcommunityId] = useState("");
  if (typeof window !== "undefined") {
    const storedJsonData = localStorage.getItem("data");
    // console.log(storedJsonData)
    const jsonData = JSON.parse(storedJsonData ?? "{}");
    wallet_id = jsonData.wallet_id;
    console.log(jsonData);
  }
  const [allMissions, setallMissions] = useState([{}]);
  // let
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // console.log('in');
    console.log("obj tags->", obj.tags);
  }, [FilterTags().tags]);

  async function fetchData() {
    try {
      // Fetch the community data row using the user's wallet_id as a filter condition
      const { data: rowData, error } = await supabase
        .from("community_data")
        .select("*")
        .eq("wallet_id", wallet_id)
        .single();
      if (error) {
        console.error(error);
        return;
      }

      console.log(rowData.missions);
      setallMissions(rowData.missions);
      // filter logic;
      let new_missions;
      if (rowData.missions != null) {
        console.log(obj.tags);
        new_missions = rowData.missions.filter((val: any) => {
          if (obj.tags.length <= 0 || obj.tags[0].title == "") {
            //no tags are there.
            return true;
          } else {
            for (let i = 0; i < obj.tags.length; i++) {
              let flag = false;
              for (let j = 0; j < val.tags.length; j++) {
                if (obj.tags[i].title == val.tags[j].title) {
                  flag = true;
                }
              }
              if (flag == false) {
                return false;
              }
            }
            return true;
          }
        });
      } else {
        console.log("filtered_missions", new_missions);

        new_missions = rowData.missions;
      }
      console.log("filtered_missions", new_missions);

      // missions = rowData.missions;
      setmissions(new_missions);
      setcommunityId(rowData.id);
    } catch (error) {
      console.error(error);
    }
  }
  function handleFilterClick() {
    let new_missions;
    sethideTagInput(!hideTagInput);
    if (allMissions != null) {
      console.log(obj.tags);
      new_missions = allMissions.filter((val: any) => {
        if (obj.tags.length <= 0 || obj.tags[0].title == "") {
          //no tags are there.
          return true;
        } else {
          for (let i = 0; i < obj.tags.length; i++) {
            let flag = false;
            for (let j = 0; j < val.tags.length; j++) {
              if (obj.tags[i].title == val.tags[j].title) {
                flag = true;
              }
            }
            if (flag == false) {
              return false;
            }
          }
          return true;
        }
      });
    } else {
      console.log("filtered_missions", new_missions);

      new_missions = allMissions;
    }
    console.log("filtered_missions", new_missions);

    // missions = rowData.missions;
    setmissions(new_missions);
  }

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Modal
        onClose={() => {
          setOpenMission(!OpenMission);
        }}
        open={OpenMission}
        style={{}}
      >
        <div className="flex justify-center items-center">
          <div className="absolute m-[auto] top-[30vh]">
            <CopyLinkPopUpFormBuilder
              url={`${
                typeof window == "undefined"
                  ? "dontknow"
                  : window.location.origin
              }/community/${communityId}`}
              forWhichComponent="community"
            />
          </div>
        </div>
      </Modal>

      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1] ">
          <div className="h-auto w-full p-6 border-b-[1px] border-[#353B43] sticky top-[80px] bg-[#171C23] z-10">
            <div className=" h-full w-full">
              <h1 className="font-semibold text-2xl text-white">Missions</h1>
              <p className="font-normal text-[16px] leading-[22px] text-[#A6A6A6]">
                Boost your community with missions
              </p>
              <div className="flex justify-between items-end ">
                <div className="flex flex-row gap-6 items-end justify-center">
                  <Tags
                    title="Filter On the Basis of Tags"
                    filter="yes"
                    tagInputVisibility={hideTagInput}
                  />
                  <button
                    className="w-[98px] h-10  border-[1px] border-[#757575] rounded-[8px] flex justify-center items-center gap-[9.13px] font-medium text-sm text-[#757575] hover:bg-white "
                    onClick={handleFilterClick}
                  >
                    <h1 className="">Apply</h1>
                  </button>
                </div>
                {/*  */}
                <div className="flex gap-3 justify-center items-center">
                  {/* <Photo/> */}
                  <button
                    className="w-[98px] h-[33px]  border-[1px] border-[#757575] rounded-[8px] flex justify-center items-center gap-[9.13px] font-medium text-sm text-[#757575] hover:bg-white "
                    onClick={() => {
                      setOpenMission(!OpenMission);
                    }}
                  >
                    <Image
                      src="/Add_user.svg"
                      alt=""
                      height={14.17}
                      width={12.75}
                    />
                    <h1 className="">Invite</h1>
                  </button>
                  <button
                    onClick={createhandleclick}
                    className="w-[98px] h-[33px]  border-[1px] border-[#757575] rounded-[8px] flex justify-center items-center gap-[9.13px] font-medium text-sm text-[#757575] hover:bg-white "
                  >
                    <HiOutlinePlusCircle className="" size={16} />
                    <h1 className="">Create</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-[1] flex justify-between ">
            {/* Main Section & Right Side Section */}
            {/* Main Section */}
            <div className="w-full h-full flex justify-center mt-6  ">
              <div className="flex justify-center items-center">
                <div className="w-[786px] h-screen overflow-auto scrollbar-hide grid grid-cols-2 gap-6">
                  {missions &&
                    missions.map((item: any, index) => {
                      return (
                        <div
                          className=" "
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

                  <AddMoreCard />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className=" h-full border-l-[1px] border-[#474C52] p-6 ">
              <div className="h-full w-full overflow-auto scrollbar-hide">
                <div className="h-[105px] w-full flex justify-between items-start mb-4">
                  <div className="flex-row gap-2">
                    <h1 className="font-semibold text-2xl text-white">
                      Templates
                    </h1>
                    <h3 className="font-normal text-[16px] leading-[22px] text-[#A6A6A6]">
                      Used prebuilt template
                    </h3>
                  </div>
                  <button
                    onClick={() => router.push("/MissionTemplatePage")}
                    className="font-medium text-sm text-[#D8D8D8]"
                  >
                    Show more
                  </button>
                </div>

                {/* Twitter Section */}
                <h1 className="text-[#03A9F4] font-medium text-base mb-6">
                  #Twitter
                </h1>
                {twitter.map((item) => {
                  return (
                    <div
                      onClick={() => router.push("/MissionTwitter")}
                      key={item.id}
                      className="w-full rounded-[10px] p-[19px] border-[1px] bg-[#232B35] border-[rgb(117,117,117)]/[0.04] mb-5 flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <h1 className="font-semibold text-base text-white">
                          {item.title}
                        </h1>
                        <h2 className="font-normal text-xs text-[#A6A6A6] w-[237px] overflow-hidden text-ellipsis">
                          Mision: {item.mission}
                        </h2>
                      </div>
                      <button className="w-[70px] h-[30px] bg-[rgb(255,186,3)]/[0.36] rounded-[8px]">
                        <h1 className="font-bold text-[12px] leading-[14px] text-[#FFBA03]">
                          {item.button} XP
                        </h1>
                      </button>
                    </div>
                  );
                })}

                {/* Discord Section */}
                <h1 className="text-[#6665D2] font-medium text-base mt-[34px] mb-6">
                  #Discord
                </h1>
                {Discord.map((item) => {
                  return (
                    <div
                      onClick={() => router.push("/MissionDiscord")}
                      key={item.id}
                      className="w-full rounded-[10px] p-[19px] border-[1px] bg-[#232B35] border-[rgb(117,117,117)]/[0.04] mb-5 flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <h1 className="font-semibold text-base text-white">
                          {item.title}
                        </h1>
                        <h2 className="font-normal text-xs text-[#A6A6A6] w-[237px] overflow-hidden text-ellipsis">
                          Mision: {item.mission}
                        </h2>
                      </div>
                      <button className="w-[70px] h-[30px] bg-[rgb(255,186,3)]/[0.36] rounded-[8px]">
                        <h1 className="font-bold text-[12px] leading-[14px] text-[#FFBA03]">
                          {item.button} XP
                        </h1>
                      </button>
                    </div>
                  );
                })}

                {/* Community Section */}
                <h1 className="text-[#FE702A] font-medium text-base mt-[34px] mb-6">
                  #Community
                </h1>
                {Community.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        router.push(item.route);
                      }}
                      key={item.id}
                      className="w-full rounded-[10px] p-[19px] border-[1px] bg-[#232B35] border-[rgb(117,117,117)]/[0.04] mb-5 flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <h1 className="font-semibold text-base text-white">
                          {item.title}
                        </h1>
                        <h2 className="font-normal text-xs text-[#A6A6A6] w-[237px] overflow-hidden text-ellipsis">
                          Mision: {item.mission}
                        </h2>
                      </div>
                      <button className="w-[70px] h-[30px] bg-[rgb(255,186,3)]/[0.36] rounded-[8px]">
                        <h1 className="font-bold text-[12px] leading-[14px] text-[#FFBA03]">
                          {item.button} XP
                        </h1>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="min-h-screen min-w-fit bg-[#171c23]">
    //   <Modal
    //     onClose={() => {
    //       setOpenMission(!OpenMission);
    //     }}
    //     open={OpenMission}
    //     style={{}}
    //   >
    //     <div className="flex justify-center items-center">
    //       <div className="absolute m-[auto] top-[30vh]">
    //         <CopyLinkPopUpFormBuilder
    //           url={`${
    //             typeof window == "undefined"
    //               ? "dontknow"
    //               : window.location.origin
    //           }/community/${communityId}`}
    //           forWhichComponent="community"
    //         />
    //       </div>
    //     </div>
    //   </Modal>
    //   {/* Main Div */}
    //   <div className="h-full w-full  flex">
    //     {/* Sidebar */}
    //     <Sidebar />
    //     <div className="w-full h-full">
    //       <Header />
    //       <div className="w-full h-full">

    //     </div>
    //   </div>
    // </div>
  );
};

export default MissionMain;
