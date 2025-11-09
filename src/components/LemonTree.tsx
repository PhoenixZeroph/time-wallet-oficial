import { motion } from 'framer-motion';
import seed    from '../../assets/tree/seed.svg';
import sprout  from '../../assets/tree/sprout.svg';
import sapling from '../../assets/tree/sapling.svg';
import young   from '../../assets/tree/young.svg';
import full    from '../../assets/tree/full.svg';
import giant   from '../../assets/tree/giant.svg';

const STAGES = [
  { max: 3,         img: seed,   label: 'Semilla' },
  { max: 1_000,     img: sprout, label: 'Brote'   },
  { max: 10_000,    img: sapling,label: 'Arbolito'},
  { max: 100_000,   img: young,  label: 'Joven'   },
  { max: 500_000,   img: full,   label: 'Frondoso'},
  { max: 1_000_000, img: giant,  label: 'Gigante' },
] as const;

interface Props {
  balanceUsd: number;
}

export function LemonTree({ balanceUsd }: Props) {
  const stage = STAGES.find(s => balanceUsd <= s.max) ?? STAGES[5];
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1,   opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="flex flex-col items-center"
      role="img"
      aria-label={`Árbol etapa ${stage.label}`}
    >
      <img src={stage.img} alt={stage.label} className="w-48 h-auto" />
      <span className="mt-2 text-lime-400 text-sm">{stage.label}</span>
    </motion.div>
  );
}
