import React from "react";
import styles from "./ContractSession.module.sass";
import { displayDecimals } from "../utils/erc20";

const ContractSection = ({ name, symbol, decimals, totalSupply, children }) => {
  console.debug("Total supply:", totalSupply);
  console.debug("decimals:", decimals);
  const totalSupplyDecimals = displayDecimals(totalSupply, decimals);

  return (
    <div className={styles.section_contract}>
      <h2 className={styles.title_outlined}>
        <center>
          {name} ({symbol})
        </center>
      </h2>
      <p>
        Total supply: {totalSupplyDecimals} {symbol}
      </p>
      {children}
    </div>
  );
};

export default ContractSection;
