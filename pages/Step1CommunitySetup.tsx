import { FaDiscord, FaGlobe, FaTwitter } from "react-icons/fa";
import { VscBlank } from "react-icons/vsc";
import IconButton from "../components/atoms/IconButton";
import ProfileIcon from "../components/atoms/ProfileAvatar";
import BackGroundPage from "../components/molecules/BackGroundPage";
import { supabase } from "@/utils/supabaseClient";
import { ReactElement } from "react";
import Card from "../components/atoms/Card";
import Link from "next/link";
import TextInput from "../components/atoms/TextInput";
import TextArea from "../components/atoms/TextArea";
import Temporary from "../components/atoms/Stepper";
import { useState } from "react";
import { useRouter } from "next/router";
import FormData from "@/utils/FormData";
import Modal from "@material-ui/core/Modal";
import TwitterHandlePopUp from "@/components/molecules/TwitterHandlePopUp";
import { BiImageAdd } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";
const Step1CommunitySetup = (): ReactElement => {
  const obj = FormData();
  const router = useRouter();
  const [InputValue, setInputvalue] = useState("");
  const [description, setDescription] = useState("");
  const [TwitterHandle, setTwitterHandle] = useState("");
  const [WebsiteUrl, setWebsiteUrl] = useState("");
  const [TwitterPopUpVisibility, setTwitterPopUpVisibility] = useState(false);
  const [WebsitePopUpVisibility, setWebsitePopUpVisibility] = useState(false);
  const [selected, setSelected] = useState(1);
  const [imageUrl, setImageUrl] = useState("/ImageIcon.png");
  let community_logo = "";
  let file: File;
  function handleProfileClick() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg, .jpeg";
    input.hidden = true;
    let files: File[];
    input.addEventListener("change", async () => {
      const files = input.files;
      console.log(files);
      if (files && files.length > 0) {
        console.log(files[0]);
        let file: File;
        file = files[0];
        console.log(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          localStorage.setItem("userImage", imageUrl);
          setImageUrl(imageUrl);
        };
      }
    });
    input.click();
  }
  async function CommunityLogoUpload(file: any) {
    const { data, error } = await supabase.storage
      .from("community_logo")
      .upload(`${obj.email}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log("Error uploading file:", error);
    } else {
      console.log("File uploaded successfully:", data);
      obj.community_logo = data.path;
    }
  }
  function handleInput(e: any) {
    setInputvalue(e.target.value);
  }
  function handleInput2(e: any) {
    setDescription(e.target.value);
  }

  

  function onContinueClick() {
    CommunityLogoUpload(file);
    obj.community_name = InputValue;
    obj.community_description = description;
    obj.community_logo = community_logo;
    obj.community_type = selected;
    localStorage.removeItem("userImage");
    router.push("/CommunitySetUpIntegration");
  }

  function handleGlobeClick() {
    setWebsitePopUpVisibility(!WebsitePopUpVisibility);
  }

  function handleTwitterContinueClick() {
    setTwitterPopUpVisibility(false);
  }
  function handleWebsiteUrlContinueClick() {
    setWebsitePopUpVisibility(false);
  }
  function handleTwitterClick() {
    setTwitterPopUpVisibility(!TwitterPopUpVisibility);
  }

  return (
    <>
      <Modal
        onClose={() => {
          setTwitterPopUpVisibility(!TwitterPopUpVisibility);
        }}
        open={TwitterPopUpVisibility}
        style={{}}
      >
        <div className="mt-[30vh] ml-[30vw]">
          <TwitterHandlePopUp
            onContinueClick={handleTwitterContinueClick}
            title="Twitter Handle"
            placeholder="Enter your twitter handle"
            handlePopUpInputValue={(e: any) => {
              setTwitterHandle(e.target.value);
            }}
          />
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setWebsitePopUpVisibility(!WebsitePopUpVisibility);
        }}
        open={WebsitePopUpVisibility}
        style={{}}
      >
        <div className="mt-[30vh] ml-[30vw]">
          <TwitterHandlePopUp
            onContinueClick={handleWebsiteUrlContinueClick}
            title="Website Url"
            placeholder="Enter your Website Url"
            handlePopUpInputValue={(e: any) => {
              setWebsiteUrl(e.target.value);
            }}
          />
        </div>
      </Modal>
      <div className="min-h-screen bg-[#151a21]">
        <div className="w-full flex justify-center items-center py-[19px]">
          <Image src="Icons/FIREBOND.svg" height={68.1} width={193} alt="" />
        </div>

        <div className="flex justify-center items-center">
          <div className="h-auto w-[662px] rounded-sm bg-[#232B35]">
            <div className="h-[54px] w-full flex items-center justify-between px-[30px] border-b border-[#353B43]">
              <h1 className="text-[#AEABD8] font-normal text-sm tracking-[16%]">
                COMMUNITY SETUP
              </h1>
              <div className="flex gap-[31px] items-center">
                <h1 className="text-[#FE702A] font-medium text-[13.1px] leading-[15.35px]">
                  STEP 1 OF 2
                </h1>

                <div className="w-[108px] h-[12px] bg-[#FE702A54] border-[1.5px] border-[#FE702A]">
                  <div className="w-[57px] h-full bg-[#FE702A]"></div>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="w-full h-full px-[30px] pt-6 pb-[33px]">
              <div className="w-full h-full">
                <h1 className="font-semibold text-2xl text-white mb-2">
                  Basic Details
                </h1>
                <h1 className="text-[#A6A6A6] font-normal text-base mb-[37px]">
                  Help your members know more about your community
                </h1>
              </div>

              {/* Name of your community */}
              <div className="w-full h-auto flex gap-[14.5px] items-center mb-[43px]">
                <div className="w-[65.5px] flex-shrink-0 h-[65.5px] cursor-pointer rounded-full border-[0.82px] border-[white] border-dashed flex justify-center items-center">
                  <BiImageAdd size={32} />
                </div>

                <div className="w-full relative bottom-4">
                  <TextInput
                    placeholder="E.g. Fire Community"
                    label="Name of your Community*"
                    className=" w-full h-[41px]"
                    classNameInput="w-full h-[41px] bg-[#2E363F] rounded-lg text-white"
                    classNameLabel="font-medium text-base text-white mb-[10px]"
                    handleChange2={handleInput}
                    handleValue={InputValue}
                  />
                </div>
              </div>

              <div className="w-full ">
                <TextArea
                  placeholder="Add description to let the members know more about your community"
                  label="Whats the goal of the Community?"
                  className=" w-full h-[250px]"
                  classNameInput="w-full h-[250px] bg-[#2E363F] rounded-lg overflow-hidden font-small"
                  classNameLabel="font-medium text-base text-white mb-[10px]"
                  handleChange2={handleInput2}
                  handleValue={description}
                />
              </div>

              {/* Type of Community Section */}
              <h1 className="font-medium text-base text-white mb-[9.28px]">
                Choose type of community *
              </h1>

              <div className="flex gap-[13.1px] w-full mb-[41.77px]">
                <button
                  className={`h-[40.94px] w-[65.5px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px]  bg-[#2E363F] rounded-lg ${
                    selected === 1 ? "bg-black text-white" : "bg-[#2E363F]"
                  }`}
                  onClick={() => setSelected(1)}
                >
                  DAO
                </button>
                <button
                  className={`h-[40.94px] w-[122.81px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px] bg-[#2E363F] rounded-lg ${
                    selected === 2 ? "bg-black text-white" : "bg-[#2E363F]"}`}
                  onClick={() => setSelected(2)}
                >
                  NFT Community
                </button>
                <button
                  className={`h-[40.94px] w-[112.98px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px] bg-[#2E363F] rounded-lg ${
                    selected === 3 ? "bg-black text-white" : "bg-[#2E363F]"}`}
                  onClick={() => setSelected(3)}
                >
                  Content Creator
                </button>
                <button
                  className={`h-[40.94px] w-[65.5px] flex justify-center items-center text-white font-normal text-[13.1px] leading-[17.68px] bg-[#2E363F] rounded-lg ${
                    selected === 4 ? "bg-black text-white" : "bg-[#2E363F]"}`}
                  onClick={() => setSelected(4)}
                >
                  Social
                </button>
              </div>
              {/* Add Links */}

              <h1 className="font-medium text-white text-base mb-[6.84px]">
                Add Links
              </h1>

              <div className="flex gap-[13.1px] items-center">
                <div
                  className="w-[40.94px] h-[40.94px] rounded-full bg-[#1D1D1D] flex justify-center items-center cursor-pointer"
                  onClick={handleGlobeClick}
                >
                  <FaGlobe className="text-white" size={28} />
                </div>

                <div
                  className="w-[40.94px] h-[40.94px] rounded-full bg-[#1D1D1D] flex justify-center items-center cursor-pointer"
                  onClick={handleTwitterClick}
                >
                  <BsTwitter className="text-white" size={24} />
                </div>
              </div>
            </div>

            {/* Back and Continue Section */}
            <div className="h-[66px] w-full flex justify-between">
              <button
                className="w-full h-full flex justify-center items-center bg-[#1D1D1D] text-white font-normal text-base"
                onClick={() => router.push("/CommunitySetupScreen")}
              >
                Back
              </button>
              <button
                className="w-full h-full bg-[#FE702A] text-white font-base font-normal flex justify-center items-center"
                onClick={onContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute  items-center m-[auto] top-[150px] justify-center right-0 left-0 w-[662px] h-[680px] bg-gray-800 shadow-md ">
        <div className="relative w-[662px] h-[40px] border-b-[1px] border-[#353B43]">
          <Link
            href="/"
            className="absolute top-[5px] left-[30px] text-[#AEABD8]"
          >
            COMMUNITY SETUP
          </Link>
          <div className="absolute top-[5px] left-[400px] text-[#FE702A]">
            STEP 1 OF 2
          </div>
          <div>
            <Temporary />
          </div>
        </div>
        <div className="">
          <p className="relative w-[236px] h-[32px] top-[0px] left-[30px] text-[#FFFFFF] font-sans font-normal font-bold:text-600 text-2xl leading-8">
            Basic Details
          </p>
          <p className="relative w-[500px] h-[22px] top-[7px] left-[30px] font-sans font-normal text-base leading-6 text-gray-500 ">
            Help your memebers know more about your community
          </p>

          <div>
            <ProfileIcon
              size={65}
              imageUrl={imageUrl}
              alt="nothing"
              classNameCircle=" relative w-[10px] top-[40px] left-[25px] border-dashed border-[0.7px] border-white"
              classNameImage=" relative left-[10px] top-[15px] w-[40.6px] h-[35.24px]"
              onProfileIconClick={handleProfileClick}
            />
          </div>
          <div>
            <TextInput
              placeholder="E.g. Fire Community"
              label="Name of your Community*"
              className="relative top-[-40px] left-[100px] w-[500px] h-[41px]"
              classNameInput="w-[500px] h-[41px] bg-[#2E363F] text-white"
              classNameLabel="font-medium text-white leading-6 text-white font-generalsans w-[250px] h-[22px] mb-2"
              handleChange2={handleInput}
              handleValue={InputValue}
            />
          </div>
          <TextArea
            placeholder="Add description to let the members know more about your community"
            label="Whats the goal of the Community?"
            className="relative top-[20px] left-[60px] w-[650px] h-[250px]"
            classNameInput="w-[550px] h-[250px] bg-[#2E363F] rounded-lg overflow-hidden font-small"
            classNameLabel="font-small text-base leading-6 text-white  w-[250px] h-[22px] mb-2"
            handleChange2={handleInput2}
            handleValue={description}
          />

          <p className="relative w-[236px] h-[32px] top-[-20px] left-[60px] font-medium text-base leading-6 text-white font-generalsans">
            Choose Type Of Community*
          </p>
          <div className="flex relative w-[500px] h-[100px] top-[-15px] left-[60px]">
            <button
              onClick={() => handleButtonClick(1)}
              type="button"
              className={`w-[65px] h-[32px] text-white px-1 py-1 mr-4 rounded-lg ${
                selectedButton === 1 ? "bg-black text-white" : "bg-[#2E363F]"
              }`}
            >
              DAO
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              type="button"
              className={`w-[250px] h-[32px] text-white px-1 py-1 mr-4 rounded-lg ${
                selectedButton === 2 ? "bg-black text-white" : "bg-[#2E363F]"
              }`}
            >
              Content Creator
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              type="button"
              className={`w-[250px] h-[32px] text-white px-1 py-1 mr-4 rounded-lg ${
                selectedButton === 3 ? "bg-black text-white" : "bg-[#2E363F]"
              }`}
            >
              NFT Community
            </button>
            <button
              onClick={() => handleButtonClick(4)}
              type="button"
              className={` w-[100px] h-[32px] text-white px-1 py-1 rounded-lg ${
                selectedButton === 4 ? "bg-black text-white" : "bg-[#2E363F]"
              }`}
            >
              Social
            </button>
          </div>
          <p className="relative w-[200px] h-[32px] top-[-50px] left-[60px] font-medium text-base leading-6 text-white font-generalsans">
            Add Links
          </p>

          {/* <a href="https://www.example.com"> */}
      {/* <ProfileIcon
            size={30}
            imageUrl="/Globe.png"
            alt="nothing"
            classNameCircle="relative top-[-45px] left-[60px] border-[0.7px] mr-3"
            // classNameImage="relative left-[22px] top-[26px] w-[51.6px] h-[42.24px]"
            onProfileIconClick={handleGlobeClick}
          /> */}
      {/* </a> */}

      {/* <a href="https://www.example.com"> */}
      {/* <ProfileIcon
            size={30}
            imageUrl="/Twitter.png"
            alt="nothing"
            classNameCircle="relative top-[-45px] left-[60px] border-[0.7px] mr-4"
            onProfileIconClick={handleTwitterClick}
            // classNameImage="relative left-[22px] top-[26px] w-[51.6px] h-[42.24px]" */}

      {/* </a> */}
      {/* <IconButton
            icon={VscBlank}
            label="Back"
            className="relative bg-[#1D1D1D] top-[-25px] left-[0px] w-[340px] h-[60px]"
            classNameIcon=""
            onClick={() => router.push("/CommunitySetupScreen")}
          /> */}
      {/* <IconButton
            icon={VscBlank}
            label="Continue"
            className="relative bg-[#FE702A] top-[-85px] left-[335px] w-[338px] h-[60px]"
            classNameIcon=""
            onClick={onContinueClick}
          />
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Step1CommunitySetup;
