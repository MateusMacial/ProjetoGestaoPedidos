<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Produtos</div>
      </q-card-section>

      <q-table
        title="Produtos"
        :data="produtosCadastrados"
        :columns="columns"
        row-key="id"
        :pagination.sync="paginationProduto"
        :filter="paginationProduto.filter.filter"
        @request="onListProdutos"
        :loading="loadingProdutos"
        selection="multiple"
        :selected.sync="selected"
      >

      <template v-slot:top-selection>
        <q-btn color="primary"
        flat
        icon="edit"
        :disable="selected.length !== 1"
        @click="abrir(selected[0], true)"/>

        <q-btn class="q-ml-sm"
        color="primary"
        flat
        icon="delete"
        :disable="!selected.length"
        @click="onDeletarProduto()"/>
      </template>

      <q-space />

      <template v-slot:top-right>
        <q-input outlined dense debounce="300" v-model="paginationProduto.filter.filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      </q-table>

      <template>
        <div class="q-pa-md q-gutter-sm">

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn round flat icon="add" color="primary" :disable="selected.length !== 0" @click="abrir({})"/>
          </q-page-sticky>

          <produtoForm ref="produtoForm"></produtoForm>
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
      loadingProdutos: false,
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
      ],
      paginationProduto: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 10,
        filter: {
          filter: ''
        }
      }
    }
  },
  methods: {
    abrir (obj, editavel) {
      this.$refs.produtoForm.abrir(obj, editavel)
      this.selected = []
    },
    onDeletarProduto () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Deseja realmente excluir?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deletarProduto(this.selected)
        this.selected = []
      })
    },
    onListProdutos (props) {
      this.loadingProdutos = true
      this.getPageProdutos(props.pagination).then((rowsNumber) => {
        this.$updatePagination(this.paginationProduto, { ...props.pagination, rowsNumber })
      }).finally(() => {
        this.loadingProdutos = false
      })
    },
    ...mapActions('cadastroProdutos', ['editarProduto', 'deletarProduto', 'getPageProdutos'])
  },
  beforeMount () {
    this.onListProdutos({ pagination: this.paginationProduto })
  },
  computed: {
    ...mapState('cadastroProdutos', ['produtosCadastrados'])
  }
}
</script>
