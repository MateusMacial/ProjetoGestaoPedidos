
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'produtoList', component: () => import('pages/produtoList.vue') },
      { path: 'pedidoList', component: () => import('pages/pedidoList.vue') },
      { path: 'produtoListIWT', component: () => import('pages/produtoListIWT.vue') },
      { path: 'pedidoListIWT', component: () => import('pages/pedidoListIWT.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
