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

      <br>

      <q-btn padding:15px round color="primary" icon="add" @click="addProduto" />

    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
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
        },
        {
          codProduto: '4243245',
          nomeProduto: 'Maça'
        },
        {
          codProduto: '23424',
          nomeProduto: 'Uva'
        }
      ]
    }
  },
  methods: {
    addProduto () {
      console.log(this.selected)
    }
  }
}
</script>
