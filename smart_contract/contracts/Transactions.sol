// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Transactions{
    uint transactionCount;
    struct TransactionStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    event Transfer( 
        address sender,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
        );
    
   TransactionStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount +=1;
        transactions.push(TransactionStruct(msg.sender,receiver, amount, message,block.timestamp,keyword));
        emit Transfer(msg.sender,receiver, amount, message,block.timestamp,keyword);
        

    }
    function getAllTransactions() public view returns(TransactionStruct[] memory){
        return transactions;
    }
    function getTransactionCount() public view returns(uint256 ){
        return transactionCount;
    }

}