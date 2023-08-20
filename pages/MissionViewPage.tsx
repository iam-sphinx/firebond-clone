import React, { useEffect, useState } from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import NavbarMissionOnboarding from "@/components/molecules/NavbarMissionOnboarding";
import BeAchamp from "@/components/molecules/BeAchamp";
import MissionStepsCard from "@/components/molecules/MissionStepCard";
import Image from "next/image";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
import { useRouter } from "next/router";
import { render } from "react-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { setRequestMeta } from "next/dist/server/request-meta";
import EditMission from "@/utils/EditMission";
import MissionFormData from "@/utils/MissionFormData";

function MissionViewPage() {
  // let missionUrl;
  const obj2 = EditMission();
  let obj = MissionFormData();
  const [missionUrl, setmissionUrl] = useState("");
  const router = useRouter();
  const [title, settitle] = useState("Mission title");
  const [copyLink, setcopyLink] = useState("Copy Mission Link");
  const [description, setdescription] = useState(`here comes the description.`);
  const [tags, settags] = useState(["NoTags"]);
  const [missionSteps, setmissionSteps] = useState([
    "Heading 1",
    "Subheading 1",
    "Heading 2",
    "Subheading2",
  ]);
  const [reward, setreward] = useState(1000);
  const [coinType, setcoinType] = useState("USDC");
  let missionDetails: any;
  console.log(router.query.myData);
  if (router.query.myData !== undefined) {
    missionDetails = JSON.parse(router.query.myData as string);
  } else {
    missionDetails = {};
  }
  const [data, setData] = useState();
  useEffect(() => {
    setreward(missionDetails.xp);
    let newTags: any = [];

    if (missionDetails.tags != null && missionDetails.tags != undefined) {
      newTags = [];
      missionDetails.tags.map((val: any) => {
        newTags.push(val.title);
      });
    }

    setmissionUrl(
      `${
        typeof window == "undefined" ? "dontknow" : window.location.origin
      }/missions/${missionDetails.mission_id}`
    );
    settags(newTags);
    settitle(missionDetails.title);
    setdescription(missionDetails.description);
    setmissionSteps([
      missionDetails.heading1 || "NotAvailable",
      missionDetails.subheading1 || "NotAvailable",
      missionDetails.heading2 || "NotAvailable",
      missionDetails.subheading2 || "NotAvailable",
    ]);
  }, [router.query.myData]);

  function onEditClick() {
    // function handleEdit(){
    console.log("in");
    if (missionDetails !== undefined) {
      obj.title = missionDetails.title;
      obj.amount = missionDetails.amount;
      obj.seleted_date = missionDetails.seleted_date;
      obj.description = missionDetails.description;
      obj.submission = missionDetails.submission;
      obj.filename = missionDetails.filename;
      obj.wallet_id = missionDetails.wallet_id;
      obj.visibility = missionDetails.visibility;
      obj.submission_type =missionDetails.submission_type;
      obj.validationUrl = missionDetails.submission_type.validationUrl
      obj.status = missionDetails.status;
      obj.priority = missionDetails.priority;
      obj.tags = missionDetails.tags;
      obj.recurrence = missionDetails.recurrence;
      obj.mission_id = missionDetails.mission_id;
      obj.referralUrl = missionDetails.submission_type.referralUrl
      obj.heading1 = missionDetails.heading1;
      obj.subheading1 = missionDetails.subheading1;
      obj.heading2 = missionDetails.heading2;
      obj.subheading2 = missionDetails.subheading2;
      
      //  obj = missionDetails;
      console.log("obj->", obj);
      console.log("md->", missionDetails);
      router.push("/MissionEdit");
    }

    // router.push('/MissionTemplateEdit');

    // }
  }

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1] flex justify-center items-center ">
          {/* <div className="flex align-middle border-b-[1px] border-b-[#353B43]"> */}
          {/* <Image src="/Icons/FireBondIcon.png" width={160} height={10} alt='kjdfhah' className=''/>
          <div className="absolute w-[124px] h-[39px] right-[0px] top-[20px]  bg-[#313131] rounded-[25px] flex items-center justify-center">
                
            <button type="button" className="text-white font-small" onClick={()=>{router.push('/MissionMain')}} >
                All Missions
            </button>
        </div>
        <div className="absolute mr-[10px] w-[124px] h-[39px] right-[124px] top-[20px]  bg-[#313131]  flex items-center justify-center">
            
        <CopyToClipboard text={missionUrl}>

              <button type="button" className="text-white font-small" onClick={()=>{setcopyLink("Copied")}} >
                {copyLink}
            </button>      
              
               
         </CopyToClipboard>
         
        </div> */}
          {/* </div> */}

          <div>
            <div className="w-full h-full flex overflow-auto scrollbar-hide">
              <div className="text-[#ffffff] ml-[20px] m-[10px] w-[auto]  border-[1px] border-[#353B43]  rounded-[20px]">
                <Image
                  src="/MissionPageBanner.png"
                  width={800}
                  height={1}
                  alt="kjdfhah"
                  className="mx-[10px] my-[10px]"
                />
                <div className="font-semibold text-2xl text-white mx-3">
                  {title}
                </div>
                <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
                  <pre className="overflow-auto no-scrollbar">
                    {description}
                  </pre>
                  <div className="my-[60px]">
                    <MissionStepsCard
                      heading1={missionSteps[0]}
                      descp1={missionSteps[1]}
                      heading2={missionSteps[2]}
                      descp2={missionSteps[3]}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-[#ffffff] m-[10px] ">
                <BeAchamp title={title} tags={tags} val={reward} />
                <div
                  onClick={onEditClick}
                  className="cursor-pointer mt-[30px] text-center align-middle  font-[500] font-[General Sans] text-[14px]  w-[346px] h-[47px] rounded-[8px] border-white border-[1px]"
                >
                  <span className="relative top-3">Edit</span>
                </div>
                <CopyToClipboard text={missionUrl}>
                  <div
                    onClick={() => {
                      setcopyLink("Mission Link Copied");
                    }}
                    className="cursor-pointer mt-[30px] text-center align-middle  font-[500] font-[General Sans] text-[14px]  w-[346px] h-[47px] rounded-[8px] border-white border-[1px]"
                  >
                    <span className="relative top-3">{copyLink}</span>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteGuardAdmin(MissionViewPage);
