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
          <iwt-date-time outlined mode="date" label="Data de Entrega" v-model="objToEdit.dataEntrega" clearable></iwt-date-time>
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
        row-key="produtoId"
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
    abrir (obj, editavel) {
      if (!editavel) {
        this.objToEdit = cloneDeep(obj)
      } else {
        this.carregarPedido(obj.id).then(() => {
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
      this.$emit('fechar')
      this.objToEdit = { produtosDoPedido: [] }
    },
    adicionarProdutoEmPedido (produtos) {
      if (!this.objToEdit.produtosDoPedido) {
        this.$set(this.objToEdit, 'produtosDoPedido', [])
      }
      this.objToEdit.produtosDoPedido.push(...produtos.map((produto) => {
        return { id: 0, produtoId: produto.id, produtoCodigoProduto: produto.codigoProduto, produtoDescricaoProduto: produto.descricaoProduto }
      }))
    },
    removerProdutoDoPedido (produtosParaRemover) {
      produtosParaRemover.forEach(item => {
        const indexRemover = this.objToEdit.produtosDoPedido.findIndex(el => {
          return el.produtoId === item.produtoId
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
          this.$q.loading.show({
            message: 'Salvando pedido.'
          })
          this.editarPedido(this.objToEdit)
            .then(() => {
              this.$q.notify({
                message: 'Pedido salvo.',
                color: 'green'
              })
              this.$refs.dialog.hide()
            })
            .catch(() => {
              this.$q.notify({
                message: 'Falha em salvar pedido.',
                color: 'red'
              })
            })
            .finally(() => {
              this.$q.loading.hide()
            })
        } else {
          this.$q.loading.show({
            message: 'Salvando pedido.'
          })
          this.adicionarPedido(this.objToEdit)
            .then(() => {
              this.$q.notify({
                message: 'Pedido salvo.',
                color: 'green'
              })
              this.$refs.dialog.hide()
            })
            .catch(() => {
              this.$q.notify({
                message: 'Falha em salvar pedido.',
                color: 'red'
              })
            })
            .finally(() => {
              this.$q.loading.hide()
            })
        }
        this.$refs.dialog.hide()
      }
    },
    ...mapActions('cadastroPedidos', ['adicionarPedido', 'editarPedido', 'carregarPedido'])
  },
  computed: {
    ...mapState('cadastroPedidos', ['pedidosCadastrados', 'pedido'])
  }
}
</script>
