import { axiosInstance } from '../../boot/axios'

/* export async function actionSave (context, obj) {
  return axiosInstance.post('/cliente/save', obj)
    .then((response) => {
      return response
    }).catch((error) => {
      throw new ErrorTratado(error)
    })
} */

export async function carregarProdutos (context) {
  return axiosInstance.get('/produtos/get-page')
    .then((response) => {
      const produtos = response.data
      context.commit('loadProdutos', { produtos })
      return response
    })
}

export async function adicionarProduto (context, produto) {
  return axiosInstance.post('/produtos/save', produto)
    .then(() => {
      context.commit('addProduto', { produto })
    })
}

export async function editarProduto (context, produto) {
  return axiosInstance.post('/produtos/save', produto)
    .then(() => {
      context.commit('editProduto', { produto })
    })
}

export async function deletarProduto (context, produtos) {
  return axiosInstance.post('/produtos/delete', { idsProdutosParaDeletar: produtos.map(produto => { return produto.id }) })
    .then(() => {
      context.commit('deletProduto', { produtos })
    })
}
