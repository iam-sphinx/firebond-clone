import MissionFormData from "@/utils/MissionFormData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsXCircleFill } from "react-icons/bs";
import { HiOutlinePlusCircle, HiXCircle } from "react-icons/hi2";
import FilterTags from "@/utils/FilterTags";
// import FormData from "@/utils/MissionFormData";

const Tags = (props:any) => {
  let title = 'Tags';
  if(props.title!=undefined){
    title = props.title;
  }
  const obj = MissionFormData();
  
  const [Tags, setTags] = useState(
    (obj.tags.length>0&&obj.tags[0].title!='')?obj.tags:
    [
  ]
  );
  const [addTagPopup, setaddTagPopup] = useState(false);
  const [tag,setTag] = useState('');
 

   
     if(props.filter!=undefined&&props.filter==='yes'){
            FilterTags().tags = Tags;
     }
     else{
        obj.tags = Tags;
     }
     console.log('filtertags->',FilterTags().tags);
  const handleClick = () => {
    setaddTagPopup(!addTagPopup);
  };
  useEffect(()=>{
   
    setaddTagPopup(false);
  },[props.tagInputVisibility])
  return (
    <div>
      <h1 className="font-medium text-[16px] mt-6  leading-[22px] text-white mb-[10px]">
        {title}
      </h1>
      <div className="w-[383px] h-auto py-2 bg-[#232B35] rounded-[8px] pr-3 pl-[10px] ">
        <div className="flex justify-start items-center ">
          <div className="flex gap-[6.13px]  max-w-[250px] py-2 px-1 overflow-auto scrollbar-hide">
            {Tags.map((tag, index) => (
              <div
                key={index}
                className="inline-flex relative gap-[4.33px] bg-[#363C44] px-[5px] py-[1px] rounded-[2.0348px] justify-center items-center"
              >
                {tag.src != "" && (
                  <Image width={11} height={10} alt="" src={tag.src} />
                )}
                {tag.title!=''&&(<h1 className="font-normal text-[10.2174px] text-white font-open-sans">
                  {tag.title}
                </h1>)}

                <HiXCircle
                  size={11}
                  className="absolute -top-1 -right-1 active:text-red-500 cursor-pointer"                 onClick={() => {
                    const newTags = Tags.slice(0, index).concat(
                      Tags.slice(index + 1, Tags.length)
                    );
                    setTags(newTags);
                  }}
                />
              </div>
            ))}
          </div>
          <HiOutlinePlusCircle
            size={24}
            className="cursor-pointer text-[#757575]"
            onClick={() => handleClick()}
          />
        </div>

        {/* Add Tag */}
        {addTagPopup && (
          <div className="my-3 h-7 rounded-md overflow-hidden">
            <input
              type="text"
              className="w-full h-full outline-none px-6 text-ellipsis overflow-hidden text-xs text-[#A9A9A9] placeholder:text-[#A9A9A9]"
              placeholder="add tag"
              value = {tag}
              onChange = {(e)=>{setTag(e.target.value)}}
              onKeyDown={(e)=>{
                if(e.key==='Enter')
                {
                  if(tag === '')
                  return
                  const newTags = [...Tags,{src:"", title: tag}];
                  setTags(newTags);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;
