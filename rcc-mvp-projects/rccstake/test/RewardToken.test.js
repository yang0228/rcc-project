const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardToken", function () {
    let RewardToken, rewardToken, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2, _] = await ethers.getSigners();
        RewardToken = await ethers.getContractFactory("RewardToken");
        rewardToken = await RewardToken.deploy(ethers.utils.parseEther("1000000"));
    });

    it("Should have correct initial supply", async function () {
        const totalSupply = await rewardToken.totalSupply();
        expect(totalSupply).to.equal(ethers.utils.parseEther("1000000"));
    });

    it("Should allow transfer", async function () {
        await rewardToken.transfer(addr1.address, ethers.utils.parseEther("100"));
        const balance = await rewardToken.balanceOf(addr1.address);
        expect(balance).to.equal(ethers.utils.parseEther("100"));
    });
});