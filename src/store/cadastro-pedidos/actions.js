import { axiosInstance } from '../../boot/axios'

export async function carregarPedidos (context) {
  return axiosInstance.get('/pedidos').then(response => {
    const pedidos = response.data
    context.commit('loadPedidos', { pedidos })
    return response
  })
}

export async function carregarPedido (context, pedidoId) {
  return axiosInstance.get('/pedidos/find', { params: { id: pedidoId } })
    .then(response => {
      const pedido = response.data
      context.commit('loadPedido', { pedido })
      return response
    })
}

export async function adicionarPedido (context, pedido) {
  return axiosInstance.post('/pedidos/save', pedido)
    .then((response) => {
      context.commit('addPedido', { pedido: response.data })
      return response
    })
}

export async function editarPedido (context, pedido) {
  return axiosInstance.post('/pedidos/save', pedido)
    .then(() => {
      context.commit('editPedido', { pedido })
    })
}

export async function deletarPedido (context, pedidos) {
  pedidos.forEach(element => {
    return axiosInstance.delete('/pedidos/delete', { params: { id: element.id } })
      .then(() => {
      })
  })
  context.commit('deletPedido', { pedidos })
}
