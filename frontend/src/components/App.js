import React, { useState, useEffect } from "react";
import "./App.sass";
import initWeb3 from "../utils/web3";
import { toWei, fromWei, toBN } from "web3-utils";
import getContract from "../utils/contract";
import ContractSection from "./ContractSection";
import { Header, HeaderItem } from "./Header";
import { CHAIN_IDS } from "../utils/constants";
import tokenArtifact from "../contracts/PlainToken";
import faucetArtifact from "../contracts/Faucet";
import UserSection from "./UserSection";
import TransactionStatus from "./TransactionStatus";

import Section from "./Section";
import styles from "./ContractSession.module.sass";

const getAccounts = async (web3) => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts[0]: ", accounts[0]);

  return accounts;
};

const checkIsOwner = async (token, account, setIsOwner) => {
  const ownerAddress = await token.methods.owner().call();
  const isTokenOwner = ownerAddress === account;
  console.debug("is token owner: ", isTokenOwner);
  setIsOwner(isTokenOwner);
};

const setupWeb3 = async (setAccount, setNetwork) => {
  const web3 = await initWeb3();

  if (web3) {
    // add listeners for account and network changes
    const web3Provider = web3.currentProvider;
    web3Provider.on("accountsChanged", async (accounts) => {
      console.log("Account(s) updated.");
      console.log("accounts[0]: ", accounts[0]);
      setAccount(accounts[0]);
    });

    web3Provider.on("networkChanged", async (netId) => {
      console.log("Network changed.");
      console.log("Net ID: ", netId);
      const chain_id = CHAIN_IDS[netId] || netId;
      setNetwork(chain_id);
    });

    return web3;
  }
};

const initDapp = async (
  setToken,
  setFaucet,
  setAccount,
  setTokenDetails,
  setNetwork,
  setIsOwner
) => {
  const web3 = await setupWeb3(setAccount, setNetwork);
  if (!web3) {
    console.debug("Web3 could not be initialized.");
    return;
  }

  const accounts = await getAccounts(web3);
  setAccount(accounts[0]);

  const netId = await web3.eth.net.getId();
  const chain_id = CHAIN_IDS[netId] || netId;
  setNetwork(chain_id);

  const token = await getContract(tokenArtifact, web3);
  const faucet = await getContract(faucetArtifact, web3);
  setToken(token);
  setFaucet(faucet);

  await updateTokenInfo(token, setTokenDetails);

  checkIsOwner(token, accounts[0], setIsOwner);

  console.log("Dapp initialised");
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
    console.log(err);
    accountBalance = 0;
  }
  accountBalance = toBN(accountBalance).toString();

  let faucetBalance;
  try {
    faucetBalance = await token.methods
      .balanceOf(faucet.options.address)
      .call();
  } catch (err) {
    console.log(err);
    faucetBalance = 0;
  }
  faucetBalance = toBN(faucetBalance).toString();

  setBalances({ account: accountBalance, faucet: faucetBalance });
  console.debug(`updated token balance: ${accountBalance} `);
  console.debug(`updated faucet balance: ${faucetBalance} `);
};

const App = () => {
  const [account, setAccount] = useState("No address - check MetaMask");
  const [network, setNetwork] = useState("No network - check MetaMask");
  const [token, setToken] = useState(null);
  const [faucet, setFaucet] = useState(null);
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

  useEffect(() => {
    initDapp(
      setToken,
      setFaucet,
      setAccount,
      setTokenDetails,
      setNetwork,
      setIsOwner
    );
  }, [account, network]);

  useEffect(() => {
    updateBalances(account, token, faucet, setBalances);
  }, [account, token, faucet, transactionStatus]);

  const handleGetTokenClick = async (event) => {
    event.preventDefault();

    setTransactionStatus({
      message: "Waiting on transaction success...",
      type: "wait",
    });

    await faucet.methods
      .withdraw(100)
      .send({ from: account }, handleTransactionResult);
  };

  const handleSendToFaucetClick = async (event) => {
    event.preventDefault();

    setTransactionStatus({
      message: "Waiting on transaction success...",
      type: "wait",
    });

    console.debug("faucet address: ", faucet.options.address);
    await token.methods
      .transfer(faucet.options.address, 1000)
      .send({ from: account }, handleTransactionResult);
  };

  const handleTransactionResult = (err, txHash) => {
    if (err) {
      console.log(err);
      setTransactionStatus({
        message: "Transaction failed.",
        type: "fail",
      });
    } else {
      console.debug("Transaction successful, txHash: ", txHash);
      setTransactionStatus({
        message: "Sent tokens to faucet.",
        type: "success",
      });
    }
  };

  const { totalSupply, decimals, name, symbol } = tokenDetails;
  console.debug("Total supply:", totalSupply);
  console.debug("decimals:", decimals);
  const supply = parseInt(totalSupply) / 10 ** parseInt(decimals);

  return (
    <div className="container">
      <Header>
        <HeaderItem>Account: {account}</HeaderItem>
        <HeaderItem>Network: {network}</HeaderItem>
      </Header>
      <Section className={styles.section_contract}>
        <h2 className={styles.title_outlined}>
          <center>
            {name} ({symbol})
          </center>
        </h2>
        <p>
          Total supply: {supply} {symbol}
        </p>
        <UserSection
          account={account}
          isOwner={isOwner}
          tokenBalance={balances.account}
          faucetBalance={balances.faucet}
          onSendToFaucetClick={handleSendToFaucetClick}
          onGetTokenClick={handleGetTokenClick}
        >
          <TransactionStatus
            message={transactionStatus.message}
            messageType={transactionStatus.type}
          />
        </UserSection>
      </Section>
    </div>
  );
};

export default App;
