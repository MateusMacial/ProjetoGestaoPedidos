import { uid } from 'quasar'

export function addPedido (state, payload) {
  state.pedidosCadastrados.push({ ...payload.pedido, uid: uid() })
}

export function editPedido (state, payload) {
  state.pedidosCadastrados.forEach(item => {
    if (item.uid === payload.pedido.uid) {
      item.codPedido = payload.pedido.codPedido
      item.nomeCliente = payload.pedido.nomeCliente
      item.dataEntrega = payload.pedido.dataEntrega
      item.observacao = payload.pedido.observacao
      item.produtosDoPedido = payload.pedido.produtosDoPedido
    }
  })
}

export function deletPedido (state, payload) {
  payload.pedidos.forEach(item => {
    const indexRemover = state.pedidosCadastrados.findIndex(el => {
      return el.uid === item.uid
    })
    if (indexRemover !== -1) {
      state.pedidosCadastrados.splice(indexRemover, 1)
    }
  })
}
