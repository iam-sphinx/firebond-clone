import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import router from "next/router";
import React, { use, useState } from "react";
import InstallMetamaskPopup from "./InstallMetamaskPopup";
import { Modal } from "@material-ui/core";
import CommunityId from "./community/[communityId]";
import { FaFire } from "react-icons/fa";
// import { supabase } from "@/utils/supabaseClient";
const UserCard = [
  {
    title: "Connect your wallet",
    button: "Connect",
  },
  // {
  //   title: "Connect your Twitter",
  //   button: "Connect",
  // },
  // {
  //   title: "Connect your Discord",
  //   button: "Connect",
  // },
];
// you will recieve communityId in props
let wallet_id2: any;
const UserAuthCard = (props: any) => {
  const [verified, setVerified] = useState(UserCard.map(() => false));
  const [email, setEmail] = useState("");
  const [wallet, setWalletAddress] = useState("");
  const [flag, setFlag] = useState(false);
  const [Username, setUsesrname] = useState("");
  const [UsernamePopUp, setUsernamePopUp] = useState(false);

  const checkUserExists = async (table: any, wallet_id: string) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("wallet_id", wallet_id);

    if (error) {
      console.error("Error checking row existence:", error);

      return;
    }
    // console.log("data of usertable row->",data);
    if (data.length > 0) {
      // no need to take name
      let is_already_a_member = false;

      // console.log('user exist hence redirect it and take care of whether he already a member or not');
      // checking whether the guy already memebr of that community
      const { data: new_data, error } = await supabase
        .from("community_data")
        .select("*")
        .eq("id", Number(props.communityId));
      if (error) {
        console.log("error in fetching data of community", error);
      } else {
        // console.log('new_data',new_data);
        let members_arr = new_data[0].Members;
        if (members_arr != null) {
          members_arr.forEach((value: any, index: any) => {
            // console.log('already a member of community')
            if (value.user_wallet_id == wallet_id) {
              // console.log('already a member of community')
              is_already_a_member = true;
            }
          });
        }
        // console.log('is already a member',is_already_a_member);
        if (!is_already_a_member) {
          // not a member so made it a member
          //also have to update communities column of that user

          let user_communities = data[0].communities;
          user_communities.push(props.communityId);
          // console.log('usercommunities',user_communities);
          // console.log('wallet->',wallet_id);

          const { data: updating_user_data, error: user_error } = await supabase
            .from("userdata")
            .update({
              communities: user_communities,
            })
            .eq("wallet_id", wallet_id);

          if (user_error) {
            console.log(
              "error in updating communitites in userdata table",
              user_error
            );
            return;
          } else {
            // to be added community adding feature inside community data table

            console.log(
              "communities updated succesfully in user table so redirect now"
            );
          }
          // now communities column is updated till now

          if (members_arr != null) {
            members_arr.push({
              User_name: data[0].name,
              user_wallet_id: wallet_id,
              date_of_join: new Date(),
              missions_completed: [],
              current_xp: 0,
              current_bounty: 0,
            });
          } else {
            members_arr = [
              {
                User_name: data[0].name,
                user_wallet_id: wallet_id,
                date_of_join: new Date(),
                missions_completed: [],
                current_xp: 0,
                current_bounty: 0,
              },
            ];
          }

          //update data inside community data table
          const { data: updating_data, error } = await supabase
            .from("community_data")
            .update({
              Members: members_arr,
            })
            .eq("id", Number(props.communityId));
          if (error) {
            console.log("error in updating members", error);
            return;
          } else {
            // to be added community adding feature inside community data table
            console.log(
              "members updated succesfully in community so redirect now"
            );
          }
        } else {
          console.log(
            "already a member of community so redirect him directly after updating its keys and values in local sto"
          );
        }
        // now pushing him to your space -> aps handles things from here
        if (window !== undefined) {
          await window.localStorage.setItem("community_id", props.communityId);
          await window.localStorage.setItem("user_wallet_id", wallet_id);
          // console.log("wallet id of new user->",wallet_id);
          router.push("/YourSpace");
        }
      }
    } else {
      // need to take user name
      setUsernamePopUp(true);
      // alert('input name');
      // console.log('new user');
    }
  };
  // right now we have wallet authentication only

  const connectWallet = async () => {
    let accounts = "";
    //acccounts will be an array of size 1 which contain wallet id of the guy.
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        wallet_id2 = accounts[0];
        // console.log("letsee->",accounts[0]);
      } catch (err) {
        console.error(err);
        return;
      }
      UserCard[0].button = "Connected";
      setFlag(!flag);
      // console.log(accounts);
      if (accounts !== "") {
        //means accounts will have data know
        // console.log("inside acount");
        // console.log(props.communityId);
        const { data, error } = await supabase
          .from("community_data")
          .select("*")
          .eq("id", props.communityId);
        if (error) {
          console.log("error in fetching");
        } else {
          console.log("data of community->", data);
          if (accounts[0] === data[0].wallet_id) {
            console.log("u are the community manager");
            router.push("/NewDashboard");
          } else {
            //now to check if he is a new user to our website whose data is not registered?
            checkUserExists("userdata", accounts[0]);
            console.log("welcome to my community");
          }
        }
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install my MetaMask");
      Metamask();
    }
  };
  async function handleSubmit() {
    const { data, error } = await supabase.from("userdata").insert({
      wallet_id: wallet,
    });
    if (error) {
      console.log("Error uploading file:", error.message);
    } else {
      await window.localStorage.setItem("data", JSON.stringify(data));
      console.log("File uploaded successfully:", data);
      router.push("/YourSpace");
    }
  }
  async function handleclick() {
    await connectWallet();
    try {
      // setEthereum("visible");
    } catch (e) {
      console.log(e);
    }
  }
  console.log(Username);
  const [InstallMeta, setMetamask] = useState(false);
  function Metamask() {
    setMetamask(!InstallMeta);
  }
  async function onOkClick() {
    // to be put username unique check,right now considering that everyone has unique name because of hurry

    const { data, error } = await supabase
      .from("userdata")
      .select("name")
      .eq("name", Username);

    if (error) {
      console.error("Error checking unique name existence:", error);

      return;
    }
    // console.log("data->",data);
    if (data.length > 0) {
      alert("username already exist try another one");
      return;
    }

    setUsernamePopUp(false);
    let arr = [props.communityId];
    const { data: new_data, error: new_error } = await supabase
      .from("userdata")
      .insert({
        wallet_id: wallet,
        name: Username,
        communities: arr,
      });
    if (new_error) {
      console.log("erorr in inserting the data of username", new_error);
    } else {
      console.log("username succesfully inserted in our db now redirecting..");

      // have to update in community data table too.
      let member_data;
      const { data: communityData, error } = await supabase
        .from("community_data")
        .select("Members")
        .eq("id", Number(props.communityId));

      if (error) {
        console.log("error in uodating community while new user data", error);
      } else {
        console.log(
          "data of community tabel on the basis of new user->",
          communityData
        );
      }
      if (communityData != null) member_data = communityData[0].Members;

      if (member_data == null || member_data == undefined) {
        member_data = [
          {
            User_name: Username,
            user_wallet_id: wallet,
            date_of_join: new Date(),
            missions_completed: [],
            current_xp: 0,
            current_bounty: 0,
          },
        ];
      } else {
        member_data.push({
          User_name: Username,
          user_wallet_id: wallet,
          date_of_join: new Date(),
          missions_completed: [],
          current_xp: 0,
          current_bounty: 0,
        });
      }
      const { data: new_data2, error: new_error2 } = await supabase
        .from("community_data")
        .update({
          Members: member_data,
        })
        .eq("id", Number(props.communityId));
      if (new_error2) {
        console.log(
          "erorr in updagting members data in community data when a user is a new user",
          new_error
        );
      } else {
        console.log("updated in community table for new member");
      }
      if (window !== undefined) {
        await window.localStorage.setItem("community_id", props.communityId);
        await window.localStorage.setItem("user_wallet_id", wallet_id2);
        router.push("/YourSpace");
      }
    }
  }

  return (
    <>
      <Modal
        onClose={() => {
          setMetamask(!InstallMeta);
        }}
        open={InstallMeta}
        style={{}}
      >
        <div>
          <InstallMetamaskPopup />
        </div>
      </Modal>

      <Modal
        onClose={() => {
          setUsernamePopUp(!UsernamePopUp);
        }}
        open={UsernamePopUp}
        style={{}}
      >
        {/* // This is popup which will pop when use not signed up,comes at community Invite
        // Only Storing Wallet id and Name at the moment
        // Pending-Email,Avatar */}
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-260">
            <div className="flex items-center mb-4">
              <Image alt="" src="/Icons/RedFire.svg" width={25} height={25} />
              <h2 className="text-xl font-bold">Welcome to the community</h2>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="name" className="text-sm">
                Enter Name
              </label>
              <input
                className="w-full h-10 bg-[#2E363F] rounded-lg text-white px-4"
                placeholder="Name"
                type="text"
                value={Username}
                onChange={(e) => setUsesrname(e.target.value)}
              />
              <label htmlFor="email" className="text-sm">
                Enter Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full h-10 bg-[#2E363F] rounded-lg text-white px-4"
                placeholder="Email"
              />
              <button
                // ok==continue
                onClick={onOkClick}
                className="bg-[#FE702A] text-white rounded-lg py-2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="absolute top-[30vh] left-[30vw] ml-[23px] w-[598px] h-auto bg-[#232B35] rounded-[15.4264px] p-6">
        <div className="w-full h-auto">
          <h1 className="font-semibold text-white text-[18px] leading-[24px]">
            Verification
          </h1>
          <p className="font-normal text-sm text-[#D9D9D9] mt-[10.09px] mb-[21.56px]">
            Complete the below steps to get verified
          </p>
          <div className="w-full h-0 border-[0.771319px] border-[#454545] mb-[28.93px]"></div>

          {UserCard.map((card, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center mb-[35.75px]"
            >
              <div className="flex gap-[31.5px] items-center justify-center">
                <div className="w-[19.5px] h-[19.5px] border-[0.848604px] border-white rounded-full box-border flex justify-center items-center">
                  {verified[index] ? (
                    <div className="w-[13.65px] h-[13.65px] bg-white rounded-full flex justify-center items-center">
                      <Image
                        src="Icons/tick.svg"
                        alt=""
                        height={6.83}
                        width={6.83}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <h1 className="font-medium text-[18px] text-white leading-[24px] font-open-sans">
                  {card.title}
                </h1>
              </div>
              <button
                className={`border-[0.713229px] ${
                  card.button === "Connected" ? "bg-[white]" : " "
                } border-[#929292] rounded-[7.13229px] px-[23.88px] py-[9.31px]  text-[14.2646px] text-[#FE702A] font-medium`}
                onClick={handleclick}
              >
                {card.button}
              </button>
            </div>
          ))}

          {/* <div className="w-full flex justify-between items-center mb-[35.75px]">
            <div className="flex gap-[31.5px] items-center justify-center">
              <div className="w-[19.5px] h-[19.5px] border-[0.848604px] border-white rounded-full box-border flex justify-center items-center">
                {email ? (
                  <div className="w-[13.65px] h-[13.65px] bg-white rounded-full flex justify-center items-center">
                    <Image
                      src="Icons/tick.svg"
                      alt=""
                      height={6.83}
                      width={6.83}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <h1 className="font-medium text-[18px] text-white leading-[24px] font-open-sans">
                Please provide your email ID
              </h1>
            </div>
          </div> */}
          {/* <div className="ml-[50px] bg-[#202127] text-[#8A8A8A] rounded-[6.35055px] w-[499.63px] overflow-hidden ">
            <input
              className=" w-full h-full outline-none overflow-hidden text-ellipsis px-[15.22px] py-[14.14px] bg-inherit"
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> */}
          {/* <div className="mt-[35.42px] w-full flex justify-end">
            <button
              onClick={handleSubmit}
              className="w-[116.41px] h-[38.44px] bg-gradient-to-r from-[#FD241C] to-[#FE702A] flex justify-center items-center text-white text-[15.769px] font-medium leading-[21px] rounded-[7.16772px]"
            >
              Submit
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserAuthCard;
