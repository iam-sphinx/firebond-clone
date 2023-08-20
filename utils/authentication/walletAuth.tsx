// Hacky solution

import React, { useState } from "react";
import Web3 from "web3";
import { useRouter } from "next/router";

// Define the state interface
interface walletState {
  isConnected: boolean;
}

function WalletAuth() {
  const router = useRouter();
  // Initialize the state with default values
  const [state, setState] = useState<walletState>({
    isConnected: false,
  });

  // Detect the current Ethereum provider (e.g., Metamask)
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  // Handle the "Connect" button click event
  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        // Request the user's Ethereum accounts
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];

        // Update the state to show that the user is connected
        setState({ isConnected: true });
        // Redirect to the welcome screen after a short delay
        setTimeout(() => {
          router.push("/WelcomeScreen1");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return onConnect;
}

export default WalletAuth;
