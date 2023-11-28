<template>
  <div class="bg-zinc-100 w-3/4 mt-20 rounded-[10px] font-inter shadow border">
    <div class="p-10">
      <div class="text-gray-900 text-4xl text-start font-light font-inter">Feedback:</div>
      <form @submit.prevent="enviarSolicitacao()">
        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Professor:</div>
        <div class="flex w-full flex-row justify-items-start">
          <VueMultiselect v-model="professor" :options="listProfessoresSelecao"> </VueMultiselect>
        </div>
        <MessageError v-if="errorProfessor" :message="errorProfessor" />
        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Aluno:</div>
        <div class="flex w-full flex-row justify-items-start">
          <VueMultiselect v-model="aluno" :options="listAlunos"> </VueMultiselect>
        </div>
        <MessageError v-if="errorAluno" :message="errorAluno" />
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
import { useUsuarioStore } from '../stores/'
import type { UserDTO } from '@/dtos/user-dto'
import { FeedbackService } from '@/services/FeedbackService'
import { ContatoService } from '@/services/ContatoService'
import type { FeedbackCreationDTO } from '@/dtos/feedback-dto'
import { useRouter } from 'vue-router'

const store = useUsuarioStore()

const usuario = store.usuario
const feedbackService = new FeedbackService()
const listProfessores = ref<UserDTO[]>()
const listProfessoresSelecao = ref<String[]>([])
const contatoService = new ContatoService()
const listAlunos = ref<String[]>([])
const router = useRouter()

listAlunos.value.push(...usuario.children.split('|'))

const professor = ref('')
const solicitacao = ref('')
const aluno = ref('')

const errorProfessor = ref('')
const errorSolicitacao = ref('')
const errorAluno = ref('')

buscarProfessores()

const validateProfessor = () => {
  if (professor.value.length == 0) {
    errorProfessor.value = 'Selecione um professor para avaliar o feedback.'
    return false
  }

  return true
}

const validateAluno = () => {
  if (aluno.value.length == 0) {
    errorAluno.value = 'Selecione um aluno para o feedback.'
    return false
  }

  return true
}

const validateSolicitacao = () => {
  if (solicitacao.value.length == 0) {
    errorSolicitacao.value = 'Preencha o feedback desejado para professor.'
    return false
  }

  return true
}

const cleanErrors = () => {
  errorProfessor.value = ''
  errorAluno.value = ''
  errorSolicitacao.value = ''
}

const cleanInput = () => {
  cleanErrors()
  professor.value = ''
  solicitacao.value = ''
  aluno.value = ''
}

const enviarSolicitacao = () => {
  cleanErrors()

  if (validateProfessor() && validateSolicitacao() && validateAluno()) {
    createFeedback()
  }
}

async function buscarProfessores() {
  try {
    listProfessores.value = await contatoService.getByParentID(usuario.id)
    listProfessoresSelecao.value = listProfessores.value.map(
      (professor) => `${professor.id} - ${professor.name}`
    )
  } catch (error) {}
}

async function createFeedback() {
  try {
    const professorId = listProfessores.value?.find(
      (user) => professor.value === `${user.id} - ${user.name}`
    )?.id
    
    const allowed = await feedbackService.isAllowedToAskFeedback(usuario.id, professorId || 0)

    if(allowed){
      const feedbackDto: FeedbackCreationDTO = {
        question: solicitacao.value,
        child: aluno.value,
        parent_id: usuario.id,
        teacher_id: professorId || 0
      }
      const feedback = await feedbackService.createFeedback(feedbackDto)
      router.push({ name: 'home' })
    }
    else{
      errorSolicitacao.value = `O limite de feedbacks do usuário ${usuario.name} ao professor ${professor.value} foi esgotado!`
    }
  } catch (e) {}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
