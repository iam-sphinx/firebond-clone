import Image from "next/image";
import React, { useEffect, useState } from "react";


interface UserBaseAnalyticsProps {
    imageUrl:string,
    height:number,
    width:number,
    count:string,
    percentage:number,
    title:string,
    bgColor:string,
  }
  

const UserBaseAnalytics: React.FC<UserBaseAnalyticsProps> = (props) => {
  const [percentageSign,setPercentageSign] = useState("");
  const [color, setColor] = useState("");

 const sign = () =>{
    if(props.percentage < 0)
    {
      setPercentageSign("")
      setColor("bg-[#EB001B26] text-[#E41414]")
    }
    else
    {
      setPercentageSign("+");
      setColor("bg-[#02B15A26] text-[#02B15A]")
    }}

    useEffect(()=>{
      sign()
    },[props.percentage])
  
  return (
    <div className="w-[321px] h-[126px] flex gap-[23px] justify-center items-center hover:border-[1px] hover:border-[#000000] rounded-[20px] shadow-[0,4px,4px,rgba(0,0,0,0.25)] bg-[#232B35]">
      <div className={`w-[45px] h-[45px] bg-[${props.bgColor}] rounded-[10px] flex justify-center items-center`}>
        <Image src={props.imageUrl} alt="" height={props.height} width={props.width} />
      </div>
      <div>
        <h1 className="text-[#8C89B4] font-normal text-[16px] leading-[21.6px]">
          {props.title}
        </h1>
        <div className="flex w-[202px] h-[32px] justify-between items-center">
          <h1 className="font-semibold text-2xl text-white">{props.count}</h1>
          <div className={`w-[63px] h-[23px] ${color} rounded-[10px] flex justify-center items-center hover:shadow-lg cursor-pointer`}>
            <h1 className=" font-normal text-[12px] leading-[14.52px]">
              {percentageSign}{props.percentage}%
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBaseAnalytics;
