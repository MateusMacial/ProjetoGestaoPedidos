export function adicionarPedido (context, pedido) {
  context.commit('addPedido', { pedido })
}
