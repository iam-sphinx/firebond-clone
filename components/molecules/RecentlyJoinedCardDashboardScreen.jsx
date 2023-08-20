import { FaDiscord } from "react-icons/fa";
import { PlatformIconWithBox } from "../atoms/PlatformIconWithBox";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

const dummyData = [
  {
    img: "icons/Ellipse_27.svg",
    name: "kandarp",
    joinedOn: "12th march",
  },
  {
    img: "icons/Ellipse_27.svg",
    name: "kandarp",
    joinedOn: "12th march",
  },
  {
    img: "icons/Ellipse_27.svg",
    name: "kandarp",
    joinedOn: "12th march",
  },
  {
    img: "icons/Ellipse_27.svg",
    name: "kandarp",
    joinedOn: "12th march",
  },
];

export default function RecentlyJoinedCardDashboardScreen() {
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
      console.log(membersData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="w-full h-[350px] rounded-[20px] bg-[#242B35]  overflow-hidden ">
        <div className="w-full h-full">
          <div className="flex justify-between items-center mb-[21px] mt-[22px pt-[22px] pl-6 pr-[31px]">
            <h1 className="font-semibold text-2xl text-white">
              Recently joined
            </h1>
            <h2 className="font-normal text-sm text-[#D9D9D9]">show all</h2>
          </div>

          {/* Actual Data */}
          <div className="w-full">
            {membersData?.map((member: any) => {
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between  cursor-pointer hover:bg-[#D9D9D90F] mb-[32px] py-2 pl-6 pr-[31px] "
                >
                  <div className="flex gap-6  items-center">
                    <div className="relative">
                      <div className="h-[32px] w-[32px] rounded-full overflow-hidden">
                        <img
                          src="/Icons/funkyPic.svg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="absolute -top-1 -right-1 bg-[#6359E9] rounded-[3.78px] h-[14px] w-[14px] flex justify-center items-center">
                        {/* twitter or discord */}
                        <FaDiscord size={7} />
                      </div>
                    </div>

                    {/* title */}
                    <h1 className="font-normal text-sm text-white">
                      @{member.User_name}
                    </h1>
                  </div>

                  {/* Joined on */}
                  <h1 className="font-normal text-[#A9A9A9] text-xs">
                    joined on{" "}
                    {new Date(member.date_of_join).toLocaleDateString()}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="h-[350px] w-[400px] bg-[#242B35] rounded-[20px] relative">
        <div>
          <div className="absolute text-[#FFFFFF] font-[General Sans] font-[600] text-[24px] left-[24px] top-[22px]">
            Recently joined
          </div>
          <div className="absolute text-[#D9D9D9] font-[General Sans] font-[400] text-[14px] left-[317px] top-[32px]">
            Show All
          </div>
          <div className="">
            {membersData?.map((member: any) => (
              <div
                key={member.id}
                className="relative avatar top-[75px] left-[24px]"
              >
                <div className="w-[50px] h-[50px] rounded-full">
                  <img src="/Icons/Ellipse 14.png" alt="IMG" />
                </div>
                <div className="absolute left-[30px]">
                  <PlatformIconWithBox
                    Icon={FaDiscord}
                    IconSize={7}
                    IconColor="white"
                    BoxStyle="bg-[#6359E9] w-[14px] h-[14px] rounded-[4px]"
                  />
                </div>
                <div className="relative text-[#FFFFFF] text-[14px] font-[400] font-[General Sans] top-[10px]">
                  @{member.User_name}
                </div>
                <div className="relative text-[#A6A6A6] text-[12px] font-[400] font-[General Sans] top-[10px] left-[90px]">
                  joined on {new Date(member.date_of_join).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
}
