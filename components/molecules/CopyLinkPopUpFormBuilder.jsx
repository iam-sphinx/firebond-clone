import React, { useState } from "react";
import ReactDOM from "react-dom";
import CopyToClipboard from "react-copy-to-clipboard";

import { MdContentCopy } from "react-icons/md";

export default function CopyLinkPopUpFormBuilder(props: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center h-[298px] w-[616px] bg-[#171C23] rounded-[20px]">
        <p className="text-[#FFFFFF] font-[600] text-[24px] mt-[40px]">
          Hooray! Your {props.forWhichComponent} is ready for the world
        </p>
        <p className="text-[#A6A6A6] text-center h-[44px] w-[465px] font-[400] mt-[10px] text-[16px]">
          Copy the link and share it with your future commnunity builder
        </p>
        <div className="flex flex-row items-center h-[47px] border-[1px] mt-[50px]   bg-[#2E363F] rounded-[8px]">
          <div className="flex text-[#D0D0D0] text-[12px] ml-[10px] ">
            {props.url}
            <CopyToClipboard text={props.url} onCopy={handleCopy}>
              <MdContentCopy size={20} className="ml-[20px]" />
            </CopyToClipboard>
          </div>
        </div>
        {copied && (
          <div className="text-[#FFFFFF] text-[14px] mt-[10px]">Copied!</div>
        )}
      </div>
    </div>
  );
}
