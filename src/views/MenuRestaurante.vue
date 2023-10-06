<script setup lang="ts">
  import Button from '@/components/Button.vue'
  import ItensMenu from '@/components/ItensMenu.vue'
  import ItemCarrinho from '@/components/ItemCarrinho.vue';
  import MenuNav from '@/components/MenuNav.vue';
  import { ref, watch } from 'vue'

  const suites = ref([
    { imagem: "./src/assets/suite_1.svg", nome: 'Suite 1' },
    { imagem: './src/assets/suite_2.svg', nome: 'Suite 2' },
    { imagem: './src/assets/suite_3.svg', nome: 'Suite 3' },
    { imagem: './src/assets/suite_4.svg', nome: 'Suite 4' },
    { imagem: './src/assets/suite_5.svg', nome: 'Suite 5' },
  ])

  const itensMenu = ref([
    { tipo: 'categoria', id: 0 , titulo: 'Prato Principal', valor: 0 },
    { tipo: 'sessao', id: 0 , titulo: 'Peixe', valor: 0 },
    { tipo: 'item', id: 1 , titulo: 'Salmão Grelhado', valor: 60.00 },
    { tipo: 'item', id: 3 , titulo: 'Moqueca de Tilápia', valor: 120.00 },
    { tipo: 'item', id: 4 , titulo: 'Linguado com molho', valor: 12.00 },
    { tipo: 'sessao', id: 0 , titulo: 'Carnes', valor: 0 },
    { tipo: 'item', id: 6 , titulo: 'Filé ao molho madeira', valor: 50.00 },
    { tipo: 'item', id: 7 , titulo: 'Alcatra', valor: 120.00 },
    { tipo: 'categoria', id: 0 , titulo: 'Bebidas', valor: 0 },
    { tipo: 'sessao', id: 12 , titulo: 'Matinal', valor: 0 },
    { tipo: 'item', id: 21 , titulo: 'Café', valor: 5.00 },
    { tipo: 'item', id: 13 , titulo: 'Expresso', valor: 8.00 }
  ])

  type Props = {
    idCart: number,
    id: number,
    item: string,
    valor: number,
    observacao: string,
    horario: string
  }

  const itensCarrinho = ref<Props[]> ([])

// -------------------------------   METHODS   ---------------------------------------- //

  const addItem = (id: number, item: string, valor: number) => {
    let observacao = prompt('Alguma Observação?')
    const ultimoItem = itensCarrinho.value[itensCarrinho.value.length - 1]
    const idCart = ultimoItem ? ultimoItem.idCart + 1 : 1
    const agora = new Date()
    const horas = String(agora.getHours()).padStart(2, '0')
    const minutos = String(agora.getMinutes()).padStart(2, '0')
    const segundos = String(agora.getSeconds()).padStart(2, '0')
    const horario = `${horas}:${minutos}:${segundos}`
    if (observacao) {
      itensCarrinho.value.push({ idCart, id, item, valor, observacao, horario})
    } else {
      observacao = ''
      itensCarrinho.value.push({ idCart, id, item, valor, observacao, horario})
    }
  }

  const removerItem = (idCart: number) => {
    let confirmacao = confirm('Quer excluir esse item?')
    if (confirmacao) {
      itensCarrinho.value = itensCarrinho.value.filter((item) => item.idCart !== idCart)
    }
  }

  const enviarPedido = () => {
    let confirmacao = confirm('Deseja enviar pedido para cozinha?')
    if (confirmacao) {
      alert('Pedido enviado com sucesso!')
      itensCarrinho.value = []
      nomeSuiteSelecionada.value = ''
      pedido.value = false
    }
  }

// -------------------------------   ATUALIZAR SUITE   ---------------------------------------- //

  let nomeSuiteSelecionada = ref('')
  let imagemSuiteSelecionada = ref('')
  watch(nomeSuiteSelecionada, (nome: string) => {
    const suite = suites.value.find((s) => s.nome === nome)
    if (suite) {
      imagemSuiteSelecionada.value = suite.imagem
    } else {
      imagemSuiteSelecionada.value = ''
    }
  })

  let pedido = ref(false)
  const confirmarPedido = () => {
    pedido.value = !pedido.value
  }

