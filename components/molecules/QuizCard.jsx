import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { IoIosAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import Priority from "./Priority";
import QuizMission from "@/utils/QuizMission";
const QuizCard = () => {
  const [cards, setCards] = useState([{id:0}]);
  const obj = QuizMission();
  

  const handleDelete = (id: any) => {
    const updatedCards = cards.filter((card)=>id!=card.id)
    setCards(updatedCards);
  };

  const handleClick = () => {
    if (cards.length < 3) {
      const addCards = [...cards,{
        id: cards.length
      }]
      obj.question.push("");
      obj.answer.push(0);
      obj.options.push(["","","",""]);

      // question.push(obj.question)
      setCards(addCards)
    } else return;
  };

  return (
    <div className="max-w-[720px] h-auto rounded-[20px] bg-[#232B35] p-6 relative mb-6">
      <h1 className="text-white font-normal text-xl mb-[37px]">
        Write the questions
      </h1>
     
      <div className=" absolute border-[0.5px] border-[#474C52] h-0 left-0 right-0 top-[72px]"></div>
      {/* <Quiz /> */}
      {/* <Quiz/> */}
      {/* Rendering Quizes */}
      {cards.map((card) => {
        return (
          <>
          <div key={card.id}>
           <Quiz id={card.id} delete={handleDelete} />
          </div>
          </>
        );
      })}
      {/* Add More Quiz functionality */}
      <div className="flex gap-[10px] mb-[51px] mt-10">
        <Image
          src="Icons/add.svg"
          alt=""
          height={29}
          width={29}
          onClick={handleClick}
          className="cursor-pointer"
        />
        <Image src="Icons/Line.svg" alt="" height={0} width={659} />
      </div>
    </div>
  );
};
export default QuizCard;