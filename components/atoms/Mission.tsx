import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/dist";
import { Context } from "vm";

ChartJS.register(ArcElement, Tooltip, Legend);

const Mission = (props:any) => {
  const data = {
    datasets: [
      {
        labels: ["completed", "remaining"],
        data: [props.count,39.07],
        backgroundColor: (context : Context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex === 0) {
            return getGradiant(chart);
          } else {
            return "#505050";
          }
        },
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

  function getGradiant(chart : Chart ) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradiantSegment = ctx.createLinearGradient(left, 0, right, 0);
    gradiantSegment.addColorStop(0, "#FD241C");
    gradiantSegment.addColorStop(1, "#FE702A");
    return gradiantSegment;
  }
  return (
    <div className="w-full h-full">
      <div className="w-[153.8px] h-[153.8px] relative">
        <Doughnut data={data} options={options}></Doughnut>
        <div>
          <h1 className="text-[#D9D9D9] font-semibold text-[17.58px] leading-[23.73px] absolute top-[61.58px] left-[38.45px]">
            Missions
          </h1>
          <h3 className="text-white font-medium text-[43.94px] leading-[59.32px] absolute top-[83.55px] left-[38.04px]">
            {props.count}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Mission;
