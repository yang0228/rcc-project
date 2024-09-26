// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPledgePool {
    function depositLend(uint256 amount) external;
    function refundLend(uint256 amount) external;
    function claimLend() external;
    // 其他接口函数
}