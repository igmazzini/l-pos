<template>
  <div class="date-buttons">
      <button  :class="getActive()" @click.stop="onSelectDate">{{date}}</button>
      <button   v-for="(time,index) of times" :key="index" :class="getTimeActive(index)" @click.stop="onSelectTime(index)">{{time}}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {      
    props:{
        index: Number,
        date: String,
        times: Array,
    },
    emits: ['date-change','time-change'],
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
            onSelectDate: () => {
                dateOn.value = !dateOn.value;  
                data.on    =   dateOn.value;
                data.time  =   currentTimeIndex.value;            
                data.index =   props.index;               
                context.emit('date-change',data);
            },
            getActive: () => {
                if(dateOn.value){
                    return 'btn date-button date-button--active';
                }else{
                    return 'btn date-button';
                }
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
    .date-buttons{
        width: 15%;
        height: 15%;
        margin: 30px auto;
        display: grid;
        gap:3px;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
    }

    .date-button,
    .time-button {       
        height: 100%;
        border-radius: 7px;
        color: white;
        font-size: 1.5rem;
        font-family: RobotoBlack;
        text-transform: uppercase;
        border: none;
        box-shadow: none;
        background-color: var(--secondary-color);
      
    }
    .date-button {
        grid-column: 1/3;
        grid-row: 1;
    }
    .time-button:first-child{
       grid-column: 1/2;
       grid-row: 2;
    }
    .time-button:last-child{
       grid-column: 2/3;
       grid-row: 2;
    }

    .date-button--active,
    .time-button--active{
        background-color: var(--warning-color);
    }

</style>