<template>
  <div class="bet-buttons">
      <button   v-for="(button,index) of buttons" :key="button" :class="getActive(index)" @click.stop="onSelect(index)">{{button}}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {      
    props:{
        buttons: Array,
    },
    emits: ['bet-change'],
    setup(props,context){
        let currentIndex = ref(0);
        return{
            currentIndex,
            onSelect: (index) => {
                currentIndex.value = index;               
                context.emit('bet-change',currentIndex.value)
            },
            getActive: (index) => {
                if(currentIndex.value === index){
                    return 'btn bet-button bet-button--active';
                }else{
                    return 'btn bet-button';
                }
            }
        }
        
    }
    

}
</script>

<style lang="scss" scoped >
    .bet-buttons{
        width: 95%;
        height: 15%;
        margin: 30px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;       
    }

    .bet-button{
        width: 12%;
        height: 100%;
        border-radius: 16px;
        color: white;
        font-size: 1.5rem;
        font-family: RobotoBlack;
        text-transform: uppercase;
        border: none;
        box-shadow: none;
        background-color: var(--secondary-color);
    }

    .bet-button--active{
        background-color: var(--warning-color);
    }

</style>