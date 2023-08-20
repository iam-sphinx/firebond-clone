import React, { ReactElement, useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import router from "next/router";
import {
  FaDiscord,
  FaEthereum,
  FaGlobe,
  FaTelegramPlane,
} from "react-icons/fa";


const IntegrationsSettingPage = (): ReactElement => {
  const [isConnectDisc, setIsConnecteDisc] = useState(false)
  const [disableDiscord,setdisableDiscord] = useState(false)

  async function discordToken() {
    if (window.location.href.includes("access_token")) {
      setIsConnecteDisc(true)
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

 function handleClick()  {
  if(isConnectDisc === false)
  {
    const authUrl = 'https://discord.com/api/oauth2/authorize?client_id=1080905971804668005&redirect_uri=https%3A%2F%2Ffirebond-client-staging.vercel.app%2Fsetting&response_type=token&scope=identify%20guilds%20email%20guilds.join%20connections%20guilds.members.read';
    window.location.href = authUrl;
  }
 }

  async function handelDiscord(){
    const data=localStorage.getItem('data')||"";
    const obj=JSON.parse(data)
    const token=obj.DiscordToken
    if(token){
      console.log('Discord connected')
      setIsConnecteDisc(true);
    }
    else
    {
      console.log("not connected")
      setIsConnecteDisc(false);
 
    }
  
  }
  useEffect(()=>{
    handelDiscord()
  },[])

  useEffect(()=>{
    discordToken()
  },[])

  return (
    <div className="w-[641px] h-auto rounded-[10px] mb-[70px] bg-[#232B35]">
      <div className="p-[37px] h-auto w-auto">
        <h1 className="mb-2 font-semibold text-2xl text-white">Integrations</h1>
        <h3 className="font-normal text-base text-[#A6A6A6]">
          Supercharge your workflow and connect the tool you use every day.
        </h3>
      </div>

      <div className="border-[0.5px] border-[#474C52] h-0 w-full " />

      <div className="h-auto w-auto mt-[37px] pb-[78px]">
        <div className="w-full h-[80px] px-[37px] flex justify-between items-center border-b border-[#353B43] mb-[10px] ">
          <div className="flex gap-6">
            <div className="bg-[#6359E9] h-[46px] w-[46px] flex justify-center items-center rounded-[10px]">
              <FaDiscord size={24} />
            </div>

            <div>
              <h1 className="font-semibold text-base text-white">Discord</h1>
              <h3 className="font-normal text-sm text-[#A6A6A6]">
                Import roles and create discord based bounties
              </h3>
            </div>
          </div>

          <button onClick={handleClick} className={`w-[107px] h-[34px] rounded-lg border border-white flex justify-center items-center  font-normal text-sm ${isConnectDisc ? "text-black bg-white" : "text-white"}`} disabled={disableDiscord}
          >

            {isConnectDisc ? "Connected" : "connect"}
          </button>
        </div>

        <div className="w-full h-[80px] px-[37px] flex justify-between items-center border-b border-[#353B43] mb-[10px]">
          <div className="flex gap-6">
            <div className="bg-[#64CFF6] h-[46px] w-[46px] flex justify-center items-center rounded-[10px]">
              <BsTwitter size={24} />
            </div>

            <div>
              <h1 className="font-semibold text-base text-white">Twitter</h1>
              <h3 className="font-normal text-sm text-[#A6A6A6]">
                Import roles and create twitter based bounties
              </h3>
            </div>
          </div>

          <button className="w-[107px] h-[34px] rounded-lg border border-white flex justify-center items-center text-white font-normal text-sm">
            Connect
          </button>
        </div>

        {/* TELEGRAM */}
        
        {/* <div className="w-full h-[80px] px-[37px] flex justify-between items-center border-b border-[#353B43] mb-[10px]">
          <div className="flex gap-6">
            <div className="bg-[#2298D5] h-[46px] w-[46px] flex justify-center items-center rounded-[10px]">
              <FaTelegramPlane size={24} />
            </div>

            <div>
              <h1 className="font-semibold text-base text-white">Telegram</h1>
              <h3 className="font-normal text-sm text-[#A6A6A6]">
                Import roles and create telegram based bounties
              </h3>
            </div>
          </div>

          <button className="w-[107px] h-[34px] rounded-lg border border-white flex justify-center items-center text-white font-normal text-sm">
            Connect
          </button>
        </div> */}

        <div className="w-full h-[80px] px-[37px] flex justify-between items-center">
          <div className="flex gap-6">
            <div className="bg-[#1D1D1D] h-[46px] w-[46px] flex justify-center items-center rounded-[10px]">
              <FaEthereum size={24} />
            </div>

            <div>
              <h1 className="font-semibold text-base text-white">Wallet</h1>
              <h3 className="font-normal text-sm text-[#A6A6A6]">
                Import roles and create wallet based bounties
              </h3>
            </div>
          </div>

          <button className="w-[107px] h-[34px] rounded-lg border border-white flex justify-center items-center text-black  font-normal text-sm bg-white">
            Connected
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSettingPage;