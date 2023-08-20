import React from "react";

interface CardProps {
  title: string;
  text: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, text,className }) => {
  return (
    <div className={`absolute w-[662px] h-[431px]  bg-gray-800 shadow-md ${className}`}>
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-white">{text}</p>
        <div className="mt-6"></div>
      </div>
    </div>
  );
};

export default Card;
