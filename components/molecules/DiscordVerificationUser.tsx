import { FaDiscord } from "react-icons/fa";
import BasicInfoCard from "./BasicInfoCard";
import { IntegrationOption } from "./IntegrationOption";
import { useState } from "react";

export default function DiscordVerificationUser() {
    const [flagDiscord, setDiscord] = useState("hidden");
    function handleDiscordClick(){

    }
  return (
    
    <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-6 realtive">
      <h1 className="font-normal text-[20px] leading-[27px] text-gray">
        Connect Your Discord Account
      </h1>
      <h2 className="mb-5">
      Prove your’re a real person by completing the verification steps below.
      </h2>
      <div className="relative mb-5">
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
    </div>
  );
}
