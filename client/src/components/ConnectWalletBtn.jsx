import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

function ConnectWalletButton() {
  const { connectWallet, connectedAccount } =
    useContext(TransactionContext) || {};
  // console.log("buttonn  connectedAccount --->", connectedAccount);
  return (
    <button
      className={`bg-blue-800 text-white p-2 rounded font-semiBold`}
      onClick={!connectedAccount ? connectWallet : null}
      disabled={connectedAccount}
    >
      {connectedAccount ? `${connectedAccount}` : " Connect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
