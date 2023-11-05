<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const habilitarIconeView = () => {
  const routeName = route.name;

  if (routeName == 'login' || routeName == 'cadastro') {

    return false;
  }
  else {
    return true;
  }
}

</script>

<template>
  <NavBar :habilitar-icones="habilitarIconeView()" />
  <div class="flex h-screen justify-center bg-neutral-400">

    <RouterView />
  </div>
</template>


<style scoped></style>