import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import { supabase } from "@/utils/supabaseClient";
import { use, useId, useState } from "react";
import { useEffect } from "react";

const Review = () => {
  const [ApprovedMissions, setApprovedMissions] = useState([{}]);
  const [PendingMissions, setPendingMissions] = useState([{}]);
  const [forReRender, setforReRender] = useState(false);

  async function onAcceptClick(val: any) {
    const { data, error } = await supabase
      .from("approve")
      .insert({ answer: val.Answer, question: val.Question });
    if (error) {
      console.log("error in approval");
    } else {
      console.log("approved/updated");
    }

    const { data: deletedata, error: updateerror } = await supabase
      .from("Pending")
      .delete()
      .match({ id: val.id });

    if (updateerror) {
      console.log("error in deletion");
    } else {
      console.log("deleted");
    }

    setforReRender(!forReRender);
  }

  async function onRejectClick(val: any) {
    const { data, error } = await supabase
      .from("Pending")
      .delete()
      .match({ id: val });
    if (error) {
      console.log("error in deletion");
    } else {
      console.log("deleted");
    }
    setforReRender(!forReRender);
  }

  useEffect(() => {
    async function PendingDataFetch() {
      const { data, error } = await supabase.from("Pending").select("*");
      console.log("dat->", data);
      if (data) {
        setPendingMissions(data);
      } else {
        console.log("pending data is not available");
      }
    }
    async function ApprovedDataFetch() {
      const { data, error } = await supabase.from("approve").select("*");
      console.log("datApproved->", data);
      if (data) {
        setApprovedMissions(data);
      } else {
        console.log("pending data is not available");
      }
    }
    ApprovedDataFetch();
    PendingDataFetch();
  }, [forReRender]);

  // console.log("hellob->", PendingMissions);

  // console.log("helloapproved->", ApprovedMissions);
  const ApprovedMissionsList = ApprovedMissions.map(
    (value: any, index: any) => {
      return (
        <div
          key={index}
          className="flex rounded-[10px] flex-col text-center justify-center border-[1px] my-[10px]  mx-[10px]"
        >
          Question: {value.question}
          <br></br>
          Answer:{value.answer}
        </div>
      );
    }
  );

  const PendingMissionsList = PendingMissions.map((value: any, index: any) => {
    return (
      <div
        key={index}
        className="flex rounded-[10px] flex-col text-center justify-center border-[1px] my-[10px]  mx-[10px]"
      >
        Question: {value.Question}
        <br></br>
        Answer:{value.Answer}
        <span>
          <button
            onClick={() => {
              onAcceptClick(value);
            }}
            className="rounded-[3px] bg-[green] border-[1px] border-[white] m-3"
          >
            Approve
          </button>{" "}
          <button
            onClick={() => {
              onRejectClick(value.id);
            }}
            className="rounded-[3px] bg-[red] border-[1px] border-[white] m-3"
          >
            Reject
          </button>
        </span>
      </div>
    );
  });

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <div className="flex flex-col">
            {/* Introduction */}
            <div className="w-full h-[115px] border-b border-[#253B43] flex items-center justify-start px-6 mb-[33px]">
              <div className="w-full">
                <h1 className="font-semibold text-2xl text-white">Reviews</h1>
              </div>
            </div>
            <hr className="border-[#353B43] border-[1px]" />
            <div className=" grid grid-cols-[auto,auto]  grid-rows-[auto] gap-[70px] m-[50px]">
              <div className=" flex flex-col border-[1px] border-[#353B43] rounded-[20px]">
                <div className="flex justify-center h-[auto]  w-[400px] text-[30px] text-[white] pt-6 mx-auto ">
                  Pending{" "}
                </div>
                <div className="my-[20px] flex-col scrollbar h-[600px] overflow-auto justify-center align-middle text-[30px] text-[white]  ">
                  {PendingMissionsList}{" "}
                </div>
              </div>
              <div className=" flex flex-col border-[1px] border-[#353B43] rounded-[20px]">
                <div className="flex justify-center h-[auto]  w-[400px] text-[30px] text-[white] pt-6 mx-auto ">
                  Approved
                </div>
                <div className="my-[20px] flex-col h-[600px]  overflow-auto scrollbar justify-center  text-[30px] text-[white] px-4">
                  {ApprovedMissionsList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
