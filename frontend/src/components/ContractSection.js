import React from "react";
import styles from "./ContractSession.module.sass";

const ContractSection = ({ name, symbol, decimals, totalSupply, children }) => {
  console.debug("Total supply:", totalSupply);
  console.debug("decimals:", decimals);
  const supply = parseInt(totalSupply) / 10 ** parseInt(decimals);

  return (
    <div className={styles.section_contract}>
      <h2 className={styles.title_outlined}>
        <center>
          {name} ({symbol})
        </center>
      </h2>
      <p>
        Total supply: {supply} {symbol}
      </p>
      {children}
    </div>
  );
};

export default ContractSection;
