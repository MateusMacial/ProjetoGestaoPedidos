<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Produtos"
        :data="produtosCadastrados"
        :columns="columns"
        row-key="uid"
        selection="multiple"
        :selected.sync="selected"
        :filter="filter"
      >

      <template v-slot:top>
        <q-btn color="primary"
        label="Editar"
        v-show="selected.length === 1"
        @click="abrir(selected[0], true)"/>

        <q-btn class="q-ml-sm"
        color="primary"
        label="Deletar"
        v-show="selected.length"
        @click="onDeletarProduto()"/>

        <q-space />

        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

      </template>

      </q-table>

      <template>
        <div class="q-pa-md q-gutter-sm">
          <q-btn round icon="add" color="primary"
          @click="abrir({})"
          v-show="selected.length === 0"/>
          <produtoForm ref="produtoForm"></produtoForm>
        </div>
        <div>
          <q-btn round icon="ok" color="primary" @click="select()"/>
        </div>
      </template>

    </div>
  </q-page>
</template>

<script>
import produtoForm from '../components/produtoForm.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { produtoForm },
  data () {
    return {
      prompt: false,
      selected: [],
      filter: '',
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
      this.$refs.produtoForm.abrir(obj, editavel)
    },
    select () {
      console.log(this.selected)
    },
    onDeletarProduto () {
      this.deletarProduto(this.selected)
      this.selected = []
    },
    ...mapActions('cadastroProdutos', ['editarProduto', 'deletarProduto'])
  },
  computed: {
    ...mapState('cadastroProdutos', ['produtosCadastrados'])
  }
}
</script>
