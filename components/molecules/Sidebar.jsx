import Image from "next/image";
import router from "next/router";
import React, { useState, useEffect } from "react";

var name = "user";
if (typeof window !== "undefined") {
  const storedJsonData = localStorage.getItem("data");
  const jsonData = JSON.parse(storedJsonData ?? "{}");
  if (jsonData != null && jsonData.name) name = jsonData.name;
}
console.log(name);

const mainMenu = [
  {
    src: "Icons/box.svg",
    size: 24,
    title: "’s Space",
    route: "/NewDashboard",
  },
  {
    src: "Icons/bar-line-chart.svg",
    size: 24,
    title: "Analytics",
    route: "/AnalyticsScreen",
  },
  {
    src: "Icons/misson.svg",
    size: 24,
    title: "Missions",
    route: "/MissionMain",
  },
  {
    src: "Icons/members.svg",
    size: 24,
    title: " Members",
    route: "/MemberScreen",
  },
  {
    src: "Icons/icons.svg",
    size: 24,
    title: "Leaderboard",
    route: "/LeaderBoardScreen",
  },
  // {
  //   src: "Icons/shining-star.svg",
  //   size: 24,
  //   title: "Review",
  //   route: "/Review",
  // },
];

const secondMenu = [
  {
    src: "Icons/help_center.svg",
    size: 24,
    title: "Help Centre",
    route: "/HelpCentre",
  },
  {
    src: "Icons/setting.svg",
    size: 24,
    title: "Settings",
    route: "/setting",
  },
  // {
  //   src: "Icons/Fire_Scrolls.svg",
  //   size: 24,
  //   title: "Fire Scrolls",
  //   route: "/MissionReview",
  // },
];
const Sidebar = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedJsonData = localStorage.getItem("data");
      const jsonData = JSON.parse(storedJsonData ?? "{}");
      if (jsonData != null && jsonData.name) setName(jsonData.name);
    }
  }, [name]);
  const [hideMenu, setHideMenu] = useState(false);
  return (
    <div
      className={`${
        hideMenu ? "w-[98px]" : "w-[266px]"
      } h-full border-r-[1px] border-[#353B43] bg-[#171C23] transition-all duration-300 ease-in-out`}
    >
      {hideMenu ? (
        <div className="px-5">
          {/* Navbar */}
          <nav className="flex w-full items-center justify-center mt-[40px] mb-[68px]">
            <button
              onClick={() => {
                setHideMenu(!hideMenu);
              }}
            >
              <div className="flex relative h-[18px] w-[18px] left-[6px] text-center">
                <Image
                  height={6.75}
                  width={13.5}
                  src="Icons/Arrow_Left_1.svg"
                  alt="not found"
                  className="origin-center rotate-180 absolute right-[12px]"
                />
                <Image
                  height={6.75}
                  width={13.5}
                  src="Icons/Arrow_Left.svg"
                  alt="not found"
                  className="origin-center rotate-180 absolute right-[6px]"
                />
              </div>
            </button>
          </nav>

          {/* Menu */}
          <ul className="text-center">
            {mainMenu.map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-[57px] w-[53px]  cursor-pointer rounded-[10px] flex justify-center items-center hover:bg-gray-700"
                  onClick={() => router.push(item.route)}
                >
                  <Image
                    width={item.size}
                    height={item.size}
                    src={item.src}
                    alt=""
                  />
                </li>
              );
            })}
          </ul>

          <hr className="text-[#353B43] border-[1px] mb-[29px] mt-[15px] border-[#353B43]" />

          {/* Second menu */}
          <ul className="text-center">
            {secondMenu.map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-[57px] w-[53px]  cursor-pointer rounded-[10px] flex justify-center items-center hover:bg-gray-700"
                  onClick={() => router.push(item.route)}
                >
                  <Image
                    width={item.size}
                    height={item.size}
                    src={item.src}
                    alt="not found"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="px-5">
          <nav className="h-[54px] flex justify-between mb-[54px] mt-[18px]">
            <Image
              width={152}
              height={53.63}
              src="/Icons/logo.svg"
              alt="not found"
            />
            <button
              onClick={() => {
                setHideMenu(!hideMenu);
              }}
            >
              <div className="flex relative h-[18px] w-[18px] text-center">
                <Image
                  height={6.75}
                  width={13.5}
                  src="Icons/Arrow_Left.svg"
                  alt="not found"
                  className=" absolute right-[12px]"
                />
                <Image
                  height={6.75}
                  width={13.5}
                  src="Icons/Arrow_Left_1.svg"
                  alt="not found"
                  className=" absolute right-[6px]"
                />
              </div>
            </button>
          </nav>
          {/* Menu */}
          <ul>
            {mainMenu.map((item, index) => {
              return (
                <li
                  key={index}
                  className="w-[226px] h-[57px] pl-[14px]  cursor-pointer rounded-[10px] flex gap-[14px] items-center hover:bg-gray-700"
                  onClick={() => router.push(item.route)}
                >
                  <Image
                    width={item.size}
                    height={item.size}
                    src={item.src}
                    alt=""
                  />
                  <span className="text-white font-semibold text-base ">
                    {index === 0 ? name + item.title : item.title}
                  </span>
                </li>
              );
            })}
          </ul>

          <hr className="text-[#353B43] border-[1px] mb-[29px] mt-[15px] border-[#353B43]" />

          {/* Second menu */}
          <ul>
            {secondMenu.map((item, index) => {
              return (
                <li
                  key={index}
                  className="w-[226px] h-[57px]  cursor-pointer rounded-[10px] flex gap-[14px] items-center hover:bg-gray-700"
                  onClick={() => router.push(item.route)}
                >
                  <Image
                    width={item.size}
                    height={item.size}
                    src={item.src}
                    alt="not found"
                    className="ml-[14px]"
                  />
                  <span className="text-white font-semibold text-base">
                    {item.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
    // <>
    //   {hideMenu ? (
    //     <div className="max-w-[98px] min-h-screen border-r-[1px] border-[#353B43] bg-[#171C23] transition-all ">
    //       <div className="px-5">
    //         {/* Navbar */}
    //         <nav className="flex w-full items-center justify-center mt-[40px] mb-[68px]">
    //           <button
    //             onClick={() => {
    //               setHideMenu(!hideMenu);
    //             }}
    //           >
    //             <div className="flex relative h-[18px] w-[18px] text-center">
    //               <Image
    //                 height={6.75}
    //                 width={13.5}
    //                 src="Icons/Arrow_Left_1.svg"
    //                 alt="not found"
    //                 className="origin-center rotate-180 absolute right-[12px]"
    //               />
    //               <Image
    //                 height={6.75}
    //                 width={13.5}
    //                 src="Icons/Arrow_Left.svg"
    //                 alt="not found"
    //                 className="origin-center rotate-180 absolute right-[6px]"
    //               />
    //             </div>
    //           </button>
    //         </nav>

    //         {/* Menu */}
    //         <ul className="text-center">
    //           {mainMenu.map((item, index) => {
    //             return (
    //               <li
    //                 key={index}
    //                 className="h-[57px] w-[53px]  cursor-pointer rounded-[10px] flex justify-center items-center hover:bg-gray-700"
    //                 onClick={() => router.push(item.route)}
    //               >
    //                 <Image
    //                   width={item.size}
    //                   height={item.size}
    //                   src={item.src}
    //                   alt=""
    //                 />
    //               </li>
    //             );
    //           })}
    //         </ul>

    //         <hr className="text-[#353B43] border-[1px] mb-[29px] mt-[15px] border-[#353B43]" />

    //         {/* Second menu */}
    //         <ul className="text-center">
    //           {secondMenu.map((item, index) => {
    //             return (
    //               <li
    //                 key={index}
    //                 className="h-[57px] w-[53px]  cursor-pointer rounded-[10px] flex justify-center items-center hover:bg-gray-700"
    //                 onClick={() => router.push(item.route)}
    //               >
    //                 <Image
    //                   width={item.size}
    //                   height={item.size}
    //                   src={item.src}
    //                   alt="not found"
    //                 />
    //               </li>
    //             );
    //           })}
    //         </ul>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="max-w-[266px] min-h-screen border-r-[1px] border-[#353B43] bg-[#171C23] ">
    //       <div className="px-5">
    //         <nav className="flex justify-between mb-[54px] mt-[18px]">
    //           <Image
    //             width={152}
    //             height={53.63}
    //             src="/Icons/logo.svg"
    //             alt="not found"
    //           />
    //           <button
    //             onClick={() => {
    //               setHideMenu(!hideMenu);
    //             }}
    //           >
    //             <div className="flex relative h-[18px] w-[18px] text-center">
    //               <Image
    //                 height={6.75}
    //                 width={13.5}
    //                 src="Icons/Arrow_Left.svg"
    //                 alt="not found"
    //                 className=" absolute right-[12px]"
    //               />
    //               <Image
    //                 height={6.75}
    //                 width={13.5}
    //                 src="Icons/Arrow_Left_1.svg"
    //                 alt="not found"
    //                 className=" absolute right-[6px]"
    //               />
    //             </div>
    //           </button>
    //         </nav>
    //         {/* Menu */}
    //         <ul>
    //           {mainMenu.map((item, index) => {
    //             return (
    //               <li
    //                 key={index}
    //                 className="w-[226px] h-[57px] pl-[14px]  cursor-pointer rounded-[10px] flex gap-[14px] items-center hover:bg-gray-700"
    //                 onClick={() => router.push(item.route)}
    //               >
    //                 <Image
    //                   width={item.size}
    //                   height={item.size}
    //                   src={item.src}
    //                   alt=""
    //                 />
    //                 <span className="text-white font-semibold text-base ">
    //                   {index === 0 ? name + item.title : item.title}
    //                 </span>
    //               </li>
    //             );
    //           })}
    //         </ul>

    //         <hr className="text-[#353B43] border-[1px] mb-[29px] mt-[15px] border-[#353B43]" />

    //         {/* Second menu */}
    //         <ul>
    //           {secondMenu.map((item, index) => {
    //             return (
    //               <li
    //                 key={index}
    //                 className="w-[226px] h-[57px]  cursor-pointer rounded-[10px] flex gap-[14px] items-center hover:bg-gray-700"
    //                 onClick={() => router.push(item.route)}
    //               >
    //                 <Image
    //                   width={item.size}
    //                   height={item.size}
    //                   src={item.src}
    //                   alt="not found"
    //                   className="ml-[14px]"
    //                 />
    //                 <span className="text-white font-semibold text-base">
    //                   {item.title}
    //                 </span>
    //               </li>
    //             );
    //           })}
    //         </ul>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
};

export default Sidebar;
