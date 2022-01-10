<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Pedidos</div>
      </q-card-section>

      <q-table
        title="Pedidos"
        :data="pedidosCadastrados"
        :columns="columns"
        row-key="id"
        :pagination.sync="paginationPedido"
        :filter="paginationPedido.filter.filter"
        @request="onListPedidos"
        :loading="loadingPedidos"
        selection="multiple"
        :selected.sync="selected"
      >

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:top-selection>

          <q-btn color="primary"
          flat
          icon="edit"
          :disable="selected.length !== 1"
          @click="onOpenPedidoForm"/>

          <q-btn class="q-ml-sm"
          color="primary"
          flat
          icon="delete"
          :disable="!selected.length"
          @click="onDeletarPedido()"/>

        </template>

        <q-space />

        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="paginationPedido.filter.filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

      </q-table>

      <template>
        <div class="q-pa-md q-gutter-sm">

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn round flat icon="add" color="primary" :disable="selected.length !== 0" @click="onOpenPedidoForm"/>
          </q-page-sticky>

          <pedidoForm ref="pedidoForm" @fechar="onListPedidos({ pagination: paginationPedido })"></pedidoForm>
        </div>
      </template>

    </div>
  </q-page>
</template>

<script>
import pedidoForm from '../components/pedidoForm.vue'
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'pedidoList',
  components: { pedidoForm },
  data () {
    return {
      prompt: false,
      selected: [],
      loadingPedidos: false,
      columns: [{
        name: 'codigoPedido',
        required: true,
        label: 'Código Pedido',
        field: 'codigoPedido',
        align: 'left',
        sortable: true
      },
      {
        name: 'cliente',
        required: true,
        label: 'Cliente',
        field: 'cliente',
        align: 'left',
        sortable: true
      },
      {
        name: 'dataEntrega',
        required: true,
        label: 'Data Entrega',
        field: 'dataEntrega',
        align: 'left',
        sortable: true,
        format: (val) => date.formatDate(val, 'DD/MM/YYYY')
      },
      {
        name: 'observacao',
        required: true,
        label: 'Observação',
        field: 'observacao',
        align: 'left',
        sortable: true
      },
      {
        name: 'id',
        required: true,
        label: 'Id',
        field: 'id',
        align: 'left',
        sortable: true
      }
      ],
      paginationPedido: {
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
    ...mapActions('cadastroPedidos', ['editarPedidos', 'deletarPedido', 'getPagePedidos']),
    onOpenPedidoForm () {
      if (this.selected.length) {
        this.$refs.pedidoForm.abrir(this.selected[0], true)
        this.selected = []
      } else {
        this.$refs.pedidoForm.abrir({ produtosDoPedido: [] }, false)
        this.selected = []
      }
    },
    onDeletarPedido () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Deseja realmente excluir?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Excluindo pedido.'
        })
        this.deletarPedido(this.selected)
          .then(() => {
            this.$q.notify({
              message: 'Pedido excluido.',
              color: 'green'
            })
            this.selected = []
          })
          .catch(() => {
            this.$q.notify({
              message: 'Falha em excluir pedido.',
              color: 'red'
            })
          })
          .finally(() => {
            this.$q.loading.hide()
          })
      })
    },
    onListPedidos (props) {
      this.loadingPedidos = true
      this.getPagePedidos(props.pagination).then((rowsNumber) => {
        this.$updatePagination(this.paginationPedido, { ...props.pagination, rowsNumber })
      }).catch(() => {
        this.$q.notify({
          message: 'Falha em carregar pedidos.',
          color: 'red'
        })
      }).finally(() => {
        this.loadingPedidos = false
      })
    }
  },
  beforeMount () {
    this.onListPedidos({ pagination: this.paginationPedido })
  },
  computed: {
    ...mapState('cadastroPedidos', ['pedidosCadastrados'])
  }
}
</script>
