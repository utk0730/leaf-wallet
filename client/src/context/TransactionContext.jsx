import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  transactionsContractAddress,
  transactionContractABI,
} from "../utils/constants";
const { ethereum } = window;

const getEthereumContract = () => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      transactionsContractAddress,
      transactionContractABI,
      signer
    );
    return { provider, signer, transactionContract };
  } catch (error) {
    console.log("get eth contracts", error);
  }
};
export const TransactionContext = React.createContext();
export const TransactionsProvider = ({ children }) => {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: "",
    keyword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [fetchingTransactionHistory, setFetchingTransactionHistory] =
    useState(false);

  const handleTransactionInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // check wallet connection
  const checkWalletIsInstalledAndConnected = async () => {
    try {
      if (!ethereum) {
        setIsWalletInstalled(false);
        console.log("Ethereum Wallet not installed");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        console.log("Metamask wallet connected 😎");
        setConnectedAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("Wallet not connected");
      }
    } catch (error) {
      throw new Error("No ethereum object found");
    }
  };

  //connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setIsWalletInstalled(false);
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        console.log("connected account log", accounts[0]);
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("No ethereum object found");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        setIsWalletInstalled(false);
        return;
      }
      const { receiver, amount, message, keyword } = formData || {};
      const parsedAmountInGwei = ethers.utils.parseEther(amount)._hex;
      const { transactionContract } = getEthereumContract();
      setIsLoading(true);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: receiver,
            gas: "0x5208", //gas fee must be atleast -> 21000 gwei (hex to decimal conversion)
            value: parsedAmountInGwei,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        receiver,
        parsedAmountInGwei,
        message,
        keyword
      );
      await transactionHash.wait();
      const tCount = await transactionContract.getTransactionCount();
      setTransactionCount(tCount.toNumber());
      setIsLoading(false);
      console.log("transaction successfull...");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      throw new Error("No ethereum object found");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const { transactionContract } = getEthereumContract();
      const tCount = await transactionContract.getTransactionCount();
      localStorage.setItem("transactionCount", tCount);
    } catch (error) {
      console.log(error);
      throw new Error("no ethereum object found");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        console.log("Please install metamask");
        return;
      }
      setFetchingTransactionHistory(true);
      const { transactionContract } = getEthereumContract();
      console.log("fetching existing transactions ....");
      const existingTransactions =
        await transactionContract.getAllTransactions();
      const formatExistingTransactions = existingTransactions.map((_t) => {
        const { receiver, sender, amount, message, keyword, timestamp } = _t;
        return {
          receiver,
          sender,
          message,
          keyword,
          amount: parseInt(amount._hex) / 10 ** 18,
          timestamp: new Date(timestamp.toNumber() * 1000).toLocaleString(),
        };
      });
      console.log("existingTransactions --->", formatExistingTransactions);
      setTransactionHistory(formatExistingTransactions);
      setFetchingTransactionHistory(false);
    } catch (error) {
      setFetchingTransactionHistory(false);
      console.log(error);
      throw new Error("no ethereum object found");
    }
  };

  useEffect(() => {
    checkWalletIsInstalledAndConnected();
    checkIfTransactionsExist();
  }, []);

  // console.log("form data context --->", formData);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        sendTransaction,
        handleTransactionInputChange,
        isLoading,
        transactionHistory,
        fetchingTransactionHistory,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
