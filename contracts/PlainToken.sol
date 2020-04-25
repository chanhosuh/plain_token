pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract PlainToken is ERC20("Plain Token", "PLN"), Ownable {
    uint8 public constant DECIMALS = 2;
    uint256 public constant INITIAL_SUPPLY = 1000000;

    constructor() public {
        _setupDecimals(DECIMALS);
        _mint(msg.sender, INITIAL_SUPPLY);

    }


    // function totalSupply() public view override returns (uint256)
    // function balanceOf(address account) public view override returns (uint256)
    // function transfer(address recipient, uint256 amount) public virtual override returns (bool)
    // function allowance(address owner, address spender) public view virtual override returns (uint256)
    // function approve(address spender, uint256 amount) public virtual override returns (bool)
    // function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool)
}
