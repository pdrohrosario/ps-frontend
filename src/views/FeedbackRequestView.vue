<template>
  <div class="bg-zinc-100 w-3/4 mt-20 rounded-[10px] font-inter shadow border">
    <div class="p-10">
      <div class="text-gray-900 text-4xl text-start font-light font-inter">Feedback:</div>
      <form @submit.prevent="enviarSolicitacao()">
        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Professor:</div>
        <div class="flex w-full flex-row justify-items-start">
          <VueMultiselect v-model="professor" :options="options"> </VueMultiselect>
        </div>
        <MessageError v-if="errorProfessor" :message="errorProfessor" />
        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Solicitação:</div>
        <div class="flex w-full flex-row justify-items-start">
          <textarea
            type="text"
            v-model="solicitacao"
            class="w-full min-h-[200px] rounded-[5px] border"
          ></textarea>
        </div>
        <MessageError v-if="errorSolicitacao" :message="errorSolicitacao" class="block" />
        <div class="flex justify-start mt-5 flex-row sm:justify-items-start justify-items-end">
          <button
            @click="cleanInput"
            class="w-[150px] h-[48px] bg-red-800 mr-3 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter']"
          >
            Limpar
          </button>
          <button
            class="w-[150px] h-[48px] bg-gray-800 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import MessageError from '@/components/MessageError.vue'
import VueMultiselect from 'vue-multiselect'

const professor = ref('')
const solicitacao = ref('')

const errorProfessor = ref('')
const errorSolicitacao = ref('')

const options = ['list', 'of', 'options']

const validateProfessor = () => {
  if (professor.value.length == 0) {
    errorProfessor.value = 'Selecione um professor para avaliar o feedback.'
  } else {
    errorSolicitacao.value = ''
  }
}

const validateSolicitacao = () => {
  if (solicitacao.value.length == 0) {
    errorSolicitacao.value = 'Preencha o feedback desejado para professor.'
  } else {
    errorSolicitacao.value = ''
  }
}

const cleanErrors = () => {
  errorProfessor.value = ''
  errorSolicitacao.value = ''
}

const cleanInput = () => {
  cleanErrors()
  professor.value = ''
  solicitacao.value = ''
}

const enviarSolicitacao = () => {
  cleanErrors()
  validateProfessor()
  validateSolicitacao()
  if (errorProfessor.value === '' && errorSolicitacao.value === '') {
    console.log('enviar')
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
