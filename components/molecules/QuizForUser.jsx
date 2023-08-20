import Answer from "@/utils/Answer";
import { useState } from "react";
import { setOptions } from "react-chartjs-2/dist/utils";


export default function QuizForUser(props: any) {
  let obj = Answer();
  const[option1,setOption1] = useState(0);
  const[option2,setOption2] = useState(0);
  const[option3,setOption3] = useState(0);
 
  obj.options = [option1,option2,option3];
   
  
  

  return (
    <>
      <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
        <h1 className="font-medium text-large text-white mb-[11px]">
          {props.question[0]}
        </h1>
        <div className="flex gap-4 items-center mb-5">
          <button
            onClick={() => {
              setOption1(1);
            }}
            className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
              option1 === 1 ? "bg-white" : ""
            }`}
          ></button>
          <h1 className="text-sm font-normal text-[#D0D0D0]">
            {props.options[0][0]}
          </h1>
        </div>
        {/* False option / Add options */}
        <div className="flex gap-4 items-center mb-5">
          <button
            onClick={() => {
              setOption1(2);
            }}
            className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option1 === 2 ? "bg-white" : ""
            }`}
          ></button>
          <h1 className="text-sm font-normal text-[#D0D0D0]">
            {props.options[0][1]}
          </h1>
        </div>
        <div className="flex gap-4 items-center mb-5">
          <button
            onClick={() => {
              setOption1(3);
            }}
            className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option1 === 3 ? "bg-white" : ""
            }`}
          ></button>
          <h1 className="text-sm font-normal text-[#D0D0D0]">
            {props.options[0][2]}
          </h1>
        </div>
        <div className="flex gap-4 items-center mb-5">
          <button
            onClick={() => {
              setOption1(4);
            }}
            className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option1 === 4 ? "bg-white" : ""
            }`}
          ></button>
          <h1 className="text-sm font-normal text-[#D0D0D0]">
            {props.options[0][3]}
          </h1>
        </div>
      </div>
      {props.question[1]!=undefined && (
        <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
          <h1 className="font-medium text-large text-white mb-[11px]">
            {props.question[1]}
          </h1>
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption2(1);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option2===1 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[1][0]}
            </h1>
          </div>
          {/* False option / Add options */}
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption2(2);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option2 === 2 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[1][1]}
            </h1>
          </div>
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption2(3);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option2 === 3 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[1][2]}
            </h1>
          </div>
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption2(4);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option2 === 4 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[1][3]}
            </h1>
          </div>
        </div>
      )}
      {props.question[2] != undefined && (
        <div className="max-w-[700px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6 ml-9 realtive">
          <h1 className="font-medium text-large text-white mb-[11px]">
            {props.question[2]}
          </h1>
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption3(1);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option3===1 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[2][0]}
            </h1>
          </div>
          {/* False option / Add options */}
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption3(2);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option3 === 2 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[2][1]}
            </h1>
          </div>
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption3(3);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option3 === 3 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[2][2]}
            </h1>
          </div>
          <div className="flex gap-4 items-center mb-5">
            <button
              onClick={() => {
                setOption3(4);
              }}
              className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
                option3 === 4 ? "bg-white" : ""
              }`}
            ></button>
            <h1 className="text-sm font-normal text-[#D0D0D0]">
              {props.options[2][3]}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
