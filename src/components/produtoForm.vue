<template>
  <q-dialog ref="dialog" persistent @hide="limparCampos()">
        <q-card style="min-width: 60vw; border-radius: 10px">

        <q-card-section>
            <div class="text-h6">Cadastrar Produto</div>
        </q-card-section>

        <div class="row">
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.codigoProduto" autofocus label="Código do Produto"/>
          </div>
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.descricaoProduto" autofocus label="Nome do Produto"/>
          </div>
        </div>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat icon="save" @click="produtoValidator"/>
        </q-card-actions>

        </q-card>
    </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  data () {
    return {
      objToEdit: {},
      editar: false
    }
  },
  methods: {
    ...mapActions('cadastroProdutos', ['adicionarProduto', 'editarProduto', 'getPageProdutos']),
    abrir (obj, editavel) {
      this.objToEdit = cloneDeep(obj)
      this.editar = editavel || false
      this.$refs.dialog.show()
    },
    limparCampos () {
      // this.getPageProdutos()
      this.codigoProduto = ''
      this.descricaoProduto = ''
    },
    produtoValidator () {
      if (!this.objToEdit.codigoProduto) {
        this.$q.notify('O código do produto é obrigatório')
      }
      if (!this.objToEdit.descricaoProduto) {
        this.$q.notify('O nome do produto é obrigatório')
      }
      if (this.objToEdit.codigoProduto && this.objToEdit.descricaoProduto) {
        if (this.editar) {
          this.editarProduto(this.objToEdit)
        } else {
          this.adicionarProduto(this.objToEdit)
        }
        this.$refs.dialog.hide()
      }
    }
  }
}
</script>
