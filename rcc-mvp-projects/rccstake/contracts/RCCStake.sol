// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RCCStake is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    constructor(address initialOwner) Ownable(initialOwner) {
        // 你的构造函数代码
    }

    struct Pool {
        IERC20 stToken;
        uint256 poolWeight;
        uint256 lastRewardBlock;
        uint256 accRCCPerST;
        uint256 stTokenAmount;
        uint256 minDepositAmount;
        uint256 unstakeLockedBlocks;
    }

    struct User {
        uint256 stAmount;
        uint256 finishedRCC;
        uint256 pendingRCC;
        UnstakeRequest[] requests;
    }

    struct UnstakeRequest {
        uint256 amount;
        uint256 unlockBlock;
    }

    IERC20 public rewardToken;
    Pool[] public pools;
    mapping(uint256 => mapping(address => User)) public users;

    event Stake(address indexed user, uint256 indexed pid, uint256 amount);
    event Unstake(address indexed user, uint256 indexed pid, uint256 amount);
    event ClaimReward(address indexed user, uint256 indexed pid, uint256 amount);
    event AddPool(uint256 indexed pid, address stToken, uint256 poolWeight, uint256 minDepositAmount, uint256 unstakeLockedBlocks);
    event UpdatePool(uint256 indexed pid, uint256 poolWeight, uint256 minDepositAmount, uint256 unstakeLockedBlocks);
    // event Paused(address account);
    // event Unpaused(address account);

    error StakeAmountTooLow();
    error UnstakeAmountExceedsStaked();
    error NoRewardToClaim();

    // constructor(IERC20 _rewardToken) {
    //     rewardToken = _rewardToken;
    // }

    /// @notice Adds a new staking pool
    /// @param _stToken The staking token
    /// @param _poolWeight The weight of the pool
    /// @param _minDepositAmount The minimum deposit amount
    /// @param _unstakeLockedBlocks The number of blocks to lock unstaking
    function addPool(IERC20 _stToken, uint256 _poolWeight, uint256 _minDepositAmount, uint256 _unstakeLockedBlocks) external onlyOwner {
        pools.push(Pool({
            stToken: _stToken,
            poolWeight: _poolWeight,
            lastRewardBlock: block.number,
            accRCCPerST: 0,
            stTokenAmount: 0,
            minDepositAmount: _minDepositAmount,
            unstakeLockedBlocks: _unstakeLockedBlocks
        }));
        emit AddPool(pools.length - 1, address(_stToken), _poolWeight, _minDepositAmount, _unstakeLockedBlocks);
    }

    /// @notice Updates an existing staking pool
    /// @param _pid The pool ID
    /// @param _poolWeight The new weight of the pool
    /// @param _minDepositAmount The new minimum deposit amount
    /// @param _unstakeLockedBlocks The new number of blocks to lock unstaking
    function updatePool(uint256 _pid, uint256 _poolWeight, uint256 _minDepositAmount, uint256 _unstakeLockedBlocks) external onlyOwner {
        Pool storage pool = pools[_pid];
        pool.poolWeight = _poolWeight;
        pool.minDepositAmount = _minDepositAmount;
        pool.unstakeLockedBlocks = _unstakeLockedBlocks;
        emit UpdatePool(_pid, _poolWeight, _minDepositAmount, _unstakeLockedBlocks);
    }

    /// @notice Stakes tokens in a pool
    /// @param _pid The pool ID
    /// @param _amount The amount to stake
    function stake(uint256 _pid, uint256 _amount) external nonReentrant whenNotPaused {
        Pool storage pool = pools[_pid];
        User storage user = users[_pid][msg.sender];

        if (_amount < pool.minDepositAmount) revert StakeAmountTooLow();

        pool.stToken.safeTransferFrom(msg.sender, address(this), _amount);
        user.stAmount += _amount;
        pool.stTokenAmount += _amount;

        emit Stake(msg.sender, _pid, _amount);
    }

    /// @notice Unstakes tokens from a pool
    /// @param _pid The pool ID
    /// @param _amount The amount to unstake
    function unstake(uint256 _pid, uint256 _amount) external nonReentrant whenNotPaused {
        User storage user = users[_pid][msg.sender];
        if (user.stAmount < _amount) revert UnstakeAmountExceedsStaked();

        user.stAmount -= _amount;
        user.requests.push(UnstakeRequest({
            amount: _amount,
            unlockBlock: block.number + pools[_pid].unstakeLockedBlocks
        }));

        emit Unstake(msg.sender, _pid, _amount);
    }

    /// @notice Claims pending rewards
    /// @param _pid The pool ID
    function claimReward(uint256 _pid) external nonReentrant whenNotPaused {
        User storage user = users[_pid][msg.sender];
        uint256 reward = user.pendingRCC;
        if (reward == 0) revert NoRewardToClaim();

        user.pendingRCC = 0;
        rewardToken.safeTransfer(msg.sender, reward);

        emit ClaimReward(msg.sender, _pid, reward);
    }

    /// @notice Pauses the contract
    function pause() external onlyOwner {
        _pause();
        emit Paused(msg.sender);
    }

    /// @notice Unpauses the contract
    function unpause() external onlyOwner {
        _unpause();
        emit Unpaused(msg.sender);
    }

    // Additional functions for reward calculation, pool updates, etc. will be added here
}