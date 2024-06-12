<template>
    <input v-model="value" :type="type || 'text'" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
    <div class="text-red-400">
        {{ errorMessage }}
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    name: String,
    type: String,
  });
  
  // The `name` is returned in a function because we want to make sure it stays reactive
  // If the name changes you want `useField` to be able to pick it up
  const { value, errorMessage } = useField(() => props.name);
  </script>
  