import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Context } from "vm";

ChartJS.register(ArcElement, Tooltip, Legend);

const Days = (props:any) => {
  const data = {
    datasets: [
      {
        labels: ["completed", "remaining"],
        data: [props.days, 56.7],
        backgroundColor: ["#01B763", "#505050"],
        borderColor: ["transparent", "transparent"],
        circumference: 252,
      },
    ],
  };

  const options = {
    cutout: 60,
    rotation: 233,
    plugins: {
        tooltip: {
          callbacks: {
            label: function (context : Context) {
              var label = context.dataset.labels[context.dataIndex] || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += context.parsed + "%";
              }
              return label;
            },
          },
        },
      },
  };

  
  return (
    <div className="w-full h-full">
      <div className="w-[153.8px] h-[153.8px] relative">
        <Doughnut data={data} options={options}></Doughnut>
        <div>
          <h1 className="text-[#D9D9D9] font-semibold text-[17.58px] leading-[23.73px] absolute top-[61.58px] left-[53.45px]">
            Days
          </h1>
          <h3 className="text-white font-medium text-[43.94px] leading-[59.32px] absolute top-[83.55px] left-[38.04px]">
            {props.days}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Days;
