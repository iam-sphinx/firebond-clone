import EditMission from "@/utils/EditMission";
import MissionFormData from "@/utils/MissionFormData";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiPencil, HiRocketLaunch } from "react-icons/hi2";
import CopyLinkPopUpFormBuilder from "./CopyLinkPopUpFormBuilder";
import { Modal } from "@material-ui/core";
import Link from 'next/link';

const NavbarMissionOnboarding = (props: any) => {
  const obj2 = EditMission();
  const router = useRouter();
  function handleEdit() {
    obj2.title = props.title;
    obj2.description = props.description;
    obj2.heading1 = props.heading1;
    obj2.heading2 = props.heading2;
    obj2.description1 = props.subheading1;
    obj2.description2 = props.subheading2;

    router.push("/MissionTemplateEdit");
  }
  const obj = MissionFormData();
  const [OpenMission, setOpenMission] = useState(false);
  const [MissionId, setMissionId] = useState("");
  var wallet_id = "";
  if (typeof window !== "undefined") {
    const storedJsonData = localStorage.getItem("data");
    // console.log(storedJsonData)
    const jsonData = JSON.parse(storedJsonData ?? "{}");
    wallet_id = jsonData.wallet_id;
    console.log(jsonData);
  }
  // random string generator
  let date = new Date;
  const generateRandom = () => String(date.getTime());

  async function handlePublish() {
    var temp = generateRandom();
    setMissionId(temp);
    obj.title = props.title;
    obj.description=props.description;
    obj.submission_type = props.submission_type;
    obj.mission_id = temp;
    obj.xp = props.xp; 
    setOpenMission(!OpenMission)
    console.log(obj);
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
      var mission = rowData.missions;
      if (rowData.missions == null) mission = obj;
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
        console.error(updateError);
      } else {
        console.log("Missions updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
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
          <div className=" m-[auto] ">
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
    <div className="h-[115px] w-full border-b border-[#353B43] px-6 py-[28px] sticky top-[80px] z-10 bg-[#171C23]">
      <div className="h-full w-full">

        <h1 className="mb-2 flex gap-1 text-[#A6A6A6] text-sm font-medium">
          <Link href="/MissionMain" className="inline">Mission</Link>/
          <Link href="/MissionTemplatePage" className="inline">Template</Link>/
          <div className="inline text-[white] font-[600]">{props.title}</div>
        </h1>
      
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-white">Missions</h1>
          <div className="flex gap-4">
            <button
              className="px-7 h-[33px] flex justify-center items-center rounded-lg border border-[#A9A9A9] hover:border-[white] hover:text-white text-[#A9A9A9] font-normal text-sm hover:font-medium"
              onClick={() => {
                router.push("/MissionMain");
              }}
            >
              Back
            </button>
            <button className="px-7 h-[33px] flex justify-center items-center rounded-lg border border-[#A9A9A9] hover:border-[white] hover:text-white text-[#A9A9A9] font-normal text-sm hover:font-medium"
            onClick={()=>{
              handlePublish();
            }}>
              <div className="flex justify-center items-center gap-2">
                <HiRocketLaunch size={16} />
                <h1>Publish</h1>
              </div>
            </button>
            <button
              className="px-7 h-[33px] flex justify-center items-center rounded-lg border border-[#A9A9A9] hover:border-[white] hover:text-white text-[#A9A9A9] font-normal text-sm hover:font-medium"
              onClick={() => {
                handleEdit();
              }}
            >
              <div className="flex items-center gap-2">
                <HiPencil size={16} />
                <h1>Edit</h1>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>

    // <div className="sticky top-0  bg-[#171C23] border-b border-gray-800 h-[80px]">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between h-16">
    //       <div className="flex items-center">
    //         <div className="hidden md:block">
    //           <div className="flex items-baseline flex-col justify-center space-y-1 md:flex-row md:space-y-0 md:space-x-4">
    //             <div className="text-gray-300 text-sm ">Mission/Templates</div>
    //             <h1 className="text-white text-lg font-bold">Mission</h1>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <div className=" md:block">
    //           <div className="flex items-baseline space-x-4 ">
    //             <button
    //               onClick={() => {
    //                 router.push("/MissionMain");
    //               }}
    //               className="bg-transparent text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-transparent"
    //             >
    //               Back
    //             </button>
    //             <button className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
    //               Publish
    //             </button>
    //             <button
    //               onClick={() => {
    //                 handleEdit();
    //               }}
    //               className="bg-transparent text-gray-300 hover:text-white px-3 py-2  rounded-md text-sm font-medium border border-gray-300 hover:border-transparent"
    //             >
    //               Edit
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default NavbarMissionOnboarding;
