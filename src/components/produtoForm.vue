<template>
  <q-dialog ref="dialog" persistent>
        <q-card style="min-width: 1200px">

        <q-card-section>
            <div class="text-h6">Cadastrar Produto</div>
        </q-card-section>

        <div class="row">
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="codProduto" autofocus label="Código do Produto"/>
          </div>
          <div class="col-6 q-pa-md">
              <q-input outlined v-model="nomeProduto" autofocus label="Nome do Produto"/>
          </div>
        </div>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat label="Adicionar Produto"
            @click="addProduto({codProduto, nomeProduto})"
            v-close-popup/>
        </q-card-actions>

        </q-card>
    </q-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      codProduto: '',
      nomeProduto: ''
    }
  },
  methods: {
    ...mapMutations('cadastroProdutos', ['addProduto']),
    abrir () {
      this.$refs.dialog.show()
    }
  }
}
</script>
