import Image from "next/image";
import router from "next/router";
import React, { useState } from "react";

const verificationCard = [
  {
    title: "Connect your wallet",
    button: "Connect",
  },
  {
    title: "Connect your Twitter",
    button: "Connect",
  },
  {
    title: "Connect your Discord",
    button: "Connect",
  },
];

const VerficationCard = () => {
  const [verified, setVerified] = useState(verificationCard.map(() => false));
  const [email, setEmail] = useState("");

  return (
    <div className="ml-[23px] w-[598px] h-auto bg-[#232B35] rounded-[15.4264px] p-6">
      <div className="w-full h-auto">
        <h1 className="font-semibold text-white text-[18px] leading-[24px]">
          Verification
        </h1>
        <p className="font-normal text-sm text-[#D9D9D9] mt-[10.09px] mb-[21.56px]">
          Complete the below steps to get verified
        </p>
        <div className="w-full h-0 border-[0.771319px] border-[#454545] mb-[28.93px]"></div>

        {verificationCard.map((card, index) => (
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
              className="border-[0.713229px] border-[#929292] rounded-[7.13229px] px-[23.88px] py-[9.31px] text-[14.2646px] text-[#FE702A] font-medium"
              onClick={() => {
                const newVerifiedState = [...verified];
                newVerifiedState[index] = !verified[index];
                setVerified(newVerifiedState);
              }}
            >
              {card.button}
            </button>
          </div>
        ))}

        <div className="w-full flex justify-between items-center mb-[35.75px]">
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
        </div>
        <div className="ml-[50px] bg-[#202127] text-[#8A8A8A] rounded-[6.35055px] w-[499.63px] overflow-hidden ">
          <input
            className=" w-full h-full outline-none overflow-hidden text-ellipsis px-[15.22px] py-[14.14px] bg-inherit"
            placeholder="enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-[35.42px] w-full flex justify-end">
          <button
            onClick={() => router.push("/YourSpace")}
            className="w-[116.41px] h-[38.44px] bg-gradient-to-r from-[#FD241C] to-[#FE702A] flex justify-center items-center text-white text-[15.769px] font-medium leading-[21px] rounded-[7.16772px]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerficationCard;
