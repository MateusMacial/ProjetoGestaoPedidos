import { axiosInstance } from '../../boot/axios'

/* export async function actionSave (context, obj) {
  return axiosInstance.post('/cliente/save', obj)
    .then((response) => {
      return response
    }).catch((error) => {
      throw new ErrorTratado(error)
    })
} */

/* export async function carregarProdutos (context) {
  return axiosInstance.get('/produtos/get-all')
    .then((response) => {
      const produtos = response.data
      context.commit('loadProdutos', { produtos })
      return response
    })
} */

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
