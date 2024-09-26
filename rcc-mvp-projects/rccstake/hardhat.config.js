require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url:  "https://sepolia.infura.io/v3/" + process.env.INFURA_ID, accounts: [`0x${process.env.PRIVATE_KEY}`],
      //url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      //accounts: { mnemonic: process.env.MNEMONIC },
    },
  },
};

 // 1 require("@nomicfoundation/hardhat-toolbox");
 // 2 require("dotenv").config();
//  3 /** @type import('hardhat/config').HardhatUserConfig */
 // 4 module.exports = {
 // 5 solidity: "0.8.24",
 // 6 networks: {
 // 7 hardhat: {},
 // 8 sepoliaInfura: {
 // 9 url:
 //10  "https://sepolia.infura.io/v3/" + process.env.INFURA_ID, accounts: [`0x${process.env.PRIVATE_KEY}`],
 //11  //"https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY, accounts: [`0x${process.env.PRIVATE_KEY}`],
 //12  },
 //13  },
 //14  };
