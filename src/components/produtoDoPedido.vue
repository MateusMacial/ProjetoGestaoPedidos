<template>
  <q-dialog ref="dialog" persistent @hide="limpar()">
      <q-card style="min-width: 1200px">
            <q-table
            title="Produtos Cadastrados"
            :data="produtosCadastrados"
            :columns="columns"
            row-key="uid"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter">

            </q-table>

            <q-card align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn v-show="selected.length" flat label="Adicionar ao Pedido" @click="adicionarProdutoEmPedido()" v-close-popup/>
            </q-card>
        </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      prompt: false,
      selected: [],
      filter: '',
      columns: [{
        name: 'codProduto',
        required: true,
        label: 'Código Produto',
        field: 'codProduto',
        align: 'left',
        sortable: true
      },
      {
        name: 'nomeProduto',
        required: true,
        label: 'Nome Produto',
        field: 'nomeProduto',
        align: 'left',
        sortable: true
      }
      ]
    }
  },
  computed: {
    ...mapState('cadastroProdutos', ['produtosCadastrados'])
  },
  methods: {
    abrir () {
      this.$refs.dialog.show()
    },
    limpar () {
      this.selected = []
    },
    adicionarProdutoEmPedido () {
      this.$emit('adicionarProdutoEmPedido', this.selected)
    }
  }
}
</script>
