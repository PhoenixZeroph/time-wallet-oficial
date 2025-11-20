import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('nft-toast')
export class NftToast extends LitElement {
static styles=css`:host{position:fixed;bottom:1rem;right:1rem;background:#00a849;color:#fff;padding:.75rem 1rem;border-radius:.5rem;animation:fade 4s forwards}@keyframes fade{0%{opacity:1}90%{opacity:1}100%{opacity:0}}`
@property({type:String}) msg=""
render(){return html`${this.msg}`}
}
