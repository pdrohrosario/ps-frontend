<template>
  <div class="bg-zinc-100 mt-20 mb-20 rounded-[10px] shadow border p-10">
    <div class="grid grid-cols-1 justify-items-center">
      <div>
        <form @submit.prevent="salvarPefil()" class="flex-col grid grid-cols-1 gap-1 items-center">
          <div class="text-gray-900 text-5xl text-center font-light font-inter">Cadastro</div>
          <div class="mt-10">
            <div class="text-gray-900 text-2xl font-normal font-inter block">Email:</div>
            <input type="text" class="w-[396px] h-[45px] rounded-[5px] border" v-model="email" />
            <MessageError v-if="errorEmail" :message="errorEmail" class="block" />
          </div>
          <div class="mt-5">
            <div class="text-gray-900 text-2xl font-normal font-inter block">Senha:</div>
            <input type="password" class="w-[396px] h-[38px]" v-model="password" />
            <MessageError v-if="errorPassword" :message="errorPassword" class="block" />
          </div>
          <div class="mt-5">
            <label class="text-gray-900 text-2xl font-normal font-inter block">Perfil:</label>

            <select class="w-[396px] h-[45px] rounded-[5px] border" v-model="perfil">
              <option value="pais">PAIS</option>
              <option value="professor">PROFESSOR</option>
            </select>
            <MessageError v-if="errorPerfil" :message="errorPerfil" class="block" />
          </div>
          <div class="my-5">
            <div v-if="perfil === 'pais'">
              <div class="text-gray-900 text-2xl font-normal font-inter block">
                Número de filhos:
              </div>
              <div class="custom-number-input h-10 w-32">
                <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    @click="decrement"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span class="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    v-model="count"
                    type="number"
                    class="outline-none focus:outline-none text-center w-full bg-light-gray font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                  />
                  <button
                    @click="increment"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <MessageError v-if="errorNrFilhos" :message="errorNrFilhos" class="block" />
              <div class="mt-5" v-for="index in nrFilhos">
                <div class="text-gray-900 text-1xl font-normal font-inter block">
                  Filho: {{ index }}:
                </div>
                <input
                  type="text"
                  class="w-full h-[45px] rounded-[5px] border"
                  v-model="nomesFilhos[index]"
                />
              </div>
            </div>
            <div v-if="perfil === 'professor'">
              <div class="text-gray-900 text-2xl font-normal font-inter block">
                Frequência de feedback:
              </div>
              <div class="custom-number-input h-10 w-32">
                <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    @click="decrement"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span class="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    v-model="count"
                    type="number"
                    class="outline-none focus:outline-none text-center w-full bg-light-gray font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                  />
                  <button
                    @click="increment"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <MessageError v-if="errorQtFeedback" :message="errorQtFeedback" class="block" />
            </div>
          </div>
          <button
            class="w-[396px] h-[58px] bg-gray-800 rounded-[5px] text-zinc-100 text-[28px] font-normal font-['Inter']"
            type="submit"
          >
            Adicionar
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
const perfil = ref('')
const nrFilhos = ref(0)
const qtFeedback = ref(0)
const count = ref(0)

const errorEmail = ref('')
const errorPassword = ref('')
const errorNrFilhos = ref('')
const errorQtFeedback = ref('')
const errorPerfil = ref('')

const nomesFilhos = ref(Array.from({ length: nrFilhos.value }, () => '')) // Inicializa um array vazio de nomes dos filhos

const validateEmail = () => {
  if (email.value.length == 0 || !/^\S+@\S+\.\S+$/.test(email.value)) {
    errorEmail.value = 'Email inválido, insira novamente.'
    return true
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

const validateNrFilhos = () => {
  if (nrFilhos.value == 0) {
    errorNrFilhos.value = 'Número de filhos deve ser maior que zero.'
  } else {
    errorNrFilhos.value = ''
  }
}

const validateQtFeedback = () => {
  if (qtFeedback.value == 0) {
    errorQtFeedback.value = 'Número de feedback deve ser maior que zero.'
  } else {
    errorQtFeedback.value = ''
  }
}

const validatePerfil = () => {
  if (perfil.value.length == 0) {
    errorPerfil.value = 'Necessário informar um perfil.'
  } else {
    errorPerfil.value = ''
  }
}

const cleanErrors = () => {
  errorEmail.value = ''
  errorPassword.value = ''
  errorNrFilhos.value = ''
  errorPerfil.value = ''
  errorQtFeedback.value = ''
}

const salvarPefil = () => {
  cleanErrors()
  validateEmail()
  validatePassword()
  validatePerfil()
  if (errorEmail.value === '' && errorPassword.value === '' && errorPerfil.value === '') {
    if (perfil.value == 'pais') {
      validateNrFilhos()
      if (errorNrFilhos.value === '') {
        console.log('editar')
      }
    } else {
      validateQtFeedback()
      if (errorQtFeedback.value === '') {
        console.log('editar')
      }
    }
  }
}

const decrement = () => {
  count.value = Math.max(1, nrFilhos.value - 1)
  perfilParamCount()
}

const increment = () => {
  count.value += 1
  perfilParamCount()
}

const perfilParamCount = () => {
  if (perfil.value === 'pais') {
    nrFilhos.value = count.value
  } else {
    qtFeedback.value = count.value
  }
}
</script>
