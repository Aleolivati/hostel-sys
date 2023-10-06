<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
  import { ref, watch } from 'vue'
  import Button from '@/components/Button.vue';
  import MenuNav from '@/components/MenuNav.vue';

  const suites = ref([
      { imagem: './src/assets/suite_1.svg', nome: 'Suite 1', estaSelecionado: '' },
      { imagem: './src/assets/suite_2.svg', nome: 'Suite 2', estaSelecionado: '' },
      { imagem: './src/assets/suite_3.svg', nome: 'Suite 3', estaSelecionado: '' },
      { imagem: './src/assets/suite_4.svg', nome: 'Suite 4', estaSelecionado: '' },
      { imagem: './src/assets/suite_5.svg', nome: 'Suite 5', estaSelecionado: '' }
    ])

    const produtosConsumidos = ref([
      { suite: 'Suite 1', idFechamento: 1, nomeProduto: 'Filé', quantidade: 1, valor: 30.00 },
      { suite: 'Suite 1', idFechamento: 3, nomeProduto: 'Salmão Grelhado', quantidade: 1, valor: 50.00 },
      { suite: 'Suite 1', idFechamento: 6, nomeProduto: 'Pão na chapa', quantidade: 1, valor: 5.50 },
      { suite: 'Suite 1', idFechamento: 7, nomeProduto: 'Pão na chapa', quantidade: 1, valor: 5.50 },
      { suite: 'Suite 1', idFechamento: 8, nomeProduto: 'Pão na chapa', quantidade: 1, valor: 5.50 },
      { suite: 'Suite 1', idFechamento: 10, nomeProduto: 'Salmão Grelhado', quantidade: 1, valor: 50.00 },
      { suite: 'Suite 3', idFechamento: 5, nomeProduto: 'Alcatra', quantidade: 1, valor: 30.00 },
      { suite: 'Suite 3', idFechamento: 6, nomeProduto: 'Linguado Grelhado', quantidade: 1, valor: 50.00 },
      { suite: 'Suite 3', idFechamento: 7, nomeProduto: 'Expresso', quantidade: 1, valor: 5.50 },
      { suite: 'Suite 3', idFechamento: 8, nomeProduto: 'Expresso', quantidade: 1, valor: 5.50 },
      { suite: 'Suite 3', idFechamento: 9, nomeProduto: 'Expresso', quantidade: 1, valor: 5.50 },
      { suite: 'Suite 3', idFechamento: 10, nomeProduto: 'Salmão Grelhado', quantidade: 1, valor: 60.00 }
    ])

// -------------------------------   FILTRAR ITENS POR SUITE   ---------------------------------------- //

    let suiteSelecionada = ref('')
    const filtrarProdutos = () => {
      if (!suiteSelecionada.value) {
        return []
      }
      return produtosConsumidos.value.filter((p) => p.suite === suiteSelecionada.value)
    }

    const produtosFiltrados = ref(filtrarProdutos())

    // const produtosUnicosComSuiteSelecionada = computed(() => {
    //   const produtosFiltrados = filtrarProdutos()
    //   const produtosUnicos = new Set()

    //   produtosFiltrados.forEach((produto) => {
    //     produtosUnicos.add(produto.nomeProduto)
    //   })

    //   return Array.from(produtosUnicos)
    // })

    // const quantidadeProduto = (produto: string) => {
    //   return produtosFiltrados.value
    //     .filter((p) => p.nomeProduto === produto)
    //     .reduce((total, p) => total + p.quantidade, 0)
    // }

    // const valorTotalProduto = (produto: string) => {
    //   return produtosFiltrados.value
    //     .filter((p) => p.nomeProduto === produto)
    //     .reduce((total, p) => total + p.valor * p.quantidade, 0)
    // }

    const somaTotalValores = () => {
      return produtosFiltrados.value.reduce((total, p) => {
        return total + p.valor * p.quantidade
      }, 0)
    }

    watch(suiteSelecionada, () => {
      produtosFiltrados.value = filtrarProdutos()
    })

    const atualizarSelecionado = (nome: string) => {
    suites.value.forEach((s) => {
      s.estaSelecionado = nome
      suiteSelecionada.value = nome
    })
  }

// -------------------------------   METHODS   ---------------------------------------- //

const removerItem = (idFechamento: number) => {
    let confirmacao = confirm('Quer excluir esse item?')
    if (confirmacao) {
      produtosFiltrados.value = produtosFiltrados.value.filter((item) => item.idFechamento !== idFechamento)
    }
  }

const imprimirConta = () => {
  if (suiteSelecionada.value) {
    if (produtosFiltrados.value.length !== 0) {
      let confirmacao = confirm(`Deseja IMPRIMIR a conta da suite ${suiteSelecionada.value.toLocaleUpperCase()}?`)
      if (confirmacao) {
        alert('A conta está sendo imprimida!')
      }
    } else {
      alert(`Não existe itens consumidos na suite ${suiteSelecionada.value.toUpperCase()}`)
    }
  }
}

