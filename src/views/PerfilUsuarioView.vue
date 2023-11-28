<template>
  <div class="bg-zinc-100 w-2/3 mt-20 mb-20 rounded-[10px] shadow border">
    <div class="grid grid-cols-2 gap-10 p-10">
      <div class="flex flex-col items-center">
        <img class="relative" src="../assets/images/vector-perfil.png" />
        <div
          class="rounded-[5px] bg-light-gray w-[200px] h-[51px] my-5 p-5 flex items-center justify-center"
        >
          <span class="text-[24px] font-inter text-gray text-center inline-block">{{
            perfil.valueOf().charAt(0).toUpperCase() + perfil.slice(1)
          }}</span>
          <!--trocar por variavel-->
        </div>

        <div class="h-[141px] text-gray-900 text-[18px] font-light font-inter']">
          <ul
            class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
          >
            <li class="text-#1c2733 hover:text-neutral-400">
              <router-link to="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </router-link>
            </li>
            <li class="first-letter:text-#1c2733 hover:text-neutral-400">
              <a @click="logout()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <form @submit.prevent="editUser()" class="flex-col grid grid-cols-1 gap-1 items-center">
          <div class="">
            <div class="text-gray-900 w-[396px] h-[45px] text-2xl font-normal font-inter">
              Nome:
            </div>
            <input
              type="text"
              class="w-full h-[45px] rounded-[5px] border"
              v-model="usuario.name"
              v-bind:disabled="visualizar"
            />
            <MessageError v-if="errorNome" :message="errorNome" />
          </div>
          <div class="">
            <div class="text-gray-900 w-[396px] h-[45px] text-2xl font-normal font-inter">
              Email:
            </div>
            <input
              type="text"
              class="w-full h-[45px] rounded-[5px] border"
              v-model="usuario.email"
              v-bind:disabled="visualizar"
            />
            <MessageError v-if="errorEmail" :message="errorEmail" />
          </div>
          <div>
            <div class="text-gray-900 text-2xl w-[396px] h-[45px] font-normal font-inter">
              Senha:
            </div>
            <input
              type="password"
              class="w-full h-[45px] rounded-[5px] border"
              v-model="usuario.password"
              v-bind:disabled="visualizar"
            />
            <MessageError v-if="errorPassword" :message="errorPassword" />
          </div>
          <div class="my-5">
            <div v-if="perfil === 'pais'">
              <div class="text-gray-900 text-2xl font-normal font-inter block">
                Número de filhos:
              </div>
              <div :class="{ disabled: visualizar }">
                <div class="custom-number-input h-10 w-32">
                  <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <a
                      @click="decrement()"
                      class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span class="h-full w-20 m-auto text-2xl font-thin">−</span>
                    </a>
                    <input
                      v-model="count"
                      type="number"
                      class="outline-none focus:outline-none text-center w-full bg-light-gray font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                      name="custom-input-number"
                      disabled
                    />
                    <a
                      @click="increment()"
                      class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span class="h-full w-20 m-auto text-2xl font-thin">+</span>
                    </a>
                  </div>
                </div>
                <div class="mt-5" v-for="index in count">
                  <input
                    type="text"
                    class="w-full h-[45px] rounded-[5px] border"
                    v-model="listFilhos[index - 1]" required
                  />
                </div>
              </div>
            </div>
            <div v-if="perfil === 'professor'">
              <div class="text-gray-900 text-2xl font-normal font-inter block">
                Frequência de feedback:
              </div>
              <div :class="{ disabled: visualizar }">
                <div class="custom-number-input h-10 w-32">
                  <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <a
                      @click="decrement()"
                      class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                      v="edicao"
                    >
                      <span class="h-full w-20 m-auto text-2xl font-thin">−</span>
                    </a>
                    <input
                      v-model="count"
                      type="number"
                      class="outline-none focus:outline-none text-center w-full bg-light-gray font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                      name="custom-input-number"
                      disabled="true"
                    />
                    <a
                      @click="increment()"
                      class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span class="h-full w-20 m-auto text-2xl font-thin">+</span>
                    </a>
                  </div>
                </div>
              </div>
              <MessageError v-if="errorCount" :message="errorCount" class="block" />
            </div>
          </div>
          <div class="flex mt-4 flex-row justify-end">
            <button
              class="w-50 h-[58px] bg-gray-800 rounded-[5px] p-5 mr-5 flex items-center justify-center text-zinc-100 text-[20px] font-normal font-inter"
              @click="edicao"
              v-if="visualizar"
            >
              {{ 'Editar' }}
            </button>
            <button
              class="w-50 h-[58px] bg-red-800 rounded-[5px] p-5 mr-5 flex items-center justify-center text-zinc-100 text-[20px] font-normal font-inter"
              @click="edicao"
              v-if="!visualizar"
            >
              {{ 'Cancelar' }}
            </button>
            <button
              class="w-50 h-[58px] bg-gray-800 rounded-[5px] p-5 flex items-center justify-center text-zinc-100 text-[20px] font-normal font-inter"
              v-if="!visualizar"
              type="submit"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageError from '../components/MessageError.vue'
import { useUsuarioStore } from '../stores/'
import { UserService } from '@/services/UsuarioService'
import type { UserDTO } from '@/dtos/user-dto'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUsuarioStore()
const userService = new UserService()
var usuario = store.usuario
const visualizar = ref(true)
const perfil = ref(usuario.profile.toLocaleLowerCase())

const nrFilhos = ref(0)
const errorEmail = ref('')
const errorPassword = ref('')
const errorNrFilhos = ref('')
const errorCount = ref('')
const errorNome = ref('')

let listFilhos: string[] = usuario.children.split('|')
var count = ref(perfil.value == 'professor' ? usuario.feedback_frequence : listFilhos.length) // Inicializa um array vazio de nomes dos filhos

const validateEmail = () => {
  if (usuario.email.length == 0 || !/^\S+@\S+\.\S+$/.test(usuario.email)) {
    errorEmail.value = 'Email inválido, insira novamente.'
    return false
  }
  return true
}

const edicao = () => {
  visualizar.value = !visualizar.value
}

const validatePassword = () => {
  if (usuario.password.length == 0 || usuario.password.length < 5) {
    errorPassword.value = 'Senha inválida, insira novamente.'
    return false
  }
  return true
}

const validateCount = () => {
  if (count.value == 0) {
    errorCount.value =
      perfil.value.toLocaleLowerCase() == 'professor'
        ? 'Número de feedback deve ser maior que zero.'
        : 'Número de filhos deve ser maior que zero.'
    return false
  }
  return true
}

const cleanErrors = () => {
  errorEmail.value = ''
  errorPassword.value = ''
  errorCount.value = ''
}

const editUser = () => {
  cleanErrors()
  if (validateEmail() && validatePassword() && validateCount()) {
    update()
  }
}

async function update() {
  try {
    const userData: UserDTO = {
      id: usuario.id,
      email: usuario.email.toString(),
      password: usuario.password.toString(),
      name: usuario.name.toString(),
      profile: usuario.profile.toString(),
      feedback_frequence: perfil.value == 'professor' ? count.value : usuario.feedback_frequence,
      children: perfil.value == 'pais' ? listFilhos.join('|') : usuario.children
    }
    const usuarioCriado = await userService.updateUser(userData)
    store.updateUser(store.$state, usuarioCriado)
    edicao()
  } catch (error) {}
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
  }
}

const logout = () => {
  store.logout(store.$state)
  router.push({ name: 'login' })
}
</script>
<style>
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>
