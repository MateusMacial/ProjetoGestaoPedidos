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
        selection="multiple"
        :selected.sync="selected"
        :filter="filter"
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
          @click="onDeletarPedido()"/>

        </template>

        <q-space />

        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

      </q-table>

      <template>
        <div class="q-pa-md q-gutter-sm">

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn round flat icon="add" color="primary" :disable="selected.length !== 0" @click="abrir({produtosDoPedido: []})"/>
          </q-page-sticky>

          <pedidoForm ref="pedidoForm"></pedidoForm>
        </div>
      </template>

    </div>
  </q-page>
</template>

<script>
import pedidoForm from '../components/pedidoForm.vue'
import { mapState, mapActions } from 'vuex'
// import { date } from 'quasar'

export default {
  name: 'pedidoList',
  components: { pedidoForm },
  data () {
    return {
      prompt: false,
      selected: [],
      filter: '',
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
      /* {
        name: 'dataEntrega',
        required: true,
        label: 'Data Entrega',
        field: 'dataEntrega',
        align: 'left',
        sortable: true,
        format: (val) => date.formatDate(val, 'DD/MM/YYYY')
      } */
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
      ]
    }
  },
  methods: {
    abrir (obj, editavel) {
      this.$refs.pedidoForm.abrir(obj, editavel)
      this.selected = []
    },
    onDeletarPedido () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Deseja realmente excluir?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deletarPedido(this.selected)
        this.selected = []
      })
    },
    ...mapActions('cadastroPedidos', ['editarPedidos', 'deletarPedido', 'carregarPedidos'])
  },
  computed: {
    ...mapState('cadastroPedidos', ['pedidosCadastrados'])
  },
  mounted () {
    this.carregarPedidos()
  }
}
</script>
