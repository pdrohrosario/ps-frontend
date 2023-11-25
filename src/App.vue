<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useRoute } from 'vue-router'
import { useUsuarioStore } from './stores/'
import type Usuario from './models/Usuario'

const route = useRoute()

const store = useUsuarioStore()

const usuario: Usuario = store.usuario

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
