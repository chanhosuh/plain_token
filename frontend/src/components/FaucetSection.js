import React from "react";
import styles from "./UserSection.module.sass";
import ControlButton from "./ControlButton";
import { displayDecimals } from "../utils/erc20";

const Item = (props) => {
  return <div className={styles.section_user_item}>{props.children}</div>;
};

const SubItem = (props) => {
  return <div className={styles.section_user_subitem}>{props.children}</div>;
};

const Title = (props) => {
  return <div className={styles.section_user_title}>{props.children}</div>;
};

const SectionWrapper = ({ children }) => {
  return <div className={styles.section_user}>{children}</div>;
};

const FaucetSection = ({
  symbol,
  decimals,
  isOwner,
  isFaucetOn,
  faucetBalance,
  onSendToFaucetClick,
  onFaucetOnOffClick,
  children,
}) => {
  const faucetBalanceDecimals = displayDecimals(faucetBalance, decimals);

  return (
    <SectionWrapper>
      <Title>
        <h2>Faucet</h2>
      </Title>
      <Item>
        <SubItem>Balance: </SubItem>
        <SubItem>
          {faucetBalanceDecimals} {symbol}
        </SubItem>
      </Item>
      {isOwner && (
        <div>
          <Title>
            <h3>Controls</h3>
          </Title>
          <ControlButton onClick={onSendToFaucetClick}>
            Send to faucet
          </ControlButton>
          <ControlButton onClick={onFaucetOnOffClick}>
            Turn faucet {isFaucetOn ? "off" : "on"}
          </ControlButton>
        </div>
      )}
      {children}
    </SectionWrapper>
  );
};

export default FaucetSection;
