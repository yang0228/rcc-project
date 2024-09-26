i# RCCStake

RCCStake is a staking contract that allows users to stake various tokens and earn rewards in the form of RCC tokens.

## Features

- Multiple staking pools
- Configurable staking and unstaking parameters
- Reward distribution based on staking amount and duration
- Pausable contract for emergency situations

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Compile contracts:
   ```bash
   npx hardhat compile
   ```

3. Deploy contracts to Sepolia:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. Run tests:
   ```bash
   npx hardhat test
   ```

## Deployment

To deploy the contracts, use the provided deployment scripts:
