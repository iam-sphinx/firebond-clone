import QuizMission from "@/utils/QuizMission";
import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
const Quiz = (props: any) => {
  const [text1,setText1] = useState('');
  const [text2,setText2] = useState('');
  const [text3,setText3] = useState('');
  const [text4,setText4] = useState('');
  const [question, setQuestion] = useState(""); 
  const [option, setOption] = useState(1);
  const obj = QuizMission();

  obj.question[props.id] = question;
  obj.answer[props.id] = option;
  obj.options[props.id][0] = text1;
  obj.options[props.id][1] = text2;
  obj.options[props.id][2] = text3;
  obj.options[props.id][3] = text4;

  console.log("quiz",obj);
 
  // obj.answer = answer

  // obj.ans = True;


  function handleText1(e : any){
    setText1(e.target.value)
  }
  function handleText2(e : any){
    setText2(e.target.value)
  }
  function handleText3(e : any){
    setText3(e.target.value)
  }
  function handleText4(e : any){
    setText4(e.target.value)
  }

  return (
    <div className="w-full h-auto mb-[31px]">
      <div className="w-full flex justify-between gap-[17px]">
        {/* enter question */}
        <div className="w-full bg-[#474C52] rounded-lg overflow-hidden h-[42px]">
          <input
            className="w-full px-6 h-full outline text-white font-medium text-base bg-inherit placeholder:text-white"
            placeholder="question"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
        </div>
        {/* delete button */}
        <div
          className="h-[41px] w-[42px] bg-[#474C52] rounded-[4px] flex justify-center items-center cursor-pointer mb-[25px]"
          onClick={() => props.delete(props.id)}
        >
          <BsTrash3 />
        </div>
      </div>
      {/* True  / Choice  */}
      <div className="flex gap-4 items-center mb-5">
        <button
          onClick={() => {
            setOption(1);
          }}
          className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
            option === 1 ? "bg-white" : ""
          }`}
        ></button>
        <input
          type="text"
          className="w-half px-1 h-full  text-white font-medium text-base bg-[#2E363F] placeholder:text-white"
          placeholder=" "
          value={text1}
          onChange={handleText1}
        />
      </div>
      {/* False option / Add options */}
      <div className="flex gap-4 items-center mb-5">
        <button
          onClick={() => {
            setOption(2);
          }}
          className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
            option === 2 ? "bg-white" : ""
          }`}
        ></button>
         <input
          type="text"
          className="w-half px-1 h-full  text-white font-medium text-base bg-[#2E363F] placeholder:text-white"
          placeholder=" "
          value={text2}
          onChange={handleText2}
        />
      </div>
      <div className="flex gap-4 items-center mb-5">
        <button
          onClick={() => {
            setOption(3);
          }}
          className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
            option === 3 ? "bg-white" : ""
          }`}
        ></button>
         <input
          type="text"
          className="w-half px-1 h-full  text-white font-medium text-base bg-[#2E363F] placeholder:text-white"
          placeholder=" "
          value={text3}
          onChange={handleText3}
        />
      </div>
      <div className="flex gap-4 items-center mb-5">
        <button
          onClick={() => {
            setOption(4);
          }}
          className={`w-4 h-4 rounded-full border border-white cursor-pointer ${
            option === 4 ? "bg-white" : ""
          }`}
        ></button>
         <input
          type="text"
          className="w-half px-1 h-full  text-white font-medium text-base bg-[#2E363F] placeholder:text-white"
          placeholder=" "
          value={text4}
          onChange={handleText4}
        />
      </div>
      <div className="w-full h-0 border-[0.5px] border-[#474C52]"></div>
    </div>
  );
};
export default Quiz;
