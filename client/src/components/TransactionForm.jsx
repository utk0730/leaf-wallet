import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useGifImage from "../hooks/useGifImage";
function TransactionForm() {
  const {
    connectWallet,
    connectedAccount,
    formData,
    sendTransaction,
    handleTransactionInputChange,
    isLoading,
  } = useContext(TransactionContext);
  const { receiver, amount, message, keyword } = formData || {};
  const imgKey = "utkarsh";
  const gifImage = useGifImage({ imgKey });

  const handleTransferMoney = (e) => {
    e.preventDefault();
    if (!receiver || !amount || !keyword || !message) {
      console.log("form values not filled --->", {
        receiver,
        amount,
        message,
        keyword,
      });
      return;
    }
    sendTransaction();
  };
  return (
    <div className=" w-1/2">
      <form>
        <div className="my-2">
          <div className=" flex ">
            <p className="w-1/2">Receiver address</p>

            <input
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg"
              name="receiver"
              value={receiver}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>
        <div className="my-2">
          <div className=" flex ">
            <p className="w-1/2">Amount</p>
            <input
              type="number"
              min="0"
              step="0.0001"
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg"
              name="amount"
              value={amount}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>

        <div className="my-2">
          <div className="flex ">
            <p className="w-1/2">Message</p>
            <input
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg"
              name="message"
              value={message}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>

        <div className="my-2">
          <div className=" flex ">
            <p className="w-1/2">Keywords</p>
            <input
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg"
              name="keyword"
              value={keyword}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>
        <button
          className={`bg-blue-800 text-white p-2 rounded font-semiBold`}
          onClick={handleTransferMoney}
        >
          Transfer now
        </button>
      </form>
      {isLoading && "Processing transaction....."}
    </div>
  );
}

export default TransactionForm;
