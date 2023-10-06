<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

  const { titulo, tipo } = defineProps({
    titulo: String,
    tipo: {
      type: String,
      validator(value: string) {
        return [ "primario", "secundario", "excluir", "confirmar" ].includes(value)
      }
    }
  })

</script>

<template>
  <button :class="tipo">{{ titulo }}</button>
</template>

<style scoped>
  button{
    height: 40px;
    font-size: 24px;
    margin: 3px 5px;
    padding: 5px 12px;
    border: none;
    transition: all ease 0.3s;
    border-radius: 25vw;
    cursor: pointer;
    line-height: 100%;
    &.primario{
      color: #fff;
      background-color: #003F3C;
      width: 100%;
      &:hover{
        box-shadow: inset 0 0 0 10em rgba(0, 0, 0, 1);
        transition: all ease 0.3s;
      }
    }
    &.secundario{
      background-color: #fff;
      color: #000;
      border: 2px solid #000;
    }
    &.excluir{
      background-image: url('../assets/excluir.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #fff;
      width: 27px;
      height: 27px;
      opacity: 0.7;
      &:hover{
        opacity: 1;
        transition: all ease 0.3s;
      }
    }

    &.confirmar{
      background-image: url('../assets/confirmar.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: transparent;
      width: 30px;
      height: 30px;
      opacity: 1;
      &:hover{
        opacity: 0.7;
        transition: all ease 0.3s;
      }
    }
  }
</style>
