<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Produtos"
        :data="data"
        :columns="columns"
        row-key="codProduto"
        selection="multiple"
        :selected.sync="selected"
        :filter="filter"
      >

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      </q-table>

      <template>
        <div class="q-pa-md q-gutter-sm">
          <q-btn round icon="add" color="primary" @click="abrir()"/>
          <produtoForm ref="produtoForm"></produtoForm>
        </div>
      </template>

    </div>
    <div>
      <p>Bem vindo... {{this.nomeUser}}</p>
    </div>

  </q-page>
</template>

<script>
import produtoForm from '../components/produtoForm.vue'

export default {
  components: { produtoForm },
  data () {
    return {
      prompt: false,
      codProduto: '',
      nomeProduto: '',
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
      ],
      data: [
        {
          codProduto: '0124',
          nomeProduto: 'Banana'
        }
      ]
    }
  },
  methods: {
    addProduto () {
      this.data.push({ codProduto: this.codProduto, nomeProduto: this.nomeProduto })
      this.codProduto = ''
      this.nomeProduto = ''
    },
    abrir () {
      this.$refs.produtoForm.abrir()
    }
  },
  computed: {
    nomeUser: {
      get () {
        return this.$store.state.example.name
      }
    }
  }
}
</script>
