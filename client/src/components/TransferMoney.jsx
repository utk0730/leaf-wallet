import React, { forwardRef } from "react";
import TransactionForm from "./TransactionForm";
export default forwardRef(function TransferMoney(props, ref) {
  return (
    <div ref={ref} className="mx-20 mt-40 mb-20 flex">
      <TransactionForm />
    </div>
  );
});
