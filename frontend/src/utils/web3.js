import Web3 from "web3";

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

export default initWeb3;
