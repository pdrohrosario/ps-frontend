<template>
  <div class="bg-zinc-100 w-3/4 mt-20 mb-20 rounded-[10px] font-inter shadow border">
    <div class="p-10">
      <div class="text-gray-900 text-4xl text-start font-light font-inter">Feedback:</div>
      <form @submit.prevent="updateFeebdack()">
        <div v-if="perfil == 'pais'">
          <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Professor:</div>
          <div class="flex flex-row justify-items-start">
            <input
              type="text"
              class="w-full h-[45px] rounded-[5px] border"
              v-bind:readonly="true"
              v-model="user.name"
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
              v-model="user.name"
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
        <div v-if="perfil == 'professor' || resposta.trim() != ''">
          <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Resposta:</div>
          <div class="flex flex-row justify-items-start">
            <textarea
              type="text"
              v-model="feedback.response"
              class="w-full min-h-[200px] rounded-[5px] border"
              :readonly="!ativo"
            ></textarea>
          </div>
          <MessageError v-if="errorResposta" :message="errorResposta" />
        </div>
        <div
          v-if="perfil == 'professor' && ativo"
          class="flex justify-start py-3 flex-row sm:justify-items-start justify-items-end"
        >
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
        <div class="mt-2" v-if="perfil == 'pais' && resposta.trim() == ''">
          <MessageError :message="'Feedback em análise, aguarde a resposta do professor!'" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MessageError from '@/components/MessageError.vue'
import { useUsuarioStore } from '../stores/'
import { useRoute } from 'vue-router';
import { FeedbackService } from '@/services/FeedbackService';
import type { FeedbackDTO } from '@/dtos/feedback-dto';
import { UserService } from '@/services/UsuarioService';
import type { UserDTO } from '@/dtos/user-dto';

loadUserFeedbacks();
loadParentOrProfessorName();

const route = useRoute();  
const feedbackId = parseInt(route.params.id.toString()); 
var feedback : FeedbackDTO;
const store = useUsuarioStore()
const feedbackService = new FeedbackService();

const resposta = ref('')
const usuario = store.usuario
const perfil = ref(usuario.profile.toLocaleLowerCase())
let user : UserDTO;
const userService = new UserService()
const ativo = ref(true)
const errorResposta = ref('')


const validateResposta = () => {
  if (resposta.value.trim() == '') {
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
    update()
  }
}

async function loadUserFeedbacks() {
  try {
    feedback = await feedbackService.findFeebacksById(feedbackId);
  } catch (error) {
    
  }
}

async function loadParentOrProfessorName() {
  try {
    const userId = perfil.value == 'pais' ? feedback.parentId : feedback.teacherid 
    user = await userService.getUserById(userId);
  } catch (error) {
    
  }
}

async function update() {
  try {


      const feedback = await feedbackService.updateUser(feedback);

    } catch (error) {
      
    }
}
</script>
