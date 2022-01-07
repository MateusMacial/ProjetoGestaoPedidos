import { axiosInstance } from '../../boot/axios'

export async function getPagePedidos (context, pagination) {
  return axiosInstance.post('/pedidos/get-page', { page: (pagination.page - 1), rowsPerPage: pagination.rowsPerPage, sortBy: pagination.sortBy, descending: pagination.descending, filter: pagination.filter })
    .then(response => {
      context.commit('setPedidos', response.data.list)
      return response.data.rowsNumber
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
    })
}

export async function editarPedido (context, pedido) {
  return axiosInstance.post('/pedidos/save', pedido)
    .then(() => {
      context.commit('editPedido', { pedido })
    })
}

export async function deletarPedido (context, pedidos) {
  return axiosInstance.post('/pedidos/delete', { idsPedidosParaDeletar: pedidos.map(pedido => { return pedido.id }) })
    .then(() => {
      context.commit('deletPedido', { pedidos })
    })
}
