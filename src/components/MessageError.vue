<template>
  <span class="text-red-800 w-full">{{ message }}</span>
</template>

<script setup lang="ts">
const { message } = defineProps(['message'])

console.log(message)
</script>
