async function getContract(contractArtifact, web3) {
  // determine network to connect to
  let networkId = await web3.eth.net.getId();
  let deployedNetwork = contractArtifact.networks[networkId];
  if (!deployedNetwork) {
    console.warn(
      "web3 provider is connected to a network ID that does not matched the deployed network ID"
    );
    console.warn(
      "Pls make sure that you are connected to the right network, defaulting to deployed network ID"
    );
    networkId = Object.keys(contractArtifact.networks)[0];
    deployedNetwork = contractArtifact.networks[networkId];
  }
  console.debug("deployedNetwork", deployedNetwork);

  // initialise the contract
  let contract;
  try {
    contract = new web3.eth.Contract(
      contractArtifact.abi,
      deployedNetwork.address
    );
  } catch (err) {
    console.error("Failed to retrieve deployed contract.");
    console.error(err);
  }

  return contract;
}

export default getContract;