</script>

<template>
  <MenuNav menu="Tirar Pedido" />
  <div class="menuContainer">
    <div class="corpoContainer">
      <div class="suitesSelect">
        <select v-model="nomeSuiteSelecionada">
          <option v-for="suite in suites" :key="suite.nome" :value="suite.nome">{{ suite.nome }}</option>
        </select>
      </div>
      <div class="itens">
        <ItensMenu
          v-for="item in itensMenu"
          :key="item.titulo"
          :tipo="item.tipo"
          :titulo="item.titulo"
          :valor="item.valor"
          :click="() => addItem(item.id, item.titulo, item.valor)"
        />
      </div>
    </div>
    <div class="buttonContainer confirmar">
      <Button tipo="secundario" titulo="Confirmar pedido" @click="confirmarPedido" />
    </div>
    <aside :class="{ 'confirmarPedido' : pedido }">
      <div class="logoContainer">
        <h2 v-show="nomeSuiteSelecionada">{{ nomeSuiteSelecionada }}</h2>
        <img v-show="imagemSuiteSelecionada" :src="imagemSuiteSelecionada" alt="logo suite" />
      </div>
      <div class="carrinhoContainer">
        <ItemCarrinho
          v-for="item in itensCarrinho"
          :key="item.item"
          :item="item.item"
          :valor="item.valor"
          :click="() => removerItem(item.idCart)"
        />
      </div>
      <div class="buttonContainer">
        <Button class="voltar" tipo="secundario" titulo="Voltar" @click="confirmarPedido" />
        <Button v-if="nomeSuiteSelecionada" class="enviar" tipo="secundario" titulo="Mandar para cozinha" @click="enviarPedido" />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.menuContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  width: 100vw;
  height: 100vh;
  @media (min-width: 767px) {
    margin-top: 10px;
  }
}

aside{
  display: none;
  background: linear-gradient(0deg, #003F3C 0%, rgba(0, 0, 0, 1) 100%);
  border-radius: 2vw 0 0 2vw;
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  padding: 30px 15px;
  flex-direction: column;
  gap: 25px;
  &.confirmarPedido{
    display: flex;
  }
  .logoContainer{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    color: #fff;
    >img{
      width: 10vw;
      @media (min-width: 767px) {
        max-height: 40px;
      }
    }
  }
  .carrinhoContainer{
    height: 50vh;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      width: 0px;
    }
    .itemCarrinhoContainer{
    background-color: #b2b2b2;
    border-radius: 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
  }
  }
  @media (min-width: 767px) {
    display: flex;
    width: 30vw;
    .carrinhoContainer{
      gap: 20px;
    }
  }
}
.buttonContainer{
  &.confirmar{
    background-color: #b2b2b2;
    width: 90%;
    margin-top: 5px;
    border-radius: 0 0 2vw 2vw;
    display: flex;
    padding: 5px 0 10px;
    @media (min-width: 767px) {
      display: none;
    }
  }
  >Button{
    width: 100%;
    font-size: 100%;
    font-weight: 700;
    background-color: #ff9e00;
    line-height: 120%;
    &.voltar{
      background-color: #ff1500;
      @media (min-width: 767px) {
        display: none;
      }
    }
    &.enviar{
      background-color: #0be200;
    }
  }
}
.corpoContainer {
  width: 90%;
  @media (min-width: 767px) {
    width: auto;
    min-width: 480px;
    margin-right: 30vw;
  }
}
.suitesSelect{
    background-color: #b2b2b2;
    display: flex;
    justify-content: center;
    border-radius: 2vw 2vw 0 0;
    margin-bottom: 5px;
    padding: 5px;
    >select{
      width: 50%;
      text-align: center;
      border-radius: 2vw;
      font-weight: 700;
    }
    @media (min-width: 767px) {
      padding: 10px;
      >select{
        font-size: 18px;
      }
    }
  }
.itens{
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  border: 5px solid #b2b2b2;
  margin: 0 auto;
  height: 70vh;
  width: auto;
  padding: 5px;
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
    padding: 20px;
    height: 80vh;
  }
}
</style>
