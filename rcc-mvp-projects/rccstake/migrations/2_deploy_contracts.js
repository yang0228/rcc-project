const RCCStake = artifacts.require("RCCStake");
const RewardToken = artifacts.require("RewardToken");

module.exports = async function (deployer, network, accounts) {
  const initialSupply = web3.utils.toWei('1000000', 'ether');
  await deployer.deploy(RewardToken, initialSupply);
  const rewardToken = await RewardToken.deployed();

  await deployer.deploy(RCCStake, rewardToken.address);
  const rccStake = await RCCStake.deployed();

  // Optionally, add initial pools here
};