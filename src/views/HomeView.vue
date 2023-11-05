<template>
  <div class=" bg-zinc-100 w-11/12  h-[500px] mt-20 rounded-[10px] font-inter shadow border ">
    <div class="p-10">
      <div class="flex justify-between flex-row justify-items-start"> 
            <div class="text-gray-900 text-4xl text-center font-light font-inter">Histórico:</div>
            <div v-if="true" class="">
              <button
                class="w-[256px] h-[58px] bg-gray-800 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter">
                Solicitar Feedback
              </button>
            </div>
          </div>
      <div class="flex justify-center flex-row py-5">
        <div class="relative w-full overflow-x-auto ">
          <table class="w-full text-sm  bg-dark-gray text-left text-black dark:text-gray-400">
            <thead class="font-medium  text-[18px] text-black uppercase bg-dark-gray-table">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="pr-80 py-3">
                  Solicitação
                </th>
                <th scope="col" class="pr-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-20 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-light-gray border-b">
                <td scope="row" class="px-6 py-4">
                    1
                </td>
                <td class="pr-90 py-4">Avaliar o comportamento do aluno Felipe
                </td>
                <td class="px-6 py-4">
                    
                </td>
                <td class="px-6 py-4">
                  <div class="flex-col
                        mt-8
                        space-y-4
                        md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
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

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'



export default defineComponent({
  components: {

  },
});
</script>
