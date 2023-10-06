<script setup lang="ts">
  import Button from '@/components/Button.vue';
</script>

<template>
  <div class="container">
    <div class="loginContainer">
      <img src="../assets/logo.svg" alt="logo pousada"/>
      <form>
        <label>Usuário:</label>
        <input type="text" />
        <label>Senha:</label>
        <input type="password" />
        <Button tipo="primario" titulo="Entrar"></Button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .loginContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 40px auto;
    width: 90%;
    padding: 40px 20px;
    background-color: #33726f;
    border-radius: 25px;
    @media (min-width: 767px) {
      margin: 20px 80px;
      width: auto;
    }

    >img{
      max-width: 200px;
      @media (min-width: 767px) {
        max-width: 300px;
      }
    }

    >form{
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 8px;
      color: #fff;
      font-size: 24px;

      >label{
        line-height: 100%;
      }

      >input{
        width: 100%;
        margin-bottom: 8px;
        border-radius: 25vw;
        font-size: 18px;
        padding: 0 8px;
        text-align: center;
      }
    }
  }
</style>
