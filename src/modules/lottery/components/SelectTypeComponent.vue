<template>
  <div class="select-buttons">
      <button   v-for="(button,index) of buttons" :key="button" :class="getActive(index)" @click.stop="onSelect(index)">{{button}}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {      
    props:{
        buttons: Array,
    },
    emits: ['type-change'],
    setup(props,context){
        let currentIndex = ref(0);
        return{
            currentIndex,
            onSelect: (index) => {
                currentIndex.value = index;               
                context.emit('type-change',currentIndex.value)
            },
            getActive: (index) => {
                if(currentIndex.value === index){
                    return 'btn select-button select-button--active';
                }else{
                    return 'btn select-button';
                }
            }
        }
        
    }
    

}
</script>

<style lang="scss" scoped >
    .select-buttons{
        width: 95%;
        height: 18%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;       
    }

    .select-button{
        width: 22%;
        height: 100%;
        color: white;
        font-size: 1.5rem;
        font-family: RobotoBlack;
        text-transform: uppercase;
        border: none;
        box-shadow: none;
        background-color: var(--secondary-color);
    }

    .select-button--active{
        background-color: var(--warning-color);
    }

</style>