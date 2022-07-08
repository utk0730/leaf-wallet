import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useGifImage from "../hooks/useGifImage";

const TransactionCard = ({ transaction }) => {
  const { receiver, amount, message, keyword, timestamp } = transaction;
  const imgUrl = useGifImage({ keyword });
  return (
    <div className="p-6 flex flex-col w-1/3">
      <img src={imgUrl} className=" mr-10 w-[300px] h-[200px] rounded-lg" />
      <div className="text-white text-center pt-2">
        <p>Receiver : {receiver.slice(0, 10) + "....."}</p>
        <p>Amount : {amount}</p>
        <p>Message : {message}</p>
        <p>Keyword : {keyword}</p>
        <p>Time : {timestamp}</p>
      </div>
    </div>
  );
};
function PastTransactions() {
  const { transactionHistory, fetchingTransactionHistory } =
    useContext(TransactionContext);
  return (
    <div className="my-10 mx-20">
      <p className="text-4xl font-bold text-center text-white py-10">
        All Transactions
      </p>
      {!transactionHistory && <button>Past transaction</button>}
      {fetchingTransactionHistory ? (
        <p>Getting all Transaction....Please wait !</p>
      ) : (
        <div className="flex flex-wrap">
          {transactionHistory.map((transaction, idx) => {
            return <TransactionCard key={idx} transaction={transaction} />;
          })}
        </div>
      )}
    </div>
  );
}

export default PastTransactions;
