import React from "react";

interface StatBadgeProps {
  stat: string;
  color: string;
}

export default function StatBadge(props: any) {
  return (
    <div className={`h-[23px] w-[63px] rounded-xl flex justify-center bg-[${props.color}] bg-opacity-80 items-center text-[${props.color}] text-sm`}>
      {props.stat}
    </div>
  );
}
