import { FaDiscord, FaTwitter } from "react-icons/fa";
import { VscBlank } from "react-icons/vsc";
import { supabase } from "@/utils/supabaseClient";
import IconButton from "../components/atoms/IconButton";
import ProfileIcon from "../components/atoms/ProfileAvatar";
import BackGroundPage from "../components/molecules/BackGroundPage";
import { ReactElement, useState, useEffect } from "react";
import DiscordIntegrationPopup from "./DiscordIntegrationPopup";
import Link from "next/link";
import TextInput from "../components/atoms/TextInput";
import EmailInput from "../components/atoms/EmailInput";
import Modal from "@material-ui/core/Modal";
import FormData from "@/utils/FormData";
import router from "next/router";
import { set } from "date-fns";
import { type } from "os";

const CommunitySetupScreen = (): ReactElement => {
  const obj = FormData();
  // if(typeof window !== 'undefined'){
  //   console.log(localStorage.getItem('InputEmail')&&localStorage.getItem('InputEmail')!=null)
  // }
  const [InputValue, setInputvalue] = useState((typeof window !== 'undefined'&&localStorage.getItem('InputName')!=null)?localStorage.getItem('InputName'):'');
  const [InputEmail, setInputemail] = useState((typeof window !== 'undefined'&&localStorage.getItem('InputEmail')!=null)?localStorage.getItem('InputEmail'):'');
  const [OpenDiscord, setOpenDiscord] = useState(false);
  const [flagDiscord, setDiscord] = useState("bg-[#8570E4]");
  const [discordBtn, setDiscordBtn] = useState(true);
  const [disableDiscord, setdisableDiscord] = useState(false);
  const [disableDiscordBot, setdisableDiscordBot] = useState(false);

  console.log(InputEmail,InputValue);
  const [imageUrl, setImageUrl] = useState<string|null>("/Icons/DefaultUserIcon.png");
  // console.log('hello',imageUrl);
  useEffect(()=>{
    if(typeof window !== 'undefined'&&localStorage.getItem('userImage')){
      setImageUrl(localStorage.getItem('userImage'))
    }
  },[])
  let community_admin_avatar = "";
  let file: File;
  //Function to check wheather the email is already registered or not
  async function emailExist(InputEmail: any) {
    let flag;
    if (InputEmail.length == 0) {
      flag = "2";
      return flag;
    }
    await supabase
      .from("community_data")
      .select("*")
      .eq("email", InputEmail)
      .then((data: any) => {
        console.log(data);
        if (data.data.length > 0) {
          console.log("Email already exist");
          flag = "3";
        } else {
          console.log("Email does not exist");
          flag = "1";
        }
      });
    console.log("Flag value=", flag);
    return flag;
  }
  async function onContinueClick() {
    console.log(InputEmail, await emailExist(InputEmail));
    if ((await emailExist(InputEmail)) == "1") {
      obj.email =  (InputEmail!=null?InputEmail:'');
      AdminAvatarUpload(file);
      obj.name = (InputValue!=null?InputValue:'');
      obj.community_admin_avatar = community_admin_avatar;
      // Removing userImage stored in local Storage
      localStorage.removeItem("userImage");
      const access_token = localStorage.getItem("accessToken") || "";
      if (!access_token) {
        setOpenDiscord(!OpenDiscord);
      } else {
        router.push("/Step1CommunitySetup");
      }
    } else if ((await emailExist(InputEmail)) == "3") {
      alert("Email already exist");
    } else {
      alert("Please Enter Email");
    }
  }
  const bucket_name = "community_admin_avatar";
  async function AdminAvatarUpload(file: any) {
    const { data, error } = await supabase.storage
      .from(bucket_name)
      .upload(`${obj.email}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      obj.community_admin_avatar = data.path;
      console.log("mai hu file path");
      console.log(data.path);
    }
  }
  async function handleProfileClick() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg, .jpeg";
    input.hidden = true;
    input.addEventListener("change", async () => {
      const files = input.files;
      if (files && files.length > 0) {
        file = files[0];
        console.log("mai hu file");
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const imageUrl = reader.result as string; // No need to cast to string
          localStorage.setItem("userImage", imageUrl);
          setImageUrl(imageUrl);
        };
      }
    });
    input.click();
  }

  function handleInput(e: any) {
    setInputvalue(e.target.value);

    if(typeof window !== undefined)
    localStorage.setItem('InputName',e.target.value);
  }
  function handleEmail(e: any) {
    setInputemail(e.target.value);
    if(typeof window !== undefined)
    localStorage.setItem('InputEmail',e.target.value);
  }
  async function discordToken() {
    if (window.location.href.includes("access_token")) {
      console.log(flagDiscord, "flagDiscord");
      setDiscord("bg-green-800");
      setDiscordBtn(false)
      setdisableDiscord(true);

      const fragment = new URLSearchParams(window.location.hash.slice(1));
   

      const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
      ];
      console.log(fragment, "fragment", accessToken, tokenType);
      //write a code to store the access token in local in supabase table named as community_data
      // const { data, error } = await supabase.from("community_data").insert([{ DiscordToken: accessToken || ""}])

      localStorage.setItem("accessToken", accessToken || "");
      //popup counter
      if (localStorage.getItem("popupCounter") == null)
        alert("Discord Integration Successful");
      localStorage.setItem("popupCounter", "1");

      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((result) => result.json())
        .then(async (response) => {
          console.log(response);
          const { username, discriminator, avatar, id, email } = response;
          let profile = {
            email: email,
            username: username,
            discriminator: discriminator,
            avatar: avatar,
            id: id,
          };
          localStorage.setItem("profile", JSON.stringify(profile));
        })
        .catch(console.error);
    }
  }

  const discordBotToken = ()=>{
    setdisableDiscordBot(true)
  }
  const discordBot = ()=>{
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=1080905971804668005&permissions=2048&scope=bot&redirect_uri=https%3A%2F%2Ffirebond-client-staging.vercel.app%2FCommunitySetupScreen`
    window.location.href = authUrl;
  }
  function discord() {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=1080905971804668005&redirect_uri=https%3A%2F%2Ffirebond-client-staging.vercel.app%2FCommunitySetupScreen&response_type=token&scope=identify%20guilds%20email%20guilds.join%20guilds.members.read`;
    window.location.href = authUrl;
  }
  useEffect(() => {
    discordToken();
  },[]);

  // useEffect(() => {
  //   discordBotToken();
  // },[])
  
  return (
    <>
      <BackGroundPage />

      <Modal
        onClose={() => {
          setOpenDiscord(!OpenDiscord);
        }}
        open={OpenDiscord}
        style={{}}
      >
        <div className="">
          {/* check of Discord is connected or not */}

          <DiscordIntegrationPopup />
        </div>
      </Modal>

      <div className="flex items-center justify-center ">
        <div className="absolute block w-[662px] h-[431px] top-[20vh] bg-gray-800 shadow-md ">
          <div className="relative block w-[662px] h-[54px] border-b-[1px] border-[#353B43]">
            <Link
              href="/"
              className="relative top-[15px] left-[30px] text-[#AEABD8] tracking-[16%]"
            >
              SIGN UP
            </Link>
          </div>
          <div className="relative">
            <p className="relative w-[236px] h-[32px] top-[0px] mt-6 left-[30px] text-[#FFFFFF] font-sans font-normal font-bold:text-600 text-2xl leading-8">
              What do we call you?
            </p>
            <p className="relative w-[200px] h-[22px] top-[10px] left-[30px] font-sans font-normal text-base leading-6 text-gray-500">
              Tell us your name?
            </p>
            <div className="relative top-[105px] left-[53px] font-[Roboto] font-bold text-[#848484] w-[13.54px] h-[27.88px] text-[28px]">
              +
            </div>
            <ProfileIcon
              size={94}
              imageUrl={imageUrl!=null?imageUrl:''}
              alt="nothing"
              classNameCircle="relative top-[50px] left-[30px] border-dashed border-[0.7px] border-white cursor-pointer"
              classNameImage="relative left-[22px] top-[26px] w-[51.6px] h-[42.24px]"
              onProfileIconClick={handleProfileClick}
            />
            <TextInput
              placeholder="Name"
              label="Enter Name"
              className="relative top-[-80px] left-[154px] w-[426px] h-[41px]"
              classNameInput="w-[426px] h-[41px] bg-[#2E363F] rounded-lg text-white font-[General Sans] font-medium"
              classNameLabel="font-medium text-base leading-6 text-white font-[General Sans] w-[85px] h-[22px]"
              handleChange2={handleInput}
              handleValue={InputValue!=null?InputValue:''}
            />
            <EmailInput
              placeholder="Email"
              label="Enter Email"
              className="relative top-[-40px] left-[154px] w-[426px] h-[41px]"
              classNameInput="w-[426px] h-[41px] bg-[#2E363F] rounded-lg text-white font-[General Sans] font-medium"
              classNameLabel="font-medium text-base leading-6 text-white font-[General Sans] w-[85px] h-[22px]"
              handleChange2={handleEmail}
              handleValue={(InputEmail!=null?InputEmail:'')}
            />
            {discordBtn ? <IconButton
              icon={FaDiscord}
              label="Discord"
              className={`relative ${flagDiscord} top-[89px] left-[0px] w-[331px] h-[67px]`}
              classNameIcon=""
              onClick={discord}
              disabled={disableDiscord}
            /> : 
            <IconButton
              icon={FaDiscord}
              label="Connect Discord Bot"
              className={`relative ${flagDiscord} top-[89px] left-[0px] w-[331px] h-[67px]`}
              classNameIcon=""
              onClick={discordBot}
              disabled={disableDiscordBot}
            />}
            <IconButton
              icon={VscBlank}
              label="Continue"
              className="relative bg-[#FE702A] top-[22px] left-[331px] w-[331px] h-[67px]"
              classNameIcon=""
              onClick={onContinueClick}
            />
          </div>
          <p className="relative text-center my-[30px] font-[General Sans] font-normal text-base leading-6 text-white font-generalsans">
            Already have account?{" "}
            <Link
              onClick={() => router.push("/LoginSection")}
              className="font-[General Sans] text-[#A6A6A6CC]"
              href={""}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default CommunitySetupScreen;
