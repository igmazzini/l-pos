<template>
  <div class="games">
    <div class="game" v-for="game of games" :key="game" @click.prevent="onGameSelected(game)" >     
      <img :src="require('@/modules/lottery/assets/img/'+game.img)" :class="[getImageClass(game),'animate__animated animate__zoomIn animate__faster']" :alt="game.name">      
    </div>
  </div>
</template>

<script>

import { useLottery } from '@/modules/lottery/composables/useLottery';
import { useUI } from '@/modules/shared/composables/useUI';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
  name: "Selector",
  setup() {
    
    const { t } = useI18n();
    const { setTitle } = useUI(); 
    const { games }  = useLottery();
    const router = useRouter();
    
   

  
    setTitle(t('lotteryTitle'));
   
    return {
      games,     
      onGameSelected: (game) => {  
            
        setTitle(game.name);  

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
 
}

.small-img{
  max-width: 310px !important;
}


@media screen and (max-width:540px) {
  .small-img{
    max-width: 125px !important;
  }
}

</style>