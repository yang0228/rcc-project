const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RCCStake", function () {
    let RCCStake, rccStake, rewardToken, stToken, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2, _] = await ethers.getSigners();

        const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
        rewardToken = await ERC20Mock.deploy("Reward Token", "RWT", 18, ethers.utils.parseEther("1000000"));
        stToken = await ERC20Mock.deploy("Stake Token", "STT", 18, ethers.utils.parseEther("1000000"));

        RCCStake = await ethers.getContractFactory("RCCStake");
        rccStake = await RCCStake.deploy(rewardToken.address);
    });

    it("Should add a new pool", async function () {
        await rccStake.addPool(stToken.address, 100, ethers.utils.parseEther("1"), 100);
        const pool = await rccStake.pools(0);
        expect(pool.stToken).to.equal(stToken.address);
        expect(pool.poolWeight).to.equal(100);
        expect(pool.minDepositAmount).to.equal(ethers.utils.parseEther("1"));
        expect(pool.unstakeLockedBlocks).to.equal(100);
    });

    it("Should allow staking", async function () {
        await rccStake.addPool(stToken.address, 100, ethers.utils.parseEther("1"), 100);
        await stToken.connect(addr1).approve(rccStake.address, ethers.utils.parseEther("10"));
        await rccStake.connect(addr1).stake(0, ethers.utils.parseEther("10"));
        const user = await rccStake.users(0, addr1.address);
        expect(user.stAmount).to.equal(ethers.utils.parseEther("10"));
    });

    it("Should allow unstaking", async function () {
        await rccStake.addPool(stToken.address, 100, ethers.utils.parseEther("1"), 100);
        await stToken.connect(addr1).approve(rccStake.address, ethers.utils.parseEther("10"));
        await rccStake.connect(addr1).stake(0, ethers.utils.parseEther("10"));
        await rccStake.connect(addr1).unstake(0, ethers.utils.parseEther("5"));
        const user = await rccStake.users(0, addr1.address);
        expect(user.stAmount).to.equal(ethers.utils.parseEther("5"));
    });

    it("Should allow claiming rewards", async function () {
        await rccStake.addPool(stToken.address, 100, ethers.utils.parseEther("1"), 100);
        await stToken.connect(addr1).approve(rccStake.address, ethers.utils.parseEther("10"));
        await rccStake.connect(addr1).stake(0, ethers.utils.parseEther("10"));
        // Simulate reward accumulation
        await rccStake.updatePool(0, 100, ethers.utils.parseEther("1"), 100);
        await rccStake.connect(addr1).claimReward(0);
        const user = await rccStake.users(0, addr1.address);
        expect(user.pendingRCC).to.equal(0);
    });
});