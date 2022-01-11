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
      <template v-slot:campo-produtosDoPedido="props">
        <iwt-master-detail
          titulo="Produtos do Pedido"
          @add="onAbrirSelector"
          :btn-editar="false"
          :columns="columns"
          height="50vh"
          hide-bottom
          selection="multiple"
          outlined
          v-model="props.objForm.produtosDoPedido"
          ref="iwtMasterDetail"
        />
      </template>
    </list-form>
    <iwt-selector
      @retorno="onAdicionarProdutoEmPedido"
      titulo="Produtos"
      :table-config="tableConfigSelector"
      :store-config="storeConfigSelector"
      ref="iwtSelector"
    />
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PedidoListIWT',
  data () {
    return {
      storeConfig: {
        modulo: 'cadastroPedidos',
        actionSave: 'adicionarPedido',
        actionDelete: 'deletarPedido',
        actionList: 'getPagePedidos',
        actionSetArrayPrincipal: 'setPedidos',
        arrayPrincipal: 'pedidosCadastrados'
      },
      tableConfig: {
        selection: 'multiple',
        listTitle: 'Pedidos'
      },
      storeConfigSelector: {
        modulo: 'cadastroProdutos',
        arrayPrincipal: 'produtosCadastrados',
        actionList: 'getPageProdutosSelector'
      },
      tableConfigSelector: {
        selection: 'multiple',
        serverSidePagination: true,
        listTitle: 'Produtos',
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
      dataConfig: {
        serverSidePagination: true,
        columns: [
          {
            name: 'codigoPedido',
            required: true,
            label: 'Código Pedido',
            field: 'codigoPedido',
            align: 'left',
            sortable: true
          },
          {
            name: 'cliente',
            required: true,
            label: 'Cliente',
            field: 'cliente',
            align: 'left',
            sortable: true
          },
          {
            name: 'dataEntrega',
            required: true,
            label: 'Data Entrega',
            field: 'dataEntrega',
            align: 'left',
            sortable: true,
            format: (val) => date.formatDate(val, 'DD/MM/YYYY')
          },
          {
            name: 'observacao',
            required: true,
            label: 'Observação',
            field: 'observacao',
            align: 'left',
            sortable: true
          }
        ]
      },
      formConfig: {
        novoObj: {
          id: 0,
          prdutosDoPedido: []
        },
        titleForm: 'Novo Pedido',
        minWidth: '60vw',
        campos: [
          {
            col: 6,
            dense: true,
            label: 'Código Pedido',
            propriedade: 'codigoPedido',
            required: true
          },
          {
            col: 6,
            dense: true,
            label: 'Cliente',
            propriedade: 'cliente',
            required: true
          },
          {
            col: 6,
            dense: true,
            label: 'Data de Entrega',
            propriedade: 'dataEntrega',
            tipoInput: 'date',
            required: true
          },
          {
            col: 6,
            dense: true,
            label: 'Observacao',
            propriedade: 'observacao'
          },
          {
            col: 12,
            useSlot: true,
            label: 'Produtos do Pedido',
            propriedade: 'produtosDoPedido',
            validacao: (objForm, reject) => {
              if (!objForm?.produtosDoPedido || objForm?.produtosDoPedido?.length === 0) {
                reject('Informe ao menos um produto para o pedido.')
              }
            }
          }
        ]
      },
      columns: [
        {
          name: 'produtoCodigoProduto',
          required: true,
          label: 'Código Produto',
          field: 'produtoCodigoProduto',
          align: 'left',
          sortable: true
        },
        {
          name: 'produtoDescricaoProduto',
          required: true,
          label: 'Nome Produto',
          field: 'produtoDescricaoProduto',
          align: 'left',
          sortable: true
        }
      ]
    }
  },
  methods: {
    onAbrirSelector () {
      this.$refs.iwtSelector.abrir()
    },
    onAdicionarProdutoEmPedido (produtos) {
      if (produtos?.length > 0) {
        this.$refs.iwtMasterDetail.adicionar(
          produtos.map((produto) => {
            return { id: 0, produtoId: produto.id, produtoCodigoProduto: produto.codigoProduto, produtoDescricaoProduto: produto.descricaoProduto }
          })
        )
      }
    }
  }
}
</script>
