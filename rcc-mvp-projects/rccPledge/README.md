# rccPledge

## 1️⃣ System Overview
`rccPledge` is a decentralized finance (DeFi) project aimed at providing a fixed-rate lending protocol, primarily serving cryptocurrency holders. `rccPledge` aims to address the lack of fixed-rate and fixed-term financing products in the DeFi lending market. Traditional DeFi lending protocols typically use variable rates, mainly serving short-term traders, while `rccPledge` focuses on long-term financing needs.

## 2️⃣ Functional Requirements
### 2.1 Core Features
- **Fixed-Rate Lending**: Provides fixed-rate lending services to reduce the risk of interest rate fluctuations.
- **Decentralized Dex Trading** (Core).
- **Cross-Chain Support**: Supports lending and derivatives trading on multiple public chains (Optional).
- **Financial NFTs**: Utilizes financial NFT technology to offer various financial products, including insurance and bonds (Optional).
- **Multi-Asset Support**: Supports the collateralization of various crypto and non-crypto assets (e.g., real estate).

### 2.2 Main Roles
- **Borrowers**: Can collateralize crypto assets to obtain stablecoins for investing in non-crypto assets.
- **Lenders**: Provide liquidity and earn fixed returns.
- **Liquidity Providers**: Lock stablecoins in liquidity pools to provide liquidity support.

### 2.3 Key Components
- **Smart Contracts**: Automatically execute lending agreements, ensuring transaction records are on-chain and immutable.
- **pToken**: Represents value transfer at a future point in time, used for lending and liquidation.
- **PLGR Token**: The governance token of the Pledge platform, used for protocol governance and incentives.

## 3️⃣ Code Analysis
`PledgePool.sol` is one of the core smart contracts of the `rccPledge` project, with the following main functions:
### 3.1 Pool
- **Create and Manage Lending Pools**: Includes setting basic information and state management of lending pools.
- **User Deposits and Withdrawals**: Handles user borrowing and lending operations, including deposits, withdrawals, and claims.
- **Automatic Liquidation**: Automatically triggers liquidation operations based on set thresholds to protect the interests of both borrowers and lenders.
- **Fee Management**: Sets and manages lending fees to ensure the sustainable operation of the platform.

## 4️⃣ Events and Functions
- **Events**: Such as `DepositLend`, `RefundLend`, `ClaimLend`, used to record user operations.
- **Functions**: Such as `DepositLend`, `refundLend`, `claimLend`, implementing specific business logic.

## Installation
To install and set up the `rccPledge` project, follow these steps:

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