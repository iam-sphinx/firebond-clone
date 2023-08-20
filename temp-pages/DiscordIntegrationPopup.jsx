import { FaDiscord } from "react-icons/fa";
import Card from "../components/atoms/Card";
import IconButton from "../components/atoms/IconButton";
import ProfileIcon from "../components/atoms/ProfileAvatar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
function DiscordIntegrationPopup() {
  const router = useRouter();
  function handleProfileClick() {}
  function discordlink() {
    
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=1080905971804668005&redirect_uri=https%3A%2F%2Ffirebond-client-staging.vercel.app%2FCommunitySetupScreen&response_type=token&scope=identify%20guilds%20email%20guilds.join%20guilds.members.read`;

    window.location.href = authUrl;
  }


  // to complete
  // fetch("https://discord.com/api/users/@me", {
  //   headers: {
  //     Authorization: `Bearer ${ACCESS_TOKEN}`,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
 //const access_token= localStorage.getItem("accessToken");

  return (
    <>
      {/* <Card
        
        title=""
        text=""

      /> */}
      <div className="absolute flex flex-col m-[auto] top-0 right-0 left-0 bottom-0 align-center w-[600px] h-[600px]  bg-[#161616]">

      <Link href='/' className="my-[20px] mx-[20px] text-[#FFFFFF] text-3xl">

        <AiOutlineArrowLeft />
      </Link>
      <div className="relative  flex justify-center  text-[#FFFFFF] font-[General sans] font-[600]  text-3xl leading-normal ">
        <p>Link your Discord account</p>
      </div>
      <div className=" mb-[70px] flex justify-center text-[#A6A6A6] font-[General Sans]">
        <p>works better with Discord connected</p>
      </div>


      <div className="flex flex-row justify-center mb-[50px] ">
      <div className="left-[670px] top-[370px]">
        <ProfileIcon
          imageUrl="Icons/RedFire.svg"
          size={87}
          classNameCircle="border-dashed border-[0.7px] border-white flex justify-center"
          onProfileIconClick={handleProfileClick}
        />
      </div>
      <div className="relative top-[40px] h-[6px] w-[73px]  bg-[#3D3E45]"></div>
      <div className=" left-[830px] top-[370px]">
        <ProfileIcon
          imageUrl="Icons/Discord.svg"
          size={87}
          classNameCircle="border-dashed border-[0.7px] border-white flex justify-center"
          onProfileIconClick={discordlink}
        />
      </div>
      </div>


      <div className="flex-wrap  flex justify-center mb-[50px]    text-[#A6A6A6] font-[General Sans] ">
        Get special access with your Discord roles <br />
        Receive task updates directly in Discord
      </div>
      <div className="flex justify-center top-[620px] left-[645px] mb-[20px]">
        <IconButton
          icon={FaDiscord}
          label="Discord"
          className=" bg-[#8570E4] top-[20px] left-[30px] w-[240px] h-[50px] rounded-md"
          classNameIcon=""
          onClick={discordlink}
        />
      </div>

      <div className="flex justify-center">
        <button onClick={() => router.push('/Step1CommunitySetup')} className="bg-[#161616] text-[#A6A6A6] text-sm px-2 py-1 rounded-md">

          Skip
        </button>
      </div>
      </div>

    </>
  );
}

export default DiscordIntegrationPopup