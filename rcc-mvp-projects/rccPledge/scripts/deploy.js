async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 获取 PledgePool 合约工厂
    const PledgePool = await ethers.getContractFactory("PledgePool");
    
    // 假设构造函数需要一个地址参数，这里我们使用部署者的地址作为示例
    // 请根据实际的构造函数参数需求进行调整
    const pledgePool = await PledgePool.deploy(deployer.address);
    
    await pledgePool.deployed();
    console.log("PledgePool deployed to:", pledgePool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });