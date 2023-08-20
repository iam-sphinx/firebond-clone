import React, { useState } from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/atoms/Header";
import { BsTrash } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import Image from "next/image";
import VerficationCard from "@/components/molecules/VerificationCard";
import Modal from "@material-ui/core/Modal";
import IntegrationSelectFormBuilder from "@/components/molecules/IntegrationSelectFormBuilder";
import CopyLinkPopUpFormBuilder from "@/components/molecules/CopyLinkPopUpFormBuilder";
import RouteGuardAdmin from "@/utils/RouteGuardAdmin";

const Form_Builder_Info = () => {
  const cards = [
    {
      key: 1,
      title: "Info",
      div: (
        <div className="w-full mt-[16.24px]">
          <div className="h-full w-full">
            <div className="flex gap-[83px] items-center mb-[19px]">
              <h1 className="font-normal text-base text-[#A6A6A6]">Profile</h1>
              <div className="h-[53px] w-[53px] bg-[#171C23] border-[1.25px] border-dashed border-[#FFFFFF] rounded-full flex justify-center items-center cursor-pointer">
                <Image
                  src="Icons/photo.svg"
                  height={21.96}
                  width={21.96}
                  alt=""
                />
              </div>
            </div>

            <div className="flex gap-[97px] mb-[29px] items-center">
              <h1 className="font-normal text-base text-[#A6A6A6]">Title</h1>
              <div className="w-[296px] h-[47px] flex items-center overflow-hidden bg-[#2E363F] rounded-lg">
                <input
                  className="text-[#D0D0D0A8] font-normal text-xs w-full h-full pl-[19px] outline-none text-ellipsis bg-inherit pr-[19px]"
                  placeholder="This is a custom headline"
                ></input>
              </div>
            </div>

            <h1 className="font-normal text-base text-[#A6A6A6] mb-[7px]">
              Product Description
            </h1>
            <div className="w-[429px] h-[98px] bg-[#2E363F] overflow-hidden text-ellipsis rounded-lg px-4 py-[7px]">
              <textarea
                className="w-full max-h-full outline-none bg-inherit overflow-auto text-ellipsis placeholder:text-[#D0D0D0A8] text-white font-normal text-xs resize-none scrollbar-hide "
                placeholder="This is custom product description"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 2,
      title: "Founder Bio",
      div: (
        <div className="w-full mt-[16.24px]">
          <div className="h-full w-full">
            <div className="flex gap-[83px] items-center mb-[39px]">
              <h1 className="font-normal text-base text-[#A6A6A6] mb-[7px]">
                Thumbnail image
              </h1>
              <div className="h-[53px] w-[53px] bg-[#171C23] border-[1.25px] border-dashed border-[#FFFFFF] rounded-full flex justify-center items-center cursor-pointer">
                <Image
                  src="Icons/photo.svg"
                  height={21.96}
                  width={21.96}
                  alt=""
                />
              </div>
            </div>

            <h1 className="font-normal text-base text-[#A6A6A6]">Bio</h1>
            <div className="w-[429px] h-[98px] bg-[#2E363F] overflow-hidden text-ellipsis rounded-lg px-4 py-[7px]">
              <textarea
                className="w-full max-h-full outline-none bg-inherit overflow-auto text-ellipsis placeholder:text-[#D0D0D0A8] text-white font-normal text-xs resize-none scrollbar-hide "
                placeholder="Enter your custom bio"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 3,
      title: "Form",
      div: (
        <div className="mt-[44px] w-full">
          <div className="flex items-center gap-[14px]">
            <Image
              src="Icons/add.svg"
              height={29}
              width={29}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                setSelectIntegration(!selectIntegration);
              }}
            />
            <Image src="Icons/Line.svg" height={0} width={376} alt="" />{" "}
          </div>

          <div className="flex mt-[51px] items-center gap-[38px]">
            <h1 className="font-normal text-base text-[#A6A6A6] w-[95px]">
              Call to action
            </h1>
            <div className="w-[298px] h-[47px] bg-[#2E363F] overflow-hidden text-ellipsis rounded-lg flex items-center pl-[19px]">
              <input
                className="outline-none  bg-inherit text-[#757575] font-normal text-sm"
                placeholder="Button text Eg: Submit"
              ></input>
            </div>
          </div>

          <div className="mt-[28px] w-full flex justify-center items-center">
            <div className="flex gap-[9px] items-center justify-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-[#A6A6A6]  cursor-pointer"
              />
              <h1 className="font-normal text-sm text-[#757575]">
                Require ReCAPTCHA
              </h1>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 4,
      title: "Style",
      colorArray: [
        { title: "Background" },
        { title: "Title" },
        { title: "Discription" },
      ],
    },
    {
      key: 5,
      title: "Success message",
      div: (
        <div className="w-full mt-[36px]">
          <div className="w-[425px] flex justify-between items-center">
            <h1>Message</h1>
            <div className="h-[47px] w-[296px] bg-[#2E363F] flex justify-center items-center overflow-hidden text-ellipsis pl-[19px] rounded-lg">
              <input
                placeholder="Write success message"
                className="w-full bg-inherit outline-none text-xs text-[#D0D0D0A8]"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];
  //for integration account pop up
  const [selectIntegration, setSelectIntegration] = useState(false);
  //for unique link pop up
  const [uniqueLink, setuniqueLink] = useState(false);
  const [on, setOn] = useState(cards.map(() => false));
  const [colors, setColors] = useState(["#FFFFFF", "#FFFFFF", "#FFFFFF"]);

  return (
    <>
      <Modal
        onClose={() => {
          setSelectIntegration(!selectIntegration);
        }}
        open={selectIntegration}
        style={{}}
      >
        <div className="absolute m-[auto] top-[30vh] left-[40vw]">
          <IntegrationSelectFormBuilder />
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setuniqueLink(!uniqueLink);
        }}
        open={uniqueLink}
        style={{}}
      >
        <div className="flex justify-center items-center">
          <div className="absolute m-[auto] top-[30vh]">
            <CopyLinkPopUpFormBuilder
              url="https://firebond.com/firebondhandle/23458394849"
              forWhichComponent="form"
            />
          </div>
        </div>
      </Modal>

      <div className="h-screen min-w-fit bg-[#171C23] flex">
        <Sidebar />

        {/* Main Section */}
        <div className="w-full h-full overflow-auto scrollbar-hide ">
          <Header />

          {/* Centeral Section */}
          <div className="flex-[1]">
            {/* Navbar */}
            <div className="h-auto sticky top-[80px] bg-[#171C23] z-10  pt-[29px]">
              <div className="w-full px-6 mb-2">
                <h1 className="text-white font-semibold text-2xl">
                  Form builder
                </h1>
              </div>
              <div className="w-full h-[46px] border-b border-[#353B43] pl-6 pb-6 pr-[34px]">
                <div className="w-full h-full flex justify-between">
                  <h1 className="font-normal text-base text-[#A6A6A6]">
                    Create form to invite members
                  </h1>
                  <div className="flex gap-[10px]">
                    <button className="h-[33px] px-[15px] flex justify-center items-center rounded-lg border hover:border-[#C32F14] border-[#757575] group">
                      <BsTrash
                        size={15}
                        className="group-hover:text-[#C32F14]"
                      />
                    </button>
                    <button className="h-[33px] pl-[18px] pr-[23px] flex justify-center items-center rounded-lg border hover:border-[#C32F14] border-[#757575] group">
                      <div className="h-full w-full flex justify-center items-center gap-[10px] ">
                        <BiSave
                          size={15}
                          className="group-hover:text-[#C32F14] text-[#757575] "
                        />
                        <h1 className="group-hover:text-[#C32F14] font-medium text-sm text-[#757575]">
                          Saved!
                        </h1>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setuniqueLink(!uniqueLink);
                      }}
                      className="h-[33px] flex justify-center items-center rounded-lg pl-[17px] pr-[19px] border hover:border-[#C32F14] border-[#FFFFFF] group"
                    >
                      <div className="h-full w-full flex justify-center items-center gap-[11px]">
                        <HiOutlineRocketLaunch
                          size={14}
                          className="group-hover:text-[#C32F14] text-white"
                        />
                        <h1 className="group-hover:text-[#C32F14] font-medium text-sm text-white">
                          Publish
                        </h1>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Centeral Section */}
            <div className="min-h-screen w-full flex justify-between">
              {/* Left Section */}
              <div className="w-full flex justify-center mt-6">
                <div>
                  {cards.map((card, index) => (
                    <div
                      key={card.key}
                      className="w-[500px] h-auto pl-[36px] pr-[39px] pt-[17px] pb-4 rounded-[10px] bg-[#232B35] shadow-[1px,1px,18px,rgba(0,0,0,0.02)] mb-4 relative"
                    >
                      <div className="h-full w-full flex justify-between items-center">
                        <h1 className="text-white font-normal text-[20px] leading-[27px]">
                          {card.title}
                        </h1>
                        <div
                          className="h-5 w-5 rounded-full flex justify-center items-center border border-[#757575] cursor-pointer overflow-hidden"
                          onClick={() => {
                            const newOnState = [...on];
                            newOnState[index] = !on[index];
                            setOn(newOnState);
                          }}
                        >
                          <div
                            className={`h-4 w-4 ${
                              on[index] ? "bg-white" : "bg-inherit"
                            } rounded-full overflow-hidden`}
                          ></div>
                        </div>
                      </div>
                      {on[index] ? (
                        <div className="pt-4">
                          <div className="absolute h-0 w-[500px] top-[66.76] left-0 border-[0.5px] border-[#474C52]"></div>
                          {index === 3 ? (
                            <div className="w-full mt-[31px]">
                              {card.colorArray?.map((item, index) => (
                                <div
                                  key={index}
                                  className="mb-[38px] flex w-[171px] justify-between"
                                >
                                  <h1 className="font-normal text-base text-[#A6A6A6]">
                                    {item.title}
                                  </h1>
                                  <div
                                    className={`h-5 w-5 rounded-full overflow-hidden`}
                                    style={{ backgroundColor: colors[index] }}
                                  >
                                    <input
                                      type="color"
                                      value={colors[index]}
                                      className=" w-full h-full opacity-0"
                                      onChange={(e) => {
                                        let newColors = [...colors];
                                        newColors[index] = e.target.value;
                                        setColors(newColors);
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            card.div
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className=" w-full border-l border-[#474C52] flex justify-center pl-6 pr-[34px] pt-6 pb-6">
                <div>
                  <div className="w-[631px] h-[136px] rounded-[10px] relative mb-[70px]">
                    <Image
                      src="Icons/background.svg"
                      height={136}
                      width={631}
                      alt=""
                      className="object-cover rounded-[10px]"
                    />
                    <div className="h-[104px] w-[104px] flex justify-center items-center overflow-hidden border-2 border-white rounded-full absolute top-[71px] left-[25px]">
                      <Image
                        src="Icons/avatar.svg"
                        height={121}
                        width={121}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h1 className="ml-[33px] mb-5 font-semibold text-white text-[26px] leading-[35px]">
                    Welcome to Satoshi space
                  </h1>

                  <VerficationCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteGuardAdmin(Form_Builder_Info);
