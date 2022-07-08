import React, { useContext } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import ConnectWallet from "./ConnectWalletBtn";
import { TransactionContext } from "../context/TransactionContext";
function HeroSection({ handleSendMoney }) {
  const { connectedAccount } = useContext(TransactionContext);
  return (
    <div className="mx-20 text-white max-h-[calc(100vh-80px)] min-h-fit">
      <div className="flex flex-col items-center ">
        <h4
          className="pt-10 text-4xl font-bold "
          style={{
            background:
              "linear-gradient(91.22deg,#00dd9b 1.16%,#905bec 96.08%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="flex items-center">
            Seamless blazing fast transactions
            <AiFillThunderbolt />
          </span>
        </h4>
        <span className="pt-2 pb-10 text-2xl">
          Transfer <SiEthereum className="inline" /> across the globe at minimun
          transaction fees and fast success rate.
        </span>
      </div>
      <div className="flex justify-between">
        <div className=" w-1/2 flex flex-wrap rounded text-center">
          <div className="w-1/3 p-6 border-t border-l border-r border-gray-100 rounded-tl flex justify-center items-center">
            Secure
          </div>
          <div className="w-1/3 p-6 border-t  border-gray-100  flex justify-center items-center">
            Blockchain
          </div>
          <div className="w-1/3 p-6 border-t border-r border-l border-gray-100 rounded-tr flex justify-center items-center">
            Web3.0
          </div>
          <div className="w-1/3 p-6 border-l border-t  border-b  border-gray-100 rounded-bl flex justify-center items-center ">
            Security
          </div>
          <div className="w-1/3 p-6 border-l border-t  border-b  border-gray-100 flex justify-center items-center ">
            Low transaction fees
          </div>
          <div className="w-1/3 p-6 border-l border-t  border-r border-b  border-gray-100 rounded-br flex justify-center items-center ">
            Reliable
          </div>
        </div>

        <div
          className=" py-4 px-2 w-1/4 h-60 rounded shadow-lg relative"
          style={{
            background:
              "linear-gradient(91.22deg, rgb(0, 221, 155) 1.16%, rgb(95 103 161) 96.08%)",
          }}
        >
          <div className="absolute bottom-10 left-4 w-11/12">
            {connectedAccount ? (
              <>
                <p className="text-lg text-gray-700">Account address</p>
                <p className="truncate ...">{connectedAccount}</p>
              </>
            ) : (
              <ConnectWallet customCss="bg-gray-200 text-black border border-gray-100 w-full uppercase font-bold text-sm" />
            )}
          </div>

          <SiEthereum size="40px" className="absolute top-4 left-4" />
        </div>
      </div>
      {connectedAccount ? (
        <button
          onClick={handleSendMoney}
          className="p-4 mt-10 border border-gray-100 rounded w-1/4 bg-green-main"
        >
          Send Ether
        </button>
      ) : (
        <ConnectWallet customCss="p-4 mt-10 border border-gray-100 rounded w-1/4 bg-green-main" />
      )}
    </div>
  );
}

export default HeroSection;
