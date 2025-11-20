import { createWalletClient, http, getContract } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import deployments from '../abi/deployments.json'
import ABI from '../abi/TimeWallet.json'


export const CHAINS = { base, baseSepolia } as const


export const walletClient = createWalletClient({
chain: CHAINS.baseSepolia,
transport: http('https://sepolia.base.org')
})


export const timeWallet = getContract({
address: deployments.baseSepolia as `0x${string}`,
abi: ABI,
client: walletClient
})
