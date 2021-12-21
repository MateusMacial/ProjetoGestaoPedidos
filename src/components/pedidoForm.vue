<template>
  <q-dialog ref="dialog" persistent>
        <q-card style="min-width: 1200px">

        <q-card-section>
            <div class="text-h6">Cadastrar Produto</div>
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

        <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />

            <q-btn v-show="!editar" flat label="Adicionar Pedido" @click="adicionarPedido(objToEdit)" v-close-popup/>

            <q-btn v-show="editar" flat label="Editar Pedido" v-close-popup/>
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
    abrir (obj, editavel) {
      this.objToEdit = cloneDeep(obj)
      this.editar = editavel || false
      this.$refs.dialog.show()
    },
    ...mapActions('cadastroPedidos', ['adicionarPedido'])
  }
}
</script>

<style>

</style>
