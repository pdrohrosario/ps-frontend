<template>
  <div class="bg-zinc-100 w-3/4 h-[500px] mt-20 rounded-[10px] font-inter shadow border">
    <div class="p-10">
      <div class="text-gray-900 text-4xl text-start font-light font-inter">Pesquisar Pais:</div>
      <div class="flex flex-row justify-items-start">
        <input type="text" class="w-full h-[45px] rounded-[5px] border" v-model="pesquisa" />
      </div>
      <MessageError v-if="errorPesquisa" :message="errorPesquisa" />
      <div class="flex justify-end py-3 flex-row sm:justify-items-start justify-items-end">
        <button
          @click="cleanPesquisa"
          class="w-[150px] h-[48px] bg-gray-800 mx-3 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter']"
        >
          Limpar
        </button>
        <button
          @click="buscarPais"
          class="w-[150px] h-[48px] bg-gray-800 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter"
        >
          Pesquisar
        </button>
      </div>
      <div class="flex justify-center flex-row py-5">
        <div class="relative w-full bg-dark-gray overflow-x-auto">
          <table class="w-full text-sm text-left text-black dark:text-gray-400">
            <thead class="font-medium text-[18px] text-black uppercase bg-dark-gray-table">
              <tr>
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="pr-80 py-3">Nome</th>
                <th scope="col" class="px-20 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-light-gray border-b" v-for="feedback in listFeedback">
                <td scope="row" class="px-6 py-4">
                  {{ feedback.id }}
                </td>
                <td class="pr-90 py-4">{{ feedback.solicitacao }}</td>
                <td class="px-6 py-4">
                  {{ feedback.ativo }}
                </td>
                <td class="px-6 py-4">
                  <div
                    class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
                  >
                    <router-link to="/feedback/resposta">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                        />
                      </svg>
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr class="bg-light-gray border-b" v-for="pais of listaPais">
                <td scope="row" class="px-6 py-4">1</td>
                <td class="pr-90 py-4">Roberto Carlos</td>
                <td class="px-6 py-4">
                  <div
                    class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
                  >
                    <svg
                      @click="adicionarPais"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageError from '@/components/MessageError.vue'

const pesquisa = ref('')

const errorPesquisa = ref('')

const validatePesquisa = () => {
  if (pesquisa.value.length == 0) {
    errorPesquisa.value = 'Preencha o campo pesquisa.'
  } else {
    errorPesquisa.value = ''
  }
}

const cleanErrors = () => {
  errorPesquisa.value = ''
}

const buscarPais = () => {
  cleanErrors()
  validatePesquisa()
  if (errorPesquisa.value === '') {
    console.log('buscar')
  }
}

const cleanPesquisa = () => {
  cleanErrors()
  pesquisa.value = ''
}

const adicionarPais = () => {}

const novoFeedback = ref<Feedback>({
  id: 1,
  idPai: 2,
  solicitacao: 'teste',
  resposta: '',
  ativo: true
})

const listFeedback = ref<Feedback[]>([])
listFeedback.value?.push({ ...novoFeedback.value })
</script>
