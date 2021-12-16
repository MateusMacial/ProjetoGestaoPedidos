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
          <q-btn round icon="add" color="primary" @click="prompt = true" />

            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 350px">

                <q-card-section>
                  <div class="text-h6">Cadastrar Produto</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-item-label header>Código do Produto</q-item-label>
                  <q-input dense v-model="codProduto" autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-item-label header>Nome do Produto</q-item-label>
                  <q-input dense v-model="nomeProduto" autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancelar" v-close-popup />
                  <q-btn flat label="Adicionar Produto" @click="addProduto" v-close-popup/>
                </q-card-actions>

              </q-card>
            </q-dialog>
        </div>
      </template>

    </div>
  </q-page>
</template>

<script>
export default {
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
    }
  }
}
</script>
