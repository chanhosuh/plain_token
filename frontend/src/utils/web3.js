import Web3 from "web3";
import { CHAIN_IDS, NO_ADDRESS, NO_NETWORK } from "./constants";
import React, { useContext, createContext, useState, useEffect } from "react";

const getAccounts = async (web3) => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts[0]: ", accounts[0]);

  return accounts;
};

const initWeb3 = async () => {
  let web3;

  if (window.ethereum) {
    // soon to be deprecated / removed, as reloading is bad
    // see https://medium.com/metamask/no-longer-reloading-pages-on-network-change-fbf041942b44
    window.ethereum.autoRefreshOnNetworkChange = false;

    // modern Dapp browser or using Metamask
    web3 = new Web3(window.ethereum);
    console.log("Web3 version", web3.version);
    try {
      // get permission to access accounts
      await window.ethereum.enable();
    } catch (err) {
      console.error("User denied account access.");
    }
  } else if (window.web3) {
    // legacy-style
    web3 = new Web3(window.web3.currentProvider);
    console.log("Web3 version", web3.version);
  } else {
    console.error("No compatible web3 provider injected");
  }

  return web3;
};

const setupWeb3 = async (setWeb3, setAccount, setNetwork) => {
  const web3 = await initWeb3();

  if (!web3) {
    console.debug("Web3 could not be initialized.");
    return;
  }
  setWeb3(web3);

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

  const accounts = await getAccounts(web3);
  setAccount(accounts[0]);

  const netId = await web3.eth.net.getId();
  console.log("Net ID: ", netId);
  const chain_id = CHAIN_IDS[netId] || netId;
  setNetwork(chain_id);

  console.log("Dapp initialised");
};

const Web3Context = createContext({ web3: null, account: "", network: "" });

const Web3ContextProvider = (props) => {
  const [account, setAccount] = useState(NO_ADDRESS);
  const [network, setNetwork] = useState(NO_NETWORK);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (account === NO_ADDRESS && network === NO_NETWORK)
      setupWeb3(setWeb3, setAccount, setNetwork);
  }, [account, network]);

  const web3Context = { web3, account, network };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

const useWeb3Context = () => {
  return useContext(Web3Context);
};

export { Web3ContextProvider as Web3Provider, useWeb3Context, initWeb3 };
