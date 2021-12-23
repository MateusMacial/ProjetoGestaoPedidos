<template>
  <q-dialog ref="dialog" persistent @hide="limpar()">
    <q-card style="min-width: 1200px">
      <q-card-section>
          <div class="text-h6">Cadastrar Pedido</div>
      </q-card-section>

      <div class="row">
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.codPedido" autofocus label="Código do Pedido"/>
          </div>
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.nomeCliente" autofocus label="Nome do Cliente"/>
          </div>
      </div>
      <div class="row">
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.dataEntrega" autofocus label="Data de Entrega"/>
          </div>
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.observacao" autofocus label="Observação"/>
          </div>
      </div>

        <q-table
        title="Produtos"
        :data="objToEdit.produtosDoPedido"
        :columns="columns"
        row-key="uid"
        selection="multiple"
        :selected.sync="selected"
        :filter="filter">

          <template v-slot:top>

            <q-btn flat label="Adicionar Produto" color="primary" @click="abrirProdutoDoPedido()" />
            <q-btn flat label="Remover Produto" color="primary" :disable="!selected.length" @click="removerProdutoDoPedido(selected)"/>
            <produtoDoPedido ref="produtoDoPedido" @adicionarProdutoEmPedido="adicionarProdutoEmPedido"></produtoDoPedido>

            <q-space />

            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

          </template>

        </q-table>

      <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat icon="save" label="Salvar" @click="pedidoValidator"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import produtoDoPedido from '../components/produtoDoPedido.vue'
import { mapActions } from 'vuex'
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
  methods: {
    abrir (obj, editavel) {
      this.objToEdit = cloneDeep(obj)
      this.editar = editavel || false
      this.$refs.dialog.show()
    },
    abrirProdutoDoPedido () {
      this.$refs.produtoDoPedido.abrir(this.objToEdit.produtosDoPedido)
    },
    limpar () {
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
          return el.uid === item.uid
        })
        if (indexRemover !== -1) {
          this.objToEdit.produtosDoPedido.splice(indexRemover, 1)
        }
      })
      this.selected = []
    },
    pedidoValidator () {
      if (!this.objToEdit.codPedido) {
        this.$q.notify('O código do pedido é obrigatório')
      }
      if (!this.objToEdit.nomeCliente) {
        this.$q.notify('O nome do cliente é obrigatório')
      }
      if (!this.objToEdit.dataEntrega) {
        this.$q.notify('A data de entrega é obrigatória')
      }
      if (!this.objToEdit.produtosDoPedido.length) {
        this.$q.notify('Deve haver pelo menos um produto no pedido.')
      }
      if (this.objToEdit.codPedido && this.objToEdit.nomeCliente && this.objToEdit.dataEntrega && this.objToEdit.produtosDoPedido.length) {
        if (this.editar) {
          this.editarPedido({ ...this.objToEdit })
        } else {
          this.adicionarPedido(this.objToEdit)
        }
        this.$refs.dialog.hide()
      }
    },
    onEditarPedido () {
      this.editarPedido({ ...this.objToEdit })
    },
    ...mapActions('cadastroPedidos', ['adicionarPedido', 'editarPedido'])
  }
}
</script>
