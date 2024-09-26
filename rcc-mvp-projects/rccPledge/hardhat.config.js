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
