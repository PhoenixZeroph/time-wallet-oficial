import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './DisclaimerModal';import './FirstDepositWizard';import './PerformanceDashboard';import './TreeGamification';import './NftToast';
import { timeWallet } from '../utils/web3';import { MILESTONES,nft } from '../utils/nft';


@customElement('time-wallet-dashboard')
export class TimeWalletDashboard extends LitElement {
static styles=css`:host{display:block;max-width:22rem;margin:auto}`
@state() step: 'disclaimer'|'deposit'|'dashboard'='disclaimer'
@state() balance=0n;@state() toastMsg=''
private onDisclaimer(){this.step='deposit'}
private onDepositDone(){this.step='dashboard';this.refresh()}
private async refresh(){const [addr]=await timeWallet.client.requestAddresses();this.balance=await timeWallet.read.balanceOf([addr]);this.checkMilestone(addr)}
private async checkMilestone(addr:`0x${string}`){for(const m of MILESTONES){if(this.balance>=m.value){try{await nft.read.ownerOf([m.id]);}catch{await nft.write.safeMint([addr,BigInt(m.id),m.uri]);this.toastMsg=`Nuevo NFT nivel ${m.id}!`;setTimeout(()=>this.toastMsg='',4000)}}}}
render(){return html`
${this.step==='disclaimer'?html`<disclaimer-modal @accepted=${this.onDisclaimer}></disclaimer-modal>`:''}
${this.step==='deposit'?html`<first-deposit-wizard @done=${this.onDepositDone}></first-deposit-wizard>`:''}
${this.step==='dashboard'?html`<performance-dashboard></performance-dashboard><tree-gamification .progress=${this.balance}></tree-gamification>`:''}
${this.toastMsg?html`<nft-toast .msg=${this.toastMsg}></nft-toast>`:''}
`}
}
