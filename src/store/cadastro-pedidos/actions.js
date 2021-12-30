import api from 'src/services/api'

export function carregarPedidos (context) {
  api.get('/pedidos').then(response => {
    const pedidos = response.data
    context.commit('loadPedidos', { pedidos })
  })
}

export function adicionarPedido (context, pedido) {
  api.post('/pedidos', pedido).then((response) => {
    context.commit('addPedido', { pedido: response.data })
  })
}

export function editarPedido (context, pedido) {
  api.post('/pedidos/update', pedido).then(() => {
    context.commit('editPedido', { pedido })
  })
}

export function deletarPedido (context, pedidos) {
  pedidos.forEach(element => {
    api.delete('/pedidos/delete', { params: { id: element.id } }).then(() => {
    })
  })
  context.commit('deletPedido', { pedidos })
}
