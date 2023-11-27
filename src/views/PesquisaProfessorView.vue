<template>
  <div class="bg-zinc-100 w-3/4 h-[500px] mt-20 rounded-[10px] font-inter shadow border">
    <div class="p-10">
      <div class="text-gray-900 text-4xl text-start font-light font-inter">
        Pesquisar Professores:
      </div>
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
          @click="buscarProfessor"
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
              <tr class="bg-light-gray text-black border-b" v-for="professor in listProfessor">
                <td scope="row" class="px-6 py-4">{{ professor.id }}</td>
                <td class="pr-90 py-4">{{ professor.name }}</td>
                <td class="px-6 py-4">
                  <div
                    class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
                  >
                    <a @click="adicionarContato(usuario.id, professor.id, professor.name)">
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </a>
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
import { UserService } from '@/services/UsuarioService'
import { ContatoService } from '@/services/ContatoService'
import { UserDTO } from '../dtos/user-dto'
import { useRouter } from 'vue-router'
import { ContactCreationDTO } from '@/dtos/contato-dto'
import { useUsuarioStore } from '../stores/'

const store = useUsuarioStore()

const usuario = store.usuario
const router = useRouter()
const userService = new UserService()
const contatoService = new ContatoService()

const listProfessor = ref<UserDTO[]>([])

const pesquisa = ref('')
const errorPesquisa = ref('')

const validatePesquisa = () => {
  if (pesquisa.value.length == 0) {
    errorPesquisa.value = 'Preencha o campo pesquisa.'
    return false
  }

  return true
}

const cleanErrors = () => {
  errorPesquisa.value = ''
}

const buscarProfessor = () => {
  cleanErrors()
  if (validatePesquisa()) {
    listProfessor.value = []
    pesquisarProfessor(pesquisa.value)
  }
}

async function pesquisarProfessor(name: string) {
  try {
    const professores = await userService.getParentByName(name)
    if (professores.length == 0) {
      errorPesquisa.value = `Nenhum usuário encontrato.`
    }
    listProfessor.value.push(...professores)
  } catch (error) {}
}

async function adicionarContato(paiId: number, professorId: number, professorName: string) {
  try {
    const existeContato = await contatoService.getByContactByParentIDAndTeacherID(
      paiId,
      professorId
    )

    if (existeContato.length == 0) {
      const contato: ContactCreationDTO = {
        parent_id: paiId,
        teacher_id: professorId
      }
      const novoContato = await contatoService.criarContato(contato)
      errorPesquisa.value = `O professor ${professorName} foi adicionado a lista de contatos de professores`
    } else {
      errorPesquisa.value = `O professor ${professorName} já está na lista de contatos de professores`
    }
  } catch (error) {}
}

const cleanPesquisa = () => {
  cleanErrors()
  pesquisa.value = ''
}
</script>
