var PlainToken = artifacts.require("PlainToken");
var Faucet = artifacts.require("Faucet");

module.exports = function (deployer) {
  deployer.deploy(Faucet, PlainToken.address);
};
