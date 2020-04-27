import React from "react";
import Section from "./Section";
import "./UserSection.sass";
import ControlButton from "./ControlButton";

const Item = (props) => {
  return <div className="section--user-item">{props.children}</div>;
};

const UserSection = ({
  account,
  isOwner,
  tokenBalance,
  faucetBalance,
  onSendToFaucetClick,
  onGetTokenClick,
  children,
}) => {
  const SectionFragment = ({ children }) => {
    return (
      <Section id="user" className="section--user">
        {children}
      </Section>
    );
  };

  let instance;

  if (!account) {
    instance = (
      <SectionFragment>
        <h3 style={{ color: "red" }}>Please install MetaMask. </h3>
        {children}
      </SectionFragment>
    );
  } else {
    if (isOwner) {
      instance = (
        <SectionFragment>
          <h2>Controls</h2>
          <p>Account balance: {tokenBalance} PLT</p>
          <p>Faucet balance: {faucetBalance} PLT</p>
          <ControlButton onClick={onSendToFaucetClick}>
            Send to faucet
          </ControlButton>
          {children}
        </SectionFragment>
      );
    } else {
      instance = (
        <SectionFragment>
          <Item>
            <h2>Your account</h2>
          </Item>
          <Item>
            <h3>Token balance: {tokenBalance} PLT</h3>
          </Item>
          <Item>
            <h4>Ready to get some PLT?</h4>
            <ControlButton onClick={onGetTokenClick}>
              Send me PLT!
            </ControlButton>
          </Item>
          {children}
        </SectionFragment>
      );
    }
  }
  return instance;
};

export default UserSection;
