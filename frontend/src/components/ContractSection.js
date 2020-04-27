import React from "react";
import Section from "./Section";
import styles from "./ContractSession.module.sass";

const ContractSection = ({ name, symbol, decimals, totalSupply }) => {
  console.debug("Total supply:", totalSupply);
  console.debug("decimals:", decimals);
  const supply = parseInt(totalSupply) / 10 ** parseInt(decimals);

  return (
    <Section className={styles.section_contract}>
      <div className={styles.section_contract_desc}>
        <div>
          <h1 className={styles.title_outlined}>ERC 20 </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        ></div>
      </div>
      <div className={styles.section_contract_info}>
        <h2>
          <center>
            {name} ({symbol})
          </center>
        </h2>
        <p>
          Total supply: {supply} {symbol}
        </p>
      </div>
    </Section>
  );
};

export default ContractSection;
