import { getContract } from 'viem'
import NFT_ABI from '../abi/TimeWalletProgress.json'
import deployments from '../abi/deployments.json'
import { walletClient } from './web3'


export const nft = getContract({
address: deployments.progressNftSepolia as `0x${string}`,
abi: NFT_ABI,
client: walletClient
})


export const MILESTONES = [
{ value: 3n, id: 1, uri: '/nft/seed.png' },
{ value: 100n, id: 2, uri: '/nft/sapling.png' },
{ value: 1_000n, id: 3, uri: '/nft/young.png' },
{ value: 10_000n, id: 4, uri: '/nft/sprout.png' },
{ value: 500_000n, id: 5, uri: '/nft/full.png' },
{ value: 1_000_000n, id: 6, uri: '/nft/giant.png' }
] as const
