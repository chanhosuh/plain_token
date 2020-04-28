import React from "react";
import Section from "./Section";
import "./UserSection.sass";
import ControlButton from "./ControlButton";

const Item = (props) => {
  return <div className="section--user-item">{props.children}</div>;
};

const SubItem = (props) => {
  return <div className="section--user-subitem">{props.children}</div>;
};

const Title = (props) => {
  return <div className="section--user-title">{props.children}</div>;
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
          <Title>
            <h2>Controls</h2>
          </Title>
          <Item>
            <SubItem>Account balance: </SubItem>
            <SubItem>{tokenBalance} PLT</SubItem>
          </Item>
          <Item>
            <SubItem>Faucet balance: </SubItem>
            <SubItem>{faucetBalance} PLT</SubItem>
          </Item>
          <ControlButton onClick={onSendToFaucetClick}>
            Send to faucet
          </ControlButton>
          {children}
        </SectionFragment>
      );
    } else {
      instance = (
        <SectionFragment>
          <Title>
            <h2>Your account</h2>
          </Title>
          <Item>
            <SubItem>Token balance:</SubItem>
            <SubItem>{tokenBalance} PLT</SubItem>
          </Item>
          <Item>
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
