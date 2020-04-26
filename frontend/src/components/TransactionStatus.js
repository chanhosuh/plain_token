import React from "react";
import "./TransactionStatus.sass";

const TransactionStatus = props => {
  let messageColor;
  if (props.messageType === "success") messageColor = "green";
  else if (props.messageType === "fail") messageColor = "red";
  else messageColor = "yellow";

  return (
    <div className="transaction-status" style={{ color: messageColor }}>
      <h3>{props.message}</h3>
    </div>
  );
};

export default TransactionStatus;
