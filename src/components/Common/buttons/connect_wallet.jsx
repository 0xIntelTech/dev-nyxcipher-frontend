import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./button.css";

const ConnectWallet = () => {
  
    return (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === "authenticated");
  
            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button className="my-auto clipButton font-[Nippo] h-[40px] text-[15px]" onClick={openConnectModal} type="button">
                        Connect Wallet
                      </button>
                    );
                  }
  
                  if (chain.unsupported) {
                    return (
                      <button className="my-auto clipButton font-[Nippo] h-[40px] text-[15px]" onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }
  
                  return (
                    <div className="flex gap-5">
                      <button className="text-gray-300 items-center gap-2 hidden lg:flex"
                        onClick={openChainModal}
                        type="button"
                      >
                        <div className="flex flex-col justify-between items-start">
                            <span className="text-[15px]">{chain.name}</span>
                            <span className="text-[15px] font-extrabold text-gray-100">{account.displayBalance
                          ? ` ${account.displayBalance}`
                          : ""}</span>
                        </div>
                      </button>
  
                      <div className="hidden lg:flex gap-2 items-center text-gray-100 font-bold" >
                        {account.displayName}
                      </div>
                      <button className="my-auto clipButton font-[Nippo] h-[40px] text-[15px]" onClick={openAccountModal} type="button">Disconnect</button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
    );
  };
  
  export default ConnectWallet;