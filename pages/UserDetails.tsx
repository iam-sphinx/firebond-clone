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

const UserDetails = (props:any): ReactElement => {
  const obj = FormData();
  const [Username, setUsername] = useState("");
//   const [wallet,setwallet]
  const [InputEmail, setInputemail] = useState("");
  const [OpenDiscord, setOpenDiscord] = useState(false);
  const [flagDiscord, setDiscord] = useState('bg-\[\#8570E4\]');
  const [disableDiscord,setdisableDiscord]=useState(false)
  const [imageUrl, setImageUrl] = useState("/Icons/DefaultUserIcon.png");

  let community_admin_avatar = "";
  let file: File;
  //Function to check wheather the email is already registered or not
  async function emailExist(InputEmail: any) {
    

}
async function onContinueClick() {
    // to be put use rname unique check , -> done
    console.log(Username,InputEmail,)
    const { data, error } = await supabase
      .from("userdata")
      .select("name")
      .eq("name", Username);

    if (error) {
      console.error("Error checking unique name existence:", error);

      return;
    }
    // console.log("data->",data);
    if (data.length > 0) {
      alert("username already exist try another one");
      return;
    }

    // setUsernamePopUp(false);
    let arr = [props.communityId];
    // inserting 
    const { data: new_data, error: new_error } = await supabase
      .from("userdata")
      .insert({
        wallet_id: props.userWalletId,
        name: Username,
        communities: arr,
        //insert email too
      });
    if (new_error) {
      console.log("erorr in inserting the data of username", new_error);
    } else {  
      console.log("username succesfully inserted in our db now redirecting..");

      // have to update in community data table too.
      let member_data;
      const { data: communityData, error } = await supabase
        .from("community_data")
        .select("Members")
        .eq("id", Number(props.communityId));

      if (error) {
        console.log("error in uodating community while new user data", error);
      } else {
        console.log(
          "data of community tabel on the basis of new user->",
          communityData
        );
      }
      if (communityData != null) member_data = communityData[0].Members;

      if (member_data == null || member_data == undefined) {
        member_data = [
          {
            User_name: Username,
            user_wallet_id: props.userWalletId,
            date_of_join: new Date(),
            missions_completed: [],
            current_xp: 0,
            current_bounty: 0,
          },
        ];
      } else {
        member_data.push({
          User_name: Username,
          user_wallet_id: props.userWalletId,
          date_of_join: new Date(),
          missions_completed: [],
          current_xp: 0,
          current_bounty: 0,
        });
      }
      const { data: new_data2, error: new_error2 } = await supabase
        .from("community_data")
        .update({
          Members: member_data,
        })
        .eq("id", Number(props.communityId));
      if (new_error2) {
        console.log(
          "erorr in updating members data in community data when a user is a new user",
          new_error
        );
      } else {
        console.log("updated in community table for new member");
      }
      if (window !== undefined) {
        await window.localStorage.setItem("community_id", props.communityId);
        await window.localStorage.setItem("user_wallet_id", props.userWalletId);
        router.push({
          pathname: '/MissionForUser',
          query: {
            myData: JSON.stringify(props.missionDetails),
           }
        },)
      }
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
    setUsername(e.target.value);
  }
  function handleEmail(e: any) {
    setInputemail(e.target.value);
  }
  async function  discordToken() {
   
    // if (window.location.href.includes("access_token")) {
    //   console.log(flagDiscord, "flagDiscord");
    //   setDiscord('bg-green-800');
    //   setdisableDiscord(true)
    
    //   const fragment = new URLSearchParams(window.location.hash.slice(1));

    //   const [accessToken, tokenType] = [
    //     fragment.get("access_token"),
    //     fragment.get("token_type"),
    //   ];
    //   console.log(fragment, "fragment", accessToken, tokenType);
    //   //write a code to store the access token in local in supabase table named as community_data
    //   // const { data, error } = await supabase.from("community_data").insert([{ DiscordToken: accessToken || ""}])
      
    //   localStorage.setItem("accessToken", accessToken || "");
    //   //popup counter
    //   if(localStorage.getItem("popupCounter") == null)
    //   alert("Discord Integration Successful");
    //   localStorage.setItem("popupCounter", "1");
    
    //   fetch("https://discord.com/api/users/@me", {
    //     headers: {
    //       authorization: `${tokenType} ${accessToken}`,
    //     },
    //   })
    //     .then((result) => result.json())
    //     .then(async (response) => {
    //       console.log(response);
    //       const { username, discriminator, avatar, id, email } = response;
    //       let profile = {
    //         email: email,
    //         username: username,
    //         discriminator: discriminator,
    //         avatar: avatar,
    //         id: id,
    //       };
    //       localStorage.setItem("profile", JSON.stringify(profile));
    //     })
    //     .catch(console.error);
    // }
  }
  function discord() {
   
  }

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
              imageUrl={imageUrl}
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
              handleValue={Username}
            />
            <EmailInput
              placeholder="Email"
              label="Enter Email"
              className="relative top-[-40px] left-[154px] w-[426px] h-[41px]"
              classNameInput="w-[426px] h-[41px] bg-[#2E363F] rounded-lg text-white font-[General Sans] font-medium"
              classNameLabel="font-medium text-base leading-6 text-white font-[General Sans] w-[85px] h-[22px]"
              handleChange2={handleEmail}
              handleValue={InputEmail}
            />
        
            <IconButton
              icon={VscBlank}
              label="Continue"
              className="relative bg-[#FE702A] top-[22px] left-[0px] w-[662px] h-[67px]"
              classNameIcon=""
              onClick={onContinueClick}
            />
          </div>
        
        </div>
      </div>
    </>
  );
};

export default UserDetails;
