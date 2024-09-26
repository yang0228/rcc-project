// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPledgePool.sol";
import "./PToken.sol";

contract PledgePool is IPledgePool {
    // 合约状态变量和构造函数
    PToken public pToken;
    mapping(address => uint256) public deposits;

    constructor(address _pTokenAddress) {
        pToken = PToken(_pTokenAddress);
    }

    function depositLend(uint256 amount) external override {
        require(amount > 0, "Amount must be greater than zero");
        pToken.transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
        // Emit an event for deposit
    }

    function refundLend(uint256 amount) external override {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;
        pToken.transfer(msg.sender, amount);
        // Emit an event for refund
    }

    function claimLend() external override {
        uint256 amount = deposits[msg.sender];
        require(amount > 0, "No deposits to claim");
        deposits[msg.sender] = 0;
        pToken.transfer(msg.sender, amount);
        // Emit an event for claim
    }

    /* Explanation:
1. State Variables and Constructor:
Added a PToken instance to interact with the token contract.
Added a deposits mapping to keep track of user deposits.
The constructor initializes the PToken instance with the provided token contract address.
2. depositLend Function:
Checks if the deposit amount is greater than zero.
Transfers the specified amount of tokens from the user to the contract.
Updates the user's deposit balance.
3. refundLend Function:
Checks if the user has enough balance to refund.
Deducts the specified amount from the user's deposit balance.
Transfers the tokens back to the user.
4. claimLend Function:
Checks if the user has any deposits to claim.
Resets the user's deposit balance to zero.
Transfers the entire deposit amount back to the user.
*/

}