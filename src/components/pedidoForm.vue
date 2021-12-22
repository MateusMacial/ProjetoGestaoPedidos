<template>
  <q-dialog ref="dialog" persistent @hide="limpar()">
        <q-card style="min-width: 1200px">

            <q-card-section>
                <div class="text-h6">Cadastrar Pedido</div>
            </q-card-section>

            <div class="row">
                <div class="col-3 q-pa-md">
                    <q-input outlined v-model="objToEdit.codPedido" autofocus label="Código do Pedido"/>
                </div>
                <div class="col-3 q-pa-md">
                    <q-input outlined v-model="objToEdit.nomeCliente" autofocus label="Nome do Cliente"/>
                </div>
                <div class="col-3 q-pa-md">
                    <q-input outlined v-model="objToEdit.dataEntrega" autofocus label="Data de Entrega"/>
                </div>
                <div class="col-3 q-pa-md">
                    <q-input outlined v-model="objToEdit.observacao" autofocus label="Observação"/>
                </div>
            </div>

            <q-table
            title="Pedidos"
            :data="novoOuEdicao()"
            :columns="columns"
            row-key="uid"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter">
            </q-table>

            <template>
                <div class="q-pa-md q-gutter-sm">
                    <q-btn flat label="Adicionar Produto" color="primary" @click="abrirProdutoDoPedido()" />

                    <q-btn flat label="Remover Produto" color="primary" @click="removerProdutoDoPedido(selected)" v-show="selected.length" />

                    <produtoDoPedido ref="produtoDoPedido" @adicionarProdutoEmPedido="adicionarProdutoEmPedido"></produtoDoPedido>
                </div>
            </template>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />

                <q-btn v-show="!editar" flat label="Adicionar Pedido" @click="adicionarPedido({...objToEdit, produtosDoPedido})" v-close-popup/>

                <q-btn v-show="editar" flat label="Editar Pedido" @click="editarPedido({...objToEdit})"  v-close-popup/>
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
    novoOuEdicao () {
      if (this.editar) {
        return this.objToEdit.produtosDoPedido
      } else {
        return this.produtosDoPedido
      }
    },
    abrirProdutoDoPedido () {
      this.$refs.produtoDoPedido.abrir()
    },
    limpar () {
      this.produtosDoPedido = []
    },
    adicionarProdutoEmPedido (produtos) {
      if (this.editar) {
        this.objToEdit.produtosDoPedido.push(...produtos)
      } else {
        this.produtosDoPedido.push(...produtos)
      }
    },
    removerProdutoDoPedido (produtosParaRemover) {
      if (this.editar) {
        produtosParaRemover.forEach(item => {
          const indexRemover = this.objToEdit.produtosDoPedido.findIndex(el => {
            return el.uid === item.uid
          })
          if (indexRemover !== -1) {
            this.objToEdit.produtosDoPedido.splice(indexRemover, 1)
          }
        })
        this.selected = []
      } else {
        produtosParaRemover.forEach(item => {
          const indexRemover = this.produtosDoPedido.findIndex(el => {
            return el.uid === item.uid
          })
          if (indexRemover !== -1) {
            this.produtosDoPedido.splice(indexRemover, 1)
          }
        })
      }
    },
    ...mapActions('cadastroPedidos', ['adicionarPedido', 'editarPedido'])
  }
}
</script>
