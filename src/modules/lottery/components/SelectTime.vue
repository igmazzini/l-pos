<template>
  <div class="time-buttons">     
      <button   v-for="(time,index) of times" :key="index" :class="getTimeActive(index)" @click.stop="onSelectTime(index)">{{time}}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {      
    props:{
        index: Number,       
        times: Array,
    },
    emits: ['time-change'],
    setup(props,context){
        const data = {on:'',time:'',index:''};
        const currentTimeIndex = ref(0);
        const dateOn = ref(false);
        return{
            currentTimeIndex,
            dateOn,
            onSelectTime: (index) => {
                currentTimeIndex.value = index;
                data.on    =   dateOn.value;
                data.time  =   currentTimeIndex.value;            
                data.index =   props.index;            
                context.emit('time-change',data);
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