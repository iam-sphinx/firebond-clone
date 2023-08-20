
import MissionFormData from "@/utils/MissionFormData";
import React, { useState } from "react";

const Reccurence = () => {
  const [Recurrence, setReccurence] = useState("");
  const obj = MissionFormData();
  
  
  

  obj.recurrence = Recurrence;
  return (
    <div>
      <h1 className="font-medium text-[16px] mt-6 leading-[22px] text-white mb-[10px]">
        Recurrence
      </h1>
      {Recurrence != "" && (
        <button className="px-[11px] py-[8px] hover:bg-[#232B35] border-[1px] border-[#757575] rounded-[4px] text-white text-[14px] leading-[19px] mb-6">
          {Recurrence}
        </button>
      )}
      <div className="flex gap-[14px]">
        <button
          className="px-[11px] py-[8px] hover:bg-[#232B35] border-[1px] border-[#757575] rounded-[4px] text-white text-[14px] leading-[19px]"
          onClick={() => {
            setReccurence("Once");
          }}
        >
          Once
        </button>
        <button
          className="px-[11px] py-[8px] hover:bg-[#232B35] border-[1px] border-[#757575] rounded-[4px] text-white text-[14px] leading-[19px]"
          onClick={() => {
            setReccurence("Twice");
          }}
        >
          Twice
        </button>
        <button
          className="px-[11px] py-[8px] hover:bg-[#232B35] border-[1px] border-[#757575] rounded-[4px] text-white text-[14px] leading-[19px]"
          onClick={() => {
            setReccurence("Weekly");
          }}
        >
          Weekly
        </button>
        <button
          className="px-[11px] py-[8px] hover:bg-[#232B35] border-[1px] border-[#757575] rounded-[4px] text-white text-[14px] leading-[19px]"
          onClick={() => {
            setReccurence("Monthly");
          }}
        >
          Monthly
        </button>
      </div>
      
    </div>
    
  );
};

export default Reccurence;
