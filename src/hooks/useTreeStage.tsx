// @ts-nocheck
import { LemonTree } from '../components/LemonTree';

interface Props {
  balanceUsd: number;
}

export function TreeContainer({ balanceUsd }: Props) {
  return <LemonTree balanceUsd={balanceUsd} />;
}
