import React from "react";
import styles from "./UserSection.module.sass";
import ControlButton from "./ControlButton";

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

const UserSection = ({
  symbol,
  account,
  isOwner,
  isFaucetOn,
  tokenBalance,
  faucetBalance,
  onSendToFaucetClick,
  onGetTokenClick,
  onFaucetOnOffClick,
  children,
}) => {
  if (!account) {
    return (
      <SectionWrapper>
        <h3 style={{ color: "red" }}>Please install MetaMask. </h3>
        {children}
      </SectionWrapper>
    );
  }

  if (isOwner) {
    return (
      <SectionWrapper>
        <Title>
          <h2>Controls</h2>
        </Title>
        <Item>
          <SubItem>Account balance: </SubItem>
          <SubItem>
            {tokenBalance} {symbol}
          </SubItem>
        </Item>
        <Item>
          <SubItem>Faucet balance: </SubItem>
          <SubItem>
            {faucetBalance} {symbol}
          </SubItem>
        </Item>
        <ControlButton onClick={onSendToFaucetClick}>
          Send to faucet
        </ControlButton>
        <ControlButton onClick={onFaucetOnOffClick}>
          Turn faucet {isFaucetOn ? "off" : "on"}
        </ControlButton>
        {children}
      </SectionWrapper>
    );
  } else {
    return (
      <SectionWrapper>
        <Title>
          <h2>Your account</h2>
        </Title>
        <Item>
          <SubItem>Token balance:</SubItem>
          <SubItem>
            {tokenBalance} {symbol}
          </SubItem>
        </Item>
        <Item>
          <ControlButton onClick={onGetTokenClick}>
            Send me {symbol}!
          </ControlButton>
        </Item>
        {children}
      </SectionWrapper>
    );
  }
};

export default UserSection;
