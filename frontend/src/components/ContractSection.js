import React from "react";
import Section from "./Section";
import styles from "./ContractSession.module.sass";

const ContractSection = ({ name, symbol, decimals, totalSupply }) => {
  console.debug("Total supply:", totalSupply);
  console.debug("decimals:", decimals);
  const supply = parseInt(totalSupply) / 10 ** parseInt(decimals);

  return (
    <Section className={styles.section_contract}>
      <h2 className={styles.title_outlined}>
        <center>
          {name} ({symbol})
        </center>
      </h2>
      <p>
        Total supply: {supply} {symbol}
      </p>
    </Section>
  );
};

export default ContractSection;
