export function setPedidos (state, list) {
  state.pedidosCadastrados = list
}

export function loadPedido (state, payload) {
  state.pedido = payload.pedido
}

export function addPedido (state, payload) {
  state.pedidosCadastrados.push(payload.pedido)
}

export function editPedido (state, payload) {
  state.pedidosCadastrados.forEach(item => {
    if (item.id === payload.pedido.id) {
      item.codigoPedido = payload.pedido.codigoPedido
      item.cliente = payload.pedido.cliente
      item.dataEntrega = payload.pedido.dataEntrega
      item.observacao = payload.pedido.observacao
      item.produtosDoPedido = payload.pedido.produtosDoPedido
    }
  })
}

export function deletPedido (state, payload) {
  payload.pedidos.forEach(item => {
    const indexRemover = state.pedidosCadastrados.findIndex(el => {
      return el.id === item.id
    })
    if (indexRemover !== -1) {
      state.pedidosCadastrados.splice(indexRemover, 1)
    }
  })
}
