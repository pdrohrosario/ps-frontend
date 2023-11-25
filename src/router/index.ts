import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
import PesquisaPaisView from '@/views/PesquisaPaisView.vue'
import PerfilUsuarioView from '@/views/PerfilUsuarioView.vue'
import FeedbackRequestView from '@/views/FeedbackRequestView.vue'
import FeedbackResponseView from '@/views/FeedbackResponseView.vue'
import PesquisaProfessorView from '@/views/PesquisaProfessorView.vue'
import { useUsuarioStore } from '../stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/pais',
      name: 'pais',
      component: PesquisaPaisView,
      meta: { requiresAuth: true },
    },
    {
      path: '/professores',
      name: 'professores',
      component: PesquisaProfessorView,
      meta: { requiresAuth: true },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilUsuarioView,
      meta: { requiresAuth: true},
    },
    {
      path: '/feedback/solicitacao',
      name: 'solicitar-feedback',
      component: FeedbackRequestView,
      meta: { requiresAuth: true },
    },
    {
      path: '/feedback/resposta/:id',
      name: 'responder-feedback',
      component: FeedbackResponseView,
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const store = useUsuarioStore();
    if (!store.isAuthenticated) {
      next('/');
      return;
    }
  }

  if (to.name === 'Login' || to.name === 'Cadastro') {
    next();
    return;
  }

  next();
});

export default router
