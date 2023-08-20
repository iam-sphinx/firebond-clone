import React, { useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      title: "Firebond mission",
      amount: 41.2,
      type: "USDC",
    },
    {
      title: "Top member",
      amount: 51.2,
      type: "XP",
    },
    {
      title: "Write a blog mission",
      amount: 41.2,
      type: "USDC",
    },
    {
      title: "Follow mission",
      amount: 51.2,
      type: "XP",
    },
  ]);
  return (
    <div className="w-[339px] h-[325px] rounded-[10px] m-5 px-[29px] pt-[21px] bg-[#232B35] overflow-auto scrollbar-hide">
      <div className="h-full w-full">
        <div className="flex justify-between mb-[34px]">
          <h1 className="font-semibold text-[26px] leading-[35.1px] text-white">
            Transactions
          </h1>
          <button className="hover:underline text-[#A6A6A6] text-base font-normal">
            See all
          </button>
        </div>

        <div>
          {transactions.map((item, index) => {
            return (<div key={index}>
                <div className="flex justify-between items-center">
                    <h1 className="font-medium text-[#D9D9D9] text-sm">{item.title}</h1>
                    <h3 className={`${item.type === "USDC" ? "text-[#3EBE5E]" : "text-[#FF8D00]"} text-sm font-semibold`}>+{item.amount}{" "}{item.type}</h3>
                </div>
                <div className="h-0 w-full border border-[#A9A9A980] mb-[23px] mt-[21px]"></div>
            </div>);
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
