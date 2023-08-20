import MissionFormData from "@/utils/MissionFormData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import QuizMission from "@/utils/QuizMission";
import DiscordVerificationUser from "./DiscordVerificationUser";
import BasicInfoCard from "./BasicInfoCard";
import ReferralCard from "./ReferralCard";
import { supabase } from "@/utils/supabaseClient";

const SubmissionCard = (props: any) => {
  const obj = MissionFormData();
  const obj2 = QuizMission();

  const [type, setType] = useState(Array(9).fill(false));
  const [fileName, setFileName] = useState("");
  const [link, setLink] = useState("");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  //disable
  const [isDisable, setIsDisable] = useState(false);

  //making states for referral url and validation url
  const [apiUrl, setApiUrl] = useState("");
  const [validationUrl, setValidationUrl] = useState(obj.validationUrl);

  const [invites, setInvites] = useState("0");
  const [referralUrl, setReferralUrl] = useState(obj.referralUrl);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name) {
      setFileName(file.name);
    }
  };

  var selected = 4;
  const arr = [
    { type: "file" },
    { type: "link", link: link },
    { type: "url" },
    { type: "invite" },
    { type: "empty" },
    { type: "text" },
    {
      type: "quiz",
      question: obj2.question,
      options: obj2.options,
      answer: obj2.answer,
    },
    { type: "feedback" },
    {
      type: "referral",
      generateReferralUrl: referralUrl,
      invites: invites,
    },
  ];
  type.forEach((item, index) => {
    if (item === true) {
      selected = index;
    }
  });
  console.log(arr[selected]);
  obj.submission_type = arr[selected];

  function handlelink(e: any) {
    setLink(e.target.value);
  }

  useEffect(() => {
    props.rendertrue();
  }, [type[8]]);


  const localData =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("data") || "")
      : null;

  //function for validating succefull invitations
  const handleValidation = async (validationUrl: any) => {
    try {
      const { data, error } = await supabase
        .from("community_data")
        .select("missions")
        .eq("wallet_id", localData.wallet_id);

      const resultArray = new Array();

      const result = data && data[0];
      const temp = result?.missions;
      console.log(temp);

      temp.forEach((element: any) => {
        resultArray.push(element);
      });

      const checkArray = new Array();
      resultArray.forEach((element, index) => {
        console.log(index),
          checkArray.push({
            url: element.submission_type.validationUrl,
            invites: element.submission_type.invites,
          });
      });

      checkArray.forEach((element) => {
        if (element.url == validationUrl) alert(element.invites);
      });

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisable = () => {
    if (referralUrl != "") {
      setIsDisable(true);
    }
  };
  useEffect(() => {
    handleDisable();
  }, []);

  return (
    <div className="max-w-[749px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6">
      <h1 className="font-normal text-[20px] leading-[26px] text-white">
        Submission type
      </h1>
      <div className="w-full h-0 border-[0.5px] border-[#464C52] absolute top-[62px] left-0"></div>

      <div className="w-full mt-[45px] flex gap-[18px]">
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[49px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 0 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[0] = !type[0];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">File</h1>
        </button>
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[73px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 1 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[1] = !type[1];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Visit Link</h1>
        </button>
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[49px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 2 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[2] = !type[2];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">URL</h1>
        </button>
        {/* <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[49px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 3 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[3] = !type[3];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Invite</h1>
        </button> */}
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[49px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 4 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[4] = !type[4];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Empty</h1>
        </button>
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[49px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 5 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[5] = !type[5];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Text</h1>
        </button>
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[49px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 6 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[6] = !type[6];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Quiz</h1>
        </button>
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[85px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 7 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[7] = !type[7];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Feedback</h1>
        </button>
        <button
          className={`rounded-[4px] border border-[#656565] h-[36px] w-[75px] flex justify-center items-center hover:bg-[#161C23] ${
            selected === 8 ? "bg-black text-white" : "bg-[#2E363F]"
          }`}
          onClick={() => {
            const newState = Array(9).fill(false);
            newState[8] = !type[8];
            setType(newState);
          }}
        >
          <h1 className="font-normal text-sm text-[#AAAAAA]">Referral</h1>
        </button>
      </div>

      {/* /* Conditional Rendering Section
      {type[0] && (
        <div className="mt-[36px]">
          <h1 className="font-medium text-base text-white mb-[11px]">
            Upload the file
          </h1>
          <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] px-[25px] ">
            <Image src="Icons/upload.svg" alt="" height={20} width={20} />
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
      )} */}
      {type[1] && (
        <div className="mt-[36px]">
          <h1 className="font-medium text-base text-white mb-[11px]">
            Enter the Link
          </h1>
          <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
            <input
              type="url"
              value={link}
              className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
              placeholder="Enter the Link"
              onChange={handlelink}
            />
          </div>
        </div>
      )}
      {type[3] && (
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
      {type[6] && (
        <div className="mt-[36px]">
          <QuizCard />
        </div>
      )}
      {type[8] && (
        <div className="">
          <ReferralCard
            title="API KEY"
            placeholder="Paste your invite platform api key in the field given below"
            url={apiUrl}
            setUrl={setApiUrl}
          />
          <ReferralCard
            disable={isDisable}
            title="REFERRAL KEY URL"
            placeholder="Paste your url for the generation of referral key"
            url={referralUrl}
            setUrl={setReferralUrl}
          />
          {/* <ReferralCard
            title="VALIDATION URL"
            disable={isDisable}
            placeholder="Paste your url for user count validation"
            url={validationUrl}
            setUrl={setValidationUrl}
          /> */}
          <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35]  mt-6 relative realtive">
            <h1 className="font-medium text-base text-white mb-[11px]">
              INVITES
            </h1>

            <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
              <input
                type="number"
                className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]"
                value={invites}
                onChange={(e) => {
                  setInvites(e.target.value);
                }}
              />
            </div>
          </div>

          {/* generate button */}

          
          {/* validate button */}
          
        </div>
      )}
      {/* {type[6] && (
        <div className="mt-36">
          <div className="rounded-lg h-41 w-full flex gap-14 items-center relative bg-2E363F overflow-hidden">
            <input
              type="text"
              className="w-full h-full outline-none bg-inherit text-xs placeholder-text-D0D0D0A6 text-white font-normal overflow-hidden text-ellipsis px-25"
              placeholder="Enter your question"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
        </div>
      )}
      {type[6] && (
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="trueOption"
              name="answer"
              value="true"
              checked={answer === 'true'}
              onChange={handleAnswerChange}
            />
            <label htmlFor="trueOption" className="ml-2 text-white">
              True
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="falseOption"
              name="answer"
              value="false"
              checked={answer === 'false'}
              onChange={handleAnswerChange}
            />
            <label htmlFor="falseOption" className="ml-2 text-white">
              False
            </label>
          </div>
        </div>
      )} */}
      {/* {type[2] && (
        <div className="mt-[36px]">
          <h1 className="font-medium text-base text-white mb-[11px]">
            Enter the URL
          </h1>
          <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
            <input
              type="url"
              className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]" placeholder="Enter URL"
            />
          </div>
        </div>
      )}
      
      {type[5] && (
        <div className="mt-[36px]">
          <h1 className="font-medium text-base text-white mb-[11px]">
            Enter Text
          </h1>
          <div className="rounded-lg h-[41px] w-full flex gap-[14px] items-center relative bg-[#2E363F] overflow-hidden ">
            <input
              type="text"
              className="w-full h-full outline-none bg-inherit text-xs placeholder:text-[#D0D0D0A6] text-white font-normal overflow-hidden text-ellipsis  px-[25px]" placeholder="Enter text"
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SubmissionCard;
