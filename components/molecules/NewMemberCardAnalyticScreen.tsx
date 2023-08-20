import { FaDiscord } from "react-icons/fa";
import { PlatformIconWithBox } from "../atoms/PlatformIconWithBox";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function NewMemberCardAnalyticScreen() {
  useEffect(() => {
    fetchData();
  }, []);
  const [membersData, setmembersData] = useState([{}]);
  async function fetchData() {
    var wallet_id = "";
    if (typeof window !== "undefined") {
      const storedJsonData = localStorage.getItem("data");
      // console.log(storedJsonData)
      const jsonData = JSON.parse(storedJsonData ?? "{}");
      wallet_id = jsonData.wallet_id;
      console.log(jsonData);
    }
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
      setmembersData(rowData.Members);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="h-[350px] w-[668px] bg-[#242B35] rounded-[20px] pt-[23px] pb-[22.72px] overflow-hidden ">
        <div className="w-full h-full flex flex-col ">
          <div className="flex justify-between items-center mb-[30px] px-6">
            <h1 className="text-white font-medium text-2xl">New members</h1>
            {/* <button className="text-[#D9D9D9] font-normal text-sm">
              Show all
            </button> */}
          </div>

          {/* Data Table*/}

          <div className="w-full  grid grid-cols-[196px,180px,197px,auto] mb-4 px-6">
            <h1 className="font-normal text-xs text-[#AEABD8]">Profile ID</h1>
            <h1 className="font-normal text-xs text-[#AEABD8]">Joined date</h1>
            <h1 className="font-normal text-xs text-[#AEABD8]">
              Completed missions
            </h1>
            <h1 className="font-normal text-xs text-[#AEABD8]">Platform</h1>
            {/* Actual Data */}
          </div>

          <div className="flex-grow-[1] overflow-hidden">
            {membersData?.map((member: any) => {
              return (
                <div
                  key={member.id}
                  className="w-full grid grid-cols-[196px,180px,197px,auto] mb-[19.72px] hover:bg-[#D9D9D90F] py-2 cursor-pointer px-6"
                >
                  {/* Avatar and username */}
                  <div className=" flex items-center gap-[10.8px]">
                    <div className="w-[38px] h-[38px] rounded-full overflow-hidden">
                      <img src="/Icons/profileTemplate.jpg" alt="Avatar" className="w-full h-full object-cover"/>
                    </div>
                    <div className=" font-normal text-base text-white">
                      @{member.User_name}
                    </div>
                  </div>

                  {/* Joined Date */}
                  <h1 className="font-normal flex items-center text-base text-white">
                    {new Date(member.date_of_join).toLocaleDateString()}
                  </h1>

                  {/* Completed Missions */}
                  <h1 className=" font-normal text-base flex items-center text-white ">
                    {Array.isArray(member.missions_completed)
                      ? member.missions_completed.length
                      : 0}
                  </h1>

                  {/* Platform */}
                  <div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="flex-grow-[1]]">

// {membersData?.map((member: any) => (
//     <div
//       key={member.id}
//       className="w-full grid grid-cols-[196px,180px,197px,auto] grid-rows-4 "
//     >
//       <div className="avatar flex items-center gap-[10.8px]">
//         <div className="w-[38px] h-[38px] rounded-full">
//           <img src="/Icons/Ellipse 14.png" alt="Avatar" />
//         </div>
//         <div className=" text-[#FFFFFF] text-[16px] font-[400] font-[General Sans] left-[65px]">
//           @{member.User_name}
//         </div>
//       </div>

//       <div className=" text-[#FFFFFF] text-[16px] font-[400] font-[General Sans] left-[280px] ">
//         {new Date(member.date_of_join).toLocaleDateString()}
//       </div>

//       <div className=" text-[#FFFFFF] text-[16px] font-[400] font-[General Sans] left-[520px] ">
//         {Array.isArray(member.missions_completed)
//           ? member.missions_completed.length
//           : 0}
//       </div>

//       <div></div>
//     </div>
//   ))}
// </div>
