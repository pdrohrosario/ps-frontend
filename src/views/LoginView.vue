<template>
  <div class="bg-zinc-100 mt-20 rounded-[10px] shadow border">
    <div class="grid grid-cols-2 gap-20 p-10">
      <div class="flex flex-col items-center">
        <img class="w-56 h-[189px]" src="../assets/images/logo.png" />
        <div class="w-[400px] h-[86px] text-gray-900 text-[50px] font-medium font-inter">
          Bem-vindo ao PS
        </div>
        <span class="w-[400px] h-[141px] text-gray-900 text-[28px] font-light font-inter">
          A ferramenta que conecta pais e professores de forma rápida e eficiente.
        </span>
      </div>

      <div>
        <form @submit.prevent="login()" class="flex flex-col items-center">
          <div class="text-gray-900 text-5xl mb-5 text-center font-light font-inter']">Login</div>
          <div class="py-5 px-0">
            <div class="text-gray-900 w-[396px] h-[45px] text-2xl font-normal font-inter">
              Email:
            </div>
            <input type="text" class="w-[396px] h-[45px] rounded-[5px] border" v-model="email" />
            <MessageError v-if="errorEmail" :message="errorEmail" class="block" />
          </div>
          <div>
            <div class="text-gray-900 text-2xl w-[396px] h-[45px] font-normal font-inter">
              Senha:
            </div>
            <input type="password" class="w-[396px] h-[38px]" v-model="password" />
            <MessageError v-if="errorPassword" :message="errorPassword" class="block" />
          </div>
          <div class="text-start py-3">
            <router-link class="text-gray-900 text-xl font-light font-inter" to="/cadastro"
              >Não possui uma conta?
              <a class="text-orange-800 text-xl font-light font-inter">Cadastre-se</a></router-link
            >
          </div>

          <button
            class="w-[396px] h-[58px] bg-gray-800 rounded-[5px] text-zinc-100 text-[28px] font-normal font-inter"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import MessageError from '../components/MessageError.vue'

const email = ref('')
const password = ref('')

const errorEmail = ref('')
const errorPassword = ref('')

const validateEmail = () => {
  if (email.value.length == 0 || !/^\S+@\S+\.\S+$/.test(email.value)) {
    errorEmail.value = 'Email inválido, insira novamente.'
  } else {
    errorEmail.value = ''
  }
}

const validatePassword = () => {
  if (password.value.length == 0 || password.value.length < 5) {
    errorPassword.value = 'Senha inválida, insira novamente.'
  } else {
    errorPassword.value = ''
  }
}

const cleanErrors = () => {
  errorEmail.value = ''
  errorPassword.value = ''
}

const login = () => {
  cleanErrors()
  validateEmail()
  validatePassword()
  if (errorEmail.value === '' && errorPassword.value === '') {
    console.log('editar')
  }
}
</script>
