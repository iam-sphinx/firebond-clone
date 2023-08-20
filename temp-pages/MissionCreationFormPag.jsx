import React, { useEffect, useState } from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import Image from "next/image";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import BasicInfoCard from "@/components/molecules/BasicInfoCard";
import SubmissionCard from "@/components/molecules/SubmissionCard";
import Details from "@/components/molecules/Details";
import Todo from "@/components/molecules/Todo";
import Priority from "@/components/molecules/Priority";
import Tags from "@/components/molecules/Tags";
import Reccurence from "@/components/molecules/Reccurence";
import MissionFormData from "@/utils/MissionFormData";
import { supabase } from "@/utils/supabaseClient";
import { Modal } from "@material-ui/core";
import CopyLinkPopUpFormBuilder from "@/components/molecules/CopyLinkPopUpFormBuilder";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";

import QuizMission from "@/utils/QuizMission";

import Link from "next/link";
import Details2 from "@/components/molecules/Details2";
import router from "next/router";

console.log("missiontempeditobj->", MissionFormData());
const MissionCreationFormPage = () => {
  const [True, setTrue] = useState(false);
  const [OpenMission, setOpenMission] = useState(false);
  const obj = MissionFormData();
  const obj2 = QuizMission();
  const [MissionId, setMissionId] = useState("");
  var wallet_id: null;
  if (typeof window !== "undefined") {
    const storedJsonData = localStorage.getItem("data");
    const jsonData = JSON.parse(storedJsonData ?? "{}");
    wallet_id = jsonData.wallet_id;
  }

  function handleTrue(){
    setTrue(!True);
  }


  // generate random mission id
  let date = new Date();
  const generateRandom = () => String(date.getTime());

  async function onCreateClick() {
    if (obj.title == "" || obj.title == undefined) {
      alert(`Title can't be empty`);
      return;
    } else if (obj.description == "" || obj.description == undefined) {
      alert("Please add some description");
      return;
    }

 
    var temp = generateRandom();
    setMissionId(temp);
    obj.mission_id = temp;

    console.log("obj->", obj);
    // console.log(obj);

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
      // console.log(rowData);
      var mission = rowData.missions;
      if (rowData.missions == null) mission = [obj];
      else {
        mission.push(obj);
      }

      // Update the row with the new missions
      const { data, error: updateError } = await supabase
        .from("community_data")
        .update({
          missions: mission,
        })
        .eq("wallet_id", wallet_id); // specify the row to update using a filter condition
      if (updateError) {
        alert("Failed to create mission please create again");
        console.error(updateError);
      } else {
        setOpenMission(!OpenMission);
        setTimeout(() => {
          setOpenMission(false);
        }, 3000);
        console.log("Missions updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
    router.push("/MissionMain")
  }



  return (
    <>
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
              }/missions/${MissionId}`}
              forWhichComponent="mission"
            />
          </div>
        </div>
      </Modal>


      <div className='h-screen min-w-fit bg-[#171C23] flex'>
        <Sidebar/>

        {/* Main Section */}
        <div className="w-full h-full overflow-auto scrollbar-hide ">
            <Header/>

            {/* Centeral Section */}
            <div className='flex-[1]'>

               
            <div className="w-full h-[115px]  border-b-[1px] border-[#353B43] px-6 py-7 sticky top-[80px] bg-[#171C23] z-10">
              <div className="h-full w-full">
                <h1 className="font-medium text-[14px] leading-[18.9px] mb-2 text-[#A6A6A6]">
                  <Link href="/MissionMain" className="inline">
                    Mission
                  </Link>
                  /<div className="inline text-[white] font-[600]">Create</div>
                </h1>
                <div className="h-full w-full flex justify-between items-center">
                  <h1 className="font-semibold text-2xl text-white">
                    Missions
                  </h1>
                  <div className="flex gap-3">
                    {/* <button className="text-[14px] leading-[18.9px] w-[98px] h-[33px] flex justify-center items-center text-[#757575] border-[#757575] border-[1px] rounded-[8px] hover:bg-white hover:text-black hover:border-white">
                      Save
                    </button> */}
                    <button
                      className="text-[14px] leading-[18.9px] w-[98px] h-[33px] flex justify-center items-center text-[#757575] border-[#757575] border-[1px] rounded-[8px] hover:bg-white hover:text-black hover:border-white"
                      onClick={onCreateClick}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Section */}
            <div className="h-full flex  justify-between">
              {/* Left Section */}
              <div className="max-w-[800px] h-full mt-[28px]  flex justify-center px-6 mx-auto items-center">
                <div>
                  {/* Basic Info */}
                  <BasicInfoCard />

                  {/* Submission type */}
                  <SubmissionCard rendertrue = {handleTrue} />

                  {/* Details */}
                  <Details2 />
                </div>
              </div>

              {/* Right Section */}
              <div className="h-auto max-w-[437px] border-l-[1px] border-[#353B43] pt-[37px] pl-[30px] pr-[24px]">
                <div>
                  {/* Status */}
                  <Todo />

                  {/* Priority */}
                  <Priority />

                  {/* Tags */}
                  <Tags />

                  {/* Recurrence */}
                  {/* <Reccurence /> */}
                  {!True && <div className="mt-5">
                    How to Do Referral Mission
                    <div className="items-center h-auto border-[1px] mt-[10px]  bg-[#2E363F] rounded-[8px] p-2 outline-gray-400">
                      <span className="mb-2">
                        1. Paste your invite platform api key in the API Key
                        field
                      </span>
                      <br></br>
                      <span className="mb-2">
                        2. First URL will be responsible for generation of
                        referral key
                      </span>
                      <br></br>
                      <span className="mb-2">
                        3. Second URL would be responsible for validation that
                        how many people were actually invited by the user using
                        that particular referral key
                      </span>
                      <br></br>
                    </div>
                  </div>}
                </div>
              </div>
            </div>


            </div>
            
        </div>
    </div>
    
    </>
  );
};

export default RouteGuardAdmin(MissionCreationFormPage);
