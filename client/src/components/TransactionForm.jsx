import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import CircleDotLoader from "../assets/svgs/circular-dot-loader.svg";
const Loader = () => {
  return (
    <div className="w-full h-full opacity-50 absolute top-0 left-0 z-10 flex flex-col justify-center items-center bg-white">
      <img src={CircleDotLoader} />
    </div>
  );
};
function TransactionForm() {
  const {
    connectWallet,
    connectedAccount,
    formData,
    sendTransaction,
    handleTransactionInputChange,
    isLoading,
    transactionHistory,
    fetchingTransactionHistory,
  } = useContext(TransactionContext);
  const { receiver, amount, message, keyword } = formData || {};

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
    <div className="w-full">
      <form className="w-9/12 px-6 py-10 border border-gray-100 rounded bg-[#3f3e7b] m-auto relative">
        {receiver && (
          <p className="absolute right-2 top-2 text-white">
            Verify receiver's address :
            <span className="bg-green-main text-white rounded-lg ml-2 p-1 text-center">
              {receiver.slice(0, 6)}
            </span>
            {"......"}
            <span className="bg-green-main text-white p-1 text-center rounded-lg ">
              {receiver.slice(receiver.length - 4, receiver.length)}
            </span>
          </p>
        )}
        <div className="my-4">
          <div className="flex ">
            <p className="md:w-1/2 text-white">Receiver address</p>
            <input
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg text-black"
              name="receiver"
              value={receiver}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>
        <div className="my-4">
          <div className=" flex ">
            <p className="w-1/2 text-white">Amount</p>
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

        <div className="my-4">
          <div className="flex ">
            <p className="w-1/2 text-white">Message</p>
            <input
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg"
              name="message"
              value={message}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>

        <div className="my-4">
          <div className=" flex ">
            <p className="w-1/2 text-white">Keywords</p>
            <input
              className="w-full h-8 ml-2 rounded border border-gray-200 shadow-lg"
              name="keyword"
              value={keyword}
              onChange={handleTransactionInputChange}
            />
          </div>
        </div>
        <button
          className={`text-white  p-2 rounded font-semiBold block m-auto mt-6 border border-gray-100 ${
            !connectedAccount && "cursor-not-allowed"
          } `}
          onClick={handleTransferMoney}
          disabled={!connectedAccount}
        >
          Transfer now
        </button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
}

export default TransactionForm;
