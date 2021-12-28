import api from 'src/services/api'

export function carregarProdutos (context) {
  api.get('/produtos').then(response => {
    const produtos = response.data
    context.commit('loadProdutos', { produtos })
  })
}

export function adicionarProduto (context, produto) {
  api.post('/produtos', produto).then(() => {
    context.commit('addProduto', { produto })
  })
}

export function editarProduto (context, produto) {
  api.post('/produtos/update', produto).then(() => {
    context.commit('editProduto', { produto })
  })
}

export function deletarProduto (context, produtos) {
  produtos.forEach(element => {
    api.delete('/produtos/delete', { params: { id: element.id } }).then(() => {
    })
  })
  context.commit('deletProduto', { produtos })
}
