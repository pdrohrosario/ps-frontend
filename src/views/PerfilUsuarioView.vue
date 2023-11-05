<template>
  
  <div class=" bg-zinc-100 w-2/3 h-[500px] mt-20 rounded-[10px] shadow border ">
        <div class="grid grid-cols-2 gap-10 p-10">
        
            <div class="flex flex-col items-center">
              <img class="relative" src="../assets/images/vector-perfil.png" />
              <div class="rounded-[5px] bg-light-gray w-[200px] h-[51px] my-5 p-5 flex items-center justify-center">
                  <span class="text-[24px] font-inter text-gray text-center inline-block w-32">Perfil: Pais</span> <!--trocar por variavel-->
              </div>

              <div class=" h-[141px] text-gray-900 text-[18px] font-light font-inter']">
                <ul class="
                        flex-col
                        mt-8
                        space-y-4
                        md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
                        ">
                    
                    <li class="text-#1c2733 hover:text-neutral-400">
                        <router-link to="/home">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>

                        </router-link>
                    </li>
                    <li class="first-letter:text-#1c2733 hover:text-neutral-400">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                    </li>
                </ul>
              </div>
            </div>
      
          <div>
            <form @submit.prevent="login" class="flex flex-col grid grid-cols-1 gap-1 items-center">
            
              <div class="">
                <div class="text-gray-900 w-[396px] h-[45px] text-2xl font-normal font-inter">Email:</div>
                <input type="text" class="w-full h-[45px] rounded-[5px] border" v-model="email" required />
              </div>
              <div>
                <div class="text-gray-900 text-2xl w-[396px] h-[45px] font-normal font-inter">Senha:</div>
                <input type="password" class="w-full h-[45px] rounded-[5px] border" v-model="password" required />
              </div>
              <div class="my-5">
                <div v-if="'pais' === perfil">
                  <div class="text-gray-900 text-2xl font-normal font-inter block">Número de filhos:</div>
                  <input type="text" class="w-full h-[45px] rounded-[5px] border" v-model="nrFilhos" required />
                </div>
                <div v-else>
                  <div class="text-gray-900 text-2xl font-normal font-inter block">Frequência de feedback:</div>
                  <input type="text" class="w-full h-[45px] rounded-[5px] border" v-model="qtFeedback" required />
                </div>   
              </div>
              <div class="flex justify-between py-4 flex-row justify-items-start">
                <div>
                  <button
                    class="w-50 h-[58px] bg-red-800 p-5 flex items-center justify-center rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter"
                    type="submit">
                    Excluir
                  </button>
                </div>  
                <div>
                  <button
                    class="w-50 h-[58px] bg-gray-800 rounded-[5px] p-5 flex items-center justify-center text-zinc-100 text-[20px] font-normal font-inter"
                    type="submit">
                    Editar
                  </button>
                </div>  
              </div>
            </form>
          </div>
        </div>
      </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router'
  import NavBar from '@/components/NavBar.vue'

  export default defineComponent({
    components: {
      
    },
  });

  const email = ref('')
  const password = ref('')  

  const router = useRouter()

  const cadastro = () => {
    console.log('Fazendo login com:', email.value, password.value)
}
</script>
