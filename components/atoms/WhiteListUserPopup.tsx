import { supabase } from "@/utils/supabaseClient";
import router from "next/router";
import React from "react";

const WhiteListUserPopup = (props: any) => {
  const handleVerification = async () => {
    try {
      const { data, error } = await supabase
        .from("whiteListUsers")
        .update({ isWhiteListed: true })
        .eq("wallet_id", props.wallet_id);
    } catch (error) {
      console.log(error);
    }

    location.reload();
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-[#232B35] h-10 flex justify-center items-center w-[485px] shadow-[6px,6px,20px,rgba(15,15,15,0.26)]">
        <div className="flex gap-5 items-center justify-center">
          <h1>Click on CheckBox to verify</h1>
          <button
            className="btn-primary py-1 px-3 rounded-sm"
            onClick={() => {
              handleVerification();
            }}
          >
            VERIFY
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhiteListUserPopup;
