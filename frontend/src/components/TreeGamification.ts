import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { MILESTONES } from '../utils/nft'


@customElement('tree-gamification')
export class TreeGamification extends LitElement {
static styles=css`:host{display:block;text-align:center}`
@state() unlocked=0n
set progress(v:bigint){this.unlocked=v;this.requestUpdate()}
private stage(){return MILESTONES.reduce((s,m)=>this.unlocked>=m.value?m:s,MILESTONES[0])}
render(){const st=this.stage();return html`<img src="${st.uri}" class="w-40 mx-auto"><p class="mt-2">Nivel ${st.id} – Meta USDC ${st.value.toString()}</p>`}
}
