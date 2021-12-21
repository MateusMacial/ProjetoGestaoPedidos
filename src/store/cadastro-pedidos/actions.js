export function adicionarPedido (context, pedido) {
  context.commit('addPedido', { pedido })
}

export function editarPedido (context, pedido) {
  context.commit('editPedido', { pedido })
}

export function deletarPedido (context, pedidos) {
  context.commit('deletPedido', { pedidos })
}
