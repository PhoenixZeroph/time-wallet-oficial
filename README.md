Time-Wallet Mini App ⏳🌳🍋
=======================

This repository contains a **Lemon Cash Mini App** implementing the Time‑Wallet concept
with a **Limonero Tamagotchi** that grows with the user’s savings.

## 📦 Contents
```
.
├── assets/              # SVG sprites for each tree stage
├── contracts/           # Solidity smart‑contracts (VaultMock)
├── src/                 # React + TypeScript front‑end
├── test/                # Hardhat tests
├── .env.example         # Environment variables template
├── hardhat.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Quick start

### 1. Prerequisites
* **Node.js 20 LTS** – `nvm install 20 && nvm use 20`
* **Yarn** – `corepack enable` (or `npm i -g yarn`)
* **ngrok 3.x** – `sudo snap install ngrok`
* **Hardhat** – installed locally via dev‑deps
* Access to **Alchemy/Infura** RPC for Base Mainnet & Base Sepolia

### 2. Installation
```bash
git clone <repo> time-wallet-miniapp
cd time-wallet-miniapp
yarn install
cp .env.example .env   # add your keys
```

### 3. Front‑end development
```bash
yarn dev
# expose localhost:5173
ngrok http 5173
# paste the HTTPS forwarding URL into the Lemon Cash developer portal
```

### 4. Smart‑contract deployment (Base Sepolia)
```bash
npx hardhat deploy --network baseSepolia
```

### 5. Running tests
```bash
yarn test
```

## 🌳 Tree Growth Logic
The component `src/components/LemonTree.tsx` maps the user’s USD balance
(queried via the Lemon Mini App SDK) to one of six SVG sprites.

| Stage | Balance ≤ (USD) |
|-------|-----------------|
| Seed  | 3               |
| Sprout| 1 000           |
| Sapling| 10 000         |
| Young | 100 000         |
| Full  | 500 000         |
| Giant | 1 000 000       |

## 🛡 Security Notes
* No additional on‑chain state; balance comes from existing `Vault.balance`.
* The tree renders entirely client‑side, triggered by `Deposit` events.
* React code follows OWASP guidelines (no dangerous HTML, strict props).

## 🤝 License
MIT © 2025 Ever Allende
