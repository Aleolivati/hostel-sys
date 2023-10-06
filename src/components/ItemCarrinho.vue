<script setup lang="ts">
import Button from './Button.vue';

const { item, valor } = defineProps({
  item: String,
  valor: Number,
  click: Function
})

</script>


<template>
  <div class="itemContainer">
    <div class="item">
      <p>{{ item }}</p>
      <p>R$ {{ valor }}</p>
    </div>
    <Button tipo="excluir" titulo="" @click="click"/>
  </div>
</template>

<style scoped>
  .itemContainer{
    background-color: #b2b2b2;
    border-radius: 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
  }
</style>
