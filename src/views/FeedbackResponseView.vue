<template>
  <div class="bg-zinc-100 w-3/4 mt-20 mb-20 rounded-[10px] font-inter shadow border">
    <div class="p-10" v-if="!loading && parentOrProfessor != null">
      <div class="text-gray-900 text-4xl text-start font-light font-inter">Feedback:</div>
      <form @submit.prevent="updateFeebdack()">
        <div v-if="perfil == 'pais'">
          <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Professor:</div>
          <div class="flex flex-row justify-items-start">
            <input
              type="text"
              class="w-full h-[45px] rounded-[5px] border"
              v-bind:readonly="true"
              v-model="parentOrProfessor.name"
            />
          </div>
        </div>
        <div v-else>
          <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Pais:</div>
          <div class="flex flex-row justify-items-start">
            <input
              type="text"
              class="w-full h-[45px] rounded-[5px] border"
              v-bind:readonly="true"
              v-model="parentOrProfessor.name"
            />
          </div>
        </div>
        <div>
          <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Aluno:</div>
          <div class="flex flex-row justify-items-start">
            <input
              type="text"
              class="w-full h-[45px] rounded-[5px] border"
              v-bind:readonly="true"
              v-model="feedback.child"
            />
          </div>
        </div>
        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Solicitação:</div>
        <div class="flex flex-row justify-items-start">
          <textarea
            type="text"
            class="w-full min-h-[200px] rounded-[5px] border"
            v-bind:readonly="true"
            v-model="feedback.question"
          ></textarea>
        </div>
        <div v-if="perfil == 'professor' && feedback.active || (feedback.response != null && feedback.response != '')">
          <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Resposta:</div>
          <div class="flex flex-row justify-items-start">
            <textarea
              type="text"
              class="w-full min-h-[200px] rounded-[5px] border"
              :readonly="!feedback.active"
              v-model="feedback.response"
            ></textarea>
          </div>
          <MessageError v-if="errorResposta" :message="errorResposta" />
        </div>
        <div
          v-if="perfil == 'professor' && feedback.active"
          class="flex justify-between py-3 flex-row sm:justify-items-start justify-items-end"
        >
          <div>
            <button
              @click="rejeitarFeebdack"
              class="w-[210px] h-[48px] bg-red-800 mr-3 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter']"
            >
              Rejeitar Feedback
            </button>
          </div>
          <div>
            <button
              @click="cleanInput"
              class="w-[150px] h-[48px] bg-red-800 mr-3 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter']"
            >
              Limpar
            </button>
            <button
              type="submit"
              class="w-[150px] h-[48px] bg-gray-800 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter"
            >
              Enviar
            </button>
          </div>
        </div>
        <div
          class="mt-2"
          v-if="perfil == 'pais' && (feedback.response == ''||  feedback.response == null) && feedback.active"
        >
          <MessageError :message="'Feedback em análise, aguarde a resposta do professor!'" />
        </div>
        <div
          class="mt-2"
          v-if="(feedback.response == null || feedback.response == '') && feedback.active == false"
        >
          <MessageError :message="`O feedback solicitado foi rejeitado pelo professor!`" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import MessageError from '@/components/MessageError.vue'
import { useUsuarioStore } from '../stores/'
import { useRoute, useRouter } from 'vue-router'
import { FeedbackService } from '@/services/FeedbackService'
import { FeedbackDTO } from '@/dtos/feedback-dto'
import { UserService } from '@/services/UsuarioService'
import type { UserDTO } from '@/dtos/user-dto'

onBeforeMount(() => {
  loadFeedbackInfo()
})

const route = useRoute()
const feedbackId = parseInt(route.params.id.toString())
var feedback: FeedbackDTO
const store = useUsuarioStore()
const feedbackService = new FeedbackService()
const loading = ref(true)
const resposta = ref('')
const usuario = store.usuario
const perfil = ref(usuario.profile.toLocaleLowerCase())
var parentOrProfessor: UserDTO
const userService = new UserService()
const errorResposta = ref('')
const router = useRouter()

const validateResposta = () => {
  if (feedback.response === null) {
    errorResposta.value = 'Preencha o campo resposta do feedback solicitado.'
    return false
  }

  return true
}

const cleanErrors = () => {
  errorResposta.value = ''
}

const cleanInput = () => {
  cleanErrors()
  resposta.value = ''
}

const updateFeebdack = () => {
  cleanErrors()
  if (validateResposta()) {
      feedback.active = false;
      update()
  }
}

const rejeitarFeebdack = () => {
  feedback.response = ""
}

async function softDeleteFeedback(feedbackId : number) {
  try {
    const feedbackNotActive = await feedbackService.softDeleteFeedback(feedbackId)
    router.push({ name: 'home' })
  } catch (error) {}
}

async function loadFeedbackInfo() {
  try {
    feedback = await feedbackService.findFeebacksById(feedbackId)
    const userId = perfil.value == 'pais' ? feedback.teacher_id : feedback.parent_id
    parentOrProfessor = await userService.getUserById(userId)
    loading.value = false
  } catch (error) {}
}

async function update() {
  try {
    const feedbackUpdate = await feedbackService.updateFeedback(feedback)
    softDeleteFeedback(feedbackUpdate.id)

    router.push({ name: 'home' })
  } catch (error) {}
}
</script>
