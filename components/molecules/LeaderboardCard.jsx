import React from "react";
import Image from "next/image";
const LeaderboardCard = (props: any) => {
  return (
    <div
      className="h-[270px] w-[230px] overflow-hidden relative rounded-[20px]"
      style={{
        background: "linear-gradient(180deg, #000000 48.96%, #322617 100%)",
      }}
    >
        {props.rank === 1 && <h1 className="font-extrabold text-[50px] leading-[59px] italic inline-block text-transparent  bg-gradient-to-b from-[#ED9265] to-[#B95D2F]  bg-clip-text absolute top-[10px] right-[52px]">
          {props.rank}
        </h1>}
        {props.rank === 2 && <h1 className="font-extrabold text-[50px] leading-[59px] italic inline-block text-transparent  bg-gradient-to-b from-[#7B3A1A] to-[#B95D2F]  bg-clip-text absolute top-[9px] right-[43px]">
          {props.rank}
        </h1>}{props.rank === 3 && <h1 className="font-extrabold text-[50px] leading-[59px] italic inline-block text-transparent  bg-gradient-to-b from-[#4E2511] to-[#B95D2F]  bg-clip-text absolute top-[10px] right-[47px]">
          {props.rank}
        </h1>}{props.rank === 4 && <h1 className="font-extrabold text-[50px] leading-[59px] italic inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[10px] right-[44px]">
          {props.rank}
        </h1>}{props.rank === 5 && <h1 className="font-extrabold text-[50px] leading-[59px] italic inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[11px] right-[41px]">
          {props.rank}
        </h1>}
          {props.rank === 1 && <h2 className="font-bold text-base inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[17px] right-[32px] ">st</h2>}
          {props.rank === 2 && <h2 className="font-bold text-base inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[16px] right-[21px] ">nd</h2>}
          {props.rank === 3 && <h2 className="font-bold text-base inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[17px] right-[29px] ">rd</h2>}
          {props.rank === 4 && <h2 className="font-bold text-base inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[17px] right-[27px] ">th</h2>}
          {props.rank === 5 && <h2 className="font-bold text-base inline-block text-transparent  bg-gradient-to-b from-[#270E02] to-[#B95D2F]  bg-clip-text absolute top-[18px] right-[24px] ">th</h2>}

        <div className=" overflow-hidden absolute left-[21px] top-[46.97px] h-[96.97px] w-[106px] " style={{clipPath: "polygon(100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%, 25% 6.7%, 75% 6.7%)"}}>
        <Image
            src="Icons/Monkey.svg"
            alt="hell"
            width={106}
            height={92}
            className="object-cover"
          />
         </div>

         <h1 className="absolute left-[28px] top-[157px] font-medium text-lg text-white">@{props.name}</h1>
         <h1 className="absolute bottom-6 left-[81px] text-white text-lg font-normal">{props.point} XP</h1>
    </div>
    // <div
    //   className="w-auto h-auto relative rounded-[20px]"
    //   style={{
    //     background: "linear-gradient(180deg, #000000 48.96%, #322617 100%)",
    //   }}
    // >
    //   <div className="flex m-2">
    //     <div>
    //       <Image
    //         src="/leadericon.png"
    //         alt="hell"
    //         width={106}
    //         height={92}
    //         className="m-4 p-0 bg-black"
    //       />
    //     </div>
    //     <div className=" w-61 h-24 m-[15px] font-sans italic font-extrabold text-5xl leading-14 bg-gradient-to-b from-orange-500 to-orange-700 bg-clip-text text-transparent">
    //       {props.rank}
    //     </div>
    //   </div>
    //   <div className="ml-[30px]  bg-white bg-clip-text text-transparent">
    //     {props.name}
    //   </div>
    //   <div className=" text-center m-[20px]  bg-white bg-clip-text text-transparent">
    //     {props.point} XP
    //   </div>
    // </div>
  );
};
export default LeaderboardCard;
