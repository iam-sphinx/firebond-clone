import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import NavbarMissionOnboarding from "@/components/molecules/NavbarMissionOnboarding";
import BeAchamp from "@/components/molecules/BeAchamp";
import MissionStepsCard from "@/components/molecules/MissionStepCard";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
const tags = ["✍️Writing", "📢Marketing"];
export default function MissionTechnicalTutorial() {
  const title = "Write a kickass blog post for Firebond";
  const description = `Web3 education is still in its early stages, and our platform is looking to educate more budding
developers to build in the Web3 space. Our platform is looking for individuals who are proficient in
The Graph Protocol and have a flair for creating technical tutorials suitable for beginners looking to
Create and Deploy a Subgraph. The tutorials should provide thorough explanations to assist learners 
in gaining a full understanding of the functionality of their code.
In terms of compensation, we are open to negotiation based on your experience and also the
quality of your tutorial.
include:
A link to a Graph Protocol tutorial that you have written before
Your Twitter/Github profile
If you do not include these two items, you will not be considered.`;
  const missionSteps = [
    "Create a technical tutorial video",
    "Submit your work",
    "Upload Video",
    "Share the proof of work",
  ];
  const xp = 1000;
  const coinType = "USDC";
  const [input, setInput] = useState("");

  function handleInput(e: any) {
    setInput(e.target.value);
  }

  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileSelect(event: any) {
    setSelectedFile(event.target.files[0]);
  }

  const bucket_name = "Store";
  async function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".mp4";
    input.hidden = true;
    input.addEventListener("change", async () => {
      const files = input.files;
      if (files && files.length > 0) {
        const file = files[0];
        console.log(file);
        const { data, error } = await supabase.storage
          .from(bucket_name)
          .upload(`tutorial/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      }
    });
    input.click();
  }
  const submissionType = { type: "file" };
  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          {/* Edit Section */}
          <NavbarMissionOnboarding
            title={title}
            description={description}
            heading1={missionSteps[0]}
            heading2={missionSteps[1]}
            subheading1={missionSteps[2]}
            subheading2={missionSteps[3]}
            submission_type={submissionType}
            xp={xp}
          />

          {/* Main Content Section */}
          <div className="mt-6 flex justify-center items-center">
            <div className="flex">
              <div className="text-[#ffffff] ml-[20px] mb-[50px] w-[auto]  border-[1px] border-[#353B43] rounded-[20px]">
                <Image
                  src="Icons/TechnicalBg.svg"
                  width={800}
                  height={1}
                  alt="alt"
                  className="mx-[10px] my-[10px] mb-[40px]"
                />

                <div className="font-semibold text-2xl text-white mx-3">
                  Technical Tutorials for Firebond
                </div>
                <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
                  <pre className="overflow-auto no-scrollbar font-['General Sans']">
                    {description}
                  </pre>

                  <div className="mt-[60px] mb-3">
                    <MissionStepsCard
                      heading1="Follow our Twitter handle"
                      descp1="Follow us"
                      heading2="Submit your work"
                      descp2="Share the proof of work"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[#ffffff] w-[auto] h-[auto] ml-[30px]">
                <BeAchamp
                  title="Technical Tutorials for Firebond"
                  tags={tags}
                  val={xp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    //     <div>
    //       <div className="grid grid-cols-[auto,auto] gap-0  bg-[#171C23] grid-rows-[71px,100px,auto] h-[1500px] w-full md:grid-cols-[auto,1fr]">
    //         <div className="row-span-3 border-r-[1px] border-r-[#353B43]">
    //           <Sidebar />
    //         </div>
    //         <div className="border-b-[1px] border-b-[#353B43]">
    //           <Header />
    //         </div>
    //         <div className="">
    //           <NavbarMissionOnboarding
    //             title={title}
    //             description={description}
    //             heading1={missionSteps[0]}
    //             heading2={missionSteps[1]}
    //             subheading1={missionSteps[2]}
    //             subheading2={missionSteps[3]}
    //           />
    //         </div>
    //         <div className="flex">
    //           <div className="text-[#ffffff] ml-[20px] mb-[10px] w-[auto]  border-[1px] border-[#353B43] rounded-[20px]">
    //             <Image
    //               src="/MissionPageBanner.png"
    //               width={800}
    //               height={1}
    //               alt="alt"
    //               className="mx-[10px] my-[10px]"
    //             />

    //             <div className="font-semibold text-2xl text-white mx-3">
    //               Technical Tutorials for Firebond
    //             </div>
    //             <div className="font-medium text-lg text-gray-400 mx-3 mt-4 w-[800px]">
    //               <pre className="overflow-auto no-scrollbar font-['General Sans']">
    //                 {description}
    //               </pre>

    //               <div className="my-[60px]">
    //                 <MissionStepsCard
    //                   heading1={"Write a kickass blog"}
    //                   descp1={missionSteps[0]}
    //                   heading2="Share the proof of work"
    //                   descp2={missionSteps[1]}
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           <div className="text-[#ffffff] w-[auto] h-[auto] ml-[30px]">
    //             <BeAchamp
    //               title="Technical Tutorials for Firebond"
    //               tags={tags}
    //               val="2.9"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
}

// {
//   /**
// Web3 education is still in its early stages, and our platform is looking to educate more budding developers to build in the Web3 space. Our platform is looking for individuals who are proficient in The Graph Protocol and have a flair for creating technical tutorials suitable for beginners looking to Create and Deploy a Subgraph. The tutorials should provide thorough explanations to assist learners in gaining a full understanding of the functionality of their code.
// In terms of compensation, we are open to negotiation based on your experience and also the quality of your tutorial.
// include:
// A link to a Graph Protocol tutorial that you have written before
// Your Twitter/Github profile
// If you do not include these two items, you will not be considered.
//  */
// }
