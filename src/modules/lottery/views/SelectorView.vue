<template>
  <div class="games">
    <div class="game" v-for="game of games" :key="game" @click.prevent="onGameSelected(game)" >     
      <img :src="require('@/modules/lottery/assets/img/'+game.img)" :class="getImageClass(game)" :alt="game.name">      
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from 'vue-router';

export default {
  name: "Selector",
  setup() {
    const store  = useStore();
    const router = useRouter();
    const games  = computed(() => store.getters["lotteryStore/games"]);

    store.commit('setTitle','Loteria');
   
    return {
      games,     
      onGameSelected: (game) => {  
        store.commit('setTitle',game.name);         
        router.push({name:game.route});
      },
      getImageClass: (game) => {
        if(game.name.toLowerCase() === 'tresmonazos'){
          return 'small-img'
        }else{
          return '';
        }
      }
    };
  },
};
</script>

<style lang='scss' scoped>
.games{
  display: grid;
  height: calc( 100vh - var(--top-bar-height));
  grid-template-columns: repeat(2,1fr);
  align-items: center;
  justify-items: center;
  background-color: #ccc9c9;
}
.game{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  background-color: whitesmoke;
 

}
.game:hover{
  background-color: rgba(143,139,139,.555);
}
.game img{
  width: 80%;
  max-width: 380px; 
  transform: scale(1);
  animation: fadeIn 300ms;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.small-img{
  max-width: 310px !important;
}

@keyframes fadeIn {
  0%{
    transform: scale(0);
  }
}

@media screen and (max-width:540px) {
  .small-img{
    max-width: 125px !important;
  }
}

</style>