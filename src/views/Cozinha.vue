<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
  import { ref } from 'vue'
  import MenuNav from '@/components/MenuNav.vue';
  import CardCozinha from '../components/CardCozinha.vue'

  const pedidos = ref([
    { horario: '17:45:12', pedido: [
      { id: 2, item: 'Salmão Grelhado', observacao: '' },
      { id: 2, item: 'Salmão Grelhado', observacao: 'sem cebola' },
      { id: 2, item: 'Salmão Grelhado', observacao: '' },
    ] },
    { horario: '17:46:12', pedido: [
      { id: 3, item: 'Filé', observacao: '' },
      { id: 2, item: 'Salmão Grelhado', observacao: 'sem cebola' },
      { id: 5, item: 'Expresso', observacao: '' },
    ] },
    { horario: '17:47:12', pedido: [
      { id: 9, item: 'Tilápia', observacao: '' },
      { id: 7, item: 'Linguado', observacao: '' },
      { id: 2, item: 'Salmão Grelhado', observacao: '' },
    ] },
    { horario: '17:49:12', pedido: [
      { id: 2, item: 'Salmão Grelhado', observacao: '' },
      { id: 2, item: 'Salmão Grelhado', observacao: 'sem cebola' },
      { id: 2, item: 'Salmão Grelhado', observacao: '' },
      { id: 2, item: 'Salmão Grelhado', observacao: '' },
      { id: 2, item: 'Salmão Grelhado', observacao: 'sem cebola' },
      { id: 2, item: 'Salmão Grelhado', observacao: '' }
    ] },
  ])

// -------------------------------   METHODS   ---------------------------------------- //

const excluirPedido = (horario: string) => {
  let confirmacao = confirm('Quer EXCLUIR esse pedido?')
    if (confirmacao) {
      pedidos.value = pedidos.value.filter((p) => p.horario !== horario)
    }
}

const finalizarPedido = (horario: string) => {
  let confirmacao = confirm('Esse pedido já foi ENTREGUE?')
    if (confirmacao) {
      pedidos.value = pedidos.value.filter((p) => p.horario !== horario)
    }
}

</script>

<template>
  <MenuNav menu="Cozinha" />
  <div class="cozinhaContainer">
    <CardCozinha
      v-for="pedido in pedidos"
      :key="pedido.horario"
      :ordem="pedidos.indexOf(pedido) + 1"
      :horario="pedido.horario"
      :pedidos="pedido.pedido"
      :click-excluir="() => excluirPedido(pedido.horario)"
      :click-finalizar="() => finalizarPedido(pedido.horario)"
    />

  </div>
</template>

<style scoped>
  .cozinhaContainer{
    padding-bottom: 100px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow-y: scroll;
    height: 100vh;
    &::-webkit-scrollbar{
      width: 8px;
      height: 20vw;
    }
    &::-webkit-scrollbar-track{
      background: #33726f;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #003F3C;
      border-radius: 2vw;
      border: 1px solid #33726f;
    }
    @media (min-width: 767px) {
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: normal;
    }
  }
</style>
