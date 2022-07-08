import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useCopyToClipboard from "../hooks/useClipboard";
import { BiCopy } from "react-icons/bi";
function ConnectWalletButton({ customCss }) {
  const { connectWallet, connectedAccount } =
    useContext(TransactionContext) || {};
  const [, copy] = useCopyToClipboard();
  return (
    <div className="flex items-center">
      <button
        className={`bg-green-main text-white p-2 rounded font-semiBold mx-2 ${customCss}`}
        onClick={!connectedAccount ? connectWallet : null}
        disabled={connectedAccount}
      >
        {connectedAccount
          ? `${connectedAccount.slice(0, 20)}.....`
          : " Connect Wallet"}
      </button>
      {connectedAccount && (
        <div>
          <BiCopy
            className="cursor-pointer"
            size="24px"
            onClick={() => copy(connectedAccount)}
          />
        </div>
      )}
    </div>
  );
}

export default ConnectWalletButton;
