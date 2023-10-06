<script setup lang="ts">
const { ordem, horario, pedidos } = defineProps({
  ordem: Number,
  horario: String,
  pedidos: Array<{
      id: Number,
      item: String,
      observacao: String,
    }>,
  clickFinalizar: Function,
  clickExcluir: Function
})

</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2 class="numero-pedido">{{ ordem }}º</h2>
      <time>{{ horario }}</time>
    </div>
    <div class="card-body" v-for="pedido in pedidos" :key="pedido.id">
        <p class="quantidade">1</p>
        <p>{{ pedido.item }}</p>
        <span v-if="pedido.observacao"/>
        <p class="obs" v-if="pedido.observacao">{{ pedido.observacao }}</p>
    </div>
    <div class="botoes-card">
      <button class="btn-finalizado" @click="clickFinalizar">Finalizado</button>
      <button class="btn-excluir" @click="clickExcluir">Excluir</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  display: flex;
  flex-direction: column;
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: red;

    .numero-pedido {
      color: #fff;
      line-height: 100%;
      padding: 5px 10px;
    }

    >time {
      color: yellow;
      font-weight: 700;
      margin-right: 10px;
    }
  }

  .card-body {
    background-color: #222;
    color: #fff;
    display: grid;
    grid-template-columns: 1fr 6fr;
    border-bottom: 1px solid #555;
    padding: 5px;
    gap: 5px;

    >p {
      padding: 5px;
    }

    .quantidade {
      text-align: center;
    }

    .obs {
      background-color: #aaa;
      margin-top: -10px;
    }
  }

  .botoes-card {
    display: flex;
    justify-content: space-between;
    background-color: #222;
    padding: 2px 10px 8px;

    >button {
      width: 100%;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 5px;
      color: white;

      &.btn-finalizado {
        background-color: green;
        margin-right: 50px;
      }

      &.btn-excluir {
        background-color: red;
      }
    }
  }
}</style>
