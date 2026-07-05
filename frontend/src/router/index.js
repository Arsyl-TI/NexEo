import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/VideoHome.vue')
  },
  {
    path: '/video/:id',
    name: 'VideoPlayer',
    component: () => import('@/views/VideoPlayer.vue')
  },
  {
    path: '/share',
    name: 'FileShare',
    component: () => import('@/views/FileShare.vue')
  },
  {
    path: '/novels',
    name: 'NovelLibrary',
    component: () => import('@/views/NovelLibrary.vue')
  },
  {
    path: '/novels/:slug',
    name: 'NovelDetail',
    component: () => import('@/views/NovelDetail.vue')
  },
  {
    path: '/novels/:slug/:chapter',
    name: 'NovelReader',
    component: () => import('@/views/NovelReader.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
