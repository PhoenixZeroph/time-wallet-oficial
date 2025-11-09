import React, { useEffect, useState } from "react";
import {
  authenticate,
  deposit,
  isWebView,
  ChainId,
  TransactionResult
} from "@lemoncash/mini-app-sdk";
import { ethers } from "ethers";
import { useMaturity } from "./hooks/useMaturity";
import { useSemiannualReview } from "./hooks/useSemiannualReview";

const chainId = Number(import.meta.env.VITE_CHAIN_ID) as ChainId;
const contractAddress = __CONTRACT_ADDRESS__ as `0x${string}`;
const baseRpcUrl = __BASE_RPC__ as string;

const vaultAbi = [
  "function vaults(address) view returns (uint256 balance,uint64 firstDepositAt,uint64 maturityAt)"
];

export default function App() {
  const [wallet, setWallet] = useState<string>();
  const [vault, setVault] = useState<{
    balance: string;
    firstDepositAt: number | null;
  }>({ balance: "0", firstDepositAt: null });
  const [loading, setLoading] = useState(true);

  const maturity = useMaturity(vault.firstDepositAt);
  const review = useSemiannualReview(vault.firstDepositAt);

  // ───────────── Init ─────────────
  useEffect(() => {
    (async () => {
      if (!isWebView()) {
        setLoading(false);
        return;
      }
      try {
        const result = await authenticate({ chainId });
        if (result.result !== TransactionResult.SUCCESS) throw new Error("Auth failed");
        setWallet(result.data.wallet);
        await refreshVault(result.data.wallet);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ───────────── Helpers ─────────────
  const refreshVault = async (addr: string) => {
    const provider = new ethers.JsonRpcProvider(baseRpcUrl);
    const contract = new ethers.Contract(contractAddress, vaultAbi, provider);
    const v = await contract.vaults(addr);
    setVault({
      balance: ethers.formatEther(v.balance),
      firstDepositAt: Number(v.firstDepositAt)
    });
  };

  const handleDeposit = async () => {
    const res = await deposit({ amount: "3", tokenName: "USDC", chainId });
    if (res.result !== TransactionResult.SUCCESS) {
      console.error("Deposit failed:", res);
      return;
    }
    wallet && (await refreshVault(wallet));
  };

  // ───────────── UI ─────────────
  if (!isWebView()) {
    return <p>📱 Abrí esta Mini App dentro de Lemon Cash.</p>;
  }
  if (loading) return <p>⏳ Cargando...</p>;

  return (
    <main className="p-4 flex flex-col gap-4">
      {review.show && (
        <div className="bg-yellow-200 p-3 rounded-xl">
          <p className="font-semibold">
            Semiannual review disponible — rebalanceá 50 % en Aave
          </p>
          <button className="btn" onClick={() => console.log("TODO rebalance")}>
            Rebalancear
          </button>
        </div>
      )}

      <section className="border p-4 rounded-xl">
        <h2 className="text-lg font-bold">Bóveda</h2>
        <p>Saldo: {vault.balance} ETH</p>
        <p>
          Progreso: {maturity.pct.toFixed(1)} % — faltan {maturity.monthsRemaining} meses
        </p>
        <button className="btn mt-2" onClick={handleDeposit}>
          Aportar 3 USDC
        </button>
      </section>

      <section className="border p-4 rounded-xl">
        <h2 className="text-lg font-bold">Wallet</h2>
        <p>{wallet}</p>
      </section>
    </main>
  );
}
