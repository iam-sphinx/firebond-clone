declare var window: any;
import axios from "axios";
import Link from "next/link";
import { IntegrationOption } from "../components/molecules/IntegrationOption";
import {
  FaDiscord,
  FaTwitter,
  FaTelegram,
  FaEthereum,
  FaTelegramPlane,
} from "react-icons/fa";
import { VscBlank } from "react-icons/vsc";
import IconButton from "../components/atoms/IconButton";
import BackGroundPage from "@/components/molecules/BackGroundPage";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WalletAuth from "@/utils/authentication/walletAuth";
import FormData from "@/utils/FormData";
import { supabase } from "@/utils/supabaseClient";
import { Modal } from "@material-ui/core";
import AlreadyAdminPopup from "./AlreadyAdminPopup";
import InstallMetamaskPopup from "./InstallMetamaskPopup";

const CommunitySetUpIntegration = () => {
  const [flagDiscord, setDiscord] = useState("hidden");
  const [flagTwitter, setTwitter] = useState("hidden");
  const [flagTelegram, setTelegram] = useState("hidden");
  const [flagEthereum, setEthereum] = useState("hidden");
  const [walletAddress, setWalletAddress] = useState("");
  const obj = FormData();
  const router = useRouter();
  const onConnect = WalletAuth();
  async function discordToken() {
    if (window.location.href.includes("access_token")) {
      const fragment = new URLSearchParams(window.location.hash.slice(1));

      const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
      ];
      console.log("access Token:-", accessToken);

      // localStorage.setItem('accessToken', accessToken||'Not Found');
      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((result) => result.json())
        .then(async (response) => {
          //console.log(response);
          const { username, discriminator, avatar, id, email } = response;
          let profile = {
            username: username,
            discriminator: discriminator,
            avatar: avatar,
            id: id,
            email: email,
          };
          const { data, error } = await supabase.from("community_data").insert([
            {
              name: profile.username,
              email: profile.email,
              community_name: "Discord",
              wallet_id: accessToken,
            },
          ]);
          console.log(data, error);
          setDiscord("visible");
        })
        .catch(console.error);
    } else {
      if (localStorage.getItem("accessToken")) {
        obj.discordToken = localStorage.getItem("accessToken") || "Not Found";
        setDiscord("visible");
      }
    }
  }
  async function twitterToken() {
    if (window.location.href.includes("code")) {
      const code = window.location.search.split("code=")[1];
      console.log("code:-", code);
      const url = `/api/twitterHandle?code=${code}`;
      const data = await fetch(url);
      const json = await data.json();
      const TwitterAccessToken = json.access_token;

      // user Lookup Fetch
      const lookupUrl = `/api/twitterLookup?token=${TwitterAccessToken}`;
      const userLookupData = await fetch(lookupUrl);
      const userData = await userLookupData.json();
      const username = userData.data.username;
      const twitterID = userData.data.id;

      // inserting accessToken in Community data DB
      // try {
      //   const { data, error } = await supabase.from("community_data").insert({
      //     twitterCode: accessToken,
      //     twitterAccessId: userData.data.id,
      //   });
      //   if (error) throw error;
      // } catch (error) {
      //   console.log(error);
      // }
      // Inserting userdata in Supabase's twitterDetails table
      // try {
      //   const { data, error } = await supabase
      //     .from("twitterDetails")
      //     .insert({
      //       twitterAccessId: userData.data.id,
      //       username: userData.data.username,
      //       name: userData.data.name,
      //     })
      //     .single();
      //   if (error) throw error;
      // } catch (error) {
      //   console.log(error);
      // }

      localStorage.setItem("twitterCode", TwitterAccessToken || "Not Found");
      localStorage.setItem("twitter_handle",username);
      localStorage.setItem("twitterID",twitterID);
      obj.twitter_handle=localStorage.getItem("twitter_handle") || "Not Found"
      obj.twitterID = localStorage.getItem("twitterID") || "Not found" 
      if (flagTwitter == "hidden") {
        setTwitter("visible");
      }

      // localStorage.setItem('accessToken', accessToken||'Not Found');
    }
  }

  useEffect(() => {
    getCurrentWalletConnected();
    // addWalletListener();
  }, [walletAddress]);
  useEffect(() => {
    discordToken();
    // addWalletListener();
  }, []);
  useEffect(() => {
    twitterToken();
  }, []);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install my MetaMask");
      Metamask();
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
          setEthereum("visible");
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install my MetaMask");
      Metamask();
    }
  };

  async function handleEthereumClick() {
    await connectWallet();
    try {
      setEthereum("visible");
    } catch (e) {
      console.log(e);
    }
  }
  //Simple is to href at call back url
  function handleDiscordClick() {
    if (flagDiscord == "hidden") {
      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=1080905971804668005&redirect_uri=https%3A%2F%2Ffirebond-client-staging.vercel.app%2FCommunitySetUpIntegration&response_type=token&scope=identify%20guilds%20email%20guilds.join%20guilds.members.read`;
      window.location.href = authUrl;
    }
  }

  function handleTwitterClick() {
    if (flagTwitter == "hidden")
      window.location.href =
        "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=QllVRHgtbzhGSEl0c1lWSUE4UmU6MTpjaQ&redirect_uri=https://firebond-client-staging.vercel.app/CommunitySetUpIntegration&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain";

    // if (flagTwitter == "hidden") {
    //   setTwitter("visible");
    // }
  }
  function handleTelegramClick() {
    // if (flagTelegram == "hidden") {
    //   setTelegram("visible");
    // }
  }

  async function handleContinue() {
    obj.wallet_id = walletAddress;
    if (walletAddress === "") {
      alert("Please Connect Ethereum Wallet");
      return;
    }

    const { data, error } = await supabase.from("community_data").insert({
      name: obj.name,
      community_name: obj.community_name,
      community_description: obj.community_description,
      email: obj.email,
      wallet_id: obj.wallet_id,
      community_admin_avatar: obj.community_admin_avatar,
      community_logo: obj.community_logo,
      DiscordToken: obj.discordToken,
      community_type: obj.community_type,
      twitter_handle: obj.twitter_handle,
      website_handle: obj.website_handle,
      twitterID: obj.twitterID,
    });
    if (error) {
      console.log("Error uploading file:", error.message);
      console.log(
        "Admin Account Exist,since wallet_id is not null but we are not able to insert that since wallet_id unique check is present at supabase storage"
      );
      AlreadyAdmin();
    } else {
      await window.localStorage.setItem("data", JSON.stringify(obj));
      console.log("File uploaded successfully:", data);
      router.push("/WelcomeScreen1");
    }
  }
  const [OpenAlreadyAdminPopup, setOpenAdmin] = useState(false);
  function AlreadyAdmin() {
    setOpenAdmin(!OpenAlreadyAdminPopup);
  }

  const [InstallMeta, setMetamask] = useState(false);
  function Metamask() {
    setMetamask(!InstallMeta);
  }
  return (
    <>
      <Modal
        onClose={() => {
          setMetamask(!InstallMeta);
        }}
        open={InstallMeta}
        style={{}}
      >
        <div>
          <InstallMetamaskPopup />
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setOpenAdmin(!OpenAlreadyAdminPopup);
        }}
        open={OpenAlreadyAdminPopup}
        style={{}}
      >
        <div>
          <AlreadyAdminPopup />
        </div>
      </Modal>

      <div className="flex items-center justify-center min-h-screen bg-[#171C23]">
        <div className="absolute w-[662px] h-[650px]   bg-[#232B35] shadow-md">
          <div className="absolute w-[662px] h-[54px]  border-b-[1px] border-[#353B43]">
            <Link
              href="/"
              className="relative top-[15px] left-[30px] text-[#AEABD8] tracking-[16%]"
            >
              COMMUNITY SETUP
            </Link>
            <div className="absolute font-['Roboto'] font-[13px] left-[410px] top-[13px] text-[#FE702A]">
              STEP 2 OF 2
            </div>
            <div className="absolute bg-[#FE702A] h-[12px] w-[108px] top-[19px] left-[520px] border-solid border-[1.5px] border-[#FE702A]"></div>
          </div>

          <div className="absolute font-[600] top-[78px] left-[30px]  font-['General Sans'] text-white text-[24px] w-[662px] ">
            <p className=" font-[600]  font-['General Sans'] text-white text-[24px]  ">
              Integrations
            </p>
            <p className="   font-['General Sans'] text-[#A6A6A6] text-[16px] font-[400 ]  ">
              Supercharge your workflow and connect the tool you use every day.
            </p>
          </div>

          <div className="absolute top-[200px] left-[30px]">
            <IntegrationOption
              Icon={FaDiscord}
              IconSize={20}
              IconColor="white"
              CapName="Discord"
              SmallName="discord"
              IconBackgroundStyle="bg-[#6359E9]"
              handleClick={handleDiscordClick}
              visibility={flagDiscord}
            />
          </div>
          <div className="absolute top-[290px] left-[30px]">
            <IntegrationOption
              Icon={FaTwitter}
              IconSize={20}
              IconColor="white"
              CapName="Twitter"
              SmallName="twitter"
              IconBackgroundStyle="bg-[#64CFF6]"
              handleClick={handleTwitterClick}
              visibility={flagTwitter}
            />
          </div>
          {/* <div className="absolute top-[380px] left-[30px]">
            <IntegrationOption
              Icon={FaTelegramPlane}
              IconSize={20}
              IconColor="white"
              CapName="Telegram"
              SmallName="telegram"
              IconBackgroundStyle="bg-[#2298D5]"
              handleClick={handleTelegramClick}
              visibility={flagTelegram}
            />
          </div> */}
          <div className="absolute top-[380px] left-[30px]">
            <IntegrationOption
              Icon={FaEthereum}
              IconSize={25}
              IconColor="white"
              CapName="Ethereum"
              SmallName="ethereum"
              IconBackgroundStyle="bg-[#1D1D1D]"
              handleClick={handleEthereumClick}
              visibility={flagEthereum}
            />
          </div>

          {/* <div> */}

          <IconButton
            icon={VscBlank}
            label="Back"
            className="absolute bg-[#1D1D1D] bottom-[0px] w-[331px] h-[67px]"
            classNameIcon=""
            onClick={() => router.push("/Step1CommunitySetup")}
          />
          <IconButton
            icon={VscBlank}
            label="Continue"
            className="absolute bg-[#FE702A] bottom-[0px] left-[331px] w-[331px] h-[67px]"
            classNameIcon=""
            onClick={handleContinue}
          />

          {/* </div>    */}
        </div>
      </div>
    </>
  );
};

export default CommunitySetUpIntegration;
