<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import type Usuario from './models/Usuario';

const route = useRoute()

const store = useStore();

const usuario : Usuario = store.state.usuario; 

const habilitarIconeView = () => {
  const routeName = route.name

  if (routeName == 'login' || routeName == 'cadastro') {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <NavBar :habilitar-icones="habilitarIconeView()" :perfil="usuario.perfil" />
  <div class="flex min-h-screen items-start justify-center bg-neutral-400">
    <RouterView />
  </div>
</template>

<style scoped></style>
