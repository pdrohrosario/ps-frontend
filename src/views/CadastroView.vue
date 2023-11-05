<template>
  
    <div class="flex h-screen justify-center bg-neutral-400">
      <div class=" bg-zinc-100 h-[600px] mt-20 rounded-[10px] shadow border p-10">
        <div class="grid grid-cols-1 justify-items-center">
          <div>
            <form @submit.prevent="cadastro" class="flex flex-col">
              <div class="text-gray-900 text-5xl text-center font-light font-['Inter']">Cadastro</div>
              <div class="mt-10">
                <label class="text-gray-900 text-2xl font-normal font-['Inter'] block">Email:</label>
                <input type="text" class="w-[396px] h-[45px] rounded-[5px] border" v-model="email" required />
              </div>
              <div class="mt-5">
                <label class="text-gray-900 text-2xl font-normal font-['Inter'] block">Senha:</label>
                <input type="password" class="w-[396px] h-[38px]" v-model="password" required />
              </div>
              <div class="mt-5">
                <label class="text-gray-900 text-2xl font-normal font-['Inter'] block">Perfil:</label>

                <select class="w-[396px] h-[45px] rounded-[5px] border" v-model="perfil" required>
                  <option value="pais">PAIS</option>
                  <option value="professor">PROFESSOR</option>
                </select>
              </div>
              <div class="my-5">
                <div v-if="'pais' === perfil">
                  <label class="text-gray-900 text-2xl font-normal font-['Inter'] block">Número de filhos:</label>
                  <input type="text" class="w-[396px] h-[45px] rounded-[5px] border" v-model="nrFilhos" required />
                </div>
                <div v-else>
                  <label class="text-gray-900 text-2xl font-normal font-['Inter'] block">Frequência de feedback:</label>
                  <input type="text" class="w-[396px] h-[45px] rounded-[5px] border" v-model="qtFeedback" required />
                </div>   
              </div>
              <button
                class="w-[396px] h-[58px] bg-gray-800 rounded-[5px] text-zinc-100 text-[28px] font-normal font-['Inter']"
                type="submit">
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router'

  export default defineComponent({
    components: {
      
    },
    data() {
    return {
      perfil: 'pais', // ou 'professor', dependendo do contexto inicial
      nrFilhos: '',
      qtFeedback: ''
    };
  }
    
  });

  const email = ref('')
  const password = ref('')  

  const router = useRouter()

  const cadastro = () => {
    console.log('Fazendo login com:', email.value, password.value)
}
</script>
