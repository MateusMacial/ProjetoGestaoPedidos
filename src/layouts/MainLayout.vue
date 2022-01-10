<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$refs.iwtDrawerRefs.abrirFechar()"
          v-if="$q.platform.is.mobile"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Projeto Gestão de Pedidos</div>
      </q-toolbar>
    </q-header>

    <iwt-drawer
      ref="iwtDrawerRefs"
      :categorias="categorias"
      :acessos="[]"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      leftDrawerOpen: false,
      categorias: [
        {
          nome: 'Paginas',
          entradas: [
            { to: '/', icon: 'mdi-account', label: 'Home' },
            { to: '/produtoList', icon: 'mdi-account', label: 'Produtos' },
            { to: '/pedidoList', icon: 'mdi-account', label: 'Pedidos' },
            { to: '/produtoListIWT', icon: 'mdi-account', label: 'Produtos(IWT)' },
            { to: '/pedidoListIWT', icon: 'mdi-account', label: 'Pedidos(IWT)' }
          ]
        }
      ]
    }
  }
}
</script>
