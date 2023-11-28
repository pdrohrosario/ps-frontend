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
            <div class="text-gray-900 text-2xl font-normal font-inter block">Nome:</div>
            <input type="text" class="w-[396px] h-[38px]" v-model="nome" />
            <MessageError v-if="errorNome" :message="errorNome" class="block" />
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
                  <a
                    @click="decrement()"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span class="m-auto text-2xl font-thin">−</span>
                  </a>
                  <input
                    v-model="count"
                    type="number"
                    class="outline-none focus:outline-none text-center w-full bg-light-gray font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                  />
                  <a
                    @click="increment()"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </a>
                </div>
              </div>
              <div class="mt-5" v-for="index in nrFilhos">
                <div class="text-gray-900 text-1xl font-normal font-inter block">
                  Filho: {{ index }}:
                </div>
                <input
                  type="text"
                  class="w-full h-[45px] rounded-[5px] border"
                  v-model="nomesFilhos[index]" required
                />
              </div>
            </div>
            <div v-if="perfil === 'professor'">
              <div class="text-gray-900 text-2xl font-normal font-inter block">
                Frequência de feedback:
              </div>
              <div class="custom-number-input h-10 w-32">
                <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <a
                    @click="decrement()"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span class="m-auto text-2xl font-thin">−</span>
                  </a>
                  <input
                    v-model="count"
                    type="number"
                    class="outline-none focus:outline-none text-center w-full bg-light-gray font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                  />
                  <a
                    @click="increment()"
                    class="bg-light-gray text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </a>
                </div>
              </div>
            </div>
            <MessageError v-if="errorCount" :message="errorCount" class="block" />
          </div>
          <MessageError v-if="errorCadastro" :message="errorCadastro" class="block" />
          <button
            class="w-[396px] h-[58px] bg-gray-800 rounded-[5px] text-zinc-100 text-[28px] font-normal font-inter"
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
import { UserService } from '@/services/UsuarioService'
import { UserCreationDTO, UserDTO } from '../dtos/user-dto'
import MessageError from '../components/MessageError.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const perfil = ref('')
const nrFilhos = ref(0)
const qtFeedback = ref(0)
const count = ref(0)
const nome = ref('')

const errorNome = ref('')
const errorEmail = ref('')
const errorPassword = ref('')
const errorCount = ref('')
const errorPerfil = ref('')
const errorCadastro = ref('')

const nomesFilhos = ref(Array.from({ length: count.value }, () => '')) // Inicializa um array vazio de nomes dos filhos

const userService: UserService = new UserService()

const validatePerfil = () => {
  if (perfil.value.length == 0) {
    errorPerfil.value = 'Necessário informar um perfil.'
    return false
  }

  return true
}

const validateEmail = () => {
  if (email.value.length == 0 || !/^\S+@\S+\.\S+$/.test(email.value)) {
    errorEmail.value = 'Email inválido, insira novamente.'
    return false
  }
  return true
}

const validatePassword = () => {
  if (password.value.length == 0 || password.value.length < 5) {
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
  errorPerfil.value = ''
  errorCount.value = ''
  errorCadastro.value = ''
}

const salvarPefil = () => {
  cleanErrors()
  if (validateEmail() && validatePassword() && validatePerfil() && validateCount()) {
    //validarEmailCadastro(email.value)
    if (errorCadastro.value === '') {
      const usuarioInfoCadastro: UserCreationDTO = {
        email: email.value,
        name: nome.value,
        profile: perfil.value,
        children: nomesFilhos.value.join(' '),
        feedback_frequence: perfil.value == 'professor' ? count.value : 0,
        password: password.value
      }
      criarUsuario(usuarioInfoCadastro)
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
  }
}

async function validarEmailCadastro(email: string) {
  try {
    const usuarioJaCadastrado = await userService.getUserByEmail(email)
    if (usuarioJaCadastrado) {
      errorCadastro.value = 'Email de usuário já cadastrado, utilize outro email'
    }
  } catch (error) {
    errorCadastro.value = 'Erro ao validar o email de cadastro do usuário'
  }
}

async function criarUsuario(userData: UserCreationDTO) {
  try {
    const usuarioCriado = userService.createUser(userData)
    router.push({ name: 'login' })
  } catch (error) {
    errorCadastro.value = 'Erro ao logar, verifique as informações de login'
  }
}
</script>