const fecharConta = () => {
  if (suiteSelecionada.value) {
    if (produtosFiltrados.value.length !== 0) {
      let confirmacao = confirm(`Deseja finalizar estadia da suite ${suiteSelecionada.value.toLocaleUpperCase()}?`)
      if (confirmacao) {
        alert('Estadia FINALIZADA com sucesso!')
        produtosConsumidos.value = produtosConsumidos.value.filter((item) => item.suite !== suiteSelecionada.value)
        suiteSelecionada.value = ''
      }
    } else {
      alert(`Não existe itens consumidos na suite ${suiteSelecionada.value.toUpperCase()}`)
    }
  }
}

</script>

<template>
  <MenuNav menu="Fechar Conta" />
  <div class="fechamentoContainer">
    <div class="suitesContainer">
      <div
        :class="['suite', { 'selecionado': suite.nome === suite.estaSelecionado }]"
        v-for="suite in suites"
        :key="suite.nome"
        @click="atualizarSelecionado(suite.nome)"
      >
        <img :src='suite.imagem' alt="[suite.nome]"/>
        <h2>{{ suite.nome }}</h2>
      </div>
    </div>
    <div class="suitesSelect">
      <select v-model="suiteSelecionada">
        <option v-for="suite in suites" :key="suite.nome" :value="suite.nome">{{ suite.nome }}</option>
      </select>
    </div>
    <div class="checkoutContainer">
      <div class="itensContainer">
        <div class="item cabecalho">
          <h3>Item</h3>
          <h3>Valor</h3>
        </div>
        <div class="item" v-for="item in produtosFiltrados" :key="item.idFechamento">
          <h3 class="nomeItem">{{ item.nomeProduto }}</h3>
          <h3>R$ {{ item.valor }}</h3>
          <Button tipo="excluir" @click="removerItem(item.idFechamento)"  />
        </div>
      </div>
      <span></span>
      <div class="checkout">
        <div class="totalItens">
          <h3>TOTAL:</h3>
          <h3>R$ {{ somaTotalValores() }}</h3>
        </div>
        <div class="buttons">
          <Button tipo="secundario" titulo="Imprimir" @click="imprimirConta"/>
          <Button tipo="secundario" titulo="Finalizar estadia" @click="fecharConta" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fechamentoContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  width: 100vw;
  height: 100vh;
  @media (min-width: 767px) {
    flex-direction: row;
    gap: 5px;
    margin: 10px auto;
    justify-content: center;
    align-items: start;
  }
  .suitesSelect{
    background-color: #b2b2b2;
    width: 90%;
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
      display: none;
    }
  }
  .suitesContainer{
    display: none;
    @media (min-width: 767px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      height: 90%;
      padding: 20px;
      background-color: #b2b2b2;
      border-radius: 2vw 0 0 2vw;
      .suite{
        background-color: #33726f;
        width: 100%;
        height: 20%;
        padding: 10px;
        border-radius: 2vw;
        color:#fff;
        text-align: center;
        cursor: pointer;
        >img{
          object-fit: contain;
          max-height: 40px ;
        }
      }
      .selecionado{
        background-color: #c48840;
      }
    }
  }
  .checkoutContainer{
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 5px;
    height: 80%;
    width: 90%;
    background-color: #b2b2b2;
    border-radius: 0 0 2vw 2vw;
    >span{
      margin-top: 5px;
      background-color: #222;
      border-radius: 25vw;
      height: 2px;
    }
    @media (min-width: 767px) {
      padding: 0 2px 20px 20px;
      border-radius: 0 2vw 2vw 0;
      height: 90%;
      width: auto;
      >span{
        width: calc(100% + 21px);
        margin: 2px -2px 0 -19px;
      }
    }
    .checkout{
      display: flex;
      padding-top: 5px;
      gap: 5px;
      flex-direction: column;
      .totalItens{
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
      }
      @media (min-width: 767px) {
        padding-top: 20px;
        gap: 10px;
        .totalItens{
          padding: 0 80px 0 10px;
        }
      }
      .buttons{
        display: flex;
        flex-direction: column;
        gap: 5px;
        justify-content: space-between;
        >Button{
          font-size: 16px;
          height: 100%;
          font-weight: 700;
          &:first-child{
            background-color: #ff9e00;
          }
          &:last-child{
            background-color: #3ec131;
            margin-right: 10px;
          }
        }
        @media (min-width: 767px) {
          flex-direction: row;
          justify-content: end;
          >Button{
            font-size: 18px;
          }
        }
      }
    }
  }
}
.itensContainer{
  height: 100%;
  overflow-y: scroll;
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
  .item{
    display: grid;
    grid-template-columns: 1.5fr 1fr 0.3fr;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;
    font-size: 10px;
    text-align: center;
    .nomeItem{
      text-align: start;
    }
    >Button{
      width: 20px;
      height: 20px;
      margin: 0;
      padding: 0;
    }
    @media (min-width: 767px) {
      max-width: 40vw;
    }
  }
  .cabecalho{
    font-size: 12px;
  }
}
</style>
