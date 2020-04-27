pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract PlainToken is ERC20("Plain Token", "PLN"), Ownable {
    uint8 public constant DECIMALS = 2;
    uint256 public constant INITIAL_SUPPLY = 100000000;

    constructor() public {
        _setupDecimals(DECIMALS);
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
