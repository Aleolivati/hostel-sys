<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'

const menuOptions = ref([
  { opcao: 'Tirar Pedido', path: '/restaurante' },
  { opcao: 'Cozinha', path: '/cozinha' },
  { opcao: 'Fechar Conta', path: '/fechamento' },
  { opcao: 'Sair', path: '/' }
])

const { menu } = defineProps({ menu: String })

</script>

<template>
  <nav>
    <ul>
      <li v-for="opcao in menuOptions" :key="opcao.opcao"
        :class="{ 'selecionado': opcao.opcao === menu }">
        <RouterLink :to="opcao.path" class="link">
          {{ opcao.opcao }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 480px;
  margin: 0 auto;
  padding: 5px 8px;
  >li {
    color: #fff;
    border-bottom: 2px solid #fff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    &:not(:last-child) {
      border-right: 2px solid #fff;
    }
    .link{
      color: #fff;
    }
    &.selecionado {
      background-color: #fff;
      .link{
        color: #003F3C;
        font-weight: 700;
      }
    }
  }
  @media (min-width: 767px) {
    >li{
      padding: 0 15px;
      font-size: 16px;
      white-space: nowrap;
    }
  }
}
</style>
