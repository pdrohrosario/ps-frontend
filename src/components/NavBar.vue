<template>
  <div class="bg-gray-800 font-inter">
    <nav class="px-5 py-3 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex text-[20px]">
        <router-link to="/"> <img class="w-[119px]" src="../assets/images/logo.png" /></router-link>
        <ul
          v-show="props.habilitarIcones.valueOf()"
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <li class="text-white hover:text-neutral-400">
            <router-link to="/home">Histórico</router-link>
          </li>
          <li v-if="perfil?.valueOf() == 'pais'" class="text-white hover:text-neutral-400">
            <router-link to="/professores">Professores</router-link>
          </li>
          <li v-else class="text-white hover:text-neutral-400">
            <router-link to="/pais">Pais</router-link>
          </li>
        </ul>
      </div>

      <div v-show="habilitarIcones">
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <li class="text-white hover:text-neutral-400">
            <router-link to="/perfil">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </router-link>
          </li>
          <li class="text-white hover:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  habilitarIcones: Boolean,
  perfil: String
})
</script>
