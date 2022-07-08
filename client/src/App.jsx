import React, { useRef } from "react";
import { TransactionsProvider } from "./context/TransactionContext";
import TransferMoney from "./components/TransferMoney";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import PastTransactions from "./components/PastTransactions";
const App = () => {
  const transferMoneyRef = useRef(null);
  const handleSendMoney = () => {
    if (transferMoneyRef) {
      transferMoneyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <TransactionsProvider>
      <NavBar />
      <HeroSection handleSendMoney={handleSendMoney} />
      <TransferMoney ref={transferMoneyRef} />
      <PastTransactions />
    </TransactionsProvider>
  );
};

export default App;
