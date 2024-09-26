const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy(ethers.utils.parseEther("1000000"));
    await rewardToken.deployed();
    console.log("RewardToken deployed to:", rewardToken.address);

    const RCCStake = await ethers.getContractFactory("RCCStake");
    const rccStake = await RCCStake.deploy(rewardToken.address);
    await rccStake.deployed();
    console.log("RCCStake deployed to:", rccStake.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });