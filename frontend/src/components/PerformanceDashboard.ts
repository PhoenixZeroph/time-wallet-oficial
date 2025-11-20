import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { timeWallet } from '../utils/web3'


@customElement('performance-dashboard')
export class PerformanceDashboard extends LitElement {
static styles=css`:host{display:block;text-align:center}`
@state() balance=0n
connectedCallback(){super.connectedCallback();this.refresh()}
async refresh(){const [addr]=await timeWallet.client.requestAddresses();this.balance=await timeWallet.read.balanceOf([addr])}
render(){return html`<h3 class="text-lg mb-2">Balance bloqueado: ${this.balance.toString()} USDC</h3>`}
}
