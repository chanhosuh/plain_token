const PlainToken = artifacts.require("PlainToken");

module.exports = function(deployer) {
  deployer.deploy(PlainToken);
};
