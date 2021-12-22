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
        row-key="codPedido"
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
        @click="onDeletarPedido()"/>

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
          v-show="selected.length === 0"
          @click="abrir({produtosDoPedido: []})"/>

          <pedidoForm ref="pedidoForm"></pedidoForm>
        </div>
      </template>

    </div>
  </q-page>
</template>

<script>
import pedidoForm from '../components/pedidoForm.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pedidoList',
  components: { pedidoForm },
  data () {
    return {
      prompt: false,
      selected: [],
      filter: '',
      columns: [{
        name: 'codPedido',
        required: true,
        label: 'Código Pedido',
        field: 'codPedido',
        align: 'left',
        sortable: true
      },
      {
        name: 'nomeCliente',
        required: true,
        label: 'Cliente',
        field: 'nomeCliente',
        align: 'left',
        sortable: true
      },
      {
        name: 'dataEntrega',
        required: true,
        label: 'Data Entrega',
        field: 'dataEntrega',
        align: 'left',
        sortable: true
      },
      {
        name: 'observacao',
        required: true,
        label: 'Observação',
        field: 'observacao',
        align: 'left',
        sortable: true
      }]
    }
  },
  methods: {
    abrir (obj, editavel) {
      this.$refs.pedidoForm.abrir(obj, editavel)
    },
    onDeletarPedido () {
      this.deletarPedido(this.selected)
      this.selected = []
    },
    ...mapActions('cadastroPedidos', ['editarPedidos', 'deletarPedido'])
  },
  computed: {
    ...mapState('cadastroPedidos', ['pedidosCadastrados'])
  }
}
</script>
