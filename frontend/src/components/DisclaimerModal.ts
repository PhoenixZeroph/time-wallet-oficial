import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'


@customElement('disclaimer-modal')
export class DisclaimerModal extends LitElement {
static styles = css`
:host { position: fixed; inset: 0; backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 50; }
.card { background:#0d0f0e; padding:1.5rem; border-radius:1rem; max-width:22rem; color:#e7e7e7; }
button { margin-top:1rem; background:#00f068; color:#000; padding:.5rem 1rem; border-radius:.5rem; font-weight:700; width:100%; }
`
@state() visible = !localStorage.getItem('acceptDisclaimer')
private accept() {
localStorage.setItem('acceptDisclaimer','true');
this.visible=false; this.dispatchEvent(new CustomEvent('accepted'))
}
render(){ if(!this.visible) return null;return html`<div class="card"><h2>Compromiso Time‑Wallet</h2><p>Usted acepta que a partir del día de la fecha asume un compromiso con su yo del futuro a fin de obtener algún beneficio económico; estos fondos quedarán sellados por 10 años. La recuperación por pérdida de wallet se gestionará mediante Lemon Cash.</p><button @click=${this.accept}>Acepto y deseo continuar</button></div>` }
}
