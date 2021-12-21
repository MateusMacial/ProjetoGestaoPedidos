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
            :data="produtosDoPedido"
            :columns="columns"
            row-key="uid"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter">
            </q-table>

            <template>
                <div class="q-pa-md q-gutter-sm">
                    <q-btn flat label="Adicionar Produto" color="primary" @click="abrirProdutoDoPedido()" />
                    <produtoDoPedido ref="produtoDoPedido" @adicionarProdutoEmPedido="adicionarProdutoEmPedido"></produtoDoPedido>
                </div>
            </template>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />

                <q-btn v-show="!editar" flat label="Adicionar Pedido" @click="adicionarPedido({...objToEdit, produtosDoPedido})" v-close-popup/>

                <q-btn v-show="editar" flat label="Editar Pedido" v-close-popup/>
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
      this.$refs.produtoDoPedido.abrir()
    },
    adicionarProdutoEmPedido (produtos) {
      this.produtosDoPedido.push(...produtos)
    },
    limpar () {
      this.produtosDoPedido = []
    },
    ...mapActions('cadastroPedidos', ['adicionarPedido'])
  }
}
</script>

<style>

</style>
