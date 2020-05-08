import React, { useState, useEffect } from "react";
import "./App.sass";
import { useWeb3Context } from "../utils/web3";
import { toBN } from "web3-utils";
import getContract from "../utils/contract";
import { Header, HeaderItem } from "./Header";
import tokenArtifact from "../contracts/PlainToken";
import faucetArtifact from "../contracts/Faucet";
import UserSection from "./UserSection";
import TransactionStatus from "./TransactionStatus";
import ContractSection from "./ContractSection";

const checkIsOwner = async (token, account, setIsOwner) => {
  const ownerAddress = await token.methods.owner().call();
  const isTokenOwner = ownerAddress.toLowerCase() === account.toLowerCase();
  console.debug("is token owner: ", isTokenOwner);
  setIsOwner(isTokenOwner);
};

const resetToken = async (
  web3,
  account,
  setToken,
  setFaucet,
  setTokenDetails,
  setIsOwner,
  setIsFaucetOn
) => {
  if (!web3) return;

  const token = await getContract(tokenArtifact, web3);
  const faucet = await getContract(faucetArtifact, web3);
  setToken(token);
  setFaucet(faucet);

  await updateTokenInfo(token, setTokenDetails);

  await checkIsOwner(token, account, setIsOwner);

  const isOn = await faucet.methods.turnedOn().call();
  setIsFaucetOn(isOn);
  console.debug("Faucet status:", isOn);
};

const setEventListeners = async (account, token, faucet, setBalances) => {
  if (!token) return;

  console.debug("Setting event listeners...");

  token.events
    .Transfer({
      filter: { to: account },
    })
    .on("data", async function(event) {
      console.debug("Transfer to account:", account);
      await updateBalances(account, token, faucet, setBalances);
    })
    .on("error", console.error);

  token.events
    .Transfer({
      filter: { from: account },
    })
    .on("data", async function(event) {
      console.debug("Transfer from account:", account);
      await updateBalances(account, token, faucet, setBalances);
    })
    .on("error", console.error);

  await updateBalances(account, token, faucet, setBalances);
};

const updateTokenInfo = async (token, setTokenDetails) => {
  const name = await token.methods.name().call();
  const symbol = await token.methods.symbol().call();
  const decimals = await token.methods.decimals().call();

  const totalSupply = toBN(await token.methods.totalSupply().call()).toString();

  setTokenDetails({ name, symbol, decimals, totalSupply });
};

const updateBalances = async (account, token, faucet, setBalances) => {
  if (!token || !faucet) return;

  let accountBalance;
  try {
    accountBalance = await token.methods.balanceOf(account).call();
  } catch (err) {
    console.log("Could not retrieve account balance");
    console.debug(err);
    accountBalance = 0;
  }
  accountBalance = toBN(accountBalance).toString();

  let faucetBalance;
  try {
    faucetBalance = await token.methods
      .balanceOf(faucet.options.address)
      .call();
  } catch (err) {
    console.log("Could not retrieve faucet balance");
    console.debug(err);
    faucetBalance = 0;
  }
  faucetBalance = toBN(faucetBalance).toString();

  setBalances({ account: accountBalance, faucet: faucetBalance });
  console.debug(`updated token balance: ${accountBalance} `);
  console.debug(`updated faucet balance: ${faucetBalance} `);
};

const NO_ADDRESS = "No address - check MetaMask";
const NO_NETWORK = "No network - check MetaMask";

const App = () => {
  const [token, setToken] = useState(null);
  const [faucet, setFaucet] = useState(null);
  const [isFaucetOn, setIsFaucetOn] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    symbol: "",
    decimals: "",
    totalSupply: "",
  });
  const [balances, setBalances] = useState({
    account: "0",
    faucet: "0",
  });
  const [transactionStatus, setTransactionStatus] = useState({
    message: "",
    type: "",
  });
  const [isOwner, setIsOwner] = useState(false);
  const { web3, account, network } = useWeb3Context();

  useEffect(() => {
    if (account === NO_ADDRESS || network === NO_NETWORK || !web3) return;
    resetToken(
      web3,
      account,
      setToken,
      setFaucet,
      setTokenDetails,
      setIsOwner,
      setIsFaucetOn
    );
  }, [web3, account, network]);

  useEffect(() => {
    if (account === NO_NETWORK || !token || !faucet) return;
    setEventListeners(account, token, faucet, setBalances);
  }, [account, token, faucet]);

  const handleGetTokenClick = async (event) => {
    event.preventDefault();

    setTransactionStatus({
      message: "Waiting on transaction status...",
      type: "wait",
    });

    await faucet.methods
      .withdraw(100)
      .send({ from: account }, handleTransactionResult);
  };

  const handleSendToFaucetClick = async (event) => {
    event.preventDefault();

    setTransactionStatus({
      message: "Waiting on transaction status...",
      type: "wait",
    });

    console.debug("faucet address: ", faucet.options.address);
    await token.methods
      .transfer(faucet.options.address, 1000)
      .send({ from: account }, handleTransactionResult);
  };

  const handleTransactionResult = (err, txHash) => {
    if (err) {
      console.debug(err);
      console.log(err.message.slice(0, 42));
      setTransactionStatus({
        message: "Transaction failed.",
        type: "fail",
      });
    } else {
      console.debug("Transaction successful, txHash: ", txHash);
      setTransactionStatus({
        message: "Transaction succeeded.",
        type: "success",
      });
    }
  };
  const handleFaucetOnOffClick = async (event) => {
    event.preventDefault();

    setTransactionStatus({
      message: "Waiting on transaction status...",
      type: "wait",
    });

    console.debug("Setting faucet status to:", !isFaucetOn);
    setIsFaucetOn(!isFaucetOn);

    if (isFaucetOn)
      await faucet.methods
        .turnOff()
        .send({ from: account }, handleTransactionResult);
    else
      await faucet.methods
        .turnOn()
        .send({ from: account }, handleTransactionResult);
  };

  return (
    <div className="container">
      <Header>
        <HeaderItem>Account: {account}</HeaderItem>
        <HeaderItem>Network: {network}</HeaderItem>
      </Header>
      <ContractSection {...tokenDetails}>
        <UserSection
          symbol={tokenDetails.symbol}
          decimals={tokenDetails.decimals}
          account={account}
          isOwner={isOwner}
          isFaucetOn={isFaucetOn}
          onFaucetOnOffClick={handleFaucetOnOffClick}
          tokenBalance={balances.account}
          faucetBalance={balances.faucet}
          onSendToFaucetClick={handleSendToFaucetClick}
          onGetTokenClick={handleGetTokenClick}
        ></UserSection>
        <TransactionStatus
          message={transactionStatus.message}
          messageType={transactionStatus.type}
        />
      </ContractSection>
      <div className="footer"></div>
    </div>
  );
};

export default App;
