# Time-Wallet Mini App ⏳

Lemon Cash Mini App + Smart Contract en Base Sepolia para microahorros a largo plazo.
El usuario ve un limonero tipo “Tamagotchi” que crece a medida que aumenta su balance.

---

## 1. Stack

- Frontend: React + TypeScript + Vite
- Lemon: Mini App WebView + Lemon Mini App SDK (`authenticate()`)
- Smart contracts: Solidity 0.8.24 (`contracts/TimeWallet.sol`)
- Tooling:
  - Hardhat (tests y tooling EVM clásico)
  - Foundry (deploy script oficial para TimeWallet)
- Red:
  - Base Sepolia (testnet) – chainId `84532`
  - USDC oficial de Circle en Base Sepolia como `asset`

---

## 2. Estructura del repo

```txt
.
├── assets/tree            # SVG sprites del limonero (semilla -> árbol gigante)
├── contracts/             # Smart contracts Solidity (TimeWallet.sol, etc.)
├── scripts/               # Scripts de Foundry (DeployTimeWallet.s.sol)
├── src/                   # Frontend React + TS
├── test/                  # Tests Hardhat
├── frontend               # GUI Dev Template 
├── .env.example           # Template de environment variables
├── DEPLOYMENTS.md         # Direcciones on-chain por red
├── foundry.toml           # Configuración Foundry
├── hardhat.config.ts      # Configuración Hardhat
├── package.json
├── tsconfig.json
└── vite.config.ts
