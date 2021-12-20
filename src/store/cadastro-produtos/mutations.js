export function addProduto (state, payload) {
  state.produtosCadastrados.push(payload.produto)
}
export function editProduto (state, payload) {

}
export function deletProduto (state, payload) {
  payload.produtos.forEach(item => {
    const indexRemover = state.produtosCadastrados.findIndex(el => {
      return el.codProduto === item.codProduto
    })
    if (indexRemover !== -1) {
      state.produtosCadastrados.splice(indexRemover, 1)
    }
  })
}
