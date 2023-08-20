import Image from "next/image";
import React from "react";

const HeaderFirstPage = (props:any) => {
  const bgColor = () => {
    const loginButton = document.getElementById("login");
    if (loginButton) {
      loginButton.style.background =
        "linear-gradient(180deg, #000000 -197.62%, #FE702A 1328.57%)";
    }
  };

  const removeBgColor = () => {
    const loginButton = document.getElementById("login");
    if (loginButton) {
      loginButton.style.background = "transparent";
    }
  };

  const signupBgColor = () => {
    const signupButton = document.getElementById("signup");
    if (signupButton) {
      signupButton.style.background =
        "linear-gradient(180deg, #000000 -197.62%, #FE702A 1328.57%)";
    }
  };

  const signupRemoveBgColor = () => {
    const signupButton = document.getElementById("signup");
    if (signupButton) {
      signupButton.style.background = "transparent";
    }
  };
  return (
    <div className="w-full h-[100px] px-[173px] py-[21px] backdrop-blur-[20px] border-b-2 border-[#3b3b39]">
      <div className="w-ful h-full flex justify-between items-center">
        <Image src="Icons/FIREBOND.svg" alt="" height={42.92} width={186} />

        {/* Login And Signup */}
        <div className="flex gap-4">
          <button
            id="login"
            className="login px-8 h-[58px] flex items-center justify-center rounded-[10px] hover:border-[1.5px] hover:border-[#FE702A] font-medium text-xl text-white shadow-[0px 1px 1px rgba(255,255,255,0.2)] backdrop-blur-[20px]"
            onMouseOver={() => bgColor()}
            onMouseOut={() => removeBgColor()}
            onClick={() => props.onLoginClick()}
            
          >
            Log in
          </button>
          <button
            id="signup"
            className="login px-8 h-[58px] flex items-center justify-center rounded-[10px] hover:border-[1.5px] hover:border-[#FE702A] font-medium text-xl text-white shadow-[0px 1px 1px rgba(255,255,255,0.2)] backdrop-blur-[20px]"
            onMouseOver={() => signupBgColor()}
            onMouseOut={() => signupRemoveBgColor()}
            onClick={()=>props.onSignUpClick()}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderFirstPage;
