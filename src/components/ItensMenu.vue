<script setup lang="ts">

import Button from '../components/Button.vue'

const { titulo, tipo, valor } = defineProps({
    titulo: String,
    tipo: {
      type: String,
      validator(value: string) {
        return [ "categoria", "sessao", "item" ].includes(value)
      }
    },
    valor: Number,
    click: Function
  })

</script>

<template>
  <div :class="['cardMenuContainer', tipo]">
    <h3>{{ titulo }}</h3>
    <span/>
    <p>R$ {{ valor }}</p>
    <Button tipo="confirmar" @click="click" />
  </div>
</template>

<style scoped>
  .cardMenuContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .categoria{
    >h3{
      white-space: nowrap;
      font-size: 22px;
      margin-right: 5px;
      font-weight: 700;
      line-height: 120%;
    }
    >span{
      width: 100%;
      height: 3px;
      border-radius: 2vw;
      background-color: #000;
    }
    >p{display: none;}
    >Button{display: none;}
  }
  .sessao{
    >h3{
      white-space: nowrap;
      margin-right: 5px;
      font-size: 18px;
      font-weight: 700;
      line-height: 120%;
    }
    >span{
      width: 100%;
      height: 2px;
      border-radius: 2vw;
      background-color: #000;
    }
    >p{display: none;}
    >Button{display: none;}
  }
  .item{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    >h3{
      white-space: nowrap;
      margin-right: 5px;
      font-size: 14px;
      font-weight: 700;
      line-height: 100%;
    }
    >span{
      width: 100%;
      height: 1px;
      border-radius: 2vw;
      border: 1px dotted #000;
    }
    >p{
      font-size: 12px;
      white-space: nowrap;
      margin: 0 5px;
    }
    >Button{
      margin: 0;
    }
  }
</style>

