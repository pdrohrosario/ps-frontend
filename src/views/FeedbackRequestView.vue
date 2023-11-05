<template>
  
    <div class=" bg-zinc-100 w-3/4 h-[500px] mt-20 rounded-[10px] font-inter shadow border ">
      <div class="p-10">
        <div class="text-gray-900 text-4xl text-start font-light font-inter">Feedback:</div>
        
        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Professor:</div>
        <div class="flex flex-row justify-items-start">
          <input type="text" class=" w-full h-[45px] rounded-[5px] border" />
        </div>

        <div class="text-gray-900 text-xl text-start font-light font-inter mt-5">Solicitação:</div>
        <div class="flex flex-row justify-items-start">
          <textarea type="text" class=" w-full h-[45px] rounded-[5px] border"></textarea>
        </div>
        
        <div class="flex justify-start py-3 flex-row sm:justify-items-start justify-items-end">
          <button
            class="w-[150px] h-[48px] bg-red-800 mr-3 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter']">
            Limpar
          </button>
          <button class="w-[150px] h-[48px] bg-gray-800 rounded-[5px] text-zinc-100 text-[20px] font-normal font-inter">
            Enviar
          </button>
        </div>
      </div>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { defineComponent } from 'vue';
</script>
