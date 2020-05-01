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

const SectionWrapper = ({ children }) => {
  return (
    <Section id="user" className="section--user">
      {children}
    </Section>
  );
};

const UserSection = ({
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
          <SubItem>{tokenBalance} PLT</SubItem>
        </Item>
        <Item>
          <SubItem>Faucet balance: </SubItem>
          <SubItem>{faucetBalance} PLT</SubItem>
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
          <SubItem>{tokenBalance} PLT</SubItem>
        </Item>
        <Item>
          <ControlButton onClick={onGetTokenClick}>Send me PLT!</ControlButton>
        </Item>
        {children}
      </SectionWrapper>
    );
  }
};

export default UserSection;
