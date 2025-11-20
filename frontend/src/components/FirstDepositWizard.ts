import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { timeWallet } from '../utils/web3'


@customElement('first-deposit-wizard')
export class FirstDepositWizard extends LitElement {
static styles=css`:host{display:block;padding:1rem}`
@state() amount=""
private update(e:Event){this.amount=(e.target as HTMLInputElement).value}
private async deposit(){await timeWallet.write.deposit([BigInt(this.amount)]);this.dispatchEvent(new Event('done'))}
render(){return html`<input type="number" @input=${this.update} placeholder="Monto USDC" class="text-black p-2 rounded"/><button class="ml-2 bg-primary text-black px-4 py-2 rounded" @click=${this.deposit}>Depositar</button>`}
}
