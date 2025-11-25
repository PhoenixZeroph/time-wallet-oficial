import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  Plus,
  X,
  Hourglass
} from "lucide-react";

/**
 * Time‑Wallet mini‑app – neon green × deep‑black (final layout)
 * — Exact match to the reference screenshot provided by the user.
 *
 *  ▸ full‑screen black background + subtle emerald radial glow
 *  ▸ top savings panel ($ 0.00) inside neon frame (no text header)
 *  ▸ centred circular hourglass button that opens the NFT dialog
 *  ▸ deposit + quick‑loan sections with white numbers / emerald frames
 */
export default function TimeWalletApp() {
  const coins = [
    "usdc","usdt","bitcoin","ethereum","ada","morpho","xrp","trx","uni","arb","dai","aave","algo","avax","bnb","celo","dot","link","pol"
  ];

  /* ───────────────────────── state  */
  const [balance, setBalance] = useState(0);
  const [debt, setDebt] = useState(0);
  const [coin, setCoin] = useState("usdc");
  const [amount, setAmount] = useState(10);
  const [loan, setLoan]   = useState(50);
  const [showNFT, setShowNFT] = useState(false);

  /* ───────────────────────── logic */
  const min = 1;
  const canDeposit = amount >= min;
  const canLoan    = debt === 0 && balance >= loan;

  const deposit = () => {
    if (!canDeposit) return;
    // amortise first
    if (debt > 0) {
      const repay = Math.min(debt, amount);
      setDebt(debt - repay);
    }
    setBalance(b => b + amount);
  };

  const askLoan = () => {
    if (!canLoan) return;
    setDebt(loan);
    setBalance(b => b + loan);
  };

  const reset = () => {
    setBalance(0);
    setDebt(0);
    setAmount(10);
    setLoan(50);
  };

  /* simple NFT evolution */
  const nft = debt > 0 ? "seed‑lock" : balance >= 200 ? "hourglass‑gold" : balance >= 100 ? "hourglass" : "seed";

  /* ───────────────────────── ui */
  return (
    <div className="relative min-h-screen flex items-center justify-center font-mono text-white bg-black overflow-hidden">
      {/* emerald glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,240,104,0.12)_0%,_transparent_70%)]" />

      <main className="relative w-72 p-4 rounded-xl border border-emerald-400/40 bg-black/40 backdrop-blur-lg shadow-[0_0_25px_rgba(0,240,104,0.35)]">
        {/* SAVINGS */}
        <div className="border-2 border-emerald-400 px-8 py-3 mb-6 text-center shadow-[0_0_10px_rgba(0,240,104,0.25)]">
          <p className="text-3xl font-extrabold tabular-nums">$ {balance.toFixed(2)}</p>
        </div>

        {/* HOURGLASS CIRCLE */}
        <button
          onClick={() => setShowNFT(true)}
          className="mx-auto mb-8 h-16 w-16 rounded-full flex items-center justify-center bg-black/60 border-4 border-emerald-400 shadow-[0_0_12px_rgba(0,240,104,0.55)] hover:bg-emerald-400/10 active:bg-emerald-400/20"
        >
          <Hourglass className="h-6 w-6 text-emerald-400" />
        </button>

        {/* DEPOSIT PANEL */}
        <Panel title="Monto a ingresar">
          <NumberPicker value={amount} setValue={setAmount} step={1} min={min} />
          <select
            className="mt-2 w-full bg-black/50 border border-emerald-400 text-xs uppercase p-1 text-center"
            value={coin}
            onChange={e => setCoin(e.target.value)}
          >
            {coins.map(c => <option key={c}>{c}</option>)}
          </select>
        </Panel>

        <NeonBtn onClick={deposit} disabled={!canDeposit} label={<><ArrowDown className="h-4 w-4 mr-1"/>Agregar</>} />

        {/* LOAN PANEL */}
        <Panel title="Préstamo rápido">
          <NumberPicker value={loan} setValue={setLoan} step={10} min={min} />
        </Panel>

        <NeonBtn onClick={askLoan} disabled={!canLoan} label={<><ArrowUp className="h-4 w-4 mr-1"/>Solicitar préstamo</>} />

        {balance + debt > 0 && (
          <button onClick={reset} className="mt-4 w-full text-xs text-emerald-400 underline">Reiniciar flujo</button>
        )}
      </main>

      {/* NFT dialog */}
      <Dialog open={showNFT} onOpenChange={setShowNFT}>
        <DialogContent className="bg-black text-white border border-emerald-400 max-w-xs">
          <button className="absolute top-2 right-2" onClick={()=>setShowNFT(false)}><X className="text-emerald-400"/></button>
          <div className="flex flex-col items-center gap-4 mt-6">
            <img src={`/${nft}.png`} alt="nft" className="h-24 drop-shadow-[0_0_10px_#00f068]" />
            <p className="text-center text-lg">NFT: {nft}</p>
            <p className="text-emerald-400 text-sm">Ahorros $ {balance.toFixed(2)}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ————————————————— helpers ————————————————— */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-emerald-400 p-3 mb-4 text-center space-y-3">
      <p className="text-xs text-emerald-400 tracking-wide">{title}</p>
      {children}
    </div>
  );
}

function NumberPicker({ value, setValue, step, min }: { value:number; setValue:(n:number)=>void; step:number; min:number }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <IconBtn onClick={() => setValue(Math.max(min, value - step))} icon={Minus} />
      <p className="text-xl">$ {value}</p>
      <IconBtn onClick={() => setValue(value + step)} icon={Plus} />
    </div>
  );
}

function IconBtn({ onClick, icon: Icon }: { onClick: () => void; icon: any }) {
  return (
    <button onClick={onClick} className="border border-emerald-400 p-1 hover:bg-emerald-400/20">
      <Icon className="h-4 w-4 text-emerald-400" />
    </button>
  );
}

function NeonBtn({ onClick, disabled, label }: { onClick: () => void; disabled?: boolean; label: React.ReactNode }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full flex justify-center items-center gap-1 py-2 border-2 border-emerald-400 rounded uppercase tracking-wide mb-4 ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-400/10 active:bg-emerald-400/20"}`}
    >
      {label}
    </button>
  );
}
