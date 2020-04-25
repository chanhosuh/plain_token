/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
const utils = require("web3-utils");
require("dotenv").config();

const INFURA_KEY_RINKEBY = process.env.INFURA_KEY_RINKEBY;
// const INFURA_KEY_ROPSTEN = process.env.INFURA_KEY_ROPSTEN;
// const INFURA_KEY_MAINNET = process.env.INFURA_KEY_MAINNET;
const MNEMONIC = process.env.MNEMONIC;

const rinkebyProvider = new HDWalletProvider(
  MNEMONIC,
  `https://rinkeby.infura.io/v3/${INFURA_KEY_RINKEBY}`
);
// const ropstenProvider = new HDWalletProvider(
//   MNEMONIC,
//   `https://ropsten.infura.io/v3/${INFURA_KEY_ROPSTEN}`
// );
// const mainnetProvider = new HDWalletProvider(
//   MNEMONIC,
//   `https://mainnet.infura.io/v3/${INFURA_KEY_MAINNET}`
// );

delete process.env.MNEMONIC;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    // mainnet: {
    //   // Provided by Infura, load keys in .env file
    //   network_id: "1",
    //   provider: mainNetProvider,
    //   gas: 4600000,
    //   gasPrice: utils.toWei("20", "gwei")
    // },
    // ropsten: {
    //   // Provided by Infura, load keys in .env file
    //   network_id: "3",
    //   provider: ropstenProvider,
    //   gas: 4600000,
    //   gasPrice: utils.toWei("20", "gwei")
    // },
    rinkeby: {
      // Provided by Infura, load keys in .env file
      network_id: "4",
      provider: rinkebyProvider,
      gas: 4600000,
      gasPrice: utils.toWei("20", "gwei"),
    },
    kovan: {
      network_id: 42,
      host: "localhost", // parity --chain=kovan
      port: 8545,
      gas: 5000000,
    },
    ganache: {
      // Ganache local test RPC blockchain
      network_id: "5777",
      host: "localhost",
      port: 7545,
      gas: 6721975,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.6", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
