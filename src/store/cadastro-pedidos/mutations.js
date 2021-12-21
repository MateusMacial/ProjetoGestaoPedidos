import { uid } from 'quasar'

export function addProduto (state, payload) {
  state.produtosCadastrados.push({ ...payload.produto, uid: uid() })
}

export function editProduto (state, payload) {
  console.log(state.produtosCadastrados)
  console.log(payload.produto)

  state.produtosCadastrados.forEach(item => {
    if (item.uid === payload.produto.uid) {
      item.codProduto = payload.produto.codProduto
      item.nomeProduto = payload.produto.nomeProduto
    }
  })
}

export function deletProduto (state, payload) {
  payload.produtos.forEach(item => {
    const indexRemover = state.produtosCadastrados.findIndex(el => {
      return el.uid === item.uid
    })
    if (indexRemover !== -1) {
      state.produtosCadastrados.splice(indexRemover, 1)
    }
  })
  console.log(state.produtosCadastrados)
}
