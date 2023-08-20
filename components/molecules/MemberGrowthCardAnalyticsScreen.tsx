import { useEffect,useState } from "react";
import { ChartDataset } from "chart.js";
import { Chart } from "chart.js/auto";

function MemberGrowthCardAnalyticsScreen() {
    const [isOpen, setOpen] = useState(false);

    const handleDropDown = () => {
        
      setOpen(!isOpen);
    };
  useEffect(() => {
    var canvas = document.getElementById("myChart") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d")!;
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY","AUG"],
        datasets: [
          {
            data: [20, 25, 15, 20, 30, 10, 20, 10],
            label: "Twitter",
            
            
           
            barThickness: 18,
            backgroundColor: "#64CFF6",
            borderRadius: {
                topLeft:10,
                topRight:10,
                bottomLeft:10,
                bottomRight:10,
            },
             borderWidth: 5,
             borderColor:'rgba(0,0,0,0)',
          },
          {
            data: [30, 40, 25, 30, 40, 30, 40, 25],
            label: "Discord",
            borderRadius: {
                topLeft:10,
                topRight:10,
                bottomLeft:10,
                bottomRight:10,
            },
            barThickness: 18,
            backgroundColor: "#6359E9",
            borderWidth: 5,
            borderColor:"rgba(0,0,0,0)",

          },
        ],
      },

      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              boxWidth:13,
              useBorderRadius:true,
              borderRadius:6,
            },
          },
          tooltip:{
            backgroundColor:"#464687",
          },
        },
        scales: {
          x: {
            ticks: {
              //labels at x-axis are ticks
              color: "#8C89B4",
              display: true,
            },
            grid: {
              color: "black",
              display: false,
              
            },

      
          },
          y: {
            grid: {
              color:"#8C89B4",
              drawTicks:false,
            
            },
            border:{
                dash:[4,4],

            },
            ticks:{
              
                maxTicksLimit: 6,
                
                callback: function(value, index, ticks) {
                    return  value + 'k   ';
                }
            }
            // stacked: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <>
      
      <div className="w-[668px] h-[382px] bg-[#232B35] justify-center relative rounded-[20px] ">
        <span className="absolute text-[#FFFFFF] top-[5px] left-[24px] font-['General Sans'] text-[24px]">
          Member Growth
        </span>
        
     {/*for legend */}
     <div className="flex justify-center space-x-4 absolute h-[5px] left-[300px] top-[25px]">
          <label className="inline-flex items-center">
            <div className="h-[15px] w-[15px] rounded-full bg-[#6359E9]"></div>
            <span className="text-[#FFFFFF] ml-2 font-['General Sans']  text-[15px]">
              Discord
            </span>
          </label>
          <label className="inline-flex items-center">
            <div className="h-[15px] w-[15px] rounded-full bg-[#64CFF6]"></div>
            <span className="text-[#FFFFFF] ml-2 font-['General Sans']  text-[15px]">
              Twitter
            </span>
          </label>
        </div>
        {/* legend over */}

        <div className="dropdown left-[570px] top-[14px]">
        <button tabIndex={0} className="border-[#AEABD8] border-[1px] opacity-[.5] text-center inline-flex  items-center  border-solid  w-[75px] h-[20px] font-[Plus Jakarta Sans] text-[#8C89B4] font-[400] rounded-[20px] "><p className="absolute left-[5px] font-[white]">2023</p>   <svg
              className="absolute left-[60px] font-[white] text-[white]  font-[600] top-[7px]"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              transform="10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg></button>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
        </ul>
        </div>

        <canvas
          id="myChart"
          width={668}
          height={320}
          className="absolute top-[60px]"
        ></canvas>
        
      </div>
    </>
  );
}

export default MemberGrowthCardAnalyticsScreen;

