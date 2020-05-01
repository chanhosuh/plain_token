pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Faucet is Ownable {
    ERC20 public token;
    bool public turnedOn = false;

    event FaucetTurnedOn();
    event FaucetTurnedOff();

    event FaucetWithdrawal(address recipient, uint256 amount);

    constructor(address tokenAddress) public {
        token = ERC20(tokenAddress);
        turnOn();
    }

    function turnOn() public onlyOwner {
        require(!turnedOn, "Faucet is already on.");

        turnedOn = true;
        emit FaucetTurnedOn();
    }

    function turnOff() public onlyOwner {
        require(turnedOn, "Faucet is already off.");

        turnedOn = false;
        emit FaucetTurnedOff();
    }

    function withdraw(uint256 amount) public {
        require(turnedOn, "Faucet must be turned on to withdraw.");

        token.transfer(msg.sender, amount);
        emit FaucetWithdrawal(msg.sender, amount);
    }
}
