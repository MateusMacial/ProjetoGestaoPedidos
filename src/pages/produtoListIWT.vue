<template>
  <q-page padding>
    <list-form
      :table-config="tableConfig"
      :data-config="dataConfig"
      :store-config="storeConfig"
      :form-config="formConfig"
      ref="ListForm"
      max-height="20vh"
      min-height="20vh"
      outlined
    >
    </list-form>
  </q-page>
</template>

<script>
export default {
  name: 'ProdutoListIWT',
  data () {
    return {
      storeConfig: {
        modulo: 'cadastroProdutos',
        actionSave: 'adicionarProduto',
        actionDelete: 'deletarProduto',
        actionList: 'getPageProdutos',
        actionSetArrayPrincipal: 'setProdutos',
        arrayPrincipal: 'produtosCadastrados'
      },
      tableConfig: {
        selection: 'multiple',
        listTitle: 'Produtos'
      },
      dataConfig: {
        serverSidePagination: true,
        columns: [
          {
            name: 'codigoProduto',
            required: true,
            label: 'Código Produto',
            field: 'codigoProduto',
            align: 'left',
            sortable: true
          },
          {
            name: 'descricaoProduto',
            required: true,
            label: 'Nome Produto',
            field: 'descricaoProduto',
            align: 'left',
            sortable: true
          }
        ]
      },
      formConfig: {
        novoObj: {
          id: 0
        },
        titleForm: 'Novo Produto',
        campos: [
          {
            col: 6,
            dense: true,
            label: 'Código Produto',
            propriedade: 'codigoProduto',
            required: true
          },
          {
            col: 6,
            dense: true,
            label: 'Descrição Produto',
            propriedade: 'descricaoProduto',
            required: true
          }
        ]
      }
    }
  },
  methods: {}
}
</script>
