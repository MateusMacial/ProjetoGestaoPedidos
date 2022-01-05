export function loadProdutos (state, payload) {
  state.produtosCadastrados = payload.produtos
}

export function addProduto (state, payload) {
  state.produtosCadastrados.push(payload.produto)
}

export function editProduto (state, payload) {
  state.produtosCadastrados.forEach(item => {
    if (item.id === payload.produto.id) {
      item.codProduto = payload.produto.codProduto
      item.nomeProduto = payload.produto.nomeProduto
    }
  })
}

export function deletProduto (state, payload) {
  payload.produtos.forEach(item => {
    const indexRemover = state.produtosCadastrados.findIndex(el => {
      return el.id === item.id
    })
    if (indexRemover !== -1) {
      state.produtosCadastrados.splice(indexRemover, 1)
    }
  })
}
