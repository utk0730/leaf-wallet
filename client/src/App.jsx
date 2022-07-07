import React from "react";
import { TransactionsProvider } from "./context/TransactionContext";
import ConnectWalletButton from "./components/ConnectWalletBtn";
import TransactionForm from "./components/TransactionForm";
const App = () => {
  return (
    <TransactionsProvider>
      <div className="bg-purple-200 w-screen h-screen pl-10">
        <div>
          <h1 className="text-2xl font-bold">Leaf Wallet</h1>
        </div>
        <div>
          <ConnectWalletButton />
        </div>
        <div>
          <TransactionForm />
        </div>
      </div>
    </TransactionsProvider>
  );
};

export default App;
