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
require("dotenv").config(); // load env variables from .env file
const path = require("path");

const INFURA_KEY_RINKEBY = process.env.INFURA_KEY_RINKEBY;
const INFURA_KEY_ROPSTEN = process.env.INFURA_KEY_ROPSTEN;
// const INFURA_KEY_MAINNET = process.env.INFURA_KEY_MAINNET;
const MNEMONIC = process.env.MNEMONIC;

const getRinkebyProvider = () =>
  new HDWalletProvider(
    MNEMONIC,
    `https://rinkeby.infura.io/v3/${INFURA_KEY_RINKEBY}`
  );
const getropstenprovider = () =>
  new hdwalletprovider(
    mnemonic,
    `https://ropsten.infura.io/v3/${infura_key_ropsten}`
  );
// const getMainnetProvider = () => new HDWalletProvider(
//   MNEMONIC,
//   `https://mainnet.infura.io/v3/${INFURA_KEY_MAINNET}`
// );

delete process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "frontend/src/contracts"),

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
    /* available options for each network:
     *
     * host: (default: none)
     * port: (default: none)
     * network_id: (default: none)
     * gas: gas limit used for deploys. Default is 6721975
     * gasPrice: gas price used for deploys. Default is 100000000000 (100 Shannon).
     * from: address used during migrations. Defaults to accounts[0].
     * provider - web3 provider instance Truffle should use to talk to the Ethereum network.
     *          - function that returns a web3 provider instance (see below.)
     *          - if specified, host and port are ignored.
     * websockets: enable EventEmitter interface for web3 (default: false)
     * confirmations: number of confirmations to wait between deployments. (default: 0)
     * timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
     * skipDryRun: - true if you don't want to test run the migration locally before the actual migration (default is false)
     */

    /*
     * Useful for testing. The `development` name is special - truffle uses it by default
     * if it's defined here and no other network is specified at the command line.
     * You should run a client (like ganache-cli, geth or parity) in a separate terminal
     * tab if you use this network and you must also set the `host`, `port` and `network_id`
     * options below to some value.
     */
    development: {
      host: "127.0.0.1", // Localhost
      port: 8545, // Standard Ethereum port
      network_id: "*", // Any network
    },
    // mainnet: {
    //   network_id: "1",
    //   provider: getMainNetProvider,
    //   gas: 4600000,
    //   gasPrice: utils.toWei("20", "gwei")
    // },
    ropsten: {
      network_id: "3",
      provider: getRopstenProvider,
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      gasPrice: utils.toWei("20", "gwei"),
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      network_id: "4",
      provider: getRinkebyProvider,
      gas: 4600000,
      gasPrice: utils.toWei("20", "gwei"),
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
