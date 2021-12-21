import { uid } from 'quasar'

export function addPedido (state, payload) {
  state.pedidosCadastrados.push({ ...payload.pedido, uid: uid() })
  console.log(state)
}
