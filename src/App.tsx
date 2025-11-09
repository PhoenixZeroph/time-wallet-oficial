import { useState, useEffect } from 'react';
import { LemonMiniApp } from '@lemoncash/mini-app-sdk';
import { TreeContainer } from './hooks/useTreeStage';

export default function App() {
  const [balanceUsd, setBalanceUsd] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      const b = await LemonMiniApp.wallet.getUSDValue();
      setBalanceUsd(b);
    }
    fetchBalance();
    LemonMiniApp.events.on('Deposit', fetchBalance);
    return () => LemonMiniApp.events.off('Deposit', fetchBalance);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Time‑Wallet Dashboard</h1>
      {balanceUsd === null ? (
        <p>Cargando balance…</p>
      ) : (
        <>
          <p className="mb-6">Balance: US$ {balanceUsd.toFixed(2)}</p>
          <TreeContainer balanceUsd={balanceUsd} />
        </>
      )}
    </div>
  );
}
