let chai;
describe("PledgePool", function () {
    let PToken, pToken, PledgePool, pledgePool;

    before( async function () {
        // Deploy PToken first


        const PToken = await ethers.getContractFactory("PToken");
        const pToken = await PToken.deploy(100000);
        await pToken.deployed();

        // Now deploy PledgePool with PToken address
        const PledgePool = await ethers.getContractFactory("PledgePool");
        const pledgePool = await PledgePool.deploy(pToken.address);
        await pledgePool.deployed();

        // expect(PledgePool.address).to.be.a('string');
        // expect(PledgePool.address).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("Should deploy the PledgePool contract", async function () {
        chai = await import('chai');
        const { expect } = chai;
        expect(pledgePool.address).to.be.a('string');
        expect(pledgePool.address).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    // 其他测试用例
});