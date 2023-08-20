import React, { useState } from "react";
import { signInWithEmail } from "../utils/authentication/passwordLessAuth";

export default function MagicLinkPopup() {
  const [email, setEmail] = useState("");
  const [signInStatus, setSignInStatus] = useState("");

  async function handleSignIn() {
    const redirectTo = "http://localhost:3000//WelcomeScreen1";
    const status = await signInWithEmail(email, redirectTo);
    setSignInStatus(status);
  }

  return (
    
      <div className="flex absolute left-[45vw] top-[50vh] ">
        
        {/* <span className=" sm:inline-block sm:align-middle " aria-hidden="true">&#8203;</span> */}

        <div className="  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden w-[500px] ">
          <div>
            <h1 className="text-4xl font-bold text-center mb-4">
              Sign in with your email address
            </h1>
            <div className="mb-4">
              <input
                className="px-4 py-2 border border-gray-400 rounded-md w-full max-w-xs"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 text-gray-800 bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          </div>
          <p className="text-center mt-4">{signInStatus}</p>
        </div>
      </div>
    
  );
}
