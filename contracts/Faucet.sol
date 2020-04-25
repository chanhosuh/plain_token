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
        turnedOn = true;
        emit FaucetTurnedOn();
    }

    function turnOff() public onlyOwner {
        turnedOn = false;
        emit FaucetTurnedOff();
    }

    function withdraw(uint256 amount) public {
        token.transfer(msg.sender, amount);
        emit FaucetWithdrawal(msg.sender, amount);
    }

    function send(uint256 amount) public {
        token.transfer(address(this), amount);
    }
}
