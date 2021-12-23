<template>
  <q-dialog ref="dialog" persistent @hide="limpar()">
    <q-card style="min-width: 60vw; border-radius: 10px">

      <div class="q-pa-md">
        <q-table
        title="Produtos Cadastrados"
        :data="produtosCadastrados"
        :columns="columns"
        row-key="uid"
        selection="multiple"
        :selected.sync="selected"
        :filter="filter">

        </q-table>
      </div>

      <q-card align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar ao Pedido" :disable="!selected.length" @click="adicionarProdutoEmPedido"/>
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
      produtosDoPedido: [],
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
    abrir (produtosDoPedido) {
      this.$refs.dialog.show()
      this.produtosDoPedido = produtosDoPedido
    },
    limpar () {
      this.selected = []
    },
    adicionarProdutoEmPedido () {
      let count = 0
      this.selected.forEach(item => {
        if (this.produtosDoPedido.find(el => el.uid === item.uid)) {
          count++
        }
      })
      if (count === 0) {
        this.$emit('adicionarProdutoEmPedido', this.selected)
        this.$refs.dialog.hide()
      } else {
        this.$q.notify('Não é permitido ter produtos repetidos em um pedido.')
      }
    }
  }
}
</script>
