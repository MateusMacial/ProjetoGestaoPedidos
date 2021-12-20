<template>
  <q-dialog ref="dialog" persistent @hide="limparCampos()">
        <q-card style="min-width: 1200px">

        <q-card-section>
            <div class="text-h6">Cadastrar Produto</div>
        </q-card-section>

        <div class="row">
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.codProduto" autofocus label="Código do Produto"/>
          </div>
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="objToEdit.nomeProduto" autofocus label="Nome do Produto"/>
          </div>
        </div>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />

            <q-btn v-show="!editar" flat label="Adicionar Produto" @click="adicionarProduto(objToEdit)" v-close-popup/>

            <q-btn v-show="editar" flat label="Editar Produto" @click="editarProduto(objToEdit)" v-close-popup/>
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
    ...mapActions('cadastroProdutos', ['adicionarProduto', 'editarProduto']),
    abrir (obj, editavel) {
      this.objToEdit = cloneDeep(obj)
      this.editar = editavel || false
      this.$refs.dialog.show()
    },
    limparCampos () {
      this.codProduto = ''
      this.nomeProduto = ''
    }
  }
}
</script>
