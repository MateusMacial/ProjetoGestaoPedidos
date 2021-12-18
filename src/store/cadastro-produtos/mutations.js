export function addProduto (state, payload) {
  state.produtosCadastrados.push({ codProduto: payload.codProduto, nomeProduto: payload.nomeProduto })
}
