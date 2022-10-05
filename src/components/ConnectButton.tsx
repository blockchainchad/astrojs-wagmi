import React from "react";
import { ConnectKitButton } from "connectkit";
import { LoadingSpinner } from "./LoadingSpinner";

export const ConnectButton = ({ connectText = "CONNECT WALLET" }) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => {
        const address = ensName ? ensName : truncatedAddress;
        return (
          <div
            onClick={show}
            className="bg-black text-mono p-4 px-8 cursor-pointer text-white mb-0.5 text-sm tracking-widest flex justify-center text-center"
          >
            {isConnecting ? (
              <LoadingSpinner />
            ) : (
              <>{isConnected ? address : connectText}</>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
