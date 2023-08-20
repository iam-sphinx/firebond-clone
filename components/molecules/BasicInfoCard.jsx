import Image from "next/image";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import MissionFormData from "@/utils/MissionFormData";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";

import { supabase } from "@/utils/supabaseClient";

import { BsFillTriangleFill } from "react-icons/bs";


const BasicInfoCard = (props: any) => {
  const obj = MissionFormData();
  const [titleError,settitleError] = useState(obj.title==''||obj.title==undefined?true:false);
 
  const [descriptionError,SetdescriptionError] = useState(obj.description==''?true:false);

  const [on, setOn] = useState(Array(5).fill(false));
  const [amount, setAmount] = useState(0);
  const [xp, setXp] = useState(100);
  const [selectedDate, changeSelectedDate] = useState(obj.seleted_date);
  const [input, setInput] = useState(props.title);
  const [visibiliy, setVisibility] = useState({
    src: "Icons/visible.svg",
    title: "Public",
  });
  

  // Calendar implementation

  function handleInput(e: any) {

    setInput(e.target.value);
    if(e.target.value.length&&e.target.value.length>0){
      settitleError(false);
    }
    else{
      settitleError(true);
    }
    
  }
  function handleAttachment() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg, .jpeg";
    input.hidden = true; // Add the hidden attribute
    let files: File[];
    input.addEventListener("change", async () => {
      const files = input.files;
      console.log(files);
      if (files && files.length > 0) {
        console.log(files[0]);
        let file: File;
        file = files[0];
        if (!file) {
          return;
        }
        console.log(file.name);
        // from here we can send image to supabase storage.

        const { data, error } = await supabase.storage
          .from("images")
          .upload(file.name, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log("Error uploading file:", error);
        } else {
          console.log("File uploaded successfully:", data);
        }
      } else {
        return;
      }
    });
    input.click();
  }

  const increaseXP = () => {
    const newXp = xp + 50;
    setXp(newXp);
  };

  const decreaseXP = () => {
    if (xp <= 0) return;

    const newXp = xp - 50;
    setXp(newXp);
  };
  const today = startOfToday();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]; 
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  obj.title = input;
  obj.amount = amount;

  // if(selectedDate!=="")
  obj.seleted_date = selectedDate;
  obj.submission = 0;
  obj.xp = xp;

  return (
    <div className="max-w-[749px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 realtive">
      <h1 className="font-normal text-[20px] leading-[27px] text-white">
        Basic information
      </h1>
      <div className="w-full h-0 border-[0.5px] border-[#474C52] absolute top-[72px] left-0"></div>
      <h1 className="font-medium text-base text-white mb-[10px] mt-[45px]">
        Mission title
      </h1>
      <div className="w-full h-[41px] bg-[#2E363F] rounded-lg  mb-[29px] overflow-hidden">
        <input
          className="w-full h-full px-6 overflow-hidden text-ellipsis outline-none bg-inherit text-white text-base font-medium"
          value={input}
          onChange={handleInput}
          placeholder={props.title}
        />
         {/* error message if applicable */}
        {titleError && (
          <span className="text-sm text-red-500">*Please enter title</span>
        )}
      </div>
      
      <div className="w-full flex justify-between">
        <button
          className="pt-[9px] pr-[19px] pl-4 pb-[9px] bg-[#171C23] hover:bg-white/[0.05] rounded-[4px] flex justify-center items-center"
          onClick={() => {
            const newState = [...on];
            newState[0] = !on[0];
            setOn(newState);
          }}
        >
          <div className=" w-full h-full flex items-center justify-center gap-[6.5px]">
            <Image src="Icons/calender.svg" alt="" height={13} width={13} />
            <h1 className="font-normal text-[#D0D0D0CC] text-[14px] leading-[19px]">
              {selectedDate != "" ? (
                <div>{selectedDate}</div>
              ) : (
                <h1>Due Date</h1>
              )}
            </h1>
          </div>
        </button>

        <button className="pt-[9px] pr-[11px] pb-[9px] pl-[12px] bg-[#171C23] hover:bg-white/[0.05] rounded-[4px] flex justify-center items-center" onClick={handleAttachment}>
          <div className=" w-full h-full flex gap-[7px]">
            <Image src="Icons/paper_pin.svg" alt="" height={16} width={16} />
            <h1 className="font-normal text-[#D0D0D0CC] text-[14px] leading-[19px]">
              Attachment
            </h1>
          </div>
        </button>

        <button
          className="pl-[11px] pr-[10px] pt-[9px] pb-[7px] bg-[#171C23]  hover:bg-white/[0.05] rounded-[4px] flex justify-center items-center"
          onClick={() => {
            const newState = [...on];
            newState[2] = !on[2];
            console.log(newState);
            setOn(newState);
          }}
        >
          <div className="flex items-center w-full h-full">
            <Image src={visibiliy.src} alt="" height={20} width={20} />
            <h1 className="font-normal text-[#D0D0D0CC] text-[14px] leading-[19px] ml-3 mr-[19.28px]">
              {visibiliy.title}
            </h1>
            <Image
              src="Icons/Arrow_Down.svg"
              alt=""
              height={3.72}
              width={7.45}
              className={`${on[2] && "-rotate-180 "}`}
            />
          </div>
        </button>

        <button className="pl-[9.52px] pr-[11px] pt-[8px] pb-[9px] bg-[#171C23] hover:bg-white/[0.05] rounded-[4px] flex justify-center items-center">
          <div className=" w-full h-full flex items-center justify-center">
            <Image src="Icons/Star.svg" alt="" height={17.7} width={20.22} />
            <h1 className="font-normal text-[#D0D0D0CC] text-[14px] leading-[19px] ml-[18.26px] mr-[30px]">
              {xp} XP
            </h1>
            <div>
              

                <BsFillTriangleFill className=" active:text-green-600 text-[#757575]" size={10} onClick={()=>{increaseXP()}}/>
                <BsFillTriangleFill className="-rotate-180 origin-center active:text-red-600 mt-[3px] text-[#757575]" size={10} onClick={()=>{decreaseXP()}} />
              
              {/* <Image src="Icons/Polygon.svg" height={12} width={12} alt="" onClick={()=>{increaseXP()}}/>
              <Image
                src="Icons/Polygon.svg"
                height={12.5}
                width={12.5}
                alt=""
                className="-rotate-180"
                onClick={()=>{decreaseXP()}}
              /> */}
            </div>
          </div>
        </button>

        <button
          className="pl-[14px] pr-[17px] pt-[8.1px] pb-[9px] bg-[#171C23] hover:bg-white/[0.05] rounded-[4px] flex justify-center items-center"
          onClick={() => {
            const newState = [...on];
            newState[4] = !on[4];
            setOn(newState);
          }}
        >
          <div className=" h-full w-full flex gap-2 items-center">
            <Image src="Icons/dollar.svg" alt="" height={18.05} width={20} />
            <h1 className="font-normal text-[#D0D0D0CC] text-[14px] leading-[19px]">
              {amount != 0 ? `${amount} USDC` : "Add Bounty"}
            </h1>
          </div>
        </button>
      </div>

      {/* For Public Button */}
      {on[2] && (
        <div className="h-[89px] w-[147px] rounded-[16px] bg-[#171C23] absolute left-[309px] top-[242px] overflow-hidden grid grid-row-2 z-10">
          <button
            className="w-full h-full px-[17px] hover:bg-white/[0.05] "
            onClick={() => {
              const data = {
                src: "Icons/visible.svg",
                title: "Public",
              };
              setVisibility(data);
              const newStata = [...on];
              newStata[2] = false;
              setOn(newStata);
            }}
          >
            <div className="flex gap-3">
              <Image src="Icons/visible.svg" alt="" height={20} width={20} />{" "}
              <h1 className="text-base text-[#757575] font-semibold">Public</h1>
            </div>
          </button>

          <button
            className="w-full h-full px-[17px] hover:bg-white/[0.05]"
            onClick={() => {
              const data = {
                src: "Icons/invisible.svg",
                title: "Members",
              };
              setVisibility(data);
              const newStata = [...on];
              newStata[2] = false;
              setOn(newStata);
            }}
          >
            <div className="flex gap-3">
              <Image src="Icons/invisible.svg" alt="" height={20} width={20} />{" "}
              <h1 className="text-base text-[#757575] font-semibold">
                Members
              </h1>
            </div>
          </button>
        </div>
      )}

      {/* For Date */}
      {on[0] && (
        <div className="w-[393px] h-[367px] rounded-[9px] bg-[#171C23] overflow-hidden pt-[28px] pb-[23px] px-[34px] absolute z-10 left-[63px] top-[251px]">
          <div className="w-full h-full">
            <h1 className="text-[#F2F2F2] font-bold text-[20px] leading-[24px] tracking-[0.38px]">
              {format(firstDayOfMonth, "MMMM yyyy")}
            </h1>
            <div className="w-full grid grid-cols-7 mt-[23px] ">
              {days.map((day, index) => {
                return (
                  <div
                    key={index}
                    className="font-normal text-xs text-[#808080] flex justify-center items-center"
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="w-full h-full grid grid-col-7 grid-rows-6">
              {daysInMonth.map((day, idx) => {
                return (
                  <div
                    key={idx}
                    className={colStartClasses[getDay(day)]}
                    onClick={() => {
                      const date = format(day, "d");
                      const month = format(day, "MMM");
                      const year = format(day, "y");

                      const data = date + " " + month + " " + year;
                      changeSelectedDate(data);
                      const newState = [...on];
                      newState[0] = !on[0];
                      setOn(newState);
                    }}
                  >
                    <p
                      className={`cursor-pointer flex items-center justify-center font-normal h-full w-full text-base ${
                        isSameMonth(day, today)
                          ? "text-[#F2F2F2]"
                          : "text-[#808080]"
                      }`}
                    >
                      {format(day, "d")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* For Add Bounty Button*/}
      {on[4] && (
        <div className="absolute left-[265px] top-[239px] w-[521px] h-[263px] bg-[#171C23] rounded-[20px] z-10">
          <button className="relative top-[23px] left-[471px] mb-[18px]">
            <RxCross2
              size={20}
              className="text-white"
              onClick={() => {
                const newState = [...on];
                newState[4] = false;
                setOn(newState);
              }}
            />
          </button>
          <h1 className="text-[#D9D9D9] text-sm font-semibold px-[60px] mb-2">
            TOKEN
          </h1>

          <div className="w-[400px] h-[40px] border border-[#757575] rounded-lg flex justify-between items-center px-[14px] ml-[60px] mb-[26px]">
            <h1 className="text-[#D9D9D9] text-sm font-normal ">
              USDC (Ethereum Mainnet)
            </h1>
            <Image
              src="Icons/Arrow_Down.svg"
              alt=""
              height={16}
              width={16}
              className="cursor-pointer"
            />
          </div>

          <h1 className="text-[#D9D9D9] text-sm font-semibold ml-[60px] mb-2">
            AMOUNT
          </h1>

          <div className="w-[400px] h-[40px] border border-[#757575] rounded-lg flex justify-between items-center overflow-hidden ml-[60px]">
            <div className="w-full h-full">
              <input
                className="bg-inherit outline-none px-[14px] h-full w-full overflow-hidden text-ellipsis"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const newState = [...on];
                    newState[4] = false;
                    setOn(newState);
                  }
                }}
              />
            </div>
            <button className="h-[40px] w-[68px] bg-[#757575] text-[#D9D9D9] text-sm font-normal flex justify-center items-center">
              USDC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoCard;
