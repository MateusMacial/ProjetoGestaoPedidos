import { axiosInstance } from '../../boot/axios'

export function setProdutos (context, obj) {
  context.commit('setProdutos', obj)
}

export async function getPageProdutos (context, pagination) {
  return axiosInstance.post('/produtos/get-page', { page: (pagination.page - 1), rowsPerPage: pagination.rowsPerPage, sortBy: pagination.sortBy, descending: pagination.descending, filter: pagination.filter })
    .then((response) => {
      context.commit('setProdutos', response.data.list)
      return response.data.rowsNumber
    })
}

export async function getPageProdutosSelector (context, pagination) {
  return axiosInstance.post('/produtos/get-page', { page: (pagination.page - 1), rowsPerPage: pagination.rowsPerPage, sortBy: pagination.sortBy, descending: pagination.descending, filter: pagination.filter })
    .then((response) => {
      context.commit('setProdutos', response.data.list)
      return response.data.list
    })
}

export async function adicionarProduto (context, produto) {
  return axiosInstance.post('/produtos/save', produto)
    .then((response) => {
      // context.commit('addProduto', { produto })
      return response.data
    })
}

export async function editarProduto (context, produto) {
  return axiosInstance.post('/produtos/save', produto)
    .then(() => {
      context.commit('editProduto', { produto })
    })
}

export async function deletarProduto (context, obj) {
  return axiosInstance.post('/produtos/delete', { idsProdutosParaDeletar: obj.ids })
    .then((response) => {
      // context.commit('deletProduto', { obj })
      return response.data
    })
}
