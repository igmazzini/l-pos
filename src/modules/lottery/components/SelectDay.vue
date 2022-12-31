<template>
  <div class="time-buttons">     
      <button   v-for="(day,index) of days" :key="index" :class="getTimeActive(index)" @click.stop="onSelectTime(day,index)">{{day.weekday}}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {      
    props:{       
        days: Array,
    },
    emits: ['day-change'],
    setup(props,context){
       
        const currentTimeIndex = ref(0);
       
        return{
            currentTimeIndex,           
            onSelectTime: (day,index) => {

                currentTimeIndex.value = index;        
                     
                context.emit('day-change',day);
            },           
           
            getTimeActive: (index) => {
                if(currentTimeIndex.value === index){
                    return 'btn time-button time-button--active';
                }else{
                    return 'btn time-button';
                }
            }
        }
        
    }
    

}
</script>

<style lang="scss" scoped >
    .time-buttons{
        width: 100%;            
        margin: 0;
        display: grid;
        gap: 3px;
        grid-template-columns: repeat(2,1fr);       
        align-items: center;
        justify-items: center;
    }

   
    .time-button {       
        height: 100%;
        width: 100%;
        border-radius: 5px;
        color: white;
        font-size: 1.3rem;
        font-family: RobotoBlack;
        text-transform: uppercase;
        border: none;
        box-shadow: none;
        padding: 2px;
        background-color: var(--secondary-color);
      
    }
   
    
   
    .time-button--active{
        background-color: var(--warning-color);
    }


    @media screen and (max-width:1300px){
        
        .time-button { 
            height: 35px;
        }
        
    }

</style>