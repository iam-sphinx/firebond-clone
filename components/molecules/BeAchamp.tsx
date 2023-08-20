import React from "react";

const BeAchamp = (props: any) => {
  return (
    <div className="w-[346px] h-[267px] rounded-[20px] bg-[#232B35] relative">
      <h1 className="p-6  text-white font-semibold text-2xl">
        {props.title}
      </h1>
      <div className=" absolute top-[103px] border border-[#75757566] w-full h-0 "></div>

      {/* Reward and Tags Section */}
      <div className="w-full h-full px-6 absolute top-[133px]">
        <div className="h-full w-full">
        {/* Reward */}
          <div className="flex items-center gap-8 mb-[30px] ">
            <h1 className="text-sm font-normal text-[#A6A6A680]">Reward</h1>
            <button className="text-[#FFBA03] font-bold text-xs p-2 rounded-lg bg-[#FFBA035C]">
              {props.val} XP
            </button>
          </div>

          {/* Tags */}

          <div className="flex items-center gap-8">
            <h1 className="text-sm font-normal text-[#A6A6A680]">Tags</h1>
            <div className="flex gap-[6.13px]">
              {props.tags?.map((tag: any) => (
                
                  <button key={tag} className="px-[6px] h-[25px] flex justify-center items-center bg-[#363C44] text-white font-normal text-[10.22px] rounded-[4px]">
                    {tag}
                  </button>
               
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-[#232B35]  w-[346px] h-[267px]  rounded-2xl ">
    //   <div className="text-2xl font-bold mb-4 text-white w-[292px] h-[64px] ml-[15px] mt-[15px]">
    //     {props.title}
    //   </div>
    //   <div className="text-gray-500">
    //     <hr className="border-gray-500" />
    //   </div>
    //   <div className="flex ">
    //     <div>
    //       <div>
    //         <div className="inline-flex items-center px-2 py-1 bg-gray mb-3 text-white mt-2 mr-2">
    //           <span className="inline-flex items-center px-2 py-1 bg-gray mb-3 text-white mt-2">
    //             <span className="text-sm text-gray-400 mr-2">Reward</span>
    //             <span className="ml-2">
    //               <button className="inline-flex items-center justify-center bg-yellow-600 rounded-lg w-20 h-8 text-yellow-400 font-bold">
    //                 <p className="text-sm">{props.val} USDC</p>
    //               </button>
    //             </span>
    //           </span>
    //         </div>
    //       </div>
    //       <div className="inline-flex">
    //         <span className="m-3 bg-gray mb-4 text-white mr-2">
    //           <p className="text-sm text-gray-400 mr-2 ml-[4px]">Tags</p>
    //         </span>
    //         {props.tags?.map((tag: any) => (
    //           <span key={tag}>
    //             <button className="bg-gray-600 text-m m-1 p-1 mb-3 rounded-lg text-white h-8 w-30">
    //               <p>{tag}</p>
    //             </button>
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //     <div></div>
    //   </div>
    // </div>
  );
};

export default BeAchamp;
