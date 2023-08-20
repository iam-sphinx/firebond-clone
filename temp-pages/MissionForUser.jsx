import React, { useEffect, useState } from "react";
import BeAchamp from "@/components/molecules/BeAchamp";
import MissionStepsCard from "@/components/molecules/MissionStepCard";
import Image from "next/image";
import router from "next/router";
import { supabase } from "@/utils/supabaseClient";
import EditMission from "@/utils/EditMission";
import { useRouter } from "next/router";
import MissionFormData from "@/utils/MissionFormData";
import UserHeader from "@/components/molecules/UserHeader";
import UserSidebar from "@/components/molecules/UserSidebar";
import QuizMission from "@/utils/QuizMission";
import DiscordVerificationUser from "@/components/molecules/DiscordVerificationUser";
import QuizForUser from "@/components/molecules/QuizForUser";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import Answer from "@/utils/Answer";
import axios from "axios";

// const [file, setFile] = useState("");
var community_id = "";
var user_wallet_id = "";

function MissionForUser(props: any) {
  // you cant extend props as it is a non extensible object (to be resolved)
  // to implement router vaali thing after khana khaakey.
  const [type, setType] = useState(5);
  const [fileName, setFileName] = useState("");
  const obj2 = EditMission();
  let obj = MissionFormData();
  const obj3 = QuizMission();
  let obj4 = Answer();
  const [missionUrl, setmissionUrl] = useState("");
  const router = useRouter();
  const [title, settitle] = useState("Mission title");
  const [copyLink, setcopyLink] = useState("Copy");
  const [description, setdescription] = useState(`here comes the description.`);
  const [tags, settags] = useState(["NoTags"]);
  const [xp, setXp] = useState(0);
  const [referralUrl, setReferralUrl] = useState("");
  const [validationUrl, setValidationUrl] = useState("");
  const [missionSteps, setmissionSteps] = useState([
    "Heading 1",
    "Subheading 1",
    "Heading 2",
    "Subheading2",
  ]);
  const [reward, setreward] = useState(1000);
  const [coinType, setcoinType] = useState("USDC");
  const [invites, setInvites] = useState("0");
  const [isCompleted, setIsCompleted] = useState(false);
  let missionDetails
  console.log(router.query.myData);
  if (router.query.myData !== undefined) {
    missionDetails = JSON.parse(router.query.myData as string);
  } else {
    missionDetails = {};
  }
  const [data, setData] = useState();
  useEffect(() => {
    setreward(missionDetails.amount);
    setReferralUrl(missionDetails.referralUrl);
    setValidationUrl(missionDetails.validationUrl);
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
    setXp(missionDetails.xp);
    console.log("xp set kiya hai", xp);
    setIsCompleted(false);
  }, [router.query.myData]);

  // const coinType = "USDC";
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("yahan aa raha");
      const storedJsonData = localStorage.getItem("data");
      const storedJsonwallet = localStorage.getItem("user_wallet_id");
      const storedJsonCommunity = localStorage.getItem("community_id");
      const jsonData = JSON.parse(storedJsonData ?? "{}");
      // console.log(storedJsonwallet,storedJsonCommunity)
      if (storedJsonCommunity !== null) {
        community_id = storedJsonCommunity;
      }
      if (storedJsonwallet !== null) {
        user_wallet_id = storedJsonwallet;
      }
      const arr = [
        "file",
        "link",
        "url",
        "invite",
        "text",
        "empty",
        "quiz",
        "feedback",
        "referral",
      ];
      let temp;
      // console.log("yahan aa raha",missionDetails)
      arr.forEach((item, index) => {
        if (
          missionDetails.submission_type &&
          missionDetails.submission_type.type === item
        ) {
          console.log("dekho", missionDetails.submission_type);
          setInvites(missionDetails.submission_type.invites);

          temp = index;

          setType(index);
        }
      });
      if (type === 5) {
        setIsCompleted(true);
      }
      console.log("mission detalis ka submission type", type);
    }
  }, []);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  async function fetchData(xp: any) {
    try {
      // Fetch the community data row using the user's wallet_id as a filter condition
      const { data: rowData, error } = await supabase
        .from("community_data")
        .select("*")
        .eq("id", community_id)
        .single();

      if (error) {
        console.error("error aa raha", error);
        return;
      }
      console.log("sahi chal raha sab", rowData);
      // setCommunityName(rowData.community_name);
      let updated_rowData = rowData;

      updated_rowData.Members.forEach((val: any, index: any) => {
        if (val.user_wallet_id === user_wallet_id) {
          console.log("in");
          console.log(updated_rowData.Members[index].current_xp, xp, index);

          updated_rowData.Members[index].current_xp += Number(xp);
          updated_rowData.Members[index].missions_completed.push({
            missionId: missionDetails.mission_id,
            Date_Of_Completion: new Date(),
          });
        }
      });
      console.log("updated data", updated_rowData, "previous data", rowData);

      const { data: new_data2, error: new_error2 } = await supabase
        .from("community_data")
        .update({
          Members: updated_rowData.Members,
        })
        .eq("id", Number(community_id));
      if (new_error2) {
        console.log(
          "erorr in updating members data in community data when a user is a new user",
          new_error2
        );
      } else {
        // push him to your space.

        console.log("xp is distributed and missions are pushed in its array");
        router.push("/YourSpace");
      }
      // const members = updated_rowData.Members.filter(
      //   (item: any,index:any) =>{
      //     if(item.user_wallet_id === user_wallet_id){

      //       console.log('in');
      //       return true;
      //           // updated_rowData.Members[index] += xp;
      //     }
      //   }
      // );
      // updated_rowData.
      // console.log(members[0]);
      //update here in the supabase xp of member
    } catch (err) {
      console.error(err);
    }
  }

  async function HandleSubmit() {
    let flag = 1;

    if (type == 8) {
      // setValidationUrl(
      //   "https://mocki.io/v1/a1a76a78-1e18-4efa-81ab-840d74e12244"
      // );

      try {
        const response = await axios.get(validationUrl);
        const data = response.data;
        console.log("check", data);

        const refered = data.referral;
        if (Number(refered) >= Number(invites)) {
          setIsCompleted(true);
        } else {
          alert(
            `sorry ! you need ${
              Number(invites) - Number(refered)
            } referrals more for completion`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Also need to store data to put in Admin's Review Section
    // if admin->routerpush-edit
    // else
    // await connectWallet();
    // console.log(isCompleted);

    if (type == 6) {
      missionDetails.submission_type.answer.forEach((item: any, index: any) => {
        if (item !== obj4.options[index]) {
          console.log("check", obj4.options[index]);
          flag = 0;
          return;
        }
      });
      if (flag === 0) {
        alert("Please choose correct answer");
        return;
      } else {
        setIsCompleted(true);
      }
    }

    if (isCompleted === false) {
      alert("Please complete the task");
      return;
    }

    // not recieving xp inside mission so replacing it with amount.
    // xp = missionDetails.xp;
    console.log(xp);
    if (xp == undefined) {
      setXp(0);
    }
    console.log("yahan hai xp", xp);
    fetchData(xp);

    // community id leni hai local storage se

    // us community ke saare members pe jaana hai jo match kiya uska xp badhana hai

    router.push("/YourSpace");
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name) {
      setFileName(file.name);
      setIsCompleted(true);
    }
  };

  function handleCompletion() {
    setIsCompleted(true);
  }

  const [text, setText] = useState("");

  function handleText(e: any) {
    setText(e.target.value);
    setIsCompleted(true);
  }

  const [url, setUrl] = useState("");
  function handleURL(e: any) {
    setUrl(e.target.value);
    if (url !== "") setIsCompleted(true);
  }

  const [True, setTrue] = useState("false");

  const [feedback, setFeedback] = useState("");

  function handleFeedback(e: any) {
    setFeedback(e.target.value);
  }

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <UserSidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <UserHeader />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <div className="w-full h-[80px] border-b border-[#353B43] flex items-center">
            <Image
              src="/Icons/firebondLogo.svg"
              width={160}
              height={10}
              alt="alt"
              className=""
            />
          </div>

          <div className="flex mt-5">
            <div className="text-[#ffffff] ml-[20px] mb-[10px] w-[auto]  border-[1px] border-[#353B43]  rounded-[20px]">
              <Image
                src="Icons/TechnicalBg.svg"
                width={800}
                height={1}
                alt="kjdfhah"
                className="mx-[10px] my-[10px]"
              />
              <div className="font-semibold text-2xl text-white mx-3 ml-10">
                {title}
              </div>
              <div className="font-medium text-lg text-white-400 mx-3 mt-1  w-[800px]">
                <pre className="overflow-auto no-scrollbar mb-6 ml-6">
                  {description}
                </pre>
                <DiscordVerificationUser />
              </div>
              {type == 0 && (
                <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
                  <h1 className="font-medium text-base text-white mb-[11px]">
                    Upload the file
                  </h1>
                  <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] px-[25px] ">
                    <Image
                      src="Icons/upload.svg"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <input
                      type="file"
                      className=" absolute w-full h-full outline-none bg-inherit opacity-0"
                      onChange={handleFileUpload}
                    />
                    <h1 className="text-xs text-[#D0D0D0A6] font-normal">
                      {fileName ? fileName : "Upload the submission"}
                    </h1>
                  </div>
                  <h1 className="text-xs text-[#A6A6A6] font-normal mt-[9px]">
                    File can be pdf, png, jpeg, doc.x
                  </h1>
                </div>
              )}
              {type == 1 && (
                <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
                  <h1 className="font-medium text-base text-white mb-[11px]">
                    Click on the link
                  </h1>
                  <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
                    <div className="cursor-pointer" onClick={handleCompletion}>
                      {missionDetails.submission_type.link}
                    </div>
                  </div>
                </div>
              )}
              {type == 2 && (
                <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
                  <h1 className="font-medium text-base text-white mb-[11px]">
                    Enter the URL
                  </h1>
                  <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
                    <input
                      type="url"
                      value={url}
                      className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
                      placeholder="Enter URL"
                      onChange={handleURL}
                    />
                  </div>
                </div>
              )}
              {type == 3 && (
                <div className="mt-[36px]">
                  <h1 className="font-medium text-base text-white mb-[11px]">
                    Number of invites
                  </h1>
                  <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
                    <input
                      type="number"
                      className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
                      placeholder="number of invites"
                    />
                  </div>
                </div>
              )}
              {type == 4 && (
                <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
                  <h1 className="font-medium text-base text-white mb-[11px]">
                    Enter Text
                  </h1>
                  <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
                    <input
                      type="text"
                      className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
                      placeholder="Enter text"
                      value={text}
                      onChange={handleText}
                    />
                  </div>
                </div>
              )}
              {type == 6 && (
                <QuizForUser
                  question={missionDetails.submission_type.question}
                  answer={missionDetails.submission_type.answer}
                  options={missionDetails.submission_type.options}
                />
              )}
              {type == 7 && (
                <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
                  <h1 className="font-medium text-base text-white mb-[11px]">
                    Share Your Feedback here
                  </h1>
                  <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
                    <input
                      type="text"
                      className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
                      placeholder="Write Feedback about product"
                      value={text}
                      onChange={handleText}
                    />
                  </div>
                </div>
              )}
              {type == 8 && (
                <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 relative">
                  <h1 className="font-large text-bold text-white ">
                    Share Your Referral Link
                  </h1>
                  <h6 className="mb-6 text-gray">
                    When your friends complete the referral , you will get the
                    rewards for your action
                  </h6>

                  <div className="flex flex-row items-center h-[47px] border-[1px] mt-[50px]   bg-[#2E363F] rounded-[8px]">
                    <div className="flex text-[#D0D0D0] text-[16px] ml-[12px]  ">
                      {referralUrl}
                      <CopyToClipboard text={referralUrl} onCopy={handleCopy}>
                        <MdContentCopy size={20} className="ml-[30px]" />
                      </CopyToClipboard>
                    </div>
                  </div>
                  {copied && (
                    <div className="text-[#FFFFFF] text-[14px] mt-[10px]">
                      Copied!
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col text-[#ffffff] mx-[auto] cursor-pointer ">
              <BeAchamp title={title} tags={tags} val={xp} />
              <div
                onClick={() => {
                  HandleSubmit();
                }}
                className="cursor-pointer mt-[30px] text-center align-middle  font-[500] font-[General Sans] text-[14px]  w-[346px] h-[47px] rounded-[8px] border-white border-[1px]"
              >
                <span className="relative top-3">Submit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="min-h-screen min-w-fit bg-[#171C23] flex  scrollbar-hide">
    //     <UserSidebar />
    //     <div className="h-full w-full">
    //       <UserHeader />
    //       <div className="h-full w-full  flex justify-between">
    //         <div className="grid grid-cols-[1400px] gap-10  bg-[#171C23] grid-rows-[71px,auto] h-[1200px] w-[auto] ">
    //           <div className="flex align-middle border-b-[1px] border-b-[#353B43]">
    //             <Image
    //               src="/Icons/FireBondIcon.png"
    //               width={160}
    //               height={10}
    //               alt="alt"
    //               className=""
    //             />
    //           </div>

    //           <div className="flex">
    //             <div className="text-[#ffffff] ml-[20px] mb-[10px] w-[auto]  border-[1px] border-[#353B43]  rounded-[20px]">
    //               <Image
    //                 src="Icons/TechnicalBg.svg"
    //                 width={800}
    //                 height={1}
    //                 alt="kjdfhah"
    //                 className="mx-[10px] my-[10px]"
    //               />
    //               <div className="font-semibold text-2xl text-white mx-3">
    //                 {title}
    //               </div>

    //               {type == 0 && (
    //                 <div className="mt-[36px]">
    //                   <h1 className="font-medium text-base text-white mb-[11px]">
    //                     Upload the file
    //                   </h1>
    //                   <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] px-[25px] ">
    //                     <Image
    //                       src="Icons/upload.svg"
    //                       alt=""
    //                       height={20}
    //                       width={20}
    //                     />
    //                     <input
    //                       type="file"
    //                       className=" absolute w-full h-full outline-none bg-inherit opacity-0"
    //                       onChange={handleFileUpload}
    //                     />
    //                     <h1 className="text-xs text-[#D0D0D0A6] font-normal">
    //                       {fileName ? fileName : "Upload the submission"}
    //                     </h1>
    //                   </div>
    //                   <h1 className="text-xs text-[#A6A6A6] font-normal mt-[9px]">
    //                     File can be pdf, png, jpeg, doc.x
    //                   </h1>
    //                 </div>
    //               )}
    //               {type == 1 && (
    //                 <div className="mt-[36px]">
    //                   <h1 className="font-medium text-base text-white mb-[11px]">
    //                     Enter the Link
    //                   </h1>
    //                   <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
    //                     <input
    //                       type="url"
    //                       className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
    //                       placeholder="Enter the Link"
    //                     />
    //                   </div>
    //                 </div>
    //               )}
    //               {type == 2 && (
    //                 <div className="mt-[36px]">
    //                   <h1 className="font-medium text-base text-white mb-[11px]">
    //                     Enter the URL
    //                   </h1>
    //                   <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
    //                     <input
    //                       type="url"
    //                       className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
    //                       placeholder="Enter URL"
    //                     />
    //                   </div>
    //                 </div>
    //               )}
    //               {type == 3 && (
    //                 <div className="mt-[36px]">
    //                   <h1 className="font-medium text-base text-white mb-[11px]">
    //                     Number of invites
    //                   </h1>
    //                   <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
    //                     <input
    //                       type="number"
    //                       className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
    //                       placeholder="number of invites"
    //                     />
    //                   </div>
    //                 </div>
    //               )}
    //               {type == 4 && (
    //                 <div className="mt-[36px]">
    //                   <h1 className="font-medium text-base text-white mb-[11px]">
    //                     Enter Text
    //                   </h1>
    //                   <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
    //                     <input
    //                       type="text"
    //                       className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
    //                       placeholder="Enter text"
    //                     />
    //                   </div>
    //                 </div>
    //               )}
    //             </div>
    //             <div className="flex flex-col text-[#ffffff] mx-[auto] ">
    //               <BeAchamp title={title} tags={tags} val={reward} />
    //               <button
    //                 onClick={HandleSubmit}
    //                 className="mt-[30px] text-center align-middle  font-[500] font-[General Sans] text-[14px]  w-[346px] h-[47px] rounded-[8px] border-white border-[1px]"
    //               >
    //                 Submit Work
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default MissionForUser;
