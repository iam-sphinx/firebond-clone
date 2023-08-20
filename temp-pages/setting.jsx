// import { useState, useEffect } from "react";
// import Sidebar from "../components/molecules/Sidebar";
// import Header from "../components/atoms/Header";
// import { supabase } from "../utils/supabaseClient";

// const { isAddress } = require("ethereum-address");

// export default function Home() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [wallet, setWallet] = useState("");

//   if (typeof window !== "undefined") {
//     //supabase code retriving users informtion from database
//     const storedJsonData = localStorage.getItem("data");
//     const jsonData = JSON.parse(storedJsonData ?? "{}");
//     let name = jsonData.name;
//     let emailId = jsonData.email;
//     let walletId = jsonData.wallet_id;
//     // console.log(name,emailId,walletId)

//     const handleInputChange = (event: any) => {
//       setUsername(event.target.value);
//     };
//     const handelEmailChange = (event: any) => {
//       setEmail(event.target.value);
//     };
//     const handleWalletChange = (event: any) => {
//       setWallet(event.target.value);
//     };
//     const handelEmailClick = async () => {
//       const { data: dataUpdate, error: updateError } = await supabase
//         .from("community_data")
//         .update({ email: `${emailId}` })
//         .eq("wallet_id", walletId);
//       if (updateError) {
//         alert("Error");
//       } else {
//         alert(`Username Updated Successfully ${email}`);
//       }
//       // localStorage.setItem("email",email);
//       // alert("Email updated successfully");
//     };
//     //Updating username
//     const handleUpdateClick = async () => {
//       const { data: dataUpdate, error: updateError } = await supabase
//         .from("community_data")
//         .update({ name: `${username}` })
//         .eq("wallet_id", walletId);
//       if (updateError) {
//         alert("Error");
//       } else {
//         alert(`Username Updated Successfully:${username}`);
//       }
//       //localStorage.setItem("username",username);
//       // alert("Username updated successfully");
//     };

//     const handelWalletClick = async () => {
//       const ethAddress = wallet; // Replace with the Ethereum address you want to validate

//       if (isAddress(ethAddress)) {
//         console.log("Valid Ethereum address");
//         const { data: dataUpdate, error: updateError } = await supabase
//           .from("community_data")
//           .update({ wallet_id: `${walletId}` })
//           .eq("wallet_id", walletId);
//         if (updateError) {
//           alert("Error");
//         } else {
//           alert(`Wallet Address Updated Successfully with:${wallet}`);
//         }
//       } else {
//         console.log("Invalid Ethereum address");
//         alert("Invalid Ethereum address");
//       }

//       // localStorage.setItem("wallet",wallet);
//       // alert("Wallet updated successfully");
//     };
//     const handelDelete = async () => {
//       const { data: dataUpdate, error: updateError } = await supabase
//         .from("community_data")
//         .delete()
//         .eq("wallet_id", walletId);

//       if (confirm("Are you sure you want to delete your account?")) {
//         if (updateError) {
//           alert("Error");
//         } else {
//           alert(`Account Deleted Successfully`);
//         }
//         localStorage.clear();
//         window.location.href = "/";
//       }
//     };

//     return (
//       <>
//         <div className="min-h-screen bg-[#171C23] flex overflow-x-hidden">
//           <Sidebar />
//           <div className="h-full w-full">
//             <Header />
//             <div className="ml-[20px] justify-between">
//               <div className=" px-6 pt-[29px] ">
//                 <section className="first-section">
//                   <div className="profile-img">
//                     <img src="/Avatar.png" alt="profile" />
//                   </div>
//                   <div className="links-zone ml-[20px]">
//                     <span> Email </span>
//                     <span> discord </span>
//                     <button> Twitter </button>
//                     <button> LinkedIn </button>
//                   </div>
//                 </section>
//               </div>
//               <div>
//                 <label className="label">
//                   Username <br />
//                   <div className="w-1/2">
//                     <input
//                       type="text"
//                       value={username}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <button
//                     className="updateButton mt-[10px]"
//                     onClick={handleUpdateClick}
//                   >
//                     {" "}
//                     Update{" "}
//                   </button>
//                 </label>
//               </div>
//               <label className="label">
//                 Email <address></address>
//                 <div className="w-1/2">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={handelEmailChange}
//                   />
//                 </div>
//                 <button
//                   className="updateButton mt-[10px]"
//                   onClick={handelEmailClick}
//                 >
//                   {" "}
//                   Update{" "}
//                 </button>
//               </label>
//               <span>
//                 {" "}
//                 Please enter your address so that we can send you web3 newslater{" "}
//               </span>
//               <section className="second-section">
//                 <div> Reward Section </div>
//                 <label className="label">
//                   Wallet Address <address></address>
//                   <div className="w-1/2">
//                     <input
//                       type="text"
//                       value={wallet}
//                       onChange={handleWalletChange}
//                     />
//                   </div>
//                   <button
//                     className="updateButton mt-[10px]"
//                     onClick={handelWalletClick}
//                   >
//                     {" "}
//                     Update{" "}
//                   </button>
//                 </label>
//                 <span>
//                   {" "}
//                   Please enter your address so that we can send you rewards{" "}
//                 </span>
//               </section>
//               <section className="section-three">
//                 <div> Danger Zone </div>
//                 <button> Delete My Account </button>
//               </section>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

