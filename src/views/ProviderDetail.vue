<template>
    <div class="about">
      <DetailProvider/>
    </div>
  </template>
  <script>
  import DetailProvider from '@/components/DetailProvider.vue'
  export default {
    name: 'DetailProviders',
    components: {
        DetailProvider
    }
  }
  </script>