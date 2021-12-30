<template>
  <q-dialog ref="dialog" persistent @hide="limpar()">
    <q-card style="min-width: 60vw; border-radius: 10px">
      <q-card-section>
          <div class="text-h6">Cadastrar Pedido</div>
      </q-card-section>

      <div class="row">
        <div class="col-6 q-pa-md">
            <q-input outlined v-model="objToEdit.codigoPedido" autofocus label="Código do Pedido"/>
        </div>
        <div class="col-6 q-pa-md">
            <q-input outlined v-model="objToEdit.cliente" autofocus label="Nome do Cliente"/>
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-pa-md">
            <!-- <q-input outlined v-model="objToEdit.dataEntrega" autofocus label="Data de Entrega"/> -->
            <q-datetime-picker outlined mode="date" label="Data de Entrega" v-model="objToEdit.dataEntrega" clearable></q-datetime-picker>
        </div>
        <div class="col-6 q-pa-md">
            <q-input outlined v-model="objToEdit.observacao" autofocus label="Observação"/>
        </div>
      </div>

      <div class="q-pa-md">

        <q-table
        title="Produtos"
        :data="objToEdit.produtosDoPedido"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :selected.sync="selected"
        :filter="filter">

          <template v-slot:top-selection>
            <q-btn flat label="Remover Produto" color="primary" :disable="!selected.length" @click="removerProdutoDoPedido(selected)"/>
          </template>

          <q-space />

          <template v-slot:top-right>
            <div class="q-mr-xl">
              <q-btn flat label="Adicionar Produto" color="primary" @click="abrirProdutoDoPedido()"/>
            </div>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Pesquisar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

        </q-table>
      </div>
      <produtoDoPedido ref="produtoDoPedido" @adicionarProdutoEmPedido="adicionarProdutoEmPedido"></produtoDoPedido>

      <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat icon="save" @click="pedidoValidator"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import produtoDoPedido from '../components/produtoDoPedido.vue'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  components: { produtoDoPedido },
  data () {
    return {
      prompt: false,
      selected: [],
      filter: '',
      objToEdit: {},
      editar: false,
      produtosDoPedido: [],
      columns: [{
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
    }
  },
  methods: {
    abrir (obj, editavel) {
      if (!editavel) {
        this.objToEdit = cloneDeep(obj)
      } else {
        this.carregarPedido(obj.id).then(() => {
          console.log('b', this.pedido)
          this.objToEdit = cloneDeep(this.pedido)
        })
      }
      this.editar = editavel || false
      this.$refs.dialog.show()
    },
    abrirProdutoDoPedido () {
      this.$refs.produtoDoPedido.abrir(this.objToEdit.produtosDoPedido)
    },
    limpar () {
      this.carregarPedidos()
      this.objToEdit = { produtosDoPedido: [] }
    },
    adicionarProdutoEmPedido (produtos) {
      if (!this.objToEdit.produtosDoPedido) {
        this.$set(this.objToEdit, 'produtosDoPedido', [])
      }
      this.objToEdit.produtosDoPedido.push(...produtos)
    },
    removerProdutoDoPedido (produtosParaRemover) {
      produtosParaRemover.forEach(item => {
        const indexRemover = this.objToEdit.produtosDoPedido.findIndex(el => {
          return el.id === item.id
        })
        if (indexRemover !== -1) {
          this.objToEdit.produtosDoPedido.splice(indexRemover, 1)
        }
      })
      this.selected = []
    },
    pedidoValidator () {
      if (!this.objToEdit.codigoPedido) {
        this.$q.notify('O código do pedido é obrigatório')
      }
      if (!this.objToEdit.cliente) {
        this.$q.notify('O nome do cliente é obrigatório')
      }
      if (!this.objToEdit.dataEntrega) {
        this.$q.notify('A data de entrega é obrigatória')
      }
      if (!this.objToEdit.produtosDoPedido.length) {
        this.$q.notify('Deve haver pelo menos um produto no pedido.')
      }
      if (this.objToEdit.codigoPedido && this.objToEdit.cliente && this.objToEdit.dataEntrega && this.objToEdit.produtosDoPedido.length) {
        if (this.editar) {
          this.editarPedido(this.objToEdit)
        } else {
          this.adicionarPedido(this.objToEdit)
        }
        this.$refs.dialog.hide()
      }
    },
    ...mapActions('cadastroPedidos', ['adicionarPedido', 'editarPedido', 'carregarPedidos', 'carregarPedido'])
  },
  computed: {
    ...mapState('cadastroPedidos', ['pedidosCadastrados', 'pedido'])
  }
}
</script>