import Header from "@/components/atoms/Header";
import CommunityProfileSettingPage from "@/components/molecules/CommunityProfileSettingPage";
import GeneralInfoSettingPage from "@/components/molecules/GeneralInfoSettingPage";
import Sidebar from "@/components/molecules/Sidebar";
import React, { useState } from "react";
import IntegrationsSettingPage from "@/components/molecules/IntegrationsSettingPage";
import { json } from "stream/consumers";
import { supabase } from "@/utils/supabaseClient";
import SettingData from "@/utils/SettingData";

// Header Menu
const headerMenu = [
  {
    title: "General information",
  },
  {
    title: "Community profile",
  },
  {
    title: "Integrations",
  },
];

const Setting = () => {
  const [Component, setComponent] = useState([true, false, false]);
  const obj = SettingData();

  var wallet_id = "";
  var name = "";
  var email = "";
  var community_type = 0;
  var community_name = "";
  var community_description = "";
  if (typeof window !== "undefined") {
    const storedJsonData = localStorage.getItem("data");
    // console.log(storedJsonData)
    const jsonData = JSON.parse(storedJsonData ?? "{}");
    wallet_id = jsonData.wallet_id;
    name = jsonData.name;
    email = jsonData.email;
    community_type = jsonData.community_type;
    community_name = jsonData.community_name;
    community_description = jsonData.community_description;
    console.log(jsonData.emailId);
  }

  // Function for handling component
  const handleClick = (item: number) => {
    const newState = Component.map((value, index) => index === item);
    setComponent(newState);
  };

  async function UpdateValue() {
    const { data, error: updateError } = await supabase
      .from("community_data")
      .update({
        name: obj.name,
        email: obj.email,
        community_name: obj.community_name,
        community_description: obj.community_description,
      })
      .eq("wallet_id", wallet_id); // specify the row to update using a filter condition
    if (updateError) {
      alert("Failed to create mission please create again");
      console.error(updateError);
    } else {
      setTimeout(() => {}, 3000);
      alert("Data updated successfully!");
    }
  }

  return (
    <div className="h-screen min-w-fit bg-[#171C23] flex">
      <Sidebar />

      {/* Main Section */}
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <Header />

        {/* Centeral Section */}
        <div className="flex-[1]">
          <div className="h-[115px] w-full border-b border-[#353B43] px-6 py-7 sticky top-[80px] z-10 bg-[#171C23]">
            <div className="w-full h-full">
              <h1 className="font-semibold text-2xl text-white mb-2">
                Settings
              </h1>
              <div className="flex justify-between">
                <h3 className="font-medium text-sm text-[#A6A6A6]">
                  Update/edit your profile
                </h3>
                <div className="flex gap-[14px]">
                  <button
                    className="w-[72px] h-[33px] rounded-lg flex justify-center items-center border border-[#757575] hover:border-white text-medium font-sm text-[#A6A6A6] hover:text-white"
                    onClick={UpdateValue}
                  >
                    Save
                  </button>
                  <button className="w-[72px] h-[33px] rounded-lg flex justify-center items-center border border-[#757575] hover:border-white text-medium font-sm text-[#A6A6A6] hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Main Section */}

          <div className="w-full h-full pt-[38px] pl-6">
            <div className="w-full h-full">
              {/* Navigation bar */}
              <div className="w-[641px] h-[80px] mb-5 rounded-[10px] bg-[#232B35] flex items-center justify-start">
                <div className="flex">
                  {headerMenu.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className="px-5 ml-4 py-[14px] flex justify-center items-center rounded-[4px] hover:bg-[#FFFFFF0D]"
                        onClick={() => {
                          handleClick(index);
                        }}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Section */}
              {Component[0] && (
                <GeneralInfoSettingPage name={name} email={email} />
              )}

              {Component[1] && (
                <CommunityProfileSettingPage
                  community_name={community_name}
                  community_description={community_description}
                  community_type={community_type}
                />
              )}

              {Component[2] && <IntegrationsSettingPage />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
