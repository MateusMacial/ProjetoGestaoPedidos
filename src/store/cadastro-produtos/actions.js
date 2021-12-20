export function adicionarProduto (context, produto) {
  context.commit('addProduto', { produto })
}
export function editarProduto (context, produto) {
  context.commit('editProduto', { produto })
}
export function deletarProduto (context, produtos) {
  context.commit('deletProduto', { produtos })
}
